'use client'

import React, { useState } from 'react'
import { FileSignature, Printer, CheckCircle, Send } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export function OfferContractGenerator({
  candidateName = 'Jordan Hayes',
  onSignContract,
}: {
  candidateName?: string
  onSignContract?: (contract: any) => void
}) {
  const [startDate, setStartDate] = useState('2026-09-01')
  const [salary, setSalary] = useState('£48,000')
  const [probationMonths, setProbationMonths] = useState('3')
  const [leaveDays, setLeaveDays] = useState('24')
  const [benefits, setBenefits] = useState(
    'Private Health Insurance, 6% Matched Pension, £3,000 On-Call Allowance, 24 Days Paid Annual Leave.'
  )
  const [terms, setTerms] = useState(
    'This employment contract is governed by the laws of England and Wales under the Employment Rights Act 1996. Standard notice period: 1 month during probation, 3 months thereafter.'
  )
  const [status, setStatus] = useState<'DRAFT' | 'SIGNED'>('DRAFT')
  const isSigned = status === 'SIGNED'

  const handleSign = () => {
    setStatus('SIGNED')
    toast.success(`Contract signed! Employee file created for ${candidateName}.`)
    if (onSignContract) {
      onSignContract({
        candidateName,
        startDate,
        salary,
        probationMonths,
        leaveDays,
        benefits,
        terms,
      })
    }
  }

  return (
    <Card id="offer-contract" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSignature className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">
              Employment Offer & Formal Contract Generator
            </CardTitle>
          </div>
          <Badge
            variant={isSigned ? 'success' : 'outline'}
            className="text-[10px]"
          >
            {isSigned ? 'Contract Signed & Sealed' : 'Contract in Draft'}
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Generate statutory UK employment contract terms. Signing formally initiates the employee record.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Official Start Date</label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={isSigned}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Annual Base Salary</label>
            <Input
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              disabled={isSigned}
              className="text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Probation Period (Months)</label>
            <Input
              type="number"
              value={probationMonths}
              onChange={(e) => setProbationMonths(e.target.value)}
              disabled={isSigned}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Annual Leave Entitlement (Days)</label>
            <Input
              type="number"
              value={leaveDays}
              onChange={(e) => setLeaveDays(e.target.value)}
              disabled={isSigned}
              className="text-xs"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Benefits & Allowances Package</label>
          <Textarea
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
            disabled={isSigned}
            className="text-xs min-h-[50px]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Statutory Employment Terms</label>
          <Textarea
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            disabled={isSigned}
            className="text-xs min-h-[50px]"
          />
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <span className="text-[11px] text-slate-500">
            Sign-off creates employee profile in NovaLink ERP.
          </span>

          <Button
            onClick={handleSign}
            disabled={isSigned}
            className={`text-xs h-8 px-5 gap-1.5 font-semibold ${
              isSigned ? 'bg-emerald-600' : 'bg-teal-700 hover:bg-teal-800'
            } text-white`}
          >
            {isSigned ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" /> Contract Signed
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" /> Sign & Execute Contract
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
