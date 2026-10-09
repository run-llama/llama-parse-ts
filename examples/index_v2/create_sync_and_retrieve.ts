// @ts-nocheck

import pLimit from 'p-limit';
import * as fs from 'fs';
import * as path from 'path';
import { LlamaCloud } from '@llamaindex/llama-cloud';

const MAX_POLLING_ATTEMPTS = 900;
const POLLING_INTERVAL_MS = 2000;

function once<T>(fn: () => T): () => T {
  let cached: { value: T } | undefined;
  return () => {
    if (!cached) cached = { value: fn() };
    return cached.value;
  };
}

function getStatus(metadata: unknown): string {
  if (!metadata) return 'unknown';
  if (typeof metadata === 'object' && metadata !== null) {
    const m = metadata as Record<string, unknown>;
    return String(m['status'] ?? 'unknown');
  }
  return 'unknown';
}

const getClient = once(
  () =>
    new LlamaCloud({
      apiKey: process.env.LLAMA_CLOUD_API_KEY ?? process.env.LLAMA_PARSE_API_KEY ?? '',
      baseURL: process.env.LLAMA_CLOUD_BASE_URL ?? process.env.LLAMA_PARSE_BASE_URL,
    }),
);

const getProjectId = once(
  (): string | undefined => process.env.LLAMA_CLOUD_PROJECT_ID ?? process.env.LLAMA_PARSE_PROJECT_ID,
);

async function createIndexFromDirectory(): Promise<[string, string]> {
  const client = getClient();
  const directory = process.env.DATA_DIR ?? 'data/';

  const cloudDir = await client.beta.directories.create({
    name: process.env.DIR_NAME ?? 'index-v2-demo',
    project_id: getProjectId() ?? null,
    description: 'Directory containing some data as a demo for Index V2 usage',
  });

  console.log(`Created a directory on the LlamaParse platform with ID: ${cloudDir.id}`);

  const limit = pLimit(4);

  const uploadFile = (file: string): Promise<string> =>
    limit(async () => {
      const chunks: Buffer[] = [];
      await new Promise<void>((res, rej) => {
        const stream = fs.createReadStream(file);
        stream.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
        stream.on('end', res);
        stream.on('error', rej);
      });
      const flObj = await client.beta.directories.files.upload(cloudDir.id, {
        upload_file: new File([Buffer.concat(chunks)], path.basename(file)),
        project_id: getProjectId() ?? null,
      });
      return flObj.id;
    });

  const files = fs
    .readdirSync(directory)
    .map((f) => path.join(directory, f))
    .filter((f) => fs.statSync(f).isFile());

  const fileIds = await Promise.all(files.map(uploadFile));

  console.log(
    `Uploaded ${
      fileIds.length
    } files in ${directory} to the directory on the LlamaParse Platform, with the following IDs: ${fileIds.join(
      ', ',
    )}`,
  );

  const idx = await client.indexes.create({
    source_directory_id: cloudDir.id,
    project_id: getProjectId() ?? null,
    name: process.env.INDEX_NAME ?? 'index-v2-demo',
  });

  console.log(
    `Created an index on the LlamaParse Platform with ID: ${idx.id} and export config ID: ${idx.export_config_id}`,
  );

  return [idx.id, idx.export_config_id];
}

async function syncAndWait(indexId: string): Promise<void> {
  const client = getClient();
  await client.indexes.sync(indexId);

  for (let attempts = 0; attempts < MAX_POLLING_ATTEMPTS; attempts++) {
    const idx = await client.indexes.get(indexId);
    const status = getStatus(idx.metadata);

    if (status === 'ready') return;
    if (status === 'failed') throw new Error('Index sync failed');

    await new Promise((res) => setTimeout(res, POLLING_INTERVAL_MS));
  }
}

async function retrieve(exportConfigId: string): Promise<void> {
  const client = getClient();

  const retrieved = await client.retrieval.retrieve({
    index_id: exportConfigId,
    query: process.env.INDEX_RETRIEVAL_QUERY ?? 'What information is available for retrieval?',
    top_k: 10,
    score_threshold: 0.5,
    rerank: { enabled: true, top_n: 5 },
  });

  for (const [i, r] of retrieved.results.entries()) {
    console.log(`Retrieved chunk #${i + 1} (Score: ${r.score ?? 'no score'})`);
    console.log('Content:');
    console.log(r.content);
    console.log();
    if (r.metadata != null) {
      console.log('Metadata');
      console.log(JSON.stringify(r.metadata, null, 2));
    }
    console.log();
    console.log('#########################################');
    console.log();
  }
}

async function run(): Promise<void> {
  const [indexId, exportConfigId] = await createIndexFromDirectory();
  await syncAndWait(indexId);
  await retrieve(exportConfigId);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
