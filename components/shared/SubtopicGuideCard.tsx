'use client'

import React, { useState } from 'react'
import {
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Info,
  Lightbulb,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export interface InteractiveQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface SubtopicGuideCardProps {
  title: string
  badgeText?: string
  overview: string
  legalBasis: string
  bestPractices: string[]
  pitfalls: string[]
  question: InteractiveQuestion
}

export function SubtopicGuideCard({
  title,
  badgeText = 'Statutory Framework',
  overview,
  legalBasis,
  bestPractices,
  pitfalls,
  question,
}: SubtopicGuideCardProps) {
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const isCorrect = selectedOpt === question.correctIndex

  const handleOptionSelect = (index: number) => {
    if (submitted) return
    setSelectedOpt(index)
  }

  const handleVerify = () => {
    if (selectedOpt === null) return
    setSubmitted(true)
  }

  const handleReset = () => {
    setSelectedOpt(null)
    setSubmitted(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-5 sm:p-6 shadow-2xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#191c1e]">{title}</h3>
            <Badge variant="outline" className="text-[10px] bg-[#dbe1ff] text-[#00174b] border-[#b4c5ff] font-bold">
              {badgeText}
            </Badge>
          </div>
          <p className="text-xs text-[#737686] mt-0.5">
            Operational practitioner guide and compliance benchmark.
          </p>
        </div>
      </div>

      {/* Guide Content: 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Left: Overview & Statutory Basis */}
        <div className="space-y-3 p-4 rounded-xl bg-[#f7f9fb] border border-border">
          <div className="space-y-1">
            <span className="font-bold text-[#191c1e] flex items-center gap-1.5 text-xs">
              <Info className="w-3.5 h-3.5 text-[#2563eb]" /> Process Overview & Objective
            </span>
            <p className="text-[#434655] leading-relaxed text-[11.5px]">{overview}</p>
          </div>

          <div className="space-y-1 pt-2 border-t border-border/60">
            <span className="font-bold text-[#004ac6] flex items-center gap-1.5 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#004ac6]" /> Legal & Statutory Authority
            </span>
            <p className="text-[#00174b] font-medium text-[11.5px] leading-relaxed bg-[#dbe1ff]/40 p-2.5 rounded-lg border border-[#b4c5ff]/60">
              {legalBasis}
            </p>
          </div>
        </div>

        {/* Right: Best Practices & Pitfalls */}
        <div className="space-y-3 p-4 rounded-xl bg-[#f7f9fb] border border-border">
          <div className="space-y-1.5">
            <span className="font-bold text-[#191c1e] flex items-center gap-1.5 text-xs">
              <Lightbulb className="w-3.5 h-3.5 text-[#004ac6]" /> Professional Best Practices
            </span>
            <ul className="space-y-1 text-[#434655] text-[11px] list-disc list-inside">
              {bestPractices.map((bp, i) => (
                <li key={i} className="leading-relaxed">{bp}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-border/60">
            <span className="font-bold text-[#ba1a1a] flex items-center gap-1.5 text-xs">
              <AlertTriangle className="w-3.5 h-3.5 text-[#ba1a1a]" /> Common Practitioner Pitfalls
            </span>
            <ul className="space-y-1 text-[#7d2d00] text-[11px] list-disc list-inside bg-[#ffede6]/50 p-2.5 rounded-lg border border-[#ffb596]/60">
              {pitfalls.map((pf, i) => (
                <li key={i} className="leading-relaxed">{pf}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Subtopic Knowledge Check */}
      <div className="p-4 sm:p-5 rounded-xl border border-[#b4c5ff] bg-gradient-to-br from-[#dbe1ff]/30 to-[#f7f9fb] space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs text-[#00174b] flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#004ac6]" /> Sub-Topic Knowledge Check
          </span>
          {submitted && (
            <Badge
              className={`text-[10px] font-bold ${
                isCorrect ? 'bg-[#004ac6] text-white' : 'bg-[#ffdad6] text-[#ba1a1a]'
              }`}
            >
              {isCorrect ? '✓ Correct Answer' : '✕ Needs Review'}
            </Badge>
          )}
        </div>

        <p className="text-xs font-semibold text-[#191c1e]">{question.question}</p>

        {/* Options */}
        <div className="space-y-2 pt-1">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOpt === idx
            let btnStyle = 'border-border bg-white text-[#434655] hover:bg-[#f2f4f6]'
            if (submitted) {
              if (idx === question.correctIndex) {
                btnStyle = 'border-[#004ac6] bg-[#dbe1ff] text-[#00174b] font-bold ring-1 ring-[#004ac6]'
              } else if (isSelected && !isCorrect) {
                btnStyle = 'border-[#ba1a1a] bg-[#ffdad6] text-[#ba1a1a]'
              }
            } else if (isSelected) {
              btnStyle = 'border-[#2563eb] bg-[#dbe1ff] text-[#00174b] font-bold ring-1 ring-[#2563eb]'
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleOptionSelect(idx)}
                className={`w-full text-left p-2.5 rounded-lg border text-xs transition flex items-start gap-2.5 ${btnStyle}`}
              >
                <span className="w-5 h-5 rounded-full bg-white border border-border flex items-center justify-center font-bold text-[10px] shrink-0 text-[#191c1e]">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-tight">{opt}</span>
              </button>
            )
          })}
        </div>

        {/* Submit / Reset Actions & Explanation */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {submitted ? (
            <div className="text-xs text-[#00174b] bg-white p-3 rounded-lg border border-border leading-relaxed w-full space-y-1">
              <strong className="block text-[11px] font-bold uppercase tracking-wider text-[#004ac6]">
                Statutory Explanation:
              </strong>
              <p className="text-[11.5px] text-[#434655]">{question.explanation}</p>
              <div className="pt-1">
                <Button size="sm" variant="outline" onClick={handleReset} className="text-[10px] h-6 px-2.5 border-border">
                  Retry Question
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end w-full">
              <Button
                size="sm"
                onClick={handleVerify}
                disabled={selectedOpt === null}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold h-8 px-4 shadow-xs rounded-lg"
              >
                Verify Answer
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
