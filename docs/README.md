# 📚 Barbearia Neves AI Project - Project Documentation Hub
> **Project Root**: `docs/`

---

## 🧭 System Navigator

This project is divided into two **completely distinct** operational domains. It is crucial to understand which domain you are working on to avoid context contamination.

### 1. 🧠 [Voice AI System](./Voice_AI_System/README.md)
**Context: The "Product" (The AI Agent Itself)**
This folder contains the brain, soul, and instructions for "Bruno", the AI Receptionist.
*   **Target Audience:** The end-users (clients calling the barbershop).
*   **Key Contents:**
    *   **Prompts (P1-P5):** The instructions that define Bruno's behavior.
    *   **Knowledge Base (Data):** The "Truth" (Services, Prices, Hours, Barbers).
    *   **Research (Perplexity):** Technical decisions (Latency, LLM choice).

### 2. 💻 [ROI Calculator SaaS](./ROI_SaaS_App/README.md)
**Context: The "Sales Tool" (The Software)**
This folder contains the documentation for the Web Application used to *sell* the AI Agent to barbershop owners.
*   **Target Audience:** Barbershop Owners (B2B leads).
*   **Key Contents:**
    *   **Business Logic:** Why we charge €150/month (Pricing Strategy).
    *   **Technical Analysis:** How the ROI is calculated mathematically.
    *   **Codebase Map:** `src/` structure, Components, Types.

---

## 🤖 AI Agent Instructions (Context Switching)

### 🔴 SCENARIO A: "Update the price of the haircut"
*   **Action:** Go to `Voice_AI_System/Voice_Agency_V2.0/00_Data_Sources`.
*   **Why:** This changes what the *Agent says* to clients.

### 🔵 SCENARIO B: "Update the ROI calculation formula"
*   **Action:** Go to `ROI_SaaS_App/Business_Context`.
*   **Why:** This changes how the *App projects value* to the owner.

### 🟣 SCENARIO C: "Change the Agent's personality"
*   **Action:** Go to `Voice_AI_System/Voice_Agency_V2.0/02_Prompts_P`.
*   **Why:** This changes the System Prompt.

---

*This structure is designed to be "Agent-Proof", ensuring that changes in the Sales Tool do not break the Operational Agent, and vice-versa.*
