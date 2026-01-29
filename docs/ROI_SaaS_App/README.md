# 💻 ROI Calculator SaaS - Documentation
> **Root**: `docs/ROI_SaaS_App/`

---

## 🏗️ Structure Overview: "The Sales Engine"

This documentation covers the **Software Application** used to sell the Voice Agency services. It contains both the *Business Logic* (Why we build it) and the *Technical Implementation* (How we build it).

### 📂 1. `Business_Context` (The Strategy)
> **"The Brain behind the Calculator"**

This folder contains the strategic decisions that dictate how the calculator works.
*   **`politica_precos/`**: Explains the €150/month maintenance fee vs the "Anti-SaaS" model. (Crucial for the "Pricing" step in the app).
*   **`analise_tecnica_sistema/`**: Audits of the mathematical models (Realistic vs Optimistic modes).
*   **`diagnosticos/`**: Historical bug reports and system health checks.

### 📂 2. Technical Documentation (The Code)
> **"The Engine"**

*   **Main Logic:** `src/utils/roiCalculations.ts` ( The TS implementation of the Business Context).
*   **Frontend:** React + TypeScript + Vite.
*   **Styling:** TailwindCSS.

---

## ⚡ Quick Actions

- **To Change the Pricing Model:**
    1.  Read `Business_Context/politica_precos/CRITICA_POLITICA_PRECOS.md` to understand the strategy.
    2.  Update `src/components/Calculator/PricingSection.tsx`.

- **To Fix a Calculation Bug:**
    1.  Check `Business_Context/analise_tecnica_sistema/` for known logic constraints.
    2.  Update `src/utils/roiCalculations.ts`.

---
*Maintained by: Antigravity Agent*
