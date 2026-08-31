import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { applicationId, candidateId, status, screeningScore, notes } = body

    if (!candidateId) {
      return NextResponse.json({ error: 'candidateId is required' }, { status: 400 })
    }

    // Update candidate quality tier
    const updatedCandidate = await prisma.candidate.update({
      where: { id: candidateId },
      data: {
        qualityTier: screeningScore >= 8 ? 'STRONG' : screeningScore >= 5 ? 'BORDERLINE' : 'UNQUALIFIED',
      },
    })

    // If application exists, upsert Shortlisting record
    if (applicationId) {
      await prisma.shortlisting.upsert({
        where: { applicationId },
        create: {
          applicationId,
          criteriaScores: JSON.stringify({ screeningScore, status: status || 'SCREENED' }),
          shortlisted: status !== 'REJECTED',
          notes: notes || 'Screening assessment recorded by HR recruiter.',
          scoredById: session.user.id,
        },
        update: {
          criteriaScores: JSON.stringify({ screeningScore, status: status || 'SCREENED' }),
          shortlisted: status !== 'REJECTED',
          notes: notes || 'Screening assessment recorded by HR recruiter.',
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: `Candidate ${updatedCandidate.fullName} screening scorecard saved with status: ${status || 'SCREENED'}.`,
      candidate: updatedCandidate,
    })
  } catch (error: any) {
    console.error('Candidate screening error:', error)
    return NextResponse.json({ error: error.message || 'Failed to screen candidate' }, { status: 500 })
  }
}
