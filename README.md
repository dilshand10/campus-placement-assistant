# 🎓 Campus Placement Assistant

> **AI-powered campus placement guidance platform** built with
> **Microsoft Foundry, Foundry IQ (RAG), and Microsoft Entra ID** for
> the AI-103 Group Project.

The Campus Placement Assistant provides students with a secure,
conversational interface for placement preparation. It combines a
Microsoft Foundry Prompt Agent with Foundry IQ retrieval-augmented
generation (RAG), a FastAPI backend, and a React/Vite frontend.

------------------------------------------------------------------------

## 🔗 Project Links

  -------------------------------------------------------------------------------------------------------------------------------------------
  Resource                            Link
  ----------------------------------- -------------------------------------------------------------------------------------------------------
  🌐 Live Prototype                   **Campus Placement Assistant**

  📦 GitHub Repository                **[dilshand10/campus-placement-assistant](https://github.com/dilshand10/campus-placement-assistant)**

  🎥 5-Minute YouTube Video           *Add the final YouTube video link after upload*
  -------------------------------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------

## 👥 Team

  Member          Responsibility
  --------------- ----------------------------------------------
  **Gursharan**   Landing Page & Frontend UI
  **Rudraksh**    FastAPI Backend & Authentication Integration
  **Muskan**      Microsoft Foundry Prompt Agent
  **Denish**      Foundry IQ / RAG
  **Dilshan**     Testing, Azure Deployment & Documentation

### Team Contributions

**Gursharan**\
Designed and implemented the landing page, hero section, feature cards,
responsive UI, and final application branding.

**Rudraksh**\
Built the FastAPI backend, implemented `/chat` and `/reset` endpoints,
and integrated JWT validation with Microsoft Entra ID.

**Muskan**\
Created the Microsoft Foundry Prompt Agent `Campus-Placement-Assistant`
and defined its safe, domain-specific system prompts.

**Denish**\
Configured the Foundry IQ knowledge base, indexed the six placement
Markdown documents, and implemented retrieval-augmented generation.

**Dilshan**\
Performed end-to-end testing, authored Azure deployment workflows,
deployed the application, and prepared the final project documentation.

------------------------------------------------------------------------

# 📌 1. Problem Statement

Students often struggle to find consolidated and trustworthy information
for campus placement preparation.

Common questions include:

-   Which companies are hiring for their engineering branch?
-   Do they meet the required CGPA and backlog criteria?
-   What interview rounds should they expect?
-   Which technical and behavioral topics should they prepare?
-   How should preparation differ between different roles?

The project addresses these challenges through a single conversational
placement assistant.

------------------------------------------------------------------------

# 💡 2. Solution Overview

The **Campus Placement Assistant** is a unified AI-powered web
application that:

-   🔐 Authenticates students using **Microsoft Entra ID**.
-   🧠 Provides **RAG-grounded responses** using Foundry IQ.
-   🤖 Uses a Microsoft Foundry Prompt Agent for placement-related
    conversations.
-   ⚡ Provides a secure **FastAPI backend**.
-   💬 Maintains conversation state per authenticated user in memory.
-   🖥️ Provides a modern **React + Vite SPA**.
-   ☁️ Runs on Azure services for deployment and AI capabilities.

> **Data note:** The placement information used by this prototype is
> synthetic demonstration data.

------------------------------------------------------------------------

# ✨ 3. Key Features

### 🔐 Secure Authentication

-   Microsoft Entra ID single-tenant authentication.
-   Organization-only access.
-   Redirect-based authentication using `loginRedirect()` and
    `logoutRedirect()`.
-   No authentication pop-ups.
-   Server-side JWT validation.

### 🛡️ Protected Chat

-   `/chat` is protected by a React `ProtectedRoute`.
-   Requests to the backend include a Bearer access token.
-   Backend validates the token before processing requests.

### 🧠 RAG-Based Placement Guidance

-   Uses **Foundry IQ** as the knowledge layer.
-   Retrieves relevant information from six placement knowledge
    documents.
-   Uses embeddings to support semantic retrieval.
-   Generates grounded responses through the Foundry Prompt Agent.

### 💬 Conversation Management

-   Conversation state is maintained per authenticated user.
-   `Clear History` resets the current conversation through `/reset`.
-   Conversation data is currently stored in memory and is not
    persisted.

### 🎨 Responsive Frontend

-   Modern landing page.
-   Hero section and feature cards.
-   Responsive layout.
-   Protected chat interface.
-   Compact footer and consistent branding.

------------------------------------------------------------------------

# 🏗️ 4. Architecture & Data Flow

``` mermaid
flowchart TD

    subgraph Client["Client Layer (Browser)"]
        User["🎓 Student / User"]
        Landing["🏠 Landing Page"]
        AuthFlow["🔐 MSAL React (PKCE)"]
        ChatUI["💬 Protected Chat UI"]
    end

    subgraph Identity["Identity & Access Management"]
        Entra["🛡️ Microsoft Entra ID<br/>(Single-Tenant)"]
    end

    subgraph Backend["Server Layer (Azure App Service)"]
        FastAPI["⚡ FastAPI Application"]
        TokenVal["🔑 Entra JWT Token Validator"]
        ConvMgr["🗂️ Conversation Manager<br/>(In-Memory)"]
    end

    subgraph Foundry["Azure AI & Knowledge Layer"]
        Agent["🤖 Prompt Agent:<br/>Campus-Placement-Assistant"]
        FoundryIQ["🧠 Foundry IQ Knowledge Base:<br/>campus-placement-kb"]
        Embeddings["🔢 text-embedding-3-small"]
        Docs["📚 6 Placement Knowledge Documents"]
    end

    User --> Landing
    Landing -->|Sign In / Get Started| AuthFlow
    AuthFlow <-->|OAuth 2.0 + PKCE| Entra
    AuthFlow -->|Authenticated Token| ChatUI
    ChatUI -->|POST /chat with Bearer Token| FastAPI
    FastAPI --> TokenVal
    TokenVal -->|Extract Verified OID / Sub| ConvMgr
    ConvMgr -->|Conversation| Agent
    Agent <-->|Vector Retrieval / RAG| FoundryIQ
    FoundryIQ <--> Embeddings
    FoundryIQ <--> Docs
    Agent -->|Grounded Response| FastAPI
    FastAPI -->|Grounded Response| ChatUI
```

### Request Flow

1.  The student opens the landing page.
2.  The student selects **Sign In / Get Started**.
3.  MSAL React redirects the user to Microsoft Entra ID.
4.  After successful authentication, the user returns to the SPA.
5.  Authenticated users access the protected `/chat` route.
6.  The frontend sends the chat message with a Bearer token.
7.  FastAPI validates the Entra ID JWT.
8.  The verified user identity is used to manage conversation state.
9.  The request is sent to the Microsoft Foundry Prompt Agent.
10. Foundry IQ retrieves relevant knowledge from the placement
    documents.
11. The agent generates a grounded response.
12. The response is returned through FastAPI to the React chat
    interface.

------------------------------------------------------------------------

# ☁️ 5. AI-103 Concepts Used

This project demonstrates several concepts relevant to **Microsoft Azure
AI-103**:

### Microsoft Foundry Prompt Agent

A domain-specific Prompt Agent named:

``` text
Campus-Placement-Assistant
```

The agent is constrained to placement-related questions and uses safe
system instructions.

### Foundry IQ / Retrieval-Augmented Generation

Foundry IQ provides:

-   Knowledge-base storage.
-   Document indexing.
-   Embeddings.
-   Semantic/vector retrieval.
-   Grounding for generated responses.

### Enterprise Authentication

The application uses:

-   Microsoft Entra ID.
-   Authorization Code Flow with PKCE.
-   MSAL React.
-   Server-side JWT validation.

------------------------------------------------------------------------

# 🧰 6. Technology Stack

  -----------------------------------------------------------------------
  Layer                               Technologies
  ----------------------------------- -----------------------------------
  **Frontend**                        React 19, Vite,
                                      `@azure/msal-browser`,
                                      `@azure/msal-react`, React Router,
                                      CSS

  **Backend**                         Python 3.10+, FastAPI, Uvicorn,
                                      PyJWT, `azure-identity`

  **AI Platform**                     Microsoft Foundry Prompt Agent,
                                      Foundry IQ

  **Identity**                        Microsoft Entra ID

  **Hosting**                         Azure App Service (Python), Azure
                                      Static Web Apps

  **Retrieval / Embeddings**          Foundry IQ,
                                      `text-embedding-3-small`
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 🤖 7. Microsoft Foundry

## Prompt Agent

**Agent:** `Campus-Placement-Assistant`

The agent is designed specifically for campus-placement-related
conversations and is constrained from providing unrelated content.

## RAG Grounding

Placement responses are grounded using the six Markdown knowledge
documents indexed through Foundry IQ.

This allows the assistant to retrieve relevant placement information
before generating a response.

------------------------------------------------------------------------

# 🧠 8. Foundry IQ / RAG

The project uses the following knowledge architecture:

``` text
Placement Markdown Documents
            │
            ▼
     Foundry IQ Knowledge Base
     "campus-placement-kb"
            │
            ▼
       Embeddings
  text-embedding-3-small
            │
            ▼
      Semantic Retrieval
            │
            ▼
     Prompt Agent
            │
            ▼
     Grounded Response
```

### Knowledge Base

**Name:** `campus-placement-kb`

It contains six synthetic placement-related Markdown documents covering
information such as:

-   Companies.
-   Eligibility requirements.
-   Roles.
-   Interview preparation.
-   Placement guidance.

> All placement information is synthetic and intended only for
> demonstration.

------------------------------------------------------------------------

# 🔐 9. Microsoft Entra ID Authentication

The application uses **single-tenant Microsoft Entra ID
authentication**.

### Authentication Characteristics

-   Organization-only access.
-   Redirect-based authentication.
-   `loginRedirect()` for sign-in.
-   `logoutRedirect()` for sign-out.
-   MSAL React authentication state.
-   `useMsal()` and `useAccount()` hooks.
-   Backend JWT validation.
-   Microsoft Entra JWKS endpoint for signature verification.

### Authentication Flow

``` text
React SPA
   │
   ▼
MSAL React
   │
   │ Authorization Code + PKCE
   ▼
Microsoft Entra ID
   │
   ▼
Authenticated User
   │
   ▼
Access Token
   │
   ▼
FastAPI Backend
   │
   ▼
JWT Validation
```

------------------------------------------------------------------------

# 🖥️ 10. Landing Page & User Flow

### Landing Page

Route:

``` text
/
```

The landing page includes:

-   Hero section.
-   Project introduction.
-   Feature cards.
-   Project metrics.
-   Get Started button.
-   Sign-in flow.

### Authenticated User Flow

``` text
Landing Page
     │
     ▼
Sign In
     │
     ▼
Microsoft Entra ID
     │
     ▼
Successful Authentication
     │
     ▼
Protected /chat Route
     │
     ▼
Campus Placement Assistant
```

### Sign Out

When the user signs out:

1.  MSAL cache is cleared.
2.  `logoutRedirect()` is triggered.
3.  The user is returned to the landing page.

The application uses path-based routing so the landing page does not
unnecessarily flash after authentication.

------------------------------------------------------------------------

# 📁 11. Project Structure

``` text
campus-placement-assistant/
│
├── BACKEND/
│   ├── main.py
│   ├── auth.py
│   └── test_agent.py
│
├── services/
│   └── agent_services.py
│
├── data/
│   └── *.md
│
├── FRONTEND/
│   └── src/
│       ├── auth/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
│
├── .github/
│   └── workflows/
│
├── .env.example
├── package.json
├── requirements.txt
└── README.md
```

------------------------------------------------------------------------

# ⚙️ 12. Setup Instructions

## Prerequisites

Install or configure:

-   Python **3.10+**
-   Node.js **18+**
-   npm
-   An Azure account
-   Microsoft Foundry
-   Foundry IQ
-   Microsoft Entra ID application registration

------------------------------------------------------------------------

## Backend Setup

### 1. Create a Virtual Environment

``` bash
python -m venv .venv
```

### 2. Activate the Environment

**macOS / Linux:**

``` bash
source .venv/bin/activate
```

**Windows:**

``` powershell
.venv\Scripts\activate
```

### 3. Install Dependencies

``` bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Copy:

``` text
.env.example
```

to:

``` text
.env
```

Then configure the required Foundry and Entra ID values.

### 5. Start the Backend

``` bash
uvicorn BACKEND.main:app --reload --port 8000
```

The backend will be available at:

``` text
http://127.0.0.1:8000
```

------------------------------------------------------------------------

# 🌐 13. Frontend Setup

Navigate to the frontend:

``` bash
cd FRONTEND
```

Install dependencies:

``` bash
npm install
```

Copy:

``` text
.env.example
```

to:

``` text
.env
```

Configure the required Entra ID and backend API values.

Start the development server:

``` bash
npm run dev
```

The frontend will normally be available at:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

# 🔑 14. Environment Variables

## Backend

Create:

``` text
.env
```

with the following structure:

``` env
FOUNDRY_PROJECT_ENDPOINT=<your-foundry-endpoint>
FOUNDRY_AGENT_NAME=Campus-Placement-Assistant

ENTRA_CLIENT_ID=<client-id>
ENTRA_AUTHORITY=https://login.microsoftonline.com/<tenant-id>/v2.0
ENTRA_TENANT_ID=<tenant-id>

FRONTEND_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
```

## Frontend

Create:

``` text
FRONTEND/.env
```

with:

``` env
VITE_API_URL=http://127.0.0.1:8000

VITE_ENTRA_CLIENT_ID=<client-id>
VITE_ENTRA_AUTHORITY=https://login.microsoftonline.com/<tenant-id>/v2.0
VITE_ENTRA_REDIRECT_URI=http://localhost:5173
VITE_ENTRA_SCOPES=openid,profile,email
```

> ⚠️ Never commit real credentials, client secrets, tokens, or other
> sensitive configuration values to GitHub.

------------------------------------------------------------------------

# 🚀 15. Running the Application

## Development

Run the backend:

``` bash
uvicorn BACKEND.main:app --reload --port 8000
```

In a separate terminal, run the frontend:

``` bash
cd FRONTEND
npm run dev
```

Then open:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

# 📦 16. Production Build & Deployment

## Build the Frontend

``` bash
cd FRONTEND
npm run build
```

This generates the optimized production assets in:

``` text
FRONTEND/dist
```

## Azure Static Web Apps

Deploy the generated SPA assets to Azure Static Web Apps.

The application requires SPA fallback configuration so client-side
routes such as:

``` text
/chat
```

continue to resolve to:

``` text
index.html
```

## Backend

The FastAPI backend is deployed to:

**Azure App Service (Python)**

The application can be deployed through the project's GitHub Actions
workflows.

------------------------------------------------------------------------

# 🧪 17. Testing & Results

  ------------------------------------------------------------------------
  Test Scenario       Expected Result                  Status
  ------------------- ------------------- --------------------------------
  Landing page loads  Hero, metrics, and                 ✅
  at `/`              Get Started button  
                      are visible         

  Unauthenticated     User is redirected                 ✅
  access to `/chat`   to authentication   

  Entra sign-in       User is                            ✅
                      authenticated and   
                      UI updates          

  Eligibility chat    Response is                        ✅
  query               grounded using      
                      placement knowledge 

  Clear History       Conversation is                    ✅
                      reset through       
                      `/reset`            

  Sign out            MSAL state is                      ✅
                      cleared and user    
                      returns to landing  
                      page                
  ------------------------------------------------------------------------

------------------------------------------------------------------------

# 🛡️ 18. Responsible AI & Security

### Synthetic Data

All placement information is synthetic demonstration data and does not
represent official university hiring information.

### No Hard-Coded Secrets

Credentials and environment-specific configuration are loaded through
environment variables.

### Token Validation

The backend validates Entra ID JWT signatures using Microsoft's JWKS
endpoint.

### Scope Guardrails

The Prompt Agent is restricted to placement-related topics.

### Authentication

Access to the protected chat experience requires successful
authentication through Microsoft Entra ID.

------------------------------------------------------------------------

# ⚠️ 19. Known Limitations

-   Placement information is synthetic and does not represent real
    university hiring.
-   Conversation state is stored in memory and is lost when the backend
    restarts.
-   There is currently no integration with university ERP systems.
-   There is currently no integration with real placement portals.
-   SPA fallback is configured for Azure Static Web Apps.
-   The application currently does not persist long-term conversation
    history.

------------------------------------------------------------------------

# 🔮 20. Future Improvements

Potential future enhancements include:

1.  **Live Placement Integration**\
    Connect to official placement portals and live vacancy sources.

2.  **Persistent Conversation History**\
    Store conversations using **Azure Cosmos DB**.

3.  **Resume Analysis**\
    Add a custom tool for resume analysis and placement recommendations.

4.  **Interview Simulators**\
    Introduce role-specific technical and behavioral interview
    simulations.

5.  **Advanced Personalization**\
    Provide guidance based on a student's selected role, skills, and
    preparation progress.

------------------------------------------------------------------------

# 📚 21. Third-Party Acknowledgements

This project uses the following technologies and SDKs:

-   Microsoft Azure SDKs
    -   `azure-ai-projects`
    -   `azure-identity`
-   `@azure/msal-browser`
-   `@azure/msal-react`
-   FastAPI
-   Uvicorn
-   React 19
-   Vite 8
-   React Router
-   `react-markdown`
-   `remark-gfm`

------------------------------------------------------------------------

# 📢 22. Synthetic / Demo Data Disclaimer

> **Important:** All company profiles, eligibility thresholds, interview
> guidance, and other placement information presented by this prototype
> are **synthetic demonstration data**. They are intended solely for
> educational and project demonstration purposes and should **not** be
> considered official placement information.

------------------------------------------------------------------------

## ⭐ Project Summary

**Campus Placement Assistant** demonstrates how modern Azure AI services
can be combined with secure enterprise authentication,
retrieval-augmented generation, and a modern web application to create a
practical AI-powered student placement assistant.

### Core Architecture

``` text
React + Vite
     │
     ▼
Microsoft Entra ID
     │
     ▼
FastAPI Backend
     │
     ▼
Microsoft Foundry Prompt Agent
     │
     ▼
Foundry IQ / RAG
     │
     ▼
Placement Knowledge Base
```

**Built for the AI-103 Group Project using Microsoft Azure AI
technologies.**
