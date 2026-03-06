# Manufacturing AI Agent — Task 1 Submission
### AI Product Analyst Assessment · Steel Manufacturing Operations

---

## Overview

This is a full-stack AI agent that processes unstructured manufacturing documentation
(Work Breakdown Structures and Standard Operating Procedures) and extracts structured,
machine-readable data using the Claude API.

**Tech stack:** Node.js (Express) backend + React frontend  
**AI model:** Claude Sonnet 4 (claude-sonnet-4-20250514)  
**Documents supported:** 4 WBS + 6 SOP samples (all provided samples)

---

## Quick Start

### Prerequisites
- Node.js v18 or later
- A free Anthropic API key (get one at https://console.anthropic.com)

### Step 1 — Set up the backend

```bash
cd backend
cp .env.example .env
# Open .env and paste your Anthropic API key
npm install
node server.js
```

Backend will be running at: http://localhost:3001

### Step 2 — Set up the frontend

```bash
cd frontend
npm install
npm start
```

Frontend will open at: http://localhost:3000

---

## What the Agent Does

1. **Loads** all 10 sample documents (4 WBS + 6 SOP) — pre-loaded in the UI
2. **Sends** each document to Claude via the backend API with an engineered extraction prompt
3. **Parses** the structured JSON response from Claude
4. **Displays** extracted data in a formatted table (or raw JSON view)
5. **Exports** results as CSV for downstream use

---

## Extraction Fields

### WBS Documents
| Field | Description |
|---|---|
| `task_name` | Concise task/activity name |
| `duration` | Estimated time (days/hours) |
| `responsible_party` | Team, person, or department |
| `dependencies` | What must be completed first |

### SOP Documents
| Field | Description |
|---|---|
| `step_number` | Sequential step number |
| `action_description` | Clear description of what must be done |
| `responsible_role` | Who performs this step |
| `safety_critical` | `"Yes"` or `"No"` |

---

## Architecture

```
Browser (React)
     │
     │  POST /extract  { docType, title, text }
     ▼
Express Backend (Node.js)
     │
     │  POST https://api.anthropic.com/v1/messages
     │  Model: claude-sonnet-4-20250514
     │  Prompt: Engineered WBS or SOP extraction prompt
     ▼
Claude API Response (JSON array)
     │
     ▼
Browser renders structured table + CSV export
```

The backend proxies all API calls to keep the API key secure (never exposed in the browser).

---

## Prompt Engineering Approach

Two distinct prompts are used — one for WBS, one for SOP.

Key prompt design decisions:
- **Explicit field names** with descriptions to minimise hallucination
- **"Return ONLY a valid JSON array"** instruction to prevent markdown wrapping
- **Safety critical guidance** for SOPs: defines explicit criteria (PPE, hazardous conditions,
  explicitly labelled SAFETY CRITICAL) to ensure consistent Yes/No classification
- **"Be thorough — extract every distinct task"** to prevent the model from summarising
  or skipping minor activities
- Response parsed with `.replace(/```json|```/g, "")` as a defensive strip

---

## Sample Outputs

The `/sample-outputs/` folder contains pre-generated JSON extractions for:

| File | Documents |
|---|---|
| `WBS1_BF_Reline_extracted.json` | 14 tasks from BF#2 Annual Reline Project |
| `WBS2_CCM_Tundish_extracted.json` | 12 tasks from CCM-3 Tundish Replacement |
| `SOP1_HotMetal_Sampling_extracted.json` | 8 steps from BF Hot Metal Sampling SOP |
| `SOP4_ConfinedSpace_Entry_extracted.json` | 11 steps from Confined Space Entry SOP |

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check server status |
| POST | `/extract` | Extract single document |
| POST | `/extract-batch` | Extract multiple documents in sequence |

### POST /extract — Request body
```json
{
  "docType": "wbs",
  "title": "BF#2 Annual Reline Project",
  "text": "...full document text..."
}
```

### POST /extract — Response
```json
{
  "docType": "wbs",
  "title": "BF#2 Annual Reline Project",
  "rowCount": 14,
  "data": [ ... ]
}
```

---

## Why This Approach?

| Decision | Rationale |
|---|---|
| Claude Sonnet 4 | Best balance of speed and extraction accuracy; free tier available |
| Node.js backend | Keeps API key secure; allows batch processing and future scaling |
| React frontend | Enables live demo with document switching and CSV export |
| JSON-only output | Machine-readable format suitable for database ingestion, Excel, or downstream systems |
| Separate WBS/SOP prompts | Different extraction schemas need different instructions |

---

## Potential Real-World Applications

- **Project planning systems:** Auto-populate MS Project or Primavera P6 from WBS documents
- **Compliance tracking:** Flag safety-critical SOP steps for mandatory sign-off workflows  
- **Digital twin integration:** Feed structured maintenance schedules into asset management systems
- **Knowledge base:** Convert tribal knowledge locked in Word docs/PDFs into searchable databases
- **Training materials:** Auto-extract procedures for operator training systems
