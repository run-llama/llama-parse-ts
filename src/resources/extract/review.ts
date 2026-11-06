// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, PaginatedCursor, type PaginatedCursorParams } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Review extends APIResource {
  /**
   * Beta: answers 403 until extract review is enabled for the caller and their
   * organization.
   *
   * Turn review on for an extract job.
   *
   * Fields read below `confidence_threshold`, and required fields left empty, are
   * flagged for a person to check. Every setting has a default, so the body can be
   * left out. A job still running can be named: it waits for review once it
   * completes. A job that failed or was cancelled without a review, or that cannot
   * be reviewed, answers 409 with `code: job_not_reviewable`; a field in
   * `fields_in_scope` the job's schema does not have answers 400.
   *
   * Answers 201 with the new review, or 200 with the job's existing review, whose
   * settings stay as they are.
   *
   * @example
   * ```ts
   * const extractReview = await client.extract.review.create(
   *   'job_id',
   * );
   * ```
   */
  create(
    jobID: string,
    params: ReviewCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ExtractReview> {
    const { organization_id, project_id, ...body } = params ?? {};
    return this._client.post(path`/api/v2/extract/${jobID}/review`, {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * Beta: answers 403 until extract review is enabled for the caller and their
   * organization.
   *
   * Get an extract job's review: its flags, field actions and decision, with the
   * result as the model read it and as reviewed. A job without a review answers 404.
   *
   * @example
   * ```ts
   * const extractReview = await client.extract.review.get(
   *   'job_id',
   * );
   * ```
   */
  get(
    jobID: string,
    query: ReviewGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ExtractReview> {
    return this._client.get(path`/api/v2/extract/${jobID}/review`, { query, ...options });
  }

  /**
   * Beta: answers 403 until extract review is enabled for the caller and their
   * organization.
   *
   * Confirm, correct, clear, restore or undo fields of a completed job.
   *
   * The changes apply in order, in one write. A job without a review gets one with
   * the default settings, at revision 0. A path that is not a field of the job, or a
   * value the field's schema refuses, answers 400 and changes nothing. A job that
   * has not completed answers 409 with `code: job_not_reviewable`. A `revision`
   * other than the review's latest answers 409 with `code: stale_revision` and the
   * latest `revision`.
   *
   * @example
   * ```ts
   * const extractReview =
   *   await client.extract.review.changeFields('job_id', {
   *     changes: [{ change: 'correct', path: '/total' }],
   *     revision: 0,
   *   });
   * ```
   */
  changeFields(
    jobID: string,
    params: ReviewChangeFieldsParams,
    options?: RequestOptions,
  ): APIPromise<ExtractReview> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post(path`/api/v2/extract/${jobID}/review/fields`, {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * Beta: answers 403 until extract review is enabled for the caller and their
   * organization.
   *
   * Approve the reviewed result.
   *
   * While flagged fields nobody checked remain, answers 409 with `code: open_flags`
   * and their `paths`, unless `sign_off` confirms them as part of approving. A job
   * that has not completed answers 409 with `code: job_not_reviewable`. A `revision`
   * other than the review's latest answers 409 with `code: stale_revision` and the
   * latest `revision`.
   *
   * @example
   * ```ts
   * const extractReview = await client.extract.review.approve(
   *   'job_id',
   *   { revision: 0 },
   * );
   * ```
   */
  approve(jobID: string, params: ReviewApproveParams, options?: RequestOptions): APIPromise<ExtractReview> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post(path`/api/v2/extract/${jobID}/review/approve`, {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * Beta: answers 403 until extract review is enabled for the caller and their
   * organization.
   *
   * Reject the result, with a reason. A job that failed or was cancelled can be
   * rejected, which closes a review turned on while it ran. A job still queued or
   * running answers 409 with `code: job_not_reviewable`. A `revision` other than the
   * review's latest answers 409 with `code: stale_revision` and the latest
   * `revision`.
   *
   * @example
   * ```ts
   * const extractReview = await client.extract.review.reject(
   *   'job_id',
   *   {
   *     reason:
   *       'The invoice total does not match the line items.',
   *     revision: 0,
   *   },
   * );
   * ```
   */
  reject(jobID: string, params: ReviewRejectParams, options?: RequestOptions): APIPromise<ExtractReview> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post(path`/api/v2/extract/${jobID}/review/reject`, {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * Beta: answers 403 until extract review is enabled for the caller and their
   * organization.
   *
   * Put an approved or rejected review back to pending. Its field actions stay.
   *
   * A `revision` other than the review's latest answers 409 with
   * `code: stale_revision` and the latest `revision`.
   *
   * @example
   * ```ts
   * const extractReview = await client.extract.review.reopen(
   *   'job_id',
   *   { revision: 0 },
   * );
   * ```
   */
  reopen(jobID: string, params: ReviewReopenParams, options?: RequestOptions): APIPromise<ExtractReview> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post(path`/api/v2/extract/${jobID}/review/reopen`, {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * Beta: answers 403 until extract review is enabled for the caller and their
   * organization.
   *
   * List a review's history, newest first.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const extractReviewEvent of client.extract.review.listEvents(
   *   'job_id',
   * )) {
   *   // ...
   * }
   * ```
   */
  listEvents(
    jobID: string,
    query: ReviewListEventsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ExtractReviewEventsPaginatedCursor, ExtractReviewEvent> {
    return this._client.getAPIList(
      path`/api/v2/extract/${jobID}/review/events`,
      PaginatedCursor<ExtractReviewEvent>,
      { query, ...options },
    );
  }
}

export type ExtractReviewEventsPaginatedCursor = PaginatedCursor<ExtractReviewEvent>;

/**
 * An extract job's review: its settings, flags, field actions and decision, with
 * the result as read and as reviewed.
 */
export interface ExtractReview {
  /**
   * Unique identifier of the review.
   */
  id: string;

  /**
   * Fields read below this confidence are flagged.
   */
  confidence_threshold: number;

  /**
   * When review was turned on.
   */
  created_at: string;

  /**
   * When it was approved or rejected.
   */
  decided_at: string | null;

  /**
   * ID of the user who approved or rejected it.
   */
  decided_by: string | null;

  /**
   * Why it was rejected.
   */
  decided_reason: string | null;

  /**
   * The latest action per field, keyed by JSON Pointer.
   */
  field_actions: { [key: string]: ExtractReview.FieldActions };

  /**
   * JSON Pointers of the fields the threshold applies to; empty means all.
   */
  fields_in_scope: Array<string>;

  /**
   * Fields the review asks a person to check.
   */
  flags: Array<ExtractReview.Flag>;

  /**
   * The extract job reviewed.
   */
  job_id: string;

  /**
   * JSON Pointers of flagged fields nobody checked.
   */
  open_flags: Array<string>;

  /**
   * The result as the model read it.
   */
  original_result: { [key: string]: unknown } | null;

  /**
   * JSON Pointers of fields flagged when empty.
   */
  required_fields: Array<string>;

  /**
   * When the job and its document may be deleted.
   */
  retain_until: string;

  /**
   * The result with the field actions.
   */
  reviewed_result: { [key: string]: unknown };

  /**
   * Bumped by every change; actions name the one they saw.
   */
  revision: number;

  /**
   * The file the job read, or the file behind the parse job it read; null for a URL.
   */
  source_file_id: string | null;

  /**
   * pending until approved or rejected.
   */
  status: 'approved' | 'pending' | 'rejected';

  /**
   * When the review last changed.
   */
  updated_at: string;
}

export namespace ExtractReview {
  /**
   * The latest thing a person did to one field.
   */
  export interface FieldActions {
    /**
     * confirm, correct or clear.
     */
    action: 'clear' | 'confirm' | 'correct';

    /**
     * ID of the user who acted.
     */
    actor_id: string;

    /**
     * When they acted.
     */
    at: string;

    /**
     * The corrected value, for `correct`.
     */
    value?: unknown;
  }

  /**
   * A field the review asks a person to check.
   */
  export interface Flag {
    /**
     * Whether someone confirmed, corrected or cleared it.
     */
    handled: boolean;

    /**
     * JSON Pointer of the field.
     */
    path: string;

    /**
     * below_threshold, or required_empty for a required field left empty.
     */
    reason: 'below_threshold' | 'required_empty';

    /**
     * Where in a list the least confident value is.
     */
    cell?: Flag.Cell | null;

    /**
     * The field's confidence; for a list, its least confident value.
     */
    confidence?: number | null;
  }

  export namespace Flag {
    /**
     * Where in a list the least confident value is.
     */
    export interface Cell {
      /**
       * Index of the row, from 0.
       */
      row: number;

      /**
       * Property of the row, when rows are objects.
       */
      column?: string | null;
    }
  }
}

/**
 * One entry in a review's history.
 */
export interface ExtractReviewEvent {
  /**
   * Unique identifier of the entry.
   */
  id: string;

  /**
   * ID of the user who acted.
   */
  actor_id: string;

  /**
   * When it happened.
   */
  created_at: string;

  /**
   * What happened.
   */
  kind:
    | 'approved'
    | 'created'
    | 'field_cleared'
    | 'field_confirmed'
    | 'field_corrected'
    | 'field_restored'
    | 'field_undone'
    | 'flags_signed_off'
    | 'rejected'
    | 'reopened';

  /**
   * The settings for `created`, the reason for `rejected`, and the fields for
   * `flags_signed_off`; null for the rest.
   */
  detail?:
    | ExtractReviewEvent.ExtractReviewCreatedDetail
    | ExtractReviewEvent.ExtractReviewRejectedDetail
    | ExtractReviewEvent.ExtractReviewSignedOffDetail
    | null;

  /**
   * JSON Pointer of the field it changed.
   */
  path?: string | null;

  /**
   * The field's value after the change.
   */
  value_after?: unknown;

  /**
   * The field's value before the change.
   */
  value_before?: unknown;
}

export namespace ExtractReviewEvent {
  /**
   * What a `created` entry records: where review was turned on, and its settings.
   */
  export interface ExtractReviewCreatedDetail {
    /**
     * Fields read below this confidence are flagged.
     */
    confidence_threshold: number;

    /**
     * JSON Pointers of the fields the threshold applies to; empty means all.
     */
    fields_in_scope: Array<string>;

    /**
     * Turned on as the job ran, from History, by a first edit, or by the API.
     */
    origin: 'api' | 'edit' | 'history' | 'run';

    /**
     * JSON Pointers of fields flagged when empty.
     */
    required_fields: Array<string>;
  }

  /**
   * What a `rejected` entry records.
   */
  export interface ExtractReviewRejectedDetail {
    /**
     * Why the result was rejected.
     */
    reason: string;
  }

  /**
   * What a `flags_signed_off` entry records.
   */
  export interface ExtractReviewSignedOffDetail {
    /**
     * JSON Pointers of the flagged fields confirmed as part of approving.
     */
    paths: Array<string>;
  }
}

export interface ReviewCreateParams {
  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Fields read below this confidence are flagged.
   */
  confidence_threshold?: number;

  /**
   * Body param: JSON Pointers of the fields the threshold applies to; empty means
   * all.
   */
  fields_in_scope?: Array<string>;

  /**
   * Body param: JSON Pointers of fields flagged when empty; defaults to the schema's
   * required.
   */
  required_fields?: Array<string> | null;
}

export interface ReviewGetParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface ReviewChangeFieldsParams {
  /**
   * Body param: Changes to apply, in order.
   */
  changes: Array<ReviewChangeFieldsParams.Change>;

  /**
   * Body param: The review's revision as the caller last read it.
   */
  revision: number;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;
}

export namespace ReviewChangeFieldsParams {
  /**
   * One change to one field.
   */
  export interface Change {
    /**
     * confirm, correct to `value`, clear, restore the model's value, or undo.
     */
    change: 'clear' | 'confirm' | 'correct' | 'restore' | 'undo';

    /**
     * JSON Pointer of the field.
     */
    path: string;

    /**
     * The corrected value, for `correct`.
     */
    value?: unknown;
  }
}

export interface ReviewApproveParams {
  /**
   * Body param: The review's revision as the caller last read it.
   */
  revision: number;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Confirm the flagged fields nobody checked as part of approving.
   */
  sign_off?: boolean;
}

export interface ReviewRejectParams {
  /**
   * Body param: Why the result was rejected.
   */
  reason: string;

  /**
   * Body param: The review's revision as the caller last read it.
   */
  revision: number;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;
}

export interface ReviewReopenParams {
  /**
   * Body param: The review's revision as the caller last read it.
   */
  revision: number;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;
}

export interface ReviewListEventsParams extends PaginatedCursorParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export declare namespace Review {
  export {
    type ExtractReview as ExtractReview,
    type ExtractReviewEvent as ExtractReviewEvent,
    type ExtractReviewEventsPaginatedCursor as ExtractReviewEventsPaginatedCursor,
    type ReviewCreateParams as ReviewCreateParams,
    type ReviewGetParams as ReviewGetParams,
    type ReviewChangeFieldsParams as ReviewChangeFieldsParams,
    type ReviewApproveParams as ReviewApproveParams,
    type ReviewRejectParams as ReviewRejectParams,
    type ReviewReopenParams as ReviewReopenParams,
    type ReviewListEventsParams as ReviewListEventsParams,
  };
}
