// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedCursor, type PaginatedCursorParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Batches extends APIResource {
  /**
   * Create a batch over a source directory and start processing asynchronously.
   *
   * To be notified as the batch progresses, pass `webhook_configurations` with
   * inline endpoints and/or `webhook_configuration_ids` referencing saved
   * configurations. Batches emit `batch.pending` on create, `batch.running` once
   * processing starts, and a terminal `batch.success` or `batch.error`.
   *
   * `batch.success` means the batch finished mapping every source file to a job —
   * individual files may still have failed, so read `results` (with
   * `expand=results`) for per-file outcomes.
   *
   * Delivery order across events is not guaranteed; key on the `status` field in the
   * payload rather than arrival order.
   *
   * @example
   * ```ts
   * const batch = await client.batches.create({
   *   config: {
   *     job: {
   *       configuration_id: 'cfg-PARSE_AGENTIC',
   *       type: 'parse_v2',
   *     },
   *   },
   *   source_directory_id:
   *     'dir-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
   * });
   * ```
   */
  create(params: BatchCreateParams, options?: RequestOptions): APIPromise<BatchCreateResponse> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post('/api/v2/batches', { query: { organization_id, project_id }, body, ...options });
  }

  /**
   * List batches for the current project.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const batchListResponse of client.batches.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: BatchListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<BatchListResponsesPaginatedCursor, BatchListResponse> {
    return this._client.getAPIList('/api/v2/batches', PaginatedCursor<BatchListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Get a batch by ID.
   *
   * @example
   * ```ts
   * const batch = await client.batches.get('batch_id');
   * ```
   */
  get(
    batchID: string,
    query: BatchGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BatchGetResponse> {
    return this._client.get(path`/api/v2/batches/${batchID}`, { query, ...options });
  }

  /**
   * Cancel a running batch.
   *
   * Returns immediately; the batch reaches `CANCELLED` once processing stops. Files
   * that already finished keep their results. A batch in a terminal status cannot be
   * cancelled.
   *
   * @example
   * ```ts
   * const response = await client.batches.cancel('batch_id');
   * ```
   */
  cancel(
    batchID: string,
    params: BatchCancelParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BatchCancelResponse> {
    const { organization_id, project_id } = params ?? {};
    return this._client.post(path`/api/v2/batches/${batchID}/cancel`, {
      query: { organization_id, project_id },
      ...options,
    });
  }
}

export type BatchListResponsesPaginatedCursor = PaginatedCursor<BatchListResponse>;

/**
 * A top-level batch.
 *
 * Example: { "id": "bat-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "project_id":
 * "prj-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "source_directory_id":
 * "dir-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "config": { "job": { "type":
 * "parse_v2", "configuration_id": "cfg-PARSE_AGENTIC" } }, "status": "COMPLETED",
 * "results": [ { "source_directory_file_id":
 * "dfl-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "job_reference": { "type":
 * "parse_v2", "id": "pjb-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee" }, "error_message":
 * null } ] }
 *
 * Batch-level `FAILED` means the orchestration failed and cannot provide a
 * reliable per-file result set. `results` is only populated when explicitly
 * requested with `expand=results` and may be `null` while a batch is still
 * running.
 */
export interface BatchCreateResponse {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Batch configuration snapshot.
   */
  config: BatchCreateResponse.Config;

  /**
   * Project this batch belongs to.
   */
  project_id: string;

  /**
   * Directory being processed.
   */
  source_directory_id: string;

  /**
   * Current batch status.
   */
  status: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING' | 'THROTTLED';

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Expanded per-file result mappings. Null unless requested with expand=results, or
   * while the batch is still running.
   */
  results?: Array<BatchCreateResponse.Result> | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

export namespace BatchCreateResponse {
  /**
   * Batch configuration snapshot.
   */
  export interface Config {
    /**
     * Job to create for each file in the source directory.
     */
    job: Config.Job;
  }

  export namespace Config {
    /**
     * Job to create for each file in the source directory.
     */
    export interface Job {
      /**
       * Product configuration ID or built-in preset ID matching the job type.
       */
      configuration_id: string;

      /**
       * Product job type to run for each source directory file.
       */
      type: 'parse_v2' | 'extract_v2';
    }
  }

  /**
   * Result projection for one source directory file in a batch.
   *
   * Example: { "source_directory_file_id":
   * "dfl-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "job_reference": { "type":
   * "parse_v2", "id": "pjb-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee" }, "error_message":
   * null }
   *
   * This is a projection of directory-sync state, not a separate child resource that
   * callers need to create. The source directory file ID is the stable correlation
   * key. Underlying job progress and failures should be resolved through the
   * referenced product job endpoint.
   */
  export interface Result {
    /**
     * Source directory file processed by this batch.
     */
    source_directory_file_id: string;

    /**
     * Batch-level mapping error if the system could not create or associate a job for
     * this source file.
     */
    error_message?: string | null;

    /**
     * Reference to a job produced by a batch.
     *
     * Example: { "type": "parse_v2", "id": "pjb-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
     * }
     */
    job_reference?: Result.JobReference | null;
  }

  export namespace Result {
    /**
     * Reference to a job produced by a batch.
     *
     * Example: { "type": "parse_v2", "id": "pjb-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
     * }
     */
    export interface JobReference {
      /**
       * Job ID, such as a parse job ID.
       */
      id: string;

      /**
       * Type of job produced for the file.
       */
      type: 'parse_v2' | 'extract_v2';
    }
  }
}

/**
 * A top-level batch.
 *
 * Example: { "id": "bat-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "project_id":
 * "prj-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "source_directory_id":
 * "dir-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "config": { "job": { "type":
 * "parse_v2", "configuration_id": "cfg-PARSE_AGENTIC" } }, "status": "COMPLETED",
 * "results": [ { "source_directory_file_id":
 * "dfl-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "job_reference": { "type":
 * "parse_v2", "id": "pjb-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee" }, "error_message":
 * null } ] }
 *
 * Batch-level `FAILED` means the orchestration failed and cannot provide a
 * reliable per-file result set. `results` is only populated when explicitly
 * requested with `expand=results` and may be `null` while a batch is still
 * running.
 */
export interface BatchListResponse {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Batch configuration snapshot.
   */
  config: BatchListResponse.Config;

  /**
   * Project this batch belongs to.
   */
  project_id: string;

  /**
   * Directory being processed.
   */
  source_directory_id: string;

  /**
   * Current batch status.
   */
  status: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING' | 'THROTTLED';

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Expanded per-file result mappings. Null unless requested with expand=results, or
   * while the batch is still running.
   */
  results?: Array<BatchListResponse.Result> | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

export namespace BatchListResponse {
  /**
   * Batch configuration snapshot.
   */
  export interface Config {
    /**
     * Job to create for each file in the source directory.
     */
    job: Config.Job;
  }

  export namespace Config {
    /**
     * Job to create for each file in the source directory.
     */
    export interface Job {
      /**
       * Product configuration ID or built-in preset ID matching the job type.
       */
      configuration_id: string;

      /**
       * Product job type to run for each source directory file.
       */
      type: 'parse_v2' | 'extract_v2';
    }
  }

  /**
   * Result projection for one source directory file in a batch.
   *
   * Example: { "source_directory_file_id":
   * "dfl-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "job_reference": { "type":
   * "parse_v2", "id": "pjb-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee" }, "error_message":
   * null }
   *
   * This is a projection of directory-sync state, not a separate child resource that
   * callers need to create. The source directory file ID is the stable correlation
   * key. Underlying job progress and failures should be resolved through the
   * referenced product job endpoint.
   */
  export interface Result {
    /**
     * Source directory file processed by this batch.
     */
    source_directory_file_id: string;

    /**
     * Batch-level mapping error if the system could not create or associate a job for
     * this source file.
     */
    error_message?: string | null;

    /**
     * Reference to a job produced by a batch.
     *
     * Example: { "type": "parse_v2", "id": "pjb-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
     * }
     */
    job_reference?: Result.JobReference | null;
  }

  export namespace Result {
    /**
     * Reference to a job produced by a batch.
     *
     * Example: { "type": "parse_v2", "id": "pjb-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
     * }
     */
    export interface JobReference {
      /**
       * Job ID, such as a parse job ID.
       */
      id: string;

      /**
       * Type of job produced for the file.
       */
      type: 'parse_v2' | 'extract_v2';
    }
  }
}

/**
 * A top-level batch.
 *
 * Example: { "id": "bat-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "project_id":
 * "prj-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "source_directory_id":
 * "dir-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "config": { "job": { "type":
 * "parse_v2", "configuration_id": "cfg-PARSE_AGENTIC" } }, "status": "COMPLETED",
 * "results": [ { "source_directory_file_id":
 * "dfl-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "job_reference": { "type":
 * "parse_v2", "id": "pjb-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee" }, "error_message":
 * null } ] }
 *
 * Batch-level `FAILED` means the orchestration failed and cannot provide a
 * reliable per-file result set. `results` is only populated when explicitly
 * requested with `expand=results` and may be `null` while a batch is still
 * running.
 */
export interface BatchCancelResponse {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Batch configuration snapshot.
   */
  config: BatchCancelResponse.Config;

  /**
   * Project this batch belongs to.
   */
  project_id: string;

  /**
   * Directory being processed.
   */
  source_directory_id: string;

  /**
   * Current batch status.
   */
  status: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING' | 'THROTTLED';

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Expanded per-file result mappings. Null unless requested with expand=results, or
   * while the batch is still running.
   */
  results?: Array<BatchCancelResponse.Result> | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

export namespace BatchCancelResponse {
  /**
   * Batch configuration snapshot.
   */
  export interface Config {
    /**
     * Job to create for each file in the source directory.
     */
    job: Config.Job;
  }

  export namespace Config {
    /**
     * Job to create for each file in the source directory.
     */
    export interface Job {
      /**
       * Product configuration ID or built-in preset ID matching the job type.
       */
      configuration_id: string;

      /**
       * Product job type to run for each source directory file.
       */
      type: 'parse_v2' | 'extract_v2';
    }
  }

  /**
   * Result projection for one source directory file in a batch.
   *
   * Example: { "source_directory_file_id":
   * "dfl-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "job_reference": { "type":
   * "parse_v2", "id": "pjb-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee" }, "error_message":
   * null }
   *
   * This is a projection of directory-sync state, not a separate child resource that
   * callers need to create. The source directory file ID is the stable correlation
   * key. Underlying job progress and failures should be resolved through the
   * referenced product job endpoint.
   */
  export interface Result {
    /**
     * Source directory file processed by this batch.
     */
    source_directory_file_id: string;

    /**
     * Batch-level mapping error if the system could not create or associate a job for
     * this source file.
     */
    error_message?: string | null;

    /**
     * Reference to a job produced by a batch.
     *
     * Example: { "type": "parse_v2", "id": "pjb-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
     * }
     */
    job_reference?: Result.JobReference | null;
  }

  export namespace Result {
    /**
     * Reference to a job produced by a batch.
     *
     * Example: { "type": "parse_v2", "id": "pjb-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
     * }
     */
    export interface JobReference {
      /**
       * Job ID, such as a parse job ID.
       */
      id: string;

      /**
       * Type of job produced for the file.
       */
      type: 'parse_v2' | 'extract_v2';
    }
  }
}

/**
 * A top-level batch.
 *
 * Example: { "id": "bat-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "project_id":
 * "prj-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "source_directory_id":
 * "dir-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "config": { "job": { "type":
 * "parse_v2", "configuration_id": "cfg-PARSE_AGENTIC" } }, "status": "COMPLETED",
 * "results": [ { "source_directory_file_id":
 * "dfl-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "job_reference": { "type":
 * "parse_v2", "id": "pjb-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee" }, "error_message":
 * null } ] }
 *
 * Batch-level `FAILED` means the orchestration failed and cannot provide a
 * reliable per-file result set. `results` is only populated when explicitly
 * requested with `expand=results` and may be `null` while a batch is still
 * running.
 */
export interface BatchGetResponse {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Batch configuration snapshot.
   */
  config: BatchGetResponse.Config;

  /**
   * Project this batch belongs to.
   */
  project_id: string;

  /**
   * Directory being processed.
   */
  source_directory_id: string;

  /**
   * Current batch status.
   */
  status: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING' | 'THROTTLED';

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Expanded per-file result mappings. Null unless requested with expand=results, or
   * while the batch is still running.
   */
  results?: Array<BatchGetResponse.Result> | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

export namespace BatchGetResponse {
  /**
   * Batch configuration snapshot.
   */
  export interface Config {
    /**
     * Job to create for each file in the source directory.
     */
    job: Config.Job;
  }

  export namespace Config {
    /**
     * Job to create for each file in the source directory.
     */
    export interface Job {
      /**
       * Product configuration ID or built-in preset ID matching the job type.
       */
      configuration_id: string;

      /**
       * Product job type to run for each source directory file.
       */
      type: 'parse_v2' | 'extract_v2';
    }
  }

  /**
   * Result projection for one source directory file in a batch.
   *
   * Example: { "source_directory_file_id":
   * "dfl-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "job_reference": { "type":
   * "parse_v2", "id": "pjb-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee" }, "error_message":
   * null }
   *
   * This is a projection of directory-sync state, not a separate child resource that
   * callers need to create. The source directory file ID is the stable correlation
   * key. Underlying job progress and failures should be resolved through the
   * referenced product job endpoint.
   */
  export interface Result {
    /**
     * Source directory file processed by this batch.
     */
    source_directory_file_id: string;

    /**
     * Batch-level mapping error if the system could not create or associate a job for
     * this source file.
     */
    error_message?: string | null;

    /**
     * Reference to a job produced by a batch.
     *
     * Example: { "type": "parse_v2", "id": "pjb-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
     * }
     */
    job_reference?: Result.JobReference | null;
  }

  export namespace Result {
    /**
     * Reference to a job produced by a batch.
     *
     * Example: { "type": "parse_v2", "id": "pjb-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
     * }
     */
    export interface JobReference {
      /**
       * Job ID, such as a parse job ID.
       */
      id: string;

      /**
       * Type of job produced for the file.
       */
      type: 'parse_v2' | 'extract_v2';
    }
  }
}

export interface BatchCreateParams {
  /**
   * Body param: Batch configuration snapshot to apply to this source directory.
   */
  config: BatchCreateParams.Config;

  /**
   * Body param: Directory whose files should be processed.
   */
  source_directory_id: string;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: IDs of saved webhook configurations to notify for this job.
   */
  webhook_configuration_ids?: Array<string> | null;

  /**
   * Body param: Outbound webhook endpoints to notify on job status changes
   */
  webhook_configurations?: Array<BatchCreateParams.WebhookConfiguration> | null;
}

export namespace BatchCreateParams {
  /**
   * Batch configuration snapshot to apply to this source directory.
   */
  export interface Config {
    /**
     * Job to create for each file in the source directory.
     */
    job: Config.Job;
  }

  export namespace Config {
    /**
     * Job to create for each file in the source directory.
     */
    export interface Job {
      /**
       * Product configuration ID or built-in preset ID matching the job type.
       */
      configuration_id: string;

      /**
       * Product job type to run for each source directory file.
       */
      type: 'parse_v2' | 'extract_v2';
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
      | 'verify.cancelled'
      | 'verify.error'
      | 'verify.pending'
      | 'verify.running'
      | 'verify.success'
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

export interface BatchListParams extends PaginatedCursorParams {
  created_at_on_or_after?: string | null;

  created_at_on_or_before?: string | null;

  organization_id?: string | null;

  project_id?: string | null;

  source_directory_id?: string | null;

  status?: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING' | 'THROTTLED' | null;
}

export interface BatchGetParams {
  /**
   * Fields to expand. Supported value: results.
   */
  expand?: Array<string> | null;

  organization_id?: string | null;

  project_id?: string | null;
}

export interface BatchCancelParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export declare namespace Batches {
  export {
    type BatchCreateResponse as BatchCreateResponse,
    type BatchListResponse as BatchListResponse,
    type BatchCancelResponse as BatchCancelResponse,
    type BatchGetResponse as BatchGetResponse,
    type BatchListResponsesPaginatedCursor as BatchListResponsesPaginatedCursor,
    type BatchCreateParams as BatchCreateParams,
    type BatchListParams as BatchListParams,
    type BatchGetParams as BatchGetParams,
    type BatchCancelParams as BatchCancelParams,
  };
}
