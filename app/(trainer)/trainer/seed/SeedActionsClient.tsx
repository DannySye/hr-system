'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw, Check } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function SeedActionsClient() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleReseed = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/trainer/reseed', { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        toast.success(data.message || 'Seed completed successfully')
        router.refresh()
      } else {
        toast.error(data.error || 'Seed failed')
      }
    } catch (err) {
      toast.error('Failed to trigger database reseed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleReseed}
      disabled={loading}
      className="bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs h-9 px-4 gap-1.5 shadow-sm"
    >
      <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
      {loading ? 'Seeding...' : 'Verify / Reset Default Seed Data'}
    </Button>
  )
}
