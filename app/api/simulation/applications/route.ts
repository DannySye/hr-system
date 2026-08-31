import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      include: {
        candidate: {
          include: {
            aiPersona: true,
          },
        },
        position: {
          include: {
            department: true,
          },
        },
        shortlisting: true,
      },
      orderBy: {
        dateReceived: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      count: applications.length,
      applications: applications.map((app) => ({
        id: app.id,
        candidateId: app.candidateId,
        candidateName: app.candidate?.fullName ?? 'Anonymous Candidate',
        email: app.candidate?.email ?? '',
        phone: app.candidate?.phone ?? '',
        qualityTier: app.candidate?.qualityTier ?? 'STRONG',
        positionTitle: app.position?.title ?? 'Field Engineer',
        department: app.position?.department?.name ?? 'Network Operations',
        dateReceived: app.dateReceived,
        status: app.shortlisting ? 'SHORTLISTED' : 'PENDING_REVIEW',
        cvSnippet: app.candidate?.cvText?.slice(0, 200) ?? '',
        isPublicPortalApplicant: true,
      })),
    })
  } catch (error: any) {
    console.error('Error fetching simulation applications:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}
