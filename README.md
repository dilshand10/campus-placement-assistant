Campus Placement Assistant

An AI-powered campus placement guidance assistant built as an AI-103 group project. The application helps students find placement-related information such as available companies, roles, eligibility requirements, interview preparation, and role-specific preparation guidance.

Important: The placement/company data in this prototype is synthetic/demo data created for the project. It is not official university placement data, company hiring data, salary data, deadlines, or placement policy.

Team Members & Contributions

Member

Primary Contribution

Gursharan

Frontend & User Experience — React/Vite interface, chat UI, quick questions, Markdown/table rendering, Clear History interaction

Rudraksh

Backend & API Integration — FastAPI backend, /chat and /reset endpoints, frontend-to-agent communication, configuration handling

Muskan

Microsoft Foundry Agent — Prompt Agent setup, placement-focused instructions, response behavior, grounding/scope rules, conversation handling

Denish

Foundry IQ / RAG — knowledge-base preparation, knowledge source, six Markdown documents, embeddings/retrieval, RAG testing

Dilshan

Testing, Azure Deployment & Documentation — end-to-end testing, Azure App Service deployment work, GitHub/repository workflow, README and project documentation

The contribution division above is the team's project-ownership/presentation split for submission documentation.

1. Project Overview

Campus Placement Assistant is a web-based AI assistant designed to give students a single place to ask placement-related questions.

The assistant is focused on:

Company and role discovery

Branch and CGPA eligibility checks

Backlog-related eligibility questions

Interview preparation

Role-specific preparation, including software and machine-learning roles

Placement-related technical and soft-skill guidance

The project demonstrates how a web application can be connected to a Microsoft Foundry Prompt Agent and a project-specific knowledge base using a Retrieval-Augmented Generation (RAG) workflow.

2. Problem Statement

Students often need to search through multiple placement resources to understand:

Which companies/roles are available

Which branches are eligible

Minimum CGPA requirements

Backlog requirements

What to prepare for different placement roles

How to prepare for interviews

This project addresses that problem by providing a focused conversational assistant that can retrieve relevant placement information and answer questions through a simple web interface.

3. Solution Overview

The solution combines a frontend, backend API, Microsoft Foundry Agent, and Foundry IQ knowledge layer.

High-level flow

Student
  ↓
React / Vite Frontend
  ↓
FastAPI Backend
  ↓
Microsoft Foundry Prompt Agent
  ↓
Foundry IQ Knowledge Base
  ↓
Placement Knowledge Documents
  ↓
Grounded AI Response
  ↓
Frontend Chat Interface

The agent is instructed to stay within the campus-placement domain, use the connected knowledge base as the primary source, avoid inventing unsupported placement information, and ask for missing eligibility details when required.

4. AI-103 Concepts Demonstrated

The project is based on the Campus Placement Assistant topic listed in the AI-103 project guidelines. The guideline associates this topic with Agent, RAG, and tools, and lists Microsoft Foundry, Foundry IQ, and AI Search as possible Azure/Foundry components.

Agent

A Microsoft Foundry Prompt Agent is used as the central AI assistant. It receives the user's request, follows project-specific instructions, and generates the response.

RAG / Knowledge Retrieval

The assistant uses a project-specific knowledge base so that placement answers can be grounded in the supplied placement documents instead of depending only on general model knowledge.

Application/API Integration

The FastAPI backend provides the application integration layer between the React frontend and the Foundry agent.

Important implementation note

The current prototype does not implement a separate custom Foundry agent tool/function. The main AI workflow demonstrated in the prototype is Agent + RAG/knowledge retrieval + backend application integration.

5. Microsoft Azure / Foundry Services Used

Microsoft Foundry

Used to create and manage the project and Prompt Agent.

Agent: Campus-Placement-Assistant

Foundry IQ

Used as the knowledge/retrieval layer for the placement information.

Knowledge Base: campus-placement-kb

Knowledge Source: campus-placement-files

Embeddings

The knowledge base uses:

text-embedding-3-small

Embeddings help represent document content for semantic retrieval so relevant placement information can be found for a user's question.

Azure App Service

The FastAPI backend is configured for deployment to Azure App Service.

App Service: campus-placement-api-2026

Azure deployment should be live-tested before the final LMS submission so that the submitted project link/demo reflects the final working state.

6. Knowledge Base / RAG Data

The knowledge source contains six Markdown documents prepared specifically for the prototype:

01_placement_overview.md
02_sample_company_data.md
03_eligibility_rules.md
04_interview_preparation.md
05_role_guide.md
06_assistant_behavior.md

What the documents cover

File

Purpose

01_placement_overview.md

Placement overview and general guidance

02_sample_company_data.md

Synthetic company/role information

03_eligibility_rules.md

Branch, CGPA and backlog rules used by the prototype

04_interview_preparation.md

Interview preparation guidance

05_role_guide.md

Role-specific preparation guidance

06_assistant_behavior.md

Scope, response behavior and grounding rules

7. Example Synthetic Company Data

The prototype knowledge base contains example companies and roles for demonstration purposes.

Company

Example Role

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

These entries are demo data, not official recruitment information.

8. Key Features

Company Search

Students can ask questions such as:

What companies are available for CSE students?

Eligibility Checking

The assistant can ask for missing information and use the available placement rules to evaluate eligibility.

Example conversation:

Student: Check my eligibility.
Assistant: Please provide your CGPA, branch and backlog information.
Student: 7.2
Student: 0 backlogs
Student: CSE

The conversation is designed to preserve context so short follow-up answers such as CSE can be understood in relation to the previous eligibility request.

Interview Preparation

How should I prepare for a software developer interview?

Role Preparation

How should I prepare for a machine learning role?

Clear History

The frontend provides a Clear History action that calls the backend reset endpoint and starts a fresh conversation state.

Scope Control

The assistant is designed specifically for campus-placement guidance. For unrelated questions, it should explain that the requested topic is outside its provided placement knowledge and redirect the user toward placement-related assistance.

9. Technology Stack

Frontend

React

Vite

JavaScript / JSX

CSS

remark-gfm for Markdown/GitHub-Flavored Markdown rendering

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

Source Control

Git

GitHub

GitHub Actions for deployment workflow

10. Project Structure

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
│   ├── public/
│   └── package.json
├── models/
├── services/
├── .env
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
└── requirements.txt

Local .env files and virtual environments should not be committed to GitHub.

11. Setup Instructions

Prerequisites

Python 3.x

Node.js and npm

A Microsoft Azure / Foundry project with access to the configured agent

Git

Clone the repository

git clone <YOUR_GITHUB_REPOSITORY_URL>
cd azure

Backend setup

Create and activate a Python virtual environment:

python3 -m venv .venv
source .venv/bin/activate

Install dependencies:

pip install -r requirements.txt

Backend environment variables

Create a local .env file using the required configuration values:

FOUNDRY_PROJECT_ENDPOINT=<your-foundry-project-endpoint>
FOUNDRY_AGENT_NAME=Campus-Placement-Assistant

Do not commit this file or any credentials to GitHub.

Run the backend

From the project root:

source .venv/bin/activate
uvicorn BACKEND.main:app --reload

Backend URL:

http://127.0.0.1:8000

Swagger API documentation:

http://127.0.0.1:8000/docs

Frontend setup

cd FRONTEND
npm install
npm run dev

The frontend normally runs on:

http://localhost:5173

For a deployed frontend, configure the backend URL using a Vite environment variable such as:

VITE_API_URL=<your-deployed-backend-url>

12. Environment Variables & Security

The application uses environment variables for Azure/Foundry configuration.

Required backend variables:

FOUNDRY_PROJECT_ENDPOINT
FOUNDRY_AGENT_NAME

Frontend deployment configuration:

VITE_API_URL

Security rules

Never commit:

passwords

API keys

tokens

connection strings

private credentials

The AI-103 project guidelines explicitly require credentials to be kept out of the Git repository and recommend environment variables or excluded configuration files.

13. Testing & Results

The project was tested using representative placement scenarios.

Test Case

Expected Result

Company search for CSE

Returns relevant synthetic companies/roles from the knowledge base

Eligibility with CGPA, branch and backlog data

Uses the provided placement rules and gives a grounded response

Multi-turn eligibility follow-up

Short answers such as CSE can continue the earlier eligibility conversation

Interview preparation

Provides placement-focused preparation guidance

Machine-learning preparation

Provides role-specific preparation guidance

Unrelated question

Redirects the user because the assistant is scoped to placement guidance

Clear History

Clears the conversation state and starts a fresh conversation

Markdown/table response

Displays structured placement information in the frontend

Example test queries

What companies are available for CSE students?

Check my eligibility.

CGPA 7.2

0 backlogs

CSE

How should I prepare for a software developer interview?

How should I prepare for a machine learning role?

14. Responsible AI, Safety & Grounding

The project follows the responsible-AI expectations in the AI-103 guidelines by considering transparency, reliability, privacy/security, fairness, and human oversight.

Grounded responses

The agent is instructed to use the connected placement knowledge base as the primary source for placement information.

No unsupported placement claims

The assistant should not invent:

companies

roles

salaries

deadlines

openings

eligibility criteria

university/company policies

When required information is not available in the supplied placement data, the assistant should say that the information is not available rather than presenting unsupported details as facts.

Domain restriction

The assistant is intended for campus placement guidance. Unrelated requests are redirected rather than answered as though they were placement knowledge.

Human oversight

The assistant is a guidance/decision-support prototype. Students should verify any real placement information with official university/company sources before making real-world decisions.

15. Known Limitations

The knowledge base uses synthetic/demo placement information rather than live university/company hiring data.

The assistant is limited to the information available in the connected knowledge base.

The current prototype does not provide live job openings, live deadlines, or real-time company recruitment updates.

The current implementation does not include a separate custom Foundry agent tool/function.

Production features such as student authentication, role-based access, analytics, and a live placement database are outside the current prototype scope.

Azure deployment and frontend hosting should be re-verified immediately before final submission so that all shared links point to the final working version.

16. Future Improvements

Possible future improvements include:

Connect to an official/live placement database when an authorized data source is available

Add student authentication and personalized profiles

Add placement notifications and deadline reminders

Add company filters by role, branch, CGPA, and skills

Add resume analysis and personalized preparation plans

Add interview simulation

Add analytics for commonly asked placement questions

Add additional Azure AI capabilities or custom tools where appropriate

Improve source visibility/citations in the user interface

17. Third-Party Resources / Acknowledgements

This project uses third-party software, SDKs, and AI-assisted development resources, including:

React and Vite ecosystem packages

FastAPI, Uvicorn, Pydantic, and Python packages

Azure AI / Microsoft Foundry SDKs and services

remark-gfm for GitHub-Flavored Markdown rendering

GitHub and GitHub Actions

AI-assisted development tools used during implementation

The team is responsible for understanding and being able to explain the submitted code and project workflow.

18. AI-103 Submission Mapping

The project is structured to satisfy the three required submission deliverables in the AI-103 guidelines.

A. Working Prototype / PoC

The prototype demonstrates:

the campus-placement problem

an AI-based solution

Agent + RAG/knowledge retrieval

a technical workflow that can be demonstrated live

B. GitHub Repository

This repository contains:

source code

README documentation

architecture/data-flow description

technology and AI-service details

setup instructions

testing/results

limitations and future improvements

team members and contributions

third-party acknowledgements

C. 5-Minute Video

The project video should be no more than 5 minutes and follow the guideline structure:

Introduction        30 sec
Problem statement   30 sec
AI-driven solution  1 min
Technical demo      2 min
Impact/future       1 min

Upload the video to YouTube and verify that the submitted link is accessible before adding it to the LMS submission.

19. Suggested Demo Flow

A concise live demo can follow this order:

Step 1 — Introduce

Show the Campus Placement Assistant interface and explain the use case.

Step 2 — Company Search

What companies are available for CSE students?

Step 3 — Eligibility

Check my eligibility.
7.2
0 backlogs
CSE

Step 4 — Interview Preparation

How should I prepare for a software developer interview?

Step 5 — Role Preparation

How should I prepare for a machine learning role?

Step 6 — Explain Architecture

Explain:

React/Vite
    ↓
FastAPI
    ↓
Foundry Agent
    ↓
Foundry IQ
    ↓
Placement Knowledge

Step 7 — Explain Limitations / Future Scope

Mention that the current dataset is synthetic/demo data and explain the future improvements.

20. Final Submission Checklist

Before submitting the project, verify all of the following:

Working prototype / PoC is ready

Team member names are correct

GitHub repository is accessible

README and technical documentation are complete

Third-party resources are acknowledged

No passwords, API keys, tokens, or credentials are exposed

Testing and results are documented

5-minute video is finished and uploaded to YouTube

YouTube sharing permissions work

All GitHub/Azure/video links have been tested

LMS Project Submission is completed before the deadline

21. Project Status

Project: Campus Placement Assistant
AI-103 Topic: Campus Placement Assistant
Primary concepts: Agent, RAG/knowledge retrieval, application/API integration
Primary AI platform: Microsoft Foundry
Knowledge layer: Foundry IQ
Backend: FastAPI
Frontend: React/Vite
Cloud backend: Azure App Service

License

This project was created as an academic AI-103 group project for demonstration and educational purposes.