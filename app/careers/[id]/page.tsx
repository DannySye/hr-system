'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Send,
  Building,
  ShieldCheck,
  FileText,
  Upload,
  Sparkles,
  Calendar,
  Star,
  HelpCircle,
  Award,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

export default function JobApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const positionId = params.id as string

  const [position, setPosition] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Candidate Details
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [experienceYears, setExperienceYears] = useState('4')
  const [technicalSkillRating, setTechnicalSkillRating] = useState('8')
  const [cvText, setCvText] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [rightToWork, setRightToWork] = useState(true)
  const [motivationResponse, setMotivationResponse] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<any>(null)

  useEffect(() => {
    fetch('/api/careers/positions')
      .then((res) => res.json())
      .then((data) => {
        const found = data.positions?.find((p: any) => p.id === positionId)
        if (found) {
          setPosition(found)
        } else if (data.positions?.length > 0) {
          setPosition(data.positions[0])
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [positionId])

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !email || !cvText) {
      toast.error('Please provide your Full Name, Email, and CV summary.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          positionId: position?.id || positionId,
          experienceYears,
          cvText,
          coverLetter: `${coverLetter}\n\n[Motivation / Key Strengths]: ${motivationResponse}`,
          screeningAnswers: {
            rightToWork,
            experienceYears,
            technicalSkillRating,
            motivationResponse,
          },
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Failed to submit application.')
        return
      }

      setSubmissionResult(data)
      toast.success('Application received and submitted directly to NovaLink HR!')
    } catch (err) {
      toast.error('An error occurred during submission.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center text-xs text-[#737686]">
        Loading vacancy specifications and assessment questionnaire...
      </div>
    )
  }

  if (submissionResult) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-lg w-full bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-xl text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <Badge variant="outline" className="bg-[#dbe1ff] text-[#00174b] border-[#b4c5ff] text-xs font-bold">
            Application Logged into ATS Pipeline
          </Badge>

          <h2 className="text-2xl font-bold text-[#191c1e] tracking-tight">
            Thank You, {fullName}!
          </h2>

          <p className="text-xs text-[#434655] leading-relaxed">
            Your application for <strong>{position?.title || 'Field Engineer'}</strong> has been received by NovaLink Talent Acquisition and entered into the candidate screening queue.
          </p>

          <div className="p-4 rounded-xl bg-[#f7f9fb] border border-border text-xs text-left space-y-2 font-mono">
            <div className="text-[#737686] text-[10px] uppercase font-bold">Candidate Tracking Code</div>
            <div className="text-base font-bold text-[#004ac6]">{submissionResult.referenceNumber}</div>
            <div className="text-[11px] text-[#434655] font-sans pt-1 border-t border-border/60">
              <strong>Assessment Status:</strong> Awaiting HR Recruiter Initial Screening Scorecard.
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/careers">
              <Button variant="outline" size="sm" className="text-xs w-full sm:w-auto border-border">
                Back to Careers Hub
              </Button>
            </Link>
            <Link href="/hr">
              <Button size="sm" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold w-full sm:w-auto shadow-xs">
                Log into Enterprise HR to Review Applicant &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col justify-between">
      {/* Public Top Nav */}
      <header className="sticky top-0 z-30 bg-white border-b border-border h-16 flex items-center justify-between px-4 sm:px-8 shadow-2xs">
        <Link href="/careers" className="flex items-center gap-2 text-xs font-semibold text-[#434655] hover:text-[#191c1e]">
          <ArrowLeft className="w-4 h-4" /> Back to All Opportunities
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button size="sm" variant="outline" className="text-xs h-8 border-border text-[#191c1e] bg-white hover:bg-[#f2f4f6]">
              Internal HR Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Job Spec & Deadline */}
        <div className="lg:col-span-1 space-y-5">
          <div className="bg-white rounded-2xl border border-border p-5 shadow-2xs space-y-4">
            <div className="space-y-1">
              <Badge variant="default" className="bg-[#004ac6] text-white text-[10px] uppercase font-bold">
                {position?.department?.name || 'Operations'}
              </Badge>
              <h1 className="text-xl font-bold text-[#191c1e] tracking-tight">{position?.title}</h1>
              <p className="text-xs text-[#737686]">{position?.jobPurpose}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#ffede6] border border-[#ffb596] text-xs text-[#7d2d00] space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#bc4800]" /> Application Deadline
              </div>
              <p className="text-[11px]">
                Closes: <strong>15 September 2026 at 23:59 BST</strong> (15 Days Remaining)
              </p>
            </div>

            <div className="space-y-2 text-xs text-[#434655] pt-2 border-t border-border/70">
              <div><strong>Salary:</strong> {position?.salaryBand || '£42,000 - £52,000'}</div>
              <div><strong>Location:</strong> {position?.location || 'Hybrid / London Hub'}</div>
              <div><strong>Working Hours:</strong> {position?.workingHours || '40 hrs/week'}</div>
              <div><strong>Recruitment Stage:</strong> Actively Reviewing Applicants</div>
            </div>
          </div>

          <div className="bg-[#dbe1ff]/50 rounded-2xl border border-[#b4c5ff] p-4 text-xs text-[#00174b] space-y-2">
            <h4 className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#004ac6]" /> Equal Opportunity Employer
            </h4>
            <p className="text-[11px] text-[#00174b] leading-relaxed">
              NovaLink evaluates all candidates against standardized, objective criteria under the Equality Act 2010. Shortlisted candidates are invited to structured STAR interviews.
            </p>
          </div>
        </div>

        {/* Right Column: Application & Pre-Screening Assessment */}
        <div className="lg:col-span-2">
          <Card className="border-border shadow-2xs bg-white rounded-2xl">
            <CardHeader className="border-b border-border/70 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#004ac6]" />
                <CardTitle className="text-base font-bold text-[#191c1e]">Candidate Application & Pre-Screening</CardTitle>
              </div>
              <CardDescription className="text-xs text-[#737686]">
                Provide your candidate credentials and complete the initial competency pre-screening below.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleApply}>
              <CardContent className="space-y-4 pt-5">
                {/* 1. Basic Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#191c1e]">Full Name *</label>
                    <Input
                      type="text"
                      placeholder="e.g. Samantha Vance"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="text-xs h-9 bg-[#f7f9fb] border-border rounded-lg"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#191c1e]">Email Address *</label>
                    <Input
                      type="email"
                      placeholder="e.g. s.vance@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-xs h-9 bg-[#f7f9fb] border-border rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#191c1e]">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="+44 7700 900555"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="text-xs h-9 bg-[#f7f9fb] border-border rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#191c1e]">Years of Relevant Experience</label>
                    <select
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full text-xs h-9 rounded-lg border border-border bg-[#f7f9fb] px-2.5"
                    >
                      <option value="1">1 year (Junior / Entry)</option>
                      <option value="3">3 years (Mid-level)</option>
                      <option value="5">5+ years (Senior / Specialist)</option>
                      <option value="8">8+ years (Lead / Principal)</option>
                    </select>
                  </div>
                </div>

                {/* 2. Pre-Screening Assessment */}
                <div className="p-4 rounded-xl bg-[#f7f9fb] border border-border space-y-3">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#191c1e]">
                    <Award className="w-4 h-4 text-[#2563eb]" /> Pre-Screening Assessment Questions
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#434655]">
                      Self-Rated Technical Proficiency (1–10 in Optical / Distributed Infrastructure)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={technicalSkillRating}
                        onChange={(e) => setTechnicalSkillRating(e.target.value)}
                        className="flex-1 accent-[#2563eb]"
                      />
                      <span className="font-mono font-bold text-xs text-[#004ac6] bg-white border border-border px-2 py-0.5 rounded">
                        {technicalSkillRating} / 10
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#434655]">
                      What is your key motivation for applying to NovaLink Global?
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Passion for scaling carrier-grade optical networks across enterprise EMEA hubs."
                      value={motivationResponse}
                      onChange={(e) => setMotivationResponse(e.target.value)}
                      className="text-xs h-9 bg-white border-border rounded-lg"
                    />
                  </div>
                </div>

                {/* 3. CV & Cover Letter */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#191c1e]">
                    CV / Professional Resume Summary *
                  </label>
                  <Textarea
                    placeholder="Paste your CV text, educational background, certifications, and technical proficiencies..."
                    value={cvText}
                    onChange={(e) => setCvText(e.target.value)}
                    className="text-xs min-h-[110px] bg-[#f7f9fb] border-border rounded-lg"
                    required
                  />
                  <p className="text-[10px] text-[#737686]">
                    Include details like degrees, Cisco/optical fiber certifications, or past project achievements.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#191c1e]">
                    Cover Letter / Additional Notes
                  </label>
                  <Textarea
                    placeholder="Provide any additional context or portfolio links..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="text-xs min-h-[70px] bg-[#f7f9fb] border-border rounded-lg"
                  />
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rightToWork"
                    checked={rightToWork}
                    onChange={(e) => setRightToWork(e.target.checked)}
                    className="rounded text-[#2563eb]"
                  />
                  <label htmlFor="rightToWork" className="text-xs text-[#434655] font-medium">
                    I confirm I possess valid right to work in the UK / EMEA hub location.
                  </label>
                </div>
              </CardContent>

              <div className="p-4 bg-[#f7f9fb] border-t border-border/70 rounded-b-2xl flex justify-end gap-3">
                <Link href="/careers">
                  <Button type="button" variant="outline" size="sm" className="text-xs h-8 border-border">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold h-8 px-5 gap-1.5 shadow-xs rounded-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  {submitting ? 'Submitting Application...' : 'Submit Application to HR'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
