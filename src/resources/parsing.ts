// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ParsingAPI from './parsing';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedCursor, type PaginatedCursorParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';
import { type Uploadable } from '../core/uploads';
import { multipartFormRequestOptions } from '../internal/uploads';
import { pollUntilComplete, PollingOptions, DEFAULT_TIMEOUT } from '../core/polling';

export class Parsing extends APIResource {
  /**
   * Parse a file by file ID or URL.
   *
   * Provide either `file_id` (a previously uploaded file) or `source_url` (a
   * publicly accessible URL). Configure parsing with options like `tier`,
   * `target_pages`, and `lang`.
   *
   * ## Tiers
   *
   * - `fast` — rule-based, cheapest, no AI
   * - `cost_effective` — balanced speed and quality
   * - `agentic` — full AI-powered parsing
   * - `agentic_plus` — premium AI with specialized features
   *
   * The job runs asynchronously. Poll `GET /parse/{job_id}` with `expand=text` or
   * `expand=markdown` to retrieve results.
   *
   * @example
   * ```ts
   * const parsing = await client.parsing.create({
   *   tier: 'fast',
   *   version: 'latest',
   * });
   * ```
   */
  create(
    params: ParsingCreateParams & { upload_file?: Uploadable },
    options?: RequestOptions,
  ): APIPromise<ParsingCreateResponse> {
    const { organization_id, project_id, upload_file, ...body } = params;

    // If file is provided, use multipart upload endpoint
    if (upload_file) {
      // Prepare configuration as JSON string
      const configuration = JSON.stringify(body);

      return this._client.post(
        '/api/v2/parse/upload',
        multipartFormRequestOptions(
          {
            query: { organization_id, project_id },
            body: { configuration, file: upload_file },
            ...options,
          },
          this._client,
        ),
      );
    }

    // Otherwise use regular JSON endpoint
    return this._client.post('/api/v2/parse', { query: { organization_id, project_id }, body, ...options });
  }

  /**
   * Retrieve a parse job with optional expanded content.
   *
   * By default returns job metadata only. Use `expand` to include parsed content:
   *
   * - `text` — plain text output
   * - `markdown` — markdown output
   * - `items` — structured page-by-page output
   * - `job_metadata` — processing details
   * - `usage` — credits billed against the job
   *
   * Content metadata fields (e.g. `text_content_metadata`) return presigned URLs for
   * downloading large results.
   *
   * @example
   * ```ts
   * const parsing = await client.parsing.get('job_id');
   * ```
   */
  get(
    jobID: string,
    query: ParsingGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ParsingGetResponse> {
    return this._client.get(path`/api/v2/parse/${jobID}`, { query, ...options });
  }

  /**
   * List parse jobs for the current project.
   *
   * Filter by `status` or creation date range. Results are paginated — use
   * `page_token` from the response to fetch subsequent pages.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const parsingListResponse of client.parsing.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ParsingListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ParsingListResponsesPaginatedCursor, ParsingListResponse> {
    return this._client.getAPIList('/api/v2/parse', PaginatedCursor<ParsingListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Cancel a running parse job.
   *
   * Stops processing and marks the job as CANCELLED. Returns the updated job. Jobs
   * already in a terminal state (COMPLETED, FAILED, CANCELLED) cannot be cancelled.
   *
   * @example
   * ```ts
   * const response = await client.parsing.cancel('job_id');
   * ```
   */
  cancel(
    jobID: string,
    params: ParsingCancelParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ParsingCancelResponse> {
    const { organization_id, project_id } = params ?? {};
    return this._client.post(path`/api/v2/parse/${jobID}/cancel`, {
      query: { organization_id, project_id },
      ...options,
    });
  }

  /**
   * Delete a parse job and its results.
   *
   * The job must be in a terminal state (COMPLETED, FAILED, CANCELLED). Cancel a job
   * that is still running before deleting it.
   *
   * Returns the identifiers of the deleted job.
   *
   * @example
   * ```ts
   * const parsing = await client.parsing.delete('job_id');
   * ```
   */
  delete(
    jobID: string,
    params: ParsingDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ParsingDeleteResponse> {
    const { organization_id, project_id } = params ?? {};
    return this._client.delete(path`/api/v2/parse/${jobID}`, {
      query: { organization_id, project_id },
      ...options,
    });
  }

  /**
   * List the parse versions accepted by each tier and what `latest` resolves to.
   *
   * @example
   * ```ts
   * const response = await client.parsing.listVersions();
   * ```
   */
  listVersions(options?: RequestOptions): APIPromise<ParsingListVersionsResponse> {
    return this._client.get('/api/v2/parse/versions', options);
  }

  /**
   * Wait for a parse job to complete by polling until it reaches a terminal state.
   *
   * This method polls the job status at regular intervals until the job completes
   * successfully or fails. It uses configurable backoff strategies to optimize
   * polling behavior.
   *
   * @param jobID - The ID of the parse job to wait for
   * @param options - Polling configuration options
   * @returns The completed ParsingGetResponse
   * @throws {PollingTimeoutError} If the job doesn't complete within the timeout period
   * @throws {PollingError} If the job fails or is cancelled
   *
   * @example
   * ```typescript
   * import { LlamaCloud } from 'llama-cloud';
   *
   * const client = new LlamaCloud({ apiKey: '...' });
   *
   * // Create a parse job
   * const job = await client.parsing.create({
   *   tier: 'cost_effective',
   *   version: 'latest',
   *   source_url: 'https://example.com/document.pdf'
   * });
   *
   * // Wait for it to complete
   * const result = await client.parsing.waitForCompletion(
   *   job.id,
   *   { verbose: true }
   * );
   * ```
   */
  async waitForCompletion(
    jobID: string,
    query?: ParsingGetParams,
    options?: PollingOptions & RequestOptions,
  ): Promise<ParsingGetResponse> {
    const { pollingInterval, maxInterval, timeout, backoff, verbose, ...requestOptions } = options || {};

    const getStatus = async (): Promise<ParsingGetResponse> => {
      return await this.get(jobID, query, requestOptions);
    };

    const isComplete = (result: ParsingGetResponse): boolean => {
      return result.job.status === 'COMPLETED';
    };

    const isError = (result: ParsingGetResponse): boolean => {
      return result.job.status === 'FAILED' || result.job.status === 'CANCELLED';
    };

    const getErrorMessage = (result: ParsingGetResponse): string => {
      const errorParts = [`Job ${jobID} failed with status: ${result.job.status}`];
      if (result.job.error_message) {
        errorParts.push(`Error: ${result.job.error_message}`);
      }
      return errorParts.join(' | ');
    };

    return await pollUntilComplete(getStatus, isComplete, isError, getErrorMessage, {
      pollingInterval,
      maxInterval,
      timeout: timeout || DEFAULT_TIMEOUT,
      backoff,
      verbose,
    });
  }

  /**
   * Parse a file and wait for it to complete, returning the result.
   *
   * This is a convenience method that combines create() and waitForCompletion()
   * into a single call for the most common end-to-end workflow.
   *
   * @param params - Parse job creation parameters (including optional file for direct upload)
   * @param options - Polling configuration and request options
   * @returns The parse result (ParsingGetResponse) with job status and optional result data
   * @throws {PollingTimeoutError} If the job doesn't complete within the timeout period
   * @throws {PollingError} If the job fails or is cancelled
   *
   * @example
   * ```typescript
   * import { LlamaCloud } from 'llama-cloud';
   *
   * const client = new LlamaCloud({ apiKey: '...' });
   *
   * // One-shot: parse, wait for completion, and get result
   * const result = await client.parsing.parse({
   *   tier: 'cost_effective',
   *   version: 'latest',
   *   source_url: 'https://example.com/document.pdf',
   *   expand: ['text', 'markdown']
   * }, { verbose: true });
   *
   * // Result is ready to use immediately
   * console.log(result.text);
   * console.log(result.markdown);
   * ```
   *
   * @example
   * ```typescript
   * // Parse with file upload
   * import fs from 'fs';
   *
   * const result = await client.parsing.parse({
   *   tier: 'cost_effective',
   *   version: 'latest',
   *   upload_file: fs.createReadStream('./document.pdf'),
   *   expand: ['text', 'markdown']
   * });
   * ```
   */
  async parse(
    params: ParsingCreateParams & { upload_file?: Uploadable; expand?: Array<string> },
    options?: PollingOptions & RequestOptions,
  ): Promise<ParsingGetResponse> {
    const { expand, ...createParams } = params;
    const { pollingInterval, maxInterval, timeout, backoff, verbose, ...requestOptions } = options || {};

    if (!expand || (expand && expand.length == 0)) {
      throw new Error('you should pass a non-empty array as a parameter for `expand`');
    }

    // Create the parsing job
    const job = await this.create(createParams, requestOptions);

    // Build query params for get, only including defined values
    const getQuery: ParsingGetParams = {};
    if (params.organization_id !== undefined) {
      getQuery.organization_id = params.organization_id;
    }
    if (params.project_id !== undefined) {
      getQuery.project_id = params.project_id;
    }
    if (expand) {
      getQuery.expand = expand;
    }

    // Wait for completion and return the result with requested expansions
    return await this.waitForCompletion(job.id, getQuery, {
      pollingInterval,
      maxInterval,
      timeout: timeout || DEFAULT_TIMEOUT,
      backoff,
      verbose,
      ...requestOptions,
    });
  }
}

export type ParsingListResponsesPaginatedCursor = PaginatedCursor<ParsingListResponse>;

/**
 * Bounding box with coordinates and optional metadata.
 */
export interface BBox {
  /**
   * Height of the bounding box
   */
  h: number;

  /**
   * Width of the bounding box
   */
  w: number;

  /**
   * X coordinate of the bounding box
   */
  x: number;

  /**
   * Y coordinate of the bounding box
   */
  y: number;

  /**
   * Confidence score
   */
  confidence?: number | null;

  /**
   * End index in the text
   */
  end_index?: number | null;

  /**
   * Label for the bounding box
   */
  label?: string | null;

  /**
   * Optional visual text rotation angle in degrees. Omitted when unrotated.
   */
  r?: number | null;

  /**
   * Start index in the text
   */
  start_index?: number | null;
}

export interface CodeItem {
  /**
   * Markdown representation preserving formatting
   */
  md: string;

  /**
   * Code content
   */
  value: string;

  /**
   * List of bounding boxes
   */
  bbox?: Array<BBox> | null;

  /**
   * Programming language identifier
   */
  language?: string | null;

  /**
   * Code block item type
   */
  type?: 'code';
}

/**
 * Enum for representing the different available page error handling modes.
 */
export type FailPageMode = 'blank_page' | 'error_message' | 'raw_text';

export interface FooterItem {
  /**
   * List of items within the footer
   */
  items: Array<CodeItem | HeadingItem | ImageItem | LinkItem | ListItem | TableItem | TextItem>;

  /**
   * Markdown representation preserving formatting
   */
  md: string;

  /**
   * List of bounding boxes
   */
  bbox?: Array<BBox> | null;

  /**
   * Page footer container
   */
  type?: 'footer';
}

/**
 * One form detected on a page, in two representations of the same content.
 */
export interface Form {
  /**
   * Structured representation: an ordered tree of sections, fields, and tables
   */
  json: Array<FormField | FormSection | FormTable>;

  /**
   * Flattened list representation of the same content
   */
  list: FormListItem;
}

/**
 * One labeled form entry: a text input, checkbox, select group, or signature line.
 */
export interface FormField {
  /**
   * Kind of entry: text (any free-text input), checkbox, single_select,
   * multi_select, or signature
   */
  field: 'checkbox' | 'multi_select' | 'signature' | 'single_select' | 'text';

  /**
   * Field number/letter printed on the form (e.g. '1a'), if any
   */
  id?: string | null;

  /**
   * Bounding boxes of the field's fillable area on the page.
   */
  bbox?: Array<BBox> | null;

  /**
   * True for a printed-but-blank text field (mutually exclusive with value)
   */
  isEmpty?: boolean | null;

  /**
   * Printed field caption, if any
   */
  label?: string | null;

  /**
   * Form field node
   */
  type?: 'field';

  /**
   * Entered content: verbatim text for text fields, or a boolean for checkbox
   * (checked) and signature (signed). Absent on blank text fields and on select
   * groups
   */
  value?: string | boolean | null;

  /**
   * Options of a single_select/multi_select group (only on select fields)
   */
  valueItems?: Array<FormField | FormSection | FormTable> | null;
}

/**
 * The list representation of form content: nested lists of rendered field lines.
 */
export interface FormListItem {
  /**
   * Nested lines and sub-lists, in the form's reading order
   */
  items: Array<FormListTextItem | FormListItem>;

  /**
   * Markdown representation of this list
   */
  md: string;

  /**
   * Whether the list is ordered
   */
  ordered: boolean;

  /**
   * List node
   */
  type?: 'list';
}

/**
 * One line of a form's list representation.
 */
export interface FormListTextItem {
  /**
   * Markdown representation of the line
   */
  md: string;

  /**
   * Line content (e.g. '[1a] Wages: 29,513')
   */
  value: string;

  /**
   * Text line
   */
  type?: 'text';
}

/**
 * A grouping of form content, in the form's reading order.
 */
export interface FormSection {
  /**
   * Child form nodes in reading order
   */
  items: Array<FormField | FormSection | FormTable>;

  /**
   * Identifier printed on the form (e.g. 'Part III'), if any
   */
  id?: string | null;

  /**
   * Printed section heading, if any
   */
  label?: string | null;

  /**
   * Form section node
   */
  type?: 'section';
}

/**
 * A fillable grid printed on the form: repeating records or a row-by-column
 * matrix.
 */
export interface FormTable {
  /**
   * Table cells: a verbatim string, null for a printed-but-blank cell, or an object
   * holding the cell's own form nodes
   */
  rows: Array<Array<string | FormTableCellItems | null>>;

  /**
   * Identifier printed on the form, if any
   */
  id?: string | null;

  /**
   * Bounding boxes of the table's fillable regions on the page.
   */
  bbox?: Array<BBox> | null;

  /**
   * Printed column headers in order, if any
   */
  columns?: Array<string> | null;

  /**
   * Printed table caption, if any
   */
  label?: string | null;

  /**
   * Form table node
   */
  type?: 'table';
}

/**
 * A table cell holding its own form nodes (e.g. a checkbox column).
 */
export interface FormTableCellItems {
  /**
   * Form nodes inside the cell
   */
  items: Array<FormField | FormSection | FormTable>;
}

export interface HeaderItem {
  /**
   * List of items within the header
   */
  items: Array<CodeItem | HeadingItem | ImageItem | LinkItem | ListItem | TableItem | TextItem>;

  /**
   * Markdown representation preserving formatting
   */
  md: string;

  /**
   * List of bounding boxes
   */
  bbox?: Array<BBox> | null;

  /**
   * Page header container
   */
  type?: 'header';
}

export interface HeadingItem {
  /**
   * Heading level (1-6)
   */
  level: number;

  /**
   * Markdown representation preserving formatting
   */
  md: string;

  /**
   * Heading text content
   */
  value: string;

  /**
   * List of bounding boxes
   */
  bbox?: Array<BBox> | null;

  /**
   * Heading item type
   */
  type?: 'heading';
}

export interface ImageItem {
  /**
   * Image caption
   */
  caption: string;

  /**
   * Markdown representation preserving formatting
   */
  md: string;

  /**
   * URL to the image
   */
  url: string;

  /**
   * List of bounding boxes
   */
  bbox?: Array<BBox> | null;

  /**
   * Image item type
   */
  type?: 'image';
}

export interface LinkItem {
  /**
   * Markdown representation preserving formatting
   */
  md: string;

  /**
   * Display text of the link
   */
  text: string;

  /**
   * URL of the link
   */
  url: string;

  /**
   * List of bounding boxes
   */
  bbox?: Array<BBox> | null;

  /**
   * Link item type
   */
  type?: 'link';
}

export interface ListItem {
  /**
   * List of nested text or list items
   */
  items: Array<TextItem | ListItem>;

  /**
   * Markdown representation preserving formatting
   */
  md: string;

  /**
   * Whether the list is ordered or unordered
   */
  ordered: boolean;

  /**
   * List of bounding boxes
   */
  bbox?: Array<BBox> | null;

  /**
   * List item type
   */
  type?: 'list';
}

/**
 * Enum for supported file extensions.
 */
export type LlamaParseSupportedFileExtensions =
  | '.abw'
  | '.awt'
  | '.azw'
  | '.azw3'
  | '.azw4'
  | '.bmp'
  | '.cb7'
  | '.cbc'
  | '.cbr'
  | '.cbz'
  | '.cgm'
  | '.chm'
  | '.csv'
  | '.cwk'
  | '.dbf'
  | '.dif'
  | '.djvu'
  | '.doc'
  | '.docm'
  | '.docx'
  | '.dot'
  | '.dotm'
  | '.dotx'
  | '.epub'
  | '.et'
  | '.eth'
  | '.fb2'
  | '.fbz'
  | '.fodg'
  | '.fodp'
  | '.fods'
  | '.fodt'
  | '.fopd'
  | '.gif'
  | '.heic'
  | '.heif'
  | '.htm'
  | '.html'
  | '.htmlz'
  | '.hwp'
  | '.jpeg'
  | '.jpg'
  | '.key'
  | '.lit'
  | '.lrf'
  | '.lwp'
  | '.m4a'
  | '.mcw'
  | '.md'
  | '.mobi'
  | '.mp3'
  | '.mp4'
  | '.mpeg'
  | '.mpga'
  | '.mw'
  | '.mwd'
  | '.numbers'
  | '.odf'
  | '.odg'
  | '.odp'
  | '.ods'
  | '.odt'
  | '.otg'
  | '.otp'
  | '.ots'
  | '.ott'
  | '.pages'
  | '.pbd'
  | '.pdb'
  | '.pdf'
  | '.pml'
  | '.png'
  | '.pot'
  | '.potm'
  | '.potx'
  | '.ppt'
  | '.pptm'
  | '.pptx'
  | '.prc'
  | '.prn'
  | '.psw'
  | '.qpw'
  | '.rb'
  | '.rtf'
  | '.sda'
  | '.sdd'
  | '.sdp'
  | '.sdw'
  | '.sgl'
  | '.slk'
  | '.snb'
  | '.stc'
  | '.std'
  | '.sti'
  | '.stw'
  | '.svg'
  | '.sxc'
  | '.sxd'
  | '.sxg'
  | '.sxi'
  | '.sxm'
  | '.sxw'
  | '.sylk'
  | '.tcr'
  | '.tif'
  | '.tiff'
  | '.tsv'
  | '.txtz'
  | '.uof'
  | '.uop'
  | '.uos'
  | '.uos1'
  | '.uos2'
  | '.uot'
  | '.vdx'
  | '.vor'
  | '.vsd'
  | '.vsdm'
  | '.vsdx'
  | '.wav'
  | '.wb1'
  | '.wb2'
  | '.wb3'
  | '.webm'
  | '.webp'
  | '.wk1'
  | '.wk2'
  | '.wk3'
  | '.wk4'
  | '.wks'
  | '.wn'
  | '.wpd'
  | '.wps'
  | '.wpt'
  | '.wq1'
  | '.wq2'
  | '.wri'
  | '.xhtm'
  | '.xlr'
  | '.xls'
  | '.xlsb'
  | '.xlsm'
  | '.xlsx'
  | '.xlw'
  | '.xml'
  | '.yxmd'
  | '.zabw';

/**
 * A parse job (v1).
 */
export interface ParsingJob {
  /**
   * Unique parse job identifier
   */
  id: string;

  /**
   * Current job status
   */
  status: StatusEnum;

  /**
   * Machine-readable error code when failed
   */
  error_code?: string | null;

  /**
   * Human-readable error details when failed
   */
  error_message?: string | null;
}

/**
 * Enum for representing the languages supported by the parser.
 */
export type ParsingLanguages =
  | 'abq'
  | 'ady'
  | 'af'
  | 'ang'
  | 'ar'
  | 'as'
  | 'ava'
  | 'az'
  | 'be'
  | 'bg'
  | 'bgc'
  | 'bh'
  | 'bho'
  | 'bn'
  | 'bs'
  | 'ch_sim'
  | 'ch_tra'
  | 'che'
  | 'cs'
  | 'cy'
  | 'da'
  | 'dar'
  | 'de'
  | 'en'
  | 'es'
  | 'et'
  | 'fa'
  | 'fr'
  | 'ga'
  | 'gom'
  | 'hi'
  | 'hr'
  | 'hu'
  | 'id'
  | 'inh'
  | 'is'
  | 'it'
  | 'ja'
  | 'kbd'
  | 'kn'
  | 'ko'
  | 'ku'
  | 'la'
  | 'lbe'
  | 'lez'
  | 'lt'
  | 'lv'
  | 'mah'
  | 'mai'
  | 'mi'
  | 'mn'
  | 'mni'
  | 'mr'
  | 'ms'
  | 'mt'
  | 'ne'
  | 'new'
  | 'nl'
  | 'no'
  | 'oc'
  | 'pi'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'rs_cyrillic'
  | 'rs_latin'
  | 'ru'
  | 'sa'
  | 'sck'
  | 'sk'
  | 'sl'
  | 'sq'
  | 'sv'
  | 'sw'
  | 'ta'
  | 'tab'
  | 'te'
  | 'th'
  | 'tjk'
  | 'tl'
  | 'tr'
  | 'ug'
  | 'uk'
  | 'ur'
  | 'uz'
  | 'vi';

/**
 * Enum for representing the mode of parsing to be used.
 */
export type ParsingMode =
  | 'parse_document_with_agent'
  | 'parse_document_with_llm'
  | 'parse_document_with_lvm'
  | 'parse_page_with_agent'
  | 'parse_page_with_layout_agent'
  | 'parse_page_with_llm'
  | 'parse_page_with_lvm'
  | 'parse_page_without_llm';

/**
 * Enum for representing the status of a job
 */
export type StatusEnum = 'CANCELLED' | 'ERROR' | 'PARTIAL_SUCCESS' | 'PENDING' | 'SUCCESS';

export interface TableItem {
  /**
   * CSV representation of the table
   */
  csv: string;

  /**
   * HTML representation of the table
   */
  html: string;

  /**
   * Markdown representation preserving formatting
   */
  md: string;

  /**
   * Table data as array of arrays (string, number, or null)
   */
  rows: Array<Array<string | number | null>>;

  /**
   * List of bounding boxes
   */
  bbox?: Array<BBox> | null;

  /**
   * List of page numbers with tables that were merged into this table (e.g., [1, 2,
   * 3, 4])
   */
  merged_from_pages?: Array<number> | null;

  /**
   * Populated when merged into another table. Page number where the full merged
   * table begins (used on empty tables).
   */
  merged_into_page?: number | null;

  /**
   * Quality concerns detected during table extraction, indicating the table may have
   * issues
   */
  parse_concerns?: Array<TableItem.ParseConcern> | null;

  /**
   * Table item type
   */
  type?: 'table';
}

export namespace TableItem {
  export interface ParseConcern {
    /**
     * Human-readable details about the concern
     */
    details: string;

    /**
     * Type of parse concern (e.g. header_value_type_mismatch,
     * inconsistent_row_cell_count)
     */
    type: string;
  }
}

export interface TextItem {
  /**
   * Markdown representation preserving formatting
   */
  md: string;

  /**
   * Text content
   */
  value: string;

  /**
   * List of bounding boxes
   */
  bbox?: Array<BBox> | null;

  /**
   * Text item type
   */
  type?: 'text';
}

/**
 * A parse job.
 */
export interface ParsingCreateResponse {
  /**
   * Unique parse job identifier
   */
  id: string;

  /**
   * Project this job belongs to
   */
  project_id: string;

  /**
   * Current job status: PENDING, RUNNING, COMPLETED, FAILED, or CANCELLED
   */
  status: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING';

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Error details when status is FAILED
   */
  error_message?: string | null;

  /**
   * Optional display name for this parse job
   */
  name?: string | null;

  /**
   * Parsing tier used for this job
   */
  tier?: string | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;

  /**
   * Usage recorded against a job.
   */
  usage?: ParsingCreateResponse.Usage | null;

  /**
   * Key/value tags associated with this job.
   */
  user_metadata?: { [key: string]: string } | null;
}

export namespace ParsingCreateResponse {
  /**
   * Usage recorded against a job.
   */
  export interface Usage {
    /**
     * Total credits billed against this job. Null until billing has recorded it.
     */
    credits?: number | null;
  }
}

/**
 * A parse job.
 */
export interface ParsingListResponse {
  /**
   * Unique parse job identifier
   */
  id: string;

  /**
   * Project this job belongs to
   */
  project_id: string;

  /**
   * Current job status: PENDING, RUNNING, COMPLETED, FAILED, or CANCELLED
   */
  status: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING';

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Error details when status is FAILED
   */
  error_message?: string | null;

  /**
   * Optional display name for this parse job
   */
  name?: string | null;

  /**
   * Parsing tier used for this job
   */
  tier?: string | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;

  /**
   * Usage recorded against a job.
   */
  usage?: ParsingListResponse.Usage | null;

  /**
   * Key/value tags associated with this job.
   */
  user_metadata?: { [key: string]: string } | null;
}

export namespace ParsingListResponse {
  /**
   * Usage recorded against a job.
   */
  export interface Usage {
    /**
     * Total credits billed against this job. Null until billing has recorded it.
     */
    credits?: number | null;
  }
}

/**
 * Confirmation that a parse job was deleted.
 *
 * A deleted job can no longer be fetched, so the response echoes back what it was
 * rather than pointing at it. Returning the identifiers instead of an empty body
 * lets a caller assert on the delete it just made without a follow-up request.
 */
export interface ParsingDeleteResponse {
  /**
   * Identifier of the deleted parse job
   */
  id: string;

  /**
   * Project the deleted job belonged to
   */
  project_id: string;
}

/**
 * A parse job.
 */
export interface ParsingCancelResponse {
  /**
   * Unique parse job identifier
   */
  id: string;

  /**
   * Project this job belongs to
   */
  project_id: string;

  /**
   * Current job status: PENDING, RUNNING, COMPLETED, FAILED, or CANCELLED
   */
  status: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING';

  /**
   * Creation datetime
   */
  created_at?: string | null;

  /**
   * Error details when status is FAILED
   */
  error_message?: string | null;

  /**
   * Optional display name for this parse job
   */
  name?: string | null;

  /**
   * Parsing tier used for this job
   */
  tier?: string | null;

  /**
   * Update datetime
   */
  updated_at?: string | null;

  /**
   * Usage recorded against a job.
   */
  usage?: ParsingCancelResponse.Usage | null;

  /**
   * Key/value tags associated with this job.
   */
  user_metadata?: { [key: string]: string } | null;
}

export namespace ParsingCancelResponse {
  /**
   * Usage recorded against a job.
   */
  export interface Usage {
    /**
     * Total credits billed against this job. Null until billing has recorded it.
     */
    credits?: number | null;
  }
}

/**
 * Parse result response with job status and optional content or metadata.
 *
 * The job field is always included. Other fields are included based on expand
 * parameters.
 */
export interface ParsingGetResponse {
  /**
   * Parse job status and metadata
   */
  job: ParsingGetResponse.Job;

  /**
   * Per-page form analysis results (one entry per page).
   */
  forms?: ParsingGetResponse.Forms | null;

  /**
   * Metadata for all extracted images.
   */
  images_content_metadata?: ParsingGetResponse.ImagesContentMetadata | null;

  /**
   * Structured JSON result (if requested)
   */
  items?: ParsingGetResponse.Items | null;

  /**
   * Job execution metadata (if requested)
   */
  job_metadata?: { [key: string]: unknown } | null;

  /**
   * Markdown result (if requested)
   */
  markdown?: ParsingGetResponse.Markdown | null;

  /**
   * Full raw markdown content (if requested)
   */
  markdown_full?: string | null;

  /**
   * Result containing metadata (page level and general) for the parsed document.
   */
  metadata?: ParsingGetResponse.Metadata | null;

  raw_parameters?: { [key: string]: unknown } | null;

  /**
   * Metadata including size, existence, and presigned URLs for result files
   */
  result_content_metadata?: { [key: string]: ParsingGetResponse.ResultContentMetadata } | null;

  /**
   * Plain text result (if requested)
   */
  text?: ParsingGetResponse.Text | null;

  /**
   * Full raw text content (if requested)
   */
  text_full?: string | null;
}

export namespace ParsingGetResponse {
  /**
   * Parse job status and metadata
   */
  export interface Job {
    /**
     * Unique parse job identifier
     */
    id: string;

    /**
     * Project this job belongs to
     */
    project_id: string;

    /**
     * Current job status: PENDING, RUNNING, COMPLETED, FAILED, or CANCELLED
     */
    status: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING';

    /**
     * Creation datetime
     */
    created_at?: string | null;

    /**
     * Error details when status is FAILED
     */
    error_message?: string | null;

    /**
     * Optional display name for this parse job
     */
    name?: string | null;

    /**
     * Parsing tier used for this job
     */
    tier?: string | null;

    /**
     * Update datetime
     */
    updated_at?: string | null;

    /**
     * Usage recorded against a job.
     */
    usage?: Job.Usage | null;

    /**
     * Key/value tags associated with this job.
     */
    user_metadata?: { [key: string]: string } | null;
  }

  export namespace Job {
    /**
     * Usage recorded against a job.
     */
    export interface Usage {
      /**
       * Total credits billed against this job. Null until billing has recorded it.
       */
      credits?: number | null;
    }
  }

  /**
   * Per-page form analysis results (one entry per page).
   */
  export interface Forms {
    /**
     * List of form pages or failed page entries
     */
    pages: Array<Forms.FormsResultPage | Forms.FailedFormsPage>;
  }

  export namespace Forms {
    /**
     * Forms found on one page. Pages without form content have an empty forms list.
     */
    export interface FormsResultPage {
      /**
       * Forms detected on the page
       */
      forms: Array<ParsingAPI.Form>;

      /**
       * Page number of the document
       */
      page_number: number;

      /**
       * Success indicator
       */
      success: true;

      /**
       * Height of the page in points
       */
      page_height?: number | null;

      /**
       * Width of the page in points
       */
      page_width?: number | null;
    }

    /**
     * A page whose processing failed.
     */
    export interface FailedFormsPage {
      /**
       * Error message describing the failure
       */
      error: string;

      /**
       * Page number of the document
       */
      page_number: number;

      /**
       * Failure indicator
       */
      success: false;
    }
  }

  /**
   * Metadata for all extracted images.
   */
  export interface ImagesContentMetadata {
    /**
     * List of image metadata with presigned URLs
     */
    images: Array<ImagesContentMetadata.Image>;

    /**
     * Total number of extracted images
     */
    total_count: number;
  }

  export namespace ImagesContentMetadata {
    /**
     * Metadata for a single extracted image.
     */
    export interface Image {
      /**
       * Image filename (e.g., 'image_0.png')
       */
      filename: string;

      /**
       * Index of the image in the extraction order
       */
      index: number;

      /**
       * Bounding box for an image on its page.
       */
      bbox?: Image.Bbox | null;

      /**
       * Image category: 'screenshot' (full page), 'embedded' (images in document), or
       * 'layout' (cropped from layout detection)
       */
      category?: 'embedded' | 'layout' | 'screenshot' | null;

      /**
       * MIME type of the image
       */
      content_type?: string | null;

      /**
       * Presigned URL to download the image
       */
      presigned_url?: string | null;

      /**
       * @deprecated Deprecated: always returns None. Will be removed in a future
       * release.
       */
      size_bytes?: number | null;
    }

    export namespace Image {
      /**
       * Bounding box for an image on its page.
       */
      export interface Bbox {
        /**
         * Height of the bounding box
         */
        h: number;

        /**
         * Width of the bounding box
         */
        w: number;

        /**
         * X coordinate of the bounding box
         */
        x: number;

        /**
         * Y coordinate of the bounding box
         */
        y: number;
      }
    }
  }

  /**
   * Structured JSON result (if requested)
   */
  export interface Items {
    /**
     * List of structured pages or failed page entries
     */
    pages: Array<Items.StructuredResultPage | Items.FailedStructuredPage>;
  }

  export namespace Items {
    /**
     * Successfully parsed page in structured items output.
     */
    export interface StructuredResultPage {
      /**
       * List of structured items on the page
       */
      items: Array<
        | ParsingAPI.CodeItem
        | ParsingAPI.FooterItem
        | ParsingAPI.HeaderItem
        | ParsingAPI.HeadingItem
        | ParsingAPI.ImageItem
        | ParsingAPI.LinkItem
        | ParsingAPI.ListItem
        | ParsingAPI.TableItem
        | ParsingAPI.TextItem
      >;

      /**
       * Height of the page in points
       */
      page_height: number;

      /**
       * Page number of the document
       */
      page_number: number;

      /**
       * Width of the page in points
       */
      page_width: number;

      /**
       * Success indicator
       */
      success: true;

      /**
       * Extracted revisions and comments on the page
       */
      revisions?: Array<StructuredResultPage.Revision> | null;
    }

    export namespace StructuredResultPage {
      /**
       * One extracted document revision linked to page content.
       */
      export interface Revision {
        /**
         * Revision or comment content
         */
        content: string;

        /**
         * Bounding box of the printed revision balloon
         */
        revision_bbox: Revision.RevisionBbox;

        /**
         * Best available target text in the page content
         */
        target: string;

        /**
         * Union bounding box of the target spans
         */
        target_bbox: Revision.TargetBbox;

        /**
         * Type of revision
         */
        type: 'comment' | 'deleted' | 'formatted' | 'inserted' | 'moved_from' | 'moved_to';

        /**
         * Revision author, when available
         */
        author?: string | null;

        /**
         * Exclusive end offset in final page markdown
         */
        end_index?: number | null;

        /**
         * Inclusive start offset in final page markdown
         */
        start_index?: number | null;

        /**
         * Disconnected target spans, when present
         */
        target_spans?: Array<Revision.TargetSpan> | null;
      }

      export namespace Revision {
        /**
         * Bounding box of the printed revision balloon
         */
        export interface RevisionBbox {
          /**
           * Height of the bounding box
           */
          h: number;

          /**
           * Width of the bounding box
           */
          w: number;

          /**
           * X coordinate of the bounding box
           */
          x: number;

          /**
           * Y coordinate of the bounding box
           */
          y: number;
        }

        /**
         * Union bounding box of the target spans
         */
        export interface TargetBbox {
          /**
           * Height of the bounding box
           */
          h: number;

          /**
           * Width of the bounding box
           */
          w: number;

          /**
           * X coordinate of the bounding box
           */
          x: number;

          /**
           * Y coordinate of the bounding box
           */
          y: number;
        }

        /**
         * One contiguous target span linked to a document revision.
         */
        export interface TargetSpan {
          /**
           * Text covered by this target span
           */
          target: string;

          /**
           * Bounding box of this target span
           */
          target_bbox: TargetSpan.TargetBbox;

          /**
           * Exclusive end offset in final page markdown
           */
          end_index?: number | null;

          /**
           * Inclusive start offset in final page markdown
           */
          start_index?: number | null;
        }

        export namespace TargetSpan {
          /**
           * Bounding box of this target span
           */
          export interface TargetBbox {
            /**
             * Height of the bounding box
             */
            h: number;

            /**
             * Width of the bounding box
             */
            w: number;

            /**
             * X coordinate of the bounding box
             */
            x: number;

            /**
             * Y coordinate of the bounding box
             */
            y: number;
          }
        }
      }
    }

    export interface FailedStructuredPage {
      /**
       * Error message describing the failure
       */
      error: string;

      /**
       * Page number of the document
       */
      page_number: number;

      /**
       * Failure indicator
       */
      success: false;
    }
  }

  /**
   * Markdown result (if requested)
   */
  export interface Markdown {
    /**
     * List of markdown pages or failed page entries
     */
    pages: Array<Markdown.MarkdownResultPage | Markdown.FailedMarkdownPage>;
  }

  export namespace Markdown {
    export interface MarkdownResultPage {
      /**
       * Markdown content of the page
       */
      markdown: string;

      /**
       * Page number of the document
       */
      page_number: number;

      /**
       * Success indicator
       */
      success: true;

      /**
       * Footer of the page in markdown
       */
      footer?: string | null;

      /**
       * Header of the page in markdown
       */
      header?: string | null;

      /**
       * Printed line numbers linked to final page markdown
       */
      line_numbers?: Array<MarkdownResultPage.LineNumber> | null;
    }

    export namespace MarkdownResultPage {
      /**
       * Source line number linked to final page markdown.
       */
      export interface LineNumber {
        /**
         * Zero-based exclusive UTF-16 code-unit offset in final page markdown
         */
        end_index: number;

        /**
         * Printed source line number
         */
        line_number: string;

        /**
         * Zero-based inclusive UTF-16 code-unit offset in final page markdown
         */
        start_index: number;
      }
    }

    export interface FailedMarkdownPage {
      /**
       * Error message describing the failure
       */
      error: string;

      /**
       * Page number of the document
       */
      page_number: number;

      /**
       * Failure indicator
       */
      success: false;
    }
  }

  /**
   * Result containing metadata (page level and general) for the parsed document.
   */
  export interface Metadata {
    /**
     * List of page metadata entries
     */
    pages: Array<Metadata.Page>;

    /**
     * Document-level metadata information.
     */
    document?: Metadata.Document | null;
  }

  export namespace Metadata {
    /**
     * Page-level metadata including confidence scores and presentation-specific data.
     */
    export interface Page {
      /**
       * Page number of the document
       */
      page_number: number;

      /**
       * Confidence score for the page parsing (0-1)
       */
      confidence?: number | null;

      /**
       * Whether cost-optimized parsing was used for the page
       */
      cost_optimized?: boolean | null;

      /**
       * Original orientation angle of the page in degrees
       */
      original_orientation_angle?: number | null;

      /**
       * Printed page number as it appears in the document
       */
      printed_page_number?: string | null;

      /**
       * Section name from presentation slides
       */
      slide_section_name?: string | null;

      /**
       * Speaker notes from presentation slides
       */
      speaker_notes?: string | null;

      /**
       * Whether auto mode was triggered for the page
       */
      triggered_auto_mode?: boolean | null;
    }

    /**
     * Document-level metadata information.
     */
    export interface Document {
      /**
       * Mean confidence score across pages scored by the high-effort confidence judge
       * (0-1)
       */
      confidence?: number | null;

      /**
       * Coverage and worst-page details for document confidence.
       */
      confidence_breakdown?: Document.ConfidenceBreakdown | null;
    }

    export namespace Document {
      /**
       * Coverage and worst-page details for document confidence.
       */
      export interface ConfidenceBreakdown {
        /**
         * Lowest confidence score among pages scored by the high-effort confidence judge
         */
        min_page_score: number;

        /**
         * Number of pages successfully scored by the high-effort confidence judge
         */
        scored_pages: number;

        /**
         * Total number of pages in the parsed document
         */
        total_pages: number;
      }
    }
  }

  /**
   * Metadata about a specific result type stored in S3.
   */
  export interface ResultContentMetadata {
    /**
     * Size of the result file in bytes
     */
    size_bytes: number;

    /**
     * Whether the result file exists in S3
     */
    exists?: boolean;

    /**
     * Presigned URL to download the result file
     */
    presigned_url?: string | null;
  }

  /**
   * Plain text result (if requested)
   */
  export interface Text {
    /**
     * List of text pages
     */
    pages: Array<Text.Page>;
  }

  export namespace Text {
    export interface Page {
      /**
       * Page number of the document
       */
      page_number: number;

      /**
       * Plain text content of the page
       */
      text: string;
    }
  }
}

/**
 * Versions accepted by the parse API, grouped by tier.
 */
export interface ParsingListVersionsResponse {
  /**
   * Versions for the agentic tier
   */
  agentic: Array<
    | '2026-09-09'
    | '2026-09-07'
    | '2026-08-19'
    | '2026-07-24'
    | '2026-07-23'
    | '2026-07-15'
    | '2026-06-18'
    | '2026-06-11'
    | '2026-06-04'
    | '2026-06-01'
    | '2026-05-26'
    | '2026-05-21'
    | '2026-05-20'
    | '2026-05-19'
    | '2026-05-13'
    | '2026-05-11'
    | '2026-05-06'
    | '2026-05-04'
    | '2026-04-27'
    | '2026-04-22'
    | '2026-04-09'
    | '2026-04-06'
    | '2026-04-02'
    | '2026-03-31'
    | '2026-03-30'
    | '2026-03-27'
    | '2026-03-25'
    | '2026-03-23'
    | '2026-03-22'
    | '2026-03-20'
    | '2026-03-11'
    | '2026-03-10'
    | '2026-03-09'
    | '2026-03-03'
    | '2026-03-02'
    | '2026-02-26'
    | '2026-02-24'
    | '2026-01-30'
    | '2026-01-22'
    | '2026-01-21'
    | '2026-01-16'
    | '2026-01-08'
    | '2025-12-31'
    | '2025-12-18'
    | '2025-12-11'
  >;

  /**
   * Versions for the agentic_plus tier
   */
  agentic_plus: Array<
    | '2026-08-19'
    | '2026-07-08'
    | '2026-06-18'
    | '2026-06-11'
    | '2026-06-04'
    | '2026-06-01'
    | '2026-05-26'
    | '2026-05-21'
    | '2026-05-20'
    | '2026-05-19'
    | '2026-05-11'
    | '2026-05-06'
    | '2026-05-04'
    | '2026-05-01'
    | '2026-04-27'
    | '2026-04-19'
    | '2026-04-14'
    | '2026-04-09'
    | '2026-04-02'
    | '2026-03-31'
    | '2026-03-26'
    | '2026-03-25'
    | '2026-03-22'
    | '2026-03-20'
    | '2026-03-17'
    | '2026-03-12'
    | '2026-03-10'
    | '2026-03-09'
    | '2026-03-02'
    | '2026-02-26'
    | '2026-02-24'
    | '2026-01-30'
    | '2026-01-29'
    | '2026-01-24'
    | '2026-01-22'
    | '2026-01-21'
    | '2026-01-16'
    | '2025-12-31'
    | '2025-12-18'
    | '2025-12-11'
  >;

  /**
   * Versions for the cost_effective tier
   */
  cost_effective: Array<
    | '2026-08-19'
    | '2026-08-11'
    | '2026-08-08'
    | '2026-07-23'
    | '2026-06-26'
    | '2026-06-18'
    | '2026-06-17'
    | '2026-06-11'
    | '2026-06-08'
    | '2026-06-05'
    | '2026-05-28'
    | '2026-04-09'
    | '2026-03-31'
    | '2026-03-27'
    | '2026-03-25'
  >;

  /**
   * Versions for the fast tier
   */
  fast: Array<'2026-06-15' | '2025-12-11'>;

  /**
   * Version `latest` currently resolves to, per tier
   */
  latest: ParsingListVersionsResponse.Latest;
}

export namespace ParsingListVersionsResponse {
  /**
   * Version `latest` currently resolves to, per tier
   */
  export interface Latest {
    /**
     * Version `latest` resolves to for the agentic tier
     */
    agentic: string;

    /**
     * Version `latest` resolves to for the agentic_plus tier
     */
    agentic_plus: string;

    /**
     * Version `latest` resolves to for the cost_effective tier
     */
    cost_effective: string;

    /**
     * Version `latest` resolves to for the fast tier
     */
    fast: string;
  }
}

export interface ParsingCreateParams {
  /**
   * Body param: Parsing tier: 'fast' (rule-based, cheapest), 'cost_effective'
   * (balanced), 'agentic' (AI-powered with custom prompts), or 'agentic_plus'
   * (premium AI with highest accuracy)
   */
  tier: 'fast' | 'cost_effective' | 'agentic' | 'agentic_plus' | (string & {});

  /**
   * Body param: Version for the selected tier. Use `latest`, or pin one of that
   * tier's dated versions.
   *
   * Current `latest` by tier:
   *
   * - `fast`: `2026-06-15`
   * - `cost_effective`: `2026-08-19`
   * - `agentic`: `2026-09-09`
   * - `agentic_plus`: `2026-08-19`
   *
   * Full list: `GET /api/v2/parse/versions`.
   */
  version: 'latest' | '2026-09-09' | '2026-08-19' | '2026-06-15' | (string & {});

  /**
   * Query param
   */
  organization_id?: string | null;

  /**
   * Query param
   */
  project_id?: string | null;

  /**
   * Body param: Options for AI-powered parsing tiers (cost_effective, agentic,
   * agentic_plus).
   *
   * These options customize how the AI processes and interprets document content.
   * Only applicable when using non-fast tiers.
   */
  agentic_options?: ParsingCreateParams.AgenticOptions | null;

  /**
   * Body param: Identifier for the client/application making the request. Used for
   * analytics and debugging. Example: 'my-app-v2'
   */
  client_name?: string | null;

  /**
   * Body param: ID of a saved parse configuration. When set, `tier` and `version`
   * default to the saved configuration's values — omit them or pass `'configured'`.
   */
  configuration_id?: string | null;

  /**
   * Body param: Crop boundaries to process only a portion of each page. Values are
   * ratios 0-1 from page edges
   */
  crop_box?: ParsingCreateParams.CropBox;

  /**
   * Body param: Bypass result caching and force re-parsing. Use when document
   * content may have changed or you need fresh results
   */
  disable_cache?: boolean | null;

  /**
   * Body param: Options for fast tier parsing (rule-based, no AI).
   *
   * Fast tier uses deterministic algorithms for text extraction without AI
   * enhancement. It's the fastest and most cost-effective option, best suited for
   * simple documents with standard layouts. Currently has no configurable options
   * but reserved for future expansion.
   */
  fast_options?: unknown | null;

  /**
   * Body param: ID of an existing file in the project to parse. Mutually exclusive
   * with source_url
   */
  file_id?: string | null;

  /**
   * Body param: HTTP/HTTPS proxy for fetching source_url. Ignored if using file_id
   */
  http_proxy?: string | null;

  /**
   * Body param: Format-specific options (HTML, PDF, spreadsheet, presentation).
   * Applied based on detected input file type
   */
  input_options?: ParsingCreateParams.InputOptions;

  /**
   * Body param: Output formatting options for markdown, text, and extracted images
   */
  output_options?: ParsingCreateParams.OutputOptions;

  /**
   * Body param: Page selection: limit total pages or specify exact pages to process
   */
  page_ranges?: ParsingCreateParams.PageRanges;

  /**
   * Body param: Job execution controls including timeouts and failure thresholds
   */
  processing_control?: ParsingCreateParams.ProcessingControl;

  /**
   * Body param: Document processing options including OCR, table extraction, and
   * chart parsing
   */
  processing_options?: ParsingCreateParams.ProcessingOptions;

  /**
   * Body param: Public URL of the document to parse. Mutually exclusive with file_id
   */
  source_url?: string | null;

  /**
   * Body param: Arbitrary key/value tags to attach to this job. Returned when
   * retrieving the job. Not searchable. Limits apply to the number of entries and
   * the length of keys and values; oversized metadata is rejected.
   */
  user_metadata?: { [key: string]: string } | null;

  /**
   * Body param: IDs of saved webhook configurations to notify for this job.
   */
  webhook_configuration_ids?: Array<string> | null;

  /**
   * Body param: Webhook endpoints for job status notifications. Multiple webhooks
   * can be configured for different events or services
   */
  webhook_configurations?: Array<ParsingCreateParams.WebhookConfiguration>;
}

export namespace ParsingCreateParams {
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
         * - `agentic_plus`: `2026-08-19`
         *
         * Full list: `GET /api/v2/parse/versions`.
         */
        version?: 'latest' | '2026-09-09' | '2026-08-19' | '2026-06-15' | (string & {}) | null;
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

export interface ParsingGetParams {
  /**
   * Fields to include: text, markdown, items, metadata, forms, job_metadata, usage,
   * text_content_metadata, markdown_content_metadata, items_content_metadata,
   * metadata_content_metadata, forms_content_metadata, raw_words_content_metadata,
   * xlsx_content_metadata, output_pdf_content_metadata, images_content_metadata.
   * Metadata fields include presigned URLs.
   */
  expand?: Array<string>;

  /**
   * Filter to specific image filenames (optional). Example: image_0.png,image_1.jpg
   */
  image_filenames?: string | null;

  organization_id?: string | null;

  project_id?: string | null;
}

export interface ParsingListParams extends PaginatedCursorParams {
  /**
   * Include items created at or after this timestamp (inclusive)
   */
  created_at_on_or_after?: string | null;

  /**
   * Include items created at or before this timestamp (inclusive)
   */
  created_at_on_or_before?: string | null;

  /**
   * Filter by specific job IDs
   */
  job_ids?: Array<string> | null;

  organization_id?: string | null;

  project_id?: string | null;

  /**
   * Filter by job status (PENDING, RUNNING, COMPLETED, FAILED, CANCELLED)
   */
  status?: 'CANCELLED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'RUNNING' | null;
}

export interface ParsingCancelParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export interface ParsingDeleteParams {
  organization_id?: string | null;

  project_id?: string | null;
}

export declare namespace Parsing {
  export {
    type BBox as BBox,
    type CodeItem as CodeItem,
    type FailPageMode as FailPageMode,
    type FooterItem as FooterItem,
    type Form as Form,
    type FormField as FormField,
    type FormListItem as FormListItem,
    type FormListTextItem as FormListTextItem,
    type FormSection as FormSection,
    type FormTable as FormTable,
    type FormTableCellItems as FormTableCellItems,
    type HeaderItem as HeaderItem,
    type HeadingItem as HeadingItem,
    type ImageItem as ImageItem,
    type LinkItem as LinkItem,
    type ListItem as ListItem,
    type LlamaParseSupportedFileExtensions as LlamaParseSupportedFileExtensions,
    type ParsingJob as ParsingJob,
    type ParsingLanguages as ParsingLanguages,
    type ParsingMode as ParsingMode,
    type StatusEnum as StatusEnum,
    type TableItem as TableItem,
    type TextItem as TextItem,
    type ParsingCreateResponse as ParsingCreateResponse,
    type ParsingListResponse as ParsingListResponse,
    type ParsingDeleteResponse as ParsingDeleteResponse,
    type ParsingCancelResponse as ParsingCancelResponse,
    type ParsingGetResponse as ParsingGetResponse,
    type ParsingListVersionsResponse as ParsingListVersionsResponse,
    type ParsingListResponsesPaginatedCursor as ParsingListResponsesPaginatedCursor,
    type ParsingCreateParams as ParsingCreateParams,
    type ParsingGetParams as ParsingGetParams,
    type ParsingListParams as ParsingListParams,
    type ParsingCancelParams as ParsingCancelParams,
    type ParsingDeleteParams as ParsingDeleteParams,
  };
}
