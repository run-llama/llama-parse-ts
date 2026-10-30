// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DataSourcesAPI from '../data-sources';
import * as Shared from '../shared';
import * as PipelinesAPI from './pipelines';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class DataSources extends APIResource {
  /**
   * Get data sources for a pipeline.
   *
   * @deprecated
   */
  getDataSources(
    pipelineID: string,
    query: DataSourceGetDataSourcesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DataSourceGetDataSourcesResponse> {
    return this._client.get(path`/api/v1/pipelines/${pipelineID}/data-sources`, { query, ...options });
  }

  /**
   * Add data sources to a pipeline.
   *
   * @deprecated
   */
  updateDataSources(
    pipelineID: string,
    params: DataSourceUpdateDataSourcesParams,
    options?: RequestOptions,
  ): APIPromise<DataSourceUpdateDataSourcesResponse> {
    const { body, project_id } = params;
    return this._client.put(path`/api/v1/pipelines/${pipelineID}/data-sources`, {
      query: { project_id },
      body: body,
      ...options,
    });
  }

  /**
   * Update the configuration of a data source in a pipeline.
   *
   * @deprecated
   */
  update(
    dataSourceID: string,
    params: DataSourceUpdateParams,
    options?: RequestOptions,
  ): APIPromise<PipelineDataSource> {
    const { pipeline_id, project_id, ...body } = params;
    return this._client.put(path`/api/v1/pipelines/${pipeline_id}/data-sources/${dataSourceID}`, {
      query: { project_id },
      body,
      ...options,
    });
  }

  /**
   * Get the status of a data source for a pipeline.
   *
   * @deprecated
   */
  getStatus(
    dataSourceID: string,
    params: DataSourceGetStatusParams,
    options?: RequestOptions,
  ): APIPromise<PipelinesAPI.ManagedIngestionStatusResponse> {
    const { pipeline_id, ...query } = params;
    return this._client.get(path`/api/v1/pipelines/${pipeline_id}/data-sources/${dataSourceID}/status`, {
      query,
      ...options,
    });
  }

  /**
   * Run incremental ingestion: pull upstream changes from the data source into the
   * data sink.
   *
   * @deprecated
   */
  sync(
    dataSourceID: string,
    params: DataSourceSyncParams,
    options?: RequestOptions,
  ): APIPromise<PipelinesAPI.Pipeline> {
    const { pipeline_id, project_id, ...body } = params;
    return this._client.post(path`/api/v1/pipelines/${pipeline_id}/data-sources/${dataSourceID}/sync`, {
      query: { project_id },
      body,
      ...options,
    });
  }
}

/**
 * Schema for a data source in a pipeline.
 */
export interface PipelineDataSource {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Component that implements the data source
   */
  component:
    | { [key: string]: unknown }
    | Shared.CloudS3DataSource
    | Shared.CloudAzStorageBlobDataSource
    | Shared.CloudGoogleDriveDataSource
    | Shared.CloudOneDriveDataSource
    | Shared.CloudSharepointDataSource
    | Shared.CloudSlackDataSource
    | Shared.CloudNotionPageDataSource
    | Shared.CloudConfluenceDataSource
    | Shared.CloudJiraDataSource
    | Shared.CloudJiraDataSourceV2
    | Shared.CloudBoxDataSource;

  /**
   * The ID of the data source.
   */
  data_source_id: string;

  /**
   * The last time the data source was automatically synced.
   */
  last_synced_at: string;

  /**
   * The name of the data source.
   */
  name: string;

  /**
   * The ID of the pipeline.
   */
  pipeline_id: string;

  project_id: string;

  source_type:
    | 'AZURE_STORAGE_BLOB'
    | 'BOX'
    | 'CONFLUENCE'
    | 'GOOGLE_DRIVE'
    | 'JIRA'
    | 'JIRA_V2'
    | 'MICROSOFT_ONEDRIVE'
    | 'MICROSOFT_SHAREPOINT'
    | 'NOTION_PAGE'
    | 'S3'
    | 'SLACK';

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Custom metadata that will be present on all data loaded from the data source
   */
  custom_metadata?: {
    [key: string]: { [key: string]: unknown } | Array<unknown> | string | number | boolean | null;
  } | null;

  /**
   * The status of the data source in the pipeline.
   */
  status?: 'CANCELLED' | 'ERROR' | 'IN_PROGRESS' | 'NOT_STARTED' | 'SUCCESS' | null;

  /**
   * The last time the status was updated.
   */
  status_updated_at?: string | null;

  /**
   * The interval at which the data source should be synced.
   */
  sync_interval?: number | null;

  /**
   * The id of the user who set the sync schedule.
   */
  sync_schedule_set_by?: string | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;

  /**
   * Version metadata for the data source
   */
  version_metadata?: DataSourcesAPI.DataSourceReaderVersionMetadata | null;
}

export type DataSourceGetDataSourcesResponse = Array<PipelineDataSource>;

export type DataSourceUpdateDataSourcesResponse = Array<PipelineDataSource>;

export interface DataSourceGetDataSourcesParams {
  project_id?: string | null;
}

export interface DataSourceUpdateDataSourcesParams {
  /**
   * Body param
   */
  body: Array<DataSourceUpdateDataSourcesParams.Body>;

  /**
   * Query param
   */
  project_id?: string | null;
}

export namespace DataSourceUpdateDataSourcesParams {
  /**
   * Schema for creating an association between a data source and a pipeline.
   */
  export interface Body {
    /**
     * The ID of the data source.
     */
    data_source_id: string;

    /**
     * The interval at which the data source should be synced. Valid values are: 21600,
     * 43200, 86400
     */
    sync_interval?: number | null;
  }
}

export interface DataSourceUpdateParams {
  /**
   * Path param
   */
  pipeline_id: string;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: The interval at which the data source should be synced.
   */
  sync_interval?: number | null;
}

export interface DataSourceGetStatusParams {
  /**
   * Path param
   */
  pipeline_id: string;

  /**
   * Query param
   */
  project_id?: string | null;
}

export interface DataSourceSyncParams {
  /**
   * Path param
   */
  pipeline_id: string;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param
   */
  pipeline_file_ids?: Array<string> | null;
}

export declare namespace DataSources {
  export {
    type PipelineDataSource as PipelineDataSource,
    type DataSourceGetDataSourcesResponse as DataSourceGetDataSourcesResponse,
    type DataSourceUpdateDataSourcesResponse as DataSourceUpdateDataSourcesResponse,
    type DataSourceGetDataSourcesParams as DataSourceGetDataSourcesParams,
    type DataSourceUpdateDataSourcesParams as DataSourceUpdateDataSourcesParams,
    type DataSourceUpdateParams as DataSourceUpdateParams,
    type DataSourceGetStatusParams as DataSourceGetStatusParams,
    type DataSourceSyncParams as DataSourceSyncParams,
  };
}
