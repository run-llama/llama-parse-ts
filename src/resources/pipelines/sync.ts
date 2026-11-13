// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as PipelinesAPI from './pipelines';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Sync extends APIResource {
  /**
   * Trigger an incremental sync for a managed pipeline.
   *
   * Processes new and updated documents from data sources and files, then updates
   * the index for retrieval.
   *
   * @deprecated
   */
  create(
    pipelineID: string,
    params: SyncCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PipelinesAPI.Pipeline> {
    const { project_id } = params ?? {};
    return this._client.post(path`/api/v1/pipelines/${pipelineID}/sync`, {
      query: { project_id },
      ...options,
    });
  }

  /**
   * Cancel all running sync jobs for a pipeline.
   *
   * @deprecated
   */
  cancel(
    pipelineID: string,
    params: SyncCancelParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PipelinesAPI.Pipeline> {
    const { project_id } = params ?? {};
    return this._client.post(path`/api/v1/pipelines/${pipelineID}/sync/cancel`, {
      query: { project_id },
      ...options,
    });
  }
}

export interface SyncCreateParams {
  project_id?: string | null;
}

export interface SyncCancelParams {
  project_id?: string | null;
}

export declare namespace Sync {
  export { type SyncCreateParams as SyncCreateParams, type SyncCancelParams as SyncCancelParams };
}
