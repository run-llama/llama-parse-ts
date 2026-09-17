// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaCloud from '@llamaindex/llama-cloud';

const client = new LlamaCloud({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource parsing', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.parsing.create({ tier: 'fast', version: 'latest' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.parsing.create({
      tier: 'fast',
      version: 'latest',
      organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      agentic_options: { custom_prompt: 'custom_prompt' },
      client_name: 'client_name',
      configuration_id: 'configuration_id',
      crop_box: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
      disable_cache: true,
      fast_options: {},
      file_id: 'file_id',
      http_proxy: 'https:',
      input_options: {
        html: {
          make_all_elements_visible: true,
          remove_fixed_elements: true,
          remove_navigation_elements: true,
        },
        image: { camera_photo_correction: true },
        pdf: {},
        presentation: { out_of_bounds_content: true, skip_embedded_data: true },
        spreadsheet: {
          detect_sub_tables_in_sheets: true,
          force_formula_computation_in_sheets: true,
          include_hidden_sheets: true,
        },
      },
      output_options: {
        additional_outputs: ['stripped_md', 'concatenated_stripped_txt', 'word_bbox'],
        extract_printed_page_number: true,
        granular_bboxes: ['word', 'line', 'cell'],
        images_to_save: ['embedded'],
        markdown: {
          annotate_links: true,
          annotate_revisions: true,
          inline_images: true,
          tables: {
            compact_markdown_tables: true,
            markdown_table_multiline_separator: 'markdown_table_multiline_separator',
            merge_continued_tables: true,
            output_tables_as_markdown: true,
          },
        },
        save_output_pdf: true,
        spatial_text: {
          do_not_unroll_columns: true,
          preserve_layout_alignment_across_pages: true,
          preserve_very_small_text: true,
        },
        tables_as_spreadsheet: { enable: true, guess_sheet_name: true },
      },
      page_ranges: { max_pages: 1, target_pages: 'target_pages' },
      processing_control: {
        job_failure_conditions: {
          allowed_page_failure_ratio: 1,
          fail_on_buggy_font: true,
          fail_on_image_extraction_error: true,
          fail_on_image_ocr_error: true,
          fail_on_markdown_reconstruction_error: true,
        },
        timeouts: { base_in_seconds: 1, extra_time_per_page_in_seconds: 1 },
      },
      processing_options: {
        aggressive_table_extraction: true,
        auto_mode_configuration: [
          {
            parsing_conf: {
              adaptive_long_table: true,
              aggressive_table_extraction: true,
              crop_box: {
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
              },
              custom_prompt: 'custom_prompt',
              extract_layout: true,
              high_res_ocr: true,
              ignore: { ignore_diagonal_text: true, ignore_hidden_text: true },
              language: 'language',
              outlined_table_extraction: true,
              presentation: { out_of_bounds_content: true, skip_embedded_data: true },
              spatial_text: {
                do_not_unroll_columns: true,
                preserve_layout_alignment_across_pages: true,
                preserve_very_small_text: true,
              },
              specialized_chart_parsing: 'agentic',
              tier: 'agentic',
              version: 'latest',
            },
            filename_match_glob: '*.txt',
            filename_match_glob_list: ['string'],
            filename_regexp: 'filename_regexp',
            filename_regexp_mode: 'filename_regexp_mode',
            full_page_image_in_page: true,
            full_page_image_in_page_threshold: 0,
            image_in_page: true,
            layout_element_in_page: 'layout_element_in_page',
            layout_element_in_page_confidence_threshold: 0,
            page_contains_at_least_n_charts: 0,
            page_contains_at_least_n_images: 0,
            page_contains_at_least_n_layout_elements: 0,
            page_contains_at_least_n_lines: 0,
            page_contains_at_least_n_links: 0,
            page_contains_at_least_n_numbers: 0,
            page_contains_at_least_n_percent_numbers: 0,
            page_contains_at_least_n_tables: 0,
            page_contains_at_least_n_words: 0,
            page_contains_at_most_n_charts: 0,
            page_contains_at_most_n_images: 0,
            page_contains_at_most_n_layout_elements: 0,
            page_contains_at_most_n_lines: 0,
            page_contains_at_most_n_links: 0,
            page_contains_at_most_n_numbers: 0,
            page_contains_at_most_n_percent_numbers: 0,
            page_contains_at_most_n_tables: 0,
            page_contains_at_most_n_words: 0,
            page_longer_than_n_chars: 0,
            page_md_error: true,
            page_shorter_than_n_chars: 0,
            regexp_in_page: 'regexp_in_page',
            regexp_in_page_mode: 'regexp_in_page_mode',
            table_in_page: true,
            text_in_page: 'text_in_page',
            trigger_mode: 'trigger_mode',
          },
        ],
        confidence_score_effort: 'high',
        cost_optimizer: { enable: true },
        disable_heuristics: true,
        forms: 'enrich',
        ignore: {
          ignore_diagonal_text: true,
          ignore_hidden_text: true,
          ignore_text_in_image: true,
        },
        ocr_parameters: { languages: ['abq'] },
        specialized_chart_parsing: 'agentic',
      },
      source_url: 'https:',
      user_metadata: { owner: 'jerry', team: 'research' },
      webhook_configuration_ids: ['whc-...', 'whc-...'],
      webhook_configurations: [
        {
          webhook_events: ['parse.success', 'parse.error'],
          webhook_headers: { foo: 'bar' },
          webhook_output_format: 'json',
          webhook_signing_secret: 'webhook_signing_secret',
          webhook_url: 'https:',
        },
      ],
    });
  });

  // Mock server tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.parsing.get('job_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('get: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.parsing.get(
        'job_id',
        {
          expand: ['string'],
          image_filenames: 'image_filenames',
          organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LlamaCloud.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.parsing.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.parsing.list(
        {
          created_at_on_or_after: '2019-12-27T18:11:19.117Z',
          created_at_on_or_before: '2019-12-27T18:11:19.117Z',
          job_ids: ['string', 'string'],
          organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          page_size: 0,
          page_token: 'page_token',
          project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          status: 'CANCELLED',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LlamaCloud.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('cancel', async () => {
    const responsePromise = client.parsing.cancel('job_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('cancel: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.parsing.cancel(
        'job_id',
        {
          organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LlamaCloud.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('listVersions', async () => {
    const responsePromise = client.parsing.listVersions();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
