'use client'

import React, { useState, useEffect } from 'react'
import {
  BookOpen,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { KnowledgeCheck } from './KnowledgeCheck'
import { ScenarioDecision } from './ScenarioDecision'
import { TryItNow } from './TryItNow'
import { ReflectionPrompt } from './ReflectionPrompt'
import Link from 'next/link'

interface TutorialPanelProps {
  phaseSlug: string
  title?: string
  initialEngaged?: boolean
  children?: React.ReactNode
}

export function TutorialPanel({
  phaseSlug,
  title = 'HR Practicum Tutorial',
  initialEngaged = false,
  children,
}: TutorialPanelProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [isEngaged, setIsEngaged] = useState(initialEngaged)

  useEffect(() => {
    const checkEngagement = async () => {
      try {
        const res = await fetch(`/api/tutorial/progress?phaseSlug=${encodeURIComponent(phaseSlug)}`)
        if (res.ok) {
          const data = await res.json()
          if (data.engagedAt) {
            setIsEngaged(true)
          }
        }
      } catch (e) {
        console.error('Error fetching tutorial progress:', e)
      }
    }
    checkEngagement()
  }, [phaseSlug])

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-0 top-24 z-40 flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white py-2.5 px-3 rounded-l-lg shadow-lg text-xs font-semibold transition"
          aria-label="Open Tutorial Panel"
        >
          <BookOpen className="w-4 h-4" />
          <span>Interactive Tutorial</span>
          {isEngaged ? (
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          ) : (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          )}
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      <aside
        className={`fixed top-0 right-0 z-40 h-screen w-[440px] max-w-[90vw] bg-white border-l border-slate-200 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-teal-100 text-teal-800 rounded-md">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Simulation Guide
              </h3>
              <p className="text-sm font-semibold text-slate-900 line-clamp-1">{title}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Link
              href={`/tutorials/${phaseSlug}`}
              target="_blank"
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-md"
              title="Open full page view"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-md"
              aria-label="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          className={`px-4 py-2.5 text-xs font-medium flex items-center justify-between border-b ${
            isEngaged
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-amber-50 text-amber-900 border-amber-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {isEngaged ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span>
              {isEngaged
                ? 'Gating requirement satisfied'
                : 'Complete Knowledge Check & Scenario to unlock Day Submission'}
            </span>
          </div>
          <Badge variant={isEngaged ? 'success' : 'warning'} className="text-[10px]">
            {isEngaged ? 'Engaged' : 'Required'}
          </Badge>
        </div>

        <div className="flex-1 overflow-y-auto p-5 text-sm text-slate-700 space-y-4 prose-sm max-w-none">
          {children ? children : <DynamicTutorialContent phaseSlug={phaseSlug} />}
        </div>

        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>NovaLink HR Learning Lab</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="text-xs h-7"
          >
            Hide Panel
          </Button>
        </div>
      </aside>
    </>
  )
}

export function DynamicTutorialContent({ phaseSlug }: { phaseSlug: string }) {
  switch (phaseSlug) {
    // ------------------------------------------------------------------------
    // WEEK 1 TUTORIALS (DAYS 1 TO 5)
    // ------------------------------------------------------------------------
    case 'workforce-planning':
      return (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Phase 1: Workforce Planning & Job Analysis</h2>
          <p className="text-xs leading-relaxed text-slate-600">
            Distinguish between Job Descriptions (the role) and Person Specifications (the person). Ensure essential criteria are genuine occupational requirements under the Equality Act 2010.
          </p>
          <TryItNow label="Open the manager scoping chat" href="#manager-chat" />
          <ScenarioDecision
            id="wp-sc-1"
            phaseSlug="workforce-planning"
            prompt="The department manager tells you: 'just copy last year's job description, nothing's really changed.' What do you do?"
            options={[
              {
                id: "copy",
                label: "Copy it directly and move on — the manager knows best.",
                consequence: "Weak move: Outdated duties mislead candidates, causing mismatched applications."
              },
              {
                id: "verify",
                label: "Use it as a starting draft, but verify each requirement against current network needs.",
                consequence: "High-impact HR leadership: You uncover new fiber optics tools and save a costly hiring mismatch."
              }
            ]}
          />
          <KnowledgeCheck
            id="wp-kc-1"
            phaseSlug="workforce-planning"
            questions={[
              {
                prompt: "What is the primary difference between a job description and a person specification?",
                options: [
                  { id: "a", text: "They are identical documents" },
                  { id: "b", text: "A job description describes the job; a person specification describes the ideal person for it" },
                  { id: "c", text: "A person specification is only used for senior executives" }
                ],
                correctId: "b",
                explanation: "Job description = role duties and deliverables. Person specification = essential and desirable qualifications/skills."
              }
            ]}
          />
          <ReflectionPrompt phaseSlug="workforce-planning" question="Which field in the person specification are you most tempted to mark 'essential' when it's really just 'desirable'?" />
        </div>
      )

    case 'recruitment':
    case 'sourcing-strategy':
      return (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Phase 2: Sourcing Strategy & Adverts</h2>
          <p className="text-xs leading-relaxed text-slate-600">
            Recruitment is about reaching the right candidate pool. Channel fit matters more than channel volume.
          </p>
          <TryItNow label="Open the advertisement builder" href="#ad-builder" />
          <ScenarioDecision
            id="rec-sc-1"
            phaseSlug="recruitment"
            prompt="Under time pressure, you consider posting the vacancy on every possible channel indiscriminately. What is the better move?"
            options={[
              {
                id: "everywhere",
                label: "Post everywhere — more reach cannot hurt.",
                consequence: "Inefficient: You get flooded with unqualified applicants, tripling shortlisting time."
              },
              {
                id: "targeted",
                label: "Select 2-3 channels that specifically reach certified technical candidates.",
                consequence: "Strategic HR: You attract a high-quality pool of relevant applicants, making shortlisting swift and effective."
              }
            ]}
          />
          <KnowledgeCheck
            id="rec-kc-1"
            phaseSlug="recruitment"
            questions={[
              {
                prompt: "What core components should every effective job advertisement clearly state?",
                options: [
                  { id: "a", text: "Position, duties, qualifications, location, how to apply, closing date" },
                  { id: "b", text: "Salary history requirements and age brackets" },
                  { id: "c", text: "Company mission statement only" }
                ],
                correctId: "a",
                explanation: "Clearly communicating role parameters and deadlines filters candidates before application."
              }
            ]}
          />
          <ReflectionPrompt phaseSlug="recruitment" question="How does targeted sourcing prevent unconscious demographic bias in the applicant pool?" />
        </div>
      )

    case 'selection':
    case 'selection-shortlisting':
      return (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Phase 3: Selection & Structured Interviewing</h2>
          <p className="text-xs leading-relaxed text-slate-600">
            Consistent scoring criteria beat subjective gut feeling. Use the STAR method (Situation, Task, Action, Result) to evaluate behavioural competencies.
          </p>
          <TryItNow label="Open the shortlisting sheet" href="#shortlisting-sheet" />
          <ScenarioDecision
            id="sel-sc-1"
            phaseSlug="selection"
            prompt="A candidate gives a vague answer to an emergency troubleshooting question. What is your move?"
            options={[
              {
                id: "accept",
                label: "Accept it and move to the next question.",
                consequence: "Weak evidence: You have no concrete data on their actual diagnostic procedure."
              },
              {
                id: "probe",
                label: "Ask a specific follow-up requesting a concrete, structured STAR example.",
                consequence: "Solid interviewing: The follow-up surfaces their optical diagnostic method, giving you solid scoring evidence."
              }
            ]}
          />
          <KnowledgeCheck
            id="sel-kc-1"
            phaseSlug="selection"
            questions={[
              {
                prompt: "What does the STAR framework stand for in competency interviewing?",
                options: [
                  { id: "a", text: "Skills, Training, Attitude, Results" },
                  { id: "b", text: "Situation, Task, Action, Result" },
                  { id: "c", text: "Standard Technical Assessment Rubric" }
                ],
                correctId: "b",
                explanation: "STAR grounds candidate answers in concrete behavioral actions rather than abstract generalities."
              }
            ]}
          />
          <ReflectionPrompt phaseSlug="selection" question="Why must every candidate be evaluated on the same criteria, even those you suspect are weak?" />
        </div>
      )

    case 'hiring':
    case 'offer-letters':
      return (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Phase 4: Hiring, References & Contracts</h2>
          <p className="text-xs leading-relaxed text-slate-600">
            Verify employment history through structured reference checks, document an evidence-based selection justification, and issue statutory employment terms under the UK Employment Rights Act 1996.
          </p>
          <TryItNow label="Open the reference check panel" href="#reference-check" />
          <ScenarioDecision
            id="hire-sc-1"
            phaseSlug="hiring"
            prompt="The reference check is positive but mentions occasional early-career punctuality struggles. What do you do?"
            options={[
              {
                id: "ignore",
                label: "Ignore it — the interview was strong enough.",
                consequence: "Risky: You miss the chance to set proactive expectations."
              },
              {
                id: "note",
                label: "Note the feedback in the record and establish clear punctuality expectations in Day 6 probation objectives.",
                consequence: "Prudent HR management: You verify capabilities while establishing proactive support structures."
              }
            ]}
          />
          <KnowledgeCheck
            id="hire-kc-1"
            phaseSlug="hiring"
            questions={[
              {
                prompt: "What makes a formal selection decision record defensible?",
                options: [
                  { id: "a", text: "Simply stating the candidate was 'the best cultural fit'" },
                  { id: "b", text: "Citing empirical evidence: interview scores, verified references, and essential criteria" },
                  { id: "c", text: "Length alone — longer justifications are automatically defensible" }
                ],
                correctId: "b",
                explanation: "Evidence-based decision records explain *why* a candidate was selected based on measurable benchmarks."
              }
            ]}
          />
          <ReflectionPrompt phaseSlug="hiring" question="Why is an employment contract considered a bilateral governance document rather than just company paperwork?" />
        </div>
      )

    case 'onboarding':
    case 'onboarding-induction':
      return (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Phase 5: Onboarding & Orientation</h2>
          <p className="text-xs leading-relaxed text-slate-600">
            Structure induction across the 3 core pillars: About the Company, About the Job, and Statutory Workplace Rules. Establish clear supervisory reporting lines on Day 1.
          </p>
          <TryItNow label="Open the onboarding checklist" href="#onboarding-checklist" />
          <ScenarioDecision
            id="onb-sc-1"
            phaseSlug="onboarding"
            prompt="You are pressed for time and tempted to skip the 'Workplace Rules' onboarding pillar. What is the better move?"
            options={[
              {
                id: "skip",
                label: "Skip it — most workplace rules are obvious anyway.",
                consequence: "Compounding friction: The new hire is unsure of sickness notification procedures and violates on-call protocols."
              },
              {
                id: "include",
                label: "Include it properly, ensuring statutory rules and escalation SOPs are understood.",
                consequence: "High retention: The employee understands all operational procedures and begins work safely."
              }
            ]}
          />
          <KnowledgeCheck
            id="onb-kc-1"
            phaseSlug="onboarding"
            questions={[
              {
                prompt: "What are the three essential pillars of a balanced employee onboarding matrix?",
                options: [
                  { id: "a", text: "Salary, benefits, and parking" },
                  { id: "b", text: "Company culture, job deliverables, and statutory workplace rules" },
                  { id: "c", text: "Social events only" }
                ],
                correctId: "b",
                explanation: "A complete induction covers organizational context, role competence, and workplace governance."
              }
            ]}
          />
          <ReflectionPrompt phaseSlug="onboarding" question="Why is assigning a direct line manager immediately on Day 1 vital for the Day 6 probation process?" />
        </div>
      )

    // ------------------------------------------------------------------------
    // WEEK 2 TUTORIALS (DAYS 6 TO 10)
    // ------------------------------------------------------------------------
    case 'probation':
      return (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Phase 6: Probation & Attendance</h2>
          <p className="text-xs leading-relaxed text-slate-600">
            Probation is a structured operational checkpoint. Set clear benchmarks on Day 1, conduct regular check-ins, and monitor the live continuous attendance register.
          </p>
          <TryItNow label="Open the probation objective setter" href="#probation-objectives" />
          <ScenarioDecision
            id="prob-sc-1"
            phaseSlug="probation"
            prompt="It's week one of probation and the new employee is quiet in the check-in. How do you handle this?"
            options={[
              {
                id: "light",
                label: "Keep it light — they're new, don't put them on the spot.",
                consequence: "Weak move: You miss an early signal regarding confusing warehouse SOPs."
              },
              {
                id: "gentle-probe",
                label: "Ask specific, supportive open questions regarding software tools and blockers.",
                consequence: "High-impact HR move: You uncover an access issue and resolve it promptly."
              }
            ]}
          />
          <KnowledgeCheck
            id="prob-kc-1"
            phaseSlug="probation"
            questions={[
              {
                prompt: "What is the primary danger of waiting until the end of probation to evaluate a new employee?",
                options: [
                  { id: "a", text: "There is no danger; that is standard" },
                  { id: "b", text: "It misses the opportunity to correct early, addressable performance gaps" },
                  { id: "c", text: "Probation checkpoints are illegal under employment law" }
                ],
                correctId: "b",
                explanation: "Regular checkpoints allow HR to support the new hire while there is still time to rectify problems."
              }
            ]}
          />
          <ReflectionPrompt phaseSlug="probation" question="How do you balance empathy and accountability during a Week 1 probation check-in?" />
        </div>
      )

    case 'performance-management':
      return (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Phase 7: Performance Management</h2>
          <p className="text-xs leading-relaxed text-slate-600">
            Triangulate performance using 360-degree feedback from the employee, direct supervisor, and peer colleague before synthesizing developmental needs.
          </p>
          <TryItNow label="Open the KPI builder" href="#kpi-builder" />
          <ScenarioDecision
            id="perf-sc-1"
            phaseSlug="performance-management"
            prompt="Self-assessment and supervisor notes conflict on delivery speed. How do you synthesize?"
            options={[
              {
                id: "pick-one",
                label: "Pick only the manager's view to preserve hierarchy.",
                consequence: "Ineffective: Papering over disagreement hides real delivery bottlenecks."
              },
              {
                id: "surface",
                label: "Note the disagreement explicitly and schedule a facilitated alignment session.",
                consequence: "Strong HR leadership: Acknowledging differences enables constructive root-cause resolution."
              }
            ]}
          />
          <KnowledgeCheck
            id="perf-kc-1"
            phaseSlug="performance-management"
            questions={[
              {
                prompt: "What is the primary benefit of 360-degree feedback?",
                options: [
                  { id: "a", text: "It replaces manager reviews with automated ratings" },
                  { id: "b", text: "It eliminates single-rater bias by triangulating multiple perspectives" },
                  { id: "c", text: "It guarantees an automatic salary increase" }
                ],
                correctId: "b",
                explanation: "Multi-angle feedback provides a comprehensive evaluation of technical and collaborative competencies."
              }
            ]}
          />
          <ReflectionPrompt phaseSlug="performance-management" question="How do you synthesize conflicting appraisal feedback fairly?" />
        </div>
      )

    case 'training-development':
      return (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Phase 8: Learning & Development</h2>
          <p className="text-xs leading-relaxed text-slate-600">
            Bridge performance appraisal training needs with catalog course scheduling and Kirkpatrick Level 3 behavioral application reviews.
          </p>
          <TryItNow label="Open the training need selector" href="#training-need" />
          <ScenarioDecision
            id="train-sc-1"
            phaseSlug="training-development"
            prompt="You logged a training session as 'Completed'. Is your HR duty fulfilled?"
            options={[
              {
                id: "yes",
                label: "Yes — attendance is recorded, move on.",
                consequence: "Incomplete: Without post-training verification, you cannot assess behavioral change on the job."
              },
              {
                id: "check",
                label: "No — conduct a brief check-in to assess on-the-job application (Kirkpatrick Level 3).",
                consequence: "Best practice: You verify that training was effectively transferred to daily work."
              }
            ]}
          />
          <KnowledgeCheck
            id="train-kc-1"
            phaseSlug="training-development"
            questions={[
              {
                prompt: "Which Kirkpatrick level measures whether training changed on-the-job behavior?",
                options: [
                  { id: "a", text: "Level 1 (Reaction)" },
                  { id: "b", text: "Level 2 (Learning)" },
                  { id: "c", text: "Level 3 (Behavior / Application)" }
                ],
                correctId: "c",
                explanation: "Level 3 evaluates whether skills acquired in training are actively applied in daily work."
              }
            ]}
          />
          <ReflectionPrompt phaseSlug="training-development" question="How does HR ensure training investments yield genuine behavioral improvements?" />
        </div>
      )

    case 'employee-welfare':
      return (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Phase 9: Welfare & Grievance</h2>
          <p className="text-xs leading-relaxed text-slate-600">
            Handling workplace grievances requires empathetic active listening before jumping to premature solutions.
          </p>
          <TryItNow label="Open the welfare check-in" href="#welfare-checkin" />
          <ScenarioDecision
            id="wel-sc-1"
            phaseSlug="employee-welfare"
            prompt="An employee presents an emotional grievance regarding excessive overtime. What is your first move?"
            options={[
              {
                id: "solve-fast",
                label: "Immediately offer a schedule adjustment in your first reply.",
                consequence: "Weak move: The employee feels dismissed, and the root teammate shortage remains unaddressed."
              },
              {
                id: "listen-first",
                label: "Acknowledge the emotional strain and ask clarifying questions first.",
                consequence: "Empathetic, effective HR: The employee feels heard and collaborates constructively on a capacity plan."
              }
            ]}
          />
          <KnowledgeCheck
            id="wel-kc-1"
            phaseSlug="employee-welfare"
            questions={[
              {
                prompt: "Why must HR prioritize active listening over premature solutions in grievance handling?",
                options: [
                  { id: "a", text: "To delay committing company resources" },
                  { id: "b", text: "Premature solutions risk missing systemic root causes and leave employees feeling dismissed" },
                  { id: "c", text: "It is required only when lawyers are present" }
                ],
                correctId: "b",
                explanation: "Listening validates the employee and ensures agreed resolutions address true underlying causes."
              }
            ]}
          />
          <ReflectionPrompt phaseSlug="employee-welfare" question="How do you maintain professional neutrality during a grievance?" />
        </div>
      )

    case 'discipline':
      return (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Phase 10: Disciplinary Procedures</h2>
          <p className="text-xs leading-relaxed text-slate-600">
            Procedural fairness under the ACAS Code of Practice requires following the 6 mandatory steps in strict sequence.
          </p>
          <TryItNow label="Review the case context" href="#case-context" />
          <ScenarioDecision
            id="disc-sc-1"
            phaseSlug="discipline"
            prompt="In the hearing, the employee explains that signaling delays on the train caused their lateness. How do you weigh this?"
            options={[
              {
                id: "dismiss",
                label: "Dismiss it — lateness is lateness regardless of reasons.",
                consequence: "Disproportionate: Ignoring verifiable mitigating transport disruption leads to an unfair penalty."
              },
              {
                id: "context",
                label: "Factor in the transport context, but address the failure to notify management in advance.",
                consequence: "Proportionate & fair: You issue a First Written Warning with a 30-day punctuality monitoring plan."
              }
            ]}
          />
          <KnowledgeCheck
            id="disc-kc-1"
            phaseSlug="discipline"
            questions={[
              {
                prompt: "What is the mandatory first step in a statutory fair disciplinary procedure?",
                options: [
                  { id: "a", text: "Issue a written sanction" },
                  { id: "b", text: "Identify the specific issue and establish the objective facts" },
                  { id: "c", text: "Suspend the employee immediately" }
                ],
                correctId: "b",
                explanation: "A fair disciplinary process starts with identifying the issue and gathering empirical evidence before any decision is made."
              }
            ]}
          />
          <ReflectionPrompt phaseSlug="discipline" question="Why is procedural sequence just as legally critical as whether misconduct occurred?" />
        </div>
      )

    default:
      return (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Phase 1: Workforce Planning & Job Analysis</h2>
          <p className="text-xs leading-relaxed text-slate-600">
            Distinguish between Job Descriptions (the role) and Person Specifications (the person), and verify requirements with the hiring manager.
          </p>
          <TryItNow label="Open the manager scoping chat" href="#manager-chat" />
          <ScenarioDecision
            id="wp-sc-1"
            phaseSlug="workforce-planning"
            prompt="The manager tells you 'just copy last year's JD, nothing changed.' What do you do?"
            options={[
              {
                id: "copy",
                label: "Copy it directly and publish immediately.",
                consequence: "Weak move: The role duties shifted significantly after a cloud migration."
              },
              {
                id: "verify",
                label: "Use it as a baseline draft, but verify tech stack changes in a 15-min call.",
                consequence: "High-impact HR move: You clarify essential criteria and prevent mismatched applicants."
              }
            ]}
          />
          <KnowledgeCheck
            id="wp-kc-1"
            phaseSlug="workforce-planning"
            questions={[
              {
                prompt: "What is the primary difference between a job description and a person specification?",
                options: [
                  { id: "a", text: "They are identical documents" },
                  { id: "b", text: "A job description describes the job; a person specification describes the ideal person for it" },
                  { id: "c", text: "A person specification is only used for senior roles" }
                ],
                correctId: "b",
                explanation: "Job description = duties and deliverables. Person specification = essential and desirable criteria."
              }
            ]}
          />
          <ReflectionPrompt phaseSlug="workforce-planning" question="What biases should HR guard against when writing job specifications?" />
        </div>
      )
  }
}
