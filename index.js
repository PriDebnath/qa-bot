// server.js
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import cors from "cors";
import { qaBotV2 } from "./qa-bot-v2.js";

const app = express();
app.use(cors());

// ✅ Multer setup → keep original filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "multer/uploads/"); // folder where files go
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // keep the original filename
  },
});

const upload = multer({ storage });

app.post("/query", upload.single("file"), async (req, res) => {
  try {
    const query = req.body.query;
    const uploadedFile = req.file;
    console.log({ uploadedFile });

    if (!uploadedFile) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // ✅ use original filename with full path
    const filePath = path.resolve(uploadedFile.path);
    console.log({ filePath });

    // Example: read file (adjust depending on doc/pdf parser you use)
    const answer = await qaBotV2(filePath, query);
    console.log({ answer });

    // cleanup after processing
    fs.unlinkSync(filePath);

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);
