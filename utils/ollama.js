import ollama from "ollama";
import { spawn } from "child_process";

// --- check if Ollama is running ---
export async function isOllamaRunning() {
  try {
    const res = await fetch("http://127.0.0.1:11434/api/tags");
    return res.ok;
  } catch {
    return false;
  }
}

// --- start Ollama server ---
export function startOllama() {
  console.log("⚡ Starting Ollama server...");
  const proc = spawn("ollama", ["serve"], {
    detached: true,
    stdio: "ignore",
  });
  proc.unref();
}

// --- wait until Ollama is available ---
export async function waitForOllama(timeoutMs = 5000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await isOllamaRunning()) return true;
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

// --- list available models ---
export async function listModels() {
  try {
    const res = await fetch("http://127.0.0.1:11434/api/tags");
    if (!res.ok) throw new Error(`Failed with status ${res.status}`);
    const data = await res.json();
    return data.models.map(m => m.name);
  } catch (err) {
    console.error("❌ Error listing models:", err.message);
    return [];
  }
}

// --- check if a specific model is available ---
export async function hasModel(modelName) {
  const models = await listModels();
  return models.some(m => m === modelName || m.startsWith(modelName + ":"));
}


// --- quick connectivity + embedding test ---
export async function testOllamaEmbedding(modelName = "nomic-embed-text") {
  if (!(await isOllamaRunning())) {
    startOllama();
    console.log("⏳ Waiting for Ollama to come online...");
    const ok = await waitForOllama();
    if (!ok) {
      console.error("❌ Could not start Ollama server within timeout.");
      return;
    }
  }

  // Check model availability
  if (!(await hasModel(modelName))) {
    console.error(`❌ Model "${modelName}" is not available. Run: ollama pull ${modelName}`);
    return;
  }

  try {
    const response = await ollama.embeddings({
      model: modelName,
      prompt: "Hello, this is a test to check embeddings.",
    });

    console.log("Embedding vector length:", response.embedding.length);
    console.log("First 10 values:", response.embedding.slice(0, 10));
    console.log("✅ Connected to Ollama!");
  } catch (err) {
    console.error(`❌ Error running model "${modelName}":`, err);
  }
}

export async function getAvailableModel(preferredModel = "gemma3:1b") {
  // List installed models
  const { models } = await ollama.list();

  // Check if preferred model is installed
  const found = models.find(m => m.name === preferredModel);

  if (found) {
    return preferredModel;
  } else {
    throw new Error(`Model ${preferredModel} not found locally. Please pull it using: ollama pull ${preferredModel}`);
  }
}
