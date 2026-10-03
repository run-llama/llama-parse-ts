// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaCloud from '@llamaindex/llama-cloud';

const client = new LlamaCloud({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource dataSources', () => {
  // Mock server tests are disabled
  test.skip('getDataSources', async () => {
    const responsePromise = client.pipelines.dataSources.getDataSources(
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
  test.skip('updateDataSources: only required params', async () => {
    const responsePromise = client.pipelines.dataSources.updateDataSources(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { body: [{ data_source_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }] },
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
  test.skip('updateDataSources: required and optional params', async () => {
    const response = await client.pipelines.dataSources.updateDataSources(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { body: [{ data_source_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', sync_interval: 0 }] },
    );
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.pipelines.dataSources.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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
  test.skip('update: required and optional params', async () => {
    const response = await client.pipelines.dataSources.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      sync_interval: 0,
    });
  });

  // Mock server tests are disabled
  test.skip('getStatus: only required params', async () => {
    const responsePromise = client.pipelines.dataSources.getStatus('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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
    const response = await client.pipelines.dataSources.getStatus('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('sync: only required params', async () => {
    const responsePromise = client.pipelines.dataSources.sync('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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
    const response = await client.pipelines.dataSources.sync('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      pipeline_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      pipeline_file_ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
    });
  });
});
