// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class DataSinks extends APIResource {
  /**
   * List data sinks for a given project.
   */
  list(
    query: DataSinkListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DataSinkListResponse> {
    return this._client.get('/api/v1/data-sinks', { query, ...options });
  }

  /**
   * Create a new data sink.
   */
  create(params: DataSinkCreateParams, options?: RequestOptions): APIPromise<DataSink> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post('/api/v1/data-sinks', {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * Get a data sink by ID.
   */
  get(dataSinkID: string, options?: RequestOptions): APIPromise<DataSink> {
    return this._client.get(path`/api/v1/data-sinks/${dataSinkID}`, options);
  }

  /**
   * Update a data sink by ID.
   */
  update(dataSinkID: string, body: DataSinkUpdateParams, options?: RequestOptions): APIPromise<DataSink> {
    return this._client.put(path`/api/v1/data-sinks/${dataSinkID}`, { body, ...options });
  }

  /**
   * Delete a data sink by ID.
   */
  delete(dataSinkID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/v1/data-sinks/${dataSinkID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Schema for a data sink.
 */
export interface DataSink {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Component that implements the data sink
   */
  component:
    | { [key: string]: unknown }
    | Shared.CloudPineconeVectorStore
    | Shared.CloudPostgresVectorStore
    | Shared.CloudQdrantVectorStore
    | Shared.CloudAzureAISearchVectorStore
    | Shared.CloudMongoDBAtlasVectorSearch
    | Shared.CloudMilvusVectorStore
    | Shared.CloudAstraDBVectorStore;

  /**
   * The name of the data sink.
   */
  name: string;

  project_id: string;

  sink_type: 'ASTRA_DB' | 'AZUREAI_SEARCH' | 'MILVUS' | 'MONGODB_ATLAS' | 'PINECONE' | 'POSTGRES' | 'QDRANT';

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

export type DataSinkListResponse = Array<DataSink>;

export interface DataSinkListParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface DataSinkCreateParams {
  /**
   * Body param: Component that implements the data sink
   */
  component:
    | { [key: string]: unknown }
    | Shared.CloudPineconeVectorStore
    | Shared.CloudPostgresVectorStore
    | Shared.CloudQdrantVectorStore
    | Shared.CloudAzureAISearchVectorStore
    | Shared.CloudMongoDBAtlasVectorSearch
    | Shared.CloudMilvusVectorStore
    | Shared.CloudAstraDBVectorStore;

  /**
   * Body param: The name of the data sink.
   */
  name: string;

  /**
   * Body param
   */
  sink_type: 'ASTRA_DB' | 'AZUREAI_SEARCH' | 'MILVUS' | 'MONGODB_ATLAS' | 'PINECONE' | 'POSTGRES' | 'QDRANT';

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;
}

export interface DataSinkUpdateParams {
  sink_type: 'ASTRA_DB' | 'AZUREAI_SEARCH' | 'MILVUS' | 'MONGODB_ATLAS' | 'PINECONE' | 'POSTGRES' | 'QDRANT';

  /**
   * Component that implements the data sink
   */
  component?:
    | { [key: string]: unknown }
    | Shared.CloudPineconeVectorStore
    | Shared.CloudPostgresVectorStore
    | Shared.CloudQdrantVectorStore
    | Shared.CloudAzureAISearchVectorStore
    | Shared.CloudMongoDBAtlasVectorSearch
    | Shared.CloudMilvusVectorStore
    | Shared.CloudAstraDBVectorStore
    | null;

  /**
   * The name of the data sink.
   */
  name?: string | null;
}

export declare namespace DataSinks {
  export {
    type DataSink as DataSink,
    type DataSinkListResponse as DataSinkListResponse,
    type DataSinkListParams as DataSinkListParams,
    type DataSinkCreateParams as DataSinkCreateParams,
    type DataSinkUpdateParams as DataSinkUpdateParams,
  };
}
