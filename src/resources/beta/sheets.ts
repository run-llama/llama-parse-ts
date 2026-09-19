// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FilesAPI from '../files';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, PaginatedCursor, type PaginatedCursorParams } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';
import { pollUntilComplete, PollingOptions, DEFAULT_TIMEOUT } from '../../core/polling';

export class Sheets extends APIResource {
  /**
   * Create a spreadsheet parsing job.
   *
   * Provide at most one of `configuration` (an inline parsing configuration) or
   * `configuration_id` (a saved configuration preset). If neither is provided, a
   * default configuration is used. Optionally include `webhook_configurations` to
   * receive `sheets.*` status notifications.
   *
   * @deprecated
   */
  create(params: SheetCreateParams, options?: RequestOptions): APIPromise<SheetsJob> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post('/api/v1/beta/sheets/jobs', {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * List spreadsheet parsing jobs.
   *
   * @deprecated
   */
  list(
    query: SheetListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SheetsJobsPaginatedCursor, SheetsJob> {
    return this._client.getAPIList('/api/v1/beta/sheets/jobs', PaginatedCursor<SheetsJob>, {
      query,
      ...options,
    });
  }

  /**
   * Get a spreadsheet parsing job. When `include_results=True` (default), embeds
   * extracted regions and results if complete, skipping the separate `/results`
   * call.
   *
   * @deprecated
   */
  get(
    spreadsheetJobID: string,
    query: SheetGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SheetsJob> {
    return this._client.get(path`/api/v1/beta/sheets/jobs/${spreadsheetJobID}`, { query, ...options });
  }

  /**
   * Generate a presigned URL to download a specific extracted region.
   *
   * @deprecated
   */
  getResultTable(
    regionType: 'cell_metadata' | 'extra' | 'table',
    params: SheetGetResultTableParams,
    options?: RequestOptions,
  ): APIPromise<FilesAPI.PresignedURL> {
    const { spreadsheet_job_id, region_id, ...query } = params;
    return this._client.get(
      path`/api/v1/beta/sheets/jobs/${spreadsheet_job_id}/regions/${region_id}/result/${regionType}`,
      { query, ...options },
    );
  }

  /**
   * Delete a spreadsheet parsing job and its associated data.
   *
   * @deprecated
   */
  deleteJob(
    spreadsheetJobID: string,
    params: SheetDeleteJobParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { organization_id, project_id } = params ?? {};
    return this._client.delete(path`/api/v1/beta/sheets/jobs/${spreadsheetJobID}`, {
      query: { organization_id, project_id },
      ...options,
    });
  }

  /**
   * Create a spreadsheet parsing job and wait for it to complete, returning the job with results.
   *
   * This is a convenience method that combines create() and waitForCompletion()
   * into a single call for the most common end-to-end workflow.
   *
   * @param params - Parameters including the file_id and parsing configuration
   * @param options - Request and polling configuration options
   * @returns The completed SheetsJob with results included
   * @throws {PollingTimeoutError} If the job doesn't complete within the timeout period
   * @throws {PollingError} If the job fails or is cancelled
   *
   * @example
   * ```typescript
   * import LlamaCloud from 'llama-cloud';
   *
   * const client = new LlamaCloud({ apiKey: '...' });
   *
   * // One-shot: create job, wait for completion, and get results
   * const job = await client.beta.sheets.parse({
   *   file_id: 'file_123',
   *   verbose: true
   * });
   *
   * // Results are ready to use immediately
   * for (const region of job.regions ?? []) {
   *   console.log(`Region ${region.region_id}: ${region.region_type}`);
   * }
   * ```
   */
  async parse(params: SheetParseParams, options?: RequestOptions): Promise<SheetsJob> {
    const { pollingInterval, maxInterval, timeout, backoff, verbose, ...createParams } = params;

    // Create the job
    const job = await this.create(createParams, options);

    // Wait for completion
    const pollingOptions: PollingOptions & RequestOptions = { ...options };
    if (pollingInterval !== undefined) pollingOptions.pollingInterval = pollingInterval;
    if (maxInterval !== undefined) pollingOptions.maxInterval = maxInterval;
    if (timeout !== undefined) pollingOptions.timeout = timeout;
    if (backoff !== undefined) pollingOptions.backoff = backoff;
    if (verbose !== undefined) pollingOptions.verbose = verbose;

    // Only pass query params that are valid for waitForCompletion
    const waitParams: SheetWaitForCompletionParams = {
      ...pollingOptions,
    };
    if (createParams.organization_id !== undefined) waitParams.organization_id = createParams.organization_id;
    if (createParams.project_id !== undefined) waitParams.project_id = createParams.project_id;

    return this.waitForCompletion(job.id, waitParams);
  }

  /**
   * Wait for a spreadsheet parsing job to complete by polling until it reaches a terminal state.
   *
   * This method polls the job status at regular intervals until the job completes
   * successfully or fails. It uses configurable backoff strategies to optimize
   * polling behavior.
   *
   * @param spreadsheetJobID - The ID of the spreadsheet job to wait for
   * @param params - Query parameters and polling configuration
   * @param options - Additional request options
   * @returns The completed SheetsJob with results included
   * @throws {PollingTimeoutError} If the job doesn't complete within the timeout period
   * @throws {PollingError} If the job fails or is cancelled
   *
   * @example
   * ```typescript
   * import LlamaCloud from 'llama-cloud';
   *
   * const client = new LlamaCloud({ apiKey: '...' });
   *
   * // Create a spreadsheet parsing job
   * const job = await client.beta.sheets.create({ file_id: 'file_123' });
   *
   * // Wait for it to complete
   * const completedJob = await client.beta.sheets.waitForCompletion(job.id, {
   *   verbose: true
   * });
   *
   * // Access the results
   * for (const region of completedJob.regions ?? []) {
   *   console.log(`Region ${region.region_id}: ${region.region_type}`);
   * }
   * ```
   */
  async waitForCompletion(
    spreadsheetJobID: string,
    params: SheetWaitForCompletionParams | null | undefined = {},
    options?: RequestOptions,
  ): Promise<SheetsJob> {
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
        return this.get(spreadsheetJobID, { include_results: true, ...queryParams }, options);
      },
      (job) => job.status === 'SUCCESS' || job.status === 'PARTIAL_SUCCESS',
      (job) => job.status === 'ERROR' || job.status === 'CANCELLED',
      (job) => {
        const errorParts = [`Job ${spreadsheetJobID} failed with status: ${job.status}`];
        if (job.errors && job.errors.length > 0) {
          errorParts.push(`Errors: ${job.errors.join(', ')}`);
        }
        return errorParts.join(' | ');
      },
      pollingOptions,
    );
  }
}

export type SheetsJobsPaginatedCursor = PaginatedCursor<SheetsJob>;

/**
 * A spreadsheet parsing job.
 */
export interface SheetsJob {
  /**
   * The ID of the job
   */
  id: string;

  /**
   * Configuration applied to the parsing job (inline or resolved from a saved
   * preset).
   */
  configuration: SheetsParsingConfig;

  /**
   * When the job was created
   */
  created_at: string;

  /**
   * The ID of the input file
   */
  file_id: string | null;

  /**
   * The ID of the project
   */
  project_id: string;

  /**
   * The status of the parsing job
   */
  status: 'CANCELLED' | 'ERROR' | 'PARTIAL_SUCCESS' | 'PENDING' | 'SUCCESS';

  /**
   * When the job was last updated
   */
  updated_at: string;

  /**
   * The ID of the user
   */
  user_id: string;

  /**
   * @deprecated Configuration for spreadsheet parsing and region extraction
   */
  config?: SheetsParsingConfig | null;

  /**
   * The saved product configuration ID used at create time, if any.
   */
  configuration_id?: string | null;

  /**
   * Any errors encountered
   */
  errors?: Array<string>;

  /**
   * @deprecated Schema for a file.
   */
  file?: FilesAPI.File | null;

  /**
   * Per-status entry timestamps. Returned only when requested via
   * `?expand=metadata_state_transitions`.
   */
  metadata_state_transitions?: { [key: string]: unknown } | null;

  /**
   * Job-time parameters such as webhook configurations.
   */
  parameters?: SheetsJob.Parameters;

  /**
   * All extracted regions (populated when job is complete)
   */
  regions?: Array<SheetsJob.Region>;

  /**
   * Whether the job completed successfully
   */
  success?: boolean | null;

  /**
   * Metadata for each processed worksheet (populated when job is complete)
   */
  worksheet_metadata?: Array<SheetsJob.WorksheetMetadata>;
}

export namespace SheetsJob {
  /**
   * Job-time parameters such as webhook configurations.
   */
  export interface Parameters {
    /**
     * Webhook configurations for job status notifications.
     */
    webhook_configurations?: Array<Parameters.WebhookConfiguration> | null;
  }

  export namespace Parameters {
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

  /**
   * A summary of a single extracted region from a spreadsheet
   */
  export interface Region {
    /**
     * Location of the region in the spreadsheet
     */
    location: string;

    /**
     * Type of the extracted region
     */
    region_type: string;

    /**
     * Worksheet name where region was found
     */
    sheet_name: string;

    /**
     * Generated description for the region
     */
    description?: string | null;

    /**
     * Unique identifier for this region within the file
     */
    region_id?: string;

    /**
     * Generated title for the region
     */
    title?: string | null;
  }

  /**
   * Metadata about a worksheet in a spreadsheet
   */
  export interface WorksheetMetadata {
    /**
     * Name of the worksheet
     */
    sheet_name: string;

    /**
     * Generated description of the worksheet
     */
    description?: string | null;

    /**
     * Generated title for the worksheet
     */
    title?: string | null;
  }
}

/**
 * Configuration for spreadsheet parsing and region extraction
 */
export interface SheetsParsingConfig {
  /**
   * A1 notation of the range to extract a single region from. If None, the entire
   * sheet is used.
   */
  extraction_range?: string | null;

  /**
   * Return a flattened dataframe when a detected table is recognized as
   * hierarchical.
   */
  flatten_hierarchical_tables?: boolean;

  /**
   * Deprecated: controlled by `tier`. Whether to generate additional metadata
   * (title, description) for each extracted region. Honored only on `agentic`.
   */
  generate_additional_metadata?: boolean;

  /**
   * Whether to include hidden cells when extracting regions from the spreadsheet.
   */
  include_hidden_cells?: boolean;

  /**
   * The names of the sheets to extract regions from. If empty, all sheets will be
   * processed.
   */
  sheet_names?: Array<string> | null;

  /**
   * Deprecated: controlled by `tier`. Optional specialization mode for
   * domain-specific extraction. Supported values: 'financial-standard',
   * 'financial-enhanced', 'financial-precise'. Default None uses the general-purpose
   * pipeline. Honored only on `agentic`.
   */
  specialization?: string | null;

  /**
   * Deprecated: controlled by `tier`. Influences how likely similar-looking regions
   * are merged into a single table. Honored only on `agentic`.
   */
  table_merge_sensitivity?: 'strong' | 'weak';

  /**
   * Spreadsheet extraction tier. `cost_effective` uses the rule-based/ML-only
   * pipeline; `agentic` uses the full pipeline.
   */
  tier?: 'agentic' | 'cost_effective';

  /**
   * Deprecated: controlled by `tier`. Enables experimental processing. Honored only
   * on `agentic`.
   */
  use_experimental_processing?: boolean;
}

export type SheetDeleteJobResponse = unknown;

export interface SheetCreateParams {
  /**
   * Body param: The ID of the file to parse
   */
  file_id: string;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Configuration for spreadsheet parsing and region extraction
   */
  config?: SheetsParsingConfig | null;

  /**
   * Body param: Configuration for spreadsheet parsing and region extraction
   */
  configuration?: SheetsParsingConfig | null;

  /**
   * Body param: Saved configuration ID
   */
  configuration_id?: string | null;

  /**
   * Body param: IDs of saved webhook configurations to notify for this job.
   */
  webhook_configuration_ids?: Array<string> | null;

  /**
   * Body param: Outbound webhook endpoints to notify on job status changes
   */
  webhook_configurations?: Array<SheetCreateParams.WebhookConfiguration> | null;
}

export namespace SheetCreateParams {
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

export interface SheetListParams extends PaginatedCursorParams {
  /**
   * Filter by saved configuration ID
   */
  configuration_id?: string | null;

  /**
   * Include items created at or after this timestamp (inclusive)
   */
  created_at_on_or_after?: string | null;

  /**
   * Include items created at or before this timestamp (inclusive)
   */
  created_at_on_or_before?: string | null;

  include_results?: boolean;

  /**
   * Filter by specific job IDs
   */
  job_ids?: Array<string> | null;

  organization_id?: string | null;

  project_id?: string | null;

  /**
   * Filter by job status
   */
  status?: 'CANCELLED' | 'ERROR' | 'PARTIAL_SUCCESS' | 'PENDING' | 'SUCCESS' | null;
}

export interface SheetGetParams {
  /**
   * Optional fields to populate on the response. Valid values:
   * metadata_state_transitions.
   */
  expand?: Array<string>;

  include_results?: boolean;

  organization_id?: string | null;

  project_id?: string | null;
}

export interface SheetGetResultTableParams {
  /**
   * Path param
   */
  spreadsheet_job_id: string;

  /**
   * Path param
   */
  region_id: string;

  /**
   * Query param
   */
  expires_at_seconds?: number | null;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;
}

export interface SheetParseParams extends SheetCreateParams, PollingOptions {}

export interface SheetWaitForCompletionParams extends PollingOptions {
  include_results?: boolean;

  organization_id?: string | null;

  project_id?: string | null;
}

export interface SheetDeleteJobParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export declare namespace Sheets {
  export {
    type SheetsJob as SheetsJob,
    type SheetsParsingConfig as SheetsParsingConfig,
    type SheetDeleteJobResponse as SheetDeleteJobResponse,
    type SheetsJobsPaginatedCursor as SheetsJobsPaginatedCursor,
    type SheetCreateParams as SheetCreateParams,
    type SheetListParams as SheetListParams,
    type SheetGetParams as SheetGetParams,
    type SheetGetResultTableParams as SheetGetResultTableParams,
    type SheetDeleteJobParams as SheetDeleteJobParams,
    type SheetParseParams as SheetParseParams,
    type SheetWaitForCompletionParams as SheetWaitForCompletionParams,
  };
}
