import fs from "fs";
import path from "path";
// import pdf from "pdf-parse";
// import mammoth from "mammoth";
// import { parse } from "csv-parse/sync";

/**
 * Extract text from a TXT file
 */
async function extractTextFromTxt(filePath) {
  return fs.promises.readFile(filePath, "utf-8");
}

/**
 * Extract text from a PDF file
//  */
// async function extractTextFromPdf(filePath) {
//   const dataBuffer = await fs.promises.readFile(filePath);
//   const data = await pdf(dataBuffer);
//   return data.text;
// }

// /**
//  * Extract text from a DOCX file
//  */
// async function extractTextFromDocx(filePath) {
//   const dataBuffer = await fs.promises.readFile(filePath);
//   const result = await mammoth.extractRawText({ buffer: dataBuffer });
//   return result.value || ""; // mammoth returns { value, messages }
// }

/**
 * Extract text from a CSV file
 */
// async function extractTextFromCsv(filePath) {
//   const content = await fs.promises.readFile(filePath, "utf-8");
//   const records = parse(content, { columns: false, skip_empty_lines: true });
//   return records.map(r => r.join(" ")).join("\n");
// }

/**
 * Main file handler that delegates based on extension
 */
export async function extractTextFromFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  console.log("File extension:", ext);

  switch (ext) {
    case ".txt":
      return extractTextFromTxt(filePath);
    // case ".pdf":
    //   return extractTextFromPdf(filePath);
    // case ".docx":
    //   return extractTextFromDocx(filePath);
    // case ".csv":
    //   return extractTextFromCsv(filePath);
    default:
      throw new Error(`Unsupported file type: ${ext}`);
  }
}
