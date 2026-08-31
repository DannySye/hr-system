import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting NovaLink HR Lab complete database seeding (Weeks 1 & 2)...')

  // 1. Clean existing records in development
  await prisma.trainerFeedback.deleteMany()
  await prisma.interviewAssessment.deleteMany()
  await prisma.interview.deleteMany()
  await prisma.shortlisting.deleteMany()
  await prisma.application.deleteMany()
  await prisma.referenceCheck.deleteMany()
  await prisma.selectionDecision.deleteMany()
  await prisma.offerContract.deleteMany()
  await prisma.employeeFile.deleteMany()
  await prisma.onboardingChecklistItem.deleteMany()
  await prisma.orientationLog.deleteMany()
  await prisma.probationReview.deleteMany()
  await prisma.attendanceRecord.deleteMany()
  await prisma.leaveBalance.deleteMany()
  await prisma.leaveRequest.deleteMany()
  await prisma.leaveType.deleteMany()
  await prisma.performanceAppraisal.deleteMany()
  await prisma.trainingRecord.deleteMany()
  await prisma.trainingCatalogItem.deleteMany()
  await prisma.welfareLog.deleteMany()
  await prisma.disciplinaryCase.deleteMany()
  await prisma.kpi.deleteMany()
  await prisma.jobAdvertisement.deleteMany()
  await prisma.personSpecification.deleteMany()
  await prisma.jobDescription.deleteMany()
  await prisma.vacancyRequest.deleteMany()
  await prisma.candidate.deleteMany()
  await prisma.employee.deleteMany()
  await prisma.position.deleteMany()
  await prisma.department.deleteMany()
  await prisma.company.deleteMany()
  await prisma.aiPersona.deleteMany()
  await prisma.tutorialProgress.deleteMany()
  await prisma.traineeProgress.deleteMany()
  await prisma.simulationCalendar.deleteMany()
  await prisma.user.deleteMany()

  // 2. Hash default passwords
  const trainerPassword = await bcrypt.hash('trainer123', 10)
  const traineePassword = await bcrypt.hash('trainee123', 10)

  // 3. Create Users
  const trainer = await prisma.user.create({
    data: {
      email: 'trainer@novalink.com',
      passwordHash: trainerPassword,
      role: 'TRAINER',
      fullName: 'Eleanor Vance (Lead Trainer)',
    },
  })

  const trainee = await prisma.user.create({
    data: {
      email: 'trainee@novalink.com',
      passwordHash: traineePassword,
      role: 'TRAINEE',
      fullName: 'Alex Mercer (HR Trainee)',
    },
  })

  // 4. Create Company
  const company = await prisma.company.create({
    data: {
      name: 'NovaLink Global',
      mission: 'Pioneering distributed infrastructure and empowering connected global teams with human-centric operations.',
      vision: 'A world where high-performing organizations operate seamlessly and empathetically across global borders.',
      orgChartNotes: 'Matrix organization with functional departments: Human Resources, Network Operations, Engineering, and Customer Success.',
    },
  })

  // 5. Create Departments
  const deptHr = await prisma.department.create({
    data: { companyId: company.id, name: 'Human Resources', headOfDept: 'Eleanor Vance' },
  })
  const deptNetOps = await prisma.department.create({
    data: { companyId: company.id, name: 'Network Operations', headOfDept: 'Marcus Chen' },
  })
  const deptEng = await prisma.department.create({
    data: { companyId: company.id, name: 'Engineering', headOfDept: 'Marcus Chen' },
  })
  const deptOps = await prisma.department.create({
    data: { companyId: company.id, name: 'Operations', headOfDept: 'Sarah Jenkins' },
  })
  const deptCs = await prisma.department.create({
    data: { companyId: company.id, name: 'Customer Success', headOfDept: 'David Okafor' },
  })

  // 6. Create Positions
  const posFieldEngineer = await prisma.position.create({
    data: {
      departmentId: deptNetOps.id,
      title: 'Field Engineer',
      jobPurpose: 'Deploy, configure, and maintain mission-critical distributed network infrastructure across client sites.',
      salaryBand: '£42,000 - £52,000',
      location: 'Hybrid / Greater London Hub',
      workingHours: '40 hrs/week (Mon-Fri 08:30 - 17:00, with on-call rotation)',
    },
  })

  const posBackendEngineer = await prisma.position.create({
    data: {
      departmentId: deptEng.id,
      title: 'Senior Backend Engineer',
      jobPurpose: 'Architect, build, and maintain high-throughput data pipelines and API microservices.',
      salaryBand: '£75,000 - £90,000',
      location: 'Remote (UK / EU)',
      workingHours: '40 hrs/week Flexible',
    },
  })

  const posOpsAssociate = await prisma.position.create({
    data: {
      departmentId: deptOps.id,
      title: 'Operations Associate',
      jobPurpose: 'Coordinate logistics, vendor inventory, and day-to-day office fulfillment workflows.',
      salaryBand: '£32,000 - £38,000',
      location: 'London Hub',
      workingHours: '37.5 hrs/week (09:00 - 17:30)',
    },
  })

  // 7. Seed Calendar (Days 1 - 12)
  const calendarData = [
    { dayNumber: 1, stageLabels: 'Workforce Planning & Job Analysis' },
    { dayNumber: 2, stageLabels: 'Sourcing Strategy & Job Adverts' },
    { dayNumber: 3, stageLabels: 'Selection Shortlisting & Interviewing' },
    { dayNumber: 4, stageLabels: 'Offer Letters & Employment Contracts' },
    { dayNumber: 5, stageLabels: 'Onboarding & Induction Design' },
    { dayNumber: 6, stageLabels: 'Probationary Review & Attendance Register' },
    { dayNumber: 7, stageLabels: 'Performance Appraisal & 360 Feedback' },
    { dayNumber: 8, stageLabels: 'Learning & Development Needs Analysis' },
    { dayNumber: 9, stageLabels: 'Employee Welfare & Grievance Procedures' },
    { dayNumber: 10, stageLabels: 'Disciplinary & Statutory Fair Process' },
    { dayNumber: 11, stageLabels: 'Total Reward, Recognition & Benefits Policy' },
    { dayNumber: 12, stageLabels: 'Exit Interviews & Offboarding Synthesis' },
  ]

  for (const cal of calendarData) {
    await prisma.simulationCalendar.create({
      data: {
        dayNumber: cal.dayNumber,
        stageLabels: cal.stageLabels,
        manualUnlock: cal.dayNumber === 1,
      },
    })
  }

  // 8. Initialize Trainee Progress
  for (let day = 1; day <= 12; day++) {
    await prisma.traineeProgress.create({
      data: {
        traineeId: trainee.id,
        dayNumber: day,
        status: day === 1 ? 'IN_PROGRESS' : 'LOCKED',
      },
    })
  }

  // 9. Create Hiring Manager Persona (Marcus Chen)
  const personaMarcus = await prisma.aiPersona.create({
    data: {
      name: 'Marcus Chen',
      personaType: 'MANAGER',
      qualityTier: 'STRONG',
      backgroundBrief: 'Head of Network Operations and Engineering at NovaLink. Scoping an urgent Field Engineer vacancy caused by regional hub expansion.',
      personalityNotes: 'Direct, analytical, values network uptime and structured procedures. Emphasizes optical cabling experience and on-call reliability.',
      voiceSettings: JSON.stringify({ pitch: 0.95, rate: 1.05 }),
    },
  })

  // 10. Create Referee Persona (Dr. Evelyn Vance)
  const personaReferee = await prisma.aiPersona.create({
    data: {
      name: 'Dr. Arthur Sterling',
      personaType: 'REFEREE',
      qualityTier: 'STRONG',
      backgroundBrief: 'Former Engineering Director at Apex Communications. Providing an employment reference for the top-performing candidate.',
      personalityNotes: 'Professional, articulate, confirms employment dates, praises technical rigor, and affirms strong workplace integrity.',
      voiceSettings: JSON.stringify({ pitch: 1.0, rate: 1.0 }),
    },
  })

  // 11. Create Candidates Bank (Week 1 Day 2/3)
  const candidatesRaw = [
    {
      name: 'Jordan Hayes',
      email: 'jordan.hayes@example.com',
      phone: '+44 7700 900123',
      tier: 'STRONG',
      cv: 'BSc Computer Systems & Networking. 6 years field engineering experience at British Telecom and Cloudflare. Certified Cisco CCNP, fiber optical splicing, Linux sysadmin. Highly structured STAR communicator with excellent troubleshooting track record.',
      brief: 'Top tier candidate with 6 years fiber network deployment experience. Answers using structured STAR methodology.',
      style: 'Confident, articulate, provides measurable metrics and clear incident response steps.',
    },
    {
      name: 'Casey Rivera',
      email: 'casey.rivera@example.com',
      phone: '+44 7700 900456',
      tier: 'BORDERLINE',
      cv: 'HND Electrical Engineering. 3 years junior telecom technician. Basic router configuration, hardware rack assembly, valid UK driving license. Enthusiastic but lacks advanced protocol diagnostics and team leadership experience.',
      brief: 'Borderline candidate with solid foundational field skills but lacks depth on complex fiber troubleshooting.',
      style: 'Polite, enthusiastic, occasionally gives textbook answers when probed on complex edge cases.',
    },
    {
      name: 'Sam Taylor',
      email: 'sam.taylor@example.com',
      phone: '+44 7700 900789',
      tier: 'UNQUALIFIED',
      cv: 'High school diploma. 1 year consumer retail electronics support. Looking to transition into enterprise networking. No direct cabling or router configuration experience.',
      brief: 'Unqualified candidate with no enterprise infrastructure experience. Struggles with fundamental networking concepts.',
      style: 'Hesitant, deflecting, relies on generic buzzwords when asked technical diagnostic questions.',
    },
    {
      name: 'Morgan Blake',
      email: 'morgan.blake@example.com',
      phone: '+44 7700 900331',
      tier: 'STRONG',
      cv: 'BEng Electronic Engineering. 5 years network field ops. Specialist in data center racking, power distribution units, and zero-downtime cutovers.',
      brief: 'Strong secondary candidate with high data center deployment expertise.',
      style: 'Pragmatic, structured, detail-oriented.',
    },
  ]

  for (const c of candidatesRaw) {
    const persona = await prisma.aiPersona.create({
      data: {
        name: c.name,
        personaType: 'CANDIDATE',
        qualityTier: c.tier,
        backgroundBrief: c.brief,
        personalityNotes: c.style,
        voiceSettings: JSON.stringify({ pitch: 1.0, rate: 1.0 }),
      },
    })

    const candidate = await prisma.candidate.create({
      data: {
        fullName: c.name,
        email: c.email,
        phone: c.phone,
        qualityTier: c.tier,
        cvText: c.cv,
        aiPersonaId: persona.id,
      },
    })

    await prisma.application.create({
      data: {
        candidateId: candidate.id,
        positionId: posFieldEngineer.id,
        dayNumber: 2,
      },
    })
  }

  // 12. Create Leave Types (Week 2)
  const leaveAnnual = await prisma.leaveType.create({ data: { name: 'Annual', defaultEntitlement: 24 } })
  const leaveSick = await prisma.leaveType.create({ data: { name: 'Sick', defaultEntitlement: 10 } })
  const leaveMat = await prisma.leaveType.create({ data: { name: 'Maternity', defaultEntitlement: 90 } })
  const leavePat = await prisma.leaveType.create({ data: { name: 'Paternity', defaultEntitlement: 7 } })

  // 13. Create Training Catalog (Week 2)
  await prisma.trainingCatalogItem.createMany({
    data: [
      { title: 'NovaLink Global IT & Compliance Induction', category: 'INDUCTION' },
      { title: 'Advanced Distributed Microservices & Fiber Diagnostics', category: 'TECHNICAL' },
      { title: 'Cross-Functional Communication & Conflict De-escalation', category: 'SOFT_SKILLS' },
      { title: 'UK GDPR, Data Security & Workplace Safety Protocols', category: 'COMPLIANCE' },
    ],
  })

  // 14. Create Week 2 Personas & Employees
  const personaRiley = await prisma.aiPersona.create({
    data: {
      name: 'Riley Morgan',
      personaType: 'EMPLOYEE',
      qualityTier: 'STRONG',
      backgroundBrief: 'Newly hired Operations Associate completing Week 1 of probation. Enthusiastic, meticulous with logistics.',
      personalityNotes: 'Polite, thoughtful, open about settling-in questions.',
    },
  })

  const personaJordanReed = await prisma.aiPersona.create({
    data: {
      name: 'Jordan Reed',
      personaType: 'EMPLOYEE',
      qualityTier: 'BORDERLINE',
      backgroundBrief: 'Logistics Associate with 4 recent unnotified lateness incidents due to train signaling delays.',
      personalityNotes: 'Defensive if accused, but transparent when walked through facts calmly.',
    },
  })

  const empRiley = await prisma.employee.create({
    data: {
      name: 'Riley Morgan',
      fullName: 'Riley Morgan',
      employeeCode: 'NL-1001',
      email: 'riley.morgan@novalink.com',
      jobTitle: 'Operations Associate',
      departmentName: 'Operations',
      departmentId: deptOps.id,
      positionId: posOpsAssociate.id,
      aiPersonaId: personaRiley.id,
    },
  })

  const empJordanReed = await prisma.employee.create({
    data: {
      name: 'Jordan Reed',
      fullName: 'Jordan Reed',
      employeeCode: 'NL-1002',
      email: 'jordan.reed@novalink.com',
      jobTitle: 'Logistics Associate',
      departmentName: 'Operations',
      departmentId: deptOps.id,
      positionId: posOpsAssociate.id,
      aiPersonaId: personaJordanReed.id,
    },
  })

  // Leave balances for active staff
  for (const emp of [empRiley, empJordanReed]) {
    await prisma.leaveBalance.createMany({
      data: [
        { employeeId: emp.id, leaveTypeId: leaveAnnual.id, entitled: 24, used: 2, balance: 22 },
        { employeeId: emp.id, leaveTypeId: leaveSick.id, entitled: 10, used: 0, balance: 10 },
        { employeeId: emp.id, leaveTypeId: leaveMat.id, entitled: 90, used: 0, balance: 90 },
        { employeeId: emp.id, leaveTypeId: leavePat.id, entitled: 7, used: 0, balance: 7 },
      ],
    })
  }

  // Seed 10-day attendance baseline (Jordan Reed has 4 latenesses)
  const baseDate = new Date('2026-08-15T09:00:00Z')
  for (let i = 0; i < 10; i++) {
    const dayDate = new Date(baseDate)
    dayDate.setDate(baseDate.getDate() + i)
    if (dayDate.getDay() === 0 || dayDate.getDay() === 6) continue

    await prisma.attendanceRecord.create({
      data: {
        employeeId: empRiley.id,
        date: dayDate,
        timeIn: '08:55',
        timeOut: '17:35',
        status: 'PRESENT',
        remarks: 'On time, active shift.',
      },
    })

    const isLate = i === 1 || i === 3 || i === 6 || i === 8
    await prisma.attendanceRecord.create({
      data: {
        employeeId: empJordanReed.id,
        date: dayDate,
        timeIn: isLate ? (i === 1 ? '09:42' : i === 3 ? '09:55' : i === 6 ? '09:38' : '09:49') : '08:58',
        timeOut: '17:30',
        status: isLate ? 'LATE' : 'PRESENT',
        remarks: isLate
          ? 'Late arrival: Transport disruption on central commuter line, no prior notification.'
          : 'Punctual arrival.',
      },
    })
  }

  console.log('✅ NovaLink database seeded with Week 1 candidates and Week 2 continuous operations!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
