import fs from "fs";
import ollama from "ollama";
import { getAvailableModel } from "./utils/ollama.js";
import { embedDocs, embedText, findBestMatch } from "./utils/embedding.js";

// --- chunk helper ---
function chunkText(text, chunkSize = 200) {
  const words = text.split(/\s+/);
  const chunks = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(" "));
  }
  return chunks;
}

// --- ask LLM with context ---
async function answerQuestion(query, contextChunks) {
  const prompt = `
You are a helpful assistant. Use the provided context to answer the question.
If the answer is not in the context, reply with "I don't know based on the file."

Context:
${contextChunks.join("\n\n")}

Question: ${query}
Answer:
  `;

  const response = await ollama.chat({
    model: await getAvailableModel("gemma3:1b"),  
    messages: [{ role: "user", content: prompt }],
  });

  return response.message.content;
}

// --- main Q&A bot ---
async function qaBot(filePath, query) {
  // Step 1: load text
  const text = fs.readFileSync(filePath, "utf8");

  // Step 2: chunk
  const chunks = chunkText(text, 200);

  // Step 3: embed chunks
  console.log("📦 Creating embeddings for file...");
  const chunkEmbeddings = await embedDocs(chunks);

  // Step 4: embed query
  const queryEmbedding = await embedText(query);

  // Step 5: find best match
  console.log( "🔍 Finding best matching context...");
  const { bestDoc } = findBestMatch(queryEmbedding, chunks, chunkEmbeddings);

  // Step 6: ask LLM
  console.log("💡 Generating answer...");
  const answer = await answerQuestion(query, [bestDoc]);
  console.log("\n🔎 Query:", query);
  console.log("\n📖 Context Used:", bestDoc);
  console.log("\n💡 Answer:", answer);
}

// Example run
qaBot("notes.txt", "What are the office hours?");
