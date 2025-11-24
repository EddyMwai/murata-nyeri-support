**📦 1. Prerequisites**

Ensure the following are installed:

Python 3.10 / 3.11 (⚠️ 3.12+ is not supported due to pydantic-core)

Node.js 18+

Supabase CLI

Git

**🧩 2. Clone Project**
git clone https://github.com/<your-username>/murata-nyeri-support.git
cd murata-nyeri-support

**⚙️ 3. Translator Service (FastAPI, Port 8002)**
Open a terminal and run:
cd translator

# Create and activate virtual environment (Windows)
python -m venv .venv
.\.venv\Scripts\activate

# Mac/Linux
# python3 -m venv .venv
# source .venv/bin/activate

pip install -r requirements.txt

# Run translator API
uvicorn app:app --host 0.0.0.0 --port 8002 --reload


This starts the translation microservice on:

http://localhost:8002

**🟪 4. Supabase Edge Functions**

Open a new terminal:

cd supabase

Start chat function
supabase functions serve chat --env-file .env.local --no-verify-jwt

Start metrics function
supabase functions serve metrics --env-file .env.local --no-verify-jwt

Optional: retriever function
supabase functions serve retrieve --env-file .env.local --no-verify-jwt


Make sure .env.local contains your Supabase project keys.

**🎨 5. Frontend (Vite Client)**

Open another terminal:

cd murata-nyeri-support
npm install
npm run dev


The frontend will open at:

http://localhost:5173


Required environment variables in murata-nyeri-support/.env:

VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key

**⚡ 6. One-liner PowerShell Script (starts all services)**

Place this in a .ps1 file or run directly:

start powershell -NoExit -Command "cd translator; python -m venv .venv; .\.venv\Scripts\activate; pip install -r requirements.txt; uvicorn app:app --host 0.0.0.0 --port 8002 --reload"
start powershell -NoExit -Command "cd supabase; supabase functions serve chat --env-file .env.local --no-verify-jwt"
start powershell -NoExit -Command "cd supabase; supabase functions serve metrics --env-file .env.local --no-verify-jwt"
start powershell -NoExit -Command "cd murata-nyeri-support; npm run dev"


If PowerShell blocks scripts:

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

**🛠️ 7. Common Issues & Fixes**
❌ Pydantic-core fails to build

Cause: Using Python 3.12, 3.13 or 3.14
Fix: Install Python 3.10 or 3.11

❌ Supabase CLI not recognized

Install via Scoop (Windows):

scoop install supabase

❌ Vite environment variables not loading

Ensure murata-nyeri-support/.env exists:

VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

**✔️ 8. Project Structure Overview**
murata-nyeri-support/
│
├── translator/            # FastAPI translation microservice
├── supabase/
│   └── functions/
│       ├── chat/
│       ├── metrics/
│       └── retrieve/      # optional semantic retriever
│
└── murata-nyeri-support/  # Vite frontend

**🎯 9. Summary**

To run the entire system:

Translator: FastAPI on port 8002

Chat: Supabase Edge Function

Metrics: Supabase Edge Function

Frontend: Vite app on port 5173

All components communicate seamlessly to support translation, chat, and analytics.
