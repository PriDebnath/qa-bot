import fs from "fs";
import path from "path";
import { readPdfText } from 'pdf-text-reader';
import mammoth from "mammoth";
// import { parse } from "csv-parse/sync";

/**
 * Extract text from a TXT file
 */
async function extractTextFromTxt(filePath) {
  return fs.promises.readFile(filePath, "utf-8");
}

// /**
//  * Extract text from a DOCX file
//  */
async function extractTextFromDocx(filePath) {
  const dataBuffer = await fs.promises.readFile(filePath);
  const result = await mammoth.extractRawText({ buffer: dataBuffer });
  return result.value || ""; // mammoth returns { value, messages }
}

/**
 * Extract text from a PDF file
 */
 async function extractTextFromPdf(filePath) {
    try {
        const data = await readPdfText({ url: filePath });
        return data
    } catch (error) {
        console.error("Error extracting PDF text:", error);
        throw new Error("PDF extract failed");
    }
}

/**
 * Extract text from a CSV file
 */
export async function extractTextFromCsv(filePath) {
  const data = await fs.promises.readFile(filePath, "utf-8");
  // normalize whitespace, remove extra commas if needed
  const text = data
    .split("\n")
    .map(row => row.trim())
    .filter(row => row.length > 0)
    .join("\n");

  return text;
}

/**
 * Main file handler that delegates based on extension
 */
export async function extractTextFromFile(filePath, opts = {}) {
  const ext = path.extname(filePath).toLowerCase();
  console.log("File extension:", ext);

  switch (ext) {
    case ".txt":
      return extractTextFromTxt(filePath);
    case ".pdf":
      return extractTextFromPdf(filePath, { password: opts.password });
    case ".docx":
      return extractTextFromDocx(filePath);
    case ".csv":
      return extractTextFromCsv(filePath);
    default:
      throw new Error(`Unsupported file type: ${ext}`);
  }
}
