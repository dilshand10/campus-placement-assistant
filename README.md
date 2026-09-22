🎓 Campus Placement Assistant

AI-powered placement guidance assistant built as an AI-103 group project using Microsoft Foundry and Foundry IQ.

Campus Placement Assistant is a web-based AI assistant designed to help students access placement-related guidance from a single conversational interface. The prototype focuses on common campus-placement questions such as available companies, roles, eligibility criteria, interview preparation, and role-specific preparation.

The system combines a React/Vite frontend, a FastAPI backend, a Microsoft Foundry Prompt Agent, and a Foundry IQ knowledge base containing project-specific placement information.

Data notice: The placement and company information used in this prototype is synthetic/demo data created for the project. It is not official university placement data, company hiring data, salary information, deadlines, or placement policy.

📌 Project Information

Item

Details

Project Title

Campus Placement Assistant

Project Type

AI-103 Group Project / Working Prototype

Primary AI Concepts

Agent, RAG / Knowledge Retrieval

Primary Azure Platform

Microsoft Foundry

Knowledge Layer

Foundry IQ

Frontend

React + Vite

Backend

Python + FastAPI

Repository

dilshand10/campus-placement-assistant

Data

Synthetic / demo placement knowledge

👥 Team Members & Contributions

Member

Primary Contribution

Gursharan

Frontend & User Experience — React/Vite interface, chat UI, quick questions, Markdown/table rendering, Clear History interaction

Rudraksh

Backend & API Integration — FastAPI application, /chat and /reset endpoints, frontend-to-agent communication, configuration handling

Muskan

Microsoft Foundry Agent — Prompt Agent setup, placement-focused instructions, response behavior, grounding and scope rules, conversational behavior

Denish

Foundry IQ / RAG — knowledge-base preparation, placement documents, knowledge source setup, retrieval testing and grounding workflow

Dilshan

Testing, Azure Deployment & Documentation — end-to-end testing, Azure App Service deployment work, GitHub/README documentation and project coordination

Contributions are organized by primary responsibility; the project was developed collaboratively as a team.

🧩 Problem Statement

Students often need placement information in several different forms:

Which companies or roles are available?

Which branches are eligible?

What minimum CGPA is required?

How many backlogs are allowed?

How should a student prepare for interviews?

What skills are relevant for a particular placement role?

Finding and interpreting this information can be time-consuming when it is spread across different documents or sources.

The goal of this project is to provide a single conversational interface through which a student can ask placement-related questions and receive answers grounded in the project's placement knowledge base.

💡 Solution Overview

Campus Placement Assistant uses a conversational AI architecture to connect the student interface with a placement-focused AI agent and a project-specific knowledge base.

The assistant is instructed to stay within the placement domain and use the connected knowledge source as the primary basis for placement answers. It is also instructed not to invent companies, roles, eligibility rules, salaries, deadlines, or other unsupported placement facts.

For follow-up questions, the backend maintains a conversation so short responses such as CSE, 7.2, or 0 backlogs can be interpreted in the context of the previous question.

🏗️ System Architecture

flowchart LR
    A[Student] --> B[React / Vite Frontend]
    B --> C[FastAPI Backend]
    C --> D[Microsoft Foundry Prompt Agent]
    D --> E[Foundry IQ Knowledge Base]
    E --> F[Placement Knowledge Documents]
    D --> C
    C --> B
    B --> A

Request Flow

A student enters a placement-related question in the web interface.

React sends the request to the FastAPI backend.

FastAPI forwards the question to the configured Microsoft Foundry agent.

The agent uses its placement-focused instructions and connected Foundry IQ knowledge source.

Relevant project knowledge is retrieved to ground the response.

The response is returned through FastAPI to the frontend.

The frontend displays the answer in the chat interface.

🤖 AI-103 Concepts Demonstrated

1. AI Agent

The project uses a Microsoft Foundry Prompt Agent named:

Campus-Placement-Assistant

The agent provides the conversational behavior and placement-specific reasoning layer. Its instructions define the assistant's role, supported topics, response boundaries, grounding behavior, and handling of missing information.

Why use an Agent?

A placement assistant needs more than a simple text-generation response. The agent allows the project to define a consistent role and controlled behavior for placement questions.

2. RAG / Knowledge Retrieval

The project uses Foundry IQ to connect the agent with project-specific placement knowledge.

Why use RAG?

A general-purpose language model may not know the specific placement information prepared for this prototype. Retrieval allows the assistant to use the project's own documents as contextual knowledge when answering placement questions.

This helps the prototype stay grounded in its supplied information instead of relying only on general model knowledge.

3. Application Integration

The project uses FastAPI as the server-side integration layer between the frontend and the Microsoft Foundry agent.

The AI-103 project guideline lists Campus Placement Assistant under the capabilities of Agent, RAG, and tools. In this prototype, the main demonstrated AI capabilities are the Agent and RAG/knowledge workflow, while FastAPI provides the application integration layer. A separate custom Foundry agent tool is not exposed as a standalone component in the current prototype.

☁️ Microsoft Azure / Foundry Components Used

Microsoft Foundry

Used as the Azure environment for creating and managing the project and AI agent.

Foundry Prompt Agent

Agent name: Campus-Placement-Assistant

Used for:

placement-focused conversational responses

scope control

grounding instructions

contextual follow-up handling

responsible response behavior

Foundry IQ

Knowledge Base: campus-placement-kb
Knowledge Source: campus-placement-files

Used to provide the agent with project-specific placement knowledge.

Embedding Model

The knowledge workflow uses:

text-embedding-3-small

for embedding the knowledge content used by the retrieval workflow.

Azure App Service

The FastAPI backend is configured for deployment as a web application on Azure App Service.

📚 Knowledge Base

The prototype uses six Markdown documents as its placement knowledge source:

01_placement_overview.md
02_sample_company_data.md
03_eligibility_rules.md
04_interview_preparation.md
05_role_guide.md
06_assistant_behavior.md

Knowledge Coverage

Document

Purpose

01_placement_overview.md

General placement guidance and scope

02_sample_company_data.md

Synthetic company, role and eligibility examples

03_eligibility_rules.md

CGPA, branch and backlog-related demo rules

04_interview_preparation.md

Interview and preparation guidance

05_role_guide.md

Role-specific preparation and skill guidance

06_assistant_behavior.md

Scope, response and safety behavior

🔎 Example Placement Scenarios

The assistant can be demonstrated with queries such as:

Company Discovery

What companies are available for CSE students?

Eligibility Checking

Check my eligibility.
CGPA: 7.2
Backlogs: 0
Branch: CSE

Interview Preparation

How should I prepare for a software developer interview?

Role-Specific Preparation

How should I prepare for a machine learning role?

Conversational Follow-Up

User: Check my eligibility.
Assistant: Please provide your branch, CGPA and backlog information.
User: CSE
User: 7.2
User: 0 backlogs

The backend maintains conversation context so the follow-up information can be interpreted as part of the same interaction.

🖥️ Frontend

The frontend is built with React and Vite.

Main UI Features

conversational chat interface

user and assistant message separation

quick-question buttons

Markdown response rendering

table rendering for structured placement information

Clear History control

backend API integration

placement-focused interface wording

⚙️ Backend

The backend is built with Python and FastAPI.

Main Responsibilities

expose the /chat API

send user requests to the Foundry agent

maintain conversation context

expose /reset to clear conversation state

provide a bridge between the frontend and Azure AI services

read configuration from environment variables

Main API Endpoints

Endpoint

Method

Purpose

/

GET

Basic backend/service response

/chat

POST

Send a user message to the AI agent

/reset

POST

Clear the current conversation

/docs

GET

FastAPI interactive API documentation

📁 Project Structure

campus-placement-assistant/
│
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
│
├── FRONTEND/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
├── .env
├── .gitignore
├── requirements.txt
├── README.md
└── package.json

The exact local tree may evolve as the project is maintained. The structure above represents the main application components used by the prototype.

🛠️ Technology Stack

Layer

Technology

Frontend

React, Vite

Backend

Python, FastAPI

AI Platform

Microsoft Foundry

AI Agent

Microsoft Foundry Prompt Agent

Knowledge / RAG

Foundry IQ

Embeddings

text-embedding-3-small

Cloud Hosting

Azure App Service

Version Control

Git + GitHub

🚀 Local Setup

Prerequisites

Make sure the following are available:

Python 3.x

Node.js and npm

Git

An Azure account with access to the required Foundry project/AI services

1. Clone the Repository

git clone https://github.com/dilshand10/campus-placement-assistant.git
cd campus-placement-assistant

2. Create and Activate the Python Virtual Environment

python3 -m venv .venv
source .venv/bin/activate

On Windows, use the equivalent activation command for PowerShell or Command Prompt.

3. Install Backend Dependencies

pip install -r requirements.txt

The backend requirements include FastAPI, Uvicorn, Pydantic, dotenv support, Azure AI Projects, and Azure Identity dependencies required by the application.

4. Configure Environment Variables

Create a local .env file and provide the required configuration values:

FOUNDRY_PROJECT_ENDPOINT=<your-foundry-project-endpoint>
FOUNDRY_AGENT_NAME=Campus-Placement-Assistant

Do not commit real secrets, tokens, connection strings or other credentials to GitHub.

5. Start the Backend

From the project root:

source .venv/bin/activate
uvicorn BACKEND.main:app --reload

The local backend is normally available at:

http://127.0.0.1:8000

Interactive API documentation:

http://127.0.0.1:8000/docs

6. Start the Frontend

Open another terminal:

cd FRONTEND
npm install
npm run dev

Open the Vite URL shown in the terminal, usually similar to:

http://localhost:5173

For a deployed frontend, configure VITE_API_URL to point to the deployed backend instead of the local FastAPI URL.

🔐 Configuration & Security

The project uses environment variables for configuration rather than storing credentials in source code.

The repository should never contain:

passwords

API keys

access tokens

connection strings

other private credentials

The .gitignore file is used to exclude local environment files and generated/development artifacts from Git tracking.

🧪 Testing & Results

The prototype should be tested across the main intended user flows.

Test Scenario

Expected Result

Company search

Returns relevant company/role information from the supplied placement knowledge

Eligibility with complete inputs

Uses the available demo eligibility rules to provide a grounded response

Eligibility with missing inputs

Requests only the missing information needed to continue

Follow-up response such as CSE

Interprets the short response using conversation context

Interview preparation

Returns placement-focused interview guidance

Role-specific preparation

Returns guidance related to the selected role

Unrelated topic

Explains that the assistant is focused on campus placement guidance and redirects the user

Clear History

Resets the current conversation state

Backend API

Returns a successful response when the service and Foundry configuration are available

Testing Focus

Testing should cover:

Functional correctness — the requested feature works.

Grounding — placement answers are based on the supplied project knowledge.

Conversation context — follow-up inputs work correctly.

Reliability — backend/frontend communication functions as expected.

Scope control — unrelated questions are not answered as though they were placement facts.

🧭 Responsible AI

The assistant is intentionally constrained to a defined placement use case.

Grounded Responses

The knowledge base is used as the primary source for placement-specific information.

No Unsupported Placement Claims

The assistant should not invent:

companies

roles

salaries

deadlines

eligibility requirements

university policies

hiring decisions

Transparency

The project clearly identifies its company and placement information as synthetic/demo data.

Scope Control

For unrelated requests, the assistant redirects the conversation back to campus-placement topics rather than presenting unsupported information as project knowledge.

Human Oversight

The assistant is a guidance prototype. Students should verify real placement information with the appropriate official university/company source before making decisions.

⚠️ Known Limitations

Synthetic knowledge — the company and placement information is demo data and is not live university/company data.

Limited knowledge coverage — the quality of answers depends on the documents supplied to the knowledge base.

No live job/placement feed — the current prototype does not connect to a live placement-management system.

No student authentication — the prototype is designed as a demonstration application rather than a complete student identity platform.

Prototype-scale deployment — production-level monitoring, authentication, database integration and large-scale operational controls are outside the current scope.

🔮 Future Improvements

Possible next steps include:

connect to an approved/live placement information source

add authenticated student profiles

integrate a structured placement database

expand company and role coverage

provide richer eligibility explanations

add application/deadline reminders

add analytics for frequently asked placement questions

introduce additional tools or integrations where appropriate

add stronger production monitoring and access controls

📦 Third-Party Resources & Acknowledgements

The project uses open-source libraries and Microsoft/Azure SDKs as part of its implementation. Significant third-party resources should be acknowledged as required by the AI-103 project guidelines.

Examples used by the project include:

React

Vite

FastAPI

Pydantic

Uvicorn

python-dotenv

azure-ai-projects

azure-identity

remark-gfm

Microsoft Foundry services and documentation

The project team is responsible for ensuring that any additional external datasets, code, libraries, assets or resources added later are also acknowledged appropriately.

🎥 AI-103 Demonstration & Video Plan

The AI-103 guideline recommends a 5-minute structure containing:

Section

Target Time

Introduction

30 sec

Problem Statement

30 sec

AI-Driven Solution

1 min

Technical Demonstration

2 min

Impact & Future Scope

1 min

For the live demonstration, the team can show:

The Campus Placement Assistant interface.

Company search for a branch such as CSE.

Eligibility checking with CGPA/backlog/branch information.

Interview or role-specific preparation.

The architecture: React → FastAPI → Foundry Agent → Foundry IQ → knowledge.

The GitHub repository and project documentation.

✅ AI-103 Submission Checklist

Before submission, verify that the project has:

Working prototype / PoC ready for demonstration

Correct five-member team information

Accessible GitHub repository

Complete README.md

Testing and results documented

Known limitations and future improvements documented

Third-party resources acknowledged

No passwords, API keys, tokens or credentials exposed

5-minute video recorded and uploaded to YouTube

YouTube sharing permissions tested

GitHub link tested

Submission completed through the LMS before the deadline

🎤 Viva Preparation

Every team member should be able to answer these four questions clearly:

What problem did we solve?

We created a conversational assistant for campus-placement information and preparation guidance.

What did we build?

A React/Vite web application connected through FastAPI to a Microsoft Foundry placement agent grounded by Foundry IQ knowledge.

How did we apply AI-103 learning?

We applied an AI agent and RAG/knowledge retrieval workflow using Microsoft Foundry and Foundry IQ, integrated into a working application.

Can we demonstrate that it works?

Yes. The team should demonstrate the frontend, backend/API flow, agent interaction, knowledge-grounded responses, conversational follow-ups, and reset functionality.

📖 Project Scope

In Scope

campus placement guidance

company and role discovery from supplied demo data

eligibility guidance based on supplied rules

interview preparation

role-specific preparation

conversational follow-up questions

grounded knowledge retrieval

Out of Scope

official university placement decisions

guaranteed eligibility or selection outcomes

live recruitment decisions

salary guarantees

unsupported company or vacancy claims

general-purpose unrestricted AI assistance

📜 License / Academic Use

This repository is developed as an academic project for the AI-103 Group Project at Chitkara University. The repository contains prototype code and synthetic/demo placement information for educational demonstration purposes.

⭐ Summary

Campus Placement Assistant demonstrates how a focused AI agent can be integrated into a web application and grounded with project-specific knowledge using Microsoft Foundry and Foundry IQ.

The project combines:

Agent + RAG / Knowledge Retrieval + Application Integration

to provide a practical, explainable campus-placement assistance workflow suitable for an AI-103 working prototype.