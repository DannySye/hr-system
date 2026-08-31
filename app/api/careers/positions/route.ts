import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const positions = await prisma.position.findMany({
      include: {
        department: true,
        jobDescriptions: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        personSpecifications: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { title: 'asc' },
    })

    return NextResponse.json({ positions })
  } catch (error: any) {
    console.error('Fetch positions error:', error)
    return NextResponse.json({ error: 'Failed to fetch positions' }, { status: 500 })
  }
}
