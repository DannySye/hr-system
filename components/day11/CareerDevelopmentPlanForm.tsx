'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Award, Compass, Save, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

interface CareerDevelopmentPlanFormProps {
  employeeId?: string
  onSaved?: () => void
}

const ORG_CHART_POSITIONS = [
  'Senior Field Engineer & Infrastructure Lead',
  'Network Systems Specialist',
  'Field Operations Lead',
  'Optical Solutions Architect',
]

const VAGUE_PHRASES_DENYLIST = [
  'wants to grow',
  'improve skills',
  'do better',
  'work harder',
  'learn more',
  'grow skills',
]

export function CareerDevelopmentPlanForm({
  employeeId = 'emp-100',
  onSaved,
}: CareerDevelopmentPlanFormProps) {
  const [careerGoals, setCareerGoals] = useState(
    'Aspires to advance into a Senior Field Engineer & Infrastructure Lead role within 12-18 months, taking primary ownership of metro backbone expansions.'
  )
  const [skillsToDevelop, setSkillsToDevelop] = useState(
    'Advanced Dense Wavelength Division Multiplexing (DWDM), high-density fiber OTDR testing, and junior field technician mentoring.'
  )
  const [trainingOpportunities, setTrainingOpportunities] = useState(
    'Enrolment in Certified Optical Network Associate (CONA) and attendance at the UK Telecoms Infrastructure Leadership Workshop.'
  )
  const [nextRoleTarget, setNextRoleTarget] = useState(ORG_CHART_POSITIONS[0])
  const [submitting, setSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Validation: skillsToDevelop >= 25 chars
    if (skillsToDevelop.trim().length < 25) {
      toast.error('Validation Error: "Skills to Develop" must be at least 25 characters with concrete technical benchmarks.')
      return
    }

    // 2. Denylist check
    const lowerSkills = skillsToDevelop.toLowerCase()
    const matchedVague = VAGUE_PHRASES_DENYLIST.find((phrase) => lowerSkills.includes(phrase))
    if (matchedVague) {
      toast.error(`Vague Plan Rejected: Please avoid aspirational fluff like "${matchedVague}". Specify exact certifications, technical tools, or competencies.`)
      return
    }

    // 3. nextRoleTarget must be selected from org chart positions
    if (!nextRoleTarget) {
      toast.error('Please select a valid Next Role Target from the official organizational chart.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/day11/career-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId,
          careerGoals,
          skillsToDevelop,
          trainingOpportunities,
          nextRoleTarget,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'Failed to save career development plan.')
        return
      }

      setSaved(true)
      toast.success('Career Development Plan formally saved to employee file!')
      if (onSaved) onSaved()
    } catch (err) {
      toast.error('An error occurred while saving the career plan.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card data-tutorial-target="career-plan-form" className="border-border shadow-2xs bg-white rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-border/70 p-5 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#2563eb]" />
            <CardTitle className="text-sm font-bold text-[#191c1e]">
              Formal Career Development Plan (CDP)
            </CardTitle>
          </div>
          {saved && (
            <Badge className="text-[9px] bg-[#dcfce7] text-[#15803d] border-[#86efac] font-bold">
              ✓ Plan Documented
            </Badge>
          )}
        </div>
        <CardDescription className="text-xs text-[#737686]">
          Formulate concrete career goals, observable competencies to develop, and a structured target role grounded in NovaLink&apos;s organizational chart.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSavePlan}>
        <CardContent className="p-5 space-y-4 text-xs">
          {/* Career Goals */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#191c1e]">1. Strategic Career Goals & Vision</label>
            <Textarea
              value={careerGoals}
              onChange={(e) => setCareerGoals(e.target.value)}
              className="text-xs min-h-[70px] bg-[#f7f9fb] border-border rounded-lg"
              placeholder="e.g. Move toward senior technical leadership within 12-18 months..."
              required
            />
          </div>

          {/* Skills to Develop */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-bold text-[#191c1e]">
                2. Concrete Skills & Technical Competencies to Develop
              </label>
              <span className="text-[10px] text-[#737686]">Min 25 chars • Non-generic</span>
            </div>
            <Textarea
              value={skillsToDevelop}
              onChange={(e) => setSkillsToDevelop(e.target.value)}
              className="text-xs min-h-[75px] bg-[#f7f9fb] border-border rounded-lg"
              placeholder="e.g. Advanced DWDM optical splicing, leadership mentoring, high-density cutover protocols..."
              required
            />
          </div>

          {/* Training & Enablement Opportunities */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#191c1e]">
              3. Structured Training, Certifications & Learning Interventions
            </label>
            <Textarea
              value={trainingOpportunities}
              onChange={(e) => setTrainingOpportunities(e.target.value)}
              className="text-xs min-h-[70px] bg-[#f7f9fb] border-border rounded-lg"
              placeholder="e.g. Certified Optical Network Associate (CONA) and senior mentorship shadow program..."
              required
            />
          </div>

          {/* Next Role Target from Org Chart */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#191c1e]">
              4. Next Role Target (Selected from Organizational Structure)
            </label>
            <select
              value={nextRoleTarget}
              onChange={(e) => setNextRoleTarget(e.target.value)}
              className="w-full text-xs h-9 rounded-lg border border-border bg-[#f7f9fb] px-3 font-medium text-[#191c1e]"
              required
            >
              {ORG_CHART_POSITIONS.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 border-t border-border/60 flex justify-end gap-3">
          <Button
            type="submit"
            disabled={submitting}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold h-9 px-5 gap-1.5 shadow-xs rounded-lg"
          >
            <Save className="w-3.5 h-3.5" />
            {submitting ? 'Saving Plan...' : saved ? 'Update Career Plan' : 'Save Career Development Plan'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
