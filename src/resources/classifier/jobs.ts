// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ParsingAPI from '../parsing';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, PaginatedCursor, type PaginatedCursorParams } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';
import { pollUntilComplete, PollingOptions, DEFAULT_TIMEOUT } from '../../core/polling';

export class Jobs extends APIResource {
  /**
   * Create a classify job. Experimental: not production-ready and subject to change.
   *
   * @deprecated Please use `client.classify.create()`
   */
  create(params: JobCreateParams, options?: RequestOptions): APIPromise<ClassifyJob> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post('/api/v1/classifier/jobs', {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * List classify jobs. Experimental: not production-ready and subject to change.
   *
   * @deprecated Please use `client.classify.list()`
   */
  list(
    query: JobListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ClassifyJobsPaginatedCursor, ClassifyJob> {
    return this._client.getAPIList('/api/v1/classifier/jobs', PaginatedCursor<ClassifyJob>, {
      query,
      ...options,
    });
  }

  /**
   * Get a classify job. Experimental: not production-ready and subject to change.
   *
   * @deprecated Please use `client.classify.get()`
   */
  get(
    classifyJobID: string,
    query: JobGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ClassifyJob> {
    return this._client.get(path`/api/v1/classifier/jobs/${classifyJobID}`, { query, ...options });
  }

  /**
   * Get the results of a classify job. Experimental: not production-ready and
   * subject to change.
   *
   * @deprecated Please use `client.classify.get()`
   */
  getResults(
    classifyJobID: string,
    query: JobGetResultsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<JobGetResultsResponse> {
    return this._client.get(path`/api/v1/classifier/jobs/${classifyJobID}/results`, { query, ...options });
  }

  /**
   * Wait for a classify job to complete by polling until it reaches a terminal state.
   *
   * This method polls the job status at regular intervals until the job completes
   * successfully or fails. It uses configurable backoff strategies to optimize
   * polling behavior.
   *
   * @param classifyJobID - The ID of the classify job to wait for
   * @param query - Query parameters for the get request
   * @param options - Polling configuration options
   * @returns The completed ClassifyJob
   * @throws {PollingTimeoutError} If the job doesn't complete within the timeout period
   * @throws {PollingError} If the job fails or is cancelled
   *
   * @example
   * ```typescript
   * import { LlamaCloud } from 'llama-cloud';
   *
   * const client = new LlamaCloud({ apiKey: '...' });
   *
   * // Create a classify job
   * const job = await client.classifier.jobs.create({
   *   file_ids: ['file1', 'file2'],
   *   rules: [...]
   * });
   *
   * // Wait for it to complete
   * const completedJob = await client.classifier.jobs.waitForCompletion(
   *   job.id,
   *   {},
   *   { verbose: true }
   * );
   *
   * // Get the results
   * const results = await client.classifier.jobs.getResults(job.id);
   * ```
   */
  async waitForCompletion(
    classifyJobID: string,
    query: JobGetParams | null | undefined = {},
    options?: PollingOptions & RequestOptions,
  ): Promise<ClassifyJob> {
    const { pollingInterval, maxInterval, timeout, backoff, verbose, ...requestOptions } = options || {};

    const getStatus = async (): Promise<ClassifyJob> => {
      return await this.get(classifyJobID, query, requestOptions);
    };

    const isComplete = (job: ClassifyJob): boolean => {
      return job.status === 'SUCCESS' || job.status === 'PARTIAL_SUCCESS';
    };

    const isError = (job: ClassifyJob): boolean => {
      return job.status === 'ERROR' || job.status === 'CANCELLED';
    };

    const getErrorMessage = (job: ClassifyJob): string => {
      const errorParts = [`Job ${classifyJobID} failed with status: ${job.status}`];
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
}

export type ClassifyJobsPaginatedCursor = PaginatedCursor<ClassifyJob>;

/**
 * A rule for classifying documents - v0 simplified version.
 *
 * This represents a single classification rule that will be applied to documents.
 * All rules are content-based and use natural language descriptions.
 */
export interface ClassifierRule {
  /**
   * Natural language description of what to classify. Be specific about the content
   * characteristics that identify this document type.
   */
  description: string;

  /**
   * The document type to assign when this rule matches (e.g., 'invoice', 'receipt',
   * 'contract')
   */
  type: string;
}

/**
 * A classify job.
 */
export interface ClassifyJob {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * The ID of the project
   */
  project_id: string;

  /**
   * The rules to classify the files
   */
  rules: Array<ClassifierRule>;

  /**
   * The status of the classify job
   */
  status: ParsingAPI.StatusEnum;

  /**
   * The ID of the user
   */
  user_id: string;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  effective_at?: string;

  /**
   * Error message for the latest job attempt, if any.
   */
  error_message?: string | null;

  /**
   * The job record ID associated with this status, if any.
   */
  job_record_id?: string | null;

  /**
   * The classification mode to use
   */
  mode?: 'FAST' | 'MULTIMODAL';

  /**
   * The configuration for the parsing job
   */
  parsing_configuration?: ClassifyParsingConfiguration;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

/**
 * Parsing configuration for a classify job.
 */
export interface ClassifyParsingConfiguration {
  /**
   * The language to parse the files in
   */
  lang?: ParsingAPI.ParsingLanguages;

  /**
   * The maximum number of pages to parse
   */
  max_pages?: number | null;

  /**
   * The pages to target for parsing (0-indexed, so first page is at 0)
   */
  target_pages?: Array<number> | null;
}

/**
 * Response model for the classify endpoint following AIP-132 pagination standard.
 */
export interface JobGetResultsResponse {
  /**
   * The list of items.
   */
  items: Array<JobGetResultsResponse.Item>;

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

export namespace JobGetResultsResponse {
  /**
   * A file classification.
   */
  export interface Item {
    /**
     * Unique identifier
     */
    id: string;

    /**
     * The ID of the classify job
     */
    classify_job_id: string;

    /**
     * Creation datetime
     */
    created_at?: string | null;

    /**
     * The ID of the classified file
     */
    file_id?: string | null;

    /**
     * Result of classifying a single file.
     */
    result?: Item.Result | null;

    /**
     * Update datetime
     */
    updated_at?: string | null;
  }

  export namespace Item {
    /**
     * Result of classifying a single file.
     */
    export interface Result {
      /**
       * Confidence score of the classification (0.0-1.0)
       */
      confidence: number;

      /**
       * Step-by-step explanation of why this classification was chosen and the
       * confidence score assigned
       */
      reasoning: string;

      /**
       * The document type that best matches, or null if no match.
       */
      type: string | null;
    }
  }
}

export interface JobCreateParams {
  /**
   * Body param: The IDs of the files to classify
   */
  file_ids: Array<string>;

  /**
   * Body param: The rules to classify the files
   */
  rules: Array<ClassifierRule>;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: The classification mode to use
   */
  mode?: 'FAST' | 'MULTIMODAL';

  /**
   * Body param: The configuration for the parsing job
   */
  parsing_configuration?: ClassifyParsingConfiguration;

  /**
   * Body param: List of webhook configurations for notifications
   */
  webhook_configurations?: Array<JobCreateParams.WebhookConfiguration>;
}

export namespace JobCreateParams {
  /**
   * Webhook configuration for receiving parsing job notifications.
   *
   * Webhooks are called when specified events occur during job processing. Configure
   * multiple webhook configurations to send to different endpoints.
   */
  export interface WebhookConfiguration {
    /**
     * Events that trigger this webhook. Options: 'parse.success' (job completed),
     * 'parse.error' (job failed), 'parse.partial_success' (some pages failed),
     * 'parse.pending', 'parse.running', 'parse.cancelled'. If not specified, webhook
     * fires for all events
     */
    webhook_events?: Array<string> | null;

    /**
     * Custom HTTP headers to include in webhook requests. Use for authentication
     * tokens or custom routing. Example: {'Authorization': 'Bearer xyz'}
     */
    webhook_headers?: { [key: string]: unknown } | null;

    /**
     * Format of the webhook payload body. 'string' (default) sends the payload as a
     * JSON-encoded string; 'json' sends it as a JSON object.
     */
    webhook_output_format?: 'json' | 'string' | null;

    /**
     * Shared signing secret used to sign webhook deliveries. When set, each request
     * includes an HMAC-SHA256 signature of the request body in the 'LC-Signature'
     * header (value 'sha256=<hex>'). Recompute the HMAC over the raw request body with
     * this secret to verify the delivery is authentic.
     */
    webhook_signing_secret?: string | null;

    /**
     * HTTPS URL to receive webhook POST requests. Must be publicly accessible
     */
    webhook_url?: string | null;
  }
}

export interface JobListParams extends PaginatedCursorParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface JobGetParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface JobGetResultsParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export declare namespace Jobs {
  export {
    type ClassifierRule as ClassifierRule,
    type ClassifyJob as ClassifyJob,
    type ClassifyParsingConfiguration as ClassifyParsingConfiguration,
    type JobGetResultsResponse as JobGetResultsResponse,
    type ClassifyJobsPaginatedCursor as ClassifyJobsPaginatedCursor,
    type JobCreateParams as JobCreateParams,
    type JobListParams as JobListParams,
    type JobGetParams as JobGetParams,
    type JobGetResultsParams as JobGetResultsParams,
  };
}
