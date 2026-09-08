// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SplitAPI from './split';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, PaginatedCursor, type PaginatedCursorParams } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';
import { pollUntilComplete, PollingOptions, DEFAULT_TIMEOUT } from '../../core/polling';

export class Split extends APIResource {
  /**
   * Create a document split job.
   *
   * @example
   * ```ts
   * const split = await client.beta.split.create({
   *   document_input: { type: 'type', value: 'value' },
   * });
   * ```
   */
  create(params: SplitCreateParams, options?: RequestOptions): APIPromise<SplitCreateResponse> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post('/api/v1/beta/split/jobs', {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * List document split jobs.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const splitListResponse of client.beta.split.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: SplitListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SplitListResponsesPaginatedCursor, SplitListResponse> {
    return this._client.getAPIList('/api/v1/beta/split/jobs', PaginatedCursor<SplitListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Get a document split job.
   *
   * @example
   * ```ts
   * const split = await client.beta.split.get('split_job_id');
   * ```
   */
  get(
    splitJobID: string,
    query: SplitGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SplitGetResponse> {
    return this._client.get(path`/api/v1/beta/split/jobs/${splitJobID}`, { query, ...options });
  }

  /**
   * Wait for a document split job to complete by polling until it reaches a terminal state.
   *
   * This method polls the job status at regular intervals until the job completes
   * successfully or fails. It uses configurable backoff strategies to optimize
   * polling behavior.
   *
   * Experimental: This endpoint is not yet ready for production use and is subject
   * to change at any time.
   *
   * @param splitJobID - The ID of the split job to wait for
   * @param params - Query parameters and polling configuration
   * @param options - Additional request options
   * @returns The completed SplitGetResponse with result populated
   * @throws {PollingTimeoutError} If the job doesn't complete within the timeout period
   * @throws {PollingError} If the job fails
   *
   * @example
   * ```typescript
   * import LlamaCloud from 'llama-cloud';
   *
   * const client = new LlamaCloud({ apiKey: '...' });
   *
   * // Create a split job
   * const job = await client.beta.split.create({
   *   categories: [
   *     { name: 'essay', description: 'Essay documents' },
   *     { name: 'research_paper', description: 'Research paper documents' }
   *   ],
   *   document_input: { type: 'file_id', value: 'file_id' }
   * });
   *
   * // Wait for it to complete
   * const completedJob = await client.beta.split.waitForCompletion(
   *   job.id,
   *   { verbose: true }
   * );
   *
   * // Access the results
   * console.log(completedJob.result?.segments);
   * ```
   */
  async waitForCompletion(
    splitJobID: string,
    params: SplitWaitForCompletionParams | null | undefined = {},
    options?: RequestOptions,
  ): Promise<SplitGetResponse> {
    const { pollingInterval, maxInterval, timeout, backoff, verbose, ...queryParams } = params ?? {};

    const pollingOptions: PollingOptions = {
      pollingInterval: pollingInterval ?? 1.0,
      maxInterval: maxInterval ?? 5.0,
      timeout: timeout ?? DEFAULT_TIMEOUT,
      backoff: backoff ?? 'linear',
      verbose: verbose ?? false,
    };

    return pollUntilComplete(
      async () => {
        return this.get(splitJobID, queryParams, options);
      },
      (job) => job.status === 'completed',
      (job) => job.status === 'failed',
      (job) => {
        const errorParts = [`Split job ${splitJobID} failed with status: ${job.status}`];
        if (job.error_message) {
          errorParts.push(`Error: ${job.error_message}`);
        }
        return errorParts.join(' | ');
      },
      pollingOptions,
    );
  }

  /**
   * Create a document split job and wait for it to complete, returning the result.
   *
   * This is a convenience method that combines create() and waitForCompletion()
   * into a single call for the most common end-to-end workflow.
   *
   * Experimental: This endpoint is not yet ready for production use and is subject
   * to change at any time.
   *
   * @param params - Split job creation parameters including categories and document input
   * @param options - Request options
   * @returns The completed SplitGetResponse with result containing segments
   * @throws {PollingTimeoutError} If the job doesn't complete within the timeout period
   * @throws {PollingError} If the job fails
   *
   * @example
   * ```typescript
   * import LlamaCloud from 'llama-cloud';
   * import fs from 'fs';
   *
   * const client = new LlamaCloud({ apiKey: '...' });
   *
   * // Upload a file first
   * const fileObj = await client.files.upload({
   *   upload_file: fs.createReadStream('combined_document.pdf')
   * });
   *
   * // One-shot: create split job, wait for completion, and get result
   * const result = await client.beta.split.split({
   *   categories: [
   *     { name: 'essay', description: 'A philosophical or reflective piece of writing' },
   *     { name: 'research_paper', description: 'A formal academic paper with citations' }
   *   ],
   *   document_input: { type: 'file_id', value: fileObj.id },
   *   verbose: true
   * });
   *
   * // Access the segments
   * for (const segment of result.result?.segments || []) {
   *   console.log(`Category: ${segment.category}, Pages: ${segment.pages}`);
   * }
   * ```
   */
  async split(params: SplitSplitParams, options?: RequestOptions): Promise<SplitGetResponse> {
    const { pollingInterval, maxInterval, timeout, backoff, verbose, ...createParams } = params;

    // Create the split job
    const job = await this.create(createParams, options);

    // Wait for completion
    const pollingOptions: PollingOptions = {};
    if (pollingInterval !== undefined) pollingOptions.pollingInterval = pollingInterval;
    if (maxInterval !== undefined) pollingOptions.maxInterval = maxInterval;
    if (timeout !== undefined) pollingOptions.timeout = timeout;
    if (backoff !== undefined) pollingOptions.backoff = backoff;
    if (verbose !== undefined) pollingOptions.verbose = verbose;

    // Only pass query params that are valid for waitForCompletion
    const waitParams: SplitWaitForCompletionParams = {
      ...pollingOptions,
    };
    if (createParams.organization_id !== undefined) waitParams.organization_id = createParams.organization_id;
    if (createParams.project_id !== undefined) waitParams.project_id = createParams.project_id;

    return this.waitForCompletion(job.id, waitParams, options);
  }
}

export type SplitListResponsesPaginatedCursor = PaginatedCursor<SplitListResponse>;

/**
 * Category definition for document splitting.
 */
export interface SplitCategory {
  /**
   * Name of the category.
   */
  name: string;

  /**
   * Optional description of what content belongs in this category.
   */
  description?: string | null;
}

/**
 * Document input specification for beta API.
 */
export interface SplitDocumentInput {
  /**
   * Type of document input. Valid values are: file_id
   */
  type: string;

  /**
   * Document identifier.
   */
  value: string;
}

/**
 * Result of a completed split job.
 */
export interface SplitResultResponse {
  /**
   * List of document segments.
   */
  segments: Array<SplitSegmentResponse>;
}

/**
 * A segment of the split document.
 */
export interface SplitSegmentResponse {
  /**
   * Category name this split belongs to.
   */
  category: string;

  /**
   * Categorical confidence level. Valid values are: high, medium, low.
   */
  confidence_category: string;

  /**
   * 1-indexed page numbers in this split.
   */
  pages: Array<number>;
}

/**
 * Beta response — uses nested document_input object.
 */
export interface SplitCreateResponse {
  /**
   * Unique identifier for the split job.
   */
  id: string;

  /**
   * Categories used for splitting.
   */
  categories: Array<SplitCategory>;

  /**
   * Document that was split.
   */
  document_input: SplitDocumentInput;

  /**
   * Project ID this job belongs to.
   */
  project_id: string;

  /**
   * Current status of the job. Valid values are: pending, processing, completed,
   * failed, cancelled.
   */
  status: string;

  /**
   * User ID who created this job.
   */
  user_id: string;

  /**
   * Split configuration ID used for this job.
   */
  configuration_id?: string | null;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Error message if the job failed.
   */
  error_message?: string | null;

  /**
   * Result of a completed split job.
   */
  result?: SplitResultResponse | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

/**
 * Beta response — uses nested document_input object.
 */
export interface SplitListResponse {
  /**
   * Unique identifier for the split job.
   */
  id: string;

  /**
   * Categories used for splitting.
   */
  categories: Array<SplitCategory>;

  /**
   * Document that was split.
   */
  document_input: SplitDocumentInput;

  /**
   * Project ID this job belongs to.
   */
  project_id: string;

  /**
   * Current status of the job. Valid values are: pending, processing, completed,
   * failed, cancelled.
   */
  status: string;

  /**
   * User ID who created this job.
   */
  user_id: string;

  /**
   * Split configuration ID used for this job.
   */
  configuration_id?: string | null;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Error message if the job failed.
   */
  error_message?: string | null;

  /**
   * Result of a completed split job.
   */
  result?: SplitResultResponse | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

/**
 * Beta response — uses nested document_input object.
 */
export interface SplitGetResponse {
  /**
   * Unique identifier for the split job.
   */
  id: string;

  /**
   * Categories used for splitting.
   */
  categories: Array<SplitCategory>;

  /**
   * Document that was split.
   */
  document_input: SplitDocumentInput;

  /**
   * Project ID this job belongs to.
   */
  project_id: string;

  /**
   * Current status of the job. Valid values are: pending, processing, completed,
   * failed, cancelled.
   */
  status: string;

  /**
   * User ID who created this job.
   */
  user_id: string;

  /**
   * Split configuration ID used for this job.
   */
  configuration_id?: string | null;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Error message if the job failed.
   */
  error_message?: string | null;

  /**
   * Result of a completed split job.
   */
  result?: SplitResultResponse | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

export interface SplitCreateParams {
  /**
   * Body param: Document to be split.
   */
  document_input: SplitDocumentInput;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Split configuration with categories and splitting strategy.
   */
  configuration?: SplitCreateParams.Configuration | null;

  /**
   * Body param: Saved split configuration ID.
   */
  configuration_id?: string | null;
}

export namespace SplitCreateParams {
  /**
   * Split configuration with categories and splitting strategy.
   */
  export interface Configuration {
    /**
     * Categories to split documents into.
     */
    categories: Array<SplitAPI.SplitCategory>;

    /**
     * Strategy for splitting documents.
     */
    splitting_strategy?: Configuration.SplittingStrategy;
  }

  export namespace Configuration {
    /**
     * Strategy for splitting documents.
     */
    export interface SplittingStrategy {
      /**
       * Controls handling of pages that don't match any category. 'include': pages can
       * be grouped as 'uncategorized' and included in results. 'forbid': all pages must
       * be assigned to a defined category. 'omit': pages can be classified as
       * 'uncategorized' but are excluded from results.
       */
      allow_uncategorized?: 'forbid' | 'include' | 'omit';

      /**
       * Free-form guidance for where segment boundaries are placed.
       */
      custom_instructions?: string | null;

      /**
       * Minimum pages per segment. Shorter segments are merged into an adjacent segment;
       * 1 disables merging.
       */
      min_pages_per_split?: number;
    }
  }
}

export interface SplitListParams extends PaginatedCursorParams {
  /**
   * Include items created at or after this timestamp (inclusive)
   */
  created_at_on_or_after?: string | null;

  /**
   * Include items created at or before this timestamp (inclusive)
   */
  created_at_on_or_before?: string | null;

  /**
   * Filter by specific job IDs
   */
  job_ids?: Array<string> | null;

  organization_id?: string | null;

  project_id?: string | null;

  /**
   * Filter by job status (pending, processing, completed, failed, cancelled)
   */
  status?: 'cancelled' | 'completed' | 'failed' | 'pending' | 'processing' | null;
}

export interface SplitGetParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface SplitSplitParams extends SplitCreateParams, PollingOptions {}

export interface SplitWaitForCompletionParams extends PollingOptions {
  organization_id?: string | null;

  project_id?: string | null;
}

export declare namespace Split {
  export {
    type SplitCategory as SplitCategory,
    type SplitDocumentInput as SplitDocumentInput,
    type SplitResultResponse as SplitResultResponse,
    type SplitSegmentResponse as SplitSegmentResponse,
    type SplitCreateResponse as SplitCreateResponse,
    type SplitListResponse as SplitListResponse,
    type SplitGetResponse as SplitGetResponse,
    type SplitListResponsesPaginatedCursor as SplitListResponsesPaginatedCursor,
    type SplitCreateParams as SplitCreateParams,
    type SplitListParams as SplitListParams,
    type SplitGetParams as SplitGetParams,
    type SplitSplitParams as SplitSplitParams,
    type SplitWaitForCompletionParams as SplitWaitForCompletionParams,
  };
}
