'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { VoiceInterviewRoom } from '@/components/shared/VoiceInterviewRoom'
import { TutorialPanel } from '@/components/tutorial/TutorialPanel'
import { ContinuousThreadsPanel } from '@/components/shared/ContinuousThreadsPanel'
import { EmployeeFileTimeline } from '@/components/shared/EmployeeFileTimeline'
import { SubtopicGuideCard } from '@/components/shared/SubtopicGuideCard'
import { DAY_SUBTOPICS } from '@/lib/simulation-subtopics'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FrappeSidebar } from '@/components/frappe/FrappeSidebar'
import Link from 'next/link'
import {
  FileText,
  Send,
  CheckCircle,
  Briefcase,
  Users,
  ShieldCheck,
  Award,
  BookOpen,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Layers,
  ChevronRight,
} from 'lucide-react'
import { toast } from 'sonner'
import { InterviewType, PersonaType, ProgressStatus } from "@/lib/types"

// Week 1 Module Components
import { VacancyRequestForm } from '@/components/day1/VacancyRequestForm'
import { DepartmentManagerChat } from '@/components/day1/DepartmentManagerChat'
import { JobDescriptionBuilder } from '@/components/day1/JobDescriptionBuilder'
import { PersonSpecBuilder } from '@/components/day1/PersonSpecBuilder'
import { AdvertisementBuilder } from '@/components/day2/AdvertisementBuilder'
import { ChannelSelector } from '@/components/day2/ChannelSelector'
import { ApplicationsInbox } from '@/components/day2/ApplicationsInbox'
import { ShortlistingSheet } from '@/components/day3/ShortlistingSheet'
import { InterviewScheduler } from '@/components/day3/InterviewScheduler'
import { InterviewAssessmentForm } from '@/components/day3/InterviewAssessmentForm'
import { ReferenceCheckPanel } from '@/components/day4/ReferenceCheckPanel'
import { SelectionDecisionForm } from '@/components/day4/SelectionDecisionForm'
import { OfferContractGenerator } from '@/components/day4/OfferContractGenerator'
import { OnboardingChecklistBuilder } from '@/components/day5/OnboardingChecklistBuilder'
import { OrientationLogger } from '@/components/day5/OrientationLogger'
import { OrgChartAssignment } from '@/components/day5/OrgChartAssignment'

// Week 2 Module Components
import { ProbationObjectiveSetter } from '@/components/day6/ProbationObjectiveSetter'
import { ProbationCheckin } from '@/components/day6/ProbationCheckin'
import { KpiBuilder } from '@/components/day7/KpiBuilder'
import { AppraisalAccordion } from '@/components/day7/AppraisalAccordion'
import { TrainingNeedSelector } from '@/components/day8/TrainingNeedSelector'
import { TrainingRegisterForm } from '@/components/day8/TrainingRegisterForm'
import { TrainingCheckin } from '@/components/day8/TrainingCheckin'
import { WelfareCheckin } from '@/components/day9/WelfareCheckin'
import { GrievanceHandler } from '@/components/day9/GrievanceHandler'
import { CaseContextCard } from '@/components/day10/CaseContextCard'
import { FairProcessChecklist } from '@/components/day10/FairProcessChecklist'
import { DisciplinaryHearing } from '@/components/day10/DisciplinaryHearing'
import { CaseFileForm } from '@/components/day10/CaseFileForm'

// Week 3 Module Components (Days 11 & 12)
import { EvidenceSummaryCard } from '@/components/day11/EvidenceSummaryCard'
import { CareerConversationCard } from '@/components/day11/CareerConversationCard'
import { CareerDevelopmentPlanForm } from '@/components/day11/CareerDevelopmentPlanForm'
import { RecognitionPromptPanel } from '@/components/day11/RecognitionPromptPanel'

import { ExitCaseSelector } from '@/components/day12/ExitCaseSelector'
import { ExitChecklist } from '@/components/day12/ExitChecklist'
import { ExitInterviewForm } from '@/components/day12/ExitInterviewForm'
import { EmployeeFileClosureCard } from '@/components/day12/EmployeeFileClosureCard'
import { CapstoneAnalyticsPanel } from '@/components/day12/CapstoneAnalyticsPanel'

interface DayModuleClientProps {
  dayNumber: number
  dayTitle: string
  phaseSlug: string
  persona: any
  initialProgress: any
  traineeId: string
}

export function DayModuleClient({
  dayNumber,
  dayTitle,
  phaseSlug,
  persona,
  initialProgress,
  traineeId,
}: DayModuleClientProps) {
  const router = useRouter()
  const [status, setStatus] = useState<ProgressStatus>(
    initialProgress?.status ?? ProgressStatus.IN_PROGRESS
  )
  const isSubmitted = status === ProgressStatus.SUBMITTED || status === ProgressStatus.GRADED

  const [genericDeliverable, setGenericDeliverable] = useState(
    'Standard NovaLink HR deliverable record aligned with statutory employment standards.'
  )
  const [fairStepsComplete, setFairStepsComplete] = useState(false)
  const [exitChecklistDone, setExitChecklistDone] = useState(false)
  const [fileAudited, setFileAudited] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const subtopics = DAY_SUBTOPICS[dayNumber] || []
  const [activeSubtopic, setActiveSubtopic] = useState(subtopics[0]?.id || 'subtopic-0')

  const handleSubmitDay = async () => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/day/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dayNumber,
          phaseSlug,
          deliverableData: { dayNumber, phaseSlug },
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Failed to submit simulation day.')
        return
      }

      setStatus(ProgressStatus.SUBMITTED)
      toast.success(
        dayNumber === 12
          ? '🎓 12-Day NovaLink HR Practicum Curriculum Fully Completed!'
          : `Day ${dayNumber} successfully submitted! Next day is now unlocked.`
      )
      router.refresh()
    } catch (err) {
      console.error(err)
      toast.error('An error occurred while submitting.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render builder matching day and subtopic
  const renderSubtopicBuilder = (subId: string) => {
    switch (dayNumber) {
      case 1:
        if (subId === 'vacancy-request') return <VacancyRequestForm />
        if (subId === 'job-description') return <JobDescriptionBuilder />
        if (subId === 'person-spec') return <PersonSpecBuilder />
        if (subId === 'manager-chat') return <DepartmentManagerChat managerName="Marcus Chen" department="Network Operations" />
        break

      case 2:
        if (subId === 'advert-builder') return <AdvertisementBuilder />
        if (subId === 'channel-selector') return <ChannelSelector />
        if (subId === 'applications-inbox') return <ApplicationsInbox />
        break

      case 3:
        if (subId === 'shortlisting') return <ShortlistingSheet />
        if (subId === 'interview-scheduling') return <InterviewScheduler />
        if (subId === 'candidate-interview') {
          return (
            <div className="space-y-6">
              <Card className="border-border shadow-2xs bg-white rounded-2xl">
                <CardHeader className="pb-3 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#2563eb]" />
                      <CardTitle className="text-base font-bold text-[#191c1e]">Live Candidate Competency Interview</CardTitle>
                    </div>
                    <Badge variant="default" className="bg-[#004ac6] text-[10px]">
                      Candidate: Jordan Hayes
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-[#737686]">
                    Conduct a live competency interview using the STAR method (Situation, Task, Action, Result).
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <VoiceInterviewRoom
                    persona={
                      persona || {
                        name: 'Jordan Hayes',
                        personaType: PersonaType.CANDIDATE,
                        qualityTier: 'STRONG',
                        backgroundBrief: 'CCNP-certified Field Engineer with 6 years experience.',
                        personalityNotes: 'Confident, structured, clear incident response steps.',
                      }
                    }
                    interviewType={InterviewType.SELECTION}
                    dayNumber={3}
                  />
                </CardContent>
              </Card>
              <InterviewAssessmentForm candidateName="Jordan Hayes" />
            </div>
          )
        }
        break

      case 4:
        if (subId === 'reference-check') return <ReferenceCheckPanel candidateName="Jordan Hayes" refereeName="Dr. Arthur Sterling" />
        if (subId === 'selection-decision') return <SelectionDecisionForm />
        if (subId === 'offer-contract') return <OfferContractGenerator candidateName="Jordan Hayes" />
        break

      case 5:
        if (subId === 'onboarding-matrix') return <OnboardingChecklistBuilder employeeName="Jordan Hayes" />
        if (subId === 'orientation-log') return <OrientationLogger employeeName="Jordan Hayes" />
        if (subId === 'org-chart') return <OrgChartAssignment employeeName="Jordan Hayes" />
        break

      case 6:
        if (subId === 'probation-objectives') return <ProbationObjectiveSetter />
        if (subId === 'probation-checkin') return <ProbationCheckin persona={persona} />
        break

      case 7:
        if (subId === 'kpi-builder') return <KpiBuilder />
        if (subId === 'appraisal-360') return <AppraisalAccordion />
        break

      case 8:
        if (subId === 'tna') return <TrainingNeedSelector />
        if (subId === 'kirkpatrick') return <TrainingRegisterForm />
        break

      case 9:
        if (subId === 'welfare-listening') return <WelfareCheckin />
        if (subId === 'grievance-handling') return <GrievanceHandler />
        break

      case 10:
        if (subId === 'acas-code') {
          return (
            <div className="space-y-6">
              <CaseContextCard />
              <FairProcessChecklist
                onChecklistChange={(_, allDone) => setFairStepsComplete(allDone)}
              />
            </div>
          )
        }
        if (subId === 'case-evidence') {
          return (
            <div className="space-y-6">
              <DisciplinaryHearing />
              <CaseFileForm allFairStepsComplete={fairStepsComplete} />
            </div>
          )
        }
        break

      case 11:
        if (subId === 'evidence-summary') return <EvidenceSummaryCard />
        if (subId === 'career-conversation') return <CareerConversationCard />
        if (subId === 'career-plan') return <CareerDevelopmentPlanForm />
        if (subId === 'recognition-prompt') return <RecognitionPromptPanel />
        break

      case 12:
        if (subId === 'exit-case-selector') return <ExitCaseSelector />
        if (subId === 'exit-checklist') return <ExitChecklist onChecklistCompleted={() => setExitChecklistDone(true)} />
        if (subId === 'exit-interview') return <ExitInterviewForm isUnlocked={exitChecklistDone} />
        if (subId === 'file-closure') return <EmployeeFileClosureCard onFileViewed={() => setFileAudited(true)} />
        if (subId === 'capstone-analytics') return <CapstoneAnalyticsPanel fileViewed={fileAudited} onCapstoneSubmitted={() => setStatus(ProgressStatus.SUBMITTED)} />
        break

      default:
        return (
          <Card className="border-border bg-white rounded-2xl p-6 shadow-2xs">
            <CardHeader className="px-0 pt-0 pb-3">
              <CardTitle className="text-sm font-bold text-[#191c1e]">Practicum Deliverable Record</CardTitle>
              <CardDescription className="text-xs text-[#737686]">
                Provide your statutory analysis and structured proposal for Day {dayNumber}.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pb-0 space-y-3">
              <Textarea
                value={genericDeliverable}
                onChange={(e) => setGenericDeliverable(e.target.value)}
                className="text-xs min-h-[140px] bg-[#f7f9fb] border-border rounded-lg"
              />
            </CardContent>
          </Card>
        )
    }
    return null
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-[#f7f9fb]">
      {/* Sidebar */}
      <FrappeSidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-8 space-y-6 max-w-7xl overflow-x-hidden">
        {/* Breadcrumb & Day Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#737686] mb-1">
              <Link href="/dashboard" className="hover:text-[#191c1e]">Training Lab</Link>
              <span>/</span>
              <span className="text-[#2563eb] font-semibold">Day {dayNumber} Practicum</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#191c1e] flex items-center gap-2.5">
              Day {dayNumber}: {dayTitle}
              <Badge
                variant={isSubmitted ? 'default' : 'outline'}
                className={`text-[10px] ${
                  isSubmitted
                    ? 'bg-[#004ac6] text-white'
                    : 'bg-[#dbe1ff] text-[#00174b] border-[#b4c5ff]'
                }`}
              >
                {status}
              </Badge>
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs font-semibold gap-1.5 border-border bg-white hover:bg-[#f2f4f6] text-[#191c1e]"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Console
              </Button>
            </Link>
            <Button
              size="sm"
              onClick={handleSubmitDay}
              disabled={isSubmitting || isSubmitted}
              className="h-8 text-xs font-bold bg-[#2563eb] hover:bg-[#1d4ed8] text-white gap-1.5 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitted ? 'Day Submitted ✓' : isSubmitting ? 'Submitting...' : `Submit Day ${dayNumber} Dossier`}</span>
            </Button>
          </div>
        </div>

        {/* 12-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Left Area (8 cols): Subtopics & Hands-on Workspaces */}
          <div className="lg:col-span-8 space-y-6">
            {subtopics.length > 0 ? (
              <div className="space-y-6">
                {/* Subtopic Segmented Navigation Tabs */}
                <div className="bg-white rounded-2xl border border-border p-2 shadow-2xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#737686] px-3 py-1.5">
                    Day {dayNumber} Modular Sub-Topics ({subtopics.length} Modules)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5">
                    {subtopics.map((st, idx) => {
                      const isActive = activeSubtopic === st.id
                      return (
                        <button
                          key={st.id}
                          onClick={() => setActiveSubtopic(st.id)}
                          className={`p-2.5 rounded-xl text-left text-xs transition flex flex-col justify-between gap-1.5 ${
                            isActive
                              ? 'bg-[#d0e1fb] border border-[#b4c5ff] text-[#0b1c30] font-bold shadow-2xs'
                              : 'bg-[#f7f9fb] border border-border/60 text-[#434655] hover:bg-[#f2f4f6]'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="text-[10px] font-mono text-[#004ac6] font-bold">
                              Topic {idx + 1}
                            </span>
                            <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
                          </div>
                          <span className="line-clamp-2 leading-tight text-[11px]">
                            {st.title}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Active Sub-topic Guide & Hands-on Builder */}
                {subtopics.map((st) => {
                  if (st.id !== activeSubtopic) return null
                  return (
                    <div key={st.id} className="space-y-6 animate-in fade-in duration-150">
                      {/* 1. Subtopic Guide Card with Overview, Legal Basis & Interactive Question */}
                      <SubtopicGuideCard
                        title={st.title}
                        badgeText={st.badge}
                        overview={st.overview}
                        legalBasis={st.legalBasis}
                        bestPractices={st.bestPractices}
                        pitfalls={st.pitfalls}
                        question={st.question}
                      />

                      {/* 2. Subtopic Hands-on Interactive Tool */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between px-1">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#737686] flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-[#2563eb]" /> Practitioner Execution Tool
                          </h4>
                          <span className="text-[10px] text-[#004ac6] font-semibold">Active Module</span>
                        </div>
                        {renderSubtopicBuilder(st.id)}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              /* Fallback standard render */
              <div className="space-y-6">
                <Card className="border-border bg-white rounded-2xl p-6 shadow-2xs">
                  <CardHeader className="px-0 pt-0 pb-3">
                    <CardTitle className="text-base font-bold text-[#191c1e]">Simulation Workspace</CardTitle>
                    <CardDescription className="text-xs text-[#737686]">
                      Execute your daily human resources deliverable below.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <Textarea
                      value={genericDeliverable}
                      onChange={(e) => setGenericDeliverable(e.target.value)}
                      className="text-xs min-h-[140px] bg-[#f7f9fb] border-border rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Right Sidebar Area (4 cols): Tutorial Knowledge Base & Audit */}
          <div className="lg:col-span-4 space-y-6">
            <TutorialPanel phaseSlug={phaseSlug} />
            <ContinuousThreadsPanel currentDay={dayNumber} />
            <EmployeeFileTimeline candidateName="Jordan Hayes" roleTitle="Field Engineer" />
          </div>
        </div>
      </main>
    </div>
  )
}
