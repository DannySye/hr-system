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

export default async function TrainerTutorialEditorPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== 'TRAINER') {
    redirect('/login')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/trainer/dashboard">
          <Button variant="outline" size="sm" className="text-xs gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Trainer Dashboard
          </Button>
        </Link>
        <Badge variant="default" className="bg-teal-700 text-[10px]">
          Trainer MDX Previewer
        </Badge>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-lg font-bold text-slate-900">
              Interactive Tutorial Engine Preview
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            Preview the interactive KnowledgeCheck, ScenarioDecision, and TryItNow components experienced by trainees.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 space-y-8">
          <DynamicTutorialContent phaseSlug="discipline" />
        </CardContent>
      </Card>
    </div>
  )
}
