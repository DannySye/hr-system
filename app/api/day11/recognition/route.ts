import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { employeeId, type, notes } = await req.json()

    if (!notes || notes.trim().length < 15) {
      return NextResponse.json(
        { error: 'Recognition notes must contain specific documented evidence.' },
        { status: 400 }
      )
    }

    const employee = await prisma.employee.findFirst({
      where: {
        OR: [{ id: employeeId }, { name: 'Jordan Hayes' }, { fullName: 'Jordan Hayes' }],
      },
    })

    if (!employee) {
      return NextResponse.json({ error: 'Target employee not found' }, { status: 404 })
    }

    const record = await prisma.recognitionRecord.create({
      data: {
        employeeId: employee.id,
        type,
        notes,
      },
    })

    return NextResponse.json({ success: true, record })
  } catch (error) {
    console.error('Error saving recognition record:', error)
    return NextResponse.json({ error: 'Failed to save recognition record' }, { status: 500 })
  }
}
