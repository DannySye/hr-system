'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { VoiceInterviewRoom } from '@/components/shared/VoiceInterviewRoom'
import { TutorialPanel } from '@/components/tutorial/TutorialPanel'
import { ContinuousThreadsPanel } from '@/components/shared/ContinuousThreadsPanel'
import { EmployeeFileTimeline } from '@/components/shared/EmployeeFileTimeline'
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

  // Generic fallback state
  const [genericDeliverable, setGenericDeliverable] = useState(
    'Standard NovaLink HR deliverable record aligned with statutory employment standards.'
  )
  const [fairStepsComplete, setFairStepsComplete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      toast.success(`Day ${dayNumber} successfully submitted! Next day unlocked.`)
      router.refresh()
    } catch (err) {
      console.error(err)
      toast.error('An error occurred while submitting.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderDayWorkspace = () => {
    switch (dayNumber) {
      // WEEK 1
      case 1:
        return (
          <div className="space-y-6">
            <DepartmentManagerChat managerName="Marcus Chen" department="Network Operations" />
            <VacancyRequestForm />
            <JobDescriptionBuilder />
            <PersonSpecBuilder />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <AdvertisementBuilder />
            <ChannelSelector />
            <ApplicationsInbox />
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <ShortlistingSheet />
            <InterviewScheduler />
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-teal-700" />
                    <CardTitle className="text-base font-bold">Live Candidate Competency Interview</CardTitle>
                  </div>
                  <Badge variant="default" className="bg-teal-700 text-[10px]">
                    Candidate: Jordan Hayes
                  </Badge>
                </div>
                <CardDescription className="text-xs">
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

      case 4:
        return (
          <div className="space-y-6">
            <ReferenceCheckPanel candidateName="Jordan Hayes" refereeName="Dr. Arthur Sterling" />
            <SelectionDecisionForm />
            <OfferContractGenerator candidateName="Jordan Hayes" />
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <OnboardingChecklistBuilder employeeName="Jordan Hayes" />
            <OrientationLogger employeeName="Jordan Hayes" />
            <OrgChartAssignment employeeName="Jordan Hayes" />
          </div>
        )

      // WEEK 2
      case 6:
        return (
          <div className="space-y-6">
            <ProbationObjectiveSetter />
            <ProbationCheckin persona={persona} />
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <KpiBuilder />
            <AppraisalAccordion />
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <TrainingNeedSelector />
            <TrainingRegisterForm />
            <TrainingCheckin />
          </div>
        )

      case 9:
        return (
          <div className="space-y-6">
            <WelfareCheckin />
            <GrievanceHandler />
          </div>
        )

      case 10:
        return (
          <div className="space-y-6">
            <CaseContextCard />
            <DisciplinaryHearing />
            <FairProcessChecklist
              onChecklistChange={(_, allDone) => setFairStepsComplete(allDone)}
            />
            <CaseFileForm allFairStepsComplete={fairStepsComplete} />
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-teal-700" />
                    <CardTitle className="text-base font-bold">
                      Day {dayNumber} Strategic HR Deliverables
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    Simulation Module
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  Review organizational benchmarks and draft required strategic documentation.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 space-y-3">
                <Textarea
                  value={genericDeliverable}
                  onChange={(e) => setGenericDeliverable(e.target.value)}
                  disabled={isSubmitted}
                  className="text-xs min-h-[120px]"
                />
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal-700" />
                  <CardTitle className="text-base font-bold">Practicum Consultation Room</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <VoiceInterviewRoom
                  persona={
                    persona || {
                      name: 'Eleanor Vance',
                      personaType: PersonaType.MANAGER,
                      backgroundBrief: 'Lead HR Trainer & Practicum Director.',
                      personalityNotes: 'Supportive, pedagogically rigorous.',
                    }
                  }
                  interviewType={InterviewType.SCOPING}
                  dayNumber={dayNumber}
                />
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-3rem)] bg-[#F8F9FA]">
      {/* Frappe Sidebar */}
      <FrappeSidebar />

      {/* Main Frappe Document View */}
      <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl overflow-x-hidden">
        {/* Frappe Breadcrumbs & Actions Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-0.5">
              <Link href="/dashboard" className="hover:text-slate-900">
                Home
              </Link>
              <span>/</span>
              <Link href="/dashboard" className="hover:text-slate-900">
                HR Desk
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-800">Simulation Module {dayNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="p-1 rounded hover:bg-slate-200 text-slate-500 transition"
                title="Back to HR Desk"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Day {dayNumber}: {dayTitle}
              </h1>
              <Badge
                variant={isSubmitted ? 'default' : 'outline'}
                className={`text-[10px] ${
                  isSubmitted ? 'bg-emerald-700 text-white' : 'bg-white text-slate-700'
                }`}
              >
                {isSubmitted ? 'Submitted & Locked' : 'In Progress'}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isSubmitted ? (
              <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-200 text-xs font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Milestone Completed
              </div>
            ) : (
              <Button
                onClick={handleSubmitDay}
                disabled={isSubmitting}
                className="bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs h-8 px-4 gap-1.5 shadow-2xs"
              >
                {isSubmitting ? (
                  'Submitting Deliverables...'
                ) : (
                  <>
                    <Send className="w-3 h-3" /> Save & Submit Deliverables
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Main Work Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            {renderDayWorkspace()}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">
            <EmployeeFileTimeline
              candidateName={
                dayNumber <= 5
                  ? 'Jordan Hayes (Field Engineer Requisition)'
                  : 'Riley Morgan / Jordan Reed'
              }
              roleTitle={dayNumber <= 5 ? 'Network Operations' : 'Operations Division'}
              events={[
                {
                  id: 'ev-current',
                  dayNumber,
                  title: `Day ${dayNumber} Milestone Active`,
                  type: dayTitle.split('&')[0],
                  description: 'Active personnel cases and candidate dossiers.',
                  date: `Simulated Day ${dayNumber}`,
                },
              ]}
            />

            {dayNumber >= 6 && <ContinuousThreadsPanel currentDay={dayNumber} />}
          </div>
        </div>
      </main>

      {/* Collapsible Tutorial Panel */}
      <TutorialPanel
        phaseSlug={phaseSlug}
        title={dayTitle}
        initialEngaged={initialProgress?.engagedAt != null}
      />
    </div>
  )
}
