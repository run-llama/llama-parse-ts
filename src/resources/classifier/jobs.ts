// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ParsingAPI from '../parsing';

export class Jobs extends APIResource {}

/**
 * A rule for classifying documents - v0 simplified version.
 *
 * This represents a single classification rule that will be applied to documents.
 * All rules are content-based and use natural language descriptions.
 */
export interface ClassifierRule {
  /**
   * Natural language description of what to classify. Be specific about the content
   * characteristics that identify this document type.
   */
  description: string;

  /**
   * The document type to assign when this rule matches (e.g., 'invoice', 'receipt',
   * 'contract')
   */
  type: string;
}

/**
 * A classify job.
 */
export interface ClassifyJob {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * The ID of the project
   */
  project_id: string;

  /**
   * The rules to classify the files
   */
  rules: Array<ClassifierRule>;

  /**
   * The status of the classify job
   */
  status: ParsingAPI.StatusEnum;

  /**
   * The ID of the user
   */
  user_id: string;

  /**
   * Creation datetime
   */
  created_at?: string | null;

  effective_at?: string;

  /**
   * Error message for the latest job attempt, if any.
   */
  error_message?: string | null;

  /**
   * The job record ID associated with this status, if any.
   */
  job_record_id?: string | null;

  /**
   * The classification mode to use
   */
  mode?: 'FAST' | 'MULTIMODAL';

  /**
   * The configuration for the parsing job
   */
  parsing_configuration?: ClassifyParsingConfiguration;

  /**
   * Update datetime
   */
  updated_at?: string | null;
}

/**
 * Parsing configuration for a classify job.
 */
export interface ClassifyParsingConfiguration {
  /**
   * The language to parse the files in
   */
  lang?: ParsingAPI.ParsingLanguages;

  /**
   * The maximum number of pages to parse
   */
  max_pages?: number | null;

  /**
   * The pages to target for parsing (0-indexed, so first page is at 0)
   */
  target_pages?: Array<number> | null;
}

export declare namespace Jobs {
  export {
    type ClassifierRule as ClassifierRule,
    type ClassifyJob as ClassifyJob,
    type ClassifyParsingConfiguration as ClassifyParsingConfiguration,
  };
}
