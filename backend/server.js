import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

const API_KEY = process.env.ANTHROPIC_API_KEY;

// ─── Health check ──────────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok", model: "claude-sonnet-4-20250514" });
});

// ─── Main extraction endpoint ─────────────────────────────────────────────────
app.post("/extract", async (req, res) => {
  const { docType, title, text } = req.body;

  if (!docType || !text) {
    return res.status(400).json({ error: "Missing docType or text" });
  }

  const prompt = docType === "wbs"
    ? buildWBSPrompt(text)
    : buildSOPPrompt(text);

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic API error:", err);
      return res.status(502).json({ error: "Upstream API error", detail: err });
    }

    const data = await response.json();
    const rawText = data.content?.map((c) => c.text || "").join("") || "";
    const cleaned = rawText.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return res.status(422).json({
        error: "Failed to parse model response as JSON",
        raw: rawText,
      });
    }

    res.json({
      docType,
      title,
      rowCount: parsed.length,
      data: parsed,
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ─── Batch extraction endpoint ─────────────────────────────────────────────────
app.post("/extract-batch", async (req, res) => {
  const { documents } = req.body;

  if (!Array.isArray(documents) || documents.length === 0) {
    return res.status(400).json({ error: "documents must be a non-empty array" });
  }

  const results = [];
  for (const doc of documents) {
    const prompt = doc.docType === "wbs"
      ? buildWBSPrompt(doc.text)
      : buildSOPPrompt(doc.text);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();
      const rawText = data.content?.map((c) => c.text || "").join("") || "";
      const cleaned = rawText.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      results.push({ id: doc.id, title: doc.title, docType: doc.docType, data: parsed, success: true });
    } catch (err) {
      results.push({ id: doc.id, title: doc.title, docType: doc.docType, error: err.message, success: false });
    }
  }

  res.json({ results, processed: results.length });
});

// ─── Prompt builders ──────────────────────────────────────────────────────────
function buildWBSPrompt(text) {
  return `You are an AI data extraction specialist for steel manufacturing operations.

Extract ALL tasks and activities from the Work Breakdown Structure (WBS) document below.
Return ONLY a valid JSON array — no markdown, no explanation.

Each task object must have exactly these fields:
- "task_name": string — concise name/description of the task
- "duration": string — estimated time (e.g. "2 days", "4 hours", "3-4 days", "Unknown" if not stated)
- "responsible_party": string — team, person, or department responsible
- "dependencies": string — what must be completed first, or "None" if not stated

Be thorough — extract every distinct task, activity, or work package mentioned.

WBS DOCUMENT:
${text}

Return ONLY the JSON array.`;
}

function buildSOPPrompt(text) {
  return `You are an AI data extraction specialist for steel manufacturing operations.

Extract ALL procedure steps from the Standard Operating Procedure (SOP) document below.
Return ONLY a valid JSON array — no markdown, no explanation.

Each step object must have exactly these fields:
- "step_number": number — sequential step number
- "action_description": string — clear, concise description of what must be done
- "responsible_role": string — who performs this step (e.g. "Crane Operator", "Safety Officer")
- "safety_critical": "Yes" or "No" — Yes if the step involves significant safety risk, requires PPE, 
  handles hazardous materials/conditions, involves emergency procedures, or is explicitly marked as 
  SAFETY CRITICAL in the document

SOP DOCUMENT:
${text}

Return ONLY the JSON array.`;
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n✅ Manufacturing AI Agent backend running`);
  console.log(`   → http://localhost:${PORT}`);
  console.log(`   → Health check: http://localhost:${PORT}/health\n`);
});
