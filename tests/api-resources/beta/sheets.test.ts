// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaCloud from '@llamaindex/llama-cloud';

const client = new LlamaCloud({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource sheets', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.beta.sheets.create({ file_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });
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
    const response = await client.beta.sheets.create({
      file_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      config: {
        extraction_range: 'extraction_range',
        flatten_hierarchical_tables: true,
        generate_additional_metadata: true,
        include_hidden_cells: true,
        sheet_names: ['string'],
        specialization: 'specialization',
        table_merge_sensitivity: 'strong',
        tier: 'agentic',
        use_experimental_processing: true,
      },
      configuration: {
        extraction_range: 'extraction_range',
        flatten_hierarchical_tables: true,
        generate_additional_metadata: true,
        include_hidden_cells: true,
        sheet_names: ['string'],
        specialization: 'specialization',
        table_merge_sensitivity: 'strong',
        tier: 'agentic',
        use_experimental_processing: true,
      },
      configuration_id: 'cfg-11111111-2222-3333-4444-555555555555',
      webhook_configuration_ids: ['whc-...', 'whc-...'],
      webhook_configurations: [
        {
          webhook_events: ['parse.success', 'parse.error'],
          webhook_headers: { Authorization: 'Bearer sk-...' },
          webhook_output_format: 'json',
          webhook_signing_secret: 'whsec_...',
          webhook_url: 'https://example.com/webhooks/llamacloud',
        },
      ],
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.beta.sheets.list();
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
      client.beta.sheets.list(
        {
          configuration_id: 'configuration_id',
          created_at_on_or_after: '2019-12-27T18:11:19.117Z',
          created_at_on_or_before: '2019-12-27T18:11:19.117Z',
          include_results: true,
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
  test.skip('get', async () => {
    const responsePromise = client.beta.sheets.get('spreadsheet_job_id');
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
      client.beta.sheets.get(
        'spreadsheet_job_id',
        {
          expand: ['string'],
          include_results: true,
          organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LlamaCloud.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('getResultTable: only required params', async () => {
    const responsePromise = client.beta.sheets.getResultTable('cell_metadata', {
      spreadsheet_job_id: 'spreadsheet_job_id',
      region_id: 'region_id',
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
  test.skip('getResultTable: required and optional params', async () => {
    const response = await client.beta.sheets.getResultTable('cell_metadata', {
      spreadsheet_job_id: 'spreadsheet_job_id',
      region_id: 'region_id',
      expires_at_seconds: 0,
      organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('deleteJob', async () => {
    const responsePromise = client.beta.sheets.deleteJob('spreadsheet_job_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('deleteJob: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.beta.sheets.deleteJob(
        'spreadsheet_job_id',
        {
          organization_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          project_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LlamaCloud.NotFoundError);
  });
});
