// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FilesAPI from './files';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedCursor, type PaginatedCursorParams } from '../core/pagination';
import { type Uploadable } from '../core/uploads';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Files extends APIResource {
  /**
   * Upload a file using multipart/form-data.
   *
   * Set `purpose` to indicate how the file will be used: `user_data`, `parse`,
   * `extract`, `classify`, `split`, `sheet`, or `agent_app`.
   *
   * Returns the created file metadata including its ID for use in subsequent parse,
   * extract, or classify operations.
   */
  create(params: FileCreateParams, options?: RequestOptions): APIPromise<FileCreateResponse> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post(
      '/api/v1/beta/files',
      multipartFormRequestOptions({ query: { organization_id, project_id }, body, ...options }, this._client),
    );
  }

  /**
   * Query files with filtering and pagination. Deprecated: use `GET /files`.
   *
   * @deprecated Use the GET /files endpoint instead
   */
  query(params: FileQueryParams, options?: RequestOptions): APIPromise<FileQueryResponse> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post('/api/v1/beta/files/query', {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * List files with optional filtering and pagination.
   *
   * Filter by `file_name`, `file_ids`, or `external_file_id`. Supports cursor-based
   * pagination and custom ordering.
   */
  list(
    query: FileListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<FileListResponsesPaginatedCursor, FileListResponse> {
    return this._client.getAPIList('/api/v1/beta/files', PaginatedCursor<FileListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Get file metadata by ID.
   */
  retrieve(
    fileID: string,
    query: FileRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FileRetrieveResponse> {
    return this._client.get(path`/api/v1/beta/files/${fileID}`, { query, ...options });
  }

  /**
   * Delete a file from the project.
   */
  delete(
    fileID: string,
    params: FileDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { organization_id, project_id } = params ?? {};
    return this._client.delete(path`/api/v1/beta/files/${fileID}`, {
      query: { organization_id, project_id },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get a presigned URL to download the file content.
   */
  content(
    fileID: string,
    query: FileContentParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PresignedURL> {
    return this._client.get(path`/api/v1/beta/files/${fileID}/content`, { query, ...options });
  }
}

export type FileListResponsesPaginatedCursor = PaginatedCursor<FileListResponse>;

/**
 * Schema for a file.
 */
export interface File {
  /**
   * Unique identifier
   */
  id: string;

  name: string;

  /**
   * The ID of the project that the file belongs to
   */
  project_id: string;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * The ID of the data source that the file belongs to
   */
  data_source_id?: string | null;

  /**
   * The expiration date for the file. Files past this date can be deleted.
   */
  expires_at?: string | null;

  /**
   * The ID of the file in the external system
   */
  external_file_id?: string | null;

  /**
   * Size of the file in bytes
   */
  file_size?: number | null;

  /**
   * File type (e.g. pdf, docx, etc.)
   */
  file_type?: string | null;

  /**
   * The last modified time of the file
   */
  last_modified_at?: string | null;

  /**
   * Permission information for the file
   */
  permission_info?: {
    [key: string]: { [key: string]: unknown } | Array<unknown> | string | number | boolean | null;
  } | null;

  /**
   * The intended purpose of the file (e.g., 'user_data', 'parse', 'extract',
   * 'split', 'classify')
   */
  purpose?: string | null;

  /**
   * Resource information for the file
   */
  resource_info?: {
    [key: string]: { [key: string]: unknown } | Array<unknown> | string | number | boolean | null;
  } | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

/**
 * Schema for a presigned URL.
 */
export interface PresignedURL {
  /**
   * The time at which the presigned URL expires
   */
  expires_at: string;

  /**
   * A presigned URL for IO operations against a private file
   */
  url: string;

  /**
   * Form fields for a presigned POST request
   */
  form_fields?: { [key: string]: string } | null;
}

/**
 * An uploaded file.
 */
export interface FileCreateResponse {
  /**
   * Unique file identifier
   */
  id: string;

  /**
   * File name including extension
   */
  name: string;

  /**
   * Project this file belongs to
   */
  project_id: string;

  /**
   * Schema for a presigned URL.
   */
  download_url?: PresignedURL | null;

  /**
   * When the file expires and may be automatically removed. Null means no
   * expiration.
   */
  expires_at?: string | null;

  /**
   * Optional ID for correlating with an external system
   */
  external_file_id?: string | null;

  /**
   * File extension (pdf, docx, png, etc.)
   */
  file_type?: string | null;

  /**
   * When the file was last modified (ISO 8601)
   */
  last_modified_at?: string | null;

  /**
   * How the file will be used: user_data, parse, extract, classify, split, sheet, or
   * agent_app
   */
  purpose?: string | null;
}

/**
 * An uploaded file.
 */
export interface FileRetrieveResponse {
  /**
   * Unique file identifier
   */
  id: string;

  /**
   * File name including extension
   */
  name: string;

  /**
   * Project this file belongs to
   */
  project_id: string;

  /**
   * Schema for a presigned URL.
   */
  download_url?: PresignedURL | null;

  /**
   * When the file expires and may be automatically removed. Null means no
   * expiration.
   */
  expires_at?: string | null;

  /**
   * Optional ID for correlating with an external system
   */
  external_file_id?: string | null;

  /**
   * File extension (pdf, docx, png, etc.)
   */
  file_type?: string | null;

  /**
   * When the file was last modified (ISO 8601)
   */
  last_modified_at?: string | null;

  /**
   * How the file will be used: user_data, parse, extract, classify, split, sheet, or
   * agent_app
   */
  purpose?: string | null;
}

/**
 * An uploaded file.
 */
export interface FileListResponse {
  /**
   * Unique file identifier
   */
  id: string;

  /**
   * File name including extension
   */
  name: string;

  /**
   * Project this file belongs to
   */
  project_id: string;

  /**
   * Schema for a presigned URL.
   */
  download_url?: PresignedURL | null;

  /**
   * When the file expires and may be automatically removed. Null means no
   * expiration.
   */
  expires_at?: string | null;

  /**
   * Optional ID for correlating with an external system
   */
  external_file_id?: string | null;

  /**
   * File extension (pdf, docx, png, etc.)
   */
  file_type?: string | null;

  /**
   * When the file was last modified (ISO 8601)
   */
  last_modified_at?: string | null;

  /**
   * How the file will be used: user_data, parse, extract, classify, split, sheet, or
   * agent_app
   */
  purpose?: string | null;
}

/**
 * Paginated list of files.
 */
export interface FileQueryResponse {
  /**
   * The list of items.
   */
  items: Array<FileQueryResponse.Item>;

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

export namespace FileQueryResponse {
  /**
   * An uploaded file.
   */
  export interface Item {
    /**
     * Unique file identifier
     */
    id: string;

    /**
     * File name including extension
     */
    name: string;

    /**
     * Project this file belongs to
     */
    project_id: string;

    /**
     * Schema for a presigned URL.
     */
    download_url?: FilesAPI.PresignedURL | null;

    /**
     * When the file expires and may be automatically removed. Null means no
     * expiration.
     */
    expires_at?: string | null;

    /**
     * Optional ID for correlating with an external system
     */
    external_file_id?: string | null;

    /**
     * File extension (pdf, docx, png, etc.)
     */
    file_type?: string | null;

    /**
     * When the file was last modified (ISO 8601)
     */
    last_modified_at?: string | null;

    /**
     * How the file will be used: user_data, parse, extract, classify, split, sheet, or
     * agent_app
     */
    purpose?: string | null;
  }
}

export interface FileCreateParams {
  /**
   * Body param: The file to upload
   */
  file: Uploadable;

  /**
   * Body param: The intended purpose of the file. Valid values: 'user_data',
   * 'parse', 'extract', 'split', 'classify', 'sheet', 'agent_app'. This determines
   * the storage and retention policy for the file.
   */
  purpose: string;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: The ID of the file in the external system
   */
  external_file_id?: string | null;
}

export interface FileQueryParams {
  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Filter parameters for file queries.
   */
  filter?: FileQueryParams.Filter | null;

  /**
   * Body param: A comma-separated list of fields to order by, sorted in ascending
   * order. Use 'field_name desc' to specify descending order.
   */
  order_by?: string | null;

  /**
   * Body param: The maximum number of items to return. The service may return fewer
   * than this value. If unspecified, a default page size will be used. The maximum
   * value is typically 1000; values above this will be coerced to the maximum.
   */
  page_size?: number | null;

  /**
   * Body param: A page token, received from a previous list call. Provide this to
   * retrieve the subsequent page.
   */
  page_token?: string | null;
}

export namespace FileQueryParams {
  /**
   * Filter parameters for file queries.
   */
  export interface Filter {
    /**
     * Filter by data source ID
     */
    data_source_id?: string | null;

    /**
     * Filter by external file ID
     */
    external_file_id?: string | null;

    /**
     * Filter by specific file IDs
     */
    file_ids?: Array<string> | null;

    /**
     * Filter by file name
     */
    file_name?: string | null;

    /**
     * Filter only manually uploaded files (data_source_id is null)
     */
    only_manually_uploaded?: boolean | null;

    /**
     * Filter by project ID
     */
    project_id?: string | null;
  }
}

export interface FileListParams extends PaginatedCursorParams {
  /**
   * Fields to expand on each file.
   */
  expand?: Array<string> | null;

  /**
   * Filter by external file ID.
   */
  external_file_id?: string | null;

  /**
   * Filter by specific file IDs.
   */
  file_ids?: Array<string> | null;

  /**
   * Filter by file name (exact match).
   */
  file_name?: string | null;

  /**
   * A comma-separated list of fields to order by, sorted in ascending order. Use
   * 'field_name desc' to specify descending order.
   */
  order_by?: string | null;

  organization_id?: string | null;

  project_id?: string | null;
}

export interface FileRetrieveParams {
  /**
   * Fields to expand.
   */
  expand?: Array<string> | null;

  organization_id?: string | null;

  project_id?: string | null;
}

export interface FileDeleteParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface FileContentParams {
  expires_at_seconds?: number | null;

  organization_id?: string | null;

  project_id?: string | null;
}

export declare namespace Files {
  export {
    type File as File,
    type PresignedURL as PresignedURL,
    type FileCreateResponse as FileCreateResponse,
    type FileRetrieveResponse as FileRetrieveResponse,
    type FileListResponse as FileListResponse,
    type FileQueryResponse as FileQueryResponse,
    type FileListResponsesPaginatedCursor as FileListResponsesPaginatedCursor,
    type FileCreateParams as FileCreateParams,
    type FileQueryParams as FileQueryParams,
    type FileListParams as FileListParams,
    type FileRetrieveParams as FileRetrieveParams,
    type FileDeleteParams as FileDeleteParams,
    type FileContentParams as FileContentParams,
  };
}
