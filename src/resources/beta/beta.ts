// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentDataAPI from './agent-data';
import {
  AgentData,
  AgentDataAggregateParams,
  AgentDataAggregateResponse,
  AgentDataAggregateResponsesPaginatedCursorPost,
  AgentDataCreateParams,
  AgentDataDeleteByQueryParams,
  AgentDataDeleteByQueryResponse,
  AgentDataDeleteParams,
  AgentDataDeleteResponse,
  AgentDataGetParams,
  AgentDataPaginatedCursorPost,
  AgentDataSearchParams,
  AgentDataUpdateParams,
} from './agent-data';
import * as ChatAPI from './chat';
import {
  Chat,
  ChatCreateParams,
  ChatCreateResponse,
  ChatDeleteParams,
  ChatGetSummaryParams,
  ChatGetSummaryResponse,
  ChatListParams,
  ChatListResponse,
  ChatListResponsesPaginatedCursor,
  ChatRetrieveParams,
  ChatRetrieveResponse,
  ChatStreamParams,
  ChatStreamResponse,
} from './chat';
import * as IndexesAPI from './indexes';
import {
  IndexCreateParams,
  IndexCreateResponse,
  IndexDeleteParams,
  IndexGetParams,
  IndexGetResponse,
  IndexListParams,
  IndexListResponse,
  IndexListResponsesPaginatedCursor,
  IndexSyncParams,
  IndexSyncResponse,
  Indexes,
} from './indexes';
import * as RetrievalAPI from './retrieval';
import {
  Retrieval,
  RetrievalFindParams,
  RetrievalFindResponse,
  RetrievalFindResponsesPaginatedCursorPost,
  RetrievalGrepParams,
  RetrievalGrepResponse,
  RetrievalGrepResponsesPaginatedCursorPost,
  RetrievalReadParams,
  RetrievalReadResponse,
  RetrievalRetrieveParams,
  RetrievalRetrieveResponse,
} from './retrieval';
import * as SplitAPI from './split';
import {
  Split,
  SplitCategory,
  SplitCreateParams,
  SplitCreateResponse,
  SplitDocumentInput,
  SplitGetParams,
  SplitGetResponse,
  SplitListParams,
  SplitListResponse,
  SplitListResponsesPaginatedCursor,
  SplitResultResponse,
  SplitSegmentResponse,
} from './split';
import * as DirectoriesAPI from './directories/directories';
import {
  Directories,
  DirectoryCreateParams,
  DirectoryCreateResponse,
  DirectoryDeleteParams,
  DirectoryGetParams,
  DirectoryGetResponse,
  DirectoryListParams,
  DirectoryListResponse,
  DirectoryListResponsesPaginatedCursor,
  DirectoryUpdateParams,
  DirectoryUpdateResponse,
} from './directories/directories';

export class Beta extends APIResource {
  indexes: IndexesAPI.Indexes = new IndexesAPI.Indexes(this._client);
  retrieval: RetrievalAPI.Retrieval = new RetrievalAPI.Retrieval(this._client);
  chat: ChatAPI.Chat = new ChatAPI.Chat(this._client);
  agentData: AgentDataAPI.AgentData = new AgentDataAPI.AgentData(this._client);
  directories: DirectoriesAPI.Directories = new DirectoriesAPI.Directories(this._client);
  split: SplitAPI.Split = new SplitAPI.Split(this._client);
}

Beta.Indexes = Indexes;
Beta.Retrieval = Retrieval;
Beta.Chat = Chat;
Beta.Directories = Directories;
Beta.Split = Split;

export declare namespace Beta {
  export {
    Indexes as Indexes,
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

  export {
    Retrieval as Retrieval,
    type RetrievalRetrieveResponse as RetrievalRetrieveResponse,
    type RetrievalFindResponse as RetrievalFindResponse,
    type RetrievalGrepResponse as RetrievalGrepResponse,
    type RetrievalReadResponse as RetrievalReadResponse,
    type RetrievalFindResponsesPaginatedCursorPost as RetrievalFindResponsesPaginatedCursorPost,
    type RetrievalGrepResponsesPaginatedCursorPost as RetrievalGrepResponsesPaginatedCursorPost,
    type RetrievalRetrieveParams as RetrievalRetrieveParams,
    type RetrievalFindParams as RetrievalFindParams,
    type RetrievalGrepParams as RetrievalGrepParams,
    type RetrievalReadParams as RetrievalReadParams,
  };

  export {
    Chat as Chat,
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

  export {
    type AgentData as AgentData,
    type AgentDataDeleteResponse as AgentDataDeleteResponse,
    type AgentDataAggregateResponse as AgentDataAggregateResponse,
    type AgentDataDeleteByQueryResponse as AgentDataDeleteByQueryResponse,
    type AgentDataPaginatedCursorPost as AgentDataPaginatedCursorPost,
    type AgentDataAggregateResponsesPaginatedCursorPost as AgentDataAggregateResponsesPaginatedCursorPost,
    type AgentDataGetParams as AgentDataGetParams,
    type AgentDataUpdateParams as AgentDataUpdateParams,
    type AgentDataDeleteParams as AgentDataDeleteParams,
    type AgentDataCreateParams as AgentDataCreateParams,
    type AgentDataSearchParams as AgentDataSearchParams,
    type AgentDataAggregateParams as AgentDataAggregateParams,
    type AgentDataDeleteByQueryParams as AgentDataDeleteByQueryParams,
  };

  export {
    Directories as Directories,
    type DirectoryCreateResponse as DirectoryCreateResponse,
    type DirectoryUpdateResponse as DirectoryUpdateResponse,
    type DirectoryListResponse as DirectoryListResponse,
    type DirectoryGetResponse as DirectoryGetResponse,
    type DirectoryListResponsesPaginatedCursor as DirectoryListResponsesPaginatedCursor,
    type DirectoryCreateParams as DirectoryCreateParams,
    type DirectoryListParams as DirectoryListParams,
    type DirectoryGetParams as DirectoryGetParams,
    type DirectoryUpdateParams as DirectoryUpdateParams,
    type DirectoryDeleteParams as DirectoryDeleteParams,
  };

  export {
    Split as Split,
    type SplitCategory as SplitCategory,
    type SplitDocumentInput as SplitDocumentInput,
    type SplitResultResponse as SplitResultResponse,
    type SplitSegmentResponse as SplitSegmentResponse,
    type SplitCreateResponse as SplitCreateResponse,
    type SplitListResponse as SplitListResponse,
    type SplitGetResponse as SplitGetResponse,
    type SplitListResponsesPaginatedCursor as SplitListResponsesPaginatedCursor,
    type SplitCreateParams as SplitCreateParams,
    type SplitListParams as SplitListParams,
    type SplitGetParams as SplitGetParams,
  };
}
