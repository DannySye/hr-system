import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Database, Building2, Users, Bot, RefreshCw, PlusCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { SeedActionsClient } from './SeedActionsClient'

export default async function TrainerSeedPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== 'TRAINER') {
    redirect('/login')
  }

  const company = await prisma.company.findFirst({
    include: {
      departments: {
        include: {
          positions: true,
        },
      },
    },
  })

  const personas = await prisma.aiPersona.findMany({
    orderBy: { personaType: 'asc' },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/trainer/dashboard" className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Database className="w-6 h-6 text-teal-700" />
            NovaLink Organizational & Persona Seed Console
          </h1>
          <p className="text-xs text-slate-500">
            Configure company hierarchy, departments, positions, and AI persona profiles used in simulation scenarios.
          </p>
        </div>

        <SeedActionsClient />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company & Department Hierarchy */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-teal-700" />
              <CardTitle className="text-base font-bold">
                {company?.name || 'NovaLink Global'} — Structure
              </CardTitle>
            </div>
            <CardDescription className="text-xs">
              {company?.mission || 'Pioneering distributed infrastructure and connected global teams.'}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Departments & Positions
            </h4>

            {company?.departments && company.departments.length > 0 ? (
              <div className="space-y-4">
                {company.departments.map((dept) => (
                  <div key={dept.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-xs text-slate-900">{dept.name}</h5>
                      <Badge variant="secondary" className="text-[10px]">
                        Head: {dept.headOfDept || 'Unassigned'}
                      </Badge>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {dept.positions.map((pos) => (
                        <div key={pos.id} className="p-2.5 rounded bg-white border border-slate-100 text-xs flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-slate-800">{pos.title}</span>
                            <div className="text-[10px] text-slate-500">{pos.salaryBand} • {pos.location}</div>
                          </div>
                          <Badge variant="outline" className="text-[9px]">
                            {pos.workingHours || 'Full-time'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No departments seeded yet. Click &quot;Verify / Reset Default Seed&quot; above.</p>
            )}
          </CardContent>
        </Card>

        {/* AI Personas Bank */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-teal-700" />
              <CardTitle className="text-base font-bold">Configured AI Personas</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Simulated candidates, hiring managers, and employees that interact in real-time interviews.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            {personas.length > 0 ? (
              personas.map((persona) => (
                <div key={persona.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{persona.name}</span>
                      <Badge variant="default" className="text-[10px] bg-teal-700">
                        {persona.personaType}
                      </Badge>
                    </div>
                    {persona.qualityTier && (
                      <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                        Tier: {persona.qualityTier}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {persona.backgroundBrief}
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    <strong>Style:</strong> {persona.personalityNotes}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No personas found. Run seed script.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
