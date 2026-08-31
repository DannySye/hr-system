'use client'

import React, { useState } from 'react'
import { GraduationCap, Calendar, Clock, User, PlusCircle, Check } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export function TrainingRegisterForm({
  employeeName = 'Riley Morgan',
  onLogTraining,
}: {
  employeeName?: string
  onLogTraining?: (record: any) => void
}) {
  const [course, setCourse] = useState('Cross-Functional Communication & Conflict De-escalation')
  const [category, setCategory] = useState('SOFT_SKILLS')
  const [trainer, setTrainer] = useState('Eleanor Vance (Lead HR Trainer)')
  const [duration, setDuration] = useState('4.0')
  const [date, setDate] = useState('2026-08-22')
  const [result, setResult] = useState('COMPLETED')
  const [logged, setLogged] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLogged(true)
    toast.success(`Training session logged for ${employeeName}`)
    if (onLogTraining) {
      onLogTraining({ course, category, trainer, duration, date, result })
    }
  }

  return (
    <Card id="training-register" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">
              Training & Development Register Entry
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-[10px]">
            Catalog Fulfillment
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Schedule and record official training completion in {employeeName}&apos;s personnel development record.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Course / Module Title</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full text-xs rounded-md border border-slate-200 bg-white p-2"
              >
                <option value="Cross-Functional Communication & Conflict De-escalation">
                  Cross-Functional Communication & Conflict De-escalation (Soft Skills)
                </option>
                <option value="Advanced Distributed Microservices & Performance Optimization">
                  Advanced Distributed Microservices & Performance Optimization (Technical)
                </option>
                <option value="NovaLink Global IT & Compliance Orientation">
                  NovaLink Global IT & Compliance Orientation (Induction)
                </option>
                <option value="UK GDPR, Data Security & Workplace Health Protocols">
                  UK GDPR, Data Security & Workplace Health Protocols (Compliance)
                </option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Training Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs rounded-md border border-slate-200 bg-white p-2"
              >
                <option value="SOFT_SKILLS">Soft Skills (Communication / Leadership)</option>
                <option value="TECHNICAL">Technical (Domain / Tools)</option>
                <option value="INDUCTION">Induction (New Hire / Culture)</option>
                <option value="COMPLIANCE">Compliance (Safety / Legal / GDPR)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Instructor / Trainer</label>
              <Input
                value={trainer}
                onChange={(e) => setTrainer(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Duration (Hours)</label>
              <Input
                type="number"
                step="0.5"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Training Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Result & Competency Status</label>
            <select
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="w-full text-xs rounded-md border border-slate-200 bg-white p-2"
            >
              <option value="COMPLETED">Completed — Competency Verified</option>
              <option value="IN_PROGRESS">In Progress — Partial Attendance</option>
              <option value="NOT_EFFECTIVE">Not Effective — Follow-up Required</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              className={`text-xs h-8 px-5 gap-1.5 font-semibold ${
                logged ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-teal-700 hover:bg-teal-800'
              } text-white`}
            >
              <Check className="w-3.5 h-3.5" />
              {logged ? 'Training Record Logged' : 'Record in Training Register'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
