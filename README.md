# 🩺 Nivāran — AI-Powered Health Symptom Analyzer

> **Nivāran** (निवारण) means *remedy* or *cure* in Sanskrit.
> A full-stack health guide web application that analyzes your symptoms and provides possible conditions, home remedies, medicines, and severity guidance — powered by Google Gemini AI.

---

## ✨ Features

- 🔍 **Symptom Checker** — Type or select symptoms from a curated list
- 🧠 **AI Analysis** — Google Gemini AI provides intelligent health guidance
- 🗃️ **Local Database** — 50+ symptoms pre-mapped to conditions, remedies, and medicines
- 🚨 **Severity Badges** — Low / Medium / High severity with doctor-visit alerts
- 🔐 **User Authentication** — JWT-based login/signup
- 📅 **Search History** — Save and review past symptom checks
- 📜 **Medical Disclaimer** — Always displayed on results
- 🎨 **Professional UI** — Medical blue & green theme

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js + Vite |
| Backend | Python FastAPI |
| AI | Google Gemini API |
| Database | SQLite (via SQLAlchemy async) |
| Auth | JWT (python-jose + bcrypt) |

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- Google Gemini API Key (free at [aistudio.google.com](https://aistudio.google.com/app/apikey))

---

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate     # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env
# Edit .env and add your GEMINI_API_KEY and a SECRET_KEY

# Run the server
uvicorn main:app --reload --port 8000
```

Backend will be running at: http://localhost:8000
API Docs: http://localhost:8000/docs

---

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run the dev server
npm run dev
```

Frontend will be running at: http://localhost:5173

---

## 📁 Project Structure

```
healthguide/
├── backend/
│   ├── main.py                  # FastAPI entry point
│   ├── routes/
│   │   ├── auth.py              # Login/Register/Me
│   │   ├── symptoms.py          # Symptom analysis
│   │   └── history.py           # User history
│   ├── models/
│   │   ├── base.py              # DB engine & session
│   │   ├── user.py              # User table
│   │   └── history.py           # History table
│   ├── services/
│   │   ├── ai_service.py        # Gemini AI integration
│   │   ├── symptom_matcher.py   # Local DB matcher
│   │   └── auth_utils.py        # JWT helpers
│   ├── db/
│   │   └── symptom_data.json    # Local symptom database
│   └── requirements.txt
│
└── frontend/
    └── src/
        ├── pages/               # Home, Login, Register, Checker, Results, History
        ├── components/          # Navbar
        ├── context/             # AuthContext
        └── services/            # api.js (Axios)
```

---

## 🔑 Environment Variables (backend/.env)

```
GEMINI_API_KEY=your_key_here
SECRET_KEY=any_random_secret_string
DATABASE_URL=sqlite+aiosqlite:///./healthguide.db
ACCESS_TOKEN_EXPIRE_MINUTES=10080
```

---

## ⚠️ Medical Disclaimer

This application is for **educational and informational purposes only**. It does **NOT** replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for any health concerns. In case of emergency, call your local emergency number immediately.

---

## 👨‍💻 Author

Built as a personal portfolio project.
