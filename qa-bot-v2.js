// qa-bot-v2.js
import { hasModel } from "./utils/ollama.js";
import ollama from "ollama";
import { extractTextFromFile } from "./utils/input-file-handler.js";

// ---------- QA Bot V2 ----------
export async function qaBotV2(filePath, question, modelName = "gemma3:1b") {
  // 1. Check model availability
  if (!(await hasModel(modelName))) {
    throw new Error(`Model ${modelName} not found. Please pull it first.`);
  }

  // 2. Extract text from file
  
  console.log("\n📖 Extracting context");
  const fileContent = await extractTextFromFile(filePath);
  console.log("\n📖 Context Used:", fileContent);
// console.log("File content:", fileContent)

  console.log("\n🔎 Query:", question);

  // 3. Ask question with context
  console.log("💡 Generating answer...");
  const prompt = `
You are a Q&A bot. 
Context: ${fileContent}

Question: ${question}
Answer:
  `;

  const response = await ollama.chat({
    model: modelName,
    messages: [{ role: "user", content: prompt }],
  });

  return response.message.content;
}

// //  Run txt file
// await qaBotV2("input-files/notes.txt", "What are the office hours?").then(answer => {
//   console.log("\n💡 Answer:", answer);
// }).catch(err => {
//   console.error("Error:", err);
// });

//// Run docx file 
// await qaBotV2("input-files/ai_overview.docx", "What is ai?").then(answer => {
//   console.log("\n💡 Answer:", answer);
// }).catch(err => {
//   console.error("Error:", err);
// });

// await qaBotV2("input-files/ai_overview.docx", "challenges using ai?").then(answer => {
//   console.log("\n💡 Answer:", answer);
// }).catch(err => {
//   console.error("Error:", err);
// });


//// Run pdf file 
await qaBotV2("input-files/ai_overview.pdf", "What is AI?").then(answer => {
    console.log("\n💡 Answer:", answer);
}).catch(err => {
  console.error("Error:", err);
});
