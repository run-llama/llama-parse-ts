// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaCloud from '@llamaindex/llama-cloud';

const client = new LlamaCloud({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource pipelines', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.pipelines.list();
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
      client.pipelines.list(
        {
          organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          pipeline_name: 'pipeline_name',
          pipeline_type: 'MANAGED',
          project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          project_name: 'project_name',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LlamaCloud.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.pipelines.create({ name: 'x' });
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
    const response = await client.pipelines.create({
      name: 'x',
      organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      data_sink: {
        component: { foo: 'bar' },
        name: 'name',
        sink_type: 'ASTRA_DB',
      },
      data_sink_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      embedding_config: {
        component: {
          additional_kwargs: { foo: 'bar' },
          api_base: 'api_base',
          api_key: 'api_key',
          api_version: 'api_version',
          azure_deployment: 'azure_deployment',
          azure_endpoint: 'azure_endpoint',
          class_name: 'class_name',
          default_headers: { foo: 'string' },
          dimensions: 0,
          embed_batch_size: 1,
          max_retries: 0,
          model_name: 'model_name',
          num_workers: 0,
          reuse_client: true,
          timeout: 0,
        },
        type: 'AZURE_EMBEDDING',
      },
      embedding_model_config_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      llama_parse_parameters: {
        adaptive_long_table: true,
        aggressive_table_extraction: true,
        annotate_links: true,
        annotate_revisions: true,
        auto_mode: true,
        auto_mode_configuration_json: 'auto_mode_configuration_json',
        auto_mode_trigger_on_image_in_page: true,
        auto_mode_trigger_on_regexp_in_page: 'auto_mode_trigger_on_regexp_in_page',
        auto_mode_trigger_on_table_in_page: true,
        auto_mode_trigger_on_text_in_page: 'auto_mode_trigger_on_text_in_page',
        azure_openai_api_version: 'azure_openai_api_version',
        azure_openai_deployment_name: 'azure_openai_deployment_name',
        azure_openai_endpoint: 'azure_openai_endpoint',
        azure_openai_key: 'azure_openai_key',
        bbox_bottom: 0,
        bbox_left: 0,
        bbox_right: 0,
        bbox_top: 0,
        bounding_box: 'bounding_box',
        compact_markdown_table: true,
        complemental_formatting_instruction: 'complemental_formatting_instruction',
        confidence_score_effort: 'confidence_score_effort',
        content_guideline_instruction: 'content_guideline_instruction',
        continuous_mode: true,
        disable_image_extraction: true,
        disable_ocr: true,
        disable_reconstruction: true,
        do_not_cache: true,
        do_not_unroll_columns: true,
        enable_cost_optimizer: true,
        extract_charts: true,
        extract_layout: true,
        extract_printed_page_number: true,
        fast_mode: true,
        formatting_instruction: 'formatting_instruction',
        gpt4o_api_key: 'gpt4o_api_key',
        gpt4o_mode: true,
        guess_xlsx_sheet_name: true,
        hide_footers: true,
        hide_headers: true,
        high_res_ocr: true,
        html_make_all_elements_visible: true,
        html_remove_fixed_elements: true,
        html_remove_navigation_elements: true,
        http_proxy: 'http_proxy',
        ignore_document_elements_for_layout_detection: true,
        images_to_save: ['embedded'],
        inline_images_in_markdown: true,
        input_s3_path: 'input_s3_path',
        input_s3_region: 'input_s3_region',
        input_url: 'input_url',
        internal_is_screenshot_job: true,
        invalidate_cache: true,
        is_formatting_instruction: true,
        job_timeout_extra_time_per_page_in_seconds: 0,
        job_timeout_in_seconds: 0,
        keep_page_separator_when_merging_tables: true,
        languages: ['abq'],
        layout_aware: true,
        line_level_bounding_box: true,
        markdown_table_multiline_header_separator: 'markdown_table_multiline_header_separator',
        max_pages: 0,
        max_pages_enforced: 0,
        merge_tables_across_pages_in_markdown: true,
        model: 'model',
        outlined_table_extraction: true,
        output_pdf_of_document: true,
        output_s3_path_prefix: 'output_s3_path_prefix',
        output_s3_region: 'output_s3_region',
        output_tables_as_HTML: true,
        page_error_tolerance: 0,
        page_footer_prefix: 'page_footer_prefix',
        page_footer_suffix: 'page_footer_suffix',
        page_header_prefix: 'page_header_prefix',
        page_header_suffix: 'page_header_suffix',
        page_prefix: 'page_prefix',
        page_separator: 'page_separator',
        page_suffix: 'page_suffix',
        parse_mode: 'parse_document_with_agent',
        parsing_instruction: 'parsing_instruction',
        precise_bounding_box: true,
        premium_mode: true,
        presentation_out_of_bounds_content: true,
        presentation_skip_embedded_data: true,
        preserve_layout_alignment_across_pages: true,
        preserve_very_small_text: true,
        preset: 'preset',
        priority: 'critical',
        project_id: 'project_id',
        remove_hidden_text: true,
        replace_failed_page_mode: 'blank_page',
        replace_failed_page_with_error_message_prefix: 'replace_failed_page_with_error_message_prefix',
        replace_failed_page_with_error_message_suffix: 'replace_failed_page_with_error_message_suffix',
        save_images: true,
        skip_diagonal_text: true,
        specialized_chart_parsing_agentic: true,
        specialized_chart_parsing_efficient: true,
        specialized_chart_parsing_plus: true,
        specialized_image_parsing: true,
        spreadsheet_extract_sub_tables: true,
        spreadsheet_force_formula_computation: true,
        spreadsheet_include_hidden_sheets: true,
        strict_mode_buggy_font: true,
        strict_mode_image_extraction: true,
        strict_mode_image_ocr: true,
        strict_mode_reconstruction: true,
        structured_output: true,
        structured_output_json_schema: 'structured_output_json_schema',
        structured_output_json_schema_name: 'structured_output_json_schema_name',
        system_prompt: 'system_prompt',
        system_prompt_append: 'system_prompt_append',
        take_screenshot: true,
        target_pages: 'target_pages',
        tier: 'tier',
        use_vendor_multimodal_model: true,
        user_prompt: 'user_prompt',
        vendor_multimodal_api_key: 'vendor_multimodal_api_key',
        vendor_multimodal_model_name: 'vendor_multimodal_model_name',
        version: 'version',
        webhook_configurations: [
          {
            webhook_events: ['parse.success', 'parse.error'],
            webhook_headers: { Authorization: 'Bearer sk-...' },
            webhook_output_format: 'json',
            webhook_signing_secret: 'whsec_...',
            webhook_url: 'https://example.com/webhooks/llamacloud',
          },
        ],
        webhook_url: 'webhook_url',
      },
      managed_pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      metadata_config: { excluded_embed_metadata_keys: ['string'], excluded_llm_metadata_keys: ['string'] },
      pipeline_type: 'MANAGED',
      preset_retrieval_parameters: {
        alpha: 0,
        class_name: 'class_name',
        dense_similarity_cutoff: 0,
        dense_similarity_top_k: 1,
        enable_reranking: true,
        files_top_k: 1,
        rerank_top_n: 1,
        retrieval_mode: 'auto_routed',
        retrieve_image_nodes: true,
        retrieve_page_figure_nodes: true,
        retrieve_page_screenshot_nodes: true,
        search_filters: {
          filters: [
            {
              key: 'key',
              value: 0,
              operator: '!=',
            },
          ],
          condition: 'and',
        },
        search_filters_inference_schema: { foo: { foo: 'bar' } },
        sparse_similarity_top_k: 1,
      },
      sparse_model_config: { class_name: 'class_name', model_type: 'auto' },
      status: 'status',
      transform_config: {
        chunk_overlap: 0,
        chunk_size: 1,
        mode: 'auto',
      },
    });
  });

  // Mock server tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.pipelines.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.pipelines.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.pipelines.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getStatus', async () => {
    const responsePromise = client.pipelines.getStatus('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getStatus: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.pipelines.getStatus(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { full_details: true },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LlamaCloud.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('upsert: only required params', async () => {
    const responsePromise = client.pipelines.upsert({ name: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('upsert: required and optional params', async () => {
    const response = await client.pipelines.upsert({
      name: 'x',
      organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      data_sink: {
        component: { foo: 'bar' },
        name: 'name',
        sink_type: 'ASTRA_DB',
      },
      data_sink_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      embedding_config: {
        component: {
          additional_kwargs: { foo: 'bar' },
          api_base: 'api_base',
          api_key: 'api_key',
          api_version: 'api_version',
          azure_deployment: 'azure_deployment',
          azure_endpoint: 'azure_endpoint',
          class_name: 'class_name',
          default_headers: { foo: 'string' },
          dimensions: 0,
          embed_batch_size: 1,
          max_retries: 0,
          model_name: 'model_name',
          num_workers: 0,
          reuse_client: true,
          timeout: 0,
        },
        type: 'AZURE_EMBEDDING',
      },
      embedding_model_config_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      llama_parse_parameters: {
        adaptive_long_table: true,
        aggressive_table_extraction: true,
        annotate_links: true,
        annotate_revisions: true,
        auto_mode: true,
        auto_mode_configuration_json: 'auto_mode_configuration_json',
        auto_mode_trigger_on_image_in_page: true,
        auto_mode_trigger_on_regexp_in_page: 'auto_mode_trigger_on_regexp_in_page',
        auto_mode_trigger_on_table_in_page: true,
        auto_mode_trigger_on_text_in_page: 'auto_mode_trigger_on_text_in_page',
        azure_openai_api_version: 'azure_openai_api_version',
        azure_openai_deployment_name: 'azure_openai_deployment_name',
        azure_openai_endpoint: 'azure_openai_endpoint',
        azure_openai_key: 'azure_openai_key',
        bbox_bottom: 0,
        bbox_left: 0,
        bbox_right: 0,
        bbox_top: 0,
        bounding_box: 'bounding_box',
        compact_markdown_table: true,
        complemental_formatting_instruction: 'complemental_formatting_instruction',
        confidence_score_effort: 'confidence_score_effort',
        content_guideline_instruction: 'content_guideline_instruction',
        continuous_mode: true,
        disable_image_extraction: true,
        disable_ocr: true,
        disable_reconstruction: true,
        do_not_cache: true,
        do_not_unroll_columns: true,
        enable_cost_optimizer: true,
        extract_charts: true,
        extract_layout: true,
        extract_printed_page_number: true,
        fast_mode: true,
        formatting_instruction: 'formatting_instruction',
        gpt4o_api_key: 'gpt4o_api_key',
        gpt4o_mode: true,
        guess_xlsx_sheet_name: true,
        hide_footers: true,
        hide_headers: true,
        high_res_ocr: true,
        html_make_all_elements_visible: true,
        html_remove_fixed_elements: true,
        html_remove_navigation_elements: true,
        http_proxy: 'http_proxy',
        ignore_document_elements_for_layout_detection: true,
        images_to_save: ['embedded'],
        inline_images_in_markdown: true,
        input_s3_path: 'input_s3_path',
        input_s3_region: 'input_s3_region',
        input_url: 'input_url',
        internal_is_screenshot_job: true,
        invalidate_cache: true,
        is_formatting_instruction: true,
        job_timeout_extra_time_per_page_in_seconds: 0,
        job_timeout_in_seconds: 0,
        keep_page_separator_when_merging_tables: true,
        languages: ['abq'],
        layout_aware: true,
        line_level_bounding_box: true,
        markdown_table_multiline_header_separator: 'markdown_table_multiline_header_separator',
        max_pages: 0,
        max_pages_enforced: 0,
        merge_tables_across_pages_in_markdown: true,
        model: 'model',
        outlined_table_extraction: true,
        output_pdf_of_document: true,
        output_s3_path_prefix: 'output_s3_path_prefix',
        output_s3_region: 'output_s3_region',
        output_tables_as_HTML: true,
        page_error_tolerance: 0,
        page_footer_prefix: 'page_footer_prefix',
        page_footer_suffix: 'page_footer_suffix',
        page_header_prefix: 'page_header_prefix',
        page_header_suffix: 'page_header_suffix',
        page_prefix: 'page_prefix',
        page_separator: 'page_separator',
        page_suffix: 'page_suffix',
        parse_mode: 'parse_document_with_agent',
        parsing_instruction: 'parsing_instruction',
        precise_bounding_box: true,
        premium_mode: true,
        presentation_out_of_bounds_content: true,
        presentation_skip_embedded_data: true,
        preserve_layout_alignment_across_pages: true,
        preserve_very_small_text: true,
        preset: 'preset',
        priority: 'critical',
        project_id: 'project_id',
        remove_hidden_text: true,
        replace_failed_page_mode: 'blank_page',
        replace_failed_page_with_error_message_prefix: 'replace_failed_page_with_error_message_prefix',
        replace_failed_page_with_error_message_suffix: 'replace_failed_page_with_error_message_suffix',
        save_images: true,
        skip_diagonal_text: true,
        specialized_chart_parsing_agentic: true,
        specialized_chart_parsing_efficient: true,
        specialized_chart_parsing_plus: true,
        specialized_image_parsing: true,
        spreadsheet_extract_sub_tables: true,
        spreadsheet_force_formula_computation: true,
        spreadsheet_include_hidden_sheets: true,
        strict_mode_buggy_font: true,
        strict_mode_image_extraction: true,
        strict_mode_image_ocr: true,
        strict_mode_reconstruction: true,
        structured_output: true,
        structured_output_json_schema: 'structured_output_json_schema',
        structured_output_json_schema_name: 'structured_output_json_schema_name',
        system_prompt: 'system_prompt',
        system_prompt_append: 'system_prompt_append',
        take_screenshot: true,
        target_pages: 'target_pages',
        tier: 'tier',
        use_vendor_multimodal_model: true,
        user_prompt: 'user_prompt',
        vendor_multimodal_api_key: 'vendor_multimodal_api_key',
        vendor_multimodal_model_name: 'vendor_multimodal_model_name',
        version: 'version',
        webhook_configurations: [
          {
            webhook_events: ['parse.success', 'parse.error'],
            webhook_headers: { Authorization: 'Bearer sk-...' },
            webhook_output_format: 'json',
            webhook_signing_secret: 'whsec_...',
            webhook_url: 'https://example.com/webhooks/llamacloud',
          },
        ],
        webhook_url: 'webhook_url',
      },
      managed_pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      metadata_config: { excluded_embed_metadata_keys: ['string'], excluded_llm_metadata_keys: ['string'] },
      pipeline_type: 'MANAGED',
      preset_retrieval_parameters: {
        alpha: 0,
        class_name: 'class_name',
        dense_similarity_cutoff: 0,
        dense_similarity_top_k: 1,
        enable_reranking: true,
        files_top_k: 1,
        rerank_top_n: 1,
        retrieval_mode: 'auto_routed',
        retrieve_image_nodes: true,
        retrieve_page_figure_nodes: true,
        retrieve_page_screenshot_nodes: true,
        search_filters: {
          filters: [
            {
              key: 'key',
              value: 0,
              operator: '!=',
            },
          ],
          condition: 'and',
        },
        search_filters_inference_schema: { foo: { foo: 'bar' } },
        sparse_similarity_top_k: 1,
      },
      sparse_model_config: { class_name: 'class_name', model_type: 'auto' },
      status: 'status',
      transform_config: {
        chunk_overlap: 0,
        chunk_size: 1,
        mode: 'auto',
      },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.pipelines.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { query: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.pipelines.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      query: 'x',
      organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      alpha: 0,
      class_name: 'class_name',
      dense_similarity_cutoff: 0,
      dense_similarity_top_k: 1,
      enable_reranking: true,
      files_top_k: 1,
      rerank_top_n: 1,
      retrieval_mode: 'auto_routed',
      retrieve_image_nodes: true,
      retrieve_page_figure_nodes: true,
      retrieve_page_screenshot_nodes: true,
      search_filters: {
        filters: [
          {
            key: 'key',
            value: 0,
            operator: '!=',
          },
        ],
        condition: 'and',
      },
      search_filters_inference_schema: { foo: { foo: 'bar' } },
      sparse_similarity_top_k: 1,
    });
  });
});
