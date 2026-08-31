import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
      orderBy: { dateReceived: 'desc' },
    })

    return NextResponse.json({ applications })
  } catch (error: any) {
    console.error('Fetch applications error:', error)
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
  }
}
