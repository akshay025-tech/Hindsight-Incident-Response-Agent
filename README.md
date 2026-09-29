# 🚨 Incident Response Agent

> **"Don't just respond to incidents. Learn from them, remember them, and improve the next response."**

An **AI-assisted Incident Response Agent** designed to help engineering teams investigate incidents, identify possible root causes, recall similar historical incidents, generate response recommendations, involve humans in critical decisions, and document incidents through automated postmortems.

The project combines a **React/Vite frontend**, **FastAPI backend**, agent-based incident analysis, runbook-driven recommendations, and a Hindsight-inspired memory layer for retaining and recalling incident knowledge.

---

## 🎯 Project Overview

Production incidents require engineers to quickly answer several questions:

* What happened?
* Which service is affected?
* What could be causing the incident?
* Have we experienced something similar before?
* What actions should be taken?
* Should the recommended action be approved?
* What should be documented after resolution?
* How can knowledge from this incident help with future incidents?

The **Incident Response Agent** brings these activities into a single incident-response workflow.

Instead of treating every incident as a completely new problem, the system uses historical incident knowledge to assist investigation and generate more informed recommendations.

---

# 🔄 Core Incident Response Loop

The central workflow of the system is:

```text
                 INCIDENT / ALERT
                        │
                        ▼
                INCIDENT INGESTION
                        │
                        ▼
                ALERT NORMALIZATION
                        │
                        ▼
                  INVESTIGATION
                        │
                        ▼
                MEMORY RECALL
                        │
                        ▼
              HYPOTHESIS GENERATION
                        │
                        ▼
                CONFIDENCE SCORING
                        │
                        ▼
              EVIDENCE + RUNBOOKS
                        │
                        ▼
             ACTION RECOMMENDATION
                        │
                        ▼
                 HUMAN APPROVAL
                    /        \
               APPROVE       REJECT
                  │             │
                  ▼             ▼
            RESPONSE         REVIEW
                  │
                  ▼
               RESOLUTION
                  │
                  ▼
              POSTMORTEM
                  │
                  ▼
            RETAIN KNOWLEDGE
                  │
                  └──────────────► FUTURE INCIDENTS
```

The goal is to create a continuous learning loop:

```text
INCIDENT
   ↓
INVESTIGATE
   ↓
RESPOND
   ↓
DOCUMENT
   ↓
REMEMBER
   ↓
USE KNOWLEDGE IN FUTURE INCIDENTS
```

---

# 🧠 Why Memory Matters

Incident response becomes more effective when previous incidents can be reused as operational knowledge.

For example:

```text
Previous Incident
    │
    ├── Service: API Gateway
    ├── Problem: High CPU
    ├── Root Cause: Memory Leak
    ├── Resolution: Restart + investigate deployment
    └── Evidence
            │
            ▼
       Stored Memory
            │
            ▼
Future High CPU Incident
            │
            ▼
       Memory Recall
            │
            ▼
Historical Incident
            │
            ▼
Better Investigation
```

The project contains a dedicated hindsight/memory layer:

```text
backend/hindsight/
├── client.py
├── recall.py
├── reflect.py
└── retain.py
```

This separates memory operations from the rest of the incident-response system.

---

# 🏗️ Architecture

```text
┌───────────────────────────────────────────────┐
│                  React Frontend               │
│                    + Vite                     │
│                                               │
│  Dashboard                                    │
│  Incident Workspace                           │
│  Hypotheses                                   │
│  Evidence                                     │
│  Recommendations                              │
│  Approval                                     │
│  Memory                                       │
│  Postmortem                                   │
└───────────────────────┬───────────────────────┘
                        │
                        │ REST API
                        ▼
┌───────────────────────────────────────────────┐
│                 FastAPI Backend               │
│                                               │
│  ┌───────────────┐    ┌───────────────────┐  │
│  │ Incident APIs │    │    Agent System   │  │
│  └───────┬───────┘    └─────────┬─────────┘  │
│          │                      │             │
│          │              ┌───────┴────────┐    │
│          │              │                │    │
│          │              ▼                ▼    │
│          │       Hypothesis Engine   Recommendation│
│          │                          Engine       │
│          │                                       │
│          ▼                                       │
│  ┌─────────────────┐                             │
│  │ Incident Data   │                             │
│  └─────────────────┘                             │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │             Hindsight Layer               │  │
│  │                                           │  │
│  │ Recall │ Retain │ Reflect │ Client        │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │              Postmortem System             │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

# 🤖 Agent Architecture

The backend separates incident intelligence into multiple components.

```text
backend/agents/

├── incident_agent.py
│       │
│       ├── Coordinates investigation
│       ├── Uses memory
│       └── Produces incident analysis
│
├── hypothesis_engine.py
│       │
│       └── Generates possible causes
│
├── recommendation_agent.py
│       │
│       └── Produces response recommendations
│
└── recommendation_engine.py
        │
        └── Matches hypotheses with runbooks
```

---

# 🔎 Hypothesis Generation

The system converts incident information into possible causes.

Example:

```text
High CPU Incident
       │
       ├── High CPU Utilization
       │
       └── Possible Memory Leak
```

Another example:

```text
Database Timeout
       │
       ├── Database Timeout
       │
       └── Slow Query
```

Another example:

```text
HTTP 5xx Spike
       │
       ├── HTTP 5xx Spike
       │
       └── Bad Deployment
```

Each hypothesis can be associated with a confidence value and supporting evidence.

---

# 📊 Confidence-Based Investigation

The system presents hypotheses with confidence information so that engineers can understand the relative strength of the generated possibilities.

Example:

```text
┌─────────────────────────────────┐
│ Hypothesis                      │
├─────────────────────────────────┤
│ High CPU Utilization             │
│ Confidence: 92%                  │
│                                 │
│ Evidence: CPU usage > threshold │
└─────────────────────────────────┘
```

This allows the engineer to inspect the reasoning context instead of receiving only a single unexplained answer.

---

# 📚 Runbook-Based Recommendations

Incident hypotheses can be connected to operational runbooks.

```text
Incident
   ↓
Hypothesis
   ↓
Runbook Matching
   ↓
Recommended Action
```

Runbooks are stored in:

```text
backend/data/runbooks.json
```

Example conceptual flow:

```text
High CPU
   ↓
Possible Memory Leak
   ↓
Memory Leak Runbook
   ↓
Recommended Diagnostic / Mitigation Action
```

This provides a structured connection between incident diagnosis and response procedures.

---

# 🧠 Hindsight / Memory Layer

The project separates memory functionality into four major operations:

```text
                 MEMORY
                    │
       ┌────────────┼────────────┐
       │            │            │
       ▼            ▼            ▼
     RETAIN       RECALL       REFLECT
       │            │            │
       ▼            ▼            ▼
   Store new     Retrieve      Analyze/
   knowledge     relevant      review
                 history       memory
```

### Retain

Stores useful incident knowledge for future use.

```text
Incident
   ↓
Resolution
   ↓
Postmortem / Learning
   ↓
Retain
```

### Recall

Retrieves relevant historical information during investigation.

```text
Current Incident
      ↓
Memory Query
      ↓
Historical Incidents
      ↓
Relevant Evidence
```

### Reflect

Provides a mechanism for reviewing and deriving useful information from stored incident knowledge.

### Client

Provides the interface used by the backend to communicate with the memory layer.

---

# 🚨 Incident Ingestion

The ingestion layer provides mechanisms for bringing incidents into the system.

```text
backend/ingestion/

├── alert_simulator.py
└── incident_normalizer.py
```

### Alert Simulator

Used to generate representative incidents for development and demonstrations.

Example incident types include:

```text
High CPU
Database Timeout
HTTP 5xx Spike
Slow Query
Memory Leak
Bad Deployment
```

### Incident Normalizer

Converts incoming alert information into a consistent incident representation that can be consumed by the investigation workflow.

---

# 👤 Human-in-the-Loop Approval

The system does not treat an AI-generated recommendation as an automatic command.

Instead:

```text
AI Recommendation
        │
        ▼
   Human Review
      /     \
     /       \
Approve     Reject
   │           │
   ▼           ▼
Continue     Review
```

This creates a human approval layer between recommendation and response.

The frontend provides an approval interface through:

```text
ApprovalPanel.jsx
```

---

# 📝 Postmortem Generation

After an incident has been investigated and resolved, the system provides a postmortem workflow.

A postmortem can capture:

```text
Incident Summary
       ↓
Impact
       ↓
Root Cause
       ↓
Investigation
       ↓
Resolution
       ↓
Follow-up Actions
       ↓
Lessons Learned
```

Postmortem functionality is implemented through:

```text
backend/api/postmortem_routes.py
```

and the frontend includes:

```text
PostmortemPanel.jsx
Postmortem.jsx
```

---

# 📁 Project Structure

```text
Incident-Response-Agent/
│
├── backend/
│   │
│   ├── agents/
│   │   ├── hypothesis_engine.py
│   │   ├── incident_agent.py
│   │   ├── recommendation_agent.py
│   │   └── recommendation_engine.py
│   │
│   ├── api/
│   │   ├── agent_routes.py
│   │   ├── incident_routes.py
│   │   ├── memory_routes.py
│   │   └── postmortem_routes.py
│   │
│   ├── data/
│   │   ├── incidents.json
│   │   ├── memory.json
│   │   ├── postmortems.json
│   │   └── runbooks.json
│   │
│   ├── hindsight/
│   │   ├── client.py
│   │   ├── recall.py
│   │   ├── reflect.py
│   │   └── retain.py
│   │
│   ├── ingestion/
│   │   ├── alert_simulator.py
│   │   └── incident_normalizer.py
│   │
│   ├── tests/
│   │   └── test_smoke.py
│   │
│   ├── utils/
│   │   ├── helpers.py
│   │   └── supabase_client.py
│   │
│   ├── app.py
│   └── requirements.txt
│
├── src/
│   │
│   ├── api/
│   │   └── api.js
│   │
│   ├── components/
│   │   ├── AppHeader.jsx
│   │   ├── ApprovalPanel.jsx
│   │   ├── ConfidenceMeter.jsx
│   │   ├── EvidencePanel.jsx
│   │   ├── HypothesisCard.jsx
│   │   ├── IncidentFeed.jsx
│   │   ├── IncidentHeader.jsx
│   │   ├── IncidentWorkspace.jsx
│   │   ├── MemoryRecall.jsx
│   │   ├── PostmortemPanel.jsx
│   │   ├── RecommendationCard.jsx
│   │   └── Timeline.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── IncidentDetails.jsx
│   │   ├── MemoryLibrary.jsx
│   │   └── Postmortem.jsx
│   │
│   ├── styles/
│   │   ├── command-center.css
│   │   └── index.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── scripts/
│   └── seed_incidents.py
│
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

# 🛠️ Technology Stack

## Frontend

* React
* Vite
* JavaScript / JSX
* React Router
* Axios
* Lucide React
* CSS

## Backend

* Python
* FastAPI
* Uvicorn
* Pydantic

## AI / Agent Layer

* Incident Agent
* Hypothesis Engine
* Recommendation Agent
* Recommendation Engine
* Confidence-based analysis

## Memory

* Hindsight memory layer
* Recall
* Retain
* Reflect

## Data

* JSON-based incident data
* JSON-based memory
* JSON-based runbooks
* JSON-based postmortems

## Testing

* Pytest
* FastAPI test client

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Incident-Response-Agent
```

---

# 🐍 Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

### Windows

```powershell
python -m venv .venv
```

Activate it:

```powershell
.venv\Scripts\activate
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

---

# ▶️ Start Backend

From the `backend` directory:

```powershell
uvicorn app:app --reload
```

The backend will be available at:

```text
http://localhost:8000
```

FastAPI documentation:

```text
http://localhost:8000/docs
```

---

# ⚛️ Frontend Setup

Open another terminal in the project root:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔌 API Documentation

## Health

```http
GET /health
```

Returns the backend health status.

---

## Incident APIs

### Get incidents

```http
GET /api/incidents
```

### Get incident

```http
GET /api/incidents/{incident_id}
```

### Create incident

```http
POST /api/incidents
```

### Update incident

```http
PATCH /api/incidents/{incident_id}
```

### Simulate incident

```http
POST /api/incidents/simulate
```

### Incident approval

```http
POST /api/incidents/{incident_id}/approval
```

---

# 🤖 Agent API

Analyze an incident:

```http
POST /api/agents/analyze/{incident_id}
```

The analysis workflow can involve:

```text
Incident
   ↓
Historical Memory
   ↓
Hypotheses
   ↓
Confidence
   ↓
Evidence
   ↓
Recommendations
```

---

# 🧠 Memory APIs

Recall historical incident information:

```http
GET /api/memory/recall
```

Reflect on stored knowledge:

```http
POST /api/memory/reflect
```

---

# 📝 Postmortem APIs

Get a postmortem:

```http
GET /api/postmortems/{incident_id}
```

Generate a postmortem:

```http
POST /api/postmortems/{incident_id}
```

Update a postmortem:

```http
PUT /api/postmortems/{incident_id}
```

---

# 🧪 Testing

From the backend directory:

```powershell
pytest
```

Testing covers the application's backend functionality and API behavior.

---

# 🎬 Demo Flow

The recommended demonstration flow is:

### 1. Open the Incident Dashboard

```text
Dashboard
    ↓
Incident Feed
```

### 2. Create or simulate an incident

Example:

```text
HTTP 5xx Spike
```

### 3. Open the incident workspace

The system displays:

```text
Incident Details
Timeline
Evidence
Hypotheses
Confidence
Recommendations
```

### 4. Start investigation

```text
Incident
   ↓
Agent Analysis
```

### 5. Recall historical knowledge

```text
Current Incident
       ↓
Memory Recall
       ↓
Similar Historical Incidents
```

### 6. Generate hypotheses

```text
HTTP 5xx Spike
      ↓
Possible Bad Deployment
      ↓
Confidence
      ↓
Supporting Evidence
```

### 7. Generate recommendation

```text
Hypothesis
    ↓
Runbook
    ↓
Recommended Action
```

### 8. Human approval

```text
Recommendation
      ↓
Human Review
    /     \
Approve   Reject
```

### 9. Generate postmortem

```text
Incident
   ↓
Investigation
   ↓
Resolution
   ↓
Postmortem
```

### 10. Retain knowledge

```text
Resolved Incident
       ↓
Lessons Learned
       ↓
Memory
       ↓
Future Incident Investigation
```

---

# 💡 Example Incident

Consider a service experiencing high CPU utilization:

```text
Incident:
High CPU utilization

Service:
API Gateway

Severity:
High

CPU:
92%
```

The agent can investigate:

```text
                 High CPU
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
    High CPU Usage       Memory Leak
      92% confidence     70% confidence
          │                   │
          └─────────┬─────────┘
                    ▼
              Evidence
                    │
                    ▼
             Runbook Matching
                    │
                    ▼
             Recommendation
                    │
                    ▼
              Human Approval
```

After resolution:

```text
Incident
   ↓
Resolution
   ↓
Postmortem
   ↓
Retain
   ↓
Future High CPU Incident
   ↓
Recall Previous Knowledge
```

---

# 🔐 Human-Centered Response Design

A central design principle is:

> **AI assists the engineer; it does not blindly replace the engineer.**

The system separates:

```text
AI Analysis
     ↓
Recommendation
     ↓
Human Decision
     ↓
Response
```

This makes the workflow suitable for environments where operational actions require review and accountability.

---

# 📊 Current Implementation

The current repository provides the following core functionality:

* Incident dashboard
* Incident ingestion
* Alert simulation
* Incident normalization
* Incident analysis
* Hypothesis generation
* Confidence information
* Evidence display
* Runbook-based recommendations
* Historical memory recall
* Memory retention/reflection
* Human approval workflow
* Postmortem workflow
* FastAPI REST APIs
* React frontend
* Backend tests

---

# 🚧 Known Limitations

This repository should currently be considered a **prototype/development implementation**, rather than a complete production SRE platform.

Current limitations include:

* Local JSON-based data storage
* Alert simulation rather than complete production monitoring integration
* Limited authentication and authorization
* Response actions are subject to the current implementation
* Production observability integrations are not fully represented in the current repository
* The memory layer is intended for incident knowledge rather than a complete enterprise knowledge platform

---

# 🚀 Future Enhancements

## 1. Production Observability

Integrate with:

```text
Prometheus
Grafana
OpenTelemetry
ELK
Cloud Monitoring
```

---

## 2. Advanced LLM Reasoning

Add:

* LLM-powered root-cause analysis
* Natural-language incident investigation
* Tool-using agents
* Agent planning
* Multi-step reasoning
* Structured incident reports

---

## 3. Advanced Memory

Replace or extend local storage with:

```text
PostgreSQL
     +
Vector Database
     +
Embeddings
     +
Semantic Retrieval
```

This would allow more advanced similarity-based incident retrieval.

---

## 4. Controlled Automated Remediation

Future versions could support controlled actions such as:

```text
Restart Service
      ↓
Rollback Deployment
      ↓
Scale Service
      ↓
Run Diagnostic
```

with authentication, authorization, audit logging, and approval controls.

---

## 5. Security

Potential improvements:

* Authentication
* Role-Based Access Control
* Audit logging
* Secure secrets management
* API authorization
* Action permissions
* Approval policies

---

# 🎯 Long-Term Vision

The long-term goal is to evolve the project from an incident-management prototype into an **AI-assisted SRE platform**.

### Traditional workflow

```text
Alert
 ↓
Manual Investigation
 ↓
Manual Diagnosis
 ↓
Manual Response
 ↓
Manual Documentation
```

### AI-assisted workflow

```text
Alert
 ↓
Automated Ingestion
 ↓
AI-Assisted Investigation
 ↓
Historical Memory Recall
 ↓
Hypothesis Generation
 ↓
Evidence Analysis
 ↓
Response Recommendation
 ↓
Human Approval
 ↓
Controlled Response
 ↓
Automated Postmortem
 ↓
Knowledge Retention
 ↓
Improved Future Investigation
```

---

# 👥 Contributors

Add your team members here:

```text
- Your Name
- Team Member 1
- Team Member 2
- Team Member 3
```

---

# 📄 License

Add the project's license here.

For example:

```text
MIT License
```

---

## ⭐ Project Summary

**Incident Response Agent** combines incident management, agent-based investigation, historical memory, runbook recommendations, human approval, and postmortem generation into a single workflow.

The core idea is simple:

```text
                  ┌──────────────┐
                  │   INCIDENT   │
                  └──────┬───────┘
                         ▼
                  ┌──────────────┐
                  │ INVESTIGATE  │
                  └──────┬───────┘
                         ▼
                  ┌──────────────┐
                  │  REMEMBER    │
                  └──────┬───────┘
                         ▼
                  ┌──────────────┐
                  │  RECOMMEND   │
                  └──────┬───────┘
                         ▼
                  ┌──────────────┐
                  │    APPROVE   │
                  └──────┬───────┘
                         ▼
                  ┌──────────────┐
                  │   RESOLVE    │
                  └──────┬───────┘
                         ▼
                  ┌──────────────┐
                  │  POSTMORTEM  │
                  └──────┬───────┘
                         │
                         └──────────────►
                              LEARN
```

**Incident → Investigate → Remember → Recommend → Approve → Resolve → Learn**
