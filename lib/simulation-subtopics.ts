export interface SubtopicData {
  id: string
  title: string
  badge: string
  overview: string
  legalBasis: string
  bestPractices: string[]
  pitfalls: string[]
  question: {
    question: string
    options: string[]
    correctIndex: number
    explanation: string
  }
}

export const DAY_SUBTOPICS: Record<number, SubtopicData[]> = {
  1: [
    {
      id: 'vacancy-request',
      title: 'Formal Vacancy Request & Headcount Authorization',
      badge: 'Workforce Governance',
      overview: 'Establishes the formal business justification and budgetary sign-off for a new or replacement role before recruitment commences. Prevents unbudgeted labor cost inflation and aligns team capacity with strategic goals.',
      legalBasis: 'Corporate Financial Governance & Employment Rights Act 1996. Requires documented board/budgetary approval before commercial or contractual commitment.',
      bestPractices: [
        'Distinguish clearly between replacement headcount (backfill) vs newly budgeted expansion roles.',
        'Obtain verified salary band approvals from Finance before publishing requisitions.',
        'Document operational impact on customer SLAs if the role remains unfilled.',
      ],
      pitfalls: [
        'Commencing candidate sourcing based on informal verbal manager requests.',
        'Failing to verify whether the vacated post can be absorbed or redesigned through internal automation.',
      ],
      question: {
        question: 'Why must a hiring manager formally document whether a requisition is a "replacement" vs. "new expansion" headcount?',
        options: [
          'To prevent unauthorized headcount budget inflation and ensure financial compliance.',
          'To automatically reduce the position salary band by 15%.',
          'To bypass the Equality Act 2010 advertising mandates.',
          'To avoid informing the executive leadership team.',
        ],
        correctIndex: 0,
        explanation: 'Headcount governance requires clear separation between budgeted replacements (maintaining status quo) and new additions (which increase recurring operational expenditure).',
      },
    },
    {
      id: 'job-description',
      title: 'Standard Job Description (JD) Builder',
      badge: 'Role Architecture',
      overview: 'Defines the core purpose, key accountability areas, working relationships, KPIs, and operational deliverables expected from the role holder.',
      legalBasis: 'Equality Act 2010 & Employment Relations. JDs form the foundation of the employment contract and provide baseline evidence during constructive dismissal or performance claims.',
      bestPractices: [
        'Focus on measurable strategic outcomes rather than a repetitive list of micro-tasks.',
        'Include quantifiable KPIs (e.g. 99.98% network uptime, 4-hour SLA response).',
        'State reporting hierarchies and line management relationships clearly.',
      ],
      pitfalls: [
        'Using vague phrases like "Do whatever the manager asks" without defined parameters.',
        'Conflating the Job Description (the job itself) with the Person Specification (the person needed).',
      ],
      question: {
        question: 'Which of the following represents an objective, outcome-based job accountability statement?',
        options: [
          'Be enthusiastic and stay busy throughout office hours.',
          'Deploy, configure, and maintain optical network cutovers to achieve ≥ 99.98% uptime SLAs.',
          'Help colleagues whenever they seem overwhelmed.',
          'Attend all company meetings without asking questions.',
        ],
        correctIndex: 1,
        explanation: 'Outcome-based accountability specifies what must be achieved (optical cutovers deployed) and how success is measured (≥ 99.98% uptime SLA).',
      },
    },
    {
      id: 'person-spec',
      title: 'Person Specification (PS) — Essential vs. Desirable Criteria',
      badge: 'Statutory Non-Discrimination',
      overview: 'Identifies the skills, knowledge, qualifications, and behavioral competencies required. Criteria must be objectively justifiable and categorized into non-negotiable minimums (Essential) and value-added traits (Desirable).',
      legalBasis: 'Equality Act 2010 (Section 19: Indirect Discrimination). Any criterion having a disproportionate adverse impact on a protected group is unlawful unless objectively justifiable as a Genuine Occupational Requirement (GOR).',
      bestPractices: [
        'Ensure all Essential criteria are strictly required for day-one operational survival.',
        'Avoid arbitrary qualification minimums (e.g. demanding a Masters degree for routine technical work).',
        'Use objective behavioral competencies instead of subjective personality labels.',
      ],
      pitfalls: [
        'Including age-coded criteria like "Must have graduated in the last 2 years" (unlawful age discrimination).',
        'Classifying non-essential preferences as "Essential", arbitrarily disqualifying strong candidates.',
      ],
      question: {
        question: 'A hiring manager asks to add "Must have graduated university in the last 3 years" to the Person Specification. What must the HR specialist do?',
        options: [
          'Reject the criterion because it constitutes unlawful indirect age discrimination under the Equality Act 2010.',
          'Accept it because hiring managers have complete unilateral discretion.',
          'Change it to "Must possess high youthful energy".',
          'Include it only on confidential internal notes.',
        ],
        correctIndex: 0,
        explanation: 'Requiring recent graduation disproportionately excludes older candidates with equivalent experience and cannot be objectively justified, making it unlawful indirect age discrimination.',
      },
    },
    {
      id: 'manager-chat',
      title: 'Department Manager Scoping Consultation',
      badge: 'Stakeholder Alignment',
      overview: 'Direct stakeholder alignment meeting with the department head (Marcus Chen) to interrogate operational requirements, shift schedules, and key failure points.',
      legalBasis: 'CIPD Profession Map (Core Knowledge: People Practice). Aligning talent acquisition with departmental strategy while maintaining regulatory compliance.',
      bestPractices: [
        'Ask open-ended probing questions regarding past hire performance breakdowns.',
        'Challenge assumptions regarding physical attendance if hybrid models are viable.',
        'Clarify the on-call rota and overtime compensation expectations up front.',
      ],
      pitfalls: [
        'Accepting manager biases without checking statutory defensibility.',
        'Failing to establish a realistic recruitment timeline and interview panel availability.',
      ],
      question: {
        question: 'What is the primary objective when conducting a scoping consultation with a department head?',
        options: [
          'To identify real operational competencies and performance metrics while filtering out discriminatory criteria.',
          'To ask the manager to write the legal employment contract.',
          'To promise immediate hire placement within 24 hours.',
          'To convince the manager to eliminate the role completely.',
        ],
        correctIndex: 0,
        explanation: 'HR acts as both a strategic partner and compliance steward, eliciting true operational needs while safeguarding statutory equality principles.',
      },
    },
  ],

  2: [
    {
      id: 'advert-builder',
      title: 'Inclusive Job Advertisement Formulation',
      badge: 'Attraction & Equality',
      overview: 'Crafting compelling, accessible, and transparent recruitment advertisements that attract diverse talent pools while communicating transparent salary bands.',
      legalBasis: 'Equality Act 2010 & Gender Pay Gap Regulations. Advertisements must not contain gender-biased language or restrictive exclusionary requirements.',
      bestPractices: [
        'State transparent salary bands (e.g. £42,000–£52,000) to ensure wage equity and attract top candidates.',
        'Highlight statutory flexible working and reasonable adjustment support.',
        'Include clear closing deadlines with timezone specifications.',
      ],
      pitfalls: [
        'Using gender-coded terminology (e.g. "rockstar", "ninja", "dominant leader") that reduces female application rates.',
        'Omitting salary details (stating "competitive"), which perpetuates systemic pay gaps.',
      ],
      question: {
        question: 'Why does publishing transparent salary ranges in job advertisements directly advance statutory equality?',
        options: [
          'It mitigates historic wage disparity across protected characteristics and increases qualified application volume.',
          'It legally permits the company to avoid paying holiday pay.',
          'It prevents competitors from hiring talent.',
          'It eliminates the need for reference checks.',
        ],
        correctIndex: 0,
        explanation: 'Pay transparency directly combats gender and ethnicity pay gaps by establishing standardized starting compensation baselines.',
      },
    },
    {
      id: 'channel-selector',
      title: 'Multi-Channel Sourcing & Budget Strategy',
      badge: 'Channel ROI',
      overview: 'Selecting targeted sourcing channels (LinkedIn, specialized telecom job boards, internal mobility, direct careers portal) to maximize candidate quality per pound spent.',
      legalBasis: 'Public Sector Equality Duty & Industry Best Practice. Ensuring advertisements reach demographically diverse candidate pools.',
      bestPractices: [
        'Blend niche industry boards (e.g. Optical/Network forums) with broad professional networks.',
        'Track cost-per-qualified-applicant across each advertising channel.',
        'Always publish to the internal talent mobility stream to support employee career progression.',
      ],
      pitfalls: [
        'Relying entirely on a single generalist channel for specialized technical skills.',
        'Failing to monitor channel performance, resulting in wasted recruitment budgets.',
      ],
      question: {
        question: 'What is the most effective sourcing strategy for highly specialized infrastructure engineering roles?',
        options: [
          'Combining targeted niche industry portals, direct careers site publication, and proactive talent pipelining.',
          'Placing print ads in local generalist newspapers.',
          'Relying solely on word-of-mouth informal referrals.',
          'Waiting for unsolicited mail applications.',
        ],
        correctIndex: 0,
        explanation: 'Niche portals and targeted digital sourcing deliver high-intent, qualified technical specialists far more effectively than broad generalist channels.',
      },
    },
    {
      id: 'applications-inbox',
      title: 'Application Ingestion & Live Candidate Stream',
      badge: 'ATS Governance',
      overview: 'Receiving, logging, and timestamping incoming candidate dossiers from the public careers site into the central ATS pipeline.',
      legalBasis: 'GDPR / Data Protection Act 2018. Candidate personal data must be stored securely, accessed on a need-to-know basis, and retained under lawful basis.',
      bestPractices: [
        'Generate immediate unique reference tracking numbers for each submission.',
        'Ensure candidate data is centralized rather than forwarded across unencrypted personal email.',
        'Maintain an audit trail of application arrival timestamps relative to published deadlines.',
      ],
      pitfalls: [
        'Discarding late applications without documenting the reason for exclusion.',
        'Allowing unauthorized team members to view candidate personal contact details before shortlisting.',
      ],
      question: {
        question: 'Under GDPR and UK Data Protection laws, how should candidate application CVs be handled?',
        options: [
          'Stored in a secure, role-restricted ATS with documented retention schedules and strict privacy safeguards.',
          'Printed and left on open desks in the staff cafeteria.',
          'Shared publicly on company social channels.',
          'Deleted immediately upon receipt.',
        ],
        correctIndex: 0,
        explanation: 'Candidate resumes contain sensitive personal data and must be protected through role-based access control and strict data governance.',
      },
    },
  ],

  3: [
    {
      id: 'shortlisting',
      title: 'Standardized Shortlisting Matrix',
      badge: 'Bias Mitigation',
      overview: 'Systematic scoring of candidate CVs against predefined Person Specification criteria using a standardized numerical scoring sheet.',
      legalBasis: 'Equality Act 2010. Objective matrix scoring defends the employer against claims of discriminatory shortlisting.',
      bestPractices: [
        'Implement blind shortlisting where personal identifiers (name, age, address) are anonymized.',
        'Score each candidate on evidence rather than impressions or resume formatting.',
        'Maintain clear written justification for why candidates did not meet essential thresholds.',
      ],
      pitfalls: [
        'Shortlisting based on "gut feeling" or shared personal interests (affinity bias).',
        'Changing the passing score mid-way to accommodate a favored candidate.',
      ],
      question: {
        question: 'What is the primary function of a standardized shortlisting matrix in recruitment?',
        options: [
          'To ensure objective, consistent evaluation against predefined job criteria while mitigating unconscious bias.',
          'To rank candidates alphabetically by surname.',
          'To select only candidates who graduated from specific elite universities.',
          'To automate the hiring process without human review.',
        ],
        correctIndex: 0,
        explanation: 'A standardized matrix enforces objective evaluation against published criteria, minimizing subjective bias and establishing defensible legal records.',
      },
    },
    {
      id: 'interview-scheduling',
      title: 'Competency-Based STAR Interview Structuring',
      badge: 'STAR Methodology',
      overview: 'Designing structured interview scorecards using the STAR technique (Situation, Task, Action, Result) to evaluate past behavioral performance as a predictor of future success.',
      legalBasis: 'CIPD Standards & Employment Law. Standardized questions ensure equal opportunity and consistent candidate assessment.',
      bestPractices: [
        'Ask the same core competency questions to all candidates in the same order.',
        'Probe specifically into the "Action" component to identify individual contributions vs team efforts.',
        'Allow candidates to ask questions regarding team culture and working conditions.',
      ],
      pitfalls: [
        'Asking leading questions that give away the desired answer.',
        'Allowing conversational tangents that favor extroverted candidates over qualified introverts.',
      ],
      question: {
        question: 'In the STAR interview methodology, which component provides the most critical empirical evidence of candidate competency?',
        options: [
          'Action: The specific steps and decisions the candidate personally took to resolve the problem.',
          'Situation: How chaotic the candidate\'s previous company was.',
          'Task: The theoretical instructions given by their previous manager.',
          'Result: The general team revenue increase.',
        ],
        correctIndex: 0,
        explanation: 'The Action element reveals the candidate\'s direct problem-solving, technical execution, and behavioral choices under pressure.',
      },
    },
    {
      id: 'candidate-interview',
      title: 'Live Selection Interview & Scorecard Assessment',
      badge: 'Voice/Text Practicum',
      overview: 'Conducting a live interactive voice/text selection interview with candidate persona Jordan Hayes and recording quantitative assessment scores across technical, behavioral, and communication dimensions.',
      legalBasis: 'Equality Act 2010 & ACAS Best Practice. Standardized scoring forms provide contemporaneous legal records of selection decisions.',
      bestPractices: [
        'Take contemporaneous objective notes focused on verifiable facts and examples provided.',
        'Score candidate answers immediately after the interview while memories are fresh.',
        'Avoid making hiring promises or verbal commitments during the assessment.',
      ],
      pitfalls: [
        'Letting initial positive impressions overshadow technical gaps (Halo Effect).',
        'Scoring candidates comparatively against each other rather than against the job benchmark.',
      ],
      question: {
        question: 'If a candidate gives a vague response during a competency interview, what is the best probing follow-up technique?',
        options: [
          'Ask: "Could you walk me through the specific steps you personally executed when that incident occurred?"',
          'Interrupt the candidate and answer the question for them.',
          'Immediately assign a zero score without clarification.',
          'Move to the next question and guess their competency level.',
        ],
        correctIndex: 0,
        explanation: 'Effective interviewers use targeted behavioral probes to prompt the candidate for specific, observable actions without being confrontational.',
      },
    },
  ],

  4: [
    {
      id: 'reference-check',
      title: 'Independent Pre-Employment Reference Verification',
      badge: 'Due Diligence',
      overview: 'Conducting structured factual and professional referee inquiries (Dr. Arthur Sterling) to verify employment dates, technical integrity, disciplinary history, and reasons for leaving.',
      legalBasis: 'Employment Rights Act 1996 & Law of Defamation. Referees owe a legal duty of care to provide references that are true, accurate, and fair without misleading omissions.',
      bestPractices: [
        'Always obtain candidate consent before contacting current or former employers.',
        'Distinguish objective factual confirmation from subjective character references.',
        'Verify that the referee was an authorized managerial supervisor rather than an informal peer.',
      ],
      pitfalls: [
        'Relying on informal off-the-record phone calls that lack documentation.',
        'Revoking an unconditional offer before verifying conditional contract clauses.',
      ],
      question: {
        question: 'What is the legal standard governing pre-employment reference checks in UK employment practice?',
        options: [
          'References must be true, accurate, and fair, avoiding misleading omissions.',
          'Referees are legally prohibited from providing factual dates.',
          'Employers must always accept verbal references without written confirmation.',
          'References are strictly optional for technical roles.',
        ],
        correctIndex: 0,
        explanation: 'Case law establishes that employers giving references owe a legal duty of care to ensure all statements are factually substantiated and balanced.',
      },
    },
    {
      id: 'selection-decision',
      title: 'Defensible Selection Decision & Rationale',
      badge: 'Decision Governance',
      overview: 'Synthesizing interview scorecards, technical evaluations, and reference reports into a formalized Selection Matrix to substantiate the final hiring recommendation.',
      legalBasis: 'Equality Act 2010. Robust written selection rationales provide essential evidence in defense against discrimination claims at Employment Tribunal.',
      bestPractices: [
        'Compare all shortlisted candidates strictly against identical competency rubrics.',
        'Document tangible reasons why the successful candidate scored higher than runners-up.',
        'Provide constructive, evidence-based feedback to unsuccessful interviewees.',
      ],
      pitfalls: [
        'Justifying hiring decisions with subjective remarks like "cultural fit" without behavioral evidence.',
        'Discarding interview notes before the 6-month statutory tribunal limitation period expires.',
      ],
      question: {
        question: 'Why must HR document a formalized, evidence-based selection rationale for every candidate interviewed?',
        options: [
          'To substantiate that the appointment was based on merit and objective criteria if challenged under Equality law.',
          'To ensure the candidate accepts the lowest salary offer.',
          'To replace the need for an employment contract.',
          'To avoid paying payroll taxes.',
        ],
        correctIndex: 0,
        explanation: 'Documented selection rationales provide transparent, contemporaneous justification proving that decisions were made purely on merit without protected bias.',
      },
    },
    {
      id: 'offer-contract',
      title: 'Statutory Employment Contract & Section 1 Statement (ERA 1996)',
      badge: 'Statutory Compliance',
      overview: 'Generating a compliant Section 1 Written Statement of Employment Particulars, including starting date, probationary period, compensation, notice periods, and restrictive covenants.',
      legalBasis: 'Employment Rights Act 1996 (Section 1). Employers must provide a written statement of employment particulars on or before Day 1 of employment.',
      bestPractices: [
        'Issue the contract prior to the employee\'s first working day.',
        'Include clear probation duration (e.g. 6 months) and shortened notice terms during probation.',
        'State working hours, overtime arrangements, and statutory annual leave entitlements explicitly.',
      ],
      pitfalls: [
        'Making verbal unconditional offers before satisfactory reference checks are concluded.',
        'Omitting statutory mandatory terms such as disciplinary and grievance procedure references.',
      ],
      question: {
        question: 'Under the Employment Rights Act 1996 (as amended by the Good Work Plan), when must an employer issue the Section 1 Written Statement of Employment Particulars?',
        options: [
          'On or before the employee\'s very first day of work.',
          'Within 3 months after starting.',
          'Only upon completion of the probationary period.',
          'Only if the employee formally requests it in writing.',
        ],
        correctIndex: 0,
        explanation: 'Since April 2020, the Section 1 Statement is a day-one statutory right for all workers and employees in the UK.',
      },
    },
  ],

  5: [
    {
      id: 'onboarding-matrix',
      title: '3-Pillar Induction Architecture (Culture, Competence, Compliance)',
      badge: 'Induction Framework',
      overview: 'Structuring the first 90 days of an employee\'s lifecycle across Company Culture, Technical Competence, and Statutory Compliance to maximize retention and time-to-productivity.',
      legalBasis: 'Health and Safety at Work etc. Act 1974 & Statutory Compliance. Induction ensures statutory workplace safety training and policy awareness.',
      bestPractices: [
        'Balance mandatory compliance e-learning with team integration and culture building.',
        'Assign a dedicated workplace buddy separate from the line manager.',
        'Establish clear Week 1, Month 1, and Month 3 milestone objectives.',
      ],
      pitfalls: [
        'Overwhelming the new hire with 40 hours of unguided reading on Day 1 (information dumping).',
        'Failing to verify completion of mandatory statutory compliance checklists.',
      ],
      question: {
        question: 'What are the three core pillars of an effective enterprise onboarding framework?',
        options: [
          'Culture (values & belonging), Competency (job mastery & tools), and Compliance (statutory rules & safety).',
          'Overtime, Sales quotas, and Discipline.',
          'Salary deduction, Supervision, and Surveillance.',
          'Trial shifts, Probation penalties, and Informal tasks.',
        ],
        correctIndex: 0,
        explanation: 'A comprehensive induction addresses psychological integration (Culture), operational capability (Competency), and legal safety (Compliance).',
      },
    },
    {
      id: 'orientation-log',
      title: 'Orientation Logger & IT Asset Provisioning',
      badge: 'Operational Logistics',
      overview: 'Coordinating physical and digital asset provisioning (laptop, security badges, system access credentials, VPN) and logging structured 1-on-1 orientation sessions.',
      legalBasis: 'ISO 27001 & Data Protection Act 2018. Controlled access provisioning and audit logs prevent unauthorized data exposure.',
      bestPractices: [
        'Ensure system logins and hardware are fully configured before the employee\'s arrival.',
        'Obtain signed asset handover agreements for company-owned hardware.',
        'Schedule introductory meetings with key cross-functional stakeholders in advance.',
      ],
      pitfalls: [
        'Having a new hire sit idle on Day 1 due to missing IT credentials or security badges.',
        'Failing to log statutory health, safety, and fire evacuation briefings.',
      ],
      question: {
        question: 'Why is proactive IT asset and credential provisioning essential to induction success?',
        options: [
          'It reinforces psychological safety, signals professional organization, and eliminates idle downtime.',
          'It allows IT to monitor employee personal social media.',
          'It replaces the need for statutory health & safety briefings.',
          'It ensures the employee works over 60 hours in Week 1.',
        ],
        correctIndex: 0,
        explanation: 'Day-one operational readiness communicates organizational competence and accelerates new hire confidence and early contribution.',
      },
    },
    {
      id: 'org-chart',
      title: 'Organizational Hierarchy & Department Assignment',
      badge: 'Org Design',
      overview: 'Formalizing reporting structures, dotted-line matrix relationships, and departmental directory entries in the master ERP system.',
      legalBasis: 'CIPD Profession Map (Organization Design). Clear organizational architecture ensures accountability and clear escalation channels.',
      bestPractices: [
        'Publish transparent organizational charts showing reporting lines and department leaders.',
        'Clarify escalation paths for technical blockers vs HR personnel concerns.',
        'Ensure the master employee record is synchronized across payroll and HRIS.',
      ],
      pitfalls: [
        'Leaving reporting lines ambiguous, leading to conflicting managerial instructions.',
        'Failing to update org charts when team reassignments occur.',
      ],
      question: {
        question: 'In a matrix organization like NovaLink Global, why is clarifying primary vs. dotted-line reporting crucial?',
        options: [
          'To prevent conflicting priorities between technical lead direction and departmental line management.',
          'To permit managers to assign unlimited overtime.',
          'To avoid paying employee pensions.',
          'To eliminate all line manager responsibilities.',
        ],
        correctIndex: 0,
        explanation: 'Clear reporting definitions ensure employees know who conducts appraisals, approves leave, and sets operational project priorities.',
      },
    },
  ],

  6: [
    {
      id: 'probation-objectives',
      title: 'Probationary KPI & Milestone Setting (30/60/90 Days)',
      badge: 'Performance Benchmarks',
      overview: 'Formulating observable, measurable performance milestones for the 6-month probationary window, providing structured checkpoints at 30, 60, and 90 days.',
      legalBasis: 'Contract Law & Employment Rights. A well-managed probation allows employers to assess suitability under shortened contractual notice periods.',
      bestPractices: [
        'Set SMART benchmarks focused on learning ramp-up, core task execution, and team collaboration.',
        'Schedule formal review meetings in advance at the start of employment.',
        'Document all milestone feedback in writing and share it with the employee.',
      ],
      pitfalls: [
        'Waiting until Day 179 of a 180-day probation to raise serious performance concerns for the first time.',
        'Using vague criteria like "Show more initiative" without measurable deliverables.',
      ],
      question: {
        question: 'What is the most effective approach to managing employee probation?',
        options: [
          'Setting clear 30/60/90-day observable benchmarks with regular structured check-in meetings.',
          'Never speaking to the employee until the final probation expiry day.',
          'Extending probation indefinitely without giving specific performance reasons.',
          'Assuming no news is good news and letting probation pass automatically.',
        ],
        correctIndex: 0,
        explanation: 'Frequent milestone check-ins prevent surprises, allow early remedial training, and provide objective records if probation extension or termination is required.',
      },
    },
    {
      id: 'probation-checkin',
      title: 'Milestone Review & Employee Persona Check-In (Riley Morgan)',
      badge: 'Voice/Text Practicum',
      overview: 'Conducting an interactive 1-on-1 probationary check-in interview with employee persona Riley Morgan to discuss early onboarding wins, technical obstacles, and attendance patterns.',
      legalBasis: 'ACAS Guidance on Managing Performance. Providing timely feedback and support is essential for fair and effective people management.',
      bestPractices: [
        'Acknowledge early successes before addressing areas requiring development.',
        'Listen actively to employee feedback regarding tool bottlenecks or training gaps.',
        'Agree upon concrete action steps with assigned deadlines.',
      ],
      pitfalls: [
        'Treating the check-in as a one-way interrogation rather than a supportive dialogue.',
        'Failing to document agreed remedial support commitments.',
      ],
      question: {
        question: 'If an employee encounters early technical bottlenecks during probation, what should the HR specialist and manager do first?',
        options: [
          'Identify specific root causes and provide targeted training or peer mentoring support.',
          'Issue an immediate final written warning.',
          'Immediately dismiss the employee without investigation.',
          'Ignore the issue and hope it resolves itself.',
        ],
        correctIndex: 0,
        explanation: 'Probation is a developmental evaluation period; diagnosing skill gaps and providing targeted enablement is the first line of professional HR practice.',
      },
    },
  ],

  7: [
    {
      id: 'kpi-builder',
      title: 'SMART KPI Formulation & Goal Cascading',
      badge: 'Performance Management',
      overview: 'Establishing Specific, Measurable, Achievable, Relevant, and Time-bound (SMART) key performance indicators that cascade from corporate strategy down to individual roles.',
      legalBasis: 'CIPD Profession Map (Performance Management). Objective goal setting reduces rating bias and aligns individual efforts with organizational objectives.',
      bestPractices: [
        'Ensure each KPI has a clear numerical target, unit of measurement, and review cadence.',
        'Balance quantitative metrics (e.g. ticket resolution SLA) with qualitative behaviors (team collaboration).',
        'Involve the employee in goal-setting to foster psychological ownership.',
      ],
      pitfalls: [
        'Setting unachievable stretch targets that demotivate and cause employee burnout.',
        'Setting vague goals like "Improve communication" without defined behavioral indicators.',
      ],
      question: {
        question: 'Which of the following adheres to the SMART goal framework for a network engineer?',
        options: [
          'Reduce average optical splice cycle time from 45 min to under 30 min while maintaining 0% rework across Q3.',
          'Do your best to fix optical cables faster whenever possible.',
          'Try not to break anything during major network cutovers.',
          'Become the most respected engineer in the department by next week.',
        ],
        correctIndex: 0,
        explanation: 'The statement is Specific (splice cycle time), Measurable (45 to 30 min, 0% rework), Achievable, Relevant, and Time-bound (Q3).',
      },
    },
    {
      id: 'appraisal-360',
      title: '360-Degree Multi-Rater Appraisal Synthesis',
      badge: 'Multi-Rater Triangulation',
      overview: 'Synthesizing performance evidence from self-assessments, direct line manager evaluations, and peer feedback to eliminate single-rater bias and formulate balanced development plans.',
      legalBasis: 'Equality Act 2010 & CIPD Standards. Multi-rater feedback mitigates individual managerial bias and supports fair, defensible performance determinations.',
      bestPractices: [
        'Triangulate divergent ratings (e.g. high peer ratings vs low manager ratings) to uncover underlying dynamics.',
        'Focus appraisal conversations on growth, competency enhancement, and future objectives.',
        'Calibrate ratings across departments to ensure fairness across the organization.',
      ],
      pitfalls: [
        'Allowing peer feedback to become a popularity contest without behavioral rubrics.',
        'Using performance appraisals solely as a punitive tool rather than a developmental catalyst.',
      ],
      question: {
        question: 'What is the greatest pedagogical benefit of 360-degree multi-rater feedback compared to single-manager reviews?',
        options: [
          'It provides a rounded, multi-perspective view that mitigates individual managerial bias and highlights blind spots.',
          'It allows managers to completely outsource their review responsibilities.',
          'It eliminates the need for one-on-one performance meetings.',
          'It automatically dictates salary cuts.',
        ],
        correctIndex: 0,
        explanation: 'Multi-rater synthesis aggregates observations from multiple interaction touchpoints, providing richer behavioral evidence and fairer assessments.',
      },
    },
  ],

  8: [
    {
      id: 'tna',
      title: 'Training Needs Analysis (TNA) & Competency Diagnostics',
      badge: 'L&D Diagnostics',
      overview: 'Diagnosing individual and organizational competency gaps by analyzing performance appraisal data, incident logs, and technical evolutions.',
      legalBasis: 'CIPD Profession Map (Learning & Development). Targeted TNA ensures training budgets deliver measurable operational return on investment.',
      bestPractices: [
        'Identify whether performance deficits stem from skill gaps, motivation, or broken tooling.',
        'Prioritize statutory compliance and safety-critical certifications first.',
        'Align training solutions with specific business KPIs.',
      ],
      pitfalls: [
        'Assuming all performance problems can be fixed with classroom training.',
        'Purchasing generic training packages without assessing actual operational needs.',
      ],
      question: {
        question: 'When an employee underperforms, what must an HR specialist determine before recommending formal training?',
        options: [
          'Whether the shortfall is caused by a genuine knowledge/skill deficit vs. tool failure or motivation issues.',
          'Whether the training course is located in an exotic destination.',
          'Whether the employee has been with the company for more than 10 years.',
          'Whether the course instructor has published a book.',
        ],
        correctIndex: 0,
        explanation: 'Training only resolves knowledge and skill gaps; performance issues caused by faulty equipment or poor management require operational solutions.',
      },
    },
    {
      id: 'kirkpatrick',
      title: 'Kirkpatrick 4-Level Training Evaluation Model',
      badge: 'Evaluation Framework',
      overview: 'Applying the Kirkpatrick evaluation framework across Level 1 (Reaction), Level 2 (Learning), Level 3 (Behavioral Application on the Job), and Level 4 (Business Impact & ROI).',
      legalBasis: 'CIPD Standards. Level 3 and 4 evaluation proves the tangible commercial value and behavioral impact of L&D interventions.',
      bestPractices: [
        'Assess Level 3 behavior changes 30 to 90 days after training in the real work environment.',
        'Measure Level 4 business impact (e.g. reduced network cutover errors, faster ticket resolution).',
        'Use pre- and post-assessments to measure actual knowledge acquisition at Level 2.',
      ],
      pitfalls: [
        'Stopping evaluation at Level 1 "happy sheets" (reaction) without measuring real behavioral change.',
        'Failing to link training outcomes back to the original operational KPIs.',
      ],
      question: {
        question: 'Under the Kirkpatrick 4-Level model, which level measures whether an employee actually applies newly learned skills in their day-to-day job?',
        options: [
          'Level 3: Behavior (on-the-job application).',
          'Level 1: Reaction (satisfaction survey).',
          'Level 2: Learning (post-course quiz).',
          'Level 4: Results (company share price).',
        ],
        correctIndex: 0,
        explanation: 'Level 3 evaluates whether training transferred into sustained, observable behavioral change in the workplace.',
      },
    },
  ],

  9: [
    {
      id: 'welfare-listening',
      title: 'Active Empathetic Listening & Workplace Wellbeing',
      badge: 'Employee Relations',
      overview: 'Conducting sensitive, confidential welfare consultations with stressed or burned-out employees, practicing empathetic de-escalation and diagnosing organizational stressors.',
      legalBasis: 'Health and Safety at Work etc. Act 1974 & Common Law Duty of Care. Employers have a statutory duty to provide a safe working environment, including mental health risk management.',
      bestPractices: [
        'Create a safe, private space and maintain professional confidentiality.',
        'Use reflective listening without immediately offering defensive corporate rationalizations.',
        'Connect employees with Employee Assistance Programs (EAP) and mental health first aiders.',
      ],
      pitfalls: [
        'Dismissing emotional distress as "lack of resilience".',
        'Breaching employee medical confidentiality without informed consent.',
      ],
      question: {
        question: 'What is an employer\'s legal duty of care regarding workplace stress and mental wellbeing?',
        options: [
          'Employers have a statutory legal duty to take reasonable steps to prevent foreseeable workplace mental health harm.',
          'Employers are only responsible for physical fractures and broken bones.',
          'Employers have no legal obligations regarding employee mental health.',
          'Employers are legally required to fire any stressed employee.',
        ],
        correctIndex: 0,
        explanation: 'UK Health and Safety law and common law establish that employers owe a legal duty of care to protect employees from foreseeable physical and psychological harm.',
      },
    },
    {
      id: 'grievance-handling',
      title: 'Formal Grievance Investigation & De-escalation (Samira Khan)',
      badge: 'Grievance Resolution',
      overview: 'Handling employee grievances under the ACAS Code of Practice, conducting impartial fact-finding investigations, and exploring informal vs formal resolution mechanisms.',
      legalBasis: 'ACAS Code of Practice on Disciplinary and Grievance Procedures (Section 2). Failure to follow the code can result in a 25% tribunal compensation uplift.',
      bestPractices: [
        'Acknowledge grievances promptly and invite the employee to a formal meeting without unreasonable delay.',
        'Inform the employee of their statutory right to be accompanied by a trade union rep or workplace colleague.',
        'Maintain an impartial, non-judgmental stance during fact-finding investigations.',
      ],
      pitfalls: [
        'Ignoring informal complaints until they escalate into formal tribunal claims.',
        'Allowing a manager named in the grievance to investigate the complaint themselves.',
      ],
      question: {
        question: 'Under the ACAS Code of Practice, what statutory right does an employee have when invited to a formal grievance hearing?',
        options: [
          'The right to be accompanied by a trade union representative or workplace colleague.',
          'The right to bring an external commercial barrister and television camera.',
          'The right to refuse to answer any questions while receiving full pay.',
          'The right to unilaterally dismiss their line manager.',
        ],
        correctIndex: 0,
        explanation: 'Section 10 of the Employment Relations Act 1999 guarantees the statutory right to be accompanied by a trade union official or workplace colleague.',
      },
    },
  ],

  10: [
    {
      id: 'acas-code',
      title: 'ACAS Statutory Code of Practice & 6-Step Fair Process',
      badge: 'Statutory Due Process',
      overview: 'Mastering the 6 non-negotiable steps of statutory disciplinary due process: Investigation, Written Notification, Right to Accompaniment, Disciplinary Hearing, Decision & Sanction, and Right of Appeal.',
      legalBasis: 'ACAS Statutory Code of Practice on Disciplinary and Grievance Procedures & Employment Rights Act 1996 (Section 98: Unfair Dismissal).',
      bestPractices: [
        'Separate the investigation phase from the disciplinary hearing phase (different officers).',
        'Provide all documentary evidence to the employee prior to the hearing.',
        'Always provide a formal written right of appeal to a higher, independent manager.',
      ],
      pitfalls: [
        'Deciding the sanction before holding the disciplinary hearing (pre-determination).',
        'Dismissing an employee without conducting a reasonable investigation into empirical evidence.',
      ],
      question: {
        question: 'What is the consequence at Employment Tribunal if an employer dismisses an employee without following the ACAS Code of Practice?',
        options: [
          'The dismissal is deemed procedurally unfair, and compensation awards can be increased by up to 25%.',
          'The employer is automatically dissolved.',
          'The HR manager is personally sent to prison for 10 years.',
          'No consequences as long as the manager was angry.',
        ],
        correctIndex: 0,
        explanation: 'Tribunals strictly enforce the ACAS Code; unreasonable procedural failure makes dismissals unfair and triggers up to a 25% statutory compensation uplift.',
      },
    },
    {
      id: 'case-evidence',
      title: 'Investigation Case File & Attendance Audit Linking',
      badge: 'Evidence Gathering',
      overview: 'Assembling contemporaneous evidence (attendance logs, access badge timestamps, prior informal warnings, audit trails) to establish a substantiated factual basis.',
      legalBasis: 'Burchell Test (BHS v Burchell [1978]). Employer must establish: (1) genuine belief, (2) based on reasonable grounds, (3) following a reasonable investigation.',
      bestPractices: [
        'Rely on verified empirical data rather than hearsay or second-hand gossip.',
        'Document mitigating factors raised by the employee during the investigation.',
        'Compile an indexed, paginated bundle of all evidence for both parties.',
      ],
      pitfalls: [
        'Cherry-picking evidence that supports guilt while hiding evidence that supports innocence.',
        'Failing to verify the technical accuracy of digital attendance logs.',
      ],
      question: {
        question: 'What three elements constitute the historic "Burchell Test" for establishing fair conduct dismissals in UK law?',
        options: [
          'Genuine belief in guilt, on reasonable grounds, arrived at through a reasonable investigation.',
          'Manager intuition, company profit margin, and employee age.',
          'Police arrest, criminal conviction, and immediate confession.',
          'Three verbal complaints, social media proof, and executive signoff.',
        ],
        correctIndex: 0,
        explanation: 'Under British Home Stores v Burchell, an employer must demonstrate genuine belief held on reasonable grounds following as much investigation as was reasonable in the circumstances.',
      },
    },
  ],

  11: [
    {
      id: 'total-reward',
      title: 'Total Reward Strategy (Transactional vs. Relational)',
      badge: 'Reward Architecture',
      overview: 'Designing holistic compensation frameworks balancing transactional elements (base pay, bonuses, pensions) with relational rewards (autonomy, career progression, recognition).',
      legalBasis: 'Equal Pay Act / Equality Act 2010 (Section 66: Equal Pay for Equal Work). Ensuring gender-neutral job evaluation and defensible pay structures.',
      bestPractices: [
        'Conduct regular equal pay audits to eliminate unexplainable wage gaps.',
        'Communicate the full monetary value of the total reward package to employees.',
        'Align performance incentives with long-term team collaboration rather than cut-throat individual targets.',
      ],
      pitfalls: [
        'Relying exclusively on financial salary increases to fix toxic cultural disengagement.',
        'Allowing secret off-band salary negotiations that generate gender pay inequities.',
      ],
      question: {
        question: 'What is the core distinction between transactional and relational rewards in total reward strategy?',
        options: [
          'Transactional rewards are tangible financial payments (salary, bonuses); relational rewards are intangible psychological value (recognition, development, autonomy).',
          'Transactional rewards are only for senior executives.',
          'Relational rewards are illegal under UK law.',
          'Transactional rewards cannot be taxed.',
        ],
        correctIndex: 0,
        explanation: 'Total reward integrates tangible financial elements (transactional) with intrinsic cultural, developmental, and psychological drivers (relational).',
      },
    },
  ],

  12: [
    {
      id: 'exit-diagnostics',
      title: 'Structured Exit Interview Diagnostics & Root-Cause Analysis',
      badge: 'Retention Analytics',
      overview: 'Conducting structured, neutral offboarding interviews to diagnose systemic turnover drivers, leadership friction, and competitive compensation trends before knowledge is lost.',
      legalBasis: 'CIPD Standards & Organizational Learning. Exit data provides empirical intelligence for workforce planning and retention policy revisions.',
      bestPractices: [
        'Have HR conduct exit interviews rather than the direct line manager to encourage candor.',
        'Aggregate exit themes across departments to spot recurring management failure patterns.',
        'Coordinate asset returns, IP protections, and smooth project handovers.',
      ],
      pitfalls: [
        'Treating the exit interview as an administrative formality and burying the resulting feedback.',
        'Becoming defensive when departing employees offer constructive organizational criticism.',
      ],
      question: {
        question: 'Why should structured exit interviews be conducted by an independent HR professional rather than the departing employee\'s line manager?',
        options: [
          'To ensure a neutral, psychologically safe environment where the employee can provide honest feedback without fear of retaliation or reference compromise.',
          'Because line managers are legally banned from talking to departing staff.',
          'To prevent the employee from receiving their final paycheck.',
          'To negotiate an immediate 50% salary reduction.',
        ],
        correctIndex: 0,
        explanation: 'Independent HR interviewers encourage candid disclosures regarding management friction, culture, and operational challenges that employees might conceal from direct managers.',
      },
    },
  ],
}
