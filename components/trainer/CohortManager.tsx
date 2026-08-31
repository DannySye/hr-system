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
} from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { Role, ProgressStatus } from '@/lib/types'

interface CohortManagerProps {
  initialTrainees: any[]
  initialTrainers: any[]
}

export function CohortManager({ initialTrainees, initialTrainers }: CohortManagerProps) {
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

  return (
    <div className="space-y-6">
      {/* Top Banner with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Active Cohort Members & Instructors
            </h3>
            <p className="text-xs text-slate-500">
              {trainees.length} Enrolled Trainee{trainees.length === 1 ? '' : 's'} •{' '}
              {trainers.length} Trainer{trainers.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={() => setShowModal(true)}
          className="bg-teal-700 hover:bg-teal-800 text-white text-xs h-8 px-4 gap-1.5 font-semibold shadow-xs"
        >
          <UserPlus className="w-3.5 h-3.5" /> Add New Trainee / Trainer
        </Button>
      </div>

      {/* Trainees Cohort Table */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-teal-700" />
              <CardTitle className="text-sm font-bold">HR Trainees & Interns</CardTitle>
            </div>
            <span className="text-xs text-slate-400">Click to review and grade</span>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5 font-semibold">Trainee Name & Email</th>
                <th className="p-3.5 font-semibold text-center">Day 1</th>
                <th className="p-3.5 font-semibold text-center">Day 2</th>
                <th className="p-3.5 font-semibold text-center">Day 3</th>
                <th className="p-3.5 font-semibold text-center">Day 4</th>
                <th className="p-3.5 font-semibold text-center">Day 5</th>
                <th className="p-3.5 font-semibold text-center">Days 6-12</th>
                <th className="p-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trainees.length > 0 ? (
                trainees.map((trainee) => {
                  const progressMap = new Map(
                    trainee.traineeProgress?.map((p: any) => [p.dayNumber, p]) || []
                  )

                  const renderDayBadge = (day: number) => {
                    const p: any = progressMap.get(day)
                    if (!p || p.status === ProgressStatus.LOCKED) {
                      return <Lock className="w-3.5 h-3.5 text-slate-300 mx-auto" />
                    }
                    if (p.status === ProgressStatus.GRADED) {
                      return (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          <CheckCircle className="w-3 h-3" /> Graded
                        </span>
                      )
                    }
                    if (p.status === ProgressStatus.SUBMITTED) {
                      return (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                          <Clock className="w-3 h-3 text-amber-600" /> Pending
                        </span>
                      )
                    }
                    return (
                      <span className="inline-block px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 text-[10px] font-semibold">
                        In Progress
                      </span>
                    )
                  }

                  const gradedCount =
                    trainee.traineeProgress?.filter(
                      (p: any) => p.dayNumber >= 6 && p.status === ProgressStatus.GRADED
                    ).length || 0

                  return (
                    <tr key={trainee.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3.5 font-medium text-slate-900">
                        <div className="font-bold">{trainee.fullName}</div>
                        <div className="text-[11px] text-slate-400">{trainee.email}</div>
                      </td>
                      <td className="p-3.5 text-center">{renderDayBadge(1)}</td>
                      <td className="p-3.5 text-center">{renderDayBadge(2)}</td>
                      <td className="p-3.5 text-center">{renderDayBadge(3)}</td>
                      <td className="p-3.5 text-center">{renderDayBadge(4)}</td>
                      <td className="p-3.5 text-center">{renderDayBadge(5)}</td>
                      <td className="p-3.5 text-center text-slate-500 font-medium">
                        {gradedCount}/7 Graded
                      </td>
                      <td className="p-3.5 text-right">
                        <Link href={`/trainer/trainee/${trainee.id}`}>
                          <Button size="sm" variant="default" className="text-xs h-7 px-3 gap-1 bg-teal-700 hover:bg-teal-800">
                            Grade & Review <ArrowRight className="w-3 h-3" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-slate-400 italic">
                    No trainees registered yet. Click &quot;Add New Trainee&quot; above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Trainers & Instructors List */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-teal-700" />
            <CardTitle className="text-sm font-bold">Faculty & Lead Trainers</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {trainers.map((tr) => (
              <div
                key={tr.id}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900">{tr.fullName}</div>
                  <div className="text-[11px] text-slate-500">{tr.email}</div>
                </div>
                <Badge variant="outline" className="text-[9px] bg-white">
                  Trainer
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal Dialog for Adding User */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-teal-700" />
                <h3 className="font-bold text-sm text-slate-900">Add New User to Cohort</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Full Name</label>
                <Input
                  type="text"
                  placeholder="e.g. Jordan Miller or Dr. Evelyn Harper"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Email Address</label>
                <Input
                  type="email"
                  placeholder="e.g. j.miller@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Temporary Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="w-full text-xs rounded-md border border-slate-200 bg-white p-2"
                >
                  <option value={Role.TRAINEE}>HR Trainee / Intern (12-Day Simulation)</option>
                  <option value={Role.TRAINER}>Lead HR Trainer (Grading & Cohort Admin)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowModal(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={submitting}
                  className="bg-teal-700 hover:bg-teal-800 text-white text-xs gap-1.5"
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
