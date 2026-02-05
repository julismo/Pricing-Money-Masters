# 🧠 Voice AI System Documentation (Agency Version 2.0)
> **Root**: `docs/Voice_AI_System/`

---

## 🏗️ Structure Overview: "The Data-Driven Brain"

The Agency Knowledge Base follows a strict linear flow: **Data** feeds **Documentation**, which feeds **Prompts**.

### 📂 1. `Voice_Agency_V2.0` (The Core)

#### 🔹 [00_Data_Sources](./Voice_Agency_V2.0/00_Data_Sources/) (The Raw Truth)
*   **What is it?** The absolute "Source of Truth" for the business.
*   **Key Files:** `Daso_sobre_negocio.md`.
*   **Usage:** If a price, hour, or barber changes, **CHANGE IT HERE FIRST**.

#### 🔹 [01_Documentation_D](./Voice_Agency_V2.0/01_Documentation_D/) (The Manuals)
*   **What is it?** Human-readable PDF-style manuals (D1-D5) derived from the Data Sources.
*   **Usage:** Used for RAG (Retrieval) and training humans/agents on specific verticals (e.g., "D2" is Operations).

#### 🔹 [02_Prompts_P](./Voice_Agency_V2.0/02_Prompts_P/) (The Instructions)
*   **What is it?** The strict instructions for the LLM (P1-P5).
*   **Key File:** **`MASTER_PROMPT.md`** (The concatenated production prompt).
*   **Usage:** Copy `MASTER_PROMPT.md` directly to Retell/OpenAI.

---

### 📂 2. `Perplexity` (The Research Lab)
*   **What is it?** Background research, benchmarks, and technical feasibility studies.
*   **Contents:**
    *   **Latency Studies:** Vapi vs Retell benchmarks.
    *   **Cultural Analysis:** How to speak "PT-PT" correctly.
    *   **Prompt Engineering:** The D1-D5 Framework theory.

---

## ⚡ Quick Actions

- **To update the Agent:** Edit `00_Data_Sources`, then update `MASTER_PROMPT.md`.
- **To change the Prompt Logic:** Edit the specific `P` file (e.g., `P1_Identidade.md`) and regenerate Master.
- **To research Voice Tech:** Check `Perplexity`.

---
*Maintained by: Antigravity Agent*
