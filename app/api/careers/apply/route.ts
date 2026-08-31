import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PersonaType, QualityTier } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      fullName,
      email,
      phone,
      positionId,
      cvText,
      coverLetter = '',
      experienceYears = '3',
      screeningAnswers = {},
    } = body

    if (!fullName || !email || !cvText) {
      return NextResponse.json(
        { error: 'Full Name, Email, and CV / Resume details are required.' },
        { status: 400 }
      )
    }

    const cleanName = fullName.trim()
    const cleanEmail = email.toLowerCase().trim()
    const cleanPhone = phone ? phone.trim() : '+44 7700 900000'

    let targetPos = null
    if (positionId) {
      targetPos = await prisma.position.findUnique({
        where: { id: positionId },
      })
    }

    if (!targetPos) {
      targetPos = (await prisma.position.findFirst({
        where: { title: { contains: 'Field' } },
      })) || (await prisma.position.findFirst())
    }

    if (!targetPos) {
      return NextResponse.json({ error: 'No active job position found' }, { status: 404 })
    }

    // Determine quality tier based on experience length or qualifications
    const expNum = parseInt(experienceYears, 10) || 3
    let qualityTier: QualityTier = QualityTier.STRONG
    if (expNum < 2) {
      qualityTier = QualityTier.UNQUALIFIED
    } else if (expNum <= 4) {
      qualityTier = QualityTier.BORDERLINE
    }

    // 1. Create AI Persona for the candidate
    const persona = await prisma.aiPersona.create({
      data: {
        name: cleanName,
        personaType: PersonaType.CANDIDATE,
        qualityTier,
        backgroundBrief: `Applied via public careers portal for ${targetPos.title}. ${expNum} years relevant experience. Candidate summary: ${cvText.slice(0, 300)}... Cover letter highlight: ${coverLetter.slice(0, 200)}`,
        personalityNotes:
          qualityTier === QualityTier.STRONG
            ? 'Confident, articulate, structured STAR communicator with strong technical troubleshooting track record.'
            : qualityTier === QualityTier.BORDERLINE
            ? 'Enthusiastic and cooperative, but requires probing on complex technical edge cases and team leadership.'
            : 'Polite but lacks deep technical foundation, answers generically when probed on system architecture.',
        voiceSettings: JSON.stringify({ pitch: 1.0, rate: 1.0 }),
      },
    })

    // 2. Create Candidate record
    const candidate = await prisma.candidate.create({
      data: {
        fullName: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        qualityTier,
        cvText: `${cvText}\n\n[Cover Letter]:\n${coverLetter}`,
        aiPersonaId: persona.id,
      },
    })

    // 3. Create Application record
    const application = await prisma.application.create({
      data: {
        candidateId: candidate.id,
        positionId: targetPos.id,
        dayNumber: 2,
      },
    })

    const refNumber = `NL-APP-2026-${Math.floor(1000 + Math.random() * 9000)}`

    return NextResponse.json(
      {
        message: 'Application received successfully.',
        referenceNumber: refNumber,
        candidate: {
          id: candidate.id,
          name: candidate.fullName,
          email: candidate.email,
        },
        applicationId: application.id,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Career application submission error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to submit application' },
      { status: 500 }
    )
  }
}
