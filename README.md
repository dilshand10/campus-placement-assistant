# 🎓 Campus Placement Assistant

An AI-powered campus placement assistant that helps students explore placement opportunities, check eligibility, and prepare for technical interviews.

## 📌 Project Overview

Campus Placement Assistant is an AI-based application built using Microsoft Azure AI services.

The application allows students to:

- 🏢 Explore companies and placement roles
- ✅ Check eligibility based on branch, CGPA, and backlogs
- 🎯 Get interview preparation guidance
- 🤖 Get Machine Learning preparation guidance
- 💬 Ask follow-up questions using conversational context

The project demonstrates the use of **AI Agent + RAG + Knowledge Base** architecture.

> **Note:** The company names, eligibility criteria, roles, and placement information used in this prototype are synthetic demonstration data and are not official university or company placement information.

---

## 🎯 Problem Statement

Students often need to search through different placement documents to find:

- Which companies are available
- Which branches are eligible
- Minimum CGPA requirements
- Backlog requirements
- Required technical skills
- Interview preparation topics
- Role-specific preparation guidance

The Campus Placement Assistant provides a conversational interface where students can ask these questions in natural language.

---

## 🚀 Features

### 🏢 Company Search

Students can ask questions such as:

> What companies are available for CSE students?

The assistant retrieves relevant placement information from the connected knowledge base.

### ✅ Eligibility Checker

Students can provide:

- Branch
- CGPA
- Number of backlogs

Example:

> Am I eligible for TechNova if my CGPA is 7.2 and I have 0 backlogs?

The assistant checks the documented criteria and explains the result.

### 🎯 Interview Preparation

Students can ask for interview preparation guidance for different placement roles.

Example:

> How should I prepare for a software developer interview?

### 🤖 Machine Learning Preparation

Students can ask for preparation guidance related to Machine Learning roles.

Example:

> How should I prepare for an ML Engineer role?

### 💬 Conversational Context

The assistant can handle follow-up questions.

Example:

**Student:**
> Am I eligible for TechNova if my CGPA is 7.2 and I have 0 backlogs?

**Assistant:**
> Please provide your branch.

**Student:**
> CSE

The assistant uses the previous conversation context to complete the eligibility check.

---

# 🏗️ System Architecture

```text
┌─────────────────────────────┐
│       React Frontend        │
│                             │
│  Chat UI + Quick Questions  │
└──────────────┬──────────────┘
               │
               │ HTTP / REST
               ▼
┌─────────────────────────────┐
│       FastAPI Backend       │
│                             │
│          /chat              │
└──────────────┬──────────────┘
               │
               │ Azure AI SDK
               ▼
┌─────────────────────────────┐
│     Microsoft Foundry       │
│                             │
│   Campus Placement Agent    │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│        Foundry IQ           │
│     Knowledge Base          │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   Campus Placement Files    │
│                             │
│   Markdown Knowledge Data   │
└─────────────────────────────┘