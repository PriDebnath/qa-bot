# QA Bot with Semantic Search

A Question-Answering bot that uses semantic search and local LLMs through Ollama to provide context-aware answers from text documents.

## Features


- Semantic search using text embeddings
- Local LLM integration with Ollama
- Document chunking for better context handling
- Cosine similarity for finding relevant context

## Prerequisites

1. Node.js (v16 or higher)
2. [Ollama](https://ollama.ai/) installed on your system
3. Required models:
   - `nomic-embed-text` (for embeddings)
   - `gemma3:1b` (for text generation)

## Setup

1. Clone the repository:
```sh
git clone <repository-url>
cd qa-bot
```

2. Install dependencies:
```sh
npm install
```

3. Pull required Ollama models:
```sh
ollama pull nomic-embed-text
ollama pull gemma3:1b
```

## Usage

1. Start the Ollama server:
```sh
ollama serve
```

2. Run the QA bot with your text file and question:
```sh
node qa-bot.js
```

## Project Structure

- `qa-bot.js` - Main QA bot implementation
- `utils/`
  - `embedding.js` - Embedding and similarity functions
  - `ollama.js` - Ollama service management
- `semantic-search/` - Example implementations
  - `1.js` - Basic semantic search
  - `2.js` - Alternative implementation using axios
  - `3.js` - Enhanced version with model checking

## Demo

Here's how the QA bot works:

1. Loads a text document
2. Chunks the text into manageable pieces
3. Creates embeddings for chunks
4. Finds the most relevant context for the question
5. Generates an answer using the LLM with the found context

![Demo Screenshot](assets/demo-v1.png)
[Demo Video](https://github.com/user-attachments/files/21987291/27aab373-c900-420f-9662-e44524479ea8.wav)

## How It Works

1. **Document Processing**:
   - Text is split into chunks
   - Each chunk is converted to embeddings

2. **Query Processing**:
   - User question is converted to embedding
   - Most similar chunk is found using cosine similarity

3. **Answer Generation**:
   - Relevant context is sent to LLM
   - LLM generates natural language answer

