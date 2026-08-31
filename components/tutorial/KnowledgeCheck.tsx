'use client'

import React, { useState } from 'react'
import { CheckCircle2, XCircle, RefreshCw, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export interface Question {
  prompt: string
  options: { id: string; text: string }[]
  correctId: string
  explanation: string
}

export interface KnowledgeCheckProps {
  id: string
  phaseSlug?: string
  questions: Question[]
}

export function KnowledgeCheck({ id, phaseSlug = 'workforce-planning', questions }: KnowledgeCheckProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const handleSelectOption = (qIndex: number, optionId: string) => {
    if (submittedAnswers[qIndex]) return
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optionId }))
  }

  const handleVerifyQuestion = async (qIndex: number) => {
    const selected = selectedAnswers[qIndex]
    if (!selected) {
      toast.error('Please select an option first.')
      return
    }

    const nextSubmitted = { ...submittedAnswers, [qIndex]: true }
    setSubmittedAnswers(nextSubmitted)

    // Check if all questions have been answered
    const allAnswered = questions.every((_, idx) => nextSubmitted[idx])
    if (allAnswered && !isCompleted) {
      setIsCompleted(true)
      await syncProgress(nextSubmitted)
    }
  }

  const handleRetryQuestion = (qIndex: number) => {
    setSubmittedAnswers((prev) => {
      const copy = { ...prev }
      delete copy[qIndex]
      return copy
    })
    setSelectedAnswers((prev) => {
      const copy = { ...prev }
      delete copy[qIndex]
      return copy
    })
  }

  const syncProgress = async (currentSubmitted: Record<number, boolean>) => {
    setIsSubmitting(true)
    try {
      // Calculate score
      let score = 0
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctId) {
          score += 1
        }
      })

      const res = await fetch('/api/tutorial/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phaseSlug,
          quizScore: score,
          quizTotal: questions.length,
          type: 'QUIZ',
        }),
      })

      if (res.ok) {
        toast.success(`Knowledge Check completed! Score: ${score}/${questions.length}`)
      }
    } catch (err) {
      console.error('Failed to sync quiz progress:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="my-6 rounded-xl border border-teal-200 bg-teal-50/40 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-teal-700" />
        <h4 className="font-semibold text-slate-900 text-base">Interactive Knowledge Check</h4>
      </div>

      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const isSubmitted = submittedAnswers[qIndex]
          const selected = selectedAnswers[qIndex]
          const isCorrect = selected === q.correctId

          return (
            <div key={qIndex} className="rounded-lg border border-slate-200 bg-white p-4 space-y-3">
              <p className="font-medium text-sm text-slate-900">
                {qIndex + 1}. {q.prompt}
              </p>

              <div className="space-y-2">
                {q.options.map((opt) => {
                  const isOptSelected = selected === opt.id
                  let btnStyle = 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'

                  if (isSubmitted) {
                    if (opt.id === q.correctId) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium'
                    } else if (isOptSelected && !isCorrect) {
                      btnStyle = 'border-red-400 bg-red-50 text-red-900'
                    } else {
                      btnStyle = 'opacity-60 border-slate-200 bg-slate-50 text-slate-600'
                    }
                  } else if (isOptSelected) {
                    btnStyle = 'border-teal-600 bg-teal-50 text-teal-900 font-medium ring-1 ring-teal-500'
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(qIndex, opt.id)}
                      className={`w-full text-left px-3 py-2.5 text-xs rounded-md border transition-all flex items-start justify-between gap-2 ${btnStyle}`}
                    >
                      <span>{opt.text}</span>
                      {isSubmitted && opt.id === q.correctId && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {isSubmitted && isOptSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      )}
                    </button>
                  )
                })}
              </div>

              {!isSubmitted ? (
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => handleVerifyQuestion(qIndex)}
                  disabled={!selected}
                  className="mt-2 text-xs h-8"
                >
                  Check Answer
                </Button>
              ) : (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div
                    className={`text-xs p-3 rounded-md mb-2 ${
                      isCorrect
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'bg-red-50 text-red-900 border border-red-200'
                    }`}
                  >
                    <div className="font-semibold mb-1 flex items-center gap-1">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Correct!
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-red-500" />
                          Incorrect
                        </>
                      )}
                    </div>
                    <p>{q.explanation}</p>
                  </div>
                  {!isCorrect && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRetryQuestion(qIndex)}
                      className="text-xs h-7 gap-1 text-slate-600"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Try Question Again
                    </Button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
