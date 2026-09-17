// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FilesAPI from './files';
import * as BetaSheetsAPI from './beta/sheets';
import { SheetsJobsPaginatedCursor } from './beta/sheets';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedCursor, type PaginatedCursorParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Sheets extends APIResource {
  /**
   * Create a spreadsheet parsing job.
   *
   * Provide at most one of `configuration` (an inline parsing configuration) or
   * `configuration_id` (a saved configuration preset). If neither is provided, a
   * default configuration is used. Optionally include `webhook_configurations` to
   * receive `sheets.*` status notifications.
   *
   * @example
   * ```ts
   * const sheetsJob = await client.sheets.create({
   *   file_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * });
   * ```
   */
  create(params: SheetCreateParams, options?: RequestOptions): APIPromise<BetaSheetsAPI.SheetsJob> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post('/api/v1/sheets/jobs', {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * List spreadsheet parsing jobs.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const sheetsJob of client.sheets.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: SheetListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SheetsJobsPaginatedCursor, BetaSheetsAPI.SheetsJob> {
    return this._client.getAPIList('/api/v1/sheets/jobs', PaginatedCursor<BetaSheetsAPI.SheetsJob>, {
      query,
      ...options,
    });
  }

  /**
   * Get a spreadsheet parsing job. When `include_results=True` (default), embeds
   * extracted regions and results if complete, skipping the separate `/results`
   * call.
   *
   * @example
   * ```ts
   * const sheetsJob = await client.sheets.get(
   *   'spreadsheet_job_id',
   * );
   * ```
   */
  get(
    spreadsheetJobID: string,
    query: SheetGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BetaSheetsAPI.SheetsJob> {
    return this._client.get(path`/api/v1/sheets/jobs/${spreadsheetJobID}`, { query, ...options });
  }

  /**
   * Generate a presigned URL to download a specific extracted region.
   *
   * @example
   * ```ts
   * const presignedURL = await client.sheets.getResultTable(
   *   'cell_metadata',
   *   {
   *     spreadsheet_job_id: 'spreadsheet_job_id',
   *     region_id: 'region_id',
   *   },
   * );
   * ```
   */
  getResultTable(
    regionType: 'cell_metadata' | 'extra' | 'table',
    params: SheetGetResultTableParams,
    options?: RequestOptions,
  ): APIPromise<FilesAPI.PresignedURL> {
    const { spreadsheet_job_id, region_id, ...query } = params;
    return this._client.get(
      path`/api/v1/sheets/jobs/${spreadsheet_job_id}/regions/${region_id}/result/${regionType}`,
      { query, ...options },
    );
  }

  /**
   * Delete a spreadsheet parsing job and its associated data.
   *
   * @example
   * ```ts
   * const response = await client.sheets.deleteJob(
   *   'spreadsheet_job_id',
   * );
   * ```
   */
  deleteJob(
    spreadsheetJobID: string,
    params: SheetDeleteJobParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { organization_id, project_id } = params ?? {};
    return this._client.delete(path`/api/v1/sheets/jobs/${spreadsheetJobID}`, {
      query: { organization_id, project_id },
      ...options,
    });
  }
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
  config?: BetaSheetsAPI.SheetsParsingConfig | null;

  /**
   * Body param: Configuration for spreadsheet parsing and region extraction
   */
  configuration?: BetaSheetsAPI.SheetsParsingConfig | null;

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

export interface SheetDeleteJobParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export declare namespace Sheets {
  export {
    type SheetDeleteJobResponse as SheetDeleteJobResponse,
    type SheetCreateParams as SheetCreateParams,
    type SheetListParams as SheetListParams,
    type SheetGetParams as SheetGetParams,
    type SheetGetResultTableParams as SheetGetResultTableParams,
    type SheetDeleteJobParams as SheetDeleteJobParams,
  };
}

export { type SheetsJobsPaginatedCursor };
