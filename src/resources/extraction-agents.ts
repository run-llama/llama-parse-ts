// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { PagePromise, PaginatedCursor, type PaginatedCursorParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

export class ExtractionAgents extends APIResource {
  /**
   * List the extraction agents in a project, newest first.
   */
  list(
    query: ExtractionAgentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ExtractAgentsPaginatedCursor, ExtractAgent> {
    return this._client.getAPIList('/api/v1/beta/extraction-agents', PaginatedCursor<ExtractAgent>, {
      query,
      ...options,
    });
  }
}

export type ExtractAgentsPaginatedCursor = PaginatedCursor<ExtractAgent>;

/**
 * Schema and configuration for an extraction agent.
 */
export interface ExtractAgent {
  /**
   * The id of the extraction agent.
   */
  id: string;

  /**
   * The configuration parameters for the extraction agent.
   */
  config: ExtractAgent.Config;

  /**
   * The schema of the data.
   */
  data_schema: {
    [key: string]: { [key: string]: unknown } | Array<unknown> | string | number | boolean | null;
  };

  /**
   * The name of the extraction agent.
   */
  name: string;

  /**
   * The ID of the project that the extraction agent belongs to.
   */
  project_id: string;

  /**
   * The creation time of the extraction agent.
   */
  created_at?: string | null;

  /**
   * Custom configuration type for the extraction agent. Currently supports
   * 'default'.
   */
  custom_configuration?: 'default' | null;

  /**
   * The last update time of the extraction agent.
   */
  updated_at?: string | null;
}

export namespace ExtractAgent {
  /**
   * The configuration parameters for the extraction agent.
   */
  export interface Config {
    /**
     * The mode to use for chunking the document.
     */
    chunk_mode?: 'PAGE' | 'SECTION';

    /**
     * @deprecated Whether to fetch citation bounding boxes for the extraction. Only
     * available in PREMIUM mode. Deprecated: this is now synonymous with cite_sources.
     */
    citation_bbox?: boolean;

    /**
     * Whether to cite sources for the extraction.
     */
    cite_sources?: boolean;

    /**
     * Whether to fetch confidence scores for the extraction.
     */
    confidence_scores?: boolean;

    /**
     * The extract model to use for data extraction. If not provided, uses the default
     * for the extraction mode.
     */
    extract_model?:
      | 'gemini-2.0-flash'
      | 'gemini-2.5-flash'
      | 'gemini-2.5-flash-lite'
      | 'gemini-2.5-pro'
      | 'openai-gpt-4-1'
      | 'openai-gpt-4-1-mini'
      | 'openai-gpt-4-1-nano'
      | 'openai-gpt-4o'
      | 'openai-gpt-4o-mini'
      | 'openai-gpt-5'
      | 'openai-gpt-5-mini'
      | (string & {})
      | null;

    /**
     * The extraction mode specified (FAST, BALANCED, MULTIMODAL, PREMIUM).
     */
    extraction_mode?: 'BALANCED' | 'FAST' | 'MULTIMODAL' | 'PREMIUM';

    /**
     * The extraction target specified.
     */
    extraction_target?: 'PER_DOC' | 'PER_PAGE' | 'PER_TABLE_ROW';

    /**
     * Whether to use high resolution mode for the extraction.
     */
    high_resolution_mode?: boolean;

    /**
     * Whether to invalidate the cache for the extraction.
     */
    invalidate_cache?: boolean;

    /**
     * DEPRECATED: Whether to use fast mode for multimodal extraction.
     */
    multimodal_fast_mode?: boolean;

    /**
     * Number of pages to pass as context on long document extraction.
     */
    num_pages_context?: number | null;

    /**
     * Comma-separated list of page numbers or ranges to extract from (1-based, e.g.,
     * '1,3,5-7,9' or '1-3,8-10').
     */
    page_range?: string | null;

    /**
     * Public model names.
     */
    parse_model?:
      | 'anthropic-haiku-3.5'
      | 'anthropic-haiku-4.5'
      | 'anthropic-sonnet-3.5'
      | 'anthropic-sonnet-3.5-v2'
      | 'anthropic-sonnet-3.7'
      | 'anthropic-sonnet-4.0'
      | 'anthropic-sonnet-4.5'
      | 'gemini-2.0-flash'
      | 'gemini-2.0-flash-lite'
      | 'gemini-2.5-flash'
      | 'gemini-2.5-flash-lite'
      | 'gemini-2.5-pro'
      | 'gemini-3.0-pro'
      | 'gemini-3.1-pro'
      | 'openai-gpt-4-1'
      | 'openai-gpt-4-1-mini'
      | 'openai-gpt-4-1-nano'
      | 'openai-gpt-4o'
      | 'openai-gpt-4o-mini'
      | 'openai-gpt-5'
      | 'openai-gpt-5-mini'
      | 'openai-gpt-5-nano'
      | 'openai-text-embedding-3-large'
      | 'openai-text-embedding-3-small'
      | 'openai-whisper-1'
      | null;

    /**
     * The priority for the request. This field may be ignored or overwritten depending
     * on the organization tier.
     */
    priority?: 'critical' | 'high' | 'low' | 'medium' | null;

    /**
     * The system prompt to use for the extraction.
     */
    system_prompt?: string | null;

    /**
     * Whether to use reasoning for the extraction.
     */
    use_reasoning?: boolean;
  }
}

export interface ExtractionAgentListParams extends PaginatedCursorParams {
  /**
   * Whether to include default agents in the results
   */
  include_default?: boolean;

  organization_id?: string | null;

  project_id?: string | null;
}

export declare namespace ExtractionAgents {
  export {
    type ExtractAgent as ExtractAgent,
    type ExtractAgentsPaginatedCursor as ExtractAgentsPaginatedCursor,
    type ExtractionAgentListParams as ExtractionAgentListParams,
  };
}
