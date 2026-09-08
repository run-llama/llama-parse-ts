// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class WebhookConfigs extends APIResource {
  /**
   * Create a reusable webhook configuration for the current project.
   *
   * @example
   * ```ts
   * const webhookConfigResponse =
   *   await client.webhookConfigs.create({
   *     webhook_url: 'https://example.com/webhooks/llamacloud',
   *   });
   * ```
   */
  create(params: WebhookConfigCreateParams, options?: RequestOptions): APIPromise<WebhookConfigResponse> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post('/api/v1/beta/webhook-configs', {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * List the webhook configurations for the current project, newest first.
   *
   * @example
   * ```ts
   * const webhookConfigResponses =
   *   await client.webhookConfigs.list();
   * ```
   */
  list(
    query: WebhookConfigListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebhookConfigListResponse> {
    return this._client.get('/api/v1/beta/webhook-configs', { query, ...options });
  }

  /**
   * Get a single webhook configuration by ID.
   *
   * @example
   * ```ts
   * const webhookConfigResponse =
   *   await client.webhookConfigs.retrieve('config_id');
   * ```
   */
  retrieve(
    configID: string,
    query: WebhookConfigRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebhookConfigResponse> {
    return this._client.get(path`/api/v1/beta/webhook-configs/${configID}`, { query, ...options });
  }

  /**
   * Update a webhook configuration. Only fields present in the request change.
   *
   * @example
   * ```ts
   * const webhookConfigResponse =
   *   await client.webhookConfigs.update('config_id');
   * ```
   */
  update(
    configID: string,
    params: WebhookConfigUpdateParams,
    options?: RequestOptions,
  ): APIPromise<WebhookConfigResponse> {
    const { organization_id, project_id, ...body } = params;
    return this._client.put(path`/api/v1/beta/webhook-configs/${configID}`, {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * Delete a webhook configuration.
   *
   * @example
   * ```ts
   * await client.webhookConfigs.delete('config_id');
   * ```
   */
  delete(
    configID: string,
    params: WebhookConfigDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { organization_id, project_id } = params ?? {};
    return this._client.delete(path`/api/v1/beta/webhook-configs/${configID}`, {
      query: { organization_id, project_id },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Request to create a stored webhook configuration.
 *
 * The owning tenant is taken from the request context (e.g. the project in the
 * path), not the body.
 */
export interface WebhookConfigCreate {
  /**
   * URL to receive webhook POST notifications.
   */
  webhook_url: string;

  /**
   * Events to subscribe to. If null, all events are delivered. An empty list
   * subscribes to nothing and is rejected.
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
   * Custom HTTP headers sent with each webhook request.
   */
  webhook_headers?: { [key: string]: string } | null;

  /**
   * Response format sent to the webhook: 'string' (default) or 'json'.
   */
  webhook_output_format?: 'json' | 'string' | null;

  /**
   * Shared secret used to sign deliveries to this endpoint. Write-only: it is never
   * returned in responses.
   */
  webhook_signing_secret?: string | null;
}

/**
 * A stored webhook configuration. The signing secret is never included.
 */
export interface WebhookConfigResponse {
  /**
   * Unique identifier for the webhook configuration.
   */
  id: string;

  /**
   * Whether a signing secret is configured for this endpoint.
   */
  has_secret: boolean;

  /**
   * Owner tenant ID.
   */
  tenant_id: string;

  /**
   * Owner tenant type.
   */
  tenant_type: 'project';

  /**
   * URL that receives webhook POST notifications.
   */
  webhook_url: string;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;

  /**
   * Subscribed events (null = all events).
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
   * Custom HTTP headers sent with each request.
   */
  webhook_headers?: { [key: string]: string } | null;

  /**
   * Response format sent to the webhook.
   */
  webhook_output_format?: 'json' | 'string' | null;
}

export type WebhookConfigListResponse = Array<WebhookConfigResponse>;

export interface WebhookConfigCreateParams {
  /**
   * Body param: URL to receive webhook POST notifications.
   */
  webhook_url: string;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Events to subscribe to. If null, all events are delivered. An empty
   * list subscribes to nothing and is rejected.
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
   * Body param: Custom HTTP headers sent with each webhook request.
   */
  webhook_headers?: { [key: string]: string } | null;

  /**
   * Body param: Response format sent to the webhook: 'string' (default) or 'json'.
   */
  webhook_output_format?: 'json' | 'string' | null;

  /**
   * Body param: Shared secret used to sign deliveries to this endpoint. Write-only:
   * it is never returned in responses.
   */
  webhook_signing_secret?: string | null;
}

export interface WebhookConfigListParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface WebhookConfigRetrieveParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface WebhookConfigUpdateParams {
  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Updated event subscriptions. Omit to leave unchanged; [] is
   * rejected.
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
   * Body param: Updated headers.
   */
  webhook_headers?: { [key: string]: string } | null;

  /**
   * Body param: Updated output format.
   */
  webhook_output_format?: 'json' | 'string' | null;

  /**
   * Body param: Updated signing secret (write-only). Send to rotate the secret.
   */
  webhook_signing_secret?: string | null;

  /**
   * Body param: Updated webhook URL.
   */
  webhook_url?: string | null;
}

export interface WebhookConfigDeleteParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export declare namespace WebhookConfigs {
  export {
    type WebhookConfigCreate as WebhookConfigCreate,
    type WebhookConfigResponse as WebhookConfigResponse,
    type WebhookConfigListResponse as WebhookConfigListResponse,
    type WebhookConfigCreateParams as WebhookConfigCreateParams,
    type WebhookConfigListParams as WebhookConfigListParams,
    type WebhookConfigRetrieveParams as WebhookConfigRetrieveParams,
    type WebhookConfigUpdateParams as WebhookConfigUpdateParams,
    type WebhookConfigDeleteParams as WebhookConfigDeleteParams,
  };
}
