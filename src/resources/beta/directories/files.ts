// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FilesAPI from '../../files';
import { APIPromise } from '../../../core/api-promise';
import { PagePromise, PaginatedCursor, type PaginatedCursorParams } from '../../../core/pagination';
import { type Uploadable } from '../../../core/uploads';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { multipartFormRequestOptions } from '../../../internal/uploads';
import { path } from '../../../internal/utils/path';

export class Files extends APIResource {
  /**
   * Create a new file within the specified directory; the directory must exist in
   * the project and `file_id` must reference an existing file.
   *
   * @example
   * ```ts
   * const response = await client.beta.directories.files.add(
   *   'directory_id',
   *   { file_id: 'file_id' },
   * );
   * ```
   */
  add(directoryID: string, params: FileAddParams, options?: RequestOptions): APIPromise<FileAddResponse> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post(path`/api/v1/beta/directories/${directoryID}/files`, {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * List all files within the specified directory with optional filtering and
   * pagination.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const fileListResponse of client.beta.directories.files.list(
   *   'directory_id',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    directoryID: string,
    query: FileListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<FileListResponsesPaginatedCursor, FileListResponse> {
    return this._client.getAPIList(
      path`/api/v1/beta/directories/${directoryID}/files`,
      PaginatedCursor<FileListResponse>,
      { query, ...options },
    );
  }

  /**
   * Get a directory file by `directory_file_id`; to look up by `unique_id`, use the
   * list endpoint with a filter.
   *
   * @example
   * ```ts
   * const file = await client.beta.directories.files.get(
   *   'directory_file_id',
   *   { directory_id: 'directory_id' },
   * );
   * ```
   */
  get(directoryFileID: string, params: FileGetParams, options?: RequestOptions): APIPromise<FileGetResponse> {
    const { directory_id, ...query } = params;
    return this._client.get(path`/api/v1/beta/directories/${directory_id}/files/${directoryFileID}`, {
      query,
      ...options,
    });
  }

  /**
   * Update directory-file metadata by `directory_file_id`; set `directory_id` to
   * move the file to a different directory. To resolve from `unique_id`, list with a
   * filter first.
   *
   * @example
   * ```ts
   * const file = await client.beta.directories.files.update(
   *   'directory_file_id',
   *   { directory_id: 'directory_id' },
   * );
   * ```
   */
  update(
    directoryFileID: string,
    params: FileUpdateParams,
    options?: RequestOptions,
  ): APIPromise<FileUpdateResponse> {
    const { directory_id, organization_id, project_id, ...body } = params;
    return this._client.patch(path`/api/v1/beta/directories/${directory_id}/files/${directoryFileID}`, {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * Delete a directory file by `directory_file_id`; to resolve from `unique_id`,
   * list with a filter first.
   *
   * The uploaded file is deleted with it unless another directory or index still
   * uses it.
   *
   * @example
   * ```ts
   * await client.beta.directories.files.delete(
   *   'directory_file_id',
   *   { directory_id: 'directory_id' },
   * );
   * ```
   */
  delete(directoryFileID: string, params: FileDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { directory_id, organization_id, project_id } = params;
    return this._client.delete(path`/api/v1/beta/directories/${directory_id}/files/${directoryFileID}`, {
      query: { organization_id, project_id },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Upload a file and create its directory entry in one call; `unique_id` /
   * `display_name` default to values derived from file metadata.
   *
   * @example
   * ```ts
   * const response = await client.beta.directories.files.upload(
   *   'directory_id',
   *   { upload_file: fs.createReadStream('path/to/file') },
   * );
   * ```
   */
  upload(
    directoryID: string,
    params: FileUploadParams,
    options?: RequestOptions,
  ): APIPromise<FileUploadResponse> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post(
      path`/api/v1/beta/directories/${directoryID}/files/upload`,
      multipartFormRequestOptions({ query: { organization_id, project_id }, body, ...options }, this._client),
    );
  }
}

export type FileListResponsesPaginatedCursor = PaginatedCursor<FileListResponse>;

/**
 * API response schema for a directory file.
 */
export interface FileUpdateResponse {
  /**
   * Unique identifier for the directory file.
   */
  id: string;

  /**
   * Directory the file belongs to.
   */
  directory_id: string;

  /**
   * Display name for the file.
   */
  display_name: string;

  /**
   * Project the directory file belongs to.
   */
  project_id: string;

  /**
   * Unique identifier for the file in the directory
   */
  unique_id: string;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Soft delete marker when the file is removed upstream or by user action.
   */
  deleted_at?: string | null;

  /**
   * Schema for a presigned URL.
   */
  download_url?: FilesAPI.PresignedURL | null;

  /**
   * File ID for the storage location.
   */
  file_id?: string | null;

  /**
   * Merged metadata from all sources. Higher-priority sources override lower.
   */
  metadata?: { [key: string]: string | number | number | boolean | null | Array<string> };

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

/**
 * API response schema for a directory file.
 */
export interface FileListResponse {
  /**
   * Unique identifier for the directory file.
   */
  id: string;

  /**
   * Directory the file belongs to.
   */
  directory_id: string;

  /**
   * Display name for the file.
   */
  display_name: string;

  /**
   * Project the directory file belongs to.
   */
  project_id: string;

  /**
   * Unique identifier for the file in the directory
   */
  unique_id: string;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Soft delete marker when the file is removed upstream or by user action.
   */
  deleted_at?: string | null;

  /**
   * Schema for a presigned URL.
   */
  download_url?: FilesAPI.PresignedURL | null;

  /**
   * File ID for the storage location.
   */
  file_id?: string | null;

  /**
   * Merged metadata from all sources. Higher-priority sources override lower.
   */
  metadata?: { [key: string]: string | number | number | boolean | null | Array<string> };

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

/**
 * API response schema for a directory file.
 */
export interface FileAddResponse {
  /**
   * Unique identifier for the directory file.
   */
  id: string;

  /**
   * Directory the file belongs to.
   */
  directory_id: string;

  /**
   * Display name for the file.
   */
  display_name: string;

  /**
   * Project the directory file belongs to.
   */
  project_id: string;

  /**
   * Unique identifier for the file in the directory
   */
  unique_id: string;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Soft delete marker when the file is removed upstream or by user action.
   */
  deleted_at?: string | null;

  /**
   * Schema for a presigned URL.
   */
  download_url?: FilesAPI.PresignedURL | null;

  /**
   * File ID for the storage location.
   */
  file_id?: string | null;

  /**
   * Merged metadata from all sources. Higher-priority sources override lower.
   */
  metadata?: { [key: string]: string | number | number | boolean | null | Array<string> };

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

/**
 * API response schema for a directory file.
 */
export interface FileGetResponse {
  /**
   * Unique identifier for the directory file.
   */
  id: string;

  /**
   * Directory the file belongs to.
   */
  directory_id: string;

  /**
   * Display name for the file.
   */
  display_name: string;

  /**
   * Project the directory file belongs to.
   */
  project_id: string;

  /**
   * Unique identifier for the file in the directory
   */
  unique_id: string;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Soft delete marker when the file is removed upstream or by user action.
   */
  deleted_at?: string | null;

  /**
   * Schema for a presigned URL.
   */
  download_url?: FilesAPI.PresignedURL | null;

  /**
   * File ID for the storage location.
   */
  file_id?: string | null;

  /**
   * Merged metadata from all sources. Higher-priority sources override lower.
   */
  metadata?: { [key: string]: string | number | number | boolean | null | Array<string> };

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

/**
 * API response schema for a directory file.
 */
export interface FileUploadResponse {
  /**
   * Unique identifier for the directory file.
   */
  id: string;

  /**
   * Directory the file belongs to.
   */
  directory_id: string;

  /**
   * Display name for the file.
   */
  display_name: string;

  /**
   * Project the directory file belongs to.
   */
  project_id: string;

  /**
   * Unique identifier for the file in the directory
   */
  unique_id: string;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Soft delete marker when the file is removed upstream or by user action.
   */
  deleted_at?: string | null;

  /**
   * Schema for a presigned URL.
   */
  download_url?: FilesAPI.PresignedURL | null;

  /**
   * File ID for the storage location.
   */
  file_id?: string | null;

  /**
   * Merged metadata from all sources. Higher-priority sources override lower.
   */
  metadata?: { [key: string]: string | number | number | boolean | null | Array<string> };

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

export interface FileAddParams {
  /**
   * Body param: File ID for the storage location (required).
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
   * Body param: Display name for the file. If not provided, will use the file's
   * name.
   */
  display_name?: string | null;

  /**
   * Body param: User-defined metadata key-value pairs to associate with the file.
   */
  metadata?: { [key: string]: string | number | number | boolean | null | Array<string> } | null;

  /**
   * Body param: Unique identifier for the file in the directory. If not provided,
   * will use the file's external_file_id or name.
   */
  unique_id?: string | null;
}

export interface FileListParams extends PaginatedCursorParams {
  display_name?: string | null;

  display_name_contains?: string | null;

  /**
   * Fields to expand on each directory file.
   */
  expand?: Array<string> | null;

  file_id?: string | null;

  include_deleted?: boolean;

  organization_id?: string | null;

  project_id?: string | null;

  unique_id?: string | null;

  /**
   * Include items updated at or after this timestamp (inclusive)
   */
  updated_at_on_or_after?: string | null;

  /**
   * Include items updated at or before this timestamp (inclusive)
   */
  updated_at_on_or_before?: string | null;
}

export interface FileGetParams {
  /**
   * Path param
   */
  directory_id: string;

  /**
   * Query param: Fields to expand.
   */
  expand?: Array<string> | null;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;
}

export interface FileUpdateParams {
  /**
   * Path param
   */
  directory_id: string;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Updated display name.
   */
  display_name?: string | null;

  /**
   * Body param: User-defined metadata key-value pairs. Replaces the user metadata
   * layer.
   */
  metadata?: { [key: string]: string | number | number | boolean | null | Array<string> } | null;

  /**
   * Body param: Move file to a different directory.
   */
  target_directory_id?: string | null;

  /**
   * Body param: Updated unique identifier.
   */
  unique_id?: string | null;
}

export interface FileDeleteParams {
  /**
   * Path param
   */
  directory_id: string;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;
}

export interface FileUploadParams {
  /**
   * Body param
   */
  upload_file: Uploadable;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param
   */
  display_name?: string | null;

  /**
   * Body param
   */
  external_file_id?: string | null;

  /**
   * Body param: User metadata as a JSON object string.
   */
  metadata?: string | null;

  /**
   * Body param
   */
  unique_id?: string | null;
}

export declare namespace Files {
  export {
    type FileUpdateResponse as FileUpdateResponse,
    type FileListResponse as FileListResponse,
    type FileAddResponse as FileAddResponse,
    type FileGetResponse as FileGetResponse,
    type FileUploadResponse as FileUploadResponse,
    type FileListResponsesPaginatedCursor as FileListResponsesPaginatedCursor,
    type FileAddParams as FileAddParams,
    type FileListParams as FileListParams,
    type FileGetParams as FileGetParams,
    type FileUpdateParams as FileUpdateParams,
    type FileDeleteParams as FileDeleteParams,
    type FileUploadParams as FileUploadParams,
  };
}
