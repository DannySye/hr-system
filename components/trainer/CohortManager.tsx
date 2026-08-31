'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  UserPlus,
  Shield,
  GraduationCap,
  X,
  CheckCircle,
  Clock,
  Lock,
  ArrowRight,
  Plus,
  Mail,
  Calendar,
  Check,
  Sparkles,
} from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { Role, ProgressStatus } from '@/lib/types'

interface CohortManagerProps {
  initialTrainees: any[]
  initialTrainers: any[]
  calendarDays?: any[]
}

const DEFAULT_SCHEDULE = [
  { day: 1, title: 'Workforce Planning & Job Analysis', status: 'Force Unlocked', progress: 100, variant: 'green' },
  { day: 2, title: 'Sourcing Strategy & Job Adverts', status: 'Progression', progress: 65, variant: 'green' },
  { day: 3, title: 'Selection Shortlisting & Interviewing', status: 'Progression', progress: 35, variant: 'amber' },
  { day: 4, title: 'Offer Letters & Employment Contracts', status: 'Progression', progress: 20, variant: 'amber' },
  { day: 5, title: 'Onboarding & Induction Design', status: 'Progression', progress: 15, variant: 'green' },
  { day: 6, title: 'Probationary Review & Attendance Register', status: 'Progression', progress: 10, variant: 'amber' },
  { day: 7, title: 'Performance Appraisal & 360 Feedback', status: 'Progression', progress: 5, variant: 'green' },
  { day: 8, title: 'Learning & Development Needs Analysis', status: 'Progression', progress: 0, variant: 'amber' },
  { day: 9, title: 'Employee Welfare & Grievance Processes', status: 'Progression', progress: 0, variant: 'amber' },
  { day: 10, title: 'Disciplinary & Statutory Fair Process', status: 'Progression', progress: 0, variant: 'amber' },
  { day: 11, title: 'Total Reward, Recognition & Benefits Policy', status: 'Progression', progress: 0, variant: 'amber' },
  { day: 12, title: 'Exit Interviews & Offboarding Synthesis', status: 'Progression', progress: 0, variant: 'amber' },
]

export function CohortManager({ initialTrainees, initialTrainers, calendarDays }: CohortManagerProps) {
  const router = useRouter()
  const [trainees, setTrainees] = useState(initialTrainees)
  const [trainers, setTrainers] = useState(initialTrainers)
  const [showModal, setShowModal] = useState(false)

  // Form State
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('password123')
  const [role, setRole] = useState<Role>(Role.TRAINEE)
  const [submitting, setSubmitting] = useState(false)

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !email || !password) {
      toast.error('Please enter Full Name, Email, and Password.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/trainer/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, role }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Failed to create user.')
        return
      }

      toast.success(data.message || `Created ${fullName} successfully!`)
      setShowModal(false)
      setFullName('')
      setEmail('')
      setPassword('password123')
      router.refresh()
    } catch (err) {
      toast.error('An error occurred while creating user.')
    } finally {
      setSubmitting(false)
    }
  }

  // Helper for Circular Progress Ring
  const renderProgressCircle = (percent: number, colorClass: string) => {
    const strokeDash = `${percent} 100`
    return (
      <div className="relative w-5 h-5 mx-auto flex items-center justify-center">
        <svg className="w-5 h-5 -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-[#e2e8f0]"
            strokeWidth="4"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={colorClass}
            strokeDasharray={strokeDash}
            strokeWidth="4"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-border shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#dcfce7] text-[#15803d] border border-[#86efac] flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#191c1e]">
              Active Cohort Members & Instructors
            </h3>
            <p className="text-xs text-[#737686]">
              {trainees.length} Enrolled Trainee{trainees.length === 1 ? '' : 's'} •{' '}
              {trainers.length} Trainer{trainers.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={() => setShowModal(true)}
          className="bg-[#16a34a] hover:bg-[#15803d] text-white text-xs h-9 px-4 gap-1.5 font-bold shadow-xs rounded-lg"
        >
          <UserPlus className="w-4 h-4" /> Add New Trainee / Trainer
        </Button>
      </div>

      {/* 1. HR Trainees & Interns Matrix Table */}
      <Card className="border-border shadow-2xs bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-border/70 p-5 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#2563eb]" />
              <CardTitle className="text-sm font-bold text-[#191c1e]">
                HR Trainees & Interns
              </CardTitle>
            </div>
            <span className="text-xs text-[#737686]">Click to review and grade</span>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-[#f7f9fb] border-b border-border text-[#434655] uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="py-3.5 px-5">Trainee Name & Email</th>
                <th className="py-3.5 px-3 text-center">Day 1</th>
                <th className="py-3.5 px-3 text-center">Day 2</th>
                <th className="py-3.5 px-3 text-center">Day 3</th>
                <th className="py-3.5 px-3 text-center">Day 4</th>
                <th className="py-3.5 px-3 text-center">Day 5</th>
                <th className="py-3.5 px-3 text-center">Days 6-12</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {trainees.length > 0 ? (
                trainees.map((trainee, idx) => {
                  const progressMap = new Map(
                    trainee.traineeProgress?.map((p: any) => [p.dayNumber, p]) || []
                  )

                  const renderDayStatus = (day: number) => {
                    const p: any = progressMap.get(day)

                    // If day 1 or completed
                    if (p?.status === ProgressStatus.GRADED) {
                      return (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#dbe1ff] text-[#004ac6] text-[10px] font-bold border border-[#b4c5ff]">
                          <CheckCircle className="w-3 h-3" /> Graded
                        </span>
                      )
                    }
                    if (p?.status === ProgressStatus.SUBMITTED) {
                      return (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] text-[10px] font-bold border border-[#fde68a]">
                          <Clock className="w-3 h-3 text-[#d97706]" /> Pending
                        </span>
                      )
                    }
                    if (p?.status === ProgressStatus.IN_PROGRESS || (day === 1 && !p)) {
                      return (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#dcfce7] text-[#15803d] text-[10px] font-bold border border-[#86efac]">
                          In Progress
                        </span>
                      )
                    }

                    // Circular ring for intermediate stages
                    return renderProgressCircle(idx === 0 ? 65 : 40, idx === 0 ? 'text-[#d97706]' : 'text-[#16a34a]')
                  }

                  return (
                    <tr key={trainee.id} className="hover:bg-[#f7f9fb]/70 transition group">
                      <td className="py-4 px-5">
                        <div className="font-bold text-[#191c1e] text-xs sm:text-sm">
                          {trainee.fullName} {idx === 0 ? '(Undergraduate Intern)' : '(HR Trainee)'}
                        </div>
                        <div className="text-[11px] text-[#737686] font-mono mt-0.5">
                          {trainee.email}
                        </div>
                      </td>

                      <td className="py-4 px-3 text-center">{renderDayStatus(1)}</td>
                      <td className="py-4 px-3 text-center">{renderDayStatus(2)}</td>
                      <td className="py-4 px-3 text-center">{renderDayStatus(3)}</td>
                      <td className="py-4 px-3 text-center">{renderDayStatus(4)}</td>
                      <td className="py-4 px-3 text-center">{renderDayStatus(5)}</td>
                      <td className="py-4 px-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] text-[10px] font-bold border border-[#fde68a]">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      </td>

                      <td className="py-4 px-5 text-right">
                        <Link href={`/trainer/trainee/${trainee.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-8 px-3.5 gap-1.5 border-border bg-white text-[#191c1e] hover:bg-[#f2f4f6] font-semibold shadow-2xs rounded-lg"
                          >
                            <span>Grade & Review</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#737686] text-xs">
                    No trainees registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* 2. Faculty & Lead Trainers Cards */}
      <Card className="border-border shadow-2xs bg-white rounded-2xl">
        <CardHeader className="border-b border-border/70 p-5 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#2563eb]" />
            <CardTitle className="text-sm font-bold text-[#191c1e]">
              Faculty & Lead Trainers
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {trainers.map((tr) => (
              <div
                key={tr.id}
                className="p-4 rounded-xl border border-border bg-[#f7f9fb] flex items-center justify-between text-xs hover:border-[#b4c5ff] transition"
              >
                <div>
                  <div className="font-bold text-[#191c1e] text-xs sm:text-sm">
                    {tr.fullName}
                  </div>
                  <div className="text-[11px] text-[#737686] font-mono mt-0.5">
                    {tr.email}
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="text-[10px] bg-white text-[#434655] border-border px-2 py-0.5"
                >
                  Trainer
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3. 12-Day Simulation Curriculum Schedule Grid */}
      <Card className="border-border shadow-2xs bg-white rounded-2xl">
        <CardHeader className="border-b border-border/70 p-5 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#2563eb]" />
            <CardTitle className="text-sm font-bold text-[#191c1e]">
              12-Day Simulation Curriculum Schedule
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {DEFAULT_SCHEDULE.map((item) => (
              <div
                key={item.day}
                className="p-4 rounded-xl border border-border bg-white shadow-2xs flex flex-col justify-between gap-3 hover:border-[#2563eb] transition group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-black text-[#191c1e] block">
                      Day {item.day}
                    </span>
                    <span className="text-[11px] text-[#434655] font-medium line-clamp-2 mt-0.5">
                      {item.title}
                    </span>
                  </div>
                  <Badge
                    className={`text-[9px] font-bold px-1.5 py-0.2 shrink-0 ${
                      item.variant === 'green'
                        ? 'bg-[#dcfce7] text-[#15803d] border-[#86efac]'
                        : 'bg-[#fef3c7] text-[#b45309] border-[#fde68a]'
                    }`}
                  >
                    {item.status}
                  </Badge>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#f2f4f6] h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.variant === 'green' ? 'bg-[#16a34a]' : 'bg-[#d97706]'
                    }`}
                    style={{ width: `${Math.max(item.progress, 15)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal Dialog for Adding User */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-border space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-[#2563eb]" />
                <h3 className="font-bold text-sm text-[#191c1e]">Add New User to Cohort</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#737686] hover:text-[#191c1e]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#191c1e]">Full Name</label>
                <Input
                  type="text"
                  placeholder="e.g. Jordan Miller or Dr. Evelyn Harper"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="text-xs h-9 bg-[#f7f9fb] border-border rounded-lg"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#191c1e]">Email Address</label>
                <Input
                  type="email"
                  placeholder="e.g. j.miller@novalink.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-xs h-9 bg-[#f7f9fb] border-border rounded-lg"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#191c1e]">Temporary Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-xs h-9 bg-[#f7f9fb] border-border rounded-lg"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#191c1e]">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="w-full text-xs h-9 rounded-lg border border-border bg-[#f7f9fb] px-2.5"
                >
                  <option value={Role.TRAINEE}>HR Trainee / Intern (12-Day Simulation)</option>
                  <option value={Role.TRAINER}>Lead HR Trainer (Grading & Cohort Admin)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2.5 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowModal(false)}
                  className="text-xs h-8"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={submitting}
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold h-8 px-4 gap-1.5 shadow-xs rounded-lg"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {submitting ? 'Creating...' : 'Add to Cohort'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
