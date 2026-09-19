// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaCloud from '@llamaindex/llama-cloud';

const client = new LlamaCloud({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource retrieval', () => {
  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.beta.retrieval.retrieve({
      index_id: 'idx-abc123',
      query: 'What are the key findings?',
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
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.beta.retrieval.retrieve({
      index_id: 'idx-abc123',
      query: 'What are the key findings?',
      organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      custom_filters: { foo: { operator: 'eq', value: 'string' } },
      full_text_pipeline_weight: 0,
      num_candidates: 0,
      rerank: { enabled: true, top_n: 5 },
      score_threshold: 0,
      static_filters: { parsed_directory_file_id: { operator: 'eq', value: 'string' } },
      top_k: 10,
      vector_pipeline_weight: 0,
    });
  });

  // Mock server tests are disabled
  test.skip('find: only required params', async () => {
    const responsePromise = client.beta.retrieval.find({ index_id: 'idx-abc123' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('find: required and optional params', async () => {
    const response = await client.beta.retrieval.find({
      index_id: 'idx-abc123',
      organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      file_name: 'file_name',
      file_name_contains: 'file_name_contains',
      page_size: 0,
      page_token: 'page_token',
    });
  });

  // Mock server tests are disabled
  test.skip('grep: only required params', async () => {
    const responsePromise = client.beta.retrieval.grep({
      file_id: 'file_id',
      index_id: 'idx-abc123',
      pattern: 'revenue|profit',
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
  test.skip('grep: required and optional params', async () => {
    const response = await client.beta.retrieval.grep({
      file_id: 'file_id',
      index_id: 'idx-abc123',
      pattern: 'revenue|profit',
      organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      context_chars: 0,
      page_size: 0,
      page_token: 'page_token',
    });
  });

  // Mock server tests are disabled
  test.skip('read: only required params', async () => {
    const responsePromise = client.beta.retrieval.read({ file_id: 'file_id', index_id: 'idx-abc123' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('read: required and optional params', async () => {
    const response = await client.beta.retrieval.read({
      file_id: 'file_id',
      index_id: 'idx-abc123',
      organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      max_length: 0,
      offset: 0,
    });
  });
});
