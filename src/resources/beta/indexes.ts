// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, PaginatedCursor, type PaginatedCursorParams } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Indexes extends APIResource {
  /**
   * Get an index by ID.
   *
   * @example
   * ```ts
   * const index = await client.beta.indexes.get('index_id');
   * ```
   */
  get(
    indexID: string,
    query: IndexGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<IndexGetResponse> {
    return this._client.get(path`/api/v1/indexes/${indexID}`, { query, ...options });
  }

  /**
   * Delete an index.
   *
   * @example
   * ```ts
   * await client.beta.indexes.delete('index_id');
   * ```
   */
  delete(
    indexID: string,
    params: IndexDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { organization_id, project_id } = params ?? {};
    return this._client.delete(path`/api/v1/indexes/${indexID}`, {
      query: { organization_id, project_id },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Create a searchable index over a source directory.
   *
   * @example
   * ```ts
   * const index = await client.beta.indexes.create({
   *   source_directory_id: 'dir-abc123',
   * });
   * ```
   */
  create(params: IndexCreateParams, options?: RequestOptions): APIPromise<IndexCreateResponse> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post('/api/v1/indexes', { query: { organization_id, project_id }, body, ...options });
  }

  /**
   * Trigger a sync and export for an existing index, re-parsing changed files and
   * exporting updated chunks.
   *
   * @example
   * ```ts
   * const response = await client.beta.indexes.sync('index_id');
   * ```
   */
  sync(
    indexID: string,
    params: IndexSyncParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { organization_id, project_id } = params ?? {};
    return this._client.post(path`/api/v1/indexes/${indexID}/sync`, {
      query: { organization_id, project_id },
      ...options,
    });
  }

  /**
   * List indexes for the current project.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const indexListResponse of client.beta.indexes.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: IndexListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<IndexListResponsesPaginatedCursor, IndexListResponse> {
    return this._client.getAPIList('/api/v1/indexes', PaginatedCursor<IndexListResponse>, {
      query,
      ...options,
    });
  }
}

export type IndexListResponsesPaginatedCursor = PaginatedCursor<IndexListResponse>;

/**
 * A searchable index over a directory of documents.
 */
export interface IndexCreateResponse {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * ID of the export configuration.
   */
  export_config_id: string;

  /**
   * Index name.
   */
  name: string;

  /**
   * ID of the output directory holding the indexed files.
   */
  output_directory_id: string;

  /**
   * Project this index belongs to.
   */
  project_id: string;

  /**
   * ID of the source directory.
   */
  source_directory_id: string;

  /**
   * ID of the sync configuration.
   */
  sync_config_id: string;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Index description.
   */
  description?: string | null;

  /**
   * Last export time.
   */
  last_exported_at?: string | null;

  /**
   * Last sync time.
   */
  last_synced_at?: string | null;

  /**
   * Build state and diagnostic info.
   */
  metadata?: { [key: string]: unknown };

  /**
   * Whether the index is syncing its source or exporting the result. Requires
   * `expand=sync_in_progress`.
   */
  sync_in_progress?: boolean | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

/**
 * A searchable index over a directory of documents.
 */
export interface IndexListResponse {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * ID of the export configuration.
   */
  export_config_id: string;

  /**
   * Index name.
   */
  name: string;

  /**
   * ID of the output directory holding the indexed files.
   */
  output_directory_id: string;

  /**
   * Project this index belongs to.
   */
  project_id: string;

  /**
   * ID of the source directory.
   */
  source_directory_id: string;

  /**
   * ID of the sync configuration.
   */
  sync_config_id: string;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Index description.
   */
  description?: string | null;

  /**
   * Last export time.
   */
  last_exported_at?: string | null;

  /**
   * Last sync time.
   */
  last_synced_at?: string | null;

  /**
   * Build state and diagnostic info.
   */
  metadata?: { [key: string]: unknown };

  /**
   * Whether the index is syncing its source or exporting the result. Requires
   * `expand=sync_in_progress`.
   */
  sync_in_progress?: boolean | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

/**
 * A searchable index over a directory of documents.
 */
export interface IndexGetResponse {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * ID of the export configuration.
   */
  export_config_id: string;

  /**
   * Index name.
   */
  name: string;

  /**
   * ID of the output directory holding the indexed files.
   */
  output_directory_id: string;

  /**
   * Project this index belongs to.
   */
  project_id: string;

  /**
   * ID of the source directory.
   */
  source_directory_id: string;

  /**
   * ID of the sync configuration.
   */
  sync_config_id: string;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Index description.
   */
  description?: string | null;

  /**
   * Last export time.
   */
  last_exported_at?: string | null;

  /**
   * Last sync time.
   */
  last_synced_at?: string | null;

  /**
   * Build state and diagnostic info.
   */
  metadata?: { [key: string]: unknown };

  /**
   * Whether the index is syncing its source or exporting the result. Requires
   * `expand=sync_in_progress`.
   */
  sync_in_progress?: boolean | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

export type IndexSyncResponse = unknown;

export interface IndexGetParams {
  /**
   * Fields to expand. Supported value: sync_in_progress.
   */
  expand?: Array<'sync_in_progress'>;

  organization_id?: string | null;

  project_id?: string | null;
}

export interface IndexDeleteParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface IndexCreateParams {
  /**
   * Body param: ID of the source directory containing your documents.
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
   * Body param: Optional description of the index.
   */
  description?: string | null;

  /**
   * Body param: Optional display name for the index. If omitted, the index is named
   * after the source directory.
   */
  name?: string | null;

  /**
   * Body param: Product configurations for syncing. Omit to use a default parse
   * configuration. Include an explicit entry per product type (e.g. parse, extract)
   * to override the default.
   */
  products?: Array<IndexCreateParams.Product> | null;

  /**
   * Body param: Attachment kinds to store alongside parsed output. Each entry must
   * be one of: screenshots, items. For example, ['screenshots'] renders and stores
   * per-page screenshots; ['items'] stores structured items with bounding boxes.
   * Omit or pass an empty list to skip attachments.
   */
  store_attachments?: Array<string> | null;

  /**
   * Body param: How often to re-run the sync. One of: manual, daily,
   * on_source_change. Defaults to manual.
   */
  sync_frequency?: string;

  /**
   * Body param: Vector export destination for the index. 'DEFAULT' exports to the
   * managed vector DB destination resolved from configuration. 'DISABLED' skips
   * vector export — the export destination falls back to 'Download'.
   */
  vector_target?: 'DEFAULT' | 'DISABLED';
}

export namespace IndexCreateParams {
  /**
   * A product configuration to include in an index's sync.
   *
   * Structurally mirrors `directory_sync.SyncProductEntryRequest` but is a distinct
   * class so the Index API surface stays SDK-gen-isolated from directory-sync
   * internals. Translation between the two happens in `index/api_utils.py`.
   */
  export interface Product {
    /**
     * ID of the product configuration.
     */
    product_config_id: string;

    /**
     * Product type. One of: parse, extract.
     */
    product_type: string;
  }
}

export interface IndexSyncParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface IndexListParams extends PaginatedCursorParams {
  organization_id?: string | null;

  project_id?: string | null;

  source_directory_id?: string | null;
}

export declare namespace Indexes {
  export {
    type IndexCreateResponse as IndexCreateResponse,
    type IndexListResponse as IndexListResponse,
    type IndexGetResponse as IndexGetResponse,
    type IndexSyncResponse as IndexSyncResponse,
    type IndexListResponsesPaginatedCursor as IndexListResponsesPaginatedCursor,
    type IndexGetParams as IndexGetParams,
    type IndexDeleteParams as IndexDeleteParams,
    type IndexCreateParams as IndexCreateParams,
    type IndexSyncParams as IndexSyncParams,
    type IndexListParams as IndexListParams,
  };
}
