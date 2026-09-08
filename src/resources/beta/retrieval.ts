// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, PaginatedCursorPost, type PaginatedCursorPostParams } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';

export class Retrieval extends APIResource {
  /**
   * Retrieve relevant chunks via hybrid search (vector + full-text), with filtering
   * on built-in or user-defined metadata.
   *
   * @example
   * ```ts
   * const retrieval = await client.beta.retrieval.retrieve({
   *   index_id: 'idx-abc123',
   *   query: 'What are the key findings?',
   * });
   * ```
   */
  retrieve(params: RetrievalRetrieveParams, options?: RequestOptions): APIPromise<RetrievalRetrieveResponse> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post('/api/v1/retrieval/retrieve', {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * Search for files by name.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const retrievalFindResponse of client.beta.retrieval.find(
   *   { index_id: 'idx-abc123' },
   * )) {
   *   // ...
   * }
   * ```
   */
  find(
    params: RetrievalFindParams,
    options?: RequestOptions,
  ): PagePromise<RetrievalFindResponsesPaginatedCursorPost, RetrievalFindResponse> {
    const { organization_id, project_id, ...body } = params;
    return this._client.getAPIList(
      '/api/v1/retrieval/files/find',
      PaginatedCursorPost<RetrievalFindResponse>,
      { query: { organization_id, project_id }, body, method: 'post', ...options },
    );
  }

  /**
   * Grep within a file's parsed content using a regex pattern.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const retrievalGrepResponse of client.beta.retrieval.grep(
   *   {
   *     file_id: 'file_id',
   *     index_id: 'idx-abc123',
   *     pattern: 'revenue|profit',
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  grep(
    params: RetrievalGrepParams,
    options?: RequestOptions,
  ): PagePromise<RetrievalGrepResponsesPaginatedCursorPost, RetrievalGrepResponse> {
    const { organization_id, project_id, ...body } = params;
    return this._client.getAPIList(
      '/api/v1/retrieval/files/grep',
      PaginatedCursorPost<RetrievalGrepResponse>,
      { query: { organization_id, project_id }, body, method: 'post', ...options },
    );
  }

  /**
   * Read the parsed text content of a specific file.
   *
   * @example
   * ```ts
   * const response = await client.beta.retrieval.read({
   *   file_id: 'file_id',
   *   index_id: 'idx-abc123',
   * });
   * ```
   */
  read(params: RetrievalReadParams, options?: RequestOptions): APIPromise<RetrievalReadResponse> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post('/api/v1/retrieval/files/read', {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }
}

export type RetrievalFindResponsesPaginatedCursorPost = PaginatedCursorPost<RetrievalFindResponse>;

export type RetrievalGrepResponsesPaginatedCursorPost = PaginatedCursorPost<RetrievalGrepResponse>;

/**
 * Response containing retrieval results.
 */
export interface RetrievalRetrieveResponse {
  /**
   * Ordered list of retrieved chunks.
   */
  results: Array<RetrievalRetrieveResponse.Result>;
}

export namespace RetrievalRetrieveResponse {
  /**
   * A single retrieval result.
   */
  export interface Result {
    /**
     * Text content of the retrieved chunk.
     */
    content: string;

    /**
     * User-defined metadata associated with the chunk.
     */
    metadata?: { [key: string]: string | number | number | boolean | null | Array<string> } | null;

    /**
     * Relevance score from the reranker, if reranking was applied.
     */
    rerank_score?: number | null;

    /**
     * Hybrid search relevance score.
     */
    score?: number | null;

    /**
     * Built-in fields stored for every exported chunk.
     */
    static_fields?: Result.StaticFields;
  }

  export namespace Result {
    /**
     * Built-in fields stored for every exported chunk.
     */
    export interface StaticFields {
      /**
       * Attachments associated with the chunk
       */
      attachments?: Array<StaticFields.Attachment>;

      /**
       * End character offset of the chunk.
       */
      chunk_end_char?: number | null;

      /**
       * Index of the chunk within the file.
       */
      chunk_index?: number | null;

      /**
       * Start character offset of the chunk.
       */
      chunk_start_char?: number | null;

      /**
       * Token count of the chunk.
       */
      chunk_token_count?: number | null;

      /**
       * Last page number covered by this chunk.
       */
      page_range_end?: number | null;

      /**
       * First page number covered by this chunk.
       */
      page_range_start?: number | null;

      /**
       * ID of the parsed file.
       */
      parsed_directory_file_id?: string | null;
    }

    export namespace StaticFields {
      /**
       * Reference to a file attachment, retrievable via
       * `GET /api/v1/beta/attachments/{attachment_name}?source_id=...`.
       */
      export interface Attachment {
        /**
         * Attachment-relative path, e.g. 'screenshots/page_7.jpg'.
         */
        attachment_name: string;

        /**
         * File ID to pass as source_id when fetching the attachment.
         */
        source_id: string;

        /**
         * Attachment kind, e.g. 'screenshot', 'items'.
         */
        type: string;
      }
    }
  }
}

/**
 * A file returned by find.
 */
export interface RetrievalFindResponse {
  /**
   * ID of the file.
   */
  file_id: string;

  /**
   * Display name of the file.
   */
  file_name: string;
}

/**
 * A single grep match within a file.
 */
export interface RetrievalGrepResponse {
  /**
   * Matched text content.
   */
  content: string;

  /**
   * End character offset of the match.
   */
  end_char: number;

  /**
   * Start character offset of the match.
   */
  start_char: number;
}

/**
 * File read result.
 */
export interface RetrievalReadResponse {
  /**
   * Parsed text content of the file.
   */
  content: string;
}

export interface RetrievalRetrieveParams {
  /**
   * Body param: ID of the index to retrieve against.
   */
  index_id: string;

  /**
   * Body param: Natural-language query to retrieve relevant chunks.
   */
  query: string;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Filters on user-defined metadata fields.
   */
  custom_filters?: {
    [key: string]: RetrievalRetrieveParams.ValueFilter | Array<RetrievalRetrieveParams.UnionMember1> | null;
  } | null;

  /**
   * Body param: Weight of the full-text search pipeline (0-1).
   */
  full_text_pipeline_weight?: number | null;

  /**
   * Body param: Number of candidates for approximate nearest neighbor search.
   */
  num_candidates?: number | null;

  /**
   * Body param: Reranking configuration applied after hybrid search. Enabled by
   * default.
   */
  rerank?: RetrievalRetrieveParams.Rerank;

  /**
   * Body param: Minimum score threshold for returned results.
   */
  score_threshold?: number | null;

  /**
   * Body param: Filters on built-in document fields (page range, chunk index, etc.).
   */
  static_filters?: RetrievalRetrieveParams.StaticFilters | null;

  /**
   * Body param: Maximum number of results to return. Values above 500 are capped
   * at 500.
   */
  top_k?: number | null;

  /**
   * Body param: Weight of the vector search pipeline (0-1).
   */
  vector_pipeline_weight?: number | null;
}

export namespace RetrievalRetrieveParams {
  /**
   * Filter on a single metadata field value.
   */
  export interface ValueFilter {
    operator: 'eq' | 'gt' | 'gte' | 'in' | 'lt' | 'lte' | 'ne' | 'nin';

    value: string | boolean | number | Array<string | boolean | number>;
  }

  /**
   * One bound of a numeric range filter on a metadata field.
   */
  export interface UnionMember1 {
    operator: 'eq' | 'gt' | 'gte' | 'in' | 'lt' | 'lte' | 'ne' | 'nin';

    value: number | Array<number>;
  }

  /**
   * Reranking configuration applied after hybrid search. Enabled by default.
   */
  export interface Rerank {
    /**
     * Set to false to disable reranking.
     */
    enabled?: boolean;

    /**
     * Number of results to return after reranking.
     */
    top_n?: number | null;
  }

  /**
   * Filters on built-in document fields (page range, chunk index, etc.).
   */
  export interface StaticFilters {
    /**
     * Filter on a string field.
     */
    parsed_directory_file_id?: StaticFilters.ParsedDirectoryFileID | null;
  }

  export namespace StaticFilters {
    /**
     * Filter on a string field.
     */
    export interface ParsedDirectoryFileID {
      operator: 'eq' | 'gt' | 'gte' | 'in' | 'lt' | 'lte' | 'ne' | 'nin';

      value: string | Array<string>;
    }
  }
}

export interface RetrievalFindParams extends PaginatedCursorPostParams {
  /**
   * Body param: ID of the index to search within.
   */
  index_id: string;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Exact file name to match.
   */
  file_name?: string | null;

  /**
   * Body param: Substring match on file name (case-insensitive).
   */
  file_name_contains?: string | null;
}

export interface RetrievalGrepParams extends PaginatedCursorPostParams {
  /**
   * Body param: ID of the file to grep.
   */
  file_id: string;

  /**
   * Body param: ID of the index the file belongs to.
   */
  index_id: string;

  /**
   * Body param: Regex pattern to search for.
   */
  pattern: string;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Number of characters of context to include before and after the
   * matched pattern in the content field of the response
   */
  context_chars?: number | null;
}

export interface RetrievalReadParams {
  /**
   * Body param: ID of the file to read.
   */
  file_id: string;

  /**
   * Body param: ID of the index the file belongs to.
   */
  index_id: string;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Maximum number of characters to read from the offset.
   */
  max_length?: number | null;

  /**
   * Body param: Starting character offset.
   */
  offset?: number;
}

export declare namespace Retrieval {
  export {
    type RetrievalRetrieveResponse as RetrievalRetrieveResponse,
    type RetrievalFindResponse as RetrievalFindResponse,
    type RetrievalGrepResponse as RetrievalGrepResponse,
    type RetrievalReadResponse as RetrievalReadResponse,
    type RetrievalFindResponsesPaginatedCursorPost as RetrievalFindResponsesPaginatedCursorPost,
    type RetrievalGrepResponsesPaginatedCursorPost as RetrievalGrepResponsesPaginatedCursorPost,
    type RetrievalRetrieveParams as RetrievalRetrieveParams,
    type RetrievalFindParams as RetrievalFindParams,
    type RetrievalGrepParams as RetrievalGrepParams,
    type RetrievalReadParams as RetrievalReadParams,
  };
}
