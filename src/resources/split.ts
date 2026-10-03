// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as BetaSplitAPI from './beta/split';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedCursor, type PaginatedCursorParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Split extends APIResource {
  /**
   * Create a split job.
   *
   * ## Document input
   *
   * Set `file_input` to a file ID or a completed parse job ID (`pjb-...`). Supplying
   * a parse job reuses its output instead of reading the document again.
   *
   * ## Page selection
   *
   * `configuration.target_pages` selects which pages of a supplied parse job to
   * split (1-based; `1-50`, `1,3,5-7`). Pages are read in ascending document order,
   * and each segment's `pages` are the parse job's own page numbers, so segments map
   * straight back to the original document. Requires a parse job as `file_input`;
   * passing it with a file ID returns 400.
   *
   * ## Parse settings
   *
   * `configuration.parse_tier` and `configuration.parse_config_id` control how the
   * document is read before splitting; both are ignored when a parse job is
   * supplied. A parse configuration restricted to a page subset (`target_pages` or
   * `max_pages`) is rejected, since split results always number pages relative to
   * the full document.
   *
   * The job runs asynchronously. Poll `GET /split/jobs/{split_job_id}` or register a
   * webhook to monitor completion.
   *
   * @example
   * ```ts
   * const split = await client.split.create({
   *   file_input: 'dfl-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
   * });
   * ```
   */
  create(params: SplitCreateParams, options?: RequestOptions): APIPromise<SplitCreateResponse> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post('/api/v1/split/jobs', {
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
   * for await (const splitListResponse of client.split.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: SplitListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SplitListResponsesPaginatedCursor, SplitListResponse> {
    return this._client.getAPIList('/api/v1/split/jobs', PaginatedCursor<SplitListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Get a document split job.
   *
   * @example
   * ```ts
   * const split = await client.split.get('split_job_id');
   * ```
   */
  get(
    splitJobID: string,
    query: SplitGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SplitGetResponse> {
    return this._client.get(path`/api/v1/split/jobs/${splitJobID}`, { query, ...options });
  }

  /**
   * Delete a split job and its results.
   *
   * @example
   * ```ts
   * const split = await client.split.delete('split_job_id');
   * ```
   */
  delete(
    splitJobID: string,
    params: SplitDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { organization_id, project_id } = params ?? {};
    return this._client.delete(path`/api/v1/split/jobs/${splitJobID}`, {
      query: { organization_id, project_id },
      ...options,
    });
  }

  /**
   * Cancel a running split job.
   *
   * Requests cancellation; the job transitions to CANCELLED asynchronously once
   * processing stops. Returns the job, which may still be in its current
   * non-terminal state. Jobs already in a terminal state (COMPLETED, FAILED,
   * CANCELLED) cannot be cancelled.
   *
   * @example
   * ```ts
   * const response = await client.split.cancel('split_job_id');
   * ```
   */
  cancel(
    splitJobID: string,
    params: SplitCancelParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SplitCancelResponse> {
    const { organization_id, project_id } = params ?? {};
    return this._client.post(path`/api/v1/split/jobs/${splitJobID}/cancel`, {
      query: { organization_id, project_id },
      ...options,
    });
  }
}

export type SplitListResponsesPaginatedCursor = PaginatedCursor<SplitListResponse>;

/**
 * A split job.
 */
export interface SplitCreateResponse {
  /**
   * Unique identifier for the split job.
   */
  id: string;

  /**
   * Categories used for splitting.
   */
  categories: Array<BetaSplitAPI.SplitCategory>;

  /**
   * Whether the input was a file or parse job
   */
  document_input_type: 'file_id' | 'parse_job_id' | 'url';

  /**
   * File ID or parse job ID
   */
  file_input: string;

  /**
   * Project this job belongs to.
   */
  project_id: string;

  /**
   * Current job status. Valid values are: pending, processing, completed, failed,
   * cancelled.
   */
  status: string;

  /**
   * User who created this job.
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
   * Saved parse configuration ID requested for this job, if any.
   */
  parse_config_id?: string | null;

  /**
   * Parse tier requested for this job, if any.
   */
  parse_tier?: string | null;

  /**
   * Result of a completed split job.
   */
  result?: BetaSplitAPI.SplitResultResponse | null;

  /**
   * Strategy used for splitting.
   */
  splitting_strategy?: SplitCreateResponse.SplittingStrategy;

  /**
   * Page selection requested for this job, if any.
   */
  target_pages?: string | null;

  /**
   * Idempotency key scoped to the project, if one was provided.
   */
  transaction_id?: string | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

export namespace SplitCreateResponse {
  /**
   * Strategy used for splitting.
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

/**
 * A split job.
 */
export interface SplitListResponse {
  /**
   * Unique identifier for the split job.
   */
  id: string;

  /**
   * Categories used for splitting.
   */
  categories: Array<BetaSplitAPI.SplitCategory>;

  /**
   * Whether the input was a file or parse job
   */
  document_input_type: 'file_id' | 'parse_job_id' | 'url';

  /**
   * File ID or parse job ID
   */
  file_input: string;

  /**
   * Project this job belongs to.
   */
  project_id: string;

  /**
   * Current job status. Valid values are: pending, processing, completed, failed,
   * cancelled.
   */
  status: string;

  /**
   * User who created this job.
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
   * Saved parse configuration ID requested for this job, if any.
   */
  parse_config_id?: string | null;

  /**
   * Parse tier requested for this job, if any.
   */
  parse_tier?: string | null;

  /**
   * Result of a completed split job.
   */
  result?: BetaSplitAPI.SplitResultResponse | null;

  /**
   * Strategy used for splitting.
   */
  splitting_strategy?: SplitListResponse.SplittingStrategy;

  /**
   * Page selection requested for this job, if any.
   */
  target_pages?: string | null;

  /**
   * Idempotency key scoped to the project, if one was provided.
   */
  transaction_id?: string | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

export namespace SplitListResponse {
  /**
   * Strategy used for splitting.
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

export type SplitDeleteResponse = unknown;

/**
 * A split job.
 */
export interface SplitCancelResponse {
  /**
   * Unique identifier for the split job.
   */
  id: string;

  /**
   * Categories used for splitting.
   */
  categories: Array<BetaSplitAPI.SplitCategory>;

  /**
   * Whether the input was a file or parse job
   */
  document_input_type: 'file_id' | 'parse_job_id' | 'url';

  /**
   * File ID or parse job ID
   */
  file_input: string;

  /**
   * Project this job belongs to.
   */
  project_id: string;

  /**
   * Current job status. Valid values are: pending, processing, completed, failed,
   * cancelled.
   */
  status: string;

  /**
   * User who created this job.
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
   * Saved parse configuration ID requested for this job, if any.
   */
  parse_config_id?: string | null;

  /**
   * Parse tier requested for this job, if any.
   */
  parse_tier?: string | null;

  /**
   * Result of a completed split job.
   */
  result?: BetaSplitAPI.SplitResultResponse | null;

  /**
   * Strategy used for splitting.
   */
  splitting_strategy?: SplitCancelResponse.SplittingStrategy;

  /**
   * Page selection requested for this job, if any.
   */
  target_pages?: string | null;

  /**
   * Idempotency key scoped to the project, if one was provided.
   */
  transaction_id?: string | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

export namespace SplitCancelResponse {
  /**
   * Strategy used for splitting.
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

/**
 * A split job.
 */
export interface SplitGetResponse {
  /**
   * Unique identifier for the split job.
   */
  id: string;

  /**
   * Categories used for splitting.
   */
  categories: Array<BetaSplitAPI.SplitCategory>;

  /**
   * Whether the input was a file or parse job
   */
  document_input_type: 'file_id' | 'parse_job_id' | 'url';

  /**
   * File ID or parse job ID
   */
  file_input: string;

  /**
   * Project this job belongs to.
   */
  project_id: string;

  /**
   * Current job status. Valid values are: pending, processing, completed, failed,
   * cancelled.
   */
  status: string;

  /**
   * User who created this job.
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
   * Saved parse configuration ID requested for this job, if any.
   */
  parse_config_id?: string | null;

  /**
   * Parse tier requested for this job, if any.
   */
  parse_tier?: string | null;

  /**
   * Result of a completed split job.
   */
  result?: BetaSplitAPI.SplitResultResponse | null;

  /**
   * Strategy used for splitting.
   */
  splitting_strategy?: SplitGetResponse.SplittingStrategy;

  /**
   * Page selection requested for this job, if any.
   */
  target_pages?: string | null;

  /**
   * Idempotency key scoped to the project, if one was provided.
   */
  transaction_id?: string | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

export namespace SplitGetResponse {
  /**
   * Strategy used for splitting.
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

export interface SplitCreateParams {
  /**
   * Body param: File ID or parse job ID
   */
  file_input: string;

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
   * Body param: Saved configuration ID
   */
  configuration_id?: string | null;

  /**
   * Body param: Idempotency key scoped to the project. Reusing a key returns the
   * original job; the new request body is ignored.
   */
  transaction_id?: string | null;

  /**
   * Body param: IDs of saved webhook configurations to notify for this job.
   */
  webhook_configuration_ids?: Array<string> | null;

  /**
   * Body param: Outbound webhook endpoints to notify on job status changes
   */
  webhook_configurations?: Array<SplitCreateParams.WebhookConfiguration> | null;
}

export namespace SplitCreateParams {
  /**
   * Split configuration with categories and splitting strategy.
   */
  export interface Configuration {
    /**
     * Categories to split documents into.
     */
    categories: Array<BetaSplitAPI.SplitCategory>;

    /**
     * Saved parse configuration ID to control how the document is parsed before
     * splitting. Takes precedence over parse_tier. Configurations that restrict pages
     * (`target_pages` or `max_pages` on the parse configuration) are rejected: split
     * results number pages relative to the full document. Ignored when a completed
     * parse job is supplied as file_input.
     */
    parse_config_id?: string | null;

    /**
     * Parse tier used to read the document before splitting. Defaults to fast. Ignored
     * when a completed parse job is supplied as file_input.
     */
    parse_tier?: 'agentic' | 'agentic_plus' | 'cost_effective' | 'fast' | null;

    /**
     * Strategy for splitting documents.
     */
    splitting_strategy?: Configuration.SplittingStrategy;

    /**
     * Comma-separated page numbers or ranges to split (1-based). Omit to split all
     * pages. Requires a completed parse job as file_input.
     */
    target_pages?: string | null;

    /**
     * Split version to run. Omit for the current release. Preview versions are
     * selectable by name and never resolved automatically.
     */
    version?: string | null;
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

  /**
   * Configuration for a single outbound webhook endpoint.
   */
  export interface WebhookConfiguration {
    /**
     * Events to subscribe to (e.g. 'parse.success', 'extract.error'). If null, all
     * events are delivered.
     */
    webhook_events?: Array<
      | 'batch.cancelled'
      | 'batch.error'
      | 'batch.pending'
      | 'batch.running'
      | 'batch.success'
      | 'classify.cancelled'
      | 'classify.error'
      | 'classify.partial_success'
      | 'classify.pending'
      | 'classify.running'
      | 'classify.success'
      | 'extract.cancelled'
      | 'extract.error'
      | 'extract.partial_success'
      | 'extract.pending'
      | 'extract.success'
      | 'parse.cancelled'
      | 'parse.error'
      | 'parse.partial_success'
      | 'parse.pending'
      | 'parse.running'
      | 'parse.success'
      | 'sheets.cancelled'
      | 'sheets.error'
      | 'sheets.partial_success'
      | 'sheets.pending'
      | 'sheets.success'
      | 'split.cancelled'
      | 'split.error'
      | 'split.pending'
      | 'split.processing'
      | 'split.success'
      | 'unmapped_event'
    > | null;

    /**
     * Custom HTTP headers sent with each webhook request (e.g. auth tokens)
     */
    webhook_headers?: { [key: string]: string } | null;

    /**
     * Response format sent to the webhook: 'string' (default) or 'json'
     */
    webhook_output_format?: string | null;

    /**
     * Shared signing secret used to sign webhook deliveries. When set, each request
     * includes an HMAC-SHA256 signature of the request body in the 'LC-Signature'
     * header (value 'sha256=<hex>'). Recompute the HMAC over the raw request body with
     * this secret to verify the delivery is authentic.
     */
    webhook_signing_secret?: string | null;

    /**
     * URL to receive webhook POST notifications
     */
    webhook_url?: string | null;
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

export interface SplitDeleteParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface SplitCancelParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export declare namespace Split {
  export {
    type SplitCreateResponse as SplitCreateResponse,
    type SplitListResponse as SplitListResponse,
    type SplitDeleteResponse as SplitDeleteResponse,
    type SplitCancelResponse as SplitCancelResponse,
    type SplitGetResponse as SplitGetResponse,
    type SplitListResponsesPaginatedCursor as SplitListResponsesPaginatedCursor,
    type SplitCreateParams as SplitCreateParams,
    type SplitListParams as SplitListParams,
    type SplitGetParams as SplitGetParams,
    type SplitDeleteParams as SplitDeleteParams,
    type SplitCancelParams as SplitCancelParams,
  };
}
