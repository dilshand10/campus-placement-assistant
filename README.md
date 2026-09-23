🎓 Campus Placement Assistant

AI-powered placement guidance web application built with Microsoft Foundry, Foundry IQ (RAG), and Microsoft Entra ID Authentication for the AI-103 Group Project.

🔗 Project Links

Live Prototype: Campus Placement Assistant

GitHub Repository: dilshand10/campus-placement-assistant

5-Minute YouTube Video: Add the final YouTube video URL here after upload.

1️⃣ Project Title

Campus Placement Assistant

2️⃣ Team Members

Member

Role

Gursharan

Landing Page & Frontend UI

Rudraksh

FastAPI Backend & Authentication Integration

Muskan

Microsoft Foundry Agent

Denish

Foundry IQ / RAG

Dilshan

Testing, Azure Deployment & Documentation

3️⃣ Team Contributions

Gursharan – Designed and implemented the Landing Page, hero section, feature cards, and overall responsive UI. Updated all UI text to reflect the final branding.

Rudraksh – Built the FastAPI backend, created /chat and /reset endpoints, integrated JWT validation with Microsoft Entra ID.

Muskan – Created the Microsoft Foundry Prompt Agent Campus-Placement-Assistant and defined safe system prompts.

Denish – Set up the Foundry IQ knowledge base, indexed the six placement markdown documents, and configured retrieval‑augmented generation.

Dilshan – Performed end‑to‑end testing, authored deployment pipelines to Azure App Service, and authored the final documentation.

4️⃣ Problem Statement

Students struggle to find consolidated, trustworthy information for campus placement preparation:

Which companies are hiring for their engineering branch?

Do they meet CGPA and backlog requirements?

What interview rounds and topics should they prepare for?

How does preparation differ across roles?

5️⃣ Solution Overview

A unified, conversational AI assistant that:

Authenticates each student via Microsoft Entra ID (single‑tenant, organization‑only).

Provides RAG‑grounded answers from a curated knowledge base.

Is protected behind a secure back‑end (FastAPI) that stores conversation state per user in-memory (not persisted).

Delivers a modern SPA experience built with React and Vite.

6️⃣ Key Features

Secure Single‑Window Authentication using loginRedirect/logoutRedirect (no pop‑ups).

Protected Chat Route (/chat) guarded by ProtectedRoute.

RAG‑Based Guidance powered by Foundry IQ.

Synthetic Demo Data for companies, eligibility rules, and interview preparation.

Clear History button to reset conversation state.

Responsive UI with hero, feature cards, and a compact footer.

7️⃣ Architecture / Data Flow


flowchart TD

    subgraph Client ["Client Layer (Browser)"]

        User["🎓 Student / User"]

        Landing["🏠 Landing Page"]

        AuthFlow["🔐 MSAL React (PKCE)"]

        ChatUI["💬 Protected Chat UI"]

    end

    subgraph Identity ["Identity & Access Management"]

        Entra["🛡️ Microsoft Entra ID (single-tenant, organization-only)"]

    end

    subgraph Backend ["Server Layer (Azure App Service)"]

        FastAPI["⚡ FastAPI Application"]

        TokenVal["🔑 Entra JWT Token Validator"]

        ConvMgr["🗂️ Conversation Manager (in‑memory)"]

    end

    subgraph Foundry ["Azure AI & Knowledge Layer"]

        Agent["🤖 Prompt Agent: Campus-Placement-Assistant"]

        FoundryIQ["🧠 Foundry IQ Knowledge Base: campus-placement-kb"]

        Embeddings["🔢 text‑embedding‑3‑small"]

        Docs["📚 6 Placement Knowledge Documents"]

    end

    User --> Landing

    Landing -->|Sign In / Get Started| AuthFlow

    AuthFlow <--> |OAuth 2.0 + PKCE| Entra

    AuthFlow -->|Authenticated Token| ChatUI

    ChatUI -->|POST /chat with Bearer Token| FastAPI

    FastAPI --> TokenVal

    TokenVal -->|Extract Verified OID/Sub| ConvMgr

    ConvMgr -->|Conversation| Agent

    Agent <-->|Vector Retrieval RAG| FoundryIQ

    FoundryIQ <--> Embeddings

    FoundryIQ <--> Docs

    Agent -->|Grounded Response| FastAPI

    FastAPI -->|Grounded Response| ChatUI


8️⃣ AI-103 Concepts Used

Microsoft Foundry Prompt Agent – safe, domain‑restricted agent.

Foundry IQ Retrieval‑Augmented Generation – vector store, embeddings, and grounding.

Enterprise Authentication – Authorization Code Flow with PKCE via MSAL React.

9️⃣ Technology Stack

Layer

Technologies

Frontend

React 19, Vite, @azure/msal-browser, @azure/msal-react, React Router (BrowserRouter), Tailored CSS

Backend

Python 3.10+, FastAPI, Uvicorn, PyJWT, azure-identity

AI Platform

Microsoft Foundry (Prompt Agent & IQ)

Identity Provider

Microsoft Entra ID (single-tenant, organization-only)

Hosting

Azure App Service (Python) + Azure Static Web Apps (SPA fallback)

🔟 Microsoft Foundry

Prompt Agent: Campus-Placement-Assistant – constrained to placement‑related queries, no unrelated content.

RAG Grounding: Placement responses are grounded using the six markdown knowledge documents through Foundry IQ retrieval.

1️⃣1️⃣ Foundry IQ / RAG

Knowledge base campus-placement-kb containing synthetic placement documents.

Embeddings generated with text-embedding-3-small.

Retrieval performed on each chat request to provide source‑grounded answers.

1️⃣2️⃣ Microsoft Entra ID Authentication

Single‑tenant configuration (organization‑only).

Redirect‑based flow (loginRedirect / logoutRedirect).

Tokens are verified server‑side using Microsoft’s JWKS endpoint.

Auth state is exposed via MSAL React hooks (useMsal, useAccount).

1️⃣3️⃣ Landing Page and User Flow

Landing Page (/) – marketing content, metrics, and Get Started button.

Sign‑In – redirects to Microsoft Entra ID login page.

After successful login, user is redirected back to the SPA; the Landing Page no longer flashes because routing is now path‑based.

Authenticated users are automatically taken to Protected Chat (/chat).

Users can Sign Out, which clears the MSAL cache and returns to the Landing Page.

1️⃣4️⃣ Project Structure


campus-placement-assistant/

├── BACKEND/                # FastAPI server

│   ├── main.py

│   ├── auth.py

│   └── test_agent.py

├── services/               # Agent service wrapper

│   └── agent_services.py

├── data/                   # Knowledge base markdown files

├── FRONTEND/               # React/Vite SPA

│   └── src/

│       ├── auth/          # MSAL config & provider

│       ├── components/    # Navbar, Footer

│       ├── pages/         # LandingPage, ChatPage

│       ├── App.jsx        # Router (BrowserRouter)

│       └── main.jsx

├── .github/workflows/      # Azure CI/CD

├── .env.example            # Backend env template

├── package.json            # Frontend deps

├── requirements.txt        # Backend deps

└── README.md               # Project documentation (this file)


1️⃣5️⃣ Setup Instructions

Prerequisites

Python 3.10+, Node 18+, Azure account with Foundry and Entra ID enabled.

Backend

Create a virtual environment and install dependencies.

Copy .env.example to .env and fill in your Foundry endpoint, agent name, and Entra ID values.

Run uvicorn BACKEND.main:app --reload --port 8000.

Frontend

cd FRONTEND && npm install.

Copy FRONTEND/.env.example to FRONTEND/.env and set the same Entra values and VITE_API_URL.

npm run dev – visit http://localhost:5173.

1️⃣6️⃣ Environment Variables

Backend (.env)


FOUNDRY_PROJECT_ENDPOINT=\<your-foundry-endpoint>

FOUNDRY_AGENT_NAME=Campus-Placement-Assistant

ENTRA_CLIENT_ID=\<client-id>

ENTRA_AUTHORITY=https://login.microsoftonline.com/\<tenant-id>/v2.0

ENTRA_TENANT_ID=\<tenant-id>

FRONTEND_ORIGIN=http://localhost:5173,http://127.0.0.1:5173


Frontend (FRONTEND/.env)


VITE_API_URL=http://127.0.0.1:8000

VITE_ENTRA_CLIENT_ID=\<client-id>

VITE_ENTRA_AUTHORITY=https://login.microsoftonline.com/\<tenant-id>/v2.0

VITE_ENTRA_REDIRECT_URI=http://localhost:5173

VITE_ENTRA_SCOPES=openid,profile,email


1️⃣7️⃣ Running Instructions

Development: npm run dev (frontend) and uvicorn BACKEND.main:app --reload (backend).

Production Build: npm run build generates the optimized SPA assets.

Deploy the FRONTEND/dist folder to Azure Static Web Apps with a staticwebapp.config.json that redirects all routes to index.html.

1️⃣8️⃣ Testing and Results

Scenario

Expected Outcome

Status

Landing Page loads (/)

Hero, metrics, and Get Started button visible

✅

Unauthenticated access to /chat

Redirected to login via ProtectedRoute

✅

Entra sign‑in (redirect flow)

User authenticated, token stored, UI updates

✅

Chat query (eligibility)

RAG‑grounded answer from knowledge base

✅

Clear History button

Conversation reset via /reset

✅

Sign‑out

MSAL cache cleared, back to Landing Page

✅

🔗 Final Submission Links

Deliverable

Link

Working Prototype

Open Live Prototype

GitHub Repository

Open GitHub Repository

YouTube Video

Add final YouTube URL after upload

Replace the YouTube placeholder with the final accessible video URL before submission.

1️⃣9️⃣ Responsible AI / Security

Synthetic Data Disclaimer – all placement information is synthetic demo data.

Zero Hard‑Coded Secrets – credentials are loaded from environment variables.

Token Validation – backend validates JWT signatures against Microsoft Entra JWKS.

Scope Guardrails – Prompt agent is restricted to placement‑related topics only.

2️⃣0️⃣ Known Limitations

Synthetic placement data; not reflective of real university hiring.

In‑memory conversation store – loses state on server restart.

No integration with actual university ERP or placement portals.

SPA fallback currently configured for Azure Static Web Apps only.

2️⃣1️⃣ Future Improvements

Connect to live placement portals for real vacancies.

Persist conversation history in Azure Cosmos DB.

Add a resume‑analysis custom tool.

Expand role‑specific interview simulators.

2️⃣2️⃣ Third‑Party Acknowledgements

Microsoft Azure SDKs (azure-ai-projects, azure-identity).

@azure/msal-browser & @azure/msal-react.

FastAPI & Uvicorn.

React 19 & Vite 8.

react-markdown & remark-gfm.

2️⃣3️⃣ Synthetic / Demo Data Disclaimer

All company profiles, eligibility thresholds, and interview guidance presented in this prototype are synthetic and intended solely for demonstration purposes. They should not be considered official placement information.