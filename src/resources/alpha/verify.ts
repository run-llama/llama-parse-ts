// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, PaginatedCursor, type PaginatedCursorParams } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Verify extends APIResource {
  /**
   * List Verify jobs with optional filtering and pagination.
   *
   * Filter by `status`, specific `job_ids`, or creation date range.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const verifyListResponse of client.alpha.verify.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: VerifyListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<VerifyListResponsesPaginatedCursor, VerifyListResponse> {
    return this._client.getAPIList('/api/alpha/verify', PaginatedCursor<VerifyListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Create a Verify job.
   *
   * Analyzes a document for signs of doctoring (splicing, copy-move, AI generation,
   * metadata tampering, ...). Set `file_input` to a file ID (`dfl-...`). Optionally
   * provide a `configuration` object to control the semantic agent.
   *
   * The job runs asynchronously. Poll `GET /verify/{job_id}` with `expand=result` to
   * check status and retrieve results.
   *
   * @example
   * ```ts
   * const verify = await client.alpha.verify.create();
   * ```
   */
  create(params: VerifyCreateParams, options?: RequestOptions): APIPromise<VerifyCreateResponse> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post('/api/alpha/verify', {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * Get a Verify job by ID.
   *
   * Returns the job status and configuration. Pass `expand=result` to include the
   * Verify result (overall score, verdict, confidence, composite scores, and suspect
   * regions) when the job is complete.
   *
   * Raw per-signal detail is available via `GET /verify/{job_id}/details`.
   *
   * @example
   * ```ts
   * const verify = await client.alpha.verify.get('job_id');
   * ```
   */
  get(
    jobID: string,
    query: VerifyGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<VerifyGetResponse> {
    return this._client.get(path`/api/alpha/verify/${jobID}`, { query, ...options });
  }

  /**
   * Cancel a running Verify job.
   *
   * Stops processing and marks the job as CANCELLED. Returns the updated job. Jobs
   * already in a terminal state (COMPLETED, FAILED, CANCELLED) cannot be cancelled.
   *
   * @example
   * ```ts
   * const response = await client.alpha.verify.cancel('job_id');
   * ```
   */
  cancel(
    jobID: string,
    params: VerifyCancelParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<VerifyCancelResponse> {
    const { organization_id, project_id } = params ?? {};
    return this._client.post(path`/api/alpha/verify/${jobID}/cancel`, {
      query: { organization_id, project_id },
      ...options,
    });
  }

  /**
   * Get the raw per-signal detail for a completed Verify job.
   *
   * Forensic drill-down behind the simplified result: the full evidence list,
   * per-family sub-scores, raw localized regions, and per-page forensic heatmap
   * overlays (presigned image URLs).
   *
   * @example
   * ```ts
   * const response = await client.alpha.verify.getDetails(
   *   'job_id',
   * );
   * ```
   */
  getDetails(
    jobID: string,
    query: VerifyGetDetailsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<VerifyGetDetailsResponse> {
    return this._client.get(path`/api/alpha/verify/${jobID}/details`, { query, ...options });
  }
}

export type VerifyListResponsesPaginatedCursor = PaginatedCursor<VerifyListResponse>;

/**
 * Response for a Verify job.
 */
export interface VerifyCreateResponse {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Verify configuration used for this job
   */
  configuration: VerifyCreateResponse.Configuration;

  /**
   * Type of the document input (FILE)
   */
  document_input_type: 'file_id' | 'parse_job_id' | 'url';

  /**
   * ID of the input file
   */
  file_input: string;

  /**
   * Project this job belongs to
   */
  project_id: string;

  /**
   * Current job status: PENDING, RUNNING, COMPLETED, FAILED, or CANCELLED
   */
  status: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING';

  /**
   * User who created this job
   */
  user_id: string;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Error message if job failed
   */
  error_message?: string | null;

  /**
   * Result of a Verify (doctored-document) analysis.
   *
   * Raw per-signal detail (evidence list, per-family sub-scores, raw regions,
   * forensic heatmaps) is available separately via the job's details endpoint.
   */
  result?: VerifyCreateResponse.Result | null;

  /**
   * Idempotency key
   */
  transaction_id?: string | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

export namespace VerifyCreateResponse {
  /**
   * Verify configuration used for this job
   */
  export interface Configuration {
    /**
     * Comma-separated page numbers or ranges to analyze (1-based). Omit to analyze all
     * pages. Ignored for non-PDF inputs.
     */
    target_pages?: string | null;

    /**
     * Verify tier: 'fast' runs only the quick deterministic forensic checks (metadata,
     * content integrity, container structure, pixel statistics); 'agentic' (default)
     * runs the full pipeline including the learned detectors and the semantic review
     * pass.
     */
    tier?: 'agentic' | 'fast';
  }

  /**
   * Result of a Verify (doctored-document) analysis.
   *
   * Raw per-signal detail (evidence list, per-family sub-scores, raw regions,
   * forensic heatmaps) is available separately via the job's details endpoint.
   */
  export interface Result {
    /**
     * Version of the detector that produced the result
     */
    detector_version: string;

    /**
     * Overall doctoring likelihood (0 to 1)
     */
    overall_score: number;

    /**
     * Overall verdict for the document
     */
    verdict: 'AUTHENTIC' | 'DOCTORED' | 'LIKELY_DOCTORED' | 'NO_STRONG_SIGNAL' | 'SUSPICIOUS';

    /**
     * Composite scores, each answering one question about the document
     */
    composite_scores?: Result.CompositeScores;

    /**
     * Confidence in the verdict (0 to 1): how firmly the detected signals support the
     * verdict bucket, independent of the doctoring likelihood itself
     */
    confidence?: number;

    /**
     * Error detail when the analysis could not complete
     */
    error?: string | null;

    /**
     * Number of analysed pages (1 for images/docx)
     */
    page_count?: number;

    /**
     * Rendered pixel size per page, so region bboxes can be scaled onto the page
     */
    page_dimensions?: Array<Result.PageDimension>;

    /**
     * Explanation of the verdict
     */
    reasoning?: string;

    /**
     * Regions that led to the suspected fraud, ranked most-suspect first, each with an
     * explanation of what makes it suspect
     */
    suspect_regions?: Array<Result.SuspectRegion>;

    /**
     * Likelihood (0 to 1) that the document is wholly generated or fabricated rather
     * than a capture of a real document. Null for jobs completed before this score was
     * introduced
     */
    synthetic_score?: number | null;

    /**
     * Likelihood (0 to 1) that a real captured document was locally edited — a genuine
     * capture with regions altered after the fact. Null for jobs completed before this
     * score was introduced
     */
    tampering_score?: number | null;
  }

  export namespace Result {
    /**
     * Composite scores, each answering one question about the document
     */
    export interface CompositeScores {
      /**
       * Was this content synthesized by a generative model?
       */
      ai_generated?: CompositeScores.AIGenerated;

      /**
       * Does the document's content agree with itself (checksums, arithmetic,
       * machine-readable zones)?
       */
      document_coherence?: CompositeScores.DocumentCoherence;

      /**
       * Does the file's provenance / toolchain history look suspicious? Advisory:
       * individually weak workflow-hygiene signals
       */
      document_metadata?: CompositeScores.DocumentMetadata;

      /**
       * Has this asset (or its template) been seen in fraud before?
       */
      known_fraud?: CompositeScores.KnownFraud;

      /**
       * Was this document altered after creation (splice, retype, redact, inpaint)?
       */
      manually_edited?: CompositeScores.ManuallyEdited;

      /**
       * Was the document captured through a channel that destroys forensic evidence
       * (photo of a screen, print-then-rescan)?
       */
      recapture?: CompositeScores.Recapture;
    }

    export namespace CompositeScores {
      /**
       * Was this content synthesized by a generative model?
       */
      export interface AIGenerated {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Does the document's content agree with itself (checksums, arithmetic,
       * machine-readable zones)?
       */
      export interface DocumentCoherence {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Does the file's provenance / toolchain history look suspicious? Advisory:
       * individually weak workflow-hygiene signals
       */
      export interface DocumentMetadata {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Has this asset (or its template) been seen in fraud before?
       */
      export interface KnownFraud {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Was this document altered after creation (splice, retype, redact, inpaint)?
       */
      export interface ManuallyEdited {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Was the document captured through a channel that destroys forensic evidence
       * (photo of a screen, print-then-rescan)?
       */
      export interface Recapture {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }
    }

    /**
     * Rendered pixel size of a page — the coordinate space region bboxes use, so the
     * UI can scale the suspect-region overlay onto the displayed page.
     */
    export interface PageDimension {
      /**
       * Rendered page height in pixels
       */
      height: number;

      /**
       * 0-based page index (0 for standalone images)
       */
      page: number;

      /**
       * Rendered page width in pixels
       */
      width: number;
    }

    /**
     * A region that led to the suspected fraud, with why it is suspect.
     *
     * A curated, high-signal subset of `regions`: reviewer-dismissed candidates are
     * dropped and the remainder is ranked by suspicion, so consumers can act on
     * `verdict` + `confidence` + this list without reading the raw signals.
     */
    export interface SuspectRegion {
      /**
       * Region bounding box as [x, y, w, h] in page-render pixels
       */
      bbox: Array<number>;

      /**
       * Human-readable explanation of what makes this region suspect
       */
      explanation: string;

      /**
       * Kind of anomaly detected in this region
       */
      kind: string;

      /**
       * 0-based page index (0 for standalone images)
       */
      page: number;

      /**
       * Suspicion score for this region (0 to 1)
       */
      score: number;

      /**
       * Detector that flagged this region
       */
      source: string;

      /**
       * Whether this region is part of the small set of decisive evidence behind the
       * verdict — the boxes a reviewer should look at first
       */
      primary?: boolean;

      /**
       * Automated reviewer verdict for this region (confirmed, dismissed, unsure, or
       * empty). A dismissed region can still be surfaced when it is the only place to
       * look; this label says how to read it
       */
      review?: string;
    }
  }
}

/**
 * Response for a Verify job.
 */
export interface VerifyListResponse {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Verify configuration used for this job
   */
  configuration: VerifyListResponse.Configuration;

  /**
   * Type of the document input (FILE)
   */
  document_input_type: 'file_id' | 'parse_job_id' | 'url';

  /**
   * ID of the input file
   */
  file_input: string;

  /**
   * Project this job belongs to
   */
  project_id: string;

  /**
   * Current job status: PENDING, RUNNING, COMPLETED, FAILED, or CANCELLED
   */
  status: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING';

  /**
   * User who created this job
   */
  user_id: string;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Error message if job failed
   */
  error_message?: string | null;

  /**
   * Result of a Verify (doctored-document) analysis.
   *
   * Raw per-signal detail (evidence list, per-family sub-scores, raw regions,
   * forensic heatmaps) is available separately via the job's details endpoint.
   */
  result?: VerifyListResponse.Result | null;

  /**
   * Idempotency key
   */
  transaction_id?: string | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

export namespace VerifyListResponse {
  /**
   * Verify configuration used for this job
   */
  export interface Configuration {
    /**
     * Comma-separated page numbers or ranges to analyze (1-based). Omit to analyze all
     * pages. Ignored for non-PDF inputs.
     */
    target_pages?: string | null;

    /**
     * Verify tier: 'fast' runs only the quick deterministic forensic checks (metadata,
     * content integrity, container structure, pixel statistics); 'agentic' (default)
     * runs the full pipeline including the learned detectors and the semantic review
     * pass.
     */
    tier?: 'agentic' | 'fast';
  }

  /**
   * Result of a Verify (doctored-document) analysis.
   *
   * Raw per-signal detail (evidence list, per-family sub-scores, raw regions,
   * forensic heatmaps) is available separately via the job's details endpoint.
   */
  export interface Result {
    /**
     * Version of the detector that produced the result
     */
    detector_version: string;

    /**
     * Overall doctoring likelihood (0 to 1)
     */
    overall_score: number;

    /**
     * Overall verdict for the document
     */
    verdict: 'AUTHENTIC' | 'DOCTORED' | 'LIKELY_DOCTORED' | 'NO_STRONG_SIGNAL' | 'SUSPICIOUS';

    /**
     * Composite scores, each answering one question about the document
     */
    composite_scores?: Result.CompositeScores;

    /**
     * Confidence in the verdict (0 to 1): how firmly the detected signals support the
     * verdict bucket, independent of the doctoring likelihood itself
     */
    confidence?: number;

    /**
     * Error detail when the analysis could not complete
     */
    error?: string | null;

    /**
     * Number of analysed pages (1 for images/docx)
     */
    page_count?: number;

    /**
     * Rendered pixel size per page, so region bboxes can be scaled onto the page
     */
    page_dimensions?: Array<Result.PageDimension>;

    /**
     * Explanation of the verdict
     */
    reasoning?: string;

    /**
     * Regions that led to the suspected fraud, ranked most-suspect first, each with an
     * explanation of what makes it suspect
     */
    suspect_regions?: Array<Result.SuspectRegion>;

    /**
     * Likelihood (0 to 1) that the document is wholly generated or fabricated rather
     * than a capture of a real document. Null for jobs completed before this score was
     * introduced
     */
    synthetic_score?: number | null;

    /**
     * Likelihood (0 to 1) that a real captured document was locally edited — a genuine
     * capture with regions altered after the fact. Null for jobs completed before this
     * score was introduced
     */
    tampering_score?: number | null;
  }

  export namespace Result {
    /**
     * Composite scores, each answering one question about the document
     */
    export interface CompositeScores {
      /**
       * Was this content synthesized by a generative model?
       */
      ai_generated?: CompositeScores.AIGenerated;

      /**
       * Does the document's content agree with itself (checksums, arithmetic,
       * machine-readable zones)?
       */
      document_coherence?: CompositeScores.DocumentCoherence;

      /**
       * Does the file's provenance / toolchain history look suspicious? Advisory:
       * individually weak workflow-hygiene signals
       */
      document_metadata?: CompositeScores.DocumentMetadata;

      /**
       * Has this asset (or its template) been seen in fraud before?
       */
      known_fraud?: CompositeScores.KnownFraud;

      /**
       * Was this document altered after creation (splice, retype, redact, inpaint)?
       */
      manually_edited?: CompositeScores.ManuallyEdited;

      /**
       * Was the document captured through a channel that destroys forensic evidence
       * (photo of a screen, print-then-rescan)?
       */
      recapture?: CompositeScores.Recapture;
    }

    export namespace CompositeScores {
      /**
       * Was this content synthesized by a generative model?
       */
      export interface AIGenerated {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Does the document's content agree with itself (checksums, arithmetic,
       * machine-readable zones)?
       */
      export interface DocumentCoherence {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Does the file's provenance / toolchain history look suspicious? Advisory:
       * individually weak workflow-hygiene signals
       */
      export interface DocumentMetadata {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Has this asset (or its template) been seen in fraud before?
       */
      export interface KnownFraud {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Was this document altered after creation (splice, retype, redact, inpaint)?
       */
      export interface ManuallyEdited {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Was the document captured through a channel that destroys forensic evidence
       * (photo of a screen, print-then-rescan)?
       */
      export interface Recapture {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }
    }

    /**
     * Rendered pixel size of a page — the coordinate space region bboxes use, so the
     * UI can scale the suspect-region overlay onto the displayed page.
     */
    export interface PageDimension {
      /**
       * Rendered page height in pixels
       */
      height: number;

      /**
       * 0-based page index (0 for standalone images)
       */
      page: number;

      /**
       * Rendered page width in pixels
       */
      width: number;
    }

    /**
     * A region that led to the suspected fraud, with why it is suspect.
     *
     * A curated, high-signal subset of `regions`: reviewer-dismissed candidates are
     * dropped and the remainder is ranked by suspicion, so consumers can act on
     * `verdict` + `confidence` + this list without reading the raw signals.
     */
    export interface SuspectRegion {
      /**
       * Region bounding box as [x, y, w, h] in page-render pixels
       */
      bbox: Array<number>;

      /**
       * Human-readable explanation of what makes this region suspect
       */
      explanation: string;

      /**
       * Kind of anomaly detected in this region
       */
      kind: string;

      /**
       * 0-based page index (0 for standalone images)
       */
      page: number;

      /**
       * Suspicion score for this region (0 to 1)
       */
      score: number;

      /**
       * Detector that flagged this region
       */
      source: string;

      /**
       * Whether this region is part of the small set of decisive evidence behind the
       * verdict — the boxes a reviewer should look at first
       */
      primary?: boolean;

      /**
       * Automated reviewer verdict for this region (confirmed, dismissed, unsure, or
       * empty). A dismissed region can still be surfaced when it is the only place to
       * look; this label says how to read it
       */
      review?: string;
    }
  }
}

/**
 * Response for a Verify job.
 */
export interface VerifyCancelResponse {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Verify configuration used for this job
   */
  configuration: VerifyCancelResponse.Configuration;

  /**
   * Type of the document input (FILE)
   */
  document_input_type: 'file_id' | 'parse_job_id' | 'url';

  /**
   * ID of the input file
   */
  file_input: string;

  /**
   * Project this job belongs to
   */
  project_id: string;

  /**
   * Current job status: PENDING, RUNNING, COMPLETED, FAILED, or CANCELLED
   */
  status: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING';

  /**
   * User who created this job
   */
  user_id: string;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Error message if job failed
   */
  error_message?: string | null;

  /**
   * Result of a Verify (doctored-document) analysis.
   *
   * Raw per-signal detail (evidence list, per-family sub-scores, raw regions,
   * forensic heatmaps) is available separately via the job's details endpoint.
   */
  result?: VerifyCancelResponse.Result | null;

  /**
   * Idempotency key
   */
  transaction_id?: string | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

export namespace VerifyCancelResponse {
  /**
   * Verify configuration used for this job
   */
  export interface Configuration {
    /**
     * Comma-separated page numbers or ranges to analyze (1-based). Omit to analyze all
     * pages. Ignored for non-PDF inputs.
     */
    target_pages?: string | null;

    /**
     * Verify tier: 'fast' runs only the quick deterministic forensic checks (metadata,
     * content integrity, container structure, pixel statistics); 'agentic' (default)
     * runs the full pipeline including the learned detectors and the semantic review
     * pass.
     */
    tier?: 'agentic' | 'fast';
  }

  /**
   * Result of a Verify (doctored-document) analysis.
   *
   * Raw per-signal detail (evidence list, per-family sub-scores, raw regions,
   * forensic heatmaps) is available separately via the job's details endpoint.
   */
  export interface Result {
    /**
     * Version of the detector that produced the result
     */
    detector_version: string;

    /**
     * Overall doctoring likelihood (0 to 1)
     */
    overall_score: number;

    /**
     * Overall verdict for the document
     */
    verdict: 'AUTHENTIC' | 'DOCTORED' | 'LIKELY_DOCTORED' | 'NO_STRONG_SIGNAL' | 'SUSPICIOUS';

    /**
     * Composite scores, each answering one question about the document
     */
    composite_scores?: Result.CompositeScores;

    /**
     * Confidence in the verdict (0 to 1): how firmly the detected signals support the
     * verdict bucket, independent of the doctoring likelihood itself
     */
    confidence?: number;

    /**
     * Error detail when the analysis could not complete
     */
    error?: string | null;

    /**
     * Number of analysed pages (1 for images/docx)
     */
    page_count?: number;

    /**
     * Rendered pixel size per page, so region bboxes can be scaled onto the page
     */
    page_dimensions?: Array<Result.PageDimension>;

    /**
     * Explanation of the verdict
     */
    reasoning?: string;

    /**
     * Regions that led to the suspected fraud, ranked most-suspect first, each with an
     * explanation of what makes it suspect
     */
    suspect_regions?: Array<Result.SuspectRegion>;

    /**
     * Likelihood (0 to 1) that the document is wholly generated or fabricated rather
     * than a capture of a real document. Null for jobs completed before this score was
     * introduced
     */
    synthetic_score?: number | null;

    /**
     * Likelihood (0 to 1) that a real captured document was locally edited — a genuine
     * capture with regions altered after the fact. Null for jobs completed before this
     * score was introduced
     */
    tampering_score?: number | null;
  }

  export namespace Result {
    /**
     * Composite scores, each answering one question about the document
     */
    export interface CompositeScores {
      /**
       * Was this content synthesized by a generative model?
       */
      ai_generated?: CompositeScores.AIGenerated;

      /**
       * Does the document's content agree with itself (checksums, arithmetic,
       * machine-readable zones)?
       */
      document_coherence?: CompositeScores.DocumentCoherence;

      /**
       * Does the file's provenance / toolchain history look suspicious? Advisory:
       * individually weak workflow-hygiene signals
       */
      document_metadata?: CompositeScores.DocumentMetadata;

      /**
       * Has this asset (or its template) been seen in fraud before?
       */
      known_fraud?: CompositeScores.KnownFraud;

      /**
       * Was this document altered after creation (splice, retype, redact, inpaint)?
       */
      manually_edited?: CompositeScores.ManuallyEdited;

      /**
       * Was the document captured through a channel that destroys forensic evidence
       * (photo of a screen, print-then-rescan)?
       */
      recapture?: CompositeScores.Recapture;
    }

    export namespace CompositeScores {
      /**
       * Was this content synthesized by a generative model?
       */
      export interface AIGenerated {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Does the document's content agree with itself (checksums, arithmetic,
       * machine-readable zones)?
       */
      export interface DocumentCoherence {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Does the file's provenance / toolchain history look suspicious? Advisory:
       * individually weak workflow-hygiene signals
       */
      export interface DocumentMetadata {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Has this asset (or its template) been seen in fraud before?
       */
      export interface KnownFraud {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Was this document altered after creation (splice, retype, redact, inpaint)?
       */
      export interface ManuallyEdited {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Was the document captured through a channel that destroys forensic evidence
       * (photo of a screen, print-then-rescan)?
       */
      export interface Recapture {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }
    }

    /**
     * Rendered pixel size of a page — the coordinate space region bboxes use, so the
     * UI can scale the suspect-region overlay onto the displayed page.
     */
    export interface PageDimension {
      /**
       * Rendered page height in pixels
       */
      height: number;

      /**
       * 0-based page index (0 for standalone images)
       */
      page: number;

      /**
       * Rendered page width in pixels
       */
      width: number;
    }

    /**
     * A region that led to the suspected fraud, with why it is suspect.
     *
     * A curated, high-signal subset of `regions`: reviewer-dismissed candidates are
     * dropped and the remainder is ranked by suspicion, so consumers can act on
     * `verdict` + `confidence` + this list without reading the raw signals.
     */
    export interface SuspectRegion {
      /**
       * Region bounding box as [x, y, w, h] in page-render pixels
       */
      bbox: Array<number>;

      /**
       * Human-readable explanation of what makes this region suspect
       */
      explanation: string;

      /**
       * Kind of anomaly detected in this region
       */
      kind: string;

      /**
       * 0-based page index (0 for standalone images)
       */
      page: number;

      /**
       * Suspicion score for this region (0 to 1)
       */
      score: number;

      /**
       * Detector that flagged this region
       */
      source: string;

      /**
       * Whether this region is part of the small set of decisive evidence behind the
       * verdict — the boxes a reviewer should look at first
       */
      primary?: boolean;

      /**
       * Automated reviewer verdict for this region (confirmed, dismissed, unsure, or
       * empty). A dismissed region can still be surfaced when it is the only place to
       * look; this label says how to read it
       */
      review?: string;
    }
  }
}

/**
 * Response for a Verify job.
 */
export interface VerifyGetResponse {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Verify configuration used for this job
   */
  configuration: VerifyGetResponse.Configuration;

  /**
   * Type of the document input (FILE)
   */
  document_input_type: 'file_id' | 'parse_job_id' | 'url';

  /**
   * ID of the input file
   */
  file_input: string;

  /**
   * Project this job belongs to
   */
  project_id: string;

  /**
   * Current job status: PENDING, RUNNING, COMPLETED, FAILED, or CANCELLED
   */
  status: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING';

  /**
   * User who created this job
   */
  user_id: string;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Error message if job failed
   */
  error_message?: string | null;

  /**
   * Result of a Verify (doctored-document) analysis.
   *
   * Raw per-signal detail (evidence list, per-family sub-scores, raw regions,
   * forensic heatmaps) is available separately via the job's details endpoint.
   */
  result?: VerifyGetResponse.Result | null;

  /**
   * Idempotency key
   */
  transaction_id?: string | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

export namespace VerifyGetResponse {
  /**
   * Verify configuration used for this job
   */
  export interface Configuration {
    /**
     * Comma-separated page numbers or ranges to analyze (1-based). Omit to analyze all
     * pages. Ignored for non-PDF inputs.
     */
    target_pages?: string | null;

    /**
     * Verify tier: 'fast' runs only the quick deterministic forensic checks (metadata,
     * content integrity, container structure, pixel statistics); 'agentic' (default)
     * runs the full pipeline including the learned detectors and the semantic review
     * pass.
     */
    tier?: 'agentic' | 'fast';
  }

  /**
   * Result of a Verify (doctored-document) analysis.
   *
   * Raw per-signal detail (evidence list, per-family sub-scores, raw regions,
   * forensic heatmaps) is available separately via the job's details endpoint.
   */
  export interface Result {
    /**
     * Version of the detector that produced the result
     */
    detector_version: string;

    /**
     * Overall doctoring likelihood (0 to 1)
     */
    overall_score: number;

    /**
     * Overall verdict for the document
     */
    verdict: 'AUTHENTIC' | 'DOCTORED' | 'LIKELY_DOCTORED' | 'NO_STRONG_SIGNAL' | 'SUSPICIOUS';

    /**
     * Composite scores, each answering one question about the document
     */
    composite_scores?: Result.CompositeScores;

    /**
     * Confidence in the verdict (0 to 1): how firmly the detected signals support the
     * verdict bucket, independent of the doctoring likelihood itself
     */
    confidence?: number;

    /**
     * Error detail when the analysis could not complete
     */
    error?: string | null;

    /**
     * Number of analysed pages (1 for images/docx)
     */
    page_count?: number;

    /**
     * Rendered pixel size per page, so region bboxes can be scaled onto the page
     */
    page_dimensions?: Array<Result.PageDimension>;

    /**
     * Explanation of the verdict
     */
    reasoning?: string;

    /**
     * Regions that led to the suspected fraud, ranked most-suspect first, each with an
     * explanation of what makes it suspect
     */
    suspect_regions?: Array<Result.SuspectRegion>;

    /**
     * Likelihood (0 to 1) that the document is wholly generated or fabricated rather
     * than a capture of a real document. Null for jobs completed before this score was
     * introduced
     */
    synthetic_score?: number | null;

    /**
     * Likelihood (0 to 1) that a real captured document was locally edited — a genuine
     * capture with regions altered after the fact. Null for jobs completed before this
     * score was introduced
     */
    tampering_score?: number | null;
  }

  export namespace Result {
    /**
     * Composite scores, each answering one question about the document
     */
    export interface CompositeScores {
      /**
       * Was this content synthesized by a generative model?
       */
      ai_generated?: CompositeScores.AIGenerated;

      /**
       * Does the document's content agree with itself (checksums, arithmetic,
       * machine-readable zones)?
       */
      document_coherence?: CompositeScores.DocumentCoherence;

      /**
       * Does the file's provenance / toolchain history look suspicious? Advisory:
       * individually weak workflow-hygiene signals
       */
      document_metadata?: CompositeScores.DocumentMetadata;

      /**
       * Has this asset (or its template) been seen in fraud before?
       */
      known_fraud?: CompositeScores.KnownFraud;

      /**
       * Was this document altered after creation (splice, retype, redact, inpaint)?
       */
      manually_edited?: CompositeScores.ManuallyEdited;

      /**
       * Was the document captured through a channel that destroys forensic evidence
       * (photo of a screen, print-then-rescan)?
       */
      recapture?: CompositeScores.Recapture;
    }

    export namespace CompositeScores {
      /**
       * Was this content synthesized by a generative model?
       */
      export interface AIGenerated {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Does the document's content agree with itself (checksums, arithmetic,
       * machine-readable zones)?
       */
      export interface DocumentCoherence {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Does the file's provenance / toolchain history look suspicious? Advisory:
       * individually weak workflow-hygiene signals
       */
      export interface DocumentMetadata {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Has this asset (or its template) been seen in fraud before?
       */
      export interface KnownFraud {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Was this document altered after creation (splice, retype, redact, inpaint)?
       */
      export interface ManuallyEdited {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }

      /**
       * Was the document captured through a channel that destroys forensic evidence
       * (photo of a screen, print-then-rescan)?
       */
      export interface Recapture {
        /**
         * Whether the checks feeding this composite ran on this document. When false the
         * document was not checked for this — not cleared of it
         */
        applicable?: boolean;

        /**
         * Score (0 to 1); null when the composite was not applicable
         */
        score?: number | null;
      }
    }

    /**
     * Rendered pixel size of a page — the coordinate space region bboxes use, so the
     * UI can scale the suspect-region overlay onto the displayed page.
     */
    export interface PageDimension {
      /**
       * Rendered page height in pixels
       */
      height: number;

      /**
       * 0-based page index (0 for standalone images)
       */
      page: number;

      /**
       * Rendered page width in pixels
       */
      width: number;
    }

    /**
     * A region that led to the suspected fraud, with why it is suspect.
     *
     * A curated, high-signal subset of `regions`: reviewer-dismissed candidates are
     * dropped and the remainder is ranked by suspicion, so consumers can act on
     * `verdict` + `confidence` + this list without reading the raw signals.
     */
    export interface SuspectRegion {
      /**
       * Region bounding box as [x, y, w, h] in page-render pixels
       */
      bbox: Array<number>;

      /**
       * Human-readable explanation of what makes this region suspect
       */
      explanation: string;

      /**
       * Kind of anomaly detected in this region
       */
      kind: string;

      /**
       * 0-based page index (0 for standalone images)
       */
      page: number;

      /**
       * Suspicion score for this region (0 to 1)
       */
      score: number;

      /**
       * Detector that flagged this region
       */
      source: string;

      /**
       * Whether this region is part of the small set of decisive evidence behind the
       * verdict — the boxes a reviewer should look at first
       */
      primary?: boolean;

      /**
       * Automated reviewer verdict for this region (confirmed, dismissed, unsure, or
       * empty). A dismissed region can still be surfaced when it is the only place to
       * look; this label says how to read it
       */
      review?: string;
    }
  }
}

/**
 * Raw per-signal detail for a completed Verify job.
 *
 * Forensic drill-down behind the simplified result: the full evidence list,
 * per-family sub-scores, raw localized regions, and heatmap overlays.
 */
export interface VerifyGetDetailsResponse {
  /**
   * ID of the Verify job
   */
  job_id: string;

  /**
   * Checks that could not run on this job (with the reason). A check listed here
   * produced no findings because it could not run, not because the document is clean
   */
  degraded_tools?: Array<VerifyGetDetailsResponse.DegradedTool>;

  /**
   * Evidence items produced by detection tools
   */
  evidence?: Array<VerifyGetDetailsResponse.Evidence>;

  /**
   * Per-page forensic heatmap overlays as presigned image URLs
   */
  heatmaps?: Array<VerifyGetDetailsResponse.Heatmap>;

  /**
   * Rendered pixel size per page, so region bboxes can be scaled onto the page
   */
  page_dimensions?: Array<VerifyGetDetailsResponse.PageDimension>;

  /**
   * Suspicious regions localized on rendered pages
   */
  regions?: Array<VerifyGetDetailsResponse.Region>;

  /**
   * Per-family scores (metadata, ai_generation, splicing, copy_move, compression,
   * noise, coherence, pdf_structure)
   */
  sub_scores?: { [key: string]: number };
}

export namespace VerifyGetDetailsResponse {
  /**
   * A check that was attempted but could not run on this job.
   */
  export interface DegradedTool {
    /**
     * Name of the check
     */
    tool: string;

    /**
     * Why the check could not run
     */
    reason?: string;
  }

  /**
   * A single piece of evidence produced by a detection tool.
   */
  export interface Evidence {
    /**
     * Machine-readable evidence code
     */
    code: string;

    /**
     * Human-readable evidence detail
     */
    detail: string;

    /**
     * Signal family (e.g. metadata, splicing, compression)
     */
    family: string;

    /**
     * Evidence strength score
     */
    score: number;

    /**
     * Tool that produced this evidence
     */
    tool: string;

    /**
     * Tool-specific structured payload
     */
    data?: { [key: string]: unknown };

    /**
     * Whether this is hard (conclusive) evidence
     */
    hard?: boolean;
  }

  /**
   * A per-page forensic heatmap overlay, as a presigned image URL.
   */
  export interface Heatmap {
    /**
     * The time at which the presigned URL expires
     */
    expires_at: string;

    /**
     * Producing signal, e.g. double_compression, ela, noise
     */
    kind: string;

    /**
     * 0-based page index (0 for standalone images)
     */
    page: number;

    /**
     * Presigned URL to the heatmap PNG (page overlay)
     */
    url: string;

    /**
     * Producing tool's max score (for ranking)
     */
    score?: number;
  }

  /**
   * Rendered pixel size of a page — the coordinate space region bboxes use, so the
   * UI can scale the suspect-region overlay onto the displayed page.
   */
  export interface PageDimension {
    /**
     * Rendered page height in pixels
     */
    height: number;

    /**
     * 0-based page index (0 for standalone images)
     */
    page: number;

    /**
     * Rendered page width in pixels
     */
    width: number;
  }

  /**
   * A suspicious region localized on a rendered page.
   */
  export interface Region {
    /**
     * Region bounding box as [x, y, w, h] in page-render pixels
     */
    bbox: Array<number>;

    /**
     * Human-readable detail about the region
     */
    detail: string;

    /**
     * Kind of anomaly detected in this region
     */
    kind: string;

    /**
     * 0-based page index (0 for standalone images)
     */
    page: number;

    /**
     * Region-level doctoring likelihood score
     */
    score: number;

    /**
     * Detector/tool that produced this region
     */
    source: string;

    /**
     * Whether this region is part of the small set of decisive evidence behind the
     * verdict — the boxes a reviewer should look at first
     */
    primary?: boolean;

    /**
     * Review status/verdict for this region
     */
    review?: string;

    /**
     * Free-form review note for this region
     */
    review_note?: string;
  }
}

export interface VerifyListParams extends PaginatedCursorParams {
  /**
   * Include items created at or after this timestamp (inclusive)
   */
  created_at_on_or_after?: string | null;

  /**
   * Include items created at or before this timestamp (inclusive)
   */
  created_at_on_or_before?: string | null;

  /**
   * Optional fields to include (e.g. `result`).
   */
  expand?: Array<string>;

  /**
   * Filter by specific job IDs
   */
  job_ids?: Array<string> | null;

  organization_id?: string | null;

  project_id?: string | null;

  /**
   * Filter by job status
   */
  status?: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING' | null;
}

export interface VerifyCreateParams {
  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Configuration for a Verify job.
   */
  configuration?: VerifyCreateParams.Configuration | null;

  /**
   * @deprecated Body param: Deprecated: use file_input instead
   */
  file_id?: string | null;

  /**
   * Body param: File ID of the document to analyze
   */
  file_input?: string | null;

  /**
   * Body param: Idempotency key scoped to the project. Reusing a key returns the
   * original job; the new request body is ignored.
   */
  transaction_id?: string | null;

  /**
   * Body param: IDs of saved webhook configurations to notify for this job.
   */
  webhook_configuration_ids?: Array<string> | null;

  /**
   * Body param: Outbound webhook endpoints to notify on job status changes
   */
  webhook_configurations?: Array<VerifyCreateParams.WebhookConfiguration> | null;
}

export namespace VerifyCreateParams {
  /**
   * Configuration for a Verify job.
   */
  export interface Configuration {
    /**
     * Comma-separated page numbers or ranges to analyze (1-based). Omit to analyze all
     * pages. Ignored for non-PDF inputs.
     */
    target_pages?: string | null;

    /**
     * Verify tier: 'fast' runs only the quick deterministic forensic checks (metadata,
     * content integrity, container structure, pixel statistics); 'agentic' (default)
     * runs the full pipeline including the learned detectors and the semantic review
     * pass.
     */
    tier?: 'agentic' | 'fast';
  }

  /**
   * Configuration for a single outbound webhook endpoint.
   */
  export interface WebhookConfiguration {
    /**
     * Events to subscribe to (e.g. 'parse.success', 'extract.error'). If null, all
     * events are delivered.
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
      | 'verify.cancelled'
      | 'verify.error'
      | 'verify.pending'
      | 'verify.running'
      | 'verify.success'
    > | null;

    /**
     * Custom HTTP headers sent with each webhook request (e.g. auth tokens)
     */
    webhook_headers?: { [key: string]: string } | null;

    /**
     * Response format sent to the webhook: 'string' (default) or 'json'
     */
    webhook_output_format?: string | null;

    /**
     * Shared signing secret used to sign webhook deliveries. When set, each request
     * includes an HMAC-SHA256 signature of the request body in the 'LC-Signature'
     * header (value 'sha256=<hex>'). Recompute the HMAC over the raw request body with
     * this secret to verify the delivery is authentic.
     */
    webhook_signing_secret?: string | null;

    /**
     * URL to receive webhook POST notifications
     */
    webhook_url?: string | null;
  }
}

export interface VerifyGetParams {
  /**
   * Optional fields to include (e.g. `result`).
   */
  expand?: Array<string>;

  organization_id?: string | null;

  project_id?: string | null;
}

export interface VerifyCancelParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface VerifyGetDetailsParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export declare namespace Verify {
  export {
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
