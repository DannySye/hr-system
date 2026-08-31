import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting NovaLink HR Lab complete database seeding (Weeks 1, 2 & 3)...')

  // 1. Clean existing records in development
  await prisma.analyticsSummary.deleteMany()
  await prisma.exitInterview.deleteMany()
  await prisma.exitRecord.deleteMany()
  await prisma.recognitionRecord.deleteMany()
  await prisma.careerDevelopmentPlan.deleteMany()
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
      title: 'Field Engineer (Optical Infrastructure)',
      salaryBand: '£42,000 – £52,000',
      location: 'London Regional Operations Hub & UK Field Sites',
      workingHours: '37.5 hours / week, on-call rota',
      jobPurpose: 'Deploy, configure, and maintain mission-critical optical transmission cutovers and regional network nodes with 99.98% uptime SLA.',
    },
  })

  const posSeniorFieldEngineer = await prisma.position.create({
    data: {
      departmentId: deptNetOps.id,
      title: 'Senior Field Engineer & Infrastructure Lead',
      salaryBand: '£55,000 – £68,000',
      location: 'London Operations Hub & Hybrid',
      workingHours: '37.5 hours / week',
      jobPurpose: 'Lead complex metropolitan fiber architectures, mentor junior field engineers, and manage high-severity incident responses.',
    },
  })

  const posOpsAssociate = await prisma.position.create({
    data: {
      departmentId: deptOps.id,
      title: 'Operations Associate',
      salaryBand: '£30,000 – £36,000',
      location: 'London HQ / Hybrid',
      workingHours: '37.5 hours / week',
      jobPurpose: 'Coordinate logistics dispatch, tracking, and operational inventory across customer deployments.',
    },
  })

  const posSystemsSpecialist = await prisma.position.create({
    data: {
      departmentId: deptNetOps.id,
      title: 'Network Systems Specialist',
      salaryBand: '£45,000 – £54,000',
      location: 'London Regional Hub',
      workingHours: '37.5 hours / week',
      jobPurpose: 'Maintain network monitoring telemetry, diagnose edge routing anomalies, and coordinate vendor hardware RMAs.',
    },
  })

  // 7. Initialize 12-Day Simulation Calendar
  const calendarData = [
    { dayNumber: 1, stageLabels: 'Workforce Planning & Job Analysis' },
    { dayNumber: 2, stageLabels: 'Talent Sourcing & Job Advertisements' },
    { dayNumber: 3, stageLabels: 'Selection Shortlisting & STAR Interviewing' },
    { dayNumber: 4, stageLabels: 'Referee Verification, Selection & Statutory Contracts' },
    { dayNumber: 5, stageLabels: '3-Pillar Induction & Onboarding Setup' },
    { dayNumber: 6, stageLabels: 'Probation Benchmarks & Milestone Check-in' },
    { dayNumber: 7, stageLabels: 'SMART KPIs & 360-Degree Appraisal Synthesis' },
    { dayNumber: 8, stageLabels: 'Training Needs Analysis & Kirkpatrick L&D' },
    { dayNumber: 9, stageLabels: 'Employee Welfare & Formal Grievance Resolution' },
    { dayNumber: 10, stageLabels: 'ACAS Statutory Disciplinary & Attendance Investigation' },
    { dayNumber: 11, stageLabels: 'Career Development & Evidence-Based Recognition' },
    { dayNumber: 12, stageLabels: 'Separation Diagnostics, Exit & Capstone Analytics' },
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

  // 9. Create Manager Persona (Marcus Chen)
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

  // 10. Create Referee Persona (Dr. Arthur Sterling)
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

  // 11. Create Candidates Bank
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

  let jordanCandidateId = ''
  let jordanPersonaId = ''

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

    if (c.name === 'Jordan Hayes') {
      jordanPersonaId = persona.id
    }

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

    if (c.name === 'Jordan Hayes') {
      jordanCandidateId = candidate.id
    }

    await prisma.application.create({
      data: {
        candidateId: candidate.id,
        positionId: posFieldEngineer.id,
        dayNumber: 2,
      },
    })
  }

  // 12. Create Leave Types
  const leaveAnnual = await prisma.leaveType.create({ data: { name: 'Annual', defaultEntitlement: 24 } })
  const leaveSick = await prisma.leaveType.create({ data: { name: 'Sick', defaultEntitlement: 10 } })
  const leaveMat = await prisma.leaveType.create({ data: { name: 'Maternity', defaultEntitlement: 90 } })
  const leavePat = await prisma.leaveType.create({ data: { name: 'Paternity', defaultEntitlement: 7 } })

  // 13. Create Training Catalog
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

  // 15. Create Second Pre-existing Employee for Day 12 Exit Storyline (Elena Rostova)
  const personaElena = await prisma.aiPersona.create({
    data: {
      name: 'Elena Rostova',
      personaType: 'EMPLOYEE',
      qualityTier: 'STRONG',
      backgroundBrief: 'Network Systems Specialist who has been with NovaLink for 2.5 years. Resigning due to family relocation to Frankfurt and pursuing an opportunity in international telecoms architecture.',
      personalityNotes: 'Professional, appreciative of NovaLink team, constructive about documentation bottlenecks, eager to ensure a comprehensive handover.',
      voiceSettings: JSON.stringify({ pitch: 1.05, rate: 1.0 }),
    },
  })

  const empRiley = await prisma.employee.create({
    data: {
      id: 'emp-101',
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
      id: 'emp-102',
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

  const empElena = await prisma.employee.create({
    data: {
      id: 'emp-103',
      name: 'Elena Rostova',
      fullName: 'Elena Rostova',
      employeeCode: 'NL-1003',
      email: 'elena.rostova@novalink.com',
      jobTitle: 'Network Systems Specialist',
      departmentName: 'Network Operations',
      departmentId: deptNetOps.id,
      positionId: posSystemsSpecialist.id,
      aiPersonaId: personaElena.id,
      startDate: new Date('2024-02-15T09:00:00Z'),
    },
  })

  // Create Storyline Employee (Jordan Hayes) representing the hired candidate
  const empJordanHayes = await prisma.employee.create({
    data: {
      id: 'emp-100',
      name: 'Jordan Hayes',
      fullName: 'Jordan Hayes',
      employeeCode: 'NL-1000',
      email: 'jordan.hayes@novalink.com',
      jobTitle: 'Field Engineer (Optical Infrastructure)',
      departmentName: 'Network Operations',
      departmentId: deptNetOps.id,
      positionId: posFieldEngineer.id,
      candidateOriginId: jordanCandidateId,
      aiPersonaId: jordanPersonaId,
      employmentStatus: 'CONFIRMED',
      startDate: new Date('2026-08-01T09:00:00Z'),
    },
  })

  // Seed Day 11 Evidence for Jordan Hayes: Performance Appraisal & Probation Review
  await prisma.probationReview.create({
    data: {
      employeeId: empJordanHayes.id,
      checkpoint: 'END',
      objectivesMet: JSON.stringify({
        opticalCutoverCompetency: true,
        incidentSlaCompliance: true,
        teamIntegration: true,
        attendanceReliability: true,
      }),
      notes: 'Completed 6-month probation with exceptional ratings. Demonstrated rapid mastery of optical cutovers with zero downtime incidents.',
      outcome: 'CONFIRM',
      dayNumber: 6,
    },
  })

  await prisma.performanceAppraisal.create({
    data: {
      employeeId: empJordanHayes.id,
      periodLabel: 'H1 2026 Mid-Year Appraisal',
      selfAssessment: 'Exceeded all SLA targets for metropolitan fiber cutovers. Interested in acquiring advanced DWDM certifications and mentoring new field technicians.',
      supervisorNotes: 'Marcus Chen noted: Top 5% performance across regional infrastructure. Demonstrated strong leadership during the Shoreditch node cutover.',
      colleagueFeedback: 'Peers commend Jordan for clear communication, calm composure under pressure, and willingness to share optical test scripts.',
      strengths: 'Fast troubleshooting, thorough documentation, high adherence to statutory health and safety standards.',
      weaknesses: 'Occasional reluctance to delegate lower-tier splicing tasks during emergency calls.',
      trainingNeeds: 'Advanced Dense Wavelength Division Multiplexing (DWDM) and leadership mentoring skills.',
      futureObjectives: 'Lead the Q4 London core backbone upgrade and prepare for Senior Field Engineer transition within 12-18 months.',
      dayNumber: 7,
    },
  })

  // Leave balances for active staff
  for (const emp of [empJordanHayes, empRiley, empJordanReed, empElena]) {
    await prisma.leaveBalance.createMany({
      data: [
        { employeeId: emp.id, leaveTypeId: leaveAnnual.id, entitled: 24, used: 2, balance: 22 },
        { employeeId: emp.id, leaveTypeId: leaveSick.id, entitled: 10, used: 0, balance: 10 },
        { employeeId: emp.id, leaveTypeId: leaveMat.id, entitled: 90, used: 0, balance: 90 },
        { employeeId: emp.id, leaveTypeId: leavePat.id, entitled: 7, used: 0, balance: 7 },
      ],
    })
  }

  // Seed attendance baseline for all employees from Day 6 onward
  const baseDate = new Date('2026-08-15T09:00:00Z')
  for (let i = 0; i < 10; i++) {
    const dayDate = new Date(baseDate)
    dayDate.setDate(baseDate.getDate() + i)
    if (dayDate.getDay() === 0 || dayDate.getDay() === 6) continue

    // Jordan Hayes: Punctual & Present
    await prisma.attendanceRecord.create({
      data: {
        employeeId: empJordanHayes.id,
        date: dayDate,
        timeIn: '08:48',
        timeOut: '17:30',
        status: 'PRESENT',
        remarks: 'On-time arrival, field dispatch active.',
      },
    })

    // Riley Morgan: Punctual & Present
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

    // Elena Rostova: Present & Punctual
    await prisma.attendanceRecord.create({
      data: {
        employeeId: empElena.id,
        date: dayDate,
        timeIn: '08:50',
        timeOut: '17:30',
        status: 'PRESENT',
        remarks: 'Punctual shift, assisting systems telemetry.',
      },
    })

    // Jordan Reed: 4 Latenesses
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

  console.log('✅ NovaLink database seeded with Week 1 candidates, Week 2 continuous operations, and Week 3 career/exit scenarios!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
