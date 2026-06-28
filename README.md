# ⚡ SmartLedger API — High-Speed AI B2B Document Automation Pipeline

**SmartLedger API** is a production-ready, ultra-fast Fullstack SaaS platform designed to eliminate manual data entry. It processes messy text dumps of corporate invoices/financial documents and transforms them into strictly validated, structured JSON data ready for instant ERP/CRM synchronization.

Built for startups and small-to-medium businesses to skip expensive, slow traditional software development pipelines and deploy AI-driven automation in minutes.

---

## 💎 Why It's Built Differently (Value Proposition)

* **💵 Cost-Efficient Execution:** Native support for budget-friendly open-source models (`meta-llama-3.3-70b`) via OpenRouter API, making document parsing virtually free at scale.
* **⚡ Blazing Fast Architecture:** Zero multi-process bloat. Frontend (Tailwind UI) and Backend (FastAPI) are unified onto a single asynchronous engine, completely bypassing local CORS and network blockages.
* **🛡️ Zero Schema Drift:** Utilizes robust Pydantic token validation. If the AI hallucinates or returns corrupted keys, the system catches the anomaly before it ever touches your corporate registry database.
* **🎨 Premium Dark UI/UX:** A sleek, fully responsive, modern interface with native Drag & Drop file handling, fluid CSS interactions, and real-time backend status feedback.

---

## ⚙️ Tech Stack & Ecosystem

* **Backend Router:** Python 3.11+, FastAPI (ASGI Framework)
* **Data Integrity Layer:** Pydantic v2 (Strict Typing & Validation)
* **Core Networking:** HTTPX (Asynchronous HTTP Client for OpenRouter streams)
* **Frontend Dashboard:** Vanilla JavaScript (ES6+ Asynchronous Fetch API), HTML5, Tailwind CSS

---

## 🏗️ Unified Project Layout

```text
smartledger-api/
├── .env                  # Secure Environment variables (Strictly ignored by git)
├── .gitignore            # Production git exclusion matrix
├── index.html            # Core SaaS dashboard layout (Tailwind CSS)
├── main.py               # Asynchronous FastAPI monolith router & parsing engine
├── README.md             # Project documentation & dynamic showcase
└── static/
    └── script.js         # Non-blocking ES6 event handlers & upload pipeline
```

---

## 🛠️ Quickstart (Run in 60 Seconds)

### 1. Clone & Initialize
```bash
git clone https://github.com
cd SmartLedger-API
```

### 2. Inject Dependencies
```bash
pip install fastapi uvicorn python-multipart httpx python-dotenv
```

### 3. Configure the Secret Vault
Create a `.env` file in the root directory (automatically hidden from production repos):
```text
OPENROUTER_API_KEY=your_secured_openrouter_token_here
```

### 🏃‍♂️ Launch the Monolith
Fire up the asynchronous server instance:
```bash
python -m uvicorn main:app --reload
```
Once deployed, smash this URL in your web browser: **`http://localhost:8000`**

---

## 📈 Enterprise-Grade API Architecture

### `POST /api/extract-document`
Consumes raw unformatted text invoice streams and outputs enterprise-ready validated data models.

* **Payload Structure:** `multipart/form-data` (raw file buffer)
* **Strict Schema JSON Output (200 OK):**
```json
{
  "vendor_name": "ООО СмартКонсалт",
  "inn": "7708123456",
  "invoice_date": "28.06.2026",
  "total_amount": 148500.00,
  "currency": "RUB"
}
```

---

## 🗺️ Production Roadmap & Scaling Vector
- [ ] Implement secure SQLite database layer for persistent immutable historical storage.
- [ ] Migrate local filesystem tracking to unified `Docker` containerization for cloud deployments (AWS/DigitalOcean).
- [ ] Add direct single-click Excel (`.xlsx`) export bindings for rapid accountant financial auditing.
