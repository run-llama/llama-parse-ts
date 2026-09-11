// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ParsingAPI from './parsing';
import * as SplitAPI from './beta/split';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedCursor, type PaginatedCursorParams } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Configurations extends APIResource {
  /**
   * Upsert a product configuration; updates if one with the same name + product
   * type + project exists, otherwise creates.
   */
  create(params: ConfigurationCreateParams, options?: RequestOptions): APIPromise<ConfigurationResponse> {
    const { organization_id, project_id, ...body } = params;
    return this._client.post('/api/v1/beta/configurations', {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * List product configurations for the current project.
   */
  list(
    query: ConfigurationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ConfigurationResponsesPaginatedCursor, ConfigurationResponse> {
    return this._client.getAPIList('/api/v1/beta/configurations', PaginatedCursor<ConfigurationResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Get a single product configuration by ID.
   */
  retrieve(
    configID: string,
    query: ConfigurationRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConfigurationResponse> {
    return this._client.get(path`/api/v1/beta/configurations/${configID}`, { query, ...options });
  }

  /**
   * Update an existing product configuration.
   */
  update(
    configID: string,
    params: ConfigurationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ConfigurationResponse> {
    const { organization_id, project_id, ...body } = params;
    return this._client.put(path`/api/v1/beta/configurations/${configID}`, {
      query: { organization_id, project_id },
      body,
      ...options,
    });
  }

  /**
   * Delete a product configuration.
   */
  delete(
    configID: string,
    params: ConfigurationDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { organization_id, project_id } = params ?? {};
    return this._client.delete(path`/api/v1/beta/configurations/${configID}`, {
      query: { organization_id, project_id },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type ConfigurationResponsesPaginatedCursor = PaginatedCursor<ConfigurationResponse>;

/**
 * Typed parameters for a _classify v2_ product configuration.
 */
export interface ClassifyV2Parameters {
  /**
   * Product type.
   */
  product_type: 'classify_v2';

  /**
   * Classify rules to evaluate against the document (at least one required)
   */
  rules: Array<ClassifyV2Parameters.Rule>;

  /**
   * Classify execution mode
   */
  mode?: 'FAST';

  /**
   * Parsing configuration for classify jobs.
   */
  parsing_configuration?: ClassifyV2Parameters.ParsingConfiguration | null;
}

export namespace ClassifyV2Parameters {
  /**
   * A rule for classifying documents.
   */
  export interface Rule {
    /**
     * Natural language criteria for matching this rule
     */
    description: string;

    /**
     * Document type to assign when rule matches
     */
    type: string;
  }

  /**
   * Parsing configuration for classify jobs.
   */
  export interface ParsingConfiguration {
    /**
     * ISO 639-1 language code for the document
     */
    lang?: string;

    /**
     * Maximum number of pages to process. Omit for no limit.
     */
    max_pages?: number | null;

    /**
     * Comma-separated page numbers or ranges to process (1-based). Omit to process all
     * pages.
     */
    target_pages?: string | null;
  }
}

/**
 * Request body for creating a product configuration.
 */
export interface ConfigurationCreate {
  /**
   * Human-readable name for this configuration.
   */
  name: string;

  /**
   * Product-specific configuration parameters.
   */
  parameters:
    | ClassifyV2Parameters
    | ExtractV2Parameters
    | ParseV2Parameters
    | SplitV1Parameters
    | ConfigurationCreate.SpreadsheetV1Parameters
    | UntypedParameters;
}

export namespace ConfigurationCreate {
  /**
   * Typed parameters for a _spreadsheet v1_ product configuration.
   */
  export interface SpreadsheetV1Parameters {
    /**
     * Product type.
     */
    product_type: 'spreadsheet_v1';

    /**
     * A1 notation of the range to extract a single region from. If None, the entire
     * sheet is used.
     */
    extraction_range?: string | null;

    /**
     * Return a flattened dataframe when a detected table is recognized as
     * hierarchical.
     */
    flatten_hierarchical_tables?: boolean;

    /**
     * Deprecated: controlled by `tier`. Whether to generate additional metadata
     * (title, description) for each extracted region. Honored only on `agentic`.
     */
    generate_additional_metadata?: boolean;

    /**
     * Whether to include hidden cells when extracting regions from the spreadsheet.
     */
    include_hidden_cells?: boolean;

    /**
     * The names of the sheets to extract regions from. If empty, all sheets will be
     * processed.
     */
    sheet_names?: Array<string> | null;

    /**
     * Deprecated: controlled by `tier`. Optional specialization mode for
     * domain-specific extraction. Supported values: 'financial-standard',
     * 'financial-enhanced', 'financial-precise'. Default None uses the general-purpose
     * pipeline. Honored only on `agentic`.
     */
    specialization?: string | null;

    /**
     * Deprecated: controlled by `tier`. Influences how likely similar-looking regions
     * are merged into a single table. Honored only on `agentic`.
     */
    table_merge_sensitivity?: 'strong' | 'weak';

    /**
     * Spreadsheet extraction tier. `cost_effective` uses the rule-based/ML-only
     * pipeline; `agentic` uses the full pipeline.
     */
    tier?: 'agentic' | 'cost_effective';

    /**
     * Deprecated: controlled by `tier`. Enables experimental processing. Honored only
     * on `agentic`.
     */
    use_experimental_processing?: boolean;
  }
}

/**
 * Response schema for a single product configuration.
 */
export interface ConfigurationResponse {
  /**
   * Unique configuration ID.
   */
  id: string;

  /**
   * Configuration name.
   */
  name: string;

  /**
   * Product-specific configuration parameters.
   */
  parameters:
    | ClassifyV2Parameters
    | ExtractV2Parameters
    | ParseV2Parameters
    | SplitV1Parameters
    | ConfigurationResponse.SpreadsheetV1Parameters
    | UntypedParameters;

  /**
   * Product type.
   */
  product_type: 'classify_v2' | 'extract_v2' | 'parse_v2' | 'split_v1' | 'spreadsheet_v1' | 'unknown';

  /**
   * Version identifier (datetime string).
   */
  version: string;

  /**
   * Creation timestamp.
   */
  created_at?: string | null;

  /**
   * Last update timestamp.
   */
  updated_at?: string | null;
}

export namespace ConfigurationResponse {
  /**
   * Typed parameters for a _spreadsheet v1_ product configuration.
   */
  export interface SpreadsheetV1Parameters {
    /**
     * Product type.
     */
    product_type: 'spreadsheet_v1';

    /**
     * A1 notation of the range to extract a single region from. If None, the entire
     * sheet is used.
     */
    extraction_range?: string | null;

    /**
     * Return a flattened dataframe when a detected table is recognized as
     * hierarchical.
     */
    flatten_hierarchical_tables?: boolean;

    /**
     * Deprecated: controlled by `tier`. Whether to generate additional metadata
     * (title, description) for each extracted region. Honored only on `agentic`.
     */
    generate_additional_metadata?: boolean;

    /**
     * Whether to include hidden cells when extracting regions from the spreadsheet.
     */
    include_hidden_cells?: boolean;

    /**
     * The names of the sheets to extract regions from. If empty, all sheets will be
     * processed.
     */
    sheet_names?: Array<string> | null;

    /**
     * Deprecated: controlled by `tier`. Optional specialization mode for
     * domain-specific extraction. Supported values: 'financial-standard',
     * 'financial-enhanced', 'financial-precise'. Default None uses the general-purpose
     * pipeline. Honored only on `agentic`.
     */
    specialization?: string | null;

    /**
     * Deprecated: controlled by `tier`. Influences how likely similar-looking regions
     * are merged into a single table. Honored only on `agentic`.
     */
    table_merge_sensitivity?: 'strong' | 'weak';

    /**
     * Spreadsheet extraction tier. `cost_effective` uses the rule-based/ML-only
     * pipeline; `agentic` uses the full pipeline.
     */
    tier?: 'agentic' | 'cost_effective';

    /**
     * Deprecated: controlled by `tier`. Enables experimental processing. Honored only
     * on `agentic`.
     */
    use_experimental_processing?: boolean;
  }
}

/**
 * Typed parameters for an _extract v2_ product configuration.
 */
export interface ExtractV2Parameters {
  /**
   * JSON Schema defining the fields to extract. Validate with the /schema/validate
   * endpoint first.
   */
  data_schema: {
    [key: string]: { [key: string]: unknown } | Array<unknown> | string | number | boolean | null;
  };

  /**
   * Product type.
   */
  product_type: 'extract_v2';

  /**
   * Include citations in results. Returned under `extract_metadata` (auto-included
   * when set). Text-level on `turbo` (no bounding boxes).
   */
  cite_sources?: boolean;

  /**
   * Include confidence scores in results. Returned under `extract_metadata`
   * (auto-included when set).
   */
  confidence_scores?: boolean;

  /**
   * Disable reuse and storage of Extract results
   */
  disable_cache?: boolean;

  /**
   * Granularity of extraction: per_doc returns one object per document, per_page
   * returns one object per page, per_table_row returns one object per table row
   */
  extraction_target?: 'per_doc' | 'per_page' | 'per_table_row';

  /**
   * Maximum number of pages to process. Omit for no limit.
   */
  max_pages?: number | null;

  /**
   * Saved parse configuration ID to control how the document is parsed before
   * extraction. Turbo extract does not support parse configuration or produce a
   * parse output; use another tier if your workflow requires parsed text.
   */
  parse_config_id?: string | null;

  /**
   * Parse tier to use before extraction. Defaults to the extract tier if not
   * specified. Turbo extract does not support parse configuration or produce a parse
   * output; use another tier if your workflow requires parsed text.
   */
  parse_tier?: 'agentic' | 'agentic_plus' | 'cost_effective' | 'fast' | null;

  /**
   * Optional worksheet names to extract when spreadsheet_mode is on. Overrides
   * target_pages for spreadsheets; omit to extract every sheet. Names are matched
   * exactly (case-sensitive) — pass them as a list, e.g. ["Sheet 1", "My Sheet"].
   */
  sheet_names?: Array<string> | null;

  /**
   * Beta. When true, extract structured data directly from a spreadsheet workbook
   * (.xlsx/.xls/.csv) — the agent reads cells straight from the workbook instead of
   * the standard document path. Off by default (spreadsheets keep the standard
   * path). Requires the agentic_plus tier. Billed on the standard per-page extract
   * rate, against a page count derived from workbook size. Citations and confidence
   * scores are not available in this mode.
   */
  spreadsheet_mode?: boolean;

  /**
   * Custom system prompt to guide extraction behavior
   */
  system_prompt?: string | null;

  /**
   * Comma-separated page numbers or ranges to process (1-based). Omit to process all
   * pages.
   */
  target_pages?: string | null;

  /**
   * Extract tier: cost_effective (5 credits/page), agentic (15 credits/page),
   * agentic_plus (50 credits/page), or turbo (35 credits/page)
   */
  tier?: 'agentic' | 'agentic_plus' | 'cost_effective' | 'turbo';

  /**
   * Use 'latest' for the latest release for the selected tier or a date string
   * (YYYY-MM-DD format) to pin to the nearest release at or before that date. Job
   * responses always report the concrete resolved version the job runs, fixed at job
   * creation; saved configurations keep the value as provided.
   */
  version?: string;
}

/**
 * Configuration for LlamaParse v2 document parsing.
 *
 * Includes tier selection, processing options, output formatting, page targeting,
 * and webhook delivery. Refer to the LlamaParse documentation for details on each
 * field.
 */
export interface ParseV2Parameters {
  /**
   * Product type.
   */
  product_type: 'parse_v2';

  /**
   * Parsing tier: 'fast' (rule-based, cheapest), 'cost_effective' (balanced),
   * 'agentic' (AI-powered with custom prompts), or 'agentic_plus' (premium AI with
   * highest accuracy)
   */
  tier: 'agentic' | 'agentic_plus' | 'cost_effective' | 'fast';

  /**
   * Version for the selected tier. Use `latest`, or pin one of that tier's dated
   * versions.
   *
   * Current `latest` by tier:
   *
   * - `fast`: `2026-06-15`
   * - `cost_effective`: `2026-08-19`
   * - `agentic`: `2026-09-09`
   * - `agentic_plus`: `2026-09-11`
   *
   * Full list: `GET /api/v2/parse/versions`.
   */
  version: 'latest' | '2026-09-11' | '2026-09-09' | '2026-08-19' | '2026-06-15' | (string & {});

  /**
   * Options for AI-powered parsing tiers (cost_effective, agentic, agentic_plus).
   *
   * These options customize how the AI processes and interprets document content.
   * Only applicable when using non-fast tiers.
   */
  agentic_options?: ParseV2Parameters.AgenticOptions | null;

  /**
   * Identifier for the client/application making the request. Used for analytics and
   * debugging. Example: 'my-app-v2'
   */
  client_name?: string | null;

  /**
   * Crop boundaries to process only a portion of each page. Values are ratios 0-1
   * from page edges
   */
  crop_box?: ParseV2Parameters.CropBox;

  /**
   * Bypass result caching and force re-parsing. Use when document content may have
   * changed or you need fresh results
   */
  disable_cache?: boolean | null;

  /**
   * Options for fast tier parsing (rule-based, no AI).
   *
   * Fast tier uses deterministic algorithms for text extraction without AI
   * enhancement. It's the fastest and most cost-effective option, best suited for
   * simple documents with standard layouts. Currently has no configurable options
   * but reserved for future expansion.
   */
  fast_options?: unknown | null;

  /**
   * Format-specific options (HTML, PDF, spreadsheet, presentation). Applied based on
   * detected input file type
   */
  input_options?: ParseV2Parameters.InputOptions;

  /**
   * Output formatting options for markdown, text, and extracted images
   */
  output_options?: ParseV2Parameters.OutputOptions;

  /**
   * Page selection: limit total pages or specify exact pages to process
   */
  page_ranges?: ParseV2Parameters.PageRanges;

  /**
   * Job execution controls including timeouts and failure thresholds
   */
  processing_control?: ParseV2Parameters.ProcessingControl;

  /**
   * Document processing options including OCR, table extraction, and chart parsing
   */
  processing_options?: ParseV2Parameters.ProcessingOptions;

  /**
   * IDs of saved webhook configurations to notify for this job.
   */
  webhook_configuration_ids?: Array<string> | null;

  /**
   * Webhook endpoints for job status notifications. Multiple webhooks can be
   * configured for different events or services
   */
  webhook_configurations?: Array<ParseV2Parameters.WebhookConfiguration>;
}

export namespace ParseV2Parameters {
  /**
   * Options for AI-powered parsing tiers (cost_effective, agentic, agentic_plus).
   *
   * These options customize how the AI processes and interprets document content.
   * Only applicable when using non-fast tiers.
   */
  export interface AgenticOptions {
    /**
     * Custom instructions for the AI parser. Use to guide extraction behavior, specify
     * output formatting, or provide domain-specific context. Example: 'Extract
     * financial tables with currency symbols. Format dates as YYYY-MM-DD.'
     */
    custom_prompt?: string | null;
  }

  /**
   * Crop boundaries to process only a portion of each page. Values are ratios 0-1
   * from page edges
   */
  export interface CropBox {
    /**
     * Bottom boundary as ratio (0-1). 0=top edge, 1=bottom edge. Content below this
     * line is excluded
     */
    bottom?: number | null;

    /**
     * Left boundary as ratio (0-1). 0=left edge, 1=right edge. Content left of this
     * line is excluded
     */
    left?: number | null;

    /**
     * Right boundary as ratio (0-1). 0=left edge, 1=right edge. Content right of this
     * line is excluded
     */
    right?: number | null;

    /**
     * Top boundary as ratio (0-1). 0=top edge, 1=bottom edge. Content above this line
     * is excluded
     */
    top?: number | null;
  }

  /**
   * Format-specific options (HTML, PDF, spreadsheet, presentation). Applied based on
   * detected input file type
   */
  export interface InputOptions {
    /**
     * HTML/web page parsing options (applies to .html, .htm files)
     */
    html?: InputOptions.HTML;

    /**
     * Image parsing options (applies to .jpg, .jpeg, .png, .webp files)
     */
    image?: InputOptions.Image;

    /**
     * PDF-specific parsing options (applies to .pdf files)
     */
    pdf?: unknown;

    /**
     * Presentation parsing options (applies to .pptx, .ppt, .odp, .key files)
     */
    presentation?: InputOptions.Presentation;

    /**
     * Spreadsheet parsing options (applies to .xlsx, .xls, .csv, .ods files)
     */
    spreadsheet?: InputOptions.Spreadsheet;
  }

  export namespace InputOptions {
    /**
     * HTML/web page parsing options (applies to .html, .htm files)
     */
    export interface HTML {
      /**
       * Force all HTML elements to be visible by overriding CSS display/visibility
       * properties. Useful for parsing pages with hidden content or collapsed sections
       */
      make_all_elements_visible?: boolean | null;

      /**
       * Remove fixed-position elements (headers, footers, floating buttons) that appear
       * on every page render
       */
      remove_fixed_elements?: boolean | null;

      /**
       * Remove navigation elements (nav bars, sidebars, menus) to focus on main content
       */
      remove_navigation_elements?: boolean | null;
    }

    /**
     * Image parsing options (applies to .jpg, .jpeg, .png, .webp files)
     */
    export interface Image {
      /**
       * Detect documents photographed with a camera (e.g. phone scans of receipts or
       * forms), then crop, perspective-correct, and flatten uneven lighting and shadows
       * before parsing. Supports JPEG, PNG, WebP, and HEIC/HEIF inputs. Improves results
       * when the document is tilted or surrounded by background. Images that already
       * look like clean scans are left untouched
       */
      camera_photo_correction?: boolean | null;
    }

    /**
     * Presentation parsing options (applies to .pptx, .ppt, .odp, .key files)
     */
    export interface Presentation {
      /**
       * Extract content positioned outside the visible slide area. Some presentations
       * have hidden notes or content that extends beyond slide boundaries
       */
      out_of_bounds_content?: boolean | null;

      /**
       * Skip extraction of embedded chart data tables. When true, only the visual
       * representation of charts is captured, not the underlying data
       */
      skip_embedded_data?: boolean | null;
    }

    /**
     * Spreadsheet parsing options (applies to .xlsx, .xls, .csv, .ods files)
     */
    export interface Spreadsheet {
      /**
       * Detect and extract multiple tables within a single sheet. Useful when
       * spreadsheets contain several data regions separated by blank rows/columns
       */
      detect_sub_tables_in_sheets?: boolean | null;

      /**
       * Compute formula results instead of extracting formula text. Use when you need
       * calculated values rather than formula definitions
       */
      force_formula_computation_in_sheets?: boolean | null;

      /**
       * Parse hidden sheets in addition to visible ones. By default, hidden sheets are
       * skipped
       */
      include_hidden_sheets?: boolean | null;
    }
  }

  /**
   * Output formatting options for markdown, text, and extracted images
   */
  export interface OutputOptions {
    /**
     * Optional additional output artifacts to save alongside the primary parse output.
     * Each value opts in to generating and persisting one extra file; the empty list
     * (default) saves none. The three accepted values are: 'stripped_md' — per-page
     * markdown stripped of formatting (links, bold/italic, images, HTML), saved as
     * JSON for full-text-search indexing; fetch via
     * `expand=stripped_markdown_content_metadata`. 'concatenated_stripped_txt' — all
     * stripped pages concatenated into a single plain-text file with `\n\n---\n\n`
     * between pages, useful for feeding the document into search or embedding
     * pipelines as one blob; fetch via
     * `expand=concatenated_stripped_markdown_content_metadata`. 'word_bbox' — raw
     * word-level bounding boxes (one JSON object per word, with page number and
     * x/y/w/h coordinates) saved as JSONL, useful for highlighting or grounding
     * extracted answers back to the source document; fetch via
     * `expand=raw_words_content_metadata`.
     */
    additional_outputs?: Array<string>;

    /**
     * Extract the printed page number as it appears in the document (e.g., 'Page 5 of
     * 10', 'v', 'A-3'). Useful for referencing original page numbers
     */
    extract_printed_page_number?: boolean | null;

    /**
     * Bounding-box granularity levels to compute for the parse. 'word' computes one
     * bounding box per detected word; 'line' computes one per text line; 'cell'
     * computes one per table cell. Multiple levels can be requested. Empty list
     * (default) disables granular bboxes — only item-level layout boxes are returned
     * on the result. When set, the computed boxes are not inlined on the result items;
     * they are written to a separate `grounded_items` sidecar (JSONL, one row per
     * page) and exposed as `result_content_metadata.grounded_items` (a presigned
     * download URL) on the parse result. Each row matches the `GroundedJsonItem`
     * shape.
     */
    granular_bboxes?: Array<'cell' | 'line' | 'word'>;

    /**
     * Image categories to save: 'screenshot' (full page renders), 'embedded' (images
     * found within the document), 'layout' (cropped figures and diagrams). Defaults to
     * saving 'layout' when the output links to cropped images; pass [] to save none
     */
    images_to_save?: Array<'embedded' | 'layout' | 'screenshot'> | null;

    /**
     * Markdown formatting options including table styles and link annotations
     */
    markdown?: OutputOptions.Markdown;

    /**
     * Save a PDF copy of the parsed document, retrievable via
     * `expand=output_pdf_content_metadata`. Not produced for spreadsheet, plain-text,
     * or audio inputs
     */
    save_output_pdf?: boolean | null;

    /**
     * Spatial text output options for preserving document layout structure
     */
    spatial_text?: OutputOptions.SpatialText;

    /**
     * Options for exporting tables as XLSX spreadsheets
     */
    tables_as_spreadsheet?: OutputOptions.TablesAsSpreadsheet;
  }

  export namespace OutputOptions {
    /**
     * Markdown formatting options including table styles and link annotations
     */
    export interface Markdown {
      /**
       * Detect printed gutter line numbers and return their Markdown offsets
       */
      annotate_line_numbers?: boolean | null;

      /**
       * Add link annotations to markdown output in the format [text](url). When false,
       * only the link text is included
       */
      annotate_links?: boolean | null;

      /**
       * Extract Word-style revisions and comments into structured page output
       */
      annotate_revisions?: boolean | null;

      /**
       * Embed images directly in markdown as base64 data URIs instead of extracting them
       * as separate files. Useful for self-contained markdown output
       */
      inline_images?: boolean | null;

      /**
       * Table formatting options including markdown vs HTML format and merging behavior
       */
      tables?: Markdown.Tables;
    }

    export namespace Markdown {
      /**
       * Table formatting options including markdown vs HTML format and merging behavior
       */
      export interface Tables {
        /**
         * Remove extra whitespace padding in markdown table cells for more compact output
         */
        compact_markdown_tables?: boolean | null;

        /**
         * Separator string for multiline cell content in markdown tables. Example:
         * '&lt;br&gt;' to preserve line breaks, ' ' to join with spaces
         */
        markdown_table_multiline_separator?: string | null;

        /**
         * Automatically merge tables that span multiple pages into a single table. The
         * merged table appears on the first page with merged_from_pages metadata
         */
        merge_continued_tables?: boolean | null;

        /**
         * Output tables as markdown pipe tables instead of HTML &lt;table&gt; tags.
         * Markdown tables are simpler but cannot represent complex structures like merged
         * cells
         */
        output_tables_as_markdown?: boolean | null;
      }
    }

    /**
     * Spatial text output options for preserving document layout structure
     */
    export interface SpatialText {
      /**
       * Keep multi-column layouts intact instead of linearizing columns into sequential
       * text. Automatically enabled for non-fast tiers
       */
      do_not_unroll_columns?: boolean | null;

      /**
       * Maintain consistent text column alignment across page boundaries. Automatically
       * enabled for document-level parsing modes
       */
      preserve_layout_alignment_across_pages?: boolean | null;

      /**
       * Include text below the normal size threshold. Useful for footnotes, watermarks,
       * or fine print that might otherwise be filtered out
       */
      preserve_very_small_text?: boolean | null;
    }

    /**
     * Options for exporting tables as XLSX spreadsheets
     */
    export interface TablesAsSpreadsheet {
      /**
       * Whether this option is enabled
       */
      enable?: boolean | null;

      /**
       * Automatically generate descriptive sheet names from table context (headers,
       * surrounding text) instead of using generic names like 'Table_1'
       */
      guess_sheet_name?: boolean;
    }
  }

  /**
   * Page selection: limit total pages or specify exact pages to process
   */
  export interface PageRanges {
    /**
     * Maximum number of pages to process. Pages are processed in order starting from
     * page 1. If both max_pages and target_pages are set, target_pages takes
     * precedence
     */
    max_pages?: number | null;

    /**
     * Comma-separated list of specific pages to process using 1-based indexing.
     * Supports individual pages and ranges. Examples: '1,3,5' (pages 1, 3, 5), '1-5'
     * (pages 1 through 5 inclusive), '1,3,5-8,10' (pages 1, 3, 5-8, and 10). Pages are
     * sorted and deduplicated automatically. Duplicate pages cause an error
     */
    target_pages?: string | null;
  }

  /**
   * Job execution controls including timeouts and failure thresholds
   */
  export interface ProcessingControl {
    /**
     * Quality thresholds that determine when a job should fail vs complete with
     * partial results
     */
    job_failure_conditions?: ProcessingControl.JobFailureConditions;

    /**
     * Timeout settings for job execution. Increase for large or complex documents
     */
    timeouts?: ProcessingControl.Timeouts;
  }

  export namespace ProcessingControl {
    /**
     * Quality thresholds that determine when a job should fail vs complete with
     * partial results
     */
    export interface JobFailureConditions {
      /**
       * Maximum ratio of pages allowed to fail before the job fails (0-1). Example: 0.1
       * means job fails if more than 10% of pages fail. Default is 0.05 (5%)
       */
      allowed_page_failure_ratio?: number | null;

      /**
       * Fail the job if a problematic font is detected that may cause incorrect text
       * extraction. Buggy fonts can produce garbled or missing characters
       */
      fail_on_buggy_font?: boolean | null;

      /**
       * Fail the entire job if any embedded image cannot be extracted. By default, image
       * extraction errors are logged but don't fail the job
       */
      fail_on_image_extraction_error?: boolean | null;

      /**
       * Fail the entire job if OCR fails on any image. By default, OCR errors result in
       * empty text for that image
       */
      fail_on_image_ocr_error?: boolean | null;

      /**
       * Fail the entire job if markdown cannot be reconstructed for any page. By
       * default, failed pages use fallback text extraction
       */
      fail_on_markdown_reconstruction_error?: boolean | null;
    }

    /**
     * Timeout settings for job execution. Increase for large or complex documents
     */
    export interface Timeouts {
      /**
       * Base timeout for the job in seconds (max 7200 = 2 hours). This is the minimum
       * time allowed regardless of document size
       */
      base_in_seconds?: number | null;

      /**
       * Additional timeout per page in seconds (max 300 = 5 minutes). Total timeout =
       * base + (this value × page count)
       */
      extra_time_per_page_in_seconds?: number | null;
    }
  }

  /**
   * Document processing options including OCR, table extraction, and chart parsing
   */
  export interface ProcessingOptions {
    /**
     * Use aggressive heuristics to detect table boundaries, even without visible
     * borders. Useful for documents with borderless or complex tables
     */
    aggressive_table_extraction?: boolean | null;

    /**
     * Conditional processing rules that apply different parsing options based on page
     * content, document structure, or filename patterns. Each entry defines trigger
     * conditions and the parsing configuration to apply when triggered
     */
    auto_mode_configuration?: Array<ProcessingOptions.AutoModeConfiguration> | null;

    /**
     * Confidence scoring effort. Omit for standard scoring. 'high': more accurate
     * assessment of the parsing quality of every page, plus a document-level score in
     * the result metadata; costs an additional 5 credits per page
     */
    confidence_score_effort?: 'high' | null;

    /**
     * Cost optimizer configuration for reducing parsing costs on simpler pages.
     *
     * When enabled, the parser analyzes each page and routes simpler pages to faster,
     * cheaper processing while preserving quality for complex pages. Only works with
     * 'agentic' or 'agentic_plus' tiers.
     */
    cost_optimizer?: ProcessingOptions.CostOptimizer | null;

    /**
     * Disable automatic heuristics including outlined table extraction and adaptive
     * long table handling. Use when heuristics produce incorrect results
     */
    disable_heuristics?: boolean | null;

    /**
     * Beta: set to 'enrich' to run an additional AI form-analysis pass on pages
     * detected as forms, producing a structured tree of the form's sections, fields,
     * and fillable grids. Retrieve the result with expand=forms. 'default' (the
     * default) applies standard parsing with no extra pass. Not available on the fast
     * tier
     */
    forms?: 'default' | 'enrich' | null;

    /**
     * Options for ignoring specific text types (diagonal, hidden, text in images)
     */
    ignore?: ProcessingOptions.Ignore;

    /**
     * OCR configuration including language detection settings
     */
    ocr_parameters?: ProcessingOptions.OcrParameters;

    /**
     * Enable AI-powered chart analysis. Modes: 'efficient' (fast, lower cost),
     * 'agentic' (balanced), 'agentic_plus' (highest accuracy). Automatically enables
     * extract_layout and precise_bounding_box when set
     */
    specialized_chart_parsing?: 'agentic' | 'agentic_plus' | 'efficient' | null;
  }

  export namespace ProcessingOptions {
    /**
     * A single auto mode rule with trigger conditions and parsing configuration.
     *
     * Auto mode allows conditional parsing where different configurations are applied
     * based on page content, structure, or filename. When triggers match, the
     * parsing_conf overrides default settings for that page.
     */
    export interface AutoModeConfiguration {
      /**
       * Parsing configuration to apply when trigger conditions are met
       */
      parsing_conf: AutoModeConfiguration.ParsingConf;

      /**
       * Single glob pattern to match against filename
       */
      filename_match_glob?: string | null;

      /**
       * List of glob patterns to match against filename
       */
      filename_match_glob_list?: Array<string> | null;

      /**
       * Regex pattern to match against filename
       */
      filename_regexp?: string | null;

      /**
       * Regex mode flags (e.g., 'i' for case-insensitive)
       */
      filename_regexp_mode?: string | null;

      /**
       * Trigger if page contains a full-page image (scanned page detection)
       */
      full_page_image_in_page?: boolean | null;

      /**
       * Threshold for full page image detection (0.0-1.0, default 0.8)
       */
      full_page_image_in_page_threshold?: number | string | null;

      /**
       * Trigger if page contains non-screenshot images
       */
      image_in_page?: boolean | null;

      /**
       * Trigger if page contains this layout element type
       */
      layout_element_in_page?: string | null;

      /**
       * Confidence threshold for layout element detection
       */
      layout_element_in_page_confidence_threshold?: number | string | null;

      /**
       * Trigger if page has more than N charts
       */
      page_contains_at_least_n_charts?: number | string | null;

      /**
       * Trigger if page has more than N images
       */
      page_contains_at_least_n_images?: number | string | null;

      /**
       * Trigger if page has more than N layout elements
       */
      page_contains_at_least_n_layout_elements?: number | string | null;

      /**
       * Trigger if page has more than N lines
       */
      page_contains_at_least_n_lines?: number | string | null;

      /**
       * Trigger if page has more than N links
       */
      page_contains_at_least_n_links?: number | string | null;

      /**
       * Trigger if page has more than N numeric words
       */
      page_contains_at_least_n_numbers?: number | string | null;

      /**
       * Trigger if page has more than N% numeric words
       */
      page_contains_at_least_n_percent_numbers?: number | string | null;

      /**
       * Trigger if page has more than N tables
       */
      page_contains_at_least_n_tables?: number | string | null;

      /**
       * Trigger if page has more than N words
       */
      page_contains_at_least_n_words?: number | string | null;

      /**
       * Trigger if page has fewer than N charts
       */
      page_contains_at_most_n_charts?: number | string | null;

      /**
       * Trigger if page has fewer than N images
       */
      page_contains_at_most_n_images?: number | string | null;

      /**
       * Trigger if page has fewer than N layout elements
       */
      page_contains_at_most_n_layout_elements?: number | string | null;

      /**
       * Trigger if page has fewer than N lines
       */
      page_contains_at_most_n_lines?: number | string | null;

      /**
       * Trigger if page has fewer than N links
       */
      page_contains_at_most_n_links?: number | string | null;

      /**
       * Trigger if page has fewer than N numeric words
       */
      page_contains_at_most_n_numbers?: number | string | null;

      /**
       * Trigger if page has fewer than N% numeric words
       */
      page_contains_at_most_n_percent_numbers?: number | string | null;

      /**
       * Trigger if page has fewer than N tables
       */
      page_contains_at_most_n_tables?: number | string | null;

      /**
       * Trigger if page has fewer than N words
       */
      page_contains_at_most_n_words?: number | string | null;

      /**
       * Trigger if page has more than N characters
       */
      page_longer_than_n_chars?: number | string | null;

      /**
       * Trigger on pages with markdown extraction errors
       */
      page_md_error?: boolean | null;

      /**
       * Trigger if page has fewer than N characters
       */
      page_shorter_than_n_chars?: number | string | null;

      /**
       * Regex pattern to match in page content
       */
      regexp_in_page?: string | null;

      /**
       * Regex mode flags for regexp_in_page
       */
      regexp_in_page_mode?: string | null;

      /**
       * Trigger if page contains a table
       */
      table_in_page?: boolean | null;

      /**
       * Trigger if page text/markdown contains this string
       */
      text_in_page?: string | null;

      /**
       * How to combine multiple trigger conditions: 'and' (all conditions must match,
       * this is the default) or 'or' (any single condition can trigger)
       */
      trigger_mode?: string | null;
    }

    export namespace AutoModeConfiguration {
      /**
       * Parsing configuration to apply when trigger conditions are met
       */
      export interface ParsingConf {
        /**
         * Whether to use adaptive long table handling
         */
        adaptive_long_table?: boolean | null;

        /**
         * Whether to use aggressive table extraction
         */
        aggressive_table_extraction?: boolean | null;

        /**
         * Crop box options for auto mode parsing configuration.
         */
        crop_box?: ParsingConf.CropBox | null;

        /**
         * Custom AI instructions for matched pages. Overrides the base custom_prompt
         */
        custom_prompt?: string | null;

        /**
         * Whether to extract layout information
         */
        extract_layout?: boolean | null;

        /**
         * Whether to use high resolution OCR
         */
        high_res_ocr?: boolean | null;

        /**
         * Ignore options for auto mode parsing configuration.
         */
        ignore?: ParsingConf.Ignore | null;

        /**
         * Primary language of the document
         */
        language?: string | null;

        /**
         * Whether to use outlined table extraction
         */
        outlined_table_extraction?: boolean | null;

        /**
         * Presentation-specific options for auto mode parsing configuration.
         */
        presentation?: ParsingConf.Presentation | null;

        /**
         * Spatial text options for auto mode parsing configuration.
         */
        spatial_text?: ParsingConf.SpatialText | null;

        /**
         * Enable specialized chart parsing with the specified mode
         */
        specialized_chart_parsing?: 'agentic' | 'agentic_plus' | 'efficient' | null;

        /**
         * Override the parsing tier for matched pages. Must be paired with version
         */
        tier?: 'agentic' | 'agentic_plus' | 'cost_effective' | 'fast' | null;

        /**
         * Version for the override tier. Required when `tier` is set. Use `latest`, or pin
         * one of that tier's dated versions.
         *
         * Current `latest` by tier:
         *
         * - `fast`: `2026-06-15`
         * - `cost_effective`: `2026-08-19`
         * - `agentic`: `2026-09-09`
         * - `agentic_plus`: `2026-09-11`
         *
         * Full list: `GET /api/v2/parse/versions`.
         */
        version?: 'latest' | '2026-09-11' | '2026-09-09' | '2026-08-19' | '2026-06-15' | (string & {}) | null;
      }

      export namespace ParsingConf {
        /**
         * Crop box options for auto mode parsing configuration.
         */
        export interface CropBox {
          /**
           * Bottom boundary of crop box as ratio (0-1)
           */
          bottom?: number | null;

          /**
           * Left boundary of crop box as ratio (0-1)
           */
          left?: number | null;

          /**
           * Right boundary of crop box as ratio (0-1)
           */
          right?: number | null;

          /**
           * Top boundary of crop box as ratio (0-1)
           */
          top?: number | null;
        }

        /**
         * Ignore options for auto mode parsing configuration.
         */
        export interface Ignore {
          /**
           * Whether to ignore diagonal text in the document
           */
          ignore_diagonal_text?: boolean | null;

          /**
           * Whether to ignore hidden text in the document
           */
          ignore_hidden_text?: boolean | null;
        }

        /**
         * Presentation-specific options for auto mode parsing configuration.
         */
        export interface Presentation {
          /**
           * Extract out of bounds content in presentation slides
           */
          out_of_bounds_content?: boolean | null;

          /**
           * Skip extraction of embedded data for charts in presentation slides
           */
          skip_embedded_data?: boolean | null;
        }

        /**
         * Spatial text options for auto mode parsing configuration.
         */
        export interface SpatialText {
          /**
           * Keep column structure intact without unrolling
           */
          do_not_unroll_columns?: boolean | null;

          /**
           * Preserve text alignment across page boundaries
           */
          preserve_layout_alignment_across_pages?: boolean | null;

          /**
           * Include very small text in spatial output
           */
          preserve_very_small_text?: boolean | null;
        }
      }
    }

    /**
     * Cost optimizer configuration for reducing parsing costs on simpler pages.
     *
     * When enabled, the parser analyzes each page and routes simpler pages to faster,
     * cheaper processing while preserving quality for complex pages. Only works with
     * 'agentic' or 'agentic_plus' tiers.
     */
    export interface CostOptimizer {
      /**
       * Enable cost-optimized parsing. Routes simpler pages to faster processing while
       * complex pages use full AI analysis. May reduce speed on some documents.
       * IMPORTANT: Only available with 'agentic' or 'agentic_plus' tiers
       */
      enable?: boolean | null;
    }

    /**
     * Options for ignoring specific text types (diagonal, hidden, text in images)
     */
    export interface Ignore {
      /**
       * Skip text rotated at an angle (not horizontal/vertical). Useful for ignoring
       * watermarks or decorative angled text
       */
      ignore_diagonal_text?: boolean | null;

      /**
       * Skip text marked as hidden in the document structure. Some PDFs contain
       * invisible text layers used for accessibility or search indexing
       */
      ignore_hidden_text?: boolean | null;

      /**
       * Skip OCR text extraction from embedded images. Use when images contain
       * irrelevant text (watermarks, logos) that shouldn't be in the output
       */
      ignore_text_in_image?: boolean | null;
    }

    /**
     * OCR configuration including language detection settings
     */
    export interface OcrParameters {
      /**
       * Languages to use for OCR text recognition. Specify multiple languages if
       * document contains mixed-language content. Order matters - put primary language
       * first. Example: ['en', 'es'] for English with Spanish
       */
      languages?: Array<ParsingAPI.ParsingLanguages> | null;
    }
  }

  /**
   * Webhook configuration for receiving parsing job notifications.
   *
   * Webhooks are called when specified events occur during job processing. Configure
   * multiple webhook configurations to send to different endpoints.
   */
  export interface WebhookConfiguration {
    /**
     * Events that trigger this webhook. Options: 'parse.success' (job completed),
     * 'parse.error' (job failed), 'parse.partial_success' (some pages failed),
     * 'parse.pending', 'parse.running', 'parse.cancelled'. If not specified, webhook
     * fires for all events
     */
    webhook_events?: Array<string> | null;

    /**
     * Custom HTTP headers to include in webhook requests. Use for authentication
     * tokens or custom routing. Example: {'Authorization': 'Bearer xyz'}
     */
    webhook_headers?: { [key: string]: unknown } | null;

    /**
     * Format of the webhook payload body. 'string' (default) sends the payload as a
     * JSON-encoded string; 'json' sends it as a JSON object.
     */
    webhook_output_format?: 'json' | 'string' | null;

    /**
     * Shared signing secret used to sign webhook deliveries. When set, each request
     * includes an HMAC-SHA256 signature of the request body in the 'LC-Signature'
     * header (value 'sha256=<hex>'). Recompute the HMAC over the raw request body with
     * this secret to verify the delivery is authentic.
     */
    webhook_signing_secret?: string | null;

    /**
     * HTTPS URL to receive webhook POST requests. Must be publicly accessible
     */
    webhook_url?: string | null;
  }
}

/**
 * Typed parameters for a _split v1_ product configuration.
 */
export interface SplitV1Parameters {
  /**
   * Categories to split documents into.
   */
  categories: Array<SplitAPI.SplitCategory>;

  /**
   * Product type.
   */
  product_type: 'split_v1';

  /**
   * Strategy for splitting documents.
   */
  splitting_strategy?: SplitV1Parameters.SplittingStrategy;
}

export namespace SplitV1Parameters {
  /**
   * Strategy for splitting documents.
   */
  export interface SplittingStrategy {
    /**
     * Controls handling of pages that don't match any category. 'include': pages can
     * be grouped as 'uncategorized' and included in results. 'forbid': all pages must
     * be assigned to a defined category. 'omit': pages can be classified as
     * 'uncategorized' but are excluded from results.
     */
    allow_uncategorized?: 'forbid' | 'include' | 'omit';

    /**
     * Free-form guidance for where segment boundaries are placed.
     */
    custom_instructions?: string | null;

    /**
     * Minimum pages per segment. Shorter segments are merged into an adjacent segment;
     * 1 disables merging.
     */
    min_pages_per_split?: number;
  }
}

/**
 * Catch-all for configurations without a dedicated typed schema.
 *
 * Accepts arbitrary JSON fields alongside `product_type`.
 */
export interface UntypedParameters {
  /**
   * Product type.
   */
  product_type: 'unknown';

  [k: string]: unknown;
}

export interface ConfigurationCreateParams {
  /**
   * Body param: Human-readable name for this configuration.
   */
  name: string;

  /**
   * Body param: Product-specific configuration parameters.
   */
  parameters:
    | ClassifyV2Parameters
    | ExtractV2Parameters
    | ParseV2Parameters
    | SplitV1Parameters
    | ConfigurationCreateParams.SpreadsheetV1Parameters
    | UntypedParameters;

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;
}

export namespace ConfigurationCreateParams {
  /**
   * Typed parameters for a _spreadsheet v1_ product configuration.
   */
  export interface SpreadsheetV1Parameters {
    /**
     * Product type.
     */
    product_type: 'spreadsheet_v1';

    /**
     * A1 notation of the range to extract a single region from. If None, the entire
     * sheet is used.
     */
    extraction_range?: string | null;

    /**
     * Return a flattened dataframe when a detected table is recognized as
     * hierarchical.
     */
    flatten_hierarchical_tables?: boolean;

    /**
     * Deprecated: controlled by `tier`. Whether to generate additional metadata
     * (title, description) for each extracted region. Honored only on `agentic`.
     */
    generate_additional_metadata?: boolean;

    /**
     * Whether to include hidden cells when extracting regions from the spreadsheet.
     */
    include_hidden_cells?: boolean;

    /**
     * The names of the sheets to extract regions from. If empty, all sheets will be
     * processed.
     */
    sheet_names?: Array<string> | null;

    /**
     * Deprecated: controlled by `tier`. Optional specialization mode for
     * domain-specific extraction. Supported values: 'financial-standard',
     * 'financial-enhanced', 'financial-precise'. Default None uses the general-purpose
     * pipeline. Honored only on `agentic`.
     */
    specialization?: string | null;

    /**
     * Deprecated: controlled by `tier`. Influences how likely similar-looking regions
     * are merged into a single table. Honored only on `agentic`.
     */
    table_merge_sensitivity?: 'strong' | 'weak';

    /**
     * Spreadsheet extraction tier. `cost_effective` uses the rule-based/ML-only
     * pipeline; `agentic` uses the full pipeline.
     */
    tier?: 'agentic' | 'cost_effective';

    /**
     * Deprecated: controlled by `tier`. Enables experimental processing. Honored only
     * on `agentic`.
     */
    use_experimental_processing?: boolean;
  }
}

export interface ConfigurationListParams extends PaginatedCursorParams {
  /**
   * Return only the latest version per configuration name.
   */
  latest_only?: boolean;

  /**
   * Filter by configuration name.
   */
  name?: string | null;

  organization_id?: string | null;

  /**
   * Filter by one or more product types. Repeat the parameter for multiple values.
   */
  product_type?: Array<
    'classify_v2' | 'extract_v2' | 'parse_v2' | 'split_v1' | 'spreadsheet_v1' | 'unknown'
  > | null;

  project_id?: string | null;
}

export interface ConfigurationRetrieveParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface ConfigurationUpdateParams {
  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Updated name (omit to leave unchanged).
   */
  name?: string | null;

  /**
   * Body param: Updated parameters (omit to leave unchanged).
   */
  parameters?:
    | ClassifyV2Parameters
    | ExtractV2Parameters
    | ParseV2Parameters
    | SplitV1Parameters
    | ConfigurationUpdateParams.SpreadsheetV1Parameters
    | UntypedParameters
    | null;
}

export namespace ConfigurationUpdateParams {
  /**
   * Typed parameters for a _spreadsheet v1_ product configuration.
   */
  export interface SpreadsheetV1Parameters {
    /**
     * Product type.
     */
    product_type: 'spreadsheet_v1';

    /**
     * A1 notation of the range to extract a single region from. If None, the entire
     * sheet is used.
     */
    extraction_range?: string | null;

    /**
     * Return a flattened dataframe when a detected table is recognized as
     * hierarchical.
     */
    flatten_hierarchical_tables?: boolean;

    /**
     * Deprecated: controlled by `tier`. Whether to generate additional metadata
     * (title, description) for each extracted region. Honored only on `agentic`.
     */
    generate_additional_metadata?: boolean;

    /**
     * Whether to include hidden cells when extracting regions from the spreadsheet.
     */
    include_hidden_cells?: boolean;

    /**
     * The names of the sheets to extract regions from. If empty, all sheets will be
     * processed.
     */
    sheet_names?: Array<string> | null;

    /**
     * Deprecated: controlled by `tier`. Optional specialization mode for
     * domain-specific extraction. Supported values: 'financial-standard',
     * 'financial-enhanced', 'financial-precise'. Default None uses the general-purpose
     * pipeline. Honored only on `agentic`.
     */
    specialization?: string | null;

    /**
     * Deprecated: controlled by `tier`. Influences how likely similar-looking regions
     * are merged into a single table. Honored only on `agentic`.
     */
    table_merge_sensitivity?: 'strong' | 'weak';

    /**
     * Spreadsheet extraction tier. `cost_effective` uses the rule-based/ML-only
     * pipeline; `agentic` uses the full pipeline.
     */
    tier?: 'agentic' | 'cost_effective';

    /**
     * Deprecated: controlled by `tier`. Enables experimental processing. Honored only
     * on `agentic`.
     */
    use_experimental_processing?: boolean;
  }
}

export interface ConfigurationDeleteParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export declare namespace Configurations {
  export {
    type ClassifyV2Parameters as ClassifyV2Parameters,
    type ConfigurationCreate as ConfigurationCreate,
    type ConfigurationResponse as ConfigurationResponse,
    type ExtractV2Parameters as ExtractV2Parameters,
    type ParseV2Parameters as ParseV2Parameters,
    type SplitV1Parameters as SplitV1Parameters,
    type UntypedParameters as UntypedParameters,
    type ConfigurationResponsesPaginatedCursor as ConfigurationResponsesPaginatedCursor,
    type ConfigurationCreateParams as ConfigurationCreateParams,
    type ConfigurationListParams as ConfigurationListParams,
    type ConfigurationRetrieveParams as ConfigurationRetrieveParams,
    type ConfigurationUpdateParams as ConfigurationUpdateParams,
    type ConfigurationDeleteParams as ConfigurationDeleteParams,
  };
}
