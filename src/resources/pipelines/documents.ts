// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as PipelinesAPI from './pipelines';
import { APIPromise } from '../../core/api-promise';
import {
  PagePromise,
  PaginatedCloudDocuments,
  type PaginatedCloudDocumentsParams,
} from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Documents extends APIResource {
  /**
   * Batch create documents for a pipeline.
   *
   * @deprecated
   */
  create(
    pipelineID: string,
    params: DocumentCreateParams,
    options?: RequestOptions,
  ): APIPromise<DocumentCreateResponse> {
    const { body, project_id } = params;
    return this._client.post(path`/api/v1/pipelines/${pipelineID}/documents`, {
      query: { project_id },
      body: body,
      ...options,
    });
  }

  /**
   * Return a list of documents for a pipeline.
   *
   * @deprecated
   */
  list(
    pipelineID: string,
    query: DocumentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CloudDocumentsPaginatedCloudDocuments, CloudDocument> {
    return this._client.getAPIList(
      path`/api/v1/pipelines/${pipelineID}/documents/paginated`,
      PaginatedCloudDocuments<CloudDocument>,
      { query, ...options },
    );
  }

  /**
   * Count the documents in a pipeline, grouped by ingestion status.
   *
   * Counts reflect each document's last recorded status rather than a freshly
   * computed one, so a document that changed status in the last few moments may
   * still be counted under its previous one. Use
   * `GET /pipelines/{pipeline_id}/documents/{document_id}/status` when a single
   * document's status has to be up to the moment.
   *
   * @deprecated
   */
  getStatusCounts(
    pipelineID: string,
    query: DocumentGetStatusCountsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DocumentGetStatusCountsResponse> {
    return this._client.get(path`/api/v1/pipelines/${pipelineID}/documents/status-counts`, {
      query,
      ...options,
    });
  }

  /**
   * Return a single document for a pipeline.
   *
   * @deprecated
   */
  get(documentID: string, params: DocumentGetParams, options?: RequestOptions): APIPromise<CloudDocument> {
    const { pipeline_id, ...query } = params;
    return this._client.get(path`/api/v1/pipelines/${pipeline_id}/documents/${documentID}`, {
      query,
      ...options,
    });
  }

  /**
   * Delete a document from a pipeline; runs async (vectors first, then MongoDB
   * record).
   *
   * @deprecated
   */
  delete(documentID: string, params: DocumentDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { pipeline_id, project_id } = params;
    return this._client.delete(path`/api/v1/pipelines/${pipeline_id}/documents/${documentID}`, {
      query: { project_id },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Return a single document for a pipeline.
   *
   * @deprecated
   */
  getStatus(
    documentID: string,
    params: DocumentGetStatusParams,
    options?: RequestOptions,
  ): APIPromise<PipelinesAPI.ManagedIngestionStatusResponse> {
    const { pipeline_id, ...query } = params;
    return this._client.get(path`/api/v1/pipelines/${pipeline_id}/documents/${documentID}/status`, {
      query,
      ...options,
    });
  }

  /**
   * Sync a specific document for a pipeline.
   *
   * @deprecated
   */
  sync(documentID: string, params: DocumentSyncParams, options?: RequestOptions): APIPromise<unknown> {
    const { pipeline_id, project_id } = params;
    return this._client.post(path`/api/v1/pipelines/${pipeline_id}/documents/${documentID}/sync`, {
      query: { project_id },
      ...options,
    });
  }

  /**
   * Return a list of chunks for a pipeline document.
   *
   * @deprecated
   */
  getChunks(
    documentID: string,
    params: DocumentGetChunksParams,
    options?: RequestOptions,
  ): APIPromise<DocumentGetChunksResponse> {
    const { pipeline_id, ...query } = params;
    return this._client.get(path`/api/v1/pipelines/${pipeline_id}/documents/${documentID}/chunks`, {
      query,
      ...options,
    });
  }

  /**
   * Batch create or update a document for a pipeline.
   *
   * @deprecated
   */
  upsert(
    pipelineID: string,
    params: DocumentUpsertParams,
    options?: RequestOptions,
  ): APIPromise<DocumentUpsertResponse> {
    const { body, project_id } = params;
    return this._client.put(path`/api/v1/pipelines/${pipelineID}/documents`, {
      query: { project_id },
      body: body,
      ...options,
    });
  }
}

export type CloudDocumentsPaginatedCloudDocuments = PaginatedCloudDocuments<CloudDocument>;

/**
 * Cloud document stored in S3.
 */
export interface CloudDocument {
  id: string;

  metadata: { [key: string]: unknown };

  text: string;

  excluded_embed_metadata_keys?: Array<string>;

  excluded_llm_metadata_keys?: Array<string>;

  /**
   * indices in the CloudDocument.text where a new page begins. e.g. Second page
   * starts at index specified by page_positions[1].
   */
  page_positions?: Array<number> | null;

  status_metadata?: { [key: string]: unknown } | null;
}

/**
 * Create a new cloud document.
 */
export interface CloudDocumentCreate {
  metadata: { [key: string]: unknown };

  text: string;

  id?: string | null;

  excluded_embed_metadata_keys?: Array<string>;

  excluded_llm_metadata_keys?: Array<string>;

  /**
   * indices in the CloudDocument.text where a new page begins. e.g. Second page
   * starts at index specified by page_positions[1].
   */
  page_positions?: Array<number> | null;
}

/**
 * Provided for backward compatibility.
 */
export interface TextNode {
  class_name?: string;

  /**
   * Embedding of the node.
   */
  embedding?: Array<number> | null;

  /**
   * End char index of the node.
   */
  end_char_idx?: number | null;

  /**
   * Metadata keys that are excluded from text for the embed model.
   */
  excluded_embed_metadata_keys?: Array<string>;

  /**
   * Metadata keys that are excluded from text for the LLM.
   */
  excluded_llm_metadata_keys?: Array<string>;

  /**
   * A flat dictionary of metadata fields
   */
  extra_info?: { [key: string]: unknown };

  /**
   * Unique ID of the node.
   */
  id_?: string;

  /**
   * Separator between metadata fields when converting to string.
   */
  metadata_seperator?: string;

  /**
   * Template for how metadata is formatted, with {key} and {value} placeholders.
   */
  metadata_template?: string;

  /**
   * MIME type of the node content.
   */
  mimetype?: string;

  /**
   * A mapping of relationships to other node information.
   */
  relationships?: { [key: string]: TextNode.RelatedNodeInfo | Array<TextNode.UnionMember1> };

  /**
   * Start char index of the node.
   */
  start_char_idx?: number | null;

  /**
   * Text content of the node.
   */
  text?: string;

  /**
   * Template for how text is formatted, with {content} and {metadata_str}
   * placeholders.
   */
  text_template?: string;
}

export namespace TextNode {
  export interface RelatedNodeInfo {
    node_id: string;

    class_name?: string;

    hash?: string | null;

    metadata?: { [key: string]: unknown };

    node_type?: '1' | '2' | '3' | '4' | '5' | (string & {}) | null;
  }

  export interface UnionMember1 {
    node_id: string;

    class_name?: string;

    hash?: string | null;

    metadata?: { [key: string]: unknown };

    node_type?: '1' | '2' | '3' | '4' | '5' | (string & {}) | null;
  }
}

export type DocumentCreateResponse = Array<CloudDocument>;

export type DocumentGetChunksResponse = Array<TextNode>;

/**
 * Counts of the documents in a pipeline, grouped by ingestion status.
 */
export interface DocumentGetStatusCountsResponse {
  /**
   * Number of documents per ingestion status; every status is present.
   */
  counts: { [key: string]: number };

  /**
   * ID of the pipeline the documents belong to.
   */
  pipeline_id: string;

  /**
   * Total number of documents counted.
   */
  total_count: number;

  /**
   * Data source the counts were restricted to.
   */
  data_source_id?: string | null;

  /**
   * File the counts were restricted to.
   */
  file_id?: string | null;

  /**
   * Whether only directly uploaded documents were counted.
   */
  only_direct_upload?: boolean;
}

export type DocumentSyncResponse = unknown;

export type DocumentUpsertResponse = Array<CloudDocument>;

export interface DocumentCreateParams {
  /**
   * Body param
   */
  body: Array<CloudDocumentCreate>;

  /**
   * Query param
   */
  project_id?: string | null;
}

export interface DocumentListParams extends PaginatedCloudDocumentsParams {
  file_id?: string | null;

  only_api_data_source_documents?: boolean | null;

  only_direct_upload?: boolean | null;

  project_id?: string | null;

  status_refresh_policy?: 'cached' | 'ttl';
}

export interface DocumentGetStatusCountsParams {
  data_source_id?: string | null;

  file_id?: string | null;

  only_direct_upload?: boolean;

  project_id?: string | null;
}

export interface DocumentGetParams {
  /**
   * Path param
   */
  pipeline_id: string;

  /**
   * Query param
   */
  project_id?: string | null;
}

export interface DocumentDeleteParams {
  /**
   * Path param
   */
  pipeline_id: string;

  /**
   * Query param
   */
  project_id?: string | null;
}

export interface DocumentGetStatusParams {
  /**
   * Path param
   */
  pipeline_id: string;

  /**
   * Query param
   */
  project_id?: string | null;
}

export interface DocumentSyncParams {
  /**
   * Path param
   */
  pipeline_id: string;

  /**
   * Query param
   */
  project_id?: string | null;
}

export interface DocumentGetChunksParams {
  /**
   * Path param
   */
  pipeline_id: string;

  /**
   * Query param
   */
  project_id?: string | null;
}

export interface DocumentUpsertParams {
  /**
   * Body param
   */
  body: Array<CloudDocumentCreate>;

  /**
   * Query param
   */
  project_id?: string | null;
}

export declare namespace Documents {
  export {
    type CloudDocument as CloudDocument,
    type CloudDocumentCreate as CloudDocumentCreate,
    type TextNode as TextNode,
    type DocumentCreateResponse as DocumentCreateResponse,
    type DocumentGetChunksResponse as DocumentGetChunksResponse,
    type DocumentGetStatusCountsResponse as DocumentGetStatusCountsResponse,
    type DocumentSyncResponse as DocumentSyncResponse,
    type DocumentUpsertResponse as DocumentUpsertResponse,
    type CloudDocumentsPaginatedCloudDocuments as CloudDocumentsPaginatedCloudDocuments,
    type DocumentCreateParams as DocumentCreateParams,
    type DocumentListParams as DocumentListParams,
    type DocumentGetStatusCountsParams as DocumentGetStatusCountsParams,
    type DocumentGetParams as DocumentGetParams,
    type DocumentDeleteParams as DocumentDeleteParams,
    type DocumentGetStatusParams as DocumentGetStatusParams,
    type DocumentSyncParams as DocumentSyncParams,
    type DocumentGetChunksParams as DocumentGetChunksParams,
    type DocumentUpsertParams as DocumentUpsertParams,
  };
}
