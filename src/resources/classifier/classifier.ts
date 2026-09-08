// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as JobsAPI from './jobs';
import {
  ClassifierRule,
  ClassifyJob,
  ClassifyJobsPaginatedCursor,
  ClassifyParsingConfiguration,
  JobCreateParams,
  JobGetParams,
  JobGetResultsParams,
  JobGetResultsResponse,
  JobListParams,
  Jobs,
} from './jobs';

export class Classifier extends APIResource {
  jobs: JobsAPI.Jobs = new JobsAPI.Jobs(this._client);
}

Classifier.Jobs = Jobs;

export declare namespace Classifier {
  export {
    Jobs as Jobs,
    type ClassifierRule as ClassifierRule,
    type ClassifyJob as ClassifyJob,
    type ClassifyParsingConfiguration as ClassifyParsingConfiguration,
    type JobGetResultsResponse as JobGetResultsResponse,
    type ClassifyJobsPaginatedCursor as ClassifyJobsPaginatedCursor,
    type JobCreateParams as JobCreateParams,
    type JobListParams as JobListParams,
    type JobGetParams as JobGetParams,
    type JobGetResultsParams as JobGetResultsParams,
  };
}
