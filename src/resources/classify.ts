// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedCursor, type PaginatedCursorParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';
import { pollUntilComplete, PollingOptions, DEFAULT_TIMEOUT } from '../core/polling';

export class Classify extends APIResource {
  /**
   * Create a classify job.
   *
   * Classifies a document against a set of rules. Set `file_input` to a file ID
   * (`dfl-...`) or parse job ID (`pjb-...`), and provide either inline
   * `configuration` with rules or a `configuration_id` referencing a saved preset.
   *
   * Each rule has a `type` (the label to assign) and a `description` (natural
   * language criteria). The classifier returns the best matching rule with a
   * confidence score.
   *
   * The job runs asynchronously. Poll `GET /classify/{job_id}` to check status and
   * retrieve results.
   *
   * @example
   * ```ts
   * const classify = await client.classify.create();
   * ```
   */
  create(params: ClassifyCreateParams, options?: RequestOptions): APIPromise<ClassifyCreateResponse> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post('/api/v2/classify', {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * List classify jobs with optional filtering and pagination.
   *
   * Filter by `status`, `configuration_id`, specific `job_ids`, or creation date
   * range.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const classifyListResponse of client.classify.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ClassifyListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ClassifyListResponsesPaginatedCursor, ClassifyListResponse> {
    return this._client.getAPIList('/api/v2/classify', PaginatedCursor<ClassifyListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Get a classify job by ID.
   *
   * Returns the job status, configuration, and classify result when complete. The
   * result includes the matched document type, confidence score, and reasoning.
   *
   * @example
   * ```ts
   * const classify = await client.classify.get('job_id');
   * ```
   */
  get(
    jobID: string,
    query: ClassifyGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ClassifyGetResponse> {
    return this._client.get(path`/api/v2/classify/${jobID}`, { query, ...options });
  }

  /**
   * Cancel a running classify job.
   *
   * Stops processing and marks the job as CANCELLED. Returns the updated job. Jobs
   * already in a terminal state (COMPLETED, FAILED, CANCELLED) cannot be cancelled.
   *
   * @example
   * ```ts
   * const response = await client.classify.cancel('job_id');
   * ```
   */
  cancel(
    jobID: string,
    params: ClassifyCancelParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ClassifyCancelResponse> {
    const { organization_id, project_id } = params ?? {};
    return this._client.post(path`/api/v2/classify/${jobID}/cancel`, {
      query: { organization_id, project_id },
      ...options,
    });
  }

  /**
   * Delete a classify job and its result.
   *
   * The job must be in a terminal state (COMPLETED, FAILED, CANCELLED). Cancel a job
   * that is still running before deleting it.
   *
   * Returns the identifiers of the deleted job.
   *
   * @example
   * ```ts
   * const classify = await client.classify.delete('job_id');
   * ```
   */
  delete(
    jobID: string,
    params: ClassifyDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ClassifyDeleteResponse> {
    const { organization_id, project_id } = params ?? {};
    return this._client.delete(path`/api/v2/classify/${jobID}`, {
      query: { organization_id, project_id },
      ...options,
    });
  }

  /**
   * Wait for a classify job to complete by polling until it reaches a terminal state.
   *
   * @param jobID - The ID of the classify job to wait for
   * @param query - Optional query parameters (organization_id, project_id)
   * @param options - Polling configuration and request options
   * @returns The completed classify job
   * @throws {PollingTimeoutError} If the job doesn't complete within the timeout period
   * @throws {PollingError} If the job fails
   *
   * @example
   * ```typescript
   * const job = await client.classify.create({
   *   file_input: 'dfl-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
   *   configuration_id: 'cfg-...',
   * });
   *
   * const completed = await client.classify.waitForCompletion(job.id, undefined, { verbose: true });
   * console.log(completed.result);
   * ```
   */
  async waitForCompletion(
    jobID: string,
    query?: ClassifyGetParams,
    options?: PollingOptions & RequestOptions,
  ): Promise<ClassifyGetResponse> {
    const { pollingInterval, maxInterval, timeout, backoff, verbose, ...requestOptions } = options || {};

    const getStatus = async (): Promise<ClassifyGetResponse> => {
      return await this.get(jobID, query, requestOptions);
    };

    const isComplete = (job: ClassifyGetResponse): boolean => {
      return job.status === 'COMPLETED';
    };

    const isError = (job: ClassifyGetResponse): boolean => {
      return job.status === 'FAILED';
    };

    const getErrorMessage = (job: ClassifyGetResponse): string => {
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
   * Create a classify job, wait for it to complete, and return the result.
   *
   * This is a convenience method that combines create() and waitForCompletion()
   * into a single call for the most common end-to-end workflow.
   *
   * @param params - Classify job creation parameters
   * @param options - Polling configuration and request options
   * @returns The completed classify job with result populated
   * @throws {PollingTimeoutError} If the job doesn't complete within the timeout period
   * @throws {PollingError} If the job fails
   *
   * @example
   * ```typescript
   * import { LlamaCloud } from 'llama-cloud';
   *
   * const client = new LlamaCloud({ apiKey: '...' });
   *
   * const result = await client.classify.run({
   *   file_input: 'dfl-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
   *   configuration: {
   *     rules: [{ type: 'invoice', description: 'contains invoice number' }],
   *   },
   * }, { verbose: true });
   *
   * console.log(result.result);
   * ```
   */
  async run(
    params: ClassifyCreateParams,
    options?: PollingOptions & RequestOptions,
  ): Promise<ClassifyGetResponse> {
    const { pollingInterval, maxInterval, timeout, backoff, verbose, ...requestOptions } = options || {};

    const job = await this.create(params, requestOptions);

    const getQuery: ClassifyGetParams = {};
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

export type ClassifyListResponsesPaginatedCursor = PaginatedCursor<ClassifyListResponse>;

/**
 * Configuration for a classify job.
 */
export interface ClassifyConfiguration {
  /**
   * Classify rules to evaluate against the document (at least one required)
   */
  rules: Array<ClassifyConfiguration.Rule>;

  /**
   * Classify execution mode
   */
  mode?: 'FAST';

  /**
   * Parsing configuration for classify jobs.
   */
  parsing_configuration?: ClassifyConfiguration.ParsingConfiguration | null;
}

export namespace ClassifyConfiguration {
  /**
   * A rule for classifying documents.
   */
  export interface Rule {
    /**
     * Natural language criteria for matching this rule
     */
    description: string;

    /**
     * Document type to assign when rule matches
     */
    type: string;
  }

  /**
   * Parsing configuration for classify jobs.
   */
  export interface ParsingConfiguration {
    /**
     * ISO 639-1 language code for the document
     */
    lang?: string;

    /**
     * Maximum number of pages to process. Omit for no limit.
     */
    max_pages?: number | null;

    /**
     * Comma-separated page numbers or ranges to process (1-based). Omit to process all
     * pages.
     */
    target_pages?: string | null;
  }
}

/**
 * Request to create a classify job.
 */
export interface ClassifyCreateRequest {
  /**
   * Configuration for a classify job.
   */
  configuration?: ClassifyConfiguration | null;

  /**
   * Saved configuration ID
   */
  configuration_id?: string | null;

  /**
   * @deprecated Deprecated: use file_input instead
   */
  file_id?: string | null;

  /**
   * File ID or parse job ID to classify
   */
  file_input?: string | null;

  /**
   * @deprecated Deprecated: use file_input instead
   */
  parse_job_id?: string | null;

  /**
   * Idempotency key scoped to the project. Reusing a key returns the original job;
   * the new request body is ignored.
   */
  transaction_id?: string | null;

  /**
   * IDs of saved webhook configurations to notify for this job.
   */
  webhook_configuration_ids?: Array<string> | null;

  /**
   * Outbound webhook endpoints to notify on job status changes
   */
  webhook_configurations?: Array<ClassifyCreateRequest.WebhookConfiguration> | null;
}

export namespace ClassifyCreateRequest {
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
 * Result of classifying a document.
 */
export interface ClassifyResult {
  /**
   * Confidence score between 0.0 and 1.0
   */
  confidence: number;

  /**
   * Why the document matched (or didn't match) the returned rule
   */
  reasoning: string;

  /**
   * Matched rule type, or null if no rule matched
   */
  type: string | null;
}

/**
 * Response for a classify job.
 */
export interface ClassifyCreateResponse {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Classify configuration used for this job
   */
  configuration: ClassifyConfiguration;

  /**
   * Whether the input was a file or parse job (FILE or PARSE_JOB)
   */
  document_input_type: 'file_id' | 'parse_job_id' | 'url';

  /**
   * ID of the input file or parse job
   */
  file_input: string;

  /**
   * Project this job belongs to
   */
  project_id: string;

  /**
   * Current job status: PENDING, RUNNING, COMPLETED, FAILED, or CANCELLED
   */
  status: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING';

  /**
   * User who created this job
   */
  user_id: string;

  /**
   * Product configuration ID
   */
  configuration_id?: string | null;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Error message if job failed
   */
  error_message?: string | null;

  /**
   * Associated parse job ID
   */
  parse_job_id?: string | null;

  /**
   * Result of classifying a document.
   */
  result?: ClassifyResult | null;

  /**
   * Idempotency key
   */
  transaction_id?: string | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

/**
 * Response for a classify job.
 */
export interface ClassifyListResponse {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Classify configuration used for this job
   */
  configuration: ClassifyConfiguration;

  /**
   * Whether the input was a file or parse job (FILE or PARSE_JOB)
   */
  document_input_type: 'file_id' | 'parse_job_id' | 'url';

  /**
   * ID of the input file or parse job
   */
  file_input: string;

  /**
   * Project this job belongs to
   */
  project_id: string;

  /**
   * Current job status: PENDING, RUNNING, COMPLETED, FAILED, or CANCELLED
   */
  status: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING';

  /**
   * User who created this job
   */
  user_id: string;

  /**
   * Product configuration ID
   */
  configuration_id?: string | null;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Error message if job failed
   */
  error_message?: string | null;

  /**
   * Associated parse job ID
   */
  parse_job_id?: string | null;

  /**
   * Result of classifying a document.
   */
  result?: ClassifyResult | null;

  /**
   * Idempotency key
   */
  transaction_id?: string | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

/**
 * Identifiers for a deleted classify job.
 */
export interface ClassifyDeleteResponse {
  /**
   * Identifier of the deleted classify job
   */
  id: string;

  /**
   * Project the deleted job belonged to
   */
  project_id?: string | null;
}

/**
 * Response for a classify job.
 */
export interface ClassifyCancelResponse {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Classify configuration used for this job
   */
  configuration: ClassifyConfiguration;

  /**
   * Whether the input was a file or parse job (FILE or PARSE_JOB)
   */
  document_input_type: 'file_id' | 'parse_job_id' | 'url';

  /**
   * ID of the input file or parse job
   */
  file_input: string;

  /**
   * Project this job belongs to
   */
  project_id: string;

  /**
   * Current job status: PENDING, RUNNING, COMPLETED, FAILED, or CANCELLED
   */
  status: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING';

  /**
   * User who created this job
   */
  user_id: string;

  /**
   * Product configuration ID
   */
  configuration_id?: string | null;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Error message if job failed
   */
  error_message?: string | null;

  /**
   * Associated parse job ID
   */
  parse_job_id?: string | null;

  /**
   * Result of classifying a document.
   */
  result?: ClassifyResult | null;

  /**
   * Idempotency key
   */
  transaction_id?: string | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

/**
 * Response for a classify job.
 */
export interface ClassifyGetResponse {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Classify configuration used for this job
   */
  configuration: ClassifyConfiguration;

  /**
   * Whether the input was a file or parse job (FILE or PARSE_JOB)
   */
  document_input_type: 'file_id' | 'parse_job_id' | 'url';

  /**
   * ID of the input file or parse job
   */
  file_input: string;

  /**
   * Project this job belongs to
   */
  project_id: string;

  /**
   * Current job status: PENDING, RUNNING, COMPLETED, FAILED, or CANCELLED
   */
  status: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING';

  /**
   * User who created this job
   */
  user_id: string;

  /**
   * Product configuration ID
   */
  configuration_id?: string | null;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Error message if job failed
   */
  error_message?: string | null;

  /**
   * Associated parse job ID
   */
  parse_job_id?: string | null;

  /**
   * Result of classifying a document.
   */
  result?: ClassifyResult | null;

  /**
   * Idempotency key
   */
  transaction_id?: string | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

export interface ClassifyCreateParams {
  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Configuration for a classify job.
   */
  configuration?: ClassifyConfiguration | null;

  /**
   * Body param: Saved configuration ID
   */
  configuration_id?: string | null;

  /**
   * @deprecated Body param: Deprecated: use file_input instead
   */
  file_id?: string | null;

  /**
   * Body param: File ID or parse job ID to classify
   */
  file_input?: string | null;

  /**
   * @deprecated Body param: Deprecated: use file_input instead
   */
  parse_job_id?: string | null;

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
  webhook_configurations?: Array<ClassifyCreateParams.WebhookConfiguration> | null;
}

export namespace ClassifyCreateParams {
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

export interface ClassifyListParams extends PaginatedCursorParams {
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
   * Filter by specific job IDs
   */
  job_ids?: Array<string> | null;

  organization_id?: string | null;

  project_id?: string | null;

  /**
   * Filter by job status
   */
  status?: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING' | null;
}

export interface ClassifyGetParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface ClassifyCancelParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface ClassifyDeleteParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export declare namespace Classify {
  export {
    type ClassifyConfiguration as ClassifyConfiguration,
    type ClassifyCreateRequest as ClassifyCreateRequest,
    type ClassifyResult as ClassifyResult,
    type ClassifyCreateResponse as ClassifyCreateResponse,
    type ClassifyListResponse as ClassifyListResponse,
    type ClassifyDeleteResponse as ClassifyDeleteResponse,
    type ClassifyCancelResponse as ClassifyCancelResponse,
    type ClassifyGetResponse as ClassifyGetResponse,
    type ClassifyListResponsesPaginatedCursor as ClassifyListResponsesPaginatedCursor,
    type ClassifyCreateParams as ClassifyCreateParams,
    type ClassifyListParams as ClassifyListParams,
    type ClassifyGetParams as ClassifyGetParams,
    type ClassifyCancelParams as ClassifyCancelParams,
    type ClassifyDeleteParams as ClassifyDeleteParams,
  };
}
