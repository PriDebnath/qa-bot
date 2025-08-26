import axios from "axios";

const OLLAMA_URL = "http://127.0.0.1:11434/api/embeddings";
const MODEL = "nomic-embed-text";

// Example documents
const documents = [
  "Angular is a frontend framework maintained by Google.",
  "React is a popular JavaScript library for building UIs.",
  "Django is a Python framework for web development.",
  "Flask is a lightweight Python framework.",
  "Django is a great framework for backend.",
];

// Function to get embedding from Ollama
async function getEmbedding(text) {
  const response = await axios.post(OLLAMA_URL, {
    model: MODEL,
    prompt: text,   // ✅ use "prompt" instead of "input"
  });
  return response.data.embedding;
}

// Cosine similarity
function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (normA * normB);
}

async function main() {
  console.log("Embedding documents...");
  const docEmbeddings = await Promise.all(documents.map(getEmbedding));

  const query = "Which framework is best for backend development?";
  const queryEmbedding = await getEmbedding(query);

  let bestMatch = { doc: null, score: -1 };
  documents.forEach((doc, i) => {
    const score = cosineSimilarity(queryEmbedding, docEmbeddings[i]);
    if (score > bestMatch.score) {
      bestMatch = { doc, score };
    }
  });

  console.log(`\nQuery: ${query}`);
  console.log(`Best match: "${bestMatch.doc}" (score: ${bestMatch.score.toFixed(3)})`);
}

main();
