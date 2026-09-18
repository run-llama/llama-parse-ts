// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, PaginatedCursor, type PaginatedCursorParams } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Chat extends APIResource {
  /**
   * List all chat sessions for the current project.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const chatListResponse of client.beta.chat.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ChatListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ChatListResponsesPaginatedCursor, ChatListResponse> {
    return this._client.getAPIList('/api/v1/chat', PaginatedCursor<ChatListResponse>, { query, ...options });
  }

  /**
   * Create a chat session, optionally bound to indexes (locked after the first
   * message).
   *
   * @example
   * ```ts
   * const chat = await client.beta.chat.create();
   * ```
   */
  create(
    params: ChatCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ChatCreateResponse> {
    const { organization_id, project_id, ...body } = params ?? {};
    return this._client.post('/api/v1/chat', { query: { organization_id, project_id }, body, ...options });
  }

  /**
   * Retrieve a full session by ID, including its event history.
   *
   * @example
   * ```ts
   * const chat = await client.beta.chat.retrieve('session_id');
   * ```
   */
  retrieve(
    sessionID: string,
    query: ChatRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ChatRetrieveResponse> {
    return this._client.get(path`/api/v1/chat/${sessionID}`, { query, ...options });
  }

  /**
   * Delete a session.
   *
   * @example
   * ```ts
   * await client.beta.chat.delete('session_id');
   * ```
   */
  delete(
    sessionID: string,
    params: ChatDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { organization_id, project_id } = params ?? {};
    return this._client.delete(path`/api/v1/chat/${sessionID}`, {
      query: { organization_id, project_id },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Retrieve a session summary by ID.
   *
   * @example
   * ```ts
   * const response = await client.beta.chat.getSummary(
   *   'session_id',
   * );
   * ```
   */
  getSummary(
    sessionID: string,
    query: ChatGetSummaryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ChatGetSummaryResponse> {
    return this._client.get(path`/api/v1/chat/${sessionID}/summary`, { query, ...options });
  }

  /**
   * Stream agent events for a chat turn as Server-Sent Events.
   *
   * @example
   * ```ts
   * const response = await client.beta.chat.stream(
   *   'session_id',
   *   {
   *     index_ids: ['idx-abc123', 'idx-def456'],
   *     prompt: 'What were the main findings in Q3?',
   *   },
   * );
   * ```
   */
  stream(sessionID: string, params: ChatStreamParams, options?: RequestOptions): APIPromise<unknown> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post(path`/api/v1/chat/${sessionID}/messages/stream`, {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }
}

export type ChatListResponsesPaginatedCursor = PaginatedCursor<ChatListResponse>;

/**
 * Summary of a chat session, including its title and last run metadata.
 */
export interface ChatCreateResponse {
  /**
   * ISO-format timestamp showing when the session was last updated.
   */
  last_updated_at: string;

  /**
   * Unique session identifier.
   */
  session_id: string;

  /**
   * What this chat's share link grants: read_only (transcript only) or query
   * (viewers may ask new questions).
   */
  shared_access: 'query' | 'read_only';

  /**
   * Auto-generated title derived from the first user message.
   */
  generated_title?: string | null;

  /**
   * Indexes this session is bound to. Null on unbound sessions.
   */
  index_ids?: Array<string> | null;

  /**
   * Token usage and status from the most recent run. Null if the session has not
   * been run yet.
   */
  job_metadata?: ChatCreateResponse.JobMetadata | null;
}

export namespace ChatCreateResponse {
  /**
   * Token usage and status from the most recent run. Null if the session has not
   * been run yet.
   */
  export interface JobMetadata {
    duration_ms?: number;

    error?: string | null;

    export_config_ids?: Array<string> | null;

    is_error?: boolean;

    total_input_tokens?: number | null;

    total_output_tokens?: number | null;

    turns?: number;
  }
}

/**
 * Full chat session including its complete event history.
 */
export interface ChatRetrieveResponse {
  /**
   * Ordered list of events that make up the conversation history.
   */
  events: Array<
    | ChatRetrieveResponse.StopEvent
    | ChatRetrieveResponse.TextDeltaEvent
    | ChatRetrieveResponse.TextEvent
    | ChatRetrieveResponse.ThinkingDeltaEvent
    | ChatRetrieveResponse.ThinkingEvent
    | ChatRetrieveResponse.ToolCallEvent
    | ChatRetrieveResponse.ToolResultEvent
    | ChatRetrieveResponse.UserInputEvent
  >;

  /**
   * ISO-format timestamp showing when the session was last updated.
   */
  last_updated_at: string;

  /**
   * Unique session identifier.
   */
  session_id: string;

  /**
   * What this chat's share link grants: read_only (transcript only) or query
   * (viewers may ask new questions).
   */
  shared_access: 'query' | 'read_only';

  /**
   * Auto-generated title derived from the first user message.
   */
  generated_title?: string | null;

  /**
   * Indexes this session is bound to. Null on unbound sessions.
   */
  index_ids?: Array<string> | null;

  /**
   * Token usage and status from the most recent run. Null if the session has not
   * been run yet.
   */
  job_metadata?: ChatRetrieveResponse.JobMetadata | null;
}

export namespace ChatRetrieveResponse {
  export interface StopEvent {
    error: string | null;

    is_error: boolean;

    usage: StopEvent.Usage;

    /**
     * Requested indexes this turn could not query.
     */
    skipped_index_ids?: Array<string>;

    type?: 'stop';
  }

  export namespace StopEvent {
    export interface Usage {
      duration_ms?: number;

      total_input_tokens?: number | null;

      total_output_tokens?: number | null;

      turns?: number;
    }
  }

  export interface TextDeltaEvent {
    content: string;

    type?: 'text_delta';
  }

  export interface TextEvent {
    content: string;

    type?: 'text';
  }

  export interface ThinkingDeltaEvent {
    content: string;

    type?: 'thinking_delta';
  }

  export interface ThinkingEvent {
    content: string;

    type?: 'thinking';
  }

  export interface ToolCallEvent {
    arguments: { [key: string]: unknown };

    call_id: string;

    name: string;

    type?: 'tool_call';
  }

  export interface ToolResultEvent {
    call_id: string;

    name: string;

    result: unknown;

    /**
     * Coordinates for lazily resolving a page screenshot presigned URL.
     */
    image_attachment?: ToolResultEvent.ImageAttachment | null;

    type?: 'tool_result';
  }

  export namespace ToolResultEvent {
    /**
     * Coordinates for lazily resolving a page screenshot presigned URL.
     */
    export interface ImageAttachment {
      attachment_name: string;

      source_id: string;
    }
  }

  export interface UserInputEvent {
    content: string;

    type?: 'user_input';
  }

  /**
   * Token usage and status from the most recent run. Null if the session has not
   * been run yet.
   */
  export interface JobMetadata {
    duration_ms?: number;

    error?: string | null;

    export_config_ids?: Array<string> | null;

    is_error?: boolean;

    total_input_tokens?: number | null;

    total_output_tokens?: number | null;

    turns?: number;
  }
}

/**
 * Summary of a chat session, including its title and last run metadata.
 */
export interface ChatListResponse {
  /**
   * ISO-format timestamp showing when the session was last updated.
   */
  last_updated_at: string;

  /**
   * Unique session identifier.
   */
  session_id: string;

  /**
   * What this chat's share link grants: read_only (transcript only) or query
   * (viewers may ask new questions).
   */
  shared_access: 'query' | 'read_only';

  /**
   * Auto-generated title derived from the first user message.
   */
  generated_title?: string | null;

  /**
   * Indexes this session is bound to. Null on unbound sessions.
   */
  index_ids?: Array<string> | null;

  /**
   * Token usage and status from the most recent run. Null if the session has not
   * been run yet.
   */
  job_metadata?: ChatListResponse.JobMetadata | null;
}

export namespace ChatListResponse {
  /**
   * Token usage and status from the most recent run. Null if the session has not
   * been run yet.
   */
  export interface JobMetadata {
    duration_ms?: number;

    error?: string | null;

    export_config_ids?: Array<string> | null;

    is_error?: boolean;

    total_input_tokens?: number | null;

    total_output_tokens?: number | null;

    turns?: number;
  }
}

/**
 * Summary of a chat session, including its title and last run metadata.
 */
export interface ChatGetSummaryResponse {
  /**
   * ISO-format timestamp showing when the session was last updated.
   */
  last_updated_at: string;

  /**
   * Unique session identifier.
   */
  session_id: string;

  /**
   * What this chat's share link grants: read_only (transcript only) or query
   * (viewers may ask new questions).
   */
  shared_access: 'query' | 'read_only';

  /**
   * Auto-generated title derived from the first user message.
   */
  generated_title?: string | null;

  /**
   * Indexes this session is bound to. Null on unbound sessions.
   */
  index_ids?: Array<string> | null;

  /**
   * Token usage and status from the most recent run. Null if the session has not
   * been run yet.
   */
  job_metadata?: ChatGetSummaryResponse.JobMetadata | null;
}

export namespace ChatGetSummaryResponse {
  /**
   * Token usage and status from the most recent run. Null if the session has not
   * been run yet.
   */
  export interface JobMetadata {
    duration_ms?: number;

    error?: string | null;

    export_config_ids?: Array<string> | null;

    is_error?: boolean;

    total_input_tokens?: number | null;

    total_output_tokens?: number | null;

    turns?: number;
  }
}

export type ChatStreamResponse = unknown;

export interface ChatListParams extends PaginatedCursorParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface ChatCreateParams {
  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Indexes this session will retrieve from. Once set and the first
   * message has been sent, the source set is locked for the session's lifetime.
   * Leave null to create an unbound session.
   */
  index_ids?: Array<string> | null;

  /**
   * Body param: What this chat's share link grants: read_only (transcript only) or
   * query (viewers may ask new questions). Null follows the deployment default.
   */
  shared_access?: 'query' | 'read_only' | null;
}

export interface ChatRetrieveParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface ChatDeleteParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface ChatGetSummaryParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface ChatStreamParams {
  /**
   * Body param: Indexes to retrieve data from.
   */
  index_ids: Array<string>;

  /**
   * Body param: User message for this chat turn.
   */
  prompt: string;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Fail the turn if any requested index cannot be queried.
   */
  require_all_indexes?: boolean;
}

export declare namespace Chat {
  export {
    type ChatCreateResponse as ChatCreateResponse,
    type ChatRetrieveResponse as ChatRetrieveResponse,
    type ChatListResponse as ChatListResponse,
    type ChatGetSummaryResponse as ChatGetSummaryResponse,
    type ChatStreamResponse as ChatStreamResponse,
    type ChatListResponsesPaginatedCursor as ChatListResponsesPaginatedCursor,
    type ChatListParams as ChatListParams,
    type ChatCreateParams as ChatCreateParams,
    type ChatRetrieveParams as ChatRetrieveParams,
    type ChatDeleteParams as ChatDeleteParams,
    type ChatGetSummaryParams as ChatGetSummaryParams,
    type ChatStreamParams as ChatStreamParams,
  };
}
