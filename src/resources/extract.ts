// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ExtractAPI from './extract';
import * as ConfigurationsAPI from './configurations';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedCursor, type PaginatedCursorParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';
import { pollUntilComplete, PollingOptions, DEFAULT_TIMEOUT } from '../core/polling';

export class Extract extends APIResource {
  /**
   * Create an extraction job.
   *
   * Extracts structured data from a document using either a saved configuration or
   * an inline JSON Schema.
   *
   * ## Input
   *
   * Provide exactly one of:
   *
   * - `configuration_id` — reference a saved extraction config
   * - `configuration` — inline configuration with a `data_schema`
   *
   * ## Document input
   *
   * Set `file_input` to a file ID (`dfl-...`) or a completed parse job ID
   * (`pjb-...`).
   *
   * The job runs asynchronously. Poll `GET /extract/{job_id}` or register a webhook
   * to monitor completion.
   *
   * @example
   * ```ts
   * const extractV2Job = await client.extract.create({
   *   file_input: 'dfl-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
   * });
   * ```
   */
  create(params: ExtractCreateParams, options?: RequestOptions): APIPromise<ExtractV2Job> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post('/api/v2/extract', { query: { organization_id, project_id }, body, ...options });
  }

  /**
   * List extraction jobs with optional filtering and pagination.
   *
   * Filter by `configuration_id`, `status`, `file_input`, or creation date range.
   * Results are returned newest-first. Use `expand=configuration` to include the
   * full configuration used, and `expand=extract_metadata` for per-field metadata.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const extractV2Job of client.extract.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ExtractListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ExtractV2JobsPaginatedCursor, ExtractV2Job> {
    return this._client.getAPIList('/api/v2/extract', PaginatedCursor<ExtractV2Job>, { query, ...options });
  }

  /**
   * Get a single extraction job by ID.
   *
   * Returns the job status and results when complete. Use `expand=configuration` to
   * include the full configuration used, `expand=extract_metadata` for per-field
   * metadata, and `expand=usage` for credits billed against the job.
   *
   * @example
   * ```ts
   * const extractV2Job = await client.extract.get('job_id');
   * ```
   */
  get(
    jobID: string,
    query: ExtractGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ExtractV2Job> {
    return this._client.get(path`/api/v2/extract/${jobID}`, { query, ...options });
  }

  /**
   * Delete an extraction job and its results.
   *
   * @example
   * ```ts
   * const extract = await client.extract.delete('job_id');
   * ```
   */
  delete(
    jobID: string,
    params: ExtractDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { organization_id, project_id } = params ?? {};
    return this._client.delete(path`/api/v2/extract/${jobID}`, {
      query: { organization_id, project_id },
      ...options,
    });
  }

  /**
   * Cancel a running extraction job.
   *
   * Stops processing and marks the job as CANCELLED. Returns the updated job. Jobs
   * already in a terminal state (COMPLETED, FAILED, CANCELLED) cannot be cancelled.
   *
   * @example
   * ```ts
   * const extractV2Job = await client.extract.cancel('job_id');
   * ```
   */
  cancel(
    jobID: string,
    params: ExtractCancelParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ExtractV2Job> {
    const { organization_id, project_id } = params ?? {};
    return this._client.post(path`/api/v2/extract/${jobID}/cancel`, {
      query: { organization_id, project_id },
      ...options,
    });
  }

  /**
   * Validate a JSON schema for extraction.
   *
   * @example
   * ```ts
   * const extractV2SchemaValidateResponse =
   *   await client.extract.validateSchema({
   *     data_schema: {
   *       properties: {
   *         invoice_number: 'bar',
   *         line_items: 'bar',
   *         total_amount: 'bar',
   *         vendor_name: 'bar',
   *       },
   *       required: [
   *         'invoice_number',
   *         'total_amount',
   *         'vendor_name',
   *       ],
   *       type: 'object',
   *     },
   *   });
   * ```
   */
  validateSchema(
    body: ExtractValidateSchemaParams,
    options?: RequestOptions,
  ): APIPromise<ExtractV2SchemaValidateResponse> {
    return this._client.post('/api/v2/extract/schema/validation', { body, ...options });
  }

  /**
   * Generate a JSON schema and return a product configuration request.
   *
   * @example
   * ```ts
   * const configurationCreate =
   *   await client.extract.generateSchema();
   * ```
   */
  generateSchema(
    params: ExtractGenerateSchemaParams,
    options?: RequestOptions,
  ): APIPromise<ConfigurationsAPI.ConfigurationCreate> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post('/api/v2/extract/schema/generate', {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * Wait for an extraction job to complete by polling until it reaches a terminal state.
   *
   * @param jobID - The ID of the extraction job to wait for
   * @param query - Optional query parameters (organization_id, project_id)
   * @param options - Polling configuration and request options
   * @returns The completed extraction job
   * @throws {PollingTimeoutError} If the job doesn't complete within the timeout period
   * @throws {PollingError} If the job fails or is cancelled
   *
   * @example
   * ```typescript
   * const job = await client.extract.create({
   *   document_input_value: 'dfl-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
   * });
   *
   * const completed = await client.extract.waitForCompletion(job.id, undefined, { verbose: true });
   * console.log(completed.extract_result);
   * ```
   */
  async waitForCompletion(
    jobID: string,
    query?: ExtractGetParams,
    options?: PollingOptions & RequestOptions,
  ): Promise<ExtractV2Job> {
    const { pollingInterval, maxInterval, timeout, backoff, verbose, ...requestOptions } = options || {};

    const getStatus = async (): Promise<ExtractV2Job> => {
      return await this.get(jobID, query, requestOptions);
    };

    const isComplete = (job: ExtractV2Job): boolean => {
      return job.status === 'COMPLETED';
    };

    const isError = (job: ExtractV2Job): boolean => {
      return job.status === 'FAILED' || job.status === 'CANCELLED';
    };

    const getErrorMessage = (job: ExtractV2Job): string => {
      const errorParts = [`Job ${jobID} failed with status: ${job.status}`];
      if (job.error_message) {
        errorParts.push(`Error: ${job.error_message}`);
      }
      return errorParts.join(' | ');
    };

    return await pollUntilComplete(getStatus, isComplete, isError, getErrorMessage, {
      pollingInterval,
      maxInterval,
      timeout: timeout || DEFAULT_TIMEOUT,
      backoff,
      verbose,
    });
  }

  /**
   * Create an extraction job, wait for it to complete, and return the result.
   *
   * This is a convenience method that combines create() and waitForCompletion()
   * into a single call for the most common end-to-end workflow.
   *
   * @param params - Extract job creation parameters
   * @param options - Polling configuration and request options
   * @returns The completed extraction job with extract_result populated
   * @throws {PollingTimeoutError} If the job doesn't complete within the timeout period
   * @throws {PollingError} If the job fails or is cancelled
   *
   * @example
   * ```typescript
   * import { LlamaCloud } from 'llama-cloud';
   *
   * const client = new LlamaCloud({ apiKey: '...' });
   *
   * const result = await client.extract.run({
   *   document_input_value: 'dfl-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
   *   configuration: {
   *     data_schema: { name: { type: 'string' }, age: { type: 'number' } },
   *   },
   * }, { verbose: true });
   *
   * console.log(result.extract_result);
   * ```
   */
  async run(params: ExtractCreateParams, options?: PollingOptions & RequestOptions): Promise<ExtractV2Job> {
    const { pollingInterval, maxInterval, timeout, backoff, verbose, ...requestOptions } = options || {};

    const job = await this.create(params, requestOptions);

    const getQuery: ExtractGetParams = {};
    if (params.organization_id !== undefined) {
      getQuery.organization_id = params.organization_id;
    }
    if (params.project_id !== undefined) {
      getQuery.project_id = params.project_id;
    }

    return await this.waitForCompletion(job.id, getQuery, {
      pollingInterval,
      maxInterval,
      timeout: timeout || DEFAULT_TIMEOUT,
      backoff,
      verbose,
      ...requestOptions,
    });
  }
}

export type ExtractV2JobsPaginatedCursor = PaginatedCursor<ExtractV2Job>;

/**
 * Extract configuration combining parse and extract settings.
 */
export interface ExtractConfiguration {
  /**
   * JSON Schema defining the fields to extract. Validate with the /schema/validate
   * endpoint first.
   */
  data_schema: {
    [key: string]: { [key: string]: unknown } | Array<unknown> | string | number | boolean | null;
  };

  /**
   * Include citations in results. Returned under `extract_metadata` (auto-included
   * when set). Text-level on `turbo` (no bounding boxes).
   */
  cite_sources?: boolean;

  /**
   * Include confidence scores in results. Returned under `extract_metadata`
   * (auto-included when set).
   */
  confidence_scores?: boolean;

  /**
   * Disable reuse and storage of Extract results
   */
  disable_cache?: boolean;

  /**
   * Granularity of extraction: per_doc returns one object per document, per_page
   * returns one object per page, per_table_row returns one object per table row
   */
  extraction_target?: 'per_doc' | 'per_page' | 'per_table_row';

  /**
   * Maximum number of pages to process. Omit for no limit.
   */
  max_pages?: number | null;

  /**
   * Saved parse configuration ID to control how the document is parsed before
   * extraction. Turbo extract does not support parse configuration or produce a
   * parse output; use another tier if your workflow requires parsed text.
   */
  parse_config_id?: string | null;

  /**
   * Parse tier to use before extraction. Defaults to the extract tier if not
   * specified. Turbo extract does not support parse configuration or produce a parse
   * output; use another tier if your workflow requires parsed text.
   */
  parse_tier?: string | null;

  /**
   * Optional worksheet names to extract when spreadsheet_mode is on. Overrides
   * target_pages for spreadsheets; omit to extract every sheet. Names are matched
   * exactly (case-sensitive) — pass them as a list, e.g. ["Sheet 1", "My Sheet"].
   */
  sheet_names?: Array<string> | null;

  /**
   * Beta. When true, extract structured data directly from a spreadsheet workbook
   * (.xlsx/.xls/.csv) — the agent reads cells straight from the workbook instead of
   * the standard document path. Off by default (spreadsheets keep the standard
   * path). Requires the agentic_plus tier. Billed on the standard per-page extract
   * rate, against a page count derived from workbook size. Citations and confidence
   * scores are not available in this mode.
   */
  spreadsheet_mode?: boolean;

  /**
   * Custom system prompt to guide extraction behavior
   */
  system_prompt?: string | null;

  /**
   * Comma-separated page numbers or ranges to process (1-based). Omit to process all
   * pages.
   */
  target_pages?: string | null;

  /**
   * Extract tier: cost_effective (5 credits/page), agentic (15 credits/page), or
   * agentic_plus (50 credits/page)
   */
  tier?: 'agentic' | 'agentic_plus' | 'cost_effective';

  /**
   * Use 'latest' for the latest release for the selected tier or a date string
   * (YYYY-MM-DD format) to pin to the nearest release at or before that date. Job
   * responses always report the concrete resolved version the job runs, fixed at job
   * creation; saved configurations keep the value as provided.
   */
  version?: string;
}

/**
 * Extraction metadata.
 */
export interface ExtractJobMetadata {
  /**
   * Metadata for extracted fields including document, page, and row level info.
   */
  field_metadata?: ExtractedFieldMetadata | null;

  /**
   * Reference to the ParseJob ID used for parsing
   */
  parse_job_id?: string | null;

  /**
   * Parse tier used for parsing the document
   */
  parse_tier?: string | null;
}

/**
 * Extraction usage metrics.
 */
export interface ExtractJobUsage {
  /**
   * Number of effective pages billed
   */
  num_pages_billed?: number | null;

  /**
   * Number of pages extracted
   */
  num_pages_extracted?: number | null;
}

/**
 * An extraction job.
 */
export interface ExtractV2Job {
  /**
   * Unique job identifier (job_id)
   */
  id: string;

  /**
   * Creation timestamp
   */
  created_at: string;

  /**
   * File ID or parse job ID that was extracted
   */
  file_input: string;

  /**
   * Project this job belongs to
   */
  project_id: string;

  /**
   * Current job status.
   *
   * - `PENDING` — queued, not yet started
   * - `RUNNING` — actively processing
   * - `COMPLETED` — finished successfully
   * - `FAILED` — terminated with an error
   * - `CANCELLED` — cancelled by user
   */
  status: string;

  /**
   * Last update timestamp
   */
  updated_at: string;

  /**
   * Extract configuration combining parse and extract settings.
   */
  configuration?: ExtractConfiguration | null;

  /**
   * Saved extract configuration ID used for this job, if any
   */
  configuration_id?: string | null;

  /**
   * Error details when status is FAILED
   */
  error_message?: string | null;

  /**
   * Extraction metadata.
   */
  extract_metadata?: ExtractJobMetadata | null;

  /**
   * Extracted data conforming to the data_schema. Returns a single object for
   * per_doc, or an array for per_page / per_table_row.
   */
  extract_result?:
    | { [key: string]: { [key: string]: unknown } | Array<unknown> | string | number | boolean | null }
    | Array<{ [key: string]: { [key: string]: unknown } | Array<unknown> | string | number | boolean | null }>
    | null;

  /**
   * Job-level metadata.
   */
  metadata?: ExtractV2Job.Metadata | null;

  /**
   * Usage recorded against an extract job.
   *
   * A parse job can back several extract jobs, so each of them reports that same
   * parse cost in its total.
   */
  usage?: ExtractV2Job.Usage | null;
}

export namespace ExtractV2Job {
  /**
   * Job-level metadata.
   */
  export interface Metadata {
    /**
     * Extraction usage metrics.
     */
    usage?: ExtractAPI.ExtractJobUsage | null;

    [k: string]: unknown;
  }

  /**
   * Usage recorded against an extract job.
   *
   * A parse job can back several extract jobs, so each of them reports that same
   * parse cost in its total.
   */
  export interface Usage {
    /**
     * Total credits billed against this job. Null until billing has recorded it.
     */
    credits?: number | null;

    /**
     * Credits billed for the extraction itself
     */
    extract_credits?: number | null;

    /**
     * Credits billed against the parse job backing this extract job
     */
    parse_credits?: number | null;
  }
}

/**
 * Request to create an extraction job. Provide configuration_id or inline
 * configuration.
 */
export interface ExtractV2JobCreate {
  /**
   * File ID or parse job ID to extract from
   */
  file_input: string;

  /**
   * Extract configuration combining parse and extract settings.
   */
  configuration?: ExtractConfiguration | null;

  /**
   * Saved configuration ID
   */
  configuration_id?: string | null;

  /**
   * IDs of saved webhook configurations to notify for this job.
   */
  webhook_configuration_ids?: Array<string> | null;

  /**
   * Outbound webhook endpoints to notify on job status changes
   */
  webhook_configurations?: Array<ExtractV2JobCreate.WebhookConfiguration> | null;
}

export namespace ExtractV2JobCreate {
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
 * Paginated list of extraction jobs.
 */
export interface ExtractV2JobQueryResponse {
  /**
   * The list of items.
   */
  items: Array<ExtractV2Job>;

  /**
   * A token, which can be sent as page_token to retrieve the next page. If this
   * field is omitted, there are no subsequent pages.
   */
  next_page_token?: string | null;

  /**
   * The total number of items available. This is only populated when specifically
   * requested. The value may be an estimate and can be used for display purposes
   * only.
   */
  total_size?: number | null;
}

/**
 * Request schema for generating an extraction schema.
 */
export interface ExtractV2SchemaGenerateRequest {
  /**
   * Optional schema to validate, refine, or extend
   */
  data_schema?: {
    [key: string]: { [key: string]: unknown } | Array<unknown> | string | number | boolean | null;
  } | null;

  /**
   * Optional file ID to analyze for schema generation
   */
  file_id?: string | null;

  /**
   * Name for the generated configuration (auto-generated if omitted)
   */
  name?: string | null;

  /**
   * Natural language description of the data structure to extract
   */
  prompt?: string | null;
}

/**
 * Request schema for validating an extraction schema.
 */
export interface ExtractV2SchemaValidateRequest {
  /**
   * JSON Schema to validate for use with extract jobs
   */
  data_schema: {
    [key: string]: { [key: string]: unknown } | Array<unknown> | string | number | boolean | null;
  };
}

/**
 * Response schema for schema validation.
 */
export interface ExtractV2SchemaValidateResponse {
  /**
   * Validated JSON Schema, ready for use in extract jobs
   */
  data_schema: {
    [key: string]: { [key: string]: unknown } | Array<unknown> | string | number | boolean | null;
  };
}

/**
 * Metadata for extracted fields including document, page, and row level info.
 */
export interface ExtractedFieldMetadata {
  /**
   * Per-field metadata keyed by field name from your schema. Scalar fields (e.g.
   * `vendor`) map to a FieldMetadataEntry with citation and confidence. Array fields
   * (e.g. `items`) map to a list where each element contains per-sub-field
   * FieldMetadataEntry objects, indexed by array position. Nested objects contain
   * sub-field entries recursively.
   */
  document_metadata?: {
    [key: string]: { [key: string]: unknown } | Array<unknown> | string | number | boolean | null;
  } | null;

  /**
   * Per-page metadata when extraction_target is per_page
   */
  page_metadata?: Array<{
    [key: string]: { [key: string]: unknown } | Array<unknown> | string | number | boolean | null;
  }> | null;

  /**
   * Per-row metadata when extraction_target is per_table_row
   */
  row_metadata?: Array<{
    [key: string]: { [key: string]: unknown } | Array<unknown> | string | number | boolean | null;
  }> | null;
}

export type ExtractDeleteResponse = unknown;

export interface ExtractCreateParams {
  /**
   * Body param: File ID or parse job ID to extract from
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
   * Body param: Extract configuration combining parse and extract settings.
   */
  configuration?: ExtractConfiguration | null;

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
  webhook_configurations?: Array<ExtractCreateParams.WebhookConfiguration> | null;
}

export namespace ExtractCreateParams {
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

export interface ExtractListParams extends PaginatedCursorParams {
  /**
   * Filter by configuration ID
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

  /**
   * Filter by document input type (file_id or parse_job_id)
   */
  document_input_type?: string | null;

  /**
   * @deprecated Deprecated: use file_input instead
   */
  document_input_value?: string | null;

  /**
   * Additional fields to include: configuration, extract_metadata
   */
  expand?: Array<string>;

  /**
   * Filter by file input value
   */
  file_input?: string | null;

  /**
   * Filter by specific job IDs
   */
  job_ids?: Array<string> | null;

  organization_id?: string | null;

  project_id?: string | null;

  /**
   * Filter by status
   */
  status?: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING' | 'THROTTLED' | null;
}

export interface ExtractGetParams {
  /**
   * Additional fields to include: configuration, extract_metadata, usage
   */
  expand?: Array<string>;

  organization_id?: string | null;

  project_id?: string | null;
}

export interface ExtractDeleteParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface ExtractCancelParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface ExtractValidateSchemaParams {
  /**
   * JSON Schema to validate for use with extract jobs
   */
  data_schema: {
    [key: string]: { [key: string]: unknown } | Array<unknown> | string | number | boolean | null;
  };
}

export interface ExtractGenerateSchemaParams {
  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Optional schema to validate, refine, or extend
   */
  data_schema?: {
    [key: string]: { [key: string]: unknown } | Array<unknown> | string | number | boolean | null;
  } | null;

  /**
   * Body param: Optional file ID to analyze for schema generation
   */
  file_id?: string | null;

  /**
   * Body param: Name for the generated configuration (auto-generated if omitted)
   */
  name?: string | null;

  /**
   * Body param: Natural language description of the data structure to extract
   */
  prompt?: string | null;
}

export declare namespace Extract {
  export {
    type ExtractConfiguration as ExtractConfiguration,
    type ExtractJobMetadata as ExtractJobMetadata,
    type ExtractJobUsage as ExtractJobUsage,
    type ExtractV2Job as ExtractV2Job,
    type ExtractV2JobCreate as ExtractV2JobCreate,
    type ExtractV2JobQueryResponse as ExtractV2JobQueryResponse,
    type ExtractV2SchemaGenerateRequest as ExtractV2SchemaGenerateRequest,
    type ExtractV2SchemaValidateRequest as ExtractV2SchemaValidateRequest,
    type ExtractV2SchemaValidateResponse as ExtractV2SchemaValidateResponse,
    type ExtractedFieldMetadata as ExtractedFieldMetadata,
    type ExtractDeleteResponse as ExtractDeleteResponse,
    type ExtractV2JobsPaginatedCursor as ExtractV2JobsPaginatedCursor,
    type ExtractCreateParams as ExtractCreateParams,
    type ExtractListParams as ExtractListParams,
    type ExtractGetParams as ExtractGetParams,
    type ExtractDeleteParams as ExtractDeleteParams,
    type ExtractCancelParams as ExtractCancelParams,
    type ExtractValidateSchemaParams as ExtractValidateSchemaParams,
    type ExtractGenerateSchemaParams as ExtractGenerateSchemaParams,
  };
}
