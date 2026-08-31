'use client'

import React, { useState } from 'react'
import {
  Briefcase,
  Users,
  Search,
  CheckCircle2,
  Clock,
  Award,
  Star,
  FileText,
  ShieldCheck,
  Send,
  X,
  ChevronRight,
  Filter,
  Check,
  AlertCircle,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

interface HrAtsCandidateFeedProps {
  initialApplications: any[]
}

export function HrAtsCandidateFeed({ initialApplications }: HrAtsCandidateFeedProps) {
  const [applications, setApplications] = useState<any[]>(initialApplications)
  const [selectedApp, setSelectedApp] = useState<any | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  // Screening form state
  const [screeningScore, setScreeningScore] = useState(8)
  const [selectedStatus, setSelectedStatus] = useState('SCREENED')
  const [assessorNotes, setAssessorNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const openAssessment = (app: any) => {
    setSelectedApp(app)
    setSelectedStatus(app.status || 'SCREENED')
    setScreeningScore(app.candidate?.qualityTier === 'STRONG' ? 9 : app.candidate?.qualityTier === 'BORDERLINE' ? 6 : 4)
    setAssessorNotes('')
  }

  const handleSaveAssessment = async () => {
    if (!selectedApp) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/hr/candidates/screen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: selectedApp.id,
          candidateId: selectedApp.candidateId,
          status: selectedStatus,
          screeningScore,
          notes: assessorNotes,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Failed to save screening.')
        return
      }

      toast.success(data.message || 'Candidate assessment saved successfully!')

      // Update local state
      setApplications((prev) =>
        prev.map((a) =>
          a.id === selectedApp.id
            ? {
                ...a,
                status: selectedStatus,
                candidate: {
                  ...a.candidate,
                  qualityTier: screeningScore >= 8 ? 'STRONG' : screeningScore >= 5 ? 'BORDERLINE' : 'UNQUALIFIED',
                },
              }
            : a
        )
      )

      setSelectedApp(null)
    } catch (err) {
      toast.error('An error occurred while saving assessment.')
    } finally {
      setSubmitting(false)
    }
  }

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.candidate?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      app.position?.title?.toLowerCase().includes(search.toLowerCase()) ||
      app.candidate?.email?.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || (app.status || 'NEW') === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      {/* Top ATS Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#737686] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search candidate name, email, role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-xs pl-8 h-8 bg-white border-border rounded-lg"
            />
          </div>
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {['ALL', 'NEW', 'SCREENED', 'INTERVIEW_SCHEDULED', 'OFFERED', 'HIRED', 'REJECTED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
                statusFilter === st
                  ? 'bg-[#2563eb] text-white shadow-xs'
                  : 'bg-white text-[#434655] border border-border hover:bg-[#f2f4f6]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="border border-border rounded-xl overflow-hidden bg-white shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-border bg-[#f7f9fb] text-[#434655] font-semibold">
              <th className="py-3 px-4">Candidate & Reference</th>
              <th className="py-3 px-4">Role Applied</th>
              <th className="py-3 px-4">Experience & RTW</th>
              <th className="py-3 px-4">Assessment Tier</th>
              <th className="py-3 px-4">Recruitment Stage</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => {
                const status = app.status || 'NEW'
                const tier = app.candidate?.qualityTier || 'STRONG'
                const refCode = `NL-APP-${app.id.slice(-4).toUpperCase()}`

                return (
                  <tr key={app.id} className="hover:bg-[#f7f9fb]/80 transition group">
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#191c1e]">{app.candidate?.fullName}</div>
                      <div className="text-[11px] text-[#737686] font-mono">{app.candidate?.email || refCode}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-[#191c1e]">{app.position?.title}</div>
                      <div className="text-[11px] text-[#737686]">{app.position?.department?.name || 'Operations'}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-[#434655] font-medium">3-5 yrs exp</div>
                      <div className="text-[10px] text-[#004ac6] font-semibold flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3" /> Right to Work Verified
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${
                          tier === 'STRONG'
                            ? 'bg-[#dbe1ff] text-[#00174b] border-[#b4c5ff]'
                            : tier === 'BORDERLINE'
                            ? 'bg-[#ffede6] text-[#7d2d00] border-[#ffb596]'
                            : 'bg-[#ffdad6] text-[#ba1a1a] border-[#ffb596]'
                        }`}
                      >
                        {tier}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                          status === 'HIRED'
                            ? 'bg-[#dbe1ff] text-[#004ac6]'
                            : status === 'OFFERED'
                            ? 'bg-[#d0e1fb] text-[#0b1c30]'
                            : status === 'REJECTED'
                            ? 'bg-[#ffdad6] text-[#ba1a1a]'
                            : 'bg-[#f2f4f6] text-[#434655]'
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        size="sm"
                        onClick={() => openAssessment(app)}
                        className="h-7 text-xs bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-3 font-semibold shadow-2xs rounded-md gap-1"
                      >
                        <span>Score & Screen</span>
                        <ChevronRight className="w-3 h-3" />
                      </Button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-[#737686] text-xs">
                  No candidate applications found matching criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Candidate Assessment Modal / Drawer */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-border shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#191c1e]">
                    Candidate Assessment Scorecard
                  </h3>
                  <Badge variant="outline" className="text-[10px] bg-[#dbe1ff] text-[#00174b]">
                    ATS Screening
                  </Badge>
                </div>
                <p className="text-xs text-[#737686] mt-0.5">
                  {selectedApp.candidate?.fullName} • Applied for {selectedApp.position?.title}
                </p>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="w-8 h-8 rounded-lg border border-border hover:bg-[#f2f4f6] flex items-center justify-center text-[#737686]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Candidate Dossier & CV Text */}
            <div className="p-4 rounded-xl bg-[#f7f9fb] border border-border space-y-2.5 text-xs">
              <div className="flex items-center justify-between font-bold text-[#191c1e]">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#2563eb]" /> Candidate CV & Experience Summary
                </span>
                <span className="text-[10px] text-[#004ac6] font-mono">
                  {selectedApp.candidate?.email || 'Candidate Dossier'}
                </span>
              </div>
              <p className="text-[#434655] leading-relaxed whitespace-pre-line text-xs font-sans">
                {selectedApp.cvText ||
                  'Experienced technical specialist with demonstrated proficiency in optical fiber splicing, OTDR diagnostics, and enterprise network rollouts. Holds Cisco CCNA and valid UK drivers license.'}
              </p>
            </div>

            {/* Assessment Scorecard Controls */}
            <div className="space-y-4 pt-1">
              <h4 className="font-bold text-xs text-[#191c1e] flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[#2563eb]" /> Competency & Statutory Evaluation
              </h4>

              {/* Technical Score Slider */}
              <div className="p-4 rounded-xl border border-border bg-white space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#191c1e]">Technical & Experience Competence (1–10)</span>
                  <span className="font-mono font-bold text-xs text-[#004ac6] bg-[#dbe1ff] px-2 py-0.5 rounded">
                    {screeningScore} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={screeningScore}
                  onChange={(e) => setScreeningScore(parseInt(e.target.value, 10))}
                  className="w-full accent-[#2563eb]"
                />
                <p className="text-[10px] text-[#737686]">
                  Scores $\ge 8$ assign <strong>STRONG</strong> tier; 5–7 assign <strong>BORDERLINE</strong>.
                </p>
              </div>

              {/* Stage Transition Selector */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#191c1e]">Update Recruitment Stage:</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {['SCREENED', 'INTERVIEW_SCHEDULED', 'OFFERED', 'HIRED', 'REJECTED'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSelectedStatus(st)}
                      className={`p-2 rounded-lg border text-center text-[11px] font-bold transition ${
                        selectedStatus === st
                          ? 'border-[#2563eb] bg-[#dbe1ff] text-[#00174b] ring-1 ring-[#2563eb]'
                          : 'border-border bg-white text-[#434655] hover:bg-[#f2f4f6]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recruiter Assessment Notes */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#191c1e]">
                  Screening Assessment Notes & Interview Rationale:
                </label>
                <Textarea
                  placeholder="e.g. Candidate meets all statutory right to work criteria and possesses 4 years verified optical deployment experience. Recommended to advance to structured STAR interview."
                  value={assessorNotes}
                  onChange={(e) => setAssessorNotes(e.target.value)}
                  className="text-xs min-h-[80px] bg-[#f7f9fb] border-border rounded-lg"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-3 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedApp(null)}
                className="text-xs h-8"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveAssessment}
                disabled={submitting}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold h-8 px-5 gap-1.5 shadow-xs rounded-lg"
              >
                <Check className="w-3.5 h-3.5" />
                {submitting ? 'Saving Assessment...' : 'Save Assessment & Update Status'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
