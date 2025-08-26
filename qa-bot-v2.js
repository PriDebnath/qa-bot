// qa-bot-v2.js
import fs from "fs/promises";
// import pdfParse from "pdf-parse";
import * as docx from "docx-parser"; // you may replace with 'mammoth' if preferred
import { hasModel } from "./utils/ollama.js";
import ollama from "ollama";
import { extractTextFromFile } from "./utils/input-file-handler.js";

// ---------- File Reader Helper ----------
// async function extractTextFromFile(filePath) {
//   const ext = filePath.split(".").pop().toLowerCase();
//   console.log("File extension:", ext);
//   const buffer = await fs.readFile(filePath);

//   switch (ext) {
//     case "txt":
//       return buffer.toString("utf-8");

//     case "pdf": {
//       const data = await pdfParse(buffer);
//       return data.text;
//     }

//     case "docx":
//       return new Promise((resolve, reject) => {
//         docx.parseDocx(buffer, (err, data) => {
//           if (err) reject(err);
//           else resolve(data);
//         });
//       });

//     case "json": {
//       const obj = JSON.parse(buffer.toString("utf-8"));
//       return JSON.stringify(obj, null, 2);
//     }

//     default:
//       throw new Error(`Unsupported file type: ${ext}`);
//   }
// }

// ---------- QA Bot V2 ----------
export async function qaBotV2(filePath, question, modelName = "gemma3:1b") {
  // 1. Check model availability
  if (!(await hasModel(modelName))) {
    throw new Error(`Model ${modelName} not found. Please pull it first.`);
  }

  // 2. Extract text from file
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
await qaBotV2("input-files/ai_overview.docx", "What is ai?").then(answer => {
  console.log("Answer:", answer);
}).catch(err => {
  console.error("Error:", err);
});

await qaBotV2("input-files/ai_overview.docx", "challenges using ai?").then(answer => {
  console.log("Answer:", answer);
}).catch(err => {
  console.error("Error:", err);
});
