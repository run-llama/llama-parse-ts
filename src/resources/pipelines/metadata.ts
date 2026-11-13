// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

export class Metadata extends APIResource {
  /**
   * Import metadata for a pipeline.
   *
   * @deprecated
   */
  create(
    pipelineID: string,
    params: MetadataCreateParams,
    options?: RequestOptions,
  ): APIPromise<MetadataCreateResponse> {
    const { project_id, ...body } = params;
    return this._client.put(
      path`/api/v1/pipelines/${pipelineID}/metadata`,
      multipartFormRequestOptions({ query: { project_id }, body, ...options }, this._client),
    );
  }

  /**
   * Delete metadata for all files in a pipeline.
   *
   * @deprecated
   */
  deleteAll(
    pipelineID: string,
    params: MetadataDeleteAllParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { project_id } = params ?? {};
    return this._client.delete(path`/api/v1/pipelines/${pipelineID}/metadata`, {
      query: { project_id },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type MetadataCreateResponse = { [key: string]: string };

export interface MetadataCreateParams {
  /**
   * Body param
   */
  upload_file: Uploadable;

  /**
   * Query param
   */
  project_id?: string | null;
}

export interface MetadataDeleteAllParams {
  project_id?: string | null;
}

export declare namespace Metadata {
  export {
    type MetadataCreateResponse as MetadataCreateResponse,
    type MetadataCreateParams as MetadataCreateParams,
    type MetadataDeleteAllParams as MetadataDeleteAllParams,
  };
}
