# NovaLink HR OS & Simulation Practicum
### Dual-System Enterprise HR Operations & Interactive 12-Day Practicum Platform for Bachelor-Level HRM Interns & CIPD Candidates

---

## 1. Overview & Dual-System Architecture

**NovaLink HR OS** is a unified, dual-system enterprise Human Resource platform and simulated practicum lab engineered specifically for **undergraduate university students and interns pursuing degrees in Human Resource Management (BSc HRM, BBA Human Resources, BA HRM)** as well as **CIPD Level 3/5/7 professional candidates**.

The platform is architected around two synchronized environments and a public job board:

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              SYSTEM 1: ENTERPRISE HR SYSTEM (/hr)                       │
│  • Master Employee Records, Organizational Hierarchy & Shift Statuses                   │
│  • Recruitment & ATS Pipeline: Screening Scorecards, Deadlines & Stage Transitions      │
│  • Practicum Grading Queue: Review Trainee Work & Grade with 4-Dimension CIPD Rubric    │
│  • Live Bidirectional Sync: Approvals and Grades immediately apply to Training Lab      │
└───────────────────────────────────────────┬─────────────────────────────────────────────┘
                                            │ ▲
               Trainee Submissions Dispatched │ │ Assessor Grades & Approvals Applied
                                            ▼ │
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                           SYSTEM 2: SIMULATION TRAINING LAB (/dashboard)                │
│  • 12-Day Progressive Employee Lifecycle Practicum                                      │
│  • Multi-Perspective Voice/Text AI Personas (Candidates, Hiring Managers, Aggrieved)    │
│  • Continuous Attendance Registers & Leave Management Engine                            │
│  • Strict Milestone Gating: Sequential Phase Progression & Tutorial Knowledge Checks    │
└───────────────────────────────────────────┬─────────────────────────────────────────────┘
                                            │
                                            ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                    PUBLIC CORPORATE WEBSITE & CAREERS PORTAL (/careers)                 │
│  • Employer Branding: About NovaLink, Mission, Global Hubs & Comprehensive Benefits    │
│  • Open Vacancies with Explicit Application Deadlines & Countdown Days                  │
│  • Pre-Screening Assessment Questionnaire & Instant Tracking Reference (NL-APP-2026)    │
│  • Real-Time Ingestion into the Enterprise HR ATS Recruitment Pipeline                  │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Key Pedagogical & Statutory Frameworks

| Practicum Module | Statutory / Academic Framework | Practical Application in NovaLink |
|---|---|---|
| **Day 1: Workforce Planning** | Job Analysis & Equality Act 2010 | Distinguishing Job Descriptions from Person Specifications; eliminating discriminatory criteria. |
| **Day 2: Talent Sourcing** | Inclusive Channel Allocation | Sourcing channels and advertising directly to the live NovaLink Careers Portal. |
| **Day 3: Selection Shortlisting** | STAR Behavioral Method | Standardized screening matrix and voice/text interviews with candidate personas. |
| **Day 4: Offer & Contracts** | Employment Rights Act 1996 | Referee checks (**Dr. Arthur Sterling**), selection rationale, and Section 1 statement generation. |
| **Day 5: Induction & Onboarding** | 3-Pillar Induction Matrix | Structuring orientation across Company Culture, Technical Competencies, and Compliance. |
| **Day 6: Probation Checkpoints** | Structured Milestone Reviews | 6-point observable benchmarks and conducting Week 1 check-ins (**Riley Morgan**). |
| **Day 7: Performance Management** | 360-Degree Multi-Rater Feedback | Triangulating self-assessments, managerial reviews, and peer feedback before appraisal scoring. |
| **Day 8: Learning & Development** | Kirkpatrick 4-Level Model | Diagnosing competency gaps and assessing Level 3 on-the-job behavioral application. |
| **Day 9: Employee Welfare** | Empathetic De-escalation & Wellbeing | Active listening in workplace burnout grievances (**Samira Khan**) before remedial action. |
| **Day 10: Statutory Disciplinary** | ACAS Statutory Code of Practice | Enforcing the 6-step Fair Process Checklist and linking empirical attendance data. |
| **Day 11: Total Reward** | Equitable Benefits Architecture | Total reward packages, retention drivers, and non-financial recognition. |
| **Day 12: Exit & Offboarding** | Offboarding Diagnostics | Exit interview diagnostics, knowledge retention, and offboarding checklists. |

---

## 3. Stitch Modern SaaS Design System

NovaLink HR OS adheres strictly to the **Stitch Modern SaaS Design System** (`standard_professional_utility`):

- **Palette**:
  - **Surface Canvas**: `#f7f9fb` (cool-toned, low eye-strain surface)
  - **Containers**: `#ffffff` with 1px `#e2e8f0` borders and ambient glowing blur orbs (`bg-[#2563eb]/5 blur-xl`)
  - **Primary Cobalt Accent**: `#2563eb` / `#004ac6` with `#dbe1ff` / `#00174b` container tags
  - **Secondary Neutral**: `#505f76` slate with `#d0e1fb` active navigation pills
  - **Alerts & Warnings**: Crimson `#ba1a1a` with `#ffdad6` containers
- **Typography & Geometry**: Strict 8px linear grid rhythm, 8px/12px border radii (`rounded-xl`), and Inter font hierarchy.
- **Top Application Header**: 64px (`h-16`) header bar with global search (`⌘K`), system mode switcher, and user session capsule.
- **Adaptive Sidebar**: Context-aware navigation switching between Enterprise HR and Training Lab modes.

---

## 4. Public Corporate Website, Deadlines & ATS Screening

- **Corporate Careers Hub (`/careers`)**: Displays global hubs, culture, 28-day leave benefits, private healthcare, and active vacancies.
- **Explicit Application Deadlines**: Every vacancy displays structured closing deadlines (e.g. `Closes: 15 Sep 2026 • 15 Days Left`).
- **Candidate Assessment Questionnaire (`/careers/[id]`)**: Self-rated technical proficiency (1–10 slider), right-to-work verification, experience level, motivation response, and instant tracking code (`NL-APP-2026-XXXX`).
- **Enterprise HR ATS Suite (`/hr`)**:
  - Live table of incoming applications.
  - Interactive **Candidate Assessment Scorecard** modal for recruiters to inspect CVs, score technical competence (1–10), log screening rationale, and update stage (`NEW` &rarr; `SCREENED` &rarr; `INTERVIEW_SCHEDULED` &rarr; `OFFERED` &rarr; `HIRED` / `REJECTED`).

---

## 5. Strict Phase Progression & Milestone Gating

1. **Server-Side Route Guard (`DayLockGuard.tsx`)**: Blocks direct URL skipping.
2. **Server-Side API Guard (`app/api/day/submit/route.ts`)**:
   - Requires Day $N-1$ status to be `SUBMITTED` or `GRADED` before Day $N$ can be processed.
   - Enforces `assertTutorialCompleted(traineeId, phaseSlug)` for tutorial and knowledge check completion.
   - Submitting Day $N$ automatically transitions Day $N + 1$ from `LOCKED` &rarr; `IN_PROGRESS`.
3. **Interactive Navigation Locking (`FrappeSidebar.tsx`)**: Displays locked days as disabled `🔒 Locked` items with toast explanations.

---

## 6. Bidirectional Sync & Live Rubric Grading

1. Trainee completes Day $N$ in the **Training Lab**.
2. Submission immediately appears in the **Enterprise HR System's Practicum Review Queue** (`/hr`).
3. HR Assessor / Trainer opens the dossier in the **Rubric Grading Room** (`/hr/review/[id]`) and scores the submission across 4 CIPD dimensions (0–100 total):
   - **Statutory & Legal Compliance** (0–25 pts)
   - **Professional Accuracy & Thoroughness** (0–25 pts)
   - **CIPD Framework Alignment** (0–25 pts)
   - **Strategic HR Communication** (0–25 pts)
4. Assessor enters guidance comments and clicks **"Approve & Apply Grade to Simulation"**.
5. Status changes to `GRADED`, saving feedback and unlocking the next module in the training lab.

---

## 7. Zero-Cost & Free AI Architecture

1. **Google Gemini Support**: Native integration with `gemini-2.0-flash-lite` via `@ai-sdk/google` (supports free API keys from [Google AI Studio](https://aistudio.google.com/)).
2. **Built-in Offline Persona Engine**: Zero-cost deterministic local streaming engine that powers realistic persona responses offline.
3. **Browser Web Speech API**: Client-side speech-to-text transcription (`webkitSpeechRecognition`) and text-to-speech voice synthesis (`window.speechSynthesis`) with 0 external API cost.
4. **Zero-Config Database**: Local SQLite database via Prisma ORM (`prisma/dev.db`).

---

## 8. Installation & Quick Start

```bash
git clone https://github.com/DannySye/hr-system.git
cd hr-system
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run seed
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 9. Default Testing & Evaluation Accounts

| Role | Email | Password | Primary Capabilities |
|---|---|---|---|
| **HR Trainee (Intern)** | `trainee@novalink.com` | `trainee123` | 12-Day Simulation Runner, Live Attendance Register, Voice Rooms, Tutorial Quizzes |
| **Lead Trainer (Supervisor)** | `trainer@novalink.com` | `trainer123` | Enterprise HR Operations, ATS Screening Scorecards, Practicum Review Queue & Rubric Grading |

---

## 10. License & Academic Citation

Developed for academic Human Resource Management higher education and professional HR practitioner training. Free for educational and training use.
