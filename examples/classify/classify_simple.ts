import LlamaCloud from '@llamaindex/llama-cloud';
import fs from 'fs';

async function classifyDocument() {
  const client = new LlamaCloud();

  // Upload a file
  const fileObj = await client.files.create({
    file: fs.createReadStream('../example_files/attention_is_all_you_need.pdf'),
    purpose: 'classify',
  });
  const fileId = fileObj.id;

  // Upload and wait for completion
  const result = await client.classifier.classify({
    file_ids: [fileId],
    rules: [
      {
        type: 'ACADEMIC_PAPER',
        description: 'Classify whether the document is an academic paper.',
      },
      {
        type: 'OTHER',
        description: 'Classify whether the document is from any other source besides academic papers.',
      },
    ],
    parsing_configuration: {
      lang: 'en',
      max_pages: 5,
      // target_pages: [1],  // Optional: specify particular pages to parse, cannot be used with max_pages
    },
  });

  // Print the classification results
  for (const item of result.items) {
    if (item.result) {
      console.log(`Classified type: ${item.result.type}`);
      console.log(`Confidence: ${item.result.confidence}`);
      console.log(`Reasoning: ${item.result.reasoning}`);
    }
  }
}

// Run the example
classifyDocument();
