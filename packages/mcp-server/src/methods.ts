// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.files.create',
    fullyQualifiedName: 'files.create',
    httpMethod: 'post',
    httpPath: '/api/v1/beta/files',
  },
  {
    clientCallName: 'client.files.query',
    fullyQualifiedName: 'files.query',
    httpMethod: 'post',
    httpPath: '/api/v1/beta/files/query',
  },
  {
    clientCallName: 'client.files.list',
    fullyQualifiedName: 'files.list',
    httpMethod: 'get',
    httpPath: '/api/v1/beta/files',
  },
  {
    clientCallName: 'client.files.retrieve',
    fullyQualifiedName: 'files.retrieve',
    httpMethod: 'get',
    httpPath: '/api/v1/beta/files/{file_id}',
  },
  {
    clientCallName: 'client.files.delete',
    fullyQualifiedName: 'files.delete',
    httpMethod: 'delete',
    httpPath: '/api/v1/beta/files/{file_id}',
  },
  {
    clientCallName: 'client.files.content',
    fullyQualifiedName: 'files.content',
    httpMethod: 'get',
    httpPath: '/api/v1/beta/files/{file_id}/content',
  },
  {
    clientCallName: 'client.split.create',
    fullyQualifiedName: 'split.create',
    httpMethod: 'post',
    httpPath: '/api/v1/split/jobs',
  },
  {
    clientCallName: 'client.split.list',
    fullyQualifiedName: 'split.list',
    httpMethod: 'get',
    httpPath: '/api/v1/split/jobs',
  },
  {
    clientCallName: 'client.split.get',
    fullyQualifiedName: 'split.get',
    httpMethod: 'get',
    httpPath: '/api/v1/split/jobs/{split_job_id}',
  },
  {
    clientCallName: 'client.split.delete',
    fullyQualifiedName: 'split.delete',
    httpMethod: 'delete',
    httpPath: '/api/v1/split/jobs/{split_job_id}',
  },
  {
    clientCallName: 'client.split.cancel',
    fullyQualifiedName: 'split.cancel',
    httpMethod: 'post',
    httpPath: '/api/v1/split/jobs/{split_job_id}/cancel',
  },
  {
    clientCallName: 'client.parsing.create',
    fullyQualifiedName: 'parsing.create',
    httpMethod: 'post',
    httpPath: '/api/v2/parse',
  },
  {
    clientCallName: 'client.parsing.get',
    fullyQualifiedName: 'parsing.get',
    httpMethod: 'get',
    httpPath: '/api/v2/parse/{job_id}',
  },
  {
    clientCallName: 'client.parsing.list',
    fullyQualifiedName: 'parsing.list',
    httpMethod: 'get',
    httpPath: '/api/v2/parse',
  },
  {
    clientCallName: 'client.parsing.cancel',
    fullyQualifiedName: 'parsing.cancel',
    httpMethod: 'post',
    httpPath: '/api/v2/parse/{job_id}/cancel',
  },
  {
    clientCallName: 'client.parsing.delete',
    fullyQualifiedName: 'parsing.delete',
    httpMethod: 'delete',
    httpPath: '/api/v2/parse/{job_id}',
  },
  {
    clientCallName: 'client.parsing.listVersions',
    fullyQualifiedName: 'parsing.listVersions',
    httpMethod: 'get',
    httpPath: '/api/v2/parse/versions',
  },
  {
    clientCallName: 'client.extract.create',
    fullyQualifiedName: 'extract.create',
    httpMethod: 'post',
    httpPath: '/api/v2/extract',
  },
  {
    clientCallName: 'client.extract.list',
    fullyQualifiedName: 'extract.list',
    httpMethod: 'get',
    httpPath: '/api/v2/extract',
  },
  {
    clientCallName: 'client.extract.get',
    fullyQualifiedName: 'extract.get',
    httpMethod: 'get',
    httpPath: '/api/v2/extract/{job_id}',
  },
  {
    clientCallName: 'client.extract.delete',
    fullyQualifiedName: 'extract.delete',
    httpMethod: 'delete',
    httpPath: '/api/v2/extract/{job_id}',
  },
  {
    clientCallName: 'client.extract.cancel',
    fullyQualifiedName: 'extract.cancel',
    httpMethod: 'post',
    httpPath: '/api/v2/extract/{job_id}/cancel',
  },
  {
    clientCallName: 'client.extract.validateSchema',
    fullyQualifiedName: 'extract.validateSchema',
    httpMethod: 'post',
    httpPath: '/api/v2/extract/schema/validation',
  },
  {
    clientCallName: 'client.extract.generateSchema',
    fullyQualifiedName: 'extract.generateSchema',
    httpMethod: 'post',
    httpPath: '/api/v2/extract/schema/generate',
  },
  {
    clientCallName: 'client.batches.create',
    fullyQualifiedName: 'batches.create',
    httpMethod: 'post',
    httpPath: '/api/v2/batches',
  },
  {
    clientCallName: 'client.batches.list',
    fullyQualifiedName: 'batches.list',
    httpMethod: 'get',
    httpPath: '/api/v2/batches',
  },
  {
    clientCallName: 'client.batches.get',
    fullyQualifiedName: 'batches.get',
    httpMethod: 'get',
    httpPath: '/api/v2/batches/{batch_id}',
  },
  {
    clientCallName: 'client.batches.cancel',
    fullyQualifiedName: 'batches.cancel',
    httpMethod: 'post',
    httpPath: '/api/v2/batches/{batch_id}/cancel',
  },
  {
    clientCallName: 'client.classify.create',
    fullyQualifiedName: 'classify.create',
    httpMethod: 'post',
    httpPath: '/api/v2/classify',
  },
  {
    clientCallName: 'client.classify.list',
    fullyQualifiedName: 'classify.list',
    httpMethod: 'get',
    httpPath: '/api/v2/classify',
  },
  {
    clientCallName: 'client.classify.get',
    fullyQualifiedName: 'classify.get',
    httpMethod: 'get',
    httpPath: '/api/v2/classify/{job_id}',
  },
  {
    clientCallName: 'client.classify.cancel',
    fullyQualifiedName: 'classify.cancel',
    httpMethod: 'post',
    httpPath: '/api/v2/classify/{job_id}/cancel',
  },
  {
    clientCallName: 'client.configurations.create',
    fullyQualifiedName: 'configurations.create',
    httpMethod: 'post',
    httpPath: '/api/v1/beta/configurations',
  },
  {
    clientCallName: 'client.configurations.list',
    fullyQualifiedName: 'configurations.list',
    httpMethod: 'get',
    httpPath: '/api/v1/beta/configurations',
  },
  {
    clientCallName: 'client.configurations.retrieve',
    fullyQualifiedName: 'configurations.retrieve',
    httpMethod: 'get',
    httpPath: '/api/v1/beta/configurations/{config_id}',
  },
  {
    clientCallName: 'client.configurations.update',
    fullyQualifiedName: 'configurations.update',
    httpMethod: 'put',
    httpPath: '/api/v1/beta/configurations/{config_id}',
  },
  {
    clientCallName: 'client.configurations.delete',
    fullyQualifiedName: 'configurations.delete',
    httpMethod: 'delete',
    httpPath: '/api/v1/beta/configurations/{config_id}',
  },
  {
    clientCallName: 'client.webhookConfigs.create',
    fullyQualifiedName: 'webhookConfigs.create',
    httpMethod: 'post',
    httpPath: '/api/v1/beta/webhook-configs',
  },
  {
    clientCallName: 'client.webhookConfigs.list',
    fullyQualifiedName: 'webhookConfigs.list',
    httpMethod: 'get',
    httpPath: '/api/v1/beta/webhook-configs',
  },
  {
    clientCallName: 'client.webhookConfigs.retrieve',
    fullyQualifiedName: 'webhookConfigs.retrieve',
    httpMethod: 'get',
    httpPath: '/api/v1/beta/webhook-configs/{config_id}',
  },
  {
    clientCallName: 'client.webhookConfigs.update',
    fullyQualifiedName: 'webhookConfigs.update',
    httpMethod: 'put',
    httpPath: '/api/v1/beta/webhook-configs/{config_id}',
  },
  {
    clientCallName: 'client.webhookConfigs.delete',
    fullyQualifiedName: 'webhookConfigs.delete',
    httpMethod: 'delete',
    httpPath: '/api/v1/beta/webhook-configs/{config_id}',
  },
  {
    clientCallName: 'client.projects.list',
    fullyQualifiedName: 'projects.list',
    httpMethod: 'get',
    httpPath: '/api/v1/projects',
  },
  {
    clientCallName: 'client.projects.get',
    fullyQualifiedName: 'projects.get',
    httpMethod: 'get',
    httpPath: '/api/v1/projects/{project_id}',
  },
  {
    clientCallName: 'client.v2Projects.list',
    fullyQualifiedName: 'v2Projects.list',
    httpMethod: 'get',
    httpPath: '/api/v2/projects',
  },
  {
    clientCallName: 'client.v2Projects.get',
    fullyQualifiedName: 'v2Projects.get',
    httpMethod: 'get',
    httpPath: '/api/v2/projects/{project_id}',
  },
  {
    clientCallName: 'client.jobDataPoints.list',
    fullyQualifiedName: 'jobDataPoints.list',
    httpMethod: 'get',
    httpPath: '/api/v1/job-data-points',
  },
  {
    clientCallName: 'client.dataSinks.list',
    fullyQualifiedName: 'dataSinks.list',
    httpMethod: 'get',
    httpPath: '/api/v1/data-sinks',
  },
  {
    clientCallName: 'client.dataSinks.listPaginated',
    fullyQualifiedName: 'dataSinks.listPaginated',
    httpMethod: 'get',
    httpPath: '/api/v1/beta/data-sinks',
  },
  {
    clientCallName: 'client.dataSinks.create',
    fullyQualifiedName: 'dataSinks.create',
    httpMethod: 'post',
    httpPath: '/api/v1/data-sinks',
  },
  {
    clientCallName: 'client.dataSinks.get',
    fullyQualifiedName: 'dataSinks.get',
    httpMethod: 'get',
    httpPath: '/api/v1/data-sinks/{data_sink_id}',
  },
  {
    clientCallName: 'client.dataSinks.update',
    fullyQualifiedName: 'dataSinks.update',
    httpMethod: 'put',
    httpPath: '/api/v1/data-sinks/{data_sink_id}',
  },
  {
    clientCallName: 'client.dataSinks.delete',
    fullyQualifiedName: 'dataSinks.delete',
    httpMethod: 'delete',
    httpPath: '/api/v1/data-sinks/{data_sink_id}',
  },
  {
    clientCallName: 'client.extractionAgents.list',
    fullyQualifiedName: 'extractionAgents.list',
    httpMethod: 'get',
    httpPath: '/api/v1/beta/extraction-agents',
  },
  {
    clientCallName: 'client.dataSources.list',
    fullyQualifiedName: 'dataSources.list',
    httpMethod: 'get',
    httpPath: '/api/v1/data-sources',
  },
  {
    clientCallName: 'client.dataSources.create',
    fullyQualifiedName: 'dataSources.create',
    httpMethod: 'post',
    httpPath: '/api/v1/data-sources',
  },
  {
    clientCallName: 'client.dataSources.get',
    fullyQualifiedName: 'dataSources.get',
    httpMethod: 'get',
    httpPath: '/api/v1/data-sources/{data_source_id}',
  },
  {
    clientCallName: 'client.dataSources.update',
    fullyQualifiedName: 'dataSources.update',
    httpMethod: 'put',
    httpPath: '/api/v1/data-sources/{data_source_id}',
  },
  {
    clientCallName: 'client.dataSources.delete',
    fullyQualifiedName: 'dataSources.delete',
    httpMethod: 'delete',
    httpPath: '/api/v1/data-sources/{data_source_id}',
  },
  {
    clientCallName: 'client.pipelines.list',
    fullyQualifiedName: 'pipelines.list',
    httpMethod: 'get',
    httpPath: '/api/v1/pipelines',
  },
  {
    clientCallName: 'client.pipelines.listPaginated',
    fullyQualifiedName: 'pipelines.listPaginated',
    httpMethod: 'get',
    httpPath: '/api/v2/pipelines',
  },
  {
    clientCallName: 'client.pipelines.create',
    fullyQualifiedName: 'pipelines.create',
    httpMethod: 'post',
    httpPath: '/api/v1/pipelines',
  },
  {
    clientCallName: 'client.pipelines.get',
    fullyQualifiedName: 'pipelines.get',
    httpMethod: 'get',
    httpPath: '/api/v1/pipelines/{pipeline_id}',
  },
  {
    clientCallName: 'client.pipelines.update',
    fullyQualifiedName: 'pipelines.update',
    httpMethod: 'put',
    httpPath: '/api/v1/pipelines/{pipeline_id}',
  },
  {
    clientCallName: 'client.pipelines.delete',
    fullyQualifiedName: 'pipelines.delete',
    httpMethod: 'delete',
    httpPath: '/api/v1/pipelines/{pipeline_id}',
  },
  {
    clientCallName: 'client.pipelines.getStatus',
    fullyQualifiedName: 'pipelines.getStatus',
    httpMethod: 'get',
    httpPath: '/api/v1/pipelines/{pipeline_id}/status',
  },
  {
    clientCallName: 'client.pipelines.upsert',
    fullyQualifiedName: 'pipelines.upsert',
    httpMethod: 'put',
    httpPath: '/api/v1/pipelines',
  },
  {
    clientCallName: 'client.pipelines.retrieve',
    fullyQualifiedName: 'pipelines.retrieve',
    httpMethod: 'post',
    httpPath: '/api/v1/pipelines/{pipeline_id}/retrieve',
  },
  {
    clientCallName: 'client.pipelines.sync.create',
    fullyQualifiedName: 'pipelines.sync.create',
    httpMethod: 'post',
    httpPath: '/api/v1/pipelines/{pipeline_id}/sync',
  },
  {
    clientCallName: 'client.pipelines.sync.cancel',
    fullyQualifiedName: 'pipelines.sync.cancel',
    httpMethod: 'post',
    httpPath: '/api/v1/pipelines/{pipeline_id}/sync/cancel',
  },
  {
    clientCallName: 'client.pipelines.dataSources.getDataSources',
    fullyQualifiedName: 'pipelines.dataSources.getDataSources',
    httpMethod: 'get',
    httpPath: '/api/v1/pipelines/{pipeline_id}/data-sources',
  },
  {
    clientCallName: 'client.pipelines.dataSources.updateDataSources',
    fullyQualifiedName: 'pipelines.dataSources.updateDataSources',
    httpMethod: 'put',
    httpPath: '/api/v1/pipelines/{pipeline_id}/data-sources',
  },
  {
    clientCallName: 'client.pipelines.dataSources.update',
    fullyQualifiedName: 'pipelines.dataSources.update',
    httpMethod: 'put',
    httpPath: '/api/v1/pipelines/{pipeline_id}/data-sources/{data_source_id}',
  },
  {
    clientCallName: 'client.pipelines.dataSources.getStatus',
    fullyQualifiedName: 'pipelines.dataSources.getStatus',
    httpMethod: 'get',
    httpPath: '/api/v1/pipelines/{pipeline_id}/data-sources/{data_source_id}/status',
  },
  {
    clientCallName: 'client.pipelines.dataSources.sync',
    fullyQualifiedName: 'pipelines.dataSources.sync',
    httpMethod: 'post',
    httpPath: '/api/v1/pipelines/{pipeline_id}/data-sources/{data_source_id}/sync',
  },
  {
    clientCallName: 'client.pipelines.images.listPageScreenshots',
    fullyQualifiedName: 'pipelines.images.listPageScreenshots',
    httpMethod: 'get',
    httpPath: '/api/v1/files/{id}/page_screenshots',
  },
  {
    clientCallName: 'client.pipelines.images.getPageScreenshot',
    fullyQualifiedName: 'pipelines.images.getPageScreenshot',
    httpMethod: 'get',
    httpPath: '/api/v1/files/{id}/page_screenshots/{page_index}',
  },
  {
    clientCallName: 'client.pipelines.images.getPageFigure',
    fullyQualifiedName: 'pipelines.images.getPageFigure',
    httpMethod: 'get',
    httpPath: '/api/v1/files/{id}/page-figures/{page_index}/{figure_name}',
  },
  {
    clientCallName: 'client.pipelines.images.listPageFigures',
    fullyQualifiedName: 'pipelines.images.listPageFigures',
    httpMethod: 'get',
    httpPath: '/api/v1/files/{id}/page-figures',
  },
  {
    clientCallName: 'client.pipelines.files.getStatusCounts',
    fullyQualifiedName: 'pipelines.files.getStatusCounts',
    httpMethod: 'get',
    httpPath: '/api/v1/pipelines/{pipeline_id}/files/status-counts',
  },
  {
    clientCallName: 'client.pipelines.files.getStatus',
    fullyQualifiedName: 'pipelines.files.getStatus',
    httpMethod: 'get',
    httpPath: '/api/v1/pipelines/{pipeline_id}/files/{file_id}/status',
  },
  {
    clientCallName: 'client.pipelines.files.create',
    fullyQualifiedName: 'pipelines.files.create',
    httpMethod: 'put',
    httpPath: '/api/v1/pipelines/{pipeline_id}/files',
  },
  {
    clientCallName: 'client.pipelines.files.update',
    fullyQualifiedName: 'pipelines.files.update',
    httpMethod: 'put',
    httpPath: '/api/v1/pipelines/{pipeline_id}/files/{file_id}',
  },
  {
    clientCallName: 'client.pipelines.files.delete',
    fullyQualifiedName: 'pipelines.files.delete',
    httpMethod: 'delete',
    httpPath: '/api/v1/pipelines/{pipeline_id}/files/{file_id}',
  },
  {
    clientCallName: 'client.pipelines.files.list',
    fullyQualifiedName: 'pipelines.files.list',
    httpMethod: 'get',
    httpPath: '/api/v1/pipelines/{pipeline_id}/files2',
  },
  {
    clientCallName: 'client.pipelines.metadata.create',
    fullyQualifiedName: 'pipelines.metadata.create',
    httpMethod: 'put',
    httpPath: '/api/v1/pipelines/{pipeline_id}/metadata',
  },
  {
    clientCallName: 'client.pipelines.metadata.deleteAll',
    fullyQualifiedName: 'pipelines.metadata.deleteAll',
    httpMethod: 'delete',
    httpPath: '/api/v1/pipelines/{pipeline_id}/metadata',
  },
  {
    clientCallName: 'client.pipelines.documents.create',
    fullyQualifiedName: 'pipelines.documents.create',
    httpMethod: 'post',
    httpPath: '/api/v1/pipelines/{pipeline_id}/documents',
  },
  {
    clientCallName: 'client.pipelines.documents.list',
    fullyQualifiedName: 'pipelines.documents.list',
    httpMethod: 'get',
    httpPath: '/api/v1/pipelines/{pipeline_id}/documents/paginated',
  },
  {
    clientCallName: 'client.pipelines.documents.getStatusCounts',
    fullyQualifiedName: 'pipelines.documents.getStatusCounts',
    httpMethod: 'get',
    httpPath: '/api/v1/pipelines/{pipeline_id}/documents/status-counts',
  },
  {
    clientCallName: 'client.pipelines.documents.get',
    fullyQualifiedName: 'pipelines.documents.get',
    httpMethod: 'get',
    httpPath: '/api/v1/pipelines/{pipeline_id}/documents/{document_id}',
  },
  {
    clientCallName: 'client.pipelines.documents.delete',
    fullyQualifiedName: 'pipelines.documents.delete',
    httpMethod: 'delete',
    httpPath: '/api/v1/pipelines/{pipeline_id}/documents/{document_id}',
  },
  {
    clientCallName: 'client.pipelines.documents.getStatus',
    fullyQualifiedName: 'pipelines.documents.getStatus',
    httpMethod: 'get',
    httpPath: '/api/v1/pipelines/{pipeline_id}/documents/{document_id}/status',
  },
  {
    clientCallName: 'client.pipelines.documents.sync',
    fullyQualifiedName: 'pipelines.documents.sync',
    httpMethod: 'post',
    httpPath: '/api/v1/pipelines/{pipeline_id}/documents/{document_id}/sync',
  },
  {
    clientCallName: 'client.pipelines.documents.getChunks',
    fullyQualifiedName: 'pipelines.documents.getChunks',
    httpMethod: 'get',
    httpPath: '/api/v1/pipelines/{pipeline_id}/documents/{document_id}/chunks',
  },
  {
    clientCallName: 'client.pipelines.documents.upsert',
    fullyQualifiedName: 'pipelines.documents.upsert',
    httpMethod: 'put',
    httpPath: '/api/v1/pipelines/{pipeline_id}/documents',
  },
  {
    clientCallName: 'client.retrievers.create',
    fullyQualifiedName: 'retrievers.create',
    httpMethod: 'post',
    httpPath: '/api/v1/retrievers',
  },
  {
    clientCallName: 'client.retrievers.upsert',
    fullyQualifiedName: 'retrievers.upsert',
    httpMethod: 'put',
    httpPath: '/api/v1/retrievers',
  },
  {
    clientCallName: 'client.retrievers.list',
    fullyQualifiedName: 'retrievers.list',
    httpMethod: 'get',
    httpPath: '/api/v1/retrievers',
  },
  {
    clientCallName: 'client.retrievers.get',
    fullyQualifiedName: 'retrievers.get',
    httpMethod: 'get',
    httpPath: '/api/v1/retrievers/{retriever_id}',
  },
  {
    clientCallName: 'client.retrievers.update',
    fullyQualifiedName: 'retrievers.update',
    httpMethod: 'put',
    httpPath: '/api/v1/retrievers/{retriever_id}',
  },
  {
    clientCallName: 'client.retrievers.delete',
    fullyQualifiedName: 'retrievers.delete',
    httpMethod: 'delete',
    httpPath: '/api/v1/retrievers/{retriever_id}',
  },
  {
    clientCallName: 'client.retrievers.search',
    fullyQualifiedName: 'retrievers.search',
    httpMethod: 'post',
    httpPath: '/api/v1/retrievers/retrieve',
  },
  {
    clientCallName: 'client.retrievers.retriever.search',
    fullyQualifiedName: 'retrievers.retriever.search',
    httpMethod: 'post',
    httpPath: '/api/v1/retrievers/{retriever_id}/retrieve',
  },
  {
    clientCallName: 'client.beta.indexes.get',
    fullyQualifiedName: 'beta.indexes.get',
    httpMethod: 'get',
    httpPath: '/api/v1/indexes/{index_id}',
  },
  {
    clientCallName: 'client.beta.indexes.delete',
    fullyQualifiedName: 'beta.indexes.delete',
    httpMethod: 'delete',
    httpPath: '/api/v1/indexes/{index_id}',
  },
  {
    clientCallName: 'client.beta.indexes.create',
    fullyQualifiedName: 'beta.indexes.create',
    httpMethod: 'post',
    httpPath: '/api/v1/indexes',
  },
  {
    clientCallName: 'client.beta.indexes.sync',
    fullyQualifiedName: 'beta.indexes.sync',
    httpMethod: 'post',
    httpPath: '/api/v1/indexes/{index_id}/sync',
  },
  {
    clientCallName: 'client.beta.indexes.list',
    fullyQualifiedName: 'beta.indexes.list',
    httpMethod: 'get',
    httpPath: '/api/v1/indexes',
  },
  {
    clientCallName: 'client.beta.retrieval.retrieve',
    fullyQualifiedName: 'beta.retrieval.retrieve',
    httpMethod: 'post',
    httpPath: '/api/v1/retrieval/retrieve',
  },
  {
    clientCallName: 'client.beta.retrieval.find',
    fullyQualifiedName: 'beta.retrieval.find',
    httpMethod: 'post',
    httpPath: '/api/v1/retrieval/files/find',
  },
  {
    clientCallName: 'client.beta.retrieval.grep',
    fullyQualifiedName: 'beta.retrieval.grep',
    httpMethod: 'post',
    httpPath: '/api/v1/retrieval/files/grep',
  },
  {
    clientCallName: 'client.beta.retrieval.read',
    fullyQualifiedName: 'beta.retrieval.read',
    httpMethod: 'post',
    httpPath: '/api/v1/retrieval/files/read',
  },
  {
    clientCallName: 'client.beta.chat.list',
    fullyQualifiedName: 'beta.chat.list',
    httpMethod: 'get',
    httpPath: '/api/v1/chat',
  },
  {
    clientCallName: 'client.beta.chat.create',
    fullyQualifiedName: 'beta.chat.create',
    httpMethod: 'post',
    httpPath: '/api/v1/chat',
  },
  {
    clientCallName: 'client.beta.chat.retrieve',
    fullyQualifiedName: 'beta.chat.retrieve',
    httpMethod: 'get',
    httpPath: '/api/v1/chat/{session_id}',
  },
  {
    clientCallName: 'client.beta.chat.delete',
    fullyQualifiedName: 'beta.chat.delete',
    httpMethod: 'delete',
    httpPath: '/api/v1/chat/{session_id}',
  },
  {
    clientCallName: 'client.beta.chat.getSummary',
    fullyQualifiedName: 'beta.chat.getSummary',
    httpMethod: 'get',
    httpPath: '/api/v1/chat/{session_id}/summary',
  },
  {
    clientCallName: 'client.beta.chat.stream',
    fullyQualifiedName: 'beta.chat.stream',
    httpMethod: 'post',
    httpPath: '/api/v1/chat/{session_id}/messages/stream',
  },
  {
    clientCallName: 'client.beta.agentData.get',
    fullyQualifiedName: 'beta.agentData.get',
    httpMethod: 'get',
    httpPath: '/api/v1/beta/agent-data/{item_id}',
  },
  {
    clientCallName: 'client.beta.agentData.update',
    fullyQualifiedName: 'beta.agentData.update',
    httpMethod: 'put',
    httpPath: '/api/v1/beta/agent-data/{item_id}',
  },
  {
    clientCallName: 'client.beta.agentData.delete',
    fullyQualifiedName: 'beta.agentData.delete',
    httpMethod: 'delete',
    httpPath: '/api/v1/beta/agent-data/{item_id}',
  },
  {
    clientCallName: 'client.beta.agentData.create',
    fullyQualifiedName: 'beta.agentData.create',
    httpMethod: 'post',
    httpPath: '/api/v1/beta/agent-data',
  },
  {
    clientCallName: 'client.beta.agentData.search',
    fullyQualifiedName: 'beta.agentData.search',
    httpMethod: 'post',
    httpPath: '/api/v1/beta/agent-data/:search',
  },
  {
    clientCallName: 'client.beta.agentData.aggregate',
    fullyQualifiedName: 'beta.agentData.aggregate',
    httpMethod: 'post',
    httpPath: '/api/v1/beta/agent-data/:aggregate',
  },
  {
    clientCallName: 'client.beta.agentData.deleteByQuery',
    fullyQualifiedName: 'beta.agentData.deleteByQuery',
    httpMethod: 'post',
    httpPath: '/api/v1/beta/agent-data/:delete',
  },
  {
    clientCallName: 'client.beta.directories.create',
    fullyQualifiedName: 'beta.directories.create',
    httpMethod: 'post',
    httpPath: '/api/v1/beta/directories',
  },
  {
    clientCallName: 'client.beta.directories.list',
    fullyQualifiedName: 'beta.directories.list',
    httpMethod: 'get',
    httpPath: '/api/v1/beta/directories',
  },
  {
    clientCallName: 'client.beta.directories.get',
    fullyQualifiedName: 'beta.directories.get',
    httpMethod: 'get',
    httpPath: '/api/v1/beta/directories/{directory_id}',
  },
  {
    clientCallName: 'client.beta.directories.update',
    fullyQualifiedName: 'beta.directories.update',
    httpMethod: 'patch',
    httpPath: '/api/v1/beta/directories/{directory_id}',
  },
  {
    clientCallName: 'client.beta.directories.delete',
    fullyQualifiedName: 'beta.directories.delete',
    httpMethod: 'delete',
    httpPath: '/api/v1/beta/directories/{directory_id}',
  },
  {
    clientCallName: 'client.beta.directories.files.add',
    fullyQualifiedName: 'beta.directories.files.add',
    httpMethod: 'post',
    httpPath: '/api/v1/beta/directories/{directory_id}/files',
  },
  {
    clientCallName: 'client.beta.directories.files.list',
    fullyQualifiedName: 'beta.directories.files.list',
    httpMethod: 'get',
    httpPath: '/api/v1/beta/directories/{directory_id}/files',
  },
  {
    clientCallName: 'client.beta.directories.files.get',
    fullyQualifiedName: 'beta.directories.files.get',
    httpMethod: 'get',
    httpPath: '/api/v1/beta/directories/{directory_id}/files/{directory_file_id}',
  },
  {
    clientCallName: 'client.beta.directories.files.update',
    fullyQualifiedName: 'beta.directories.files.update',
    httpMethod: 'patch',
    httpPath: '/api/v1/beta/directories/{directory_id}/files/{directory_file_id}',
  },
  {
    clientCallName: 'client.beta.directories.files.delete',
    fullyQualifiedName: 'beta.directories.files.delete',
    httpMethod: 'delete',
    httpPath: '/api/v1/beta/directories/{directory_id}/files/{directory_file_id}',
  },
  {
    clientCallName: 'client.beta.directories.files.upload',
    fullyQualifiedName: 'beta.directories.files.upload',
    httpMethod: 'post',
    httpPath: '/api/v1/beta/directories/{directory_id}/files/upload',
  },
  {
    clientCallName: 'client.beta.split.create',
    fullyQualifiedName: 'beta.split.create',
    httpMethod: 'post',
    httpPath: '/api/v1/beta/split/jobs',
  },
  {
    clientCallName: 'client.beta.split.list',
    fullyQualifiedName: 'beta.split.list',
    httpMethod: 'get',
    httpPath: '/api/v1/beta/split/jobs',
  },
  {
    clientCallName: 'client.beta.split.get',
    fullyQualifiedName: 'beta.split.get',
    httpMethod: 'get',
    httpPath: '/api/v1/beta/split/jobs/{split_job_id}',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
