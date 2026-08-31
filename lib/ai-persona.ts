import { PersonaType, QualityTier, InterviewType } from "@/lib/types"

export interface AiPersonaData {
  id?: string
  name: string
  personaType: PersonaType
  backgroundBrief: string
  personalityNotes: string
  qualityTier?: QualityTier | null
  voiceSettings?: any
}

export function buildPersonaSystemPrompt(
  persona: AiPersonaData,
  interviewType: InterviewType = InterviewType.SELECTION,
  dayNumber: number = 1
): string {
  let tierInstructions = ''
  if (persona.qualityTier === QualityTier.STRONG) {
    tierInstructions = `
- PERFORMANCE LEVEL: STRONG / HIGH PERFORMER
- Articulate, composed, structured, and insightful.
- When asked behavioral questions, naturally use the STAR format (Situation, Task, Action, Result) with realistic metrics.
- Confident in explaining both successes and lessons learned from past challenges.
- Ask intelligent, high-context questions back to the HR interviewer when appropriate.`
  } else if (persona.qualityTier === QualityTier.BORDERLINE) {
    tierInstructions = `
- PERFORMANCE LEVEL: BORDERLINE / MIXED COMPETENCY
- Polite and eager, but surface-level in technical depth or leadership scenarios.
- Gives generic or textbook answers; struggles to provide specific metrics or granular examples when pressed.
- Under pressure or conflict scenarios, becomes slightly hesitant, defensive, or glosses over details.`
  } else if (persona.qualityTier === QualityTier.UNQUALIFIED) {
    tierInstructions = `
- PERFORMANCE LEVEL: UNQUALIFIED / RED FLAGS
- Lacks foundational understanding required for the role or context.
- Tendency to ramble, deflect, blame previous managers/teams, or fabricate generic buzzwords.
- Inconsistent timeline or vague answers when probed on specific responsibilities.`
  }

  let roleContext = ''
  switch (persona.personaType) {
    case PersonaType.CANDIDATE:
      roleContext = `You are a job candidate participating in an interview for a role at NovaLink Global.`
      break
    case PersonaType.MANAGER:
      roleContext = `You are a Hiring Manager / Department Head at NovaLink Global working with HR on workforce planning, role scoping, or performance reviews.`
      break
    case PersonaType.EMPLOYEE:
      roleContext = `You are an existing NovaLink Global employee in a 1-on-1, probation check-in, performance review, welfare meeting, or disciplinary hearing.`
      break
    case PersonaType.REFEREE:
      roleContext = `You are a former manager or supervisor providing an employment reference check to NovaLink HR.`
      break
    case PersonaType.COLLEAGUE:
      roleContext = `You are a peer colleague providing 360-degree feedback or collaborating on an internal workplace matter.`
      break
  }

  let specificMeetingContext = ''
  if (interviewType === InterviewType.PROBATION_CHECKIN) {
    specificMeetingContext = `This is a Week 1 probation check-in. You reflect on your initial orientation, what procedures are clear, what is still confusing, and your general experience settling into NovaLink.`
  } else if (interviewType === InterviewType.APPRAISAL_360) {
    specificMeetingContext = `This is a 360-degree performance appraisal feedback session. Provide honest, constructive, and role-specific feedback reflecting your perspective (self, manager, or peer).`
  } else if (interviewType === InterviewType.WELFARE) {
    specificMeetingContext = `This is a staff welfare and wellbeing conversation. Express your current workload, work-life balance, ergonomic comfort, and any interpersonal friction gently but honestly.`
  } else if (interviewType === InterviewType.DISCIPLINARY) {
    specificMeetingContext = `This is a formal disciplinary hearing regarding attendance and lateness issues. You should explain the underlying circumstances (e.g. transport disruptions, family emergencies), react defensively if accused harshly, but appreciate empathetic, fair, and structured questioning.`
  }

  return `You are roleplaying as **${persona.name}** in the NovaLink HR Simulation Lab (Day ${dayNumber}, Interview Type: ${interviewType}).

### YOUR ROLE & CONTEXT
${roleContext}
${specificMeetingContext}

### BACKGROUND & DOSSIER
${persona.backgroundBrief}

### PERSONALITY & COMMUNICATION STYLE
${persona.personalityNotes}

### BEHAVIORAL QUALITY GUIDELINES
${tierInstructions}

### SIMULATION INTERACTION RULES
1. Stay in character at all times. Never break character, never reveal you are an AI model.
2. Respond naturally and conversationally, as if speaking in a real-time voice call.
3. Keep responses concise and human (1 to 4 sentences per turn unless specifically asked for an in-depth story or walkthrough).
4. React authentically to the trainee HR interviewer's tone, questions, and professionalism.
5. If the trainee asks questions outside your background, respond plausibly based on your persona's background notes.`
}

/**
 * Intelligent Zero-Cost Offline Simulation Engine for generating context-aware persona replies without paid APIs.
 */
export function generateOfflinePersonaReply(
  persona: AiPersonaData,
  interviewType: InterviewType,
  dayNumber: number,
  userMessage: string,
  turnCount: number
): string {
  const cleanInput = userMessage.toLowerCase()
  const name = persona.name

  // 1. Disciplinary Hearing (Day 10)
  if (interviewType === InterviewType.DISCIPLINARY) {
    if (turnCount === 1 || cleanInput.includes('hello') || cleanInput.includes('welcome') || cleanInput.includes('purpose')) {
      return `[${name}]: Good morning. I received the invitation letter for this hearing. I understand we're here to discuss my recent attendance record, and I appreciate the opportunity to explain what has been happening.`
    }
    if (cleanInput.includes('why') || cleanInput.includes('late') || cleanInput.includes('reason') || cleanInput.includes('transport') || cleanInput.includes('happen')) {
      return `[${name}]: Over the past two weeks, the central railway line on my morning route has had major signaling failures that delayed trains by 35 to 50 minutes. I understand punctuality is critical at NovaLink, but it genuinely wasn't intentional neglect. I've now arranged an earlier backup bus route.`
    }
    if (cleanInput.includes('call') || cleanInput.includes('notify') || cleanInput.includes('inform') || cleanInput.includes('procedure')) {
      return `[${name}]: You're right to point that out. On two of those days, I was stuck underground with no mobile signal and only managed to message my manager once I arrived at the terminal. I realize I should have called immediately when I reached the station.`
    }
    if (cleanInput.includes('warning') || cleanInput.includes('decision') || cleanInput.includes('action') || cleanInput.includes('next step') || cleanInput.includes('improve')) {
      return `[${name}]: I accept full accountability and agree that consistency is essential. With the earlier bus schedule and daily check-ins, I am committed to maintaining 100% on-time attendance going forward.`
    }
    return `[${name}]: I appreciate you walking through the facts with me. I want to assure you and the team that I value my position at NovaLink and am taking immediate steps to resolve this completely.`
  }

  // 2. Welfare & Grievance (Day 9)
  if (interviewType === InterviewType.WELFARE) {
    if (cleanInput.includes('grievance') || cleanInput.includes('unfair') || cleanInput.includes('workload') || cleanInput.includes('concern')) {
      return `[${name}]: Thank you for listening. Since Marcus transitioned our team to the new microservice architecture, two colleagues were reassigned, but the sprint deadlines remained identical. I've been working 12-hour shifts for the last 3 weeks and feel completely burned out.`
    }
    if (cleanInput.includes('how') || cleanInput.includes('feeling') || cleanInput.includes('wellbeing') || cleanInput.includes('settling')) {
      return `[${name}]: Overall I love the technical challenges at NovaLink, but the sheer volume of high-priority tickets with no coverage is impacting my sleep and morale. I needed a confidential space to raise this before it affected our delivery quality.`
    }
    return `[${name}]: Having HR acknowledge the workload strain means a lot. If we could adjust the sprint capacity or bring in temp contractor support during the rollout, it would make a massive difference.`
  }

  // 3. Probation Check-in (Day 6)
  if (interviewType === InterviewType.PROBATION_CHECKIN) {
    if (cleanInput.includes('settling') || cleanInput.includes('week') || cleanInput.includes('going') || cleanInput.includes('how are you')) {
      return `[${name}]: The team has been very welcoming! I've completed my IT setup and security compliance modules. The only area where I felt slightly lost was accessing the staging deployment pipeline, but Sarah helped me through it yesterday.`
    }
    if (cleanInput.includes('objective') || cleanInput.includes('target') || cleanInput.includes('goal') || cleanInput.includes('attendance')) {
      return `[${name}]: Yes, the 6-point probation checklist we established makes expectations very clear. I'm focusing heavily on mastering our internal operational SOPs and maintaining prompt communication.`
    }
    return `[${name}]: Thank you for checking in with me at this Week 1 milestone. It gives me confidence that NovaLink genuinely supports new hires during probation.`
  }

  // 4. 360-Degree Appraisal (Day 7)
  if (interviewType === InterviewType.APPRAISAL_360) {
    if (persona.personaType === PersonaType.MANAGER) {
      return `[${name}]: From an engineering management standpoint, technical delivery has been reliable and code quality is high. However, I'd like to see more proactive documentation and earlier escalation when cross-department dependencies are blocked.`
    }
    if (persona.personaType === PersonaType.COLLEAGUE) {
      return `[${name}]: As a peer working alongside them daily, they are approachable, patient during code reviews, and always willing to help debug tricky issues. One area for improvement is speaking up more during sprint retrospectives.`
    }
    return `[${name}]: In my self-assessment, I feel I've exceeded expectations on core platform reliability and ticket throughput. My primary goal for the next cycle is taking on system architecture design leadership.`
  }

  // 5. Scoping / Selection (Days 1 - 3)
  if (persona.qualityTier === QualityTier.STRONG) {
    return `[${name}]: That is a key consideration for this position. In my recent experience, when facing that exact challenge (Situation), I scoped the milestones with stakeholders (Task), introduced automated testing pipelines (Action), and reduced production incidents by 45% (Result). How is NovaLink currently structuring this workflow?`
  }

  if (persona.qualityTier === QualityTier.UNQUALIFIED) {
    return `[${name}]: Honestly, in my last company that was handled by someone else. They kept changing the process, so I just focused on my immediate tasks and didn't really get involved in the details.`
  }

  return `[${name}]: Thank you for asking. Regarding "${userMessage.slice(0, 35)}...", I prioritize structured problem-solving, open collaboration with HR and colleagues, and aligning with NovaLink's mission.`
}
