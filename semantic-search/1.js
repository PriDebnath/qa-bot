import ollama from "ollama";

// --- cosine similarity helper ---
function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dot / (normA * normB);
}

// --- embed text helper ---
async function embedText(text) {
  const res = await ollama.embeddings({
    model: "nomic-embed-text",
    prompt: text,
  });
  return res.embedding;
}

async function main() {
  // knowledge base (documents)
  const docs = [
    "You can reset your password from the account settings page.",
    "Our office hours are Monday to Friday, 9am to 5pm.",
    "Shipping usually takes 3 to 5 business days.",
    "Contact support if you encounter any billing issues.",
  ];

  // embed all docs
  console.log("📦 Embedding documents...");
  const docEmbeddings = await Promise.all(docs.map(embedText));

  // user query
  const query = "I forgot my login credentials, how can I get back in?";
  console.log("\n🔎 Query:", query);

  const queryEmbedding = await embedText(query);

  // find most similar doc
  let bestDoc = null;
  let bestScore = -Infinity;
  docs.forEach((doc, i) => {
    const score = cosineSimilarity(queryEmbedding, docEmbeddings[i]);
    if (score > bestScore) {
      bestScore = score;
      bestDoc = doc;
    }
  });

  console.log("\n✅ Best Match:", bestDoc);
  console.log("Similarity Score:", bestScore.toFixed(4));
}

main();
