// @ts-nocheck

import { LlamaCloud } from '@llamaindex/llama-cloud';
import { tool, ToolLoopAgent } from 'ai';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';

function once<T>(fn: () => T): () => T {
  let cached: { value: T } | undefined;
  return () => {
    if (!cached) cached = { value: fn() };
    return cached.value;
  };
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

export const listIndexes = tool({
  description:
    'List all available indexes in the current project. ' +
    'Returns a formatted string of index names and their export config IDs, ' +
    'paginating through all results automatically.',
  inputSchema: z.object({}),
  execute: async () => {
    const client = getClient();
    const projectId = getProjectId();
    const all: Array<{ name: string; exportConfigId: string }> = [];
    for await (const item of client.indexes.list({
      project_id: projectId ?? null,
    })) {
      all.push({ name: item.name, exportConfigId: item.export_config_id });
    }
    const ls = all.map((i) => `- ${i.name} (ID: ${i.exportConfigId})`).join('\n');
    return `Available indexes:\n${ls}`;
  },
});

export const retrieve = tool({
  description:
    'Run a semantic retrieval query against an index. ' +
    'Returns a formatted string of results with scores, content previews, and metadata.',
  inputSchema: z.object({
    index_id: z.string().describe('The index to query.'),
    query: z.string().describe('The search query string.'),
    top_k: z.number().optional().describe('Maximum number of results to return.'),
    score_threshold: z.number().optional().describe('Minimum relevance score for results to be included.'),
    rerank_top_n: z
      .number()
      .optional()
      .describe('If set, enables reranking and returns the top N reranked results.'),
  }),
  execute: async ({ index_id, query, top_k, score_threshold, rerank_top_n }) => {
    const client = getClient();
    const response = await client.retrieval.retrieve({
      index_id,
      query,
      top_k: top_k ?? undefined,
      score_threshold: score_threshold ?? undefined,
      rerank: rerank_top_n != null ? { enabled: true, top_n: rerank_top_n } : undefined,
    });
    const retrieved: string[] = [];
    for (let i = 0; i < response.results.length; i++) {
      const result = response.results[i]!;
      let r = `Retrieval result #${i + 1} (Score: ${result.score ?? 'NA'})\n${result.content.slice(
        0,
        200,
      )}\n`;
      if (result.metadata) {
        r += `Metadata:\n\n\`\`\`json\n${JSON.stringify(result.metadata, null, 2)}\n`;
      }
      r += '\n\n---\n\n';
      retrieved.push(r);
    }
    return retrieved.join('\n\n');
  },
});

export const findFiles = tool({
  description:
    'Search for files within an index by name. ' +
    'Returns a formatted string listing matching file names and their IDs, ' +
    'paginating through all results automatically.',
  inputSchema: z.object({
    index_id: z.string().describe('The index to search within.'),
    file_name: z.string().optional().describe('Exact file name to match.'),
    file_name_contains: z.string().optional().describe('Substring to match against file names.'),
  }),
  execute: async ({ index_id, file_name, file_name_contains }) => {
    const client = getClient();
    const files: Array<{ fileName: string; fileId: string }> = [];
    for await (const item of client.retrieval.find({
      index_id,
      file_name: file_name ?? undefined,
      file_name_contains: file_name_contains ?? undefined,
    })) {
      files.push({ fileName: item.file_name, fileId: item.file_id });
    }
    const ls = files.map((f) => `- ${f.fileName} (ID: ${f.fileId})`).join('\n');
    return `Files matching the query:\n${ls}`;
  },
});

export const readFile = tool({
  description: 'Read the contents of a file from an index. ' + 'Returns the raw file content as a string.',
  inputSchema: z.object({
    index_id: z.string().describe('The index the file belongs to.'),
    file_id: z.string().describe('The ID of the file to read.'),
    offset: z.number().optional().describe('Character offset to start reading from. Defaults to 0.'),
    max_length: z.number().optional().describe('Maximum number of characters to return.'),
  }),
  execute: async ({ index_id, file_id, offset, max_length }) => {
    const client = getClient();
    const response = await client.retrieval.read({
      index_id,
      file_id,
      offset: offset ?? 0,
      max_length: max_length ?? undefined,
    });
    return response.content;
  },
});

export const grepFile = tool({
  description:
    'Search for a pattern within a specific file using grep. ' +
    'Returns a formatted string of matches with their character positions, ' +
    'paginating through all results automatically.',
  inputSchema: z.object({
    index_id: z.string().describe('The index the file belongs to.'),
    file_id: z.string().describe('The ID of the file to search.'),
    pattern: z.string().describe('The pattern to search for.'),
    context_chars: z
      .number()
      .optional()
      .describe('Number of surrounding characters to include with each match.'),
    limit: z.number().optional().describe('Maximum number of matches to return per page.'),
  }),
  execute: async ({ index_id, file_id, pattern, context_chars, limit }) => {
    const client = getClient();
    const matches: Array<{
      content: string;
      startChar: number;
      endChar: number;
    }> = [];
    for await (const item of client.retrieval.grep({
      index_id,
      file_id,
      pattern,
      context_chars: context_chars ?? undefined,
      page_size: limit ?? undefined,
    })) {
      matches.push({
        content: item.content,
        startChar: item.start_char,
        endChar: item.end_char,
      });
    }
    const ls = matches.map((m) => `- ${m.content} (start: ${m.startChar}, end: ${m.endChar})`).join('\n');
    return `Grep matches:\n${ls}`;
  },
});

export const llamaCloudTools = {
  listIndexes,
  retrieve,
  findFiles,
  readFile,
  grepFile,
};

// Example usage with Vercel AI SDK (install `ai` + `zod` to run):

async function main() {
  try {
    const agent = new ToolLoopAgent({
      model: openai('gpt-5.1'),
      tools: llamaCloudTools,
      instructions: 'You are a helpful assistant with access to a document index.',
    });
    const result = await agent.stream({
      prompt: "List all the files available to you, read one and then search for 'blue cheese'",
    });

    for await (const chunk of result.textStream) {
      process.stdout.write(chunk);
    }
  } catch (err) {
    console.error('Stream error:', err);
  }
}

main().catch(console.error);
