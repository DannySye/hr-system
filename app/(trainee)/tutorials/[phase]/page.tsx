import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { DynamicTutorialContent } from '@/components/tutorial/TutorialPanel'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default async function StandaloneTutorialPage({
  params,
}: {
  params: { phaseSlug: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect('/login')
  }

  const { phaseSlug } = params

  const phaseNames: Record<string, string> = {
    'workforce-planning': 'Phase 1: Workforce Planning & Job Analysis',
    'sourcing-strategy': 'Phase 2: Sourcing Strategy & Job Adverts',
    'selection-shortlisting': 'Phase 3: Selection Shortlisting & Interviewing',
    'offer-letters': 'Phase 4: Offer Letters & Employment Contracts',
    'onboarding-induction': 'Phase 5: Onboarding & Induction Design',
    'probation': 'Phase 6: Probationary Review & Attendance Register',
    'performance-management': 'Phase 7: Performance Appraisal & 360 Feedback',
    'training-development': 'Phase 8: Learning & Development Needs Analysis',
    'employee-welfare': 'Phase 9: Employee Welfare & Grievance Procedures',
    'discipline': 'Phase 10: Disciplinary & Statutory Fair Process',
    'reward-recognition': 'Phase 11: Total Reward & Recognition Policies',
    'exit-interviews': 'Phase 12: Exit Interviews & Offboarding Synthesis',
  }

  const phaseTitle = phaseNames[phaseSlug] || `Tutorial Module: ${phaseSlug}`

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard">
          <Button variant="outline" size="sm" className="text-xs gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Dashboard
          </Button>
        </Link>
        <Badge variant="default" className="bg-teal-700 text-[10px]">
          Knowledge Hub Tutorial
        </Badge>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-lg font-bold text-slate-900">{phaseTitle}</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Interactive guide with embedded Knowledge Checks, real-world Scenario Decisions, and application tips.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          <DynamicTutorialContent phaseSlug={phaseSlug} />
        </CardContent>
      </Card>
    </div>
  )
}
