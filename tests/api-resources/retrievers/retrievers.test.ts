// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaCloud from '@llamaindex/llama-cloud';

const client = new LlamaCloud({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource retrievers', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.retrievers.create({ name: 'x' });
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
    const response = await client.retrievers.create({
      name: 'x',
      organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      pipelines: [
        {
          description: 'description',
          name: 'x',
          pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
        },
      ],
    });
  });

  // Mock server tests are disabled
  test.skip('upsert: only required params', async () => {
    const responsePromise = client.retrievers.upsert({ name: 'x' });
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
    const response = await client.retrievers.upsert({
      name: 'x',
      organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      pipelines: [
        {
          description: 'description',
          name: 'x',
          pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
        },
      ],
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.retrievers.list();
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
      client.retrievers.list(
        {
          name: 'name',
          organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LlamaCloud.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('listPaginated', async () => {
    const responsePromise = client.retrievers.listPaginated();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listPaginated: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.retrievers.listPaginated(
        {
          include_total: true,
          name: 'name',
          organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          page_size: 1,
          page_token: 'page_token',
          project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LlamaCloud.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.retrievers.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
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
      client.retrievers.get(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LlamaCloud.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.retrievers.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      pipelines: [
        {
          description: 'description',
          name: 'x',
          pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
      ],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.retrievers.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      pipelines: [
        {
          description: 'description',
          name: 'x',
          pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
        },
      ],
      organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      name: 'name',
    });
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.retrievers.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.retrievers.delete(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LlamaCloud.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('search: only required params', async () => {
    const responsePromise = client.retrievers.search({ query: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('search: required and optional params', async () => {
    const response = await client.retrievers.search({
      query: 'x',
      organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      mode: 'full',
      pipelines: [
        {
          description: 'description',
          name: 'x',
          pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
        },
      ],
      rerank_config: { top_n: 1, type: 'bedrock' },
      rerank_top_n: 0,
    });
  });
});
