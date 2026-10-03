// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FilesAPI from '../files';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, PaginatedCursor, type PaginatedCursorParams } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Attachments extends APIResource {
  /**
   * List the attachments associated with a file (e.g. per-page screenshots).
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const attachmentListResponse of client.beta.attachments.list(
   *   { source_id: 'source_id' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    query: AttachmentListParams,
    options?: RequestOptions,
  ): PagePromise<AttachmentListResponsesPaginatedCursor, AttachmentListResponse> {
    return this._client.getAPIList('/api/v1/beta/attachments', PaginatedCursor<AttachmentListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Return a presigned download URL for a specific attachment.
   *
   * @example
   * ```ts
   * const presignedURL = await client.beta.attachments.get(
   *   'attachment_name',
   *   { source_id: 'source_id' },
   * );
   * ```
   */
  get(
    attachmentName: string,
    query: AttachmentGetParams,
    options?: RequestOptions,
  ): APIPromise<FilesAPI.PresignedURL> {
    return this._client.get(path`/api/v1/beta/attachments/${attachmentName}`, { query, ...options });
  }
}

export type AttachmentListResponsesPaginatedCursor = PaginatedCursor<AttachmentListResponse>;

/**
 * Metadata for a single file attachment.
 */
export interface AttachmentListResponse {
  /**
   * Name of the attachment
   */
  name: string;

  /**
   * Size of the attachment in bytes
   */
  size: number;

  /**
   * When the attachment was last modified
   */
  last_modified?: string | null;
}

export interface AttachmentListParams extends PaginatedCursorParams {
  /**
   * File UUID or directory file ID (dfl-...).
   */
  source_id: string;

  organization_id?: string | null;

  project_id?: string | null;
}

export interface AttachmentGetParams {
  /**
   * File UUID or directory file ID (dfl-...).
   */
  source_id: string;

  organization_id?: string | null;

  project_id?: string | null;
}

export declare namespace Attachments {
  export {
    type AttachmentListResponse as AttachmentListResponse,
    type AttachmentListResponsesPaginatedCursor as AttachmentListResponsesPaginatedCursor,
    type AttachmentListParams as AttachmentListParams,
    type AttachmentGetParams as AttachmentGetParams,
  };
}
