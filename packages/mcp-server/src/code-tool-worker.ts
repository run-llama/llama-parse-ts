// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import path from 'node:path';
import util from 'node:util';
import Fuse from 'fuse.js';
import ts from 'typescript';
import { WorkerOutput } from './code-tool-types';
import { LlamaCloud, ClientOptions } from '@llamaindex/llama-cloud';

async function tseval(code: string) {
  return import('data:application/typescript;charset=utf-8;base64,' + Buffer.from(code).toString('base64'));
}

function getRunFunctionSource(code: string): {
  type: 'declaration' | 'expression';
  client: string | undefined;
  code: string;
} | null {
  const sourceFile = ts.createSourceFile('code.ts', code, ts.ScriptTarget.Latest, true);
  const printer = ts.createPrinter();

  for (const statement of sourceFile.statements) {
    // Check for top-level function declarations
    if (ts.isFunctionDeclaration(statement)) {
      if (statement.name?.text === 'run') {
        return {
          type: 'declaration',
          client: statement.parameters[0]?.name.getText(),
          code: printer.printNode(ts.EmitHint.Unspecified, statement.body!, sourceFile),
        };
      }
    }

    // Check for variable declarations: const run = () => {} or const run = function() {}
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (
          ts.isIdentifier(declaration.name) &&
          declaration.name.text === 'run' &&
          // Check if it's initialized with a function
          declaration.initializer &&
          (ts.isFunctionExpression(declaration.initializer) || ts.isArrowFunction(declaration.initializer))
        ) {
          return {
            type: 'expression',
            client: declaration.initializer.parameters[0]?.name.getText(),
            code: printer.printNode(ts.EmitHint.Unspecified, declaration.initializer, sourceFile),
          };
        }
      }
    }
  }

  return null;
}

function getTSDiagnostics(code: string): string[] {
  const functionSource = getRunFunctionSource(code)!;
  const codeWithImport = [
    'import { LlamaCloud } from "@llamaindex/llama-cloud";',
    functionSource.type === 'declaration' ?
      `async function run(${functionSource.client}: LlamaCloud)`
    : `const run: (${functionSource.client}: LlamaCloud) => Promise<unknown> =`,
    functionSource.code,
  ].join('\n');
  const sourcePath = path.resolve('code.ts');
  const ast = ts.createSourceFile(sourcePath, codeWithImport, ts.ScriptTarget.Latest, true);
  const options = ts.getDefaultCompilerOptions();
  options.target = ts.ScriptTarget.Latest;
  options.module = ts.ModuleKind.NodeNext;
  options.moduleResolution = ts.ModuleResolutionKind.NodeNext;
  const host = ts.createCompilerHost(options, true);
  const newHost: typeof host = {
    ...host,
    getSourceFile: (...args) => {
      if (path.resolve(args[0]) === sourcePath) {
        return ast;
      }
      return host.getSourceFile(...args);
    },
    readFile: (...args) => {
      if (path.resolve(args[0]) === sourcePath) {
        return codeWithImport;
      }
      return host.readFile(...args);
    },
    fileExists: (...args) => {
      if (path.resolve(args[0]) === sourcePath) {
        return true;
      }
      return host.fileExists(...args);
    },
  };
  const program = ts.createProgram({
    options,
    rootNames: [sourcePath],
    host: newHost,
  });
  const diagnostics = ts.getPreEmitDiagnostics(program, ast);
  return diagnostics.map((d) => {
    const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
    if (!d.file || !d.start) return `- ${message}`;
    const { line: lineNumber } = ts.getLineAndCharacterOfPosition(d.file, d.start);
    const line = codeWithImport.split('\n').at(lineNumber)?.trim();
    return line ? `- ${message}\n    ${line}` : `- ${message}`;
  });
}

const fuse = new Fuse(
  [
    'client.files.content',
    'client.files.create',
    'client.files.delete',
    'client.files.list',
    'client.files.query',
    'client.files.retrieve',
    'client.split.cancel',
    'client.split.create',
    'client.split.delete',
    'client.split.get',
    'client.split.list',
    'client.parsing.cancel',
    'client.parsing.create',
    'client.parsing.delete',
    'client.parsing.get',
    'client.parsing.list',
    'client.parsing.listVersions',
    'client.extract.cancel',
    'client.extract.create',
    'client.extract.delete',
    'client.extract.generateSchema',
    'client.extract.get',
    'client.extract.list',
    'client.extract.validateSchema',
    'client.batches.cancel',
    'client.batches.create',
    'client.batches.get',
    'client.batches.list',
    'client.classify.cancel',
    'client.classify.create',
    'client.classify.get',
    'client.classify.list',
    'client.configurations.create',
    'client.configurations.delete',
    'client.configurations.list',
    'client.configurations.retrieve',
    'client.configurations.update',
    'client.webhookConfigs.create',
    'client.webhookConfigs.delete',
    'client.webhookConfigs.list',
    'client.webhookConfigs.retrieve',
    'client.webhookConfigs.update',
    'client.projects.get',
    'client.projects.list',
    'client.v2Projects.get',
    'client.v2Projects.list',
    'client.jobDataPoints.list',
    'client.dataSinks.create',
    'client.dataSinks.delete',
    'client.dataSinks.get',
    'client.dataSinks.list',
    'client.dataSinks.update',
    'client.dataSources.create',
    'client.dataSources.delete',
    'client.dataSources.get',
    'client.dataSources.list',
    'client.dataSources.update',
    'client.pipelines.create',
    'client.pipelines.delete',
    'client.pipelines.get',
    'client.pipelines.getStatus',
    'client.pipelines.list',
    'client.pipelines.listPaginated',
    'client.pipelines.retrieve',
    'client.pipelines.update',
    'client.pipelines.upsert',
    'client.pipelines.sync.cancel',
    'client.pipelines.sync.create',
    'client.pipelines.dataSources.getDataSources',
    'client.pipelines.dataSources.getStatus',
    'client.pipelines.dataSources.sync',
    'client.pipelines.dataSources.update',
    'client.pipelines.dataSources.updateDataSources',
    'client.pipelines.images.getPageFigure',
    'client.pipelines.images.getPageScreenshot',
    'client.pipelines.images.listPageFigures',
    'client.pipelines.images.listPageScreenshots',
    'client.pipelines.files.create',
    'client.pipelines.files.delete',
    'client.pipelines.files.getStatus',
    'client.pipelines.files.getStatusCounts',
    'client.pipelines.files.list',
    'client.pipelines.files.update',
    'client.pipelines.metadata.create',
    'client.pipelines.metadata.deleteAll',
    'client.pipelines.documents.create',
    'client.pipelines.documents.delete',
    'client.pipelines.documents.get',
    'client.pipelines.documents.getChunks',
    'client.pipelines.documents.getStatus',
    'client.pipelines.documents.getStatusCounts',
    'client.pipelines.documents.list',
    'client.pipelines.documents.sync',
    'client.pipelines.documents.upsert',
    'client.retrievers.create',
    'client.retrievers.delete',
    'client.retrievers.get',
    'client.retrievers.list',
    'client.retrievers.search',
    'client.retrievers.update',
    'client.retrievers.upsert',
    'client.retrievers.retriever.search',
    'client.beta.indexes.create',
    'client.beta.indexes.delete',
    'client.beta.indexes.get',
    'client.beta.indexes.list',
    'client.beta.indexes.sync',
    'client.beta.retrieval.find',
    'client.beta.retrieval.grep',
    'client.beta.retrieval.read',
    'client.beta.retrieval.retrieve',
    'client.beta.chat.create',
    'client.beta.chat.delete',
    'client.beta.chat.getSummary',
    'client.beta.chat.list',
    'client.beta.chat.retrieve',
    'client.beta.chat.stream',
    'client.beta.agentData.aggregate',
    'client.beta.agentData.create',
    'client.beta.agentData.delete',
    'client.beta.agentData.deleteByQuery',
    'client.beta.agentData.get',
    'client.beta.agentData.search',
    'client.beta.agentData.update',
    'client.beta.directories.create',
    'client.beta.directories.delete',
    'client.beta.directories.get',
    'client.beta.directories.list',
    'client.beta.directories.update',
    'client.beta.directories.files.add',
    'client.beta.directories.files.delete',
    'client.beta.directories.files.get',
    'client.beta.directories.files.list',
    'client.beta.directories.files.update',
    'client.beta.directories.files.upload',
    'client.beta.split.create',
    'client.beta.split.get',
    'client.beta.split.list',
  ],
  { threshold: 1, shouldSort: true },
);

function getMethodSuggestions(fullyQualifiedMethodName: string): string[] {
  return fuse
    .search(fullyQualifiedMethodName)
    .map(({ item }) => item)
    .slice(0, 5);
}

const proxyToObj = new WeakMap<any, any>();
const objToProxy = new WeakMap<any, any>();

type ClientProxyConfig = {
  path: string[];
  isBelievedBad?: boolean;
};

function makeSdkProxy<T extends object>(obj: T, { path, isBelievedBad = false }: ClientProxyConfig): T {
  let proxy: T = objToProxy.get(obj);

  if (!proxy) {
    proxy = new Proxy(obj, {
      get(target, prop, receiver) {
        const propPath = [...path, String(prop)];
        const value = Reflect.get(target, prop, receiver);

        if (isBelievedBad || (!(prop in target) && value === undefined)) {
          // If we're accessing a path that doesn't exist, it will probably eventually error.
          // Let's proxy it and mark it bad so that we can control the error message.
          // We proxy an empty class so that an invocation or construction attempt is possible.
          return makeSdkProxy(class {}, { path: propPath, isBelievedBad: true });
        }

        if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
          return makeSdkProxy(value, { path: propPath, isBelievedBad });
        }

        return value;
      },

      apply(target, thisArg, args) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a function. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.apply(target, proxyToObj.get(thisArg) ?? thisArg, args);
      },

      construct(target, args, newTarget) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a constructor. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.construct(target, args, newTarget);
      },
    });

    objToProxy.set(obj, proxy);
    proxyToObj.set(proxy, obj);
  }

  return proxy;
}

function parseError(code: string, error: unknown): string | undefined {
  if (!(error instanceof Error)) return;
  const cause = error.cause instanceof Error ? `: ${error.cause.message}` : '';
  const message = error.name ? `${error.name}: ${error.message}${cause}` : `${error.message}${cause}`;
  try {
    // Deno uses V8; the first "<anonymous>:LINE:COLUMN" is the top of stack.
    const lineNumber = error.stack?.match(/<anonymous>:([0-9]+):[0-9]+/)?.[1];
    // -1 for the zero-based indexing
    const line =
      lineNumber &&
      code
        .split('\n')
        .at(parseInt(lineNumber, 10) - 1)
        ?.trim();
    return line ? `${message}\n  at line ${lineNumber}\n    ${line}` : message;
  } catch {
    return message;
  }
}

const fetch = async (req: Request): Promise<Response> => {
  const { opts, code } = (await req.json()) as { opts: ClientOptions; code: string };

  const runFunctionSource = code ? getRunFunctionSource(code) : null;
  if (!runFunctionSource) {
    const message =
      code ?
        'The code is missing a top-level `run` function.'
      : 'The code argument is missing. Provide one containing a top-level `run` function.';
    return Response.json(
      {
        is_error: true,
        result: `${message} Write code within this template:\n\n\`\`\`\nasync function run(client) {\n  // Fill this out\n}\n\`\`\``,
        log_lines: [],
        err_lines: [],
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  const diagnostics = getTSDiagnostics(code);
  if (diagnostics.length > 0) {
    return Response.json(
      {
        is_error: true,
        result: `The code contains TypeScript diagnostics:\n${diagnostics.join('\n')}`,
        log_lines: [],
        err_lines: [],
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  const client = new LlamaCloud({
    ...opts,
  });

  const log_lines: string[] = [];
  const err_lines: string[] = [];
  const originalConsole = globalThis.console;
  globalThis.console = {
    ...originalConsole,
    log: (...args: unknown[]) => {
      log_lines.push(util.format(...args));
    },
    error: (...args: unknown[]) => {
      err_lines.push(util.format(...args));
    },
  };
  try {
    let run_ = async (client: any) => {};
    run_ = (await tseval(`${code}\nexport default run;`)).default;
    const result = await run_(makeSdkProxy(client, { path: ['client'] }));
    return Response.json({
      is_error: false,
      result,
      log_lines,
      err_lines,
    } satisfies WorkerOutput);
  } catch (e) {
    return Response.json(
      {
        is_error: true,
        result: parseError(code, e),
        log_lines,
        err_lines,
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  } finally {
    globalThis.console = originalConsole;
  }
};

export default { fetch };
