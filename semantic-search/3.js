import { embedDocs, embedText, findBestMatch } from "../utils/embedding.js";
import { testOllamaEmbedding, listModels } from "../utils/ollama.js";

async function main() {
  // 📋 List available models
  const models = await listModels();
  console.log("📦 Installed models:", models);
  
    // 🔍 Test Ollama connectivity + embeddings
  await testOllamaEmbedding("nomic-embed-text");



    // knowledge base
    const docs = [
        "You can reset your password from the account settings page.",
        "Our office hours are Monday to Friday, 9am to 5pm.",
        "Shipping usually takes 3 to 5 business days.",
        "Contact support if you encounter any billing issues.",
    ];

    console.log("📦 Embedding documents...");
    const docEmbeddings = await embedDocs(docs);

    const query = "I forgot my login credentials, how can I get back in?";
    console.log("\n🔎 Query:", query);

    const queryEmbedding = await embedText(query);
    const { bestDoc, bestScore } = findBestMatch(queryEmbedding, docs, docEmbeddings);

    console.log("\n✅ Best Match:", bestDoc);
    console.log("Similarity Score:", bestScore.toFixed(4));
}

main();
