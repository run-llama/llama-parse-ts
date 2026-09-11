# Shared

Types:

- <code><a href="./src/resources/shared.ts">CloudAstraDBVectorStore</a></code>
- <code><a href="./src/resources/shared.ts">CloudAzStorageBlobDataSource</a></code>
- <code><a href="./src/resources/shared.ts">CloudAzureAISearchVectorStore</a></code>
- <code><a href="./src/resources/shared.ts">CloudBoxDataSource</a></code>
- <code><a href="./src/resources/shared.ts">CloudConfluenceDataSource</a></code>
- <code><a href="./src/resources/shared.ts">CloudGoogleDriveDataSource</a></code>
- <code><a href="./src/resources/shared.ts">CloudJiraDataSource</a></code>
- <code><a href="./src/resources/shared.ts">CloudJiraDataSourceV2</a></code>
- <code><a href="./src/resources/shared.ts">CloudMilvusVectorStore</a></code>
- <code><a href="./src/resources/shared.ts">CloudMongoDBAtlasVectorSearch</a></code>
- <code><a href="./src/resources/shared.ts">CloudNotionPageDataSource</a></code>
- <code><a href="./src/resources/shared.ts">CloudOneDriveDataSource</a></code>
- <code><a href="./src/resources/shared.ts">CloudPineconeVectorStore</a></code>
- <code><a href="./src/resources/shared.ts">CloudPostgresVectorStore</a></code>
- <code><a href="./src/resources/shared.ts">CloudQdrantVectorStore</a></code>
- <code><a href="./src/resources/shared.ts">CloudS3DataSource</a></code>
- <code><a href="./src/resources/shared.ts">CloudSharepointDataSource</a></code>
- <code><a href="./src/resources/shared.ts">CloudSlackDataSource</a></code>
- <code><a href="./src/resources/shared.ts">FailureHandlingConfig</a></code>
- <code><a href="./src/resources/shared.ts">PgVectorHnswSettings</a></code>

# Files

Types:

- <code><a href="./src/resources/files.ts">File</a></code>
- <code><a href="./src/resources/files.ts">PresignedURL</a></code>
- <code><a href="./src/resources/files.ts">FileCreateResponse</a></code>
- <code><a href="./src/resources/files.ts">FileRetrieveResponse</a></code>
- <code><a href="./src/resources/files.ts">FileListResponse</a></code>
- <code><a href="./src/resources/files.ts">FileQueryResponse</a></code>

Methods:

- <code title="post /api/v1/beta/files">client.files.<a href="./src/resources/files.ts">create</a>({ ...params }) -> FileCreateResponse</code>
- <code title="post /api/v1/beta/files/query">client.files.<a href="./src/resources/files.ts">query</a>({ ...params }) -> FileQueryResponse</code>
- <code title="get /api/v1/beta/files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> FileListResponsesPaginatedCursor</code>
- <code title="get /api/v1/beta/files/{file_id}">client.files.<a href="./src/resources/files.ts">retrieve</a>(fileID, { ...params }) -> FileRetrieveResponse</code>
- <code title="delete /api/v1/beta/files/{file_id}">client.files.<a href="./src/resources/files.ts">delete</a>(fileID, { ...params }) -> void</code>
- <code title="get /api/v1/beta/files/{file_id}/content">client.files.<a href="./src/resources/files.ts">content</a>(fileID, { ...params }) -> PresignedURL</code>

# Split

Types:

- <code><a href="./src/resources/split.ts">SplitCreateResponse</a></code>
- <code><a href="./src/resources/split.ts">SplitListResponse</a></code>
- <code><a href="./src/resources/split.ts">SplitDeleteResponse</a></code>
- <code><a href="./src/resources/split.ts">SplitCancelResponse</a></code>
- <code><a href="./src/resources/split.ts">SplitGetResponse</a></code>

Methods:

- <code title="post /api/v1/split/jobs">client.split.<a href="./src/resources/split.ts">create</a>({ ...params }) -> SplitCreateResponse</code>
- <code title="get /api/v1/split/jobs">client.split.<a href="./src/resources/split.ts">list</a>({ ...params }) -> SplitListResponsesPaginatedCursor</code>
- <code title="get /api/v1/split/jobs/{split_job_id}">client.split.<a href="./src/resources/split.ts">get</a>(splitJobID, { ...params }) -> SplitGetResponse</code>
- <code title="delete /api/v1/split/jobs/{split_job_id}">client.split.<a href="./src/resources/split.ts">delete</a>(splitJobID, { ...params }) -> unknown</code>
- <code title="post /api/v1/split/jobs/{split_job_id}/cancel">client.split.<a href="./src/resources/split.ts">cancel</a>(splitJobID, { ...params }) -> SplitCancelResponse</code>

# Parsing

Types:

- <code><a href="./src/resources/parsing.ts">BBox</a></code>
- <code><a href="./src/resources/parsing.ts">CodeItem</a></code>
- <code><a href="./src/resources/parsing.ts">FailPageMode</a></code>
- <code><a href="./src/resources/parsing.ts">FooterItem</a></code>
- <code><a href="./src/resources/parsing.ts">Form</a></code>
- <code><a href="./src/resources/parsing.ts">FormField</a></code>
- <code><a href="./src/resources/parsing.ts">FormListItem</a></code>
- <code><a href="./src/resources/parsing.ts">FormListTextItem</a></code>
- <code><a href="./src/resources/parsing.ts">FormSection</a></code>
- <code><a href="./src/resources/parsing.ts">FormTable</a></code>
- <code><a href="./src/resources/parsing.ts">FormTableCellItems</a></code>
- <code><a href="./src/resources/parsing.ts">HeaderItem</a></code>
- <code><a href="./src/resources/parsing.ts">HeadingItem</a></code>
- <code><a href="./src/resources/parsing.ts">ImageItem</a></code>
- <code><a href="./src/resources/parsing.ts">LinkItem</a></code>
- <code><a href="./src/resources/parsing.ts">ListItem</a></code>
- <code><a href="./src/resources/parsing.ts">LlamaParseSupportedFileExtensions</a></code>
- <code><a href="./src/resources/parsing.ts">ParsingJob</a></code>
- <code><a href="./src/resources/parsing.ts">ParsingLanguages</a></code>
- <code><a href="./src/resources/parsing.ts">ParsingMode</a></code>
- <code><a href="./src/resources/parsing.ts">StatusEnum</a></code>
- <code><a href="./src/resources/parsing.ts">TableItem</a></code>
- <code><a href="./src/resources/parsing.ts">TextItem</a></code>
- <code><a href="./src/resources/parsing.ts">ParsingCreateResponse</a></code>
- <code><a href="./src/resources/parsing.ts">ParsingListResponse</a></code>
- <code><a href="./src/resources/parsing.ts">ParsingDeleteResponse</a></code>
- <code><a href="./src/resources/parsing.ts">ParsingCancelResponse</a></code>
- <code><a href="./src/resources/parsing.ts">ParsingGetResponse</a></code>
- <code><a href="./src/resources/parsing.ts">ParsingListVersionsResponse</a></code>

Methods:

- <code title="post /api/v2/parse">client.parsing.<a href="./src/resources/parsing.ts">create</a>({ ...params }) -> ParsingCreateResponse</code>
- <code title="get /api/v2/parse/{job_id}">client.parsing.<a href="./src/resources/parsing.ts">get</a>(jobID, { ...params }) -> ParsingGetResponse</code>
- <code title="get /api/v2/parse">client.parsing.<a href="./src/resources/parsing.ts">list</a>({ ...params }) -> ParsingListResponsesPaginatedCursor</code>
- <code title="post /api/v2/parse/{job_id}/cancel">client.parsing.<a href="./src/resources/parsing.ts">cancel</a>(jobID, { ...params }) -> ParsingCancelResponse</code>
- <code title="delete /api/v2/parse/{job_id}">client.parsing.<a href="./src/resources/parsing.ts">delete</a>(jobID, { ...params }) -> ParsingDeleteResponse</code>
- <code title="get /api/v2/parse/versions">client.parsing.<a href="./src/resources/parsing.ts">listVersions</a>() -> ParsingListVersionsResponse</code>

# Extract

Types:

- <code><a href="./src/resources/extract.ts">ExtractConfiguration</a></code>
- <code><a href="./src/resources/extract.ts">ExtractJobMetadata</a></code>
- <code><a href="./src/resources/extract.ts">ExtractJobUsage</a></code>
- <code><a href="./src/resources/extract.ts">ExtractV2Job</a></code>
- <code><a href="./src/resources/extract.ts">ExtractV2JobCreate</a></code>
- <code><a href="./src/resources/extract.ts">ExtractV2JobQueryResponse</a></code>
- <code><a href="./src/resources/extract.ts">ExtractV2SchemaGenerateRequest</a></code>
- <code><a href="./src/resources/extract.ts">ExtractV2SchemaValidateRequest</a></code>
- <code><a href="./src/resources/extract.ts">ExtractV2SchemaValidateResponse</a></code>
- <code><a href="./src/resources/extract.ts">ExtractedFieldMetadata</a></code>
- <code><a href="./src/resources/extract.ts">ExtractDeleteResponse</a></code>

Methods:

- <code title="post /api/v2/extract">client.extract.<a href="./src/resources/extract.ts">create</a>({ ...params }) -> ExtractV2Job</code>
- <code title="get /api/v2/extract">client.extract.<a href="./src/resources/extract.ts">list</a>({ ...params }) -> ExtractV2JobsPaginatedCursor</code>
- <code title="get /api/v2/extract/{job_id}">client.extract.<a href="./src/resources/extract.ts">get</a>(jobID, { ...params }) -> ExtractV2Job</code>
- <code title="delete /api/v2/extract/{job_id}">client.extract.<a href="./src/resources/extract.ts">delete</a>(jobID, { ...params }) -> unknown</code>
- <code title="post /api/v2/extract/{job_id}/cancel">client.extract.<a href="./src/resources/extract.ts">cancel</a>(jobID, { ...params }) -> ExtractV2Job</code>
- <code title="post /api/v2/extract/schema/validation">client.extract.<a href="./src/resources/extract.ts">validateSchema</a>({ ...params }) -> ExtractV2SchemaValidateResponse</code>
- <code title="post /api/v2/extract/schema/generate">client.extract.<a href="./src/resources/extract.ts">generateSchema</a>({ ...params }) -> ConfigurationCreate</code>

# Classifier

## Jobs

Types:

- <code><a href="./src/resources/classifier/jobs.ts">ClassifierRule</a></code>
- <code><a href="./src/resources/classifier/jobs.ts">ClassifyJob</a></code>
- <code><a href="./src/resources/classifier/jobs.ts">ClassifyParsingConfiguration</a></code>

# Batches

Types:

- <code><a href="./src/resources/batches.ts">BatchCreateResponse</a></code>
- <code><a href="./src/resources/batches.ts">BatchListResponse</a></code>
- <code><a href="./src/resources/batches.ts">BatchCancelResponse</a></code>
- <code><a href="./src/resources/batches.ts">BatchGetResponse</a></code>

Methods:

- <code title="post /api/v2/batches">client.batches.<a href="./src/resources/batches.ts">create</a>({ ...params }) -> BatchCreateResponse</code>
- <code title="get /api/v2/batches">client.batches.<a href="./src/resources/batches.ts">list</a>({ ...params }) -> BatchListResponsesPaginatedCursor</code>
- <code title="get /api/v2/batches/{batch_id}">client.batches.<a href="./src/resources/batches.ts">get</a>(batchID, { ...params }) -> BatchGetResponse</code>
- <code title="post /api/v2/batches/{batch_id}/cancel">client.batches.<a href="./src/resources/batches.ts">cancel</a>(batchID, { ...params }) -> BatchCancelResponse</code>

# Classify

Types:

- <code><a href="./src/resources/classify.ts">ClassifyConfiguration</a></code>
- <code><a href="./src/resources/classify.ts">ClassifyCreateRequest</a></code>
- <code><a href="./src/resources/classify.ts">ClassifyResult</a></code>
- <code><a href="./src/resources/classify.ts">ClassifyCreateResponse</a></code>
- <code><a href="./src/resources/classify.ts">ClassifyListResponse</a></code>
- <code><a href="./src/resources/classify.ts">ClassifyCancelResponse</a></code>
- <code><a href="./src/resources/classify.ts">ClassifyGetResponse</a></code>

Methods:

- <code title="post /api/v2/classify">client.classify.<a href="./src/resources/classify.ts">create</a>({ ...params }) -> ClassifyCreateResponse</code>
- <code title="get /api/v2/classify">client.classify.<a href="./src/resources/classify.ts">list</a>({ ...params }) -> ClassifyListResponsesPaginatedCursor</code>
- <code title="get /api/v2/classify/{job_id}">client.classify.<a href="./src/resources/classify.ts">get</a>(jobID, { ...params }) -> ClassifyGetResponse</code>
- <code title="post /api/v2/classify/{job_id}/cancel">client.classify.<a href="./src/resources/classify.ts">cancel</a>(jobID, { ...params }) -> ClassifyCancelResponse</code>

# Configurations

Types:

- <code><a href="./src/resources/configurations.ts">ClassifyV2Parameters</a></code>
- <code><a href="./src/resources/configurations.ts">ConfigurationCreate</a></code>
- <code><a href="./src/resources/configurations.ts">ConfigurationResponse</a></code>
- <code><a href="./src/resources/configurations.ts">ExtractV2Parameters</a></code>
- <code><a href="./src/resources/configurations.ts">ParseV2Parameters</a></code>
- <code><a href="./src/resources/configurations.ts">SplitV1Parameters</a></code>
- <code><a href="./src/resources/configurations.ts">UntypedParameters</a></code>

Methods:

- <code title="post /api/v1/beta/configurations">client.configurations.<a href="./src/resources/configurations.ts">create</a>({ ...params }) -> ConfigurationResponse</code>
- <code title="get /api/v1/beta/configurations">client.configurations.<a href="./src/resources/configurations.ts">list</a>({ ...params }) -> ConfigurationResponsesPaginatedCursor</code>
- <code title="get /api/v1/beta/configurations/{config_id}">client.configurations.<a href="./src/resources/configurations.ts">retrieve</a>(configID, { ...params }) -> ConfigurationResponse</code>
- <code title="put /api/v1/beta/configurations/{config_id}">client.configurations.<a href="./src/resources/configurations.ts">update</a>(configID, { ...params }) -> ConfigurationResponse</code>
- <code title="delete /api/v1/beta/configurations/{config_id}">client.configurations.<a href="./src/resources/configurations.ts">delete</a>(configID, { ...params }) -> void</code>

# WebhookConfigs

Types:

- <code><a href="./src/resources/webhook-configs.ts">WebhookConfigCreate</a></code>
- <code><a href="./src/resources/webhook-configs.ts">WebhookConfigResponse</a></code>
- <code><a href="./src/resources/webhook-configs.ts">WebhookConfigListResponse</a></code>

Methods:

- <code title="post /api/v1/beta/webhook-configs">client.webhookConfigs.<a href="./src/resources/webhook-configs.ts">create</a>({ ...params }) -> WebhookConfigResponse</code>
- <code title="get /api/v1/beta/webhook-configs">client.webhookConfigs.<a href="./src/resources/webhook-configs.ts">list</a>({ ...params }) -> WebhookConfigListResponse</code>
- <code title="get /api/v1/beta/webhook-configs/{config_id}">client.webhookConfigs.<a href="./src/resources/webhook-configs.ts">retrieve</a>(configID, { ...params }) -> WebhookConfigResponse</code>
- <code title="put /api/v1/beta/webhook-configs/{config_id}">client.webhookConfigs.<a href="./src/resources/webhook-configs.ts">update</a>(configID, { ...params }) -> WebhookConfigResponse</code>
- <code title="delete /api/v1/beta/webhook-configs/{config_id}">client.webhookConfigs.<a href="./src/resources/webhook-configs.ts">delete</a>(configID, { ...params }) -> void</code>

# Projects

Types:

- <code><a href="./src/resources/projects.ts">Project</a></code>
- <code><a href="./src/resources/projects.ts">ProjectListResponse</a></code>

Methods:

- <code title="get /api/v1/projects">client.projects.<a href="./src/resources/projects.ts">list</a>({ ...params }) -> ProjectListResponse</code>
- <code title="get /api/v1/projects/{project_id}">client.projects.<a href="./src/resources/projects.ts">get</a>(projectID, { ...params }) -> Project</code>

# V2Projects

Types:

- <code><a href="./src/resources/v2-projects.ts">V2ProjectListResponse</a></code>
- <code><a href="./src/resources/v2-projects.ts">V2ProjectGetResponse</a></code>

Methods:

- <code title="get /api/v2/projects">client.v2Projects.<a href="./src/resources/v2-projects.ts">list</a>({ ...params }) -> V2ProjectListResponsesPaginatedCursor</code>
- <code title="get /api/v2/projects/{project_id}">client.v2Projects.<a href="./src/resources/v2-projects.ts">get</a>(projectID, { ...params }) -> V2ProjectGetResponse</code>

# JobDataPoints

Types:

- <code><a href="./src/resources/job-data-points.ts">JobDataPoint</a></code>

Methods:

- <code title="get /api/v1/job-data-points">client.jobDataPoints.<a href="./src/resources/job-data-points.ts">list</a>({ ...params }) -> JobDataPointsPaginatedCursor</code>

# DataSinks

Types:

- <code><a href="./src/resources/data-sinks.ts">DataSink</a></code>
- <code><a href="./src/resources/data-sinks.ts">DataSinkListResponse</a></code>

Methods:

- <code title="get /api/v1/data-sinks">client.dataSinks.<a href="./src/resources/data-sinks.ts">list</a>({ ...params }) -> DataSinkListResponse</code>
- <code title="get /api/v1/beta/data-sinks">client.dataSinks.<a href="./src/resources/data-sinks.ts">listPaginated</a>({ ...params }) -> DataSinksPaginatedCursor</code>
- <code title="post /api/v1/data-sinks">client.dataSinks.<a href="./src/resources/data-sinks.ts">create</a>({ ...params }) -> DataSink</code>
- <code title="get /api/v1/data-sinks/{data_sink_id}">client.dataSinks.<a href="./src/resources/data-sinks.ts">get</a>(dataSinkID, { ...params }) -> DataSink</code>
- <code title="put /api/v1/data-sinks/{data_sink_id}">client.dataSinks.<a href="./src/resources/data-sinks.ts">update</a>(dataSinkID, { ...params }) -> DataSink</code>
- <code title="delete /api/v1/data-sinks/{data_sink_id}">client.dataSinks.<a href="./src/resources/data-sinks.ts">delete</a>(dataSinkID, { ...params }) -> void</code>

# ExtractionAgents

Types:

- <code><a href="./src/resources/extraction-agents.ts">ExtractAgent</a></code>

Methods:

- <code title="get /api/v1/beta/extraction-agents">client.extractionAgents.<a href="./src/resources/extraction-agents.ts">list</a>({ ...params }) -> ExtractAgentsPaginatedCursor</code>

# DataSources

Types:

- <code><a href="./src/resources/data-sources.ts">DataSource</a></code>
- <code><a href="./src/resources/data-sources.ts">DataSourceReaderVersionMetadata</a></code>
- <code><a href="./src/resources/data-sources.ts">DataSourceListResponse</a></code>

Methods:

- <code title="get /api/v1/data-sources">client.dataSources.<a href="./src/resources/data-sources.ts">list</a>({ ...params }) -> DataSourceListResponse</code>
- <code title="post /api/v1/data-sources">client.dataSources.<a href="./src/resources/data-sources.ts">create</a>({ ...params }) -> DataSource</code>
- <code title="get /api/v1/data-sources/{data_source_id}">client.dataSources.<a href="./src/resources/data-sources.ts">get</a>(dataSourceID, { ...params }) -> DataSource</code>
- <code title="put /api/v1/data-sources/{data_source_id}">client.dataSources.<a href="./src/resources/data-sources.ts">update</a>(dataSourceID, { ...params }) -> DataSource</code>
- <code title="delete /api/v1/data-sources/{data_source_id}">client.dataSources.<a href="./src/resources/data-sources.ts">delete</a>(dataSourceID, { ...params }) -> void</code>

# Pipelines

Types:

- <code><a href="./src/resources/pipelines/pipelines.ts">AdvancedModeTransformConfig</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">AutoTransformConfig</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">AzureOpenAIEmbedding</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">AzureOpenAIEmbeddingConfig</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">BedrockEmbedding</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">BedrockEmbeddingConfig</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">CohereEmbedding</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">CohereEmbeddingConfig</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">DataSinkCreate</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">GeminiEmbedding</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">GeminiEmbeddingConfig</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">HuggingFaceInferenceAPIEmbedding</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">HuggingFaceInferenceAPIEmbeddingConfig</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">LlamaParseParameters</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">LlmParameters</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">ManagedIngestionStatusResponse</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">MessageRole</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">MetadataFilters</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">OpenAIEmbedding</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">OpenAIEmbeddingConfig</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">PageFigureNodeWithScore</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">PageScreenshotNodeWithScore</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">Pipeline</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">PipelineCreate</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">PipelineMetadataConfig</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">PipelineType</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">PresetRetrievalParams</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">RetrievalMode</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">SparseModelConfig</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">VertexAIEmbeddingConfig</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">VertexTextEmbedding</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">PipelineRetrieveResponse</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">PipelineListResponse</a></code>
- <code><a href="./src/resources/pipelines/pipelines.ts">PipelineListPaginatedResponse</a></code>

Methods:

- <code title="get /api/v1/pipelines">client.pipelines.<a href="./src/resources/pipelines/pipelines.ts">list</a>({ ...params }) -> PipelineListResponse</code>
- <code title="get /api/v2/pipelines">client.pipelines.<a href="./src/resources/pipelines/pipelines.ts">listPaginated</a>({ ...params }) -> PipelineListPaginatedResponsesPaginatedCursor</code>
- <code title="post /api/v1/pipelines">client.pipelines.<a href="./src/resources/pipelines/pipelines.ts">create</a>({ ...params }) -> Pipeline</code>
- <code title="get /api/v1/pipelines/{pipeline_id}">client.pipelines.<a href="./src/resources/pipelines/pipelines.ts">get</a>(pipelineID, { ...params }) -> Pipeline</code>
- <code title="put /api/v1/pipelines/{pipeline_id}">client.pipelines.<a href="./src/resources/pipelines/pipelines.ts">update</a>(pipelineID, { ...params }) -> Pipeline</code>
- <code title="delete /api/v1/pipelines/{pipeline_id}">client.pipelines.<a href="./src/resources/pipelines/pipelines.ts">delete</a>(pipelineID, { ...params }) -> void</code>
- <code title="get /api/v1/pipelines/{pipeline_id}/status">client.pipelines.<a href="./src/resources/pipelines/pipelines.ts">getStatus</a>(pipelineID, { ...params }) -> ManagedIngestionStatusResponse</code>
- <code title="put /api/v1/pipelines">client.pipelines.<a href="./src/resources/pipelines/pipelines.ts">upsert</a>({ ...params }) -> Pipeline</code>
- <code title="post /api/v1/pipelines/{pipeline_id}/retrieve">client.pipelines.<a href="./src/resources/pipelines/pipelines.ts">retrieve</a>(pipelineID, { ...params }) -> PipelineRetrieveResponse</code>

## Sync

Methods:

- <code title="post /api/v1/pipelines/{pipeline_id}/sync">client.pipelines.sync.<a href="./src/resources/pipelines/sync.ts">create</a>(pipelineID, { ...params }) -> Pipeline</code>
- <code title="post /api/v1/pipelines/{pipeline_id}/sync/cancel">client.pipelines.sync.<a href="./src/resources/pipelines/sync.ts">cancel</a>(pipelineID, { ...params }) -> Pipeline</code>

## DataSources

Types:

- <code><a href="./src/resources/pipelines/data-sources.ts">PipelineDataSource</a></code>
- <code><a href="./src/resources/pipelines/data-sources.ts">DataSourceGetDataSourcesResponse</a></code>
- <code><a href="./src/resources/pipelines/data-sources.ts">DataSourceUpdateDataSourcesResponse</a></code>

Methods:

- <code title="get /api/v1/pipelines/{pipeline_id}/data-sources">client.pipelines.dataSources.<a href="./src/resources/pipelines/data-sources.ts">getDataSources</a>(pipelineID, { ...params }) -> DataSourceGetDataSourcesResponse</code>
- <code title="put /api/v1/pipelines/{pipeline_id}/data-sources">client.pipelines.dataSources.<a href="./src/resources/pipelines/data-sources.ts">updateDataSources</a>(pipelineID, [ ...body ]) -> DataSourceUpdateDataSourcesResponse</code>
- <code title="put /api/v1/pipelines/{pipeline_id}/data-sources/{data_source_id}">client.pipelines.dataSources.<a href="./src/resources/pipelines/data-sources.ts">update</a>(dataSourceID, { ...params }) -> PipelineDataSource</code>
- <code title="get /api/v1/pipelines/{pipeline_id}/data-sources/{data_source_id}/status">client.pipelines.dataSources.<a href="./src/resources/pipelines/data-sources.ts">getStatus</a>(dataSourceID, { ...params }) -> ManagedIngestionStatusResponse</code>
- <code title="post /api/v1/pipelines/{pipeline_id}/data-sources/{data_source_id}/sync">client.pipelines.dataSources.<a href="./src/resources/pipelines/data-sources.ts">sync</a>(dataSourceID, { ...params }) -> Pipeline</code>

## Images

Types:

- <code><a href="./src/resources/pipelines/images.ts">ImageGetPageFigureResponse</a></code>
- <code><a href="./src/resources/pipelines/images.ts">ImageGetPageScreenshotResponse</a></code>
- <code><a href="./src/resources/pipelines/images.ts">ImageListPageFiguresResponse</a></code>
- <code><a href="./src/resources/pipelines/images.ts">ImageListPageScreenshotsResponse</a></code>

Methods:

- <code title="get /api/v1/files/{id}/page_screenshots">client.pipelines.images.<a href="./src/resources/pipelines/images.ts">listPageScreenshots</a>(id, { ...params }) -> ImageListPageScreenshotsResponse</code>
- <code title="get /api/v1/files/{id}/page_screenshots/{page_index}">client.pipelines.images.<a href="./src/resources/pipelines/images.ts">getPageScreenshot</a>(pageIndex, { ...params }) -> unknown</code>
- <code title="get /api/v1/files/{id}/page-figures/{page_index}/{figure_name}">client.pipelines.images.<a href="./src/resources/pipelines/images.ts">getPageFigure</a>(figureName, { ...params }) -> unknown</code>
- <code title="get /api/v1/files/{id}/page-figures">client.pipelines.images.<a href="./src/resources/pipelines/images.ts">listPageFigures</a>(id, { ...params }) -> ImageListPageFiguresResponse</code>

## Files

Types:

- <code><a href="./src/resources/pipelines/files.ts">PipelineFile</a></code>
- <code><a href="./src/resources/pipelines/files.ts">FileCreateResponse</a></code>
- <code><a href="./src/resources/pipelines/files.ts">FileGetStatusCountsResponse</a></code>

Methods:

- <code title="get /api/v1/pipelines/{pipeline_id}/files/status-counts">client.pipelines.files.<a href="./src/resources/pipelines/files.ts">getStatusCounts</a>(pipelineID, { ...params }) -> FileGetStatusCountsResponse</code>
- <code title="get /api/v1/pipelines/{pipeline_id}/files/{file_id}/status">client.pipelines.files.<a href="./src/resources/pipelines/files.ts">getStatus</a>(fileID, { ...params }) -> ManagedIngestionStatusResponse</code>
- <code title="put /api/v1/pipelines/{pipeline_id}/files">client.pipelines.files.<a href="./src/resources/pipelines/files.ts">create</a>(pipelineID, [ ...body ]) -> FileCreateResponse</code>
- <code title="put /api/v1/pipelines/{pipeline_id}/files/{file_id}">client.pipelines.files.<a href="./src/resources/pipelines/files.ts">update</a>(fileID, { ...params }) -> PipelineFile</code>
- <code title="delete /api/v1/pipelines/{pipeline_id}/files/{file_id}">client.pipelines.files.<a href="./src/resources/pipelines/files.ts">delete</a>(fileID, { ...params }) -> void</code>
- <code title="get /api/v1/pipelines/{pipeline_id}/files2">client.pipelines.files.<a href="./src/resources/pipelines/files.ts">list</a>(pipelineID, { ...params }) -> PipelineFilesPaginatedPipelineFiles</code>

## Metadata

Types:

- <code><a href="./src/resources/pipelines/metadata.ts">MetadataCreateResponse</a></code>

Methods:

- <code title="put /api/v1/pipelines/{pipeline_id}/metadata">client.pipelines.metadata.<a href="./src/resources/pipelines/metadata.ts">create</a>(pipelineID, { ...params }) -> MetadataCreateResponse</code>
- <code title="delete /api/v1/pipelines/{pipeline_id}/metadata">client.pipelines.metadata.<a href="./src/resources/pipelines/metadata.ts">deleteAll</a>(pipelineID, { ...params }) -> void</code>

## Documents

Types:

- <code><a href="./src/resources/pipelines/documents.ts">CloudDocument</a></code>
- <code><a href="./src/resources/pipelines/documents.ts">CloudDocumentCreate</a></code>
- <code><a href="./src/resources/pipelines/documents.ts">TextNode</a></code>
- <code><a href="./src/resources/pipelines/documents.ts">DocumentCreateResponse</a></code>
- <code><a href="./src/resources/pipelines/documents.ts">DocumentGetChunksResponse</a></code>
- <code><a href="./src/resources/pipelines/documents.ts">DocumentGetStatusCountsResponse</a></code>
- <code><a href="./src/resources/pipelines/documents.ts">DocumentSyncResponse</a></code>
- <code><a href="./src/resources/pipelines/documents.ts">DocumentUpsertResponse</a></code>

Methods:

- <code title="post /api/v1/pipelines/{pipeline_id}/documents">client.pipelines.documents.<a href="./src/resources/pipelines/documents.ts">create</a>(pipelineID, [ ...body ]) -> DocumentCreateResponse</code>
- <code title="get /api/v1/pipelines/{pipeline_id}/documents/paginated">client.pipelines.documents.<a href="./src/resources/pipelines/documents.ts">list</a>(pipelineID, { ...params }) -> CloudDocumentsPaginatedCloudDocuments</code>
- <code title="get /api/v1/pipelines/{pipeline_id}/documents/status-counts">client.pipelines.documents.<a href="./src/resources/pipelines/documents.ts">getStatusCounts</a>(pipelineID, { ...params }) -> DocumentGetStatusCountsResponse</code>
- <code title="get /api/v1/pipelines/{pipeline_id}/documents/{document_id}">client.pipelines.documents.<a href="./src/resources/pipelines/documents.ts">get</a>(documentID, { ...params }) -> CloudDocument</code>
- <code title="delete /api/v1/pipelines/{pipeline_id}/documents/{document_id}">client.pipelines.documents.<a href="./src/resources/pipelines/documents.ts">delete</a>(documentID, { ...params }) -> void</code>
- <code title="get /api/v1/pipelines/{pipeline_id}/documents/{document_id}/status">client.pipelines.documents.<a href="./src/resources/pipelines/documents.ts">getStatus</a>(documentID, { ...params }) -> ManagedIngestionStatusResponse</code>
- <code title="post /api/v1/pipelines/{pipeline_id}/documents/{document_id}/sync">client.pipelines.documents.<a href="./src/resources/pipelines/documents.ts">sync</a>(documentID, { ...params }) -> unknown</code>
- <code title="get /api/v1/pipelines/{pipeline_id}/documents/{document_id}/chunks">client.pipelines.documents.<a href="./src/resources/pipelines/documents.ts">getChunks</a>(documentID, { ...params }) -> DocumentGetChunksResponse</code>
- <code title="put /api/v1/pipelines/{pipeline_id}/documents">client.pipelines.documents.<a href="./src/resources/pipelines/documents.ts">upsert</a>(pipelineID, [ ...body ]) -> DocumentUpsertResponse</code>

# Retrievers

Types:

- <code><a href="./src/resources/retrievers/retrievers.ts">CompositeRetrievalMode</a></code>
- <code><a href="./src/resources/retrievers/retrievers.ts">CompositeRetrievalResult</a></code>
- <code><a href="./src/resources/retrievers/retrievers.ts">ReRankConfig</a></code>
- <code><a href="./src/resources/retrievers/retrievers.ts">Retriever</a></code>
- <code><a href="./src/resources/retrievers/retrievers.ts">RetrieverCreate</a></code>
- <code><a href="./src/resources/retrievers/retrievers.ts">RetrieverPipeline</a></code>
- <code><a href="./src/resources/retrievers/retrievers.ts">RetrieverListResponse</a></code>

Methods:

- <code title="post /api/v1/retrievers">client.retrievers.<a href="./src/resources/retrievers/retrievers.ts">create</a>({ ...params }) -> Retriever</code>
- <code title="put /api/v1/retrievers">client.retrievers.<a href="./src/resources/retrievers/retrievers.ts">upsert</a>({ ...params }) -> Retriever</code>
- <code title="get /api/v1/retrievers">client.retrievers.<a href="./src/resources/retrievers/retrievers.ts">list</a>({ ...params }) -> RetrieverListResponse</code>
- <code title="get /api/v1/retrievers/{retriever_id}">client.retrievers.<a href="./src/resources/retrievers/retrievers.ts">get</a>(retrieverID, { ...params }) -> Retriever</code>
- <code title="put /api/v1/retrievers/{retriever_id}">client.retrievers.<a href="./src/resources/retrievers/retrievers.ts">update</a>(retrieverID, { ...params }) -> Retriever</code>
- <code title="delete /api/v1/retrievers/{retriever_id}">client.retrievers.<a href="./src/resources/retrievers/retrievers.ts">delete</a>(retrieverID, { ...params }) -> void</code>
- <code title="post /api/v1/retrievers/retrieve">client.retrievers.<a href="./src/resources/retrievers/retrievers.ts">search</a>({ ...params }) -> CompositeRetrievalResult</code>

## Retriever

Methods:

- <code title="post /api/v1/retrievers/{retriever_id}/retrieve">client.retrievers.retriever.<a href="./src/resources/retrievers/retriever.ts">search</a>(retrieverID, { ...params }) -> CompositeRetrievalResult</code>

# Beta

## Indexes

Types:

- <code><a href="./src/resources/beta/indexes.ts">IndexCreateResponse</a></code>
- <code><a href="./src/resources/beta/indexes.ts">IndexListResponse</a></code>
- <code><a href="./src/resources/beta/indexes.ts">IndexGetResponse</a></code>
- <code><a href="./src/resources/beta/indexes.ts">IndexSyncResponse</a></code>

Methods:

- <code title="get /api/v1/indexes/{index_id}">client.beta.indexes.<a href="./src/resources/beta/indexes.ts">get</a>(indexID, { ...params }) -> IndexGetResponse</code>
- <code title="delete /api/v1/indexes/{index_id}">client.beta.indexes.<a href="./src/resources/beta/indexes.ts">delete</a>(indexID, { ...params }) -> void</code>
- <code title="post /api/v1/indexes">client.beta.indexes.<a href="./src/resources/beta/indexes.ts">create</a>({ ...params }) -> IndexCreateResponse</code>
- <code title="post /api/v1/indexes/{index_id}/sync">client.beta.indexes.<a href="./src/resources/beta/indexes.ts">sync</a>(indexID, { ...params }) -> unknown</code>
- <code title="get /api/v1/indexes">client.beta.indexes.<a href="./src/resources/beta/indexes.ts">list</a>({ ...params }) -> IndexListResponsesPaginatedCursor</code>

## Retrieval

Types:

- <code><a href="./src/resources/beta/retrieval.ts">RetrievalRetrieveResponse</a></code>
- <code><a href="./src/resources/beta/retrieval.ts">RetrievalFindResponse</a></code>
- <code><a href="./src/resources/beta/retrieval.ts">RetrievalGrepResponse</a></code>
- <code><a href="./src/resources/beta/retrieval.ts">RetrievalReadResponse</a></code>

Methods:

- <code title="post /api/v1/retrieval/retrieve">client.beta.retrieval.<a href="./src/resources/beta/retrieval.ts">retrieve</a>({ ...params }) -> RetrievalRetrieveResponse</code>
- <code title="post /api/v1/retrieval/files/find">client.beta.retrieval.<a href="./src/resources/beta/retrieval.ts">find</a>({ ...params }) -> RetrievalFindResponsesPaginatedCursorPost</code>
- <code title="post /api/v1/retrieval/files/grep">client.beta.retrieval.<a href="./src/resources/beta/retrieval.ts">grep</a>({ ...params }) -> RetrievalGrepResponsesPaginatedCursorPost</code>
- <code title="post /api/v1/retrieval/files/read">client.beta.retrieval.<a href="./src/resources/beta/retrieval.ts">read</a>({ ...params }) -> RetrievalReadResponse</code>

## Chat

Types:

- <code><a href="./src/resources/beta/chat.ts">ChatCreateResponse</a></code>
- <code><a href="./src/resources/beta/chat.ts">ChatRetrieveResponse</a></code>
- <code><a href="./src/resources/beta/chat.ts">ChatListResponse</a></code>
- <code><a href="./src/resources/beta/chat.ts">ChatGetSummaryResponse</a></code>
- <code><a href="./src/resources/beta/chat.ts">ChatStreamResponse</a></code>

Methods:

- <code title="get /api/v1/chat">client.beta.chat.<a href="./src/resources/beta/chat.ts">list</a>({ ...params }) -> ChatListResponsesPaginatedCursor</code>
- <code title="post /api/v1/chat">client.beta.chat.<a href="./src/resources/beta/chat.ts">create</a>({ ...params }) -> ChatCreateResponse</code>
- <code title="get /api/v1/chat/{session_id}">client.beta.chat.<a href="./src/resources/beta/chat.ts">retrieve</a>(sessionID, { ...params }) -> ChatRetrieveResponse</code>
- <code title="delete /api/v1/chat/{session_id}">client.beta.chat.<a href="./src/resources/beta/chat.ts">delete</a>(sessionID, { ...params }) -> void</code>
- <code title="get /api/v1/chat/{session_id}/summary">client.beta.chat.<a href="./src/resources/beta/chat.ts">getSummary</a>(sessionID, { ...params }) -> ChatGetSummaryResponse</code>
- <code title="post /api/v1/chat/{session_id}/messages/stream">client.beta.chat.<a href="./src/resources/beta/chat.ts">stream</a>(sessionID, { ...params }) -> unknown</code>

## AgentData

Types:

- <code><a href="./src/resources/beta/agent-data.ts">AgentData</a></code>
- <code><a href="./src/resources/beta/agent-data.ts">AgentDataDeleteResponse</a></code>
- <code><a href="./src/resources/beta/agent-data.ts">AgentDataAggregateResponse</a></code>
- <code><a href="./src/resources/beta/agent-data.ts">AgentDataDeleteByQueryResponse</a></code>

Methods:

- <code title="get /api/v1/beta/agent-data/{item_id}">client.beta.agentData.<a href="./src/resources/beta/agent-data.ts">get</a>(itemID, { ...params }) -> AgentData</code>
- <code title="put /api/v1/beta/agent-data/{item_id}">client.beta.agentData.<a href="./src/resources/beta/agent-data.ts">update</a>(itemID, { ...params }) -> AgentData</code>
- <code title="delete /api/v1/beta/agent-data/{item_id}">client.beta.agentData.<a href="./src/resources/beta/agent-data.ts">delete</a>(itemID, { ...params }) -> AgentDataDeleteResponse</code>
- <code title="post /api/v1/beta/agent-data">client.beta.agentData.<a href="./src/resources/beta/agent-data.ts">create</a>({ ...params }) -> AgentData</code>
- <code title="post /api/v1/beta/agent-data/:search">client.beta.agentData.<a href="./src/resources/beta/agent-data.ts">search</a>({ ...params }) -> AgentDataPaginatedCursorPost</code>
- <code title="post /api/v1/beta/agent-data/:aggregate">client.beta.agentData.<a href="./src/resources/beta/agent-data.ts">aggregate</a>({ ...params }) -> AgentDataAggregateResponsesPaginatedCursorPost</code>
- <code title="post /api/v1/beta/agent-data/:delete">client.beta.agentData.<a href="./src/resources/beta/agent-data.ts">deleteByQuery</a>({ ...params }) -> AgentDataDeleteByQueryResponse</code>

## Directories

Types:

- <code><a href="./src/resources/beta/directories/directories.ts">DirectoryCreateResponse</a></code>
- <code><a href="./src/resources/beta/directories/directories.ts">DirectoryUpdateResponse</a></code>
- <code><a href="./src/resources/beta/directories/directories.ts">DirectoryListResponse</a></code>
- <code><a href="./src/resources/beta/directories/directories.ts">DirectoryGetResponse</a></code>

Methods:

- <code title="post /api/v1/beta/directories">client.beta.directories.<a href="./src/resources/beta/directories/directories.ts">create</a>({ ...params }) -> DirectoryCreateResponse</code>
- <code title="get /api/v1/beta/directories">client.beta.directories.<a href="./src/resources/beta/directories/directories.ts">list</a>({ ...params }) -> DirectoryListResponsesPaginatedCursor</code>
- <code title="get /api/v1/beta/directories/{directory_id}">client.beta.directories.<a href="./src/resources/beta/directories/directories.ts">get</a>(directoryID, { ...params }) -> DirectoryGetResponse</code>
- <code title="patch /api/v1/beta/directories/{directory_id}">client.beta.directories.<a href="./src/resources/beta/directories/directories.ts">update</a>(directoryID, { ...params }) -> DirectoryUpdateResponse</code>
- <code title="delete /api/v1/beta/directories/{directory_id}">client.beta.directories.<a href="./src/resources/beta/directories/directories.ts">delete</a>(directoryID, { ...params }) -> void</code>

### Files

Types:

- <code><a href="./src/resources/beta/directories/files.ts">FileUpdateResponse</a></code>
- <code><a href="./src/resources/beta/directories/files.ts">FileListResponse</a></code>
- <code><a href="./src/resources/beta/directories/files.ts">FileAddResponse</a></code>
- <code><a href="./src/resources/beta/directories/files.ts">FileGetResponse</a></code>
- <code><a href="./src/resources/beta/directories/files.ts">FileUploadResponse</a></code>

Methods:

- <code title="post /api/v1/beta/directories/{directory_id}/files">client.beta.directories.files.<a href="./src/resources/beta/directories/files.ts">add</a>(directoryID, { ...params }) -> FileAddResponse</code>
- <code title="get /api/v1/beta/directories/{directory_id}/files">client.beta.directories.files.<a href="./src/resources/beta/directories/files.ts">list</a>(directoryID, { ...params }) -> FileListResponsesPaginatedCursor</code>
- <code title="get /api/v1/beta/directories/{directory_id}/files/{directory_file_id}">client.beta.directories.files.<a href="./src/resources/beta/directories/files.ts">get</a>(directoryFileID, { ...params }) -> FileGetResponse</code>
- <code title="patch /api/v1/beta/directories/{directory_id}/files/{directory_file_id}">client.beta.directories.files.<a href="./src/resources/beta/directories/files.ts">update</a>(directoryFileID, { ...params }) -> FileUpdateResponse</code>
- <code title="delete /api/v1/beta/directories/{directory_id}/files/{directory_file_id}">client.beta.directories.files.<a href="./src/resources/beta/directories/files.ts">delete</a>(directoryFileID, { ...params }) -> void</code>
- <code title="post /api/v1/beta/directories/{directory_id}/files/upload">client.beta.directories.files.<a href="./src/resources/beta/directories/files.ts">upload</a>(directoryID, { ...params }) -> FileUploadResponse</code>

## Split

Types:

- <code><a href="./src/resources/beta/split.ts">SplitCategory</a></code>
- <code><a href="./src/resources/beta/split.ts">SplitDocumentInput</a></code>
- <code><a href="./src/resources/beta/split.ts">SplitResultResponse</a></code>
- <code><a href="./src/resources/beta/split.ts">SplitSegmentResponse</a></code>
- <code><a href="./src/resources/beta/split.ts">SplitCreateResponse</a></code>
- <code><a href="./src/resources/beta/split.ts">SplitListResponse</a></code>
- <code><a href="./src/resources/beta/split.ts">SplitGetResponse</a></code>

Methods:

- <code title="post /api/v1/beta/split/jobs">client.beta.split.<a href="./src/resources/beta/split.ts">create</a>({ ...params }) -> SplitCreateResponse</code>
- <code title="get /api/v1/beta/split/jobs">client.beta.split.<a href="./src/resources/beta/split.ts">list</a>({ ...params }) -> SplitListResponsesPaginatedCursor</code>
- <code title="get /api/v1/beta/split/jobs/{split_job_id}">client.beta.split.<a href="./src/resources/beta/split.ts">get</a>(splitJobID, { ...params }) -> SplitGetResponse</code>
