# NovaLink HR Simulation Lab
### Interactive 12-Day Practicum & Persona Simulation Platform for Bachelor-Level Human Resource Management Interns

---

## 1. Overview & Pedagogical Purpose

The **NovaLink HR Simulation Lab** is an interactive, simulation-based learning and assessment platform designed specifically for **undergraduate interns and university students pursuing a Bachelor's Degree in Human Resource Management (BSc HRM, BBA in Human Resources, or BA Human Resource Management)**.

Academic HR coursework teaches essential legal doctrines, strategic frameworks, and organizational theories. However, undergraduate students rarely have the opportunity to experience the high-stakes nuance of real workplace execution before their first internship. 

NovaLink bridges this gap by immersing students into a simulated multi-national matrix organization (**NovaLink Global**). Working as a Junior HR Specialist under the supervision of a Lead HR Trainer (**Eleanor Vance**), interns navigate real-time employee relations, live attendance registers, multi-perspective performance appraisals, difficult employee grievances, and statutory disciplinary hearings.

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              ACADEMIC HR THEORY & FRAMEWORKS                            │
│  (CIPD Standards • SHRM Body of Knowledge • ACAS Code of Practice • UK Employment Law) │
└───────────────────────────────────────────┬─────────────────────────────────────────────┘
                                            │
                                            ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                           NOVALINK HR SIMULATION LAB (PRACTICUM)                        │
│   • 12-Day Progressive Employee Lifecycle Simulation                                   │
│   • Multi-Perspective 360° Feedback & KPI Formulation                                   │
│   • Continuous Attendance Registers & Leave Management Engine                           │
│   • Speech-to-Speech Interactive AI Personas (Candidates, Managers, Aggrieved Peers)    │
│   • Pedagogically Gated MDX Knowledge Checks & Branching Scenario Decisions             │
└───────────────────────────────────────────┬─────────────────────────────────────────────┘
                                            │
                                            ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                         PRACTITIONER COMPETENCY & CAREER READINESS                      │
│   (Empathetic Listening • Procedural Fairness • Statutory Compliance • STAR Interview)  │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Key Academic & Professional Frameworks Covered

| Area | Theoretical Framework / Standard | Practical Simulation Application |
|---|---|---|
| **Workforce Planning (Day 1)** | Job Analysis & Equality Act 2010 | Distinguishing Job Descriptions from Person Specifications; eliminating discriminatory job criteria. |
| **Talent Acquisition (Days 2–4)** | STAR Behavioral Interview Method | Structuring competency questions and scoping roles with hiring managers (**Marcus Chen**). |
| **Hiring & Contracts (Day 4)** | Employment Rights Act 1996 | Independent referee checks (**Dr. Arthur Sterling**), defensible selection justification, and statutory contract generation. |
| **Onboarding & Induction (Day 5)** | 3-Pillar Induction Matrix | Structuring orientation across Company Culture, Job Competencies, and Statutory Workplace Rules. |
| **Probation Management (Day 6)** | Structured Milestone Reviews | Establishing 6-point observable benchmarks and conducting Week 1 check-ins (**Riley Morgan**). |
| **Performance Appraisal (Day 7)** | 360-Degree Multi-Rater Feedback | Triangulating self-assessment, managerial output review, and peer feedback before synthesis. |
| **Learning & Development (Day 8)** | Kirkpatrick 4-Level Training Model | Diagnosing competency gaps and assessing Level 3 on-the-job behavioral application. |
| **Welfare & Grievance (Day 9)** | Empathetic De-escalation & Wellbeing | Active listening in workplace burnout grievances (**Samira Khan**) before proposing solutions. |
| **Disciplinary Action (Day 10)** | ACAS Statutory Code of Practice | Enforcing the 6-step ordered Fair Process Checklist and linking empirical attendance data. |

---

## 3. Zero-Cost & Free AI Architecture

This platform is engineered to run with **zero required subscription costs or paid API dependencies**, making it accessible to any university, student, or training cohort:

1. **Google Gemini Free Tier**: Integrated via `@ai-sdk/google` (`gemini-1.5-flash`) using free API keys from [Google AI Studio](https://aistudio.google.com/).
2. **Built-in Offline Persona Engine**: An intelligent local streaming engine that powers realistic, role-specific, and STAR-structured persona responses offline without requiring any external credit card or API key.
3. **Browser Web Speech API**: Speech-to-text dictation (`webkitSpeechRecognition` / `SpeechRecognition`) and text-to-speech voice synthesis (`window.speechSynthesis`) running entirely client-side with 0 external infrastructure costs.
4. **PostgreSQL via Prisma ORM**: Relational schema supporting Neon, Vercel Postgres, Supabase, or local PostgreSQL.

---

## 4. 12-Day Simulation Curriculum Roadmap

```
WEEK 1: TALENT ACQUISITION, RECRUITMENT & INDUCTION
  ├── Day 1: Workforce Planning & Job Analysis (Engineering Role Scoping with Marcus Chen)
  ├── Day 2: Sourcing Strategy, Channels & Inclusive Job Adverts (Applicant Inflow)
  ├── Day 3: Selection Shortlisting & Structured Candidate Interviewing (STAR Method)
  ├── Day 4: Offer Letter Formulation, Reference Checks & Statutory Contracts (ERA 1996)
  └── Day 5: Onboarding Architecture & First-Month 3-Pillar Induction Design

WEEK 2: PERFORMANCE, DEVELOPMENT, WELFARE & STATUTORY DISCIPLINE
  ├── Day 6: Probationary Review & Continuous Attendance Register Launch
  ├── Day 7: Performance Management (KPI Builder & 360° Appraisal Synthesis)
  ├── Day 8: Learning & Development (Catalog Fulfillment & Kirkpatrick Review)
  ├── Day 9: Employee Welfare Consultation & Formal Grievance De-escalation
  └── Day 10: Disciplinary Hearing & ACAS Statutory 6-Step Fair Process

SYNTHESIS & GOVERNANCE
  ├── Day 11: Total Reward, Recognition & Equitable Benefits Architecture
  └── Day 12: Exit Interviews, Offboarding Diagnostics & Retrospective
```

---

## 5. Getting Started & Installation

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm
- PostgreSQL database (Neon, Supabase, Vercel Postgres, or local PostgreSQL)

### Step 1: Clone and Install Dependencies
```bash
git clone https://github.com/DannySye/hr-system.git
cd hr-system
npm install
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure your `DATABASE_URL` is set:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/novalink_hr?schema=public"
NEXTAUTH_SECRET="novalink_super_secret_session_jwt_key_at_least_32_characters"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Google Gemini Free API Key (Leave blank to use built-in zero-cost offline persona engine)
GOOGLE_GENERATIVE_AI_API_KEY=""
```

### Step 3: Run Prisma Migrations & Seed Database
```bash
npx prisma generate
npx prisma db push # or npx prisma migrate dev --name init
npm run seed
```

### Step 4: Start Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000`.

---

## 6. Default Test Accounts

For testing, evaluation, and grading, use the one-click quick login buttons on `/login`:

| Role | Email | Password | Primary Capabilities |
|---|---|---|---|
| **Lead Trainer (Supervisor)** | `trainer@novalink.com` | `trainer123` | Cohort Progress Matrix, Seed Console, Rubric Grading, Manual Unlock Overrides |
| **HR Trainee (Intern)** | `trainee@novalink.com` | `trainee123` | 12-Day Simulation Runner, Live Attendance Register, Voice Rooms, Tutorial Quizzes |

---

## 7. Interactive Tutorial Gating & Assessment Rules

To ensure interns engage deeply with academic concepts prior to submitting daily work:
- **Knowledge Checks**: Immediate per-question feedback with explanation breakdowns.
- **Branching Scenario Decisions**: Realistic ethical micro-scenarios demonstrating real-world consequences.
- **Gating Enforcement (`lib/tutorial-gating.ts`)**: Daily deliverable submission buttons stay disabled until the intern has completed that day's Knowledge Check and Scenario Decision.
- **Trainer Rubrics (`app/trainer/trainee/[id]`)**: Instructors evaluate submissions against standardized 1–5 rubrics covering legal compliance, evidence linkage, listening quality, and procedural fairness.

---

## 8. License & Academic Citation

Developed for academic and professional Human Resource Management education. Free for educational and training use.
