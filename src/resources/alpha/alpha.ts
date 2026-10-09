// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as VerifyAPI from './verify';
import {
  Verify,
  VerifyCancelParams,
  VerifyCancelResponse,
  VerifyCreateParams,
  VerifyCreateResponse,
  VerifyGetDetailsParams,
  VerifyGetDetailsResponse,
  VerifyGetParams,
  VerifyGetResponse,
  VerifyListParams,
  VerifyListResponse,
  VerifyListResponsesPaginatedCursor,
} from './verify';

export class Alpha extends APIResource {
  verify: VerifyAPI.Verify = new VerifyAPI.Verify(this._client);
}

Alpha.Verify = Verify;

export declare namespace Alpha {
  export {
    Verify as Verify,
    type VerifyCreateResponse as VerifyCreateResponse,
    type VerifyListResponse as VerifyListResponse,
    type VerifyCancelResponse as VerifyCancelResponse,
    type VerifyGetResponse as VerifyGetResponse,
    type VerifyGetDetailsResponse as VerifyGetDetailsResponse,
    type VerifyListResponsesPaginatedCursor as VerifyListResponsesPaginatedCursor,
    type VerifyListParams as VerifyListParams,
    type VerifyCreateParams as VerifyCreateParams,
    type VerifyGetParams as VerifyGetParams,
    type VerifyCancelParams as VerifyCancelParams,
    type VerifyGetDetailsParams as VerifyGetDetailsParams,
  };
}
