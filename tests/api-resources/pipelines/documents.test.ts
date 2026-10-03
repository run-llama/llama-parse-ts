// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaCloud from '@llamaindex/llama-cloud';

const client = new LlamaCloud({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource documents', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.pipelines.documents.create('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      body: [
        {
          metadata: { foo: 'bar' },
          text: 'text',
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
  test.skip('create: required and optional params', async () => {
    const response = await client.pipelines.documents.create('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      body: [
        {
          metadata: { foo: 'bar' },
          text: 'text',
          id: 'id',
          excluded_embed_metadata_keys: ['string'],
          excluded_llm_metadata_keys: ['string'],
          page_positions: [0],
        },
      ],
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.pipelines.documents.list('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
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
      client.pipelines.documents.list(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          file_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          limit: 0,
          only_api_data_source_documents: true,
          only_direct_upload: true,
          skip: 0,
          status_refresh_policy: 'cached',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LlamaCloud.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('getStatusCounts', async () => {
    const responsePromise = client.pipelines.documents.getStatusCounts(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getStatusCounts: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.pipelines.documents.getStatusCounts(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          data_source_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          file_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          only_direct_upload: true,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LlamaCloud.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('get: only required params', async () => {
    const responsePromise = client.pipelines.documents.get('document_id', {
      pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
  test.skip('get: required and optional params', async () => {
    const response = await client.pipelines.documents.get('document_id', {
      pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.pipelines.documents.delete('document_id', {
      pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
  test.skip('delete: required and optional params', async () => {
    const response = await client.pipelines.documents.delete('document_id', {
      pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('getStatus: only required params', async () => {
    const responsePromise = client.pipelines.documents.getStatus('document_id', {
      pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
  test.skip('getStatus: required and optional params', async () => {
    const response = await client.pipelines.documents.getStatus('document_id', {
      pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('sync: only required params', async () => {
    const responsePromise = client.pipelines.documents.sync('document_id', {
      pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
  test.skip('sync: required and optional params', async () => {
    const response = await client.pipelines.documents.sync('document_id', {
      pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('getChunks: only required params', async () => {
    const responsePromise = client.pipelines.documents.getChunks('document_id', {
      pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
  test.skip('getChunks: required and optional params', async () => {
    const response = await client.pipelines.documents.getChunks('document_id', {
      pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('upsert: only required params', async () => {
    const responsePromise = client.pipelines.documents.upsert('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      body: [
        {
          metadata: { foo: 'bar' },
          text: 'text',
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
  test.skip('upsert: required and optional params', async () => {
    const response = await client.pipelines.documents.upsert('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      body: [
        {
          metadata: { foo: 'bar' },
          text: 'text',
          id: 'id',
          excluded_embed_metadata_keys: ['string'],
          excluded_llm_metadata_keys: ['string'],
          page_positions: [0],
        },
      ],
    });
  });
});
