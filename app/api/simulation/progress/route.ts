import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getTraineeFullTimeline } from '@/lib/day-gating'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role === 'TRAINER') {
      // Trainers have preview access to all days
      const timeline = Array.from({ length: 12 }, (_, i) => ({
        dayNumber: i + 1,
        isUnlocked: true,
        status: 'IN_PROGRESS',
      }))
      return NextResponse.json({ timeline, role: 'TRAINER' })
    }

    const timeline = await getTraineeFullTimeline(session.user.id)
    return NextResponse.json({ timeline, role: session.user.role })
  } catch (error: any) {
    console.error('Fetch simulation progress error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}
