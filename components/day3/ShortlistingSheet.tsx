'use client'

import React, { useState } from 'react'
import { Filter, CheckSquare, Star, ChevronDown, ChevronUp, Check } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

interface CandidateScore {
  id: string
  name: string
  qualifications: number
  technical: number
  experience: number
  communication: number
  problemSolving: number
  teamwork: number
  availability: number
  shortlisted: boolean
}

export function ShortlistingSheet({
  onShortlistChange,
}: {
  onShortlistChange?: (shortlist: string[]) => void
}) {
  const [candidates, setCandidates] = useState<CandidateScore[]>([
    {
      id: 'c1',
      name: 'Jordan Hayes',
      qualifications: 5,
      technical: 5,
      experience: 5,
      communication: 4,
      problemSolving: 5,
      teamwork: 4,
      availability: 5,
      shortlisted: true,
    },
    {
      id: 'c2',
      name: 'Casey Rivera',
      qualifications: 3,
      technical: 3,
      experience: 3,
      communication: 4,
      problemSolving: 3,
      teamwork: 4,
      availability: 4,
      shortlisted: true,
    },
    {
      id: 'c3',
      name: 'Morgan Blake',
      qualifications: 4,
      technical: 4,
      experience: 4,
      communication: 3,
      problemSolving: 4,
      teamwork: 4,
      availability: 4,
      shortlisted: false,
    },
    {
      id: 'c4',
      name: 'Sam Taylor',
      qualifications: 1,
      technical: 1,
      experience: 1,
      communication: 2,
      problemSolving: 1,
      teamwork: 2,
      availability: 4,
      shortlisted: false,
    },
  ])

  const [expandedId, setExpandedId] = useState<string | null>('c1')

  const updateScore = (id: string, field: keyof CandidateScore, val: number) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: val } : c))
    )
  }

  const toggleShortlist = (id: string) => {
    setCandidates((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, shortlisted: !c.shortlisted } : c))
      const shortlistedNames = next.filter((c) => c.shortlisted).map((c) => c.name)
      if (onShortlistChange) onShortlistChange(shortlistedNames)
      return next
    })
    toast.success('Shortlisting status updated.')
  }

  const computeTotal = (c: CandidateScore) => {
    return (
      c.qualifications * 1.5 +
      c.technical * 2.0 +
      c.experience * 2.0 +
      c.communication * 1.0 +
      c.problemSolving * 1.5 +
      c.teamwork * 1.0 +
      c.availability * 1.0
    ).toFixed(1)
  }

  return (
    <Card id="shortlisting-sheet" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">Standardized Candidate Shortlisting Matrix</CardTitle>
          </div>
          <Badge variant="outline" className="text-[10px] bg-teal-50 text-teal-800 border-teal-200">
            Weighted Matrix
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Score all applicants on uniform criteria to prevent unconscious bias and create an auditable selection paper trail.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 space-y-3">
        {candidates.map((cand) => {
          const isExpanded = expandedId === cand.id
          const totalScore = computeTotal(cand)

          return (
            <div
              key={cand.id}
              className={`rounded-lg border transition ${
                cand.shortlisted
                  ? 'border-teal-400 bg-teal-50/30 ring-1 ring-teal-300'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : cand.id)}
                className="p-3.5 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                    {cand.name[0]}
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{cand.name}</h4>
                    <span className="text-[11px] text-slate-500">
                      Weighted Score: <strong>{totalScore} / 50.0</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                  <Button
                    size="sm"
                    variant={cand.shortlisted ? 'default' : 'outline'}
                    onClick={() => toggleShortlist(cand.id)}
                    className={`text-xs h-7 px-3 gap-1 ${
                      cand.shortlisted
                        ? 'bg-teal-700 hover:bg-teal-800 text-white'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    {cand.shortlisted ? 'Shortlisted' : 'Shortlist Candidate'}
                  </Button>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : cand.id)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expandable Scoring Panel */}
              {isExpanded && (
                <div className="p-4 border-t border-slate-100 bg-slate-50/70 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700">1. Qualifications (1.5x)</label>
                    <select
                      value={cand.qualifications}
                      onChange={(e) => updateScore(cand.id, 'qualifications', Number(e.target.value))}
                      className="w-full text-xs rounded border border-slate-200 p-1 bg-white"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n} - {n >= 4 ? 'Excellent' : n === 3 ? 'Adequate' : 'Weak'}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700">2. Technical Skills (2.0x)</label>
                    <select
                      value={cand.technical}
                      onChange={(e) => updateScore(cand.id, 'technical', Number(e.target.value))}
                      className="w-full text-xs rounded border border-slate-200 p-1 bg-white"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n} - {n >= 4 ? 'CCNA/Fiber' : n === 3 ? 'Basic' : 'None'}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700">3. Field Experience (2.0x)</label>
                    <select
                      value={cand.experience}
                      onChange={(e) => updateScore(cand.id, 'experience', Number(e.target.value))}
                      className="w-full text-xs rounded border border-slate-200 p-1 bg-white"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n} - {n >= 4 ? '5+ Years' : n === 3 ? '2-3 Years' : '<1 Year'}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700">4. Problem Solving (1.5x)</label>
                    <select
                      value={cand.problemSolving}
                      onChange={(e) => updateScore(cand.id, 'problemSolving', Number(e.target.value))}
                      className="w-full text-xs rounded border border-slate-200 p-1 bg-white"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n} - {n >= 4 ? 'Diagnostic Pro' : n === 3 ? 'Standard' : 'Weak'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
