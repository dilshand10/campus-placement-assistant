🎓 Campus Placement Assistant

AI-powered placement guidance using Microsoft Foundry + Foundry IQ

AI-103 Group Project | Chitkara University

</div>

👥 Team Members

Member

Contribution

Gursharan

Frontend & User Experience — React/Vite interface, chat UI, quick-question buttons, Markdown/table rendering, and Clear History interaction.

Rudraksh

Backend & API Integration — FastAPI backend, /chat and /reset endpoints, frontend-to-agent communication, and configuration handling.

Muskan

Microsoft Foundry Agent — Prompt Agent setup, placement-focused instructions, response behavior, grounding/scope rules, and conversation handling.

Denish

Foundry IQ / RAG — Knowledge base and source setup, six placement documents, embeddings/retrieval configuration, and RAG testing.

Dilshan

Testing, Azure Deployment & Documentation — End-to-end testing, Azure App Service deployment work, GitHub workflow, README, and project documentation.

Contribution note: The contribution split documents the team's project ownership and presentation responsibilities.

📌 Project Overview

Campus Placement Assistant is a web-based AI assistant designed to help students with campus-placement-related guidance in one conversational interface.

The prototype supports questions related to:

🏢 Companies and placement roles

✅ Eligibility checks using branch, CGPA, and backlog information

💻 Technical and soft-skill preparation

🎯 Interview preparation

🤖 Role-specific preparation such as Machine Learning and Software Development

💬 Multi-turn follow-up questions

The project demonstrates an end-to-end AI application built around a Microsoft Foundry Prompt Agent and a Foundry IQ knowledge base containing project-specific placement information.

⚠️ Important: The placement/company information in this prototype is synthetic demonstration data created for the project. It is not official university placement data, company hiring data, salary data, deadlines, or placement policy.

🎯 Problem Statement

Students often need placement information from multiple resources to understand:

Which companies and roles are relevant to them

Which branches are eligible

Minimum CGPA requirements

Backlog requirements

What skills to prepare

How to prepare for interviews and specific roles

This project provides a single conversational interface where students can ask placement-related questions and receive responses grounded in the project's knowledge base.

💡 Solution

The application combines a modern web frontend, a Python backend, a Microsoft Foundry AI agent, and a project-specific retrieval layer.

End-to-end architecture

flowchart LR
    A[Student] --> B[React / Vite Frontend]
    B --> C[FastAPI Backend]
    C --> D[Microsoft Foundry Prompt Agent]
    D --> E[Foundry IQ Knowledge Base]
    E --> F[Placement Knowledge Documents]
    F --> E
    E --> D
    D --> C
    C --> B
    B --> A

Request flow

A student enters a placement question in the React frontend.

The frontend sends the question to the FastAPI backend.

The backend sends the request to the Microsoft Foundry Prompt Agent.

The agent uses the connected Foundry IQ knowledge base when placement information is required.

Relevant information is retrieved from the project knowledge documents.

The agent generates a placement-focused response.

The response is returned through FastAPI to the frontend.

🧠 AI-103 Concepts Demonstrated

The official AI-103 guidelines list Campus Placement Assistant as a suggested project topic with Agent, RAG, and tools as the primary capabilities.

1. Agent

A Microsoft Foundry Prompt Agent acts as the central AI assistant.

It is configured with project-specific instructions so it can:

Stay focused on campus placement topics

Use the connected knowledge base as the primary source for placement information

Avoid inventing unsupported companies, roles, salaries, deadlines, or eligibility rules

Ask for missing eligibility information when needed

Handle short follow-up answers using conversation context

2. RAG / Knowledge Retrieval

The project uses a knowledge-retrieval workflow so the assistant can answer from the placement documents created for this prototype rather than relying only on general model knowledge.

This is useful because placement guidance needs to remain grounded in the information supplied to the application.

3. Application / API Integration

FastAPI provides the application layer between the web interface and the Foundry agent. This makes the AI capability available to the web application through backend APIs.

Important implementation note

The current prototype does not implement a separate custom Foundry agent tool/function. The main implemented workflow is:

Agent + RAG/knowledge retrieval + backend application integration

☁️ Microsoft Azure / Foundry Components

Component

Project usage

Why it is used

Microsoft Foundry

AI project and agent platform

Provides the environment for the AI agent workflow.

Foundry Prompt Agent

Campus-Placement-Assistant

Provides the placement-focused conversational AI behavior.

Foundry IQ

campus-placement-kb

Provides the project knowledge/retrieval layer.

Knowledge Source

campus-placement-files

Connects the placement documents to the knowledge base.

Embedding model

text-embedding-3-small

Supports semantic representation/retrieval of knowledge content.

Azure App Service

campus-placement-api-2026

Hosts the FastAPI backend in Azure.

Note: The AI-103 guidelines mention Azure AI Search as a possible component for this project type. Our current prototype uses Foundry IQ as the implemented knowledge/retrieval layer rather than a separately configured Azure AI Search resource.

📚 Knowledge Base / RAG Data

The knowledge source contains six Markdown documents prepared for this prototype:

File

Purpose

01_placement_overview.md

Placement overview and general guidance

02_sample_company_data.md

Synthetic company and role information

03_eligibility_rules.md

Branch, CGPA, and backlog rules

04_interview_preparation.md

Interview preparation guidance

05_role_guide.md

Role-specific preparation guidance

06_assistant_behavior.md

Assistant scope, behavior, and grounding rules

Example synthetic placement data

Company

Role

Eligible Branches

Minimum CGPA

Max Backlogs

TechNova

Software Developer

CSE, IT

7.0

0

DataSphere

Data Analyst

CSE, IT, AI

7.5

0

AIWorks

Machine Learning Engineer

CSE, AI

7.5

0

CloudCore

Cloud Engineer

CSE, IT

7.0

1

WebStack

Full Stack Developer

CSE, IT

6.5

0

SecureNet

Cybersecurity Analyst

CSE, IT

7.0

0

FinTechLab

Backend Developer

CSE, IT

7.5

0

These entries are demo/synthetic data and should not be treated as real recruitment information.

✨ Key Features

🏢 Company Search

Example:

What companies are available for CSE students?

✅ Eligibility Checking

The assistant can gather missing information across multiple messages and use the available rules.

Example:

Student: Check my eligibility.
Assistant: Please provide your CGPA, branch and backlog information.
Student: 7.2
Student: 0 backlogs
Student: CSE

🎯 Interview Preparation

How should I prepare for a software developer interview?

🤖 Role-Specific Preparation

How should I prepare for a machine learning role?

🧹 Clear History

The web application includes a Clear History action that calls the backend reset endpoint and starts a fresh conversation state.

🛡️ Placement-Focused Scope

The assistant is designed for campus-placement guidance. For unrelated topics, it should explain that the requested information is outside its provided placement knowledge and redirect the user toward placement-related assistance.

🧰 Technology Stack

Frontend

React

Vite

JavaScript / JSX

CSS

remark-gfm for GitHub-Flavored Markdown rendering

Backend

Python

FastAPI

Uvicorn

Pydantic

python-dotenv

azure-ai-projects

azure-identity

AI / Cloud

Microsoft Foundry

Microsoft Foundry Prompt Agent

Foundry IQ

text-embedding-3-small

Azure App Service

Development / Source Control

Git

GitHub

GitHub Actions deployment workflow

📁 Project Structure

AZURE/
├── BACKEND/
│   ├── main.py
│   ├── test_agent.py
│   ├── services/
│   │   └── agent_service.py
│   └── data/
│       ├── 01_placement_overview.md
│       ├── 02_sample_company_data.md
│       ├── 03_eligibility_rules.md
│       ├── 04_interview_preparation.md
│       ├── 05_role_guide.md
│       └── 06_assistant_behavior.md
├── FRONTEND/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
├── models/
├── services/
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
└── requirements.txt

Local .env files and Python virtual environments must remain outside the repository through .gitignore.

⚙️ Setup & Installation

Prerequisites

Python 3.x

Node.js and npm

Git

Access to the Microsoft Foundry project and configured agent

1. Clone the repository

git clone https://github.com/dilshand10/campus-placement-assistant.git
cd campus-placement-assistant

2. Create the Python virtual environment

python3 -m venv .venv
source .venv/bin/activate

3. Install backend dependencies

pip install -r requirements.txt

4. Configure environment variables

Create a local .env file in the project root:

FOUNDRY_PROJECT_ENDPOINT=<your-foundry-project-endpoint>
FOUNDRY_AGENT_NAME=Campus-Placement-Assistant

Do not commit .env or any secret values to GitHub.

5. Run the backend

From the project root:

uvicorn BACKEND.main:app --reload

Backend:

http://127.0.0.1:8000

API documentation:

http://127.0.0.1:8000/docs

6. Run the frontend

cd FRONTEND
npm install
npm run dev

The Vite development server normally runs on:

http://localhost:5173

For a deployed frontend, configure the backend URL with:

VITE_API_URL=<your-deployed-backend-url>

🔐 Security & Environment Variables

The project keeps Azure/Foundry configuration outside the source code wherever possible.

Never commit

API keys

passwords

tokens

connection strings

private credentials

Use instead

Environment variables

.env files excluded from Git

Azure App Service application settings for deployed configuration

The AI-103 guidelines explicitly require credentials to be kept out of the Git repository.

🧪 Testing & Results

The prototype was tested using representative placement scenarios.

Test

Expected / Observed behavior

Company search

Returns relevant synthetic company/role information from the knowledge base.

Eligibility input

Uses supplied branch, CGPA, and backlog information with the available rules.

Multi-turn follow-up

Short answers such as CSE can continue the previous eligibility conversation.

Interview preparation

Returns placement-focused interview guidance.

ML preparation

Returns role-specific preparation guidance.

Unrelated question

Redirects because the assistant is scoped to placement guidance.

Clear History

Resets the current conversation state.

Markdown/table output

Structured responses are rendered in the frontend.

Recommended demonstration queries

What companies are available for CSE students?

Check my eligibility.

7.2

0 backlogs

CSE

How should I prepare for a software developer interview?

How should I prepare for a machine learning role?

🛡️ Responsible AI & Grounding

The project considers reliability, transparency, security, privacy, fairness, and human oversight in the context of a placement-guidance prototype.

Grounding

The agent is instructed to use the connected placement knowledge base as the primary source for placement information.

Avoiding unsupported claims

The assistant should not invent:

Companies

Roles

Salaries

Deadlines

Openings

Eligibility criteria

University/company policies

When information is not available in the supplied placement data, the assistant should state that the information is unavailable rather than presenting unsupported details as facts.

Human verification

This prototype is a guidance and demonstration system. Students should verify real placement information with official university or company sources before making real-world decisions.

⚠️ Known Limitations

The knowledge base contains synthetic/demo placement information rather than live recruitment data.

Responses are limited by the information available in the connected knowledge base.

The prototype does not provide live job openings, live deadlines, or real-time recruitment updates.

A separate custom Foundry agent tool/function is not implemented in the current version.

Production features such as authentication, role-based access, analytics, and a live placement database are outside the current prototype scope.

Cloud deployment and shared links should be tested again immediately before final submission.

🚀 Future Improvements

Connect an authorized live/official placement data source

Add student authentication and personalized profiles

Add company/role filters

Add placement deadline and notification features

Add resume analysis and personalized preparation plans

Add interview simulation/coaching

Add analytics for frequently asked questions

Add additional custom tools where they provide a clear project benefit

Show clearer source references in the user interface

📚 Third-Party Resources & Acknowledgements

This project uses third-party software, SDKs, services, and development resources including:

React and Vite ecosystem packages

FastAPI, Uvicorn, Pydantic, and Python packages

Microsoft Azure / Foundry SDKs and services

remark-gfm for GitHub-Flavored Markdown rendering

GitHub and GitHub Actions

AI-assisted development tools used during implementation

Significant third-party resources are acknowledged as required for the academic project submission.

🎥 AI-103 5-Minute Video Structure

The project video should follow the structure specified in the AI-103 guidelines:

Section

Time

Content

Introduction

30 sec

Team, project title, use case

Problem Statement

30 sec

Problem being addressed

AI-Driven Solution

1 min

Solution approach and AI technologies

Technical Demonstration

2 min

Working prototype

Impact & Future Scope

1 min

Value, limitations, scalability, next steps

The video should be uploaded to YouTube and the accessible link submitted through the LMS project submission section.

🎬 Suggested Live Demo Flow

1. Introduce the application

Show the Campus Placement Assistant interface.

2. Demonstrate company search

What companies are available for CSE students?

3. Demonstrate eligibility

Check my eligibility.
7.2
0 backlogs
CSE

4. Demonstrate interview preparation

How should I prepare for a software developer interview?

5. Demonstrate role preparation

How should I prepare for a machine learning role?

6. Explain the architecture

React / Vite
      ↓
FastAPI
      ↓
Microsoft Foundry Agent
      ↓
Foundry IQ
      ↓
Placement Knowledge

7. Explain limitations and future scope

Mention that the current placement information is synthetic/demo data and explain future expansion plans.

✅ Final Submission Checklist

Working prototype / PoC is ready for demonstration

All 5 team member names are correct

GitHub repository is accessible

README and technical documentation are complete

Testing and results are documented

Third-party resources are acknowledged

No passwords, API keys, tokens, or credentials are exposed

5-minute video is finished and uploaded to YouTube

YouTube sharing permissions are tested

GitHub, Azure, and video links are tested

LMS Project Submission is completed before the deadline

📊 Project-to-Guideline Mapping

AI-103 requirement

Where this project addresses it

Working prototype / PoC

React frontend + FastAPI + Foundry Agent + Foundry IQ workflow

Problem & solution

Problem Statement + Solution sections

Architecture / data flow

Architecture diagram + Request Flow

AI services / models

Microsoft Foundry, Foundry IQ, text-embedding-3-small

Setup instructions

Setup & Installation section

Testing & results

Testing & Results section

Limitations

Known Limitations section

Future improvements

Future Improvements section

Team members

Team Members section

Third-party acknowledgement

Third-Party Resources section

5-minute video

AI-103 5-Minute Video Structure

📌 Project Status

Area

Status

Project prototype

Built

React/Vite frontend

Implemented

FastAPI backend

Implemented

Microsoft Foundry Agent

Configured

Foundry IQ knowledge base

Configured

Placement knowledge documents

Prepared

GitHub repository

Available

README documentation

Completed

Azure backend deployment

Configured / requires final live verification

5-minute YouTube video

To be recorded and submitted

Final LMS submission

Pending

<div align="center">

Campus Placement Assistant
AI-103 Academic Group Project

</div>