import ollama from "ollama";

// --- cosine similarity helper ---
export function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dot / (normA * normB);
}

// --- embed text helper ---
export async function embedText(text) {
  const res = await ollama.embeddings({
    model: "nomic-embed-text",
    prompt: text,
  });
  return res.embedding;
}

// --- embed multiple docs helper ---
export async function embedDocs(docs) {
  return Promise.all(docs.map(embedText));
}

// --- find best match helper ---
export function findBestMatch(queryEmbedding, docs, docEmbeddings) {
  let bestDoc = null;
  let bestScore = -Infinity;

  docs.forEach((doc, i) => {
    const score = cosineSimilarity(queryEmbedding, docEmbeddings[i]);
    if (score > bestScore) {
      bestScore = score;
      bestDoc = doc;
    }
  });

  return { bestDoc, bestScore };
}
