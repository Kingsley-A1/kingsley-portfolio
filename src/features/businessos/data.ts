// BusinessOS — Agent role definitions and mock data

export interface AgentRole {
  id: string;
  name: string;
  role: string;
  department: "leadership" | "operations" | "media" | "engineering" | "revenue";
  status: "active" | "idle" | "reviewing" | "blocked";
  mission: string;
  progress: number;
  lastHandoff: string | null;
  nextHandoff: string | null;
  avatar: string;
  color: string;
}

export const AGENTS: AgentRole[] = [
  {
    id: "ceo-01",
    name: "Aria",
    role: "CEO — Strategic Direction",
    department: "leadership",
    status: "active",
    mission: "Quarterly roadmap alignment. Coordinating department leads for Q3 product launch.",
    progress: 72,
    lastHandoff: "CFO — Budget approved",
    nextHandoff: "Lead Engineer — Sprint planning",
    avatar: "AR",
    color: "#a78bfa",
  },
  {
    id: "cfo-01",
    name: "Ledger",
    role: "CFO — Financial Operations",
    department: "leadership",
    status: "reviewing",
    mission: "Reviewing Q2 expenditure reports. Preparing investor update deck.",
    progress: 45,
    lastHandoff: "CEO — Funding round terms",
    nextHandoff: "Revenue Lead — Invoice reconciliation",
    avatar: "LG",
    color: "#34d399",
  },
  {
    id: "lead-01",
    name: "Pilot",
    role: "Lead Engineer — Architecture",
    department: "engineering",
    status: "active",
    mission: "Designing microservices architecture for BusinessOS v2. Reviewing PR #284.",
    progress: 63,
    lastHandoff: "QA Agent — Test coverage report",
    nextHandoff: "DevOps Agent — Deployment pipeline",
    avatar: "PT",
    color: "#60a5fa",
  },
  {
    id: "dev-01",
    name: "Forge",
    role: "Senior Developer — Implementation",
    department: "engineering",
    status: "active",
    mission: "Building agent communication protocol. Implementing WebSocket handoff layer.",
    progress: 81,
    lastHandoff: "Lead Engineer — Arch review",
    nextHandoff: "QA Agent — Unit test suite",
    avatar: "FG",
    color: "#818cf8",
  },
  {
    id: "qa-01",
    name: "Prism",
    role: "QA Agent — Quality Assurance",
    department: "engineering",
    status: "idle",
    mission: "Waiting for handoff from Forge. Will run integration test suite on handoff protocol.",
    progress: 0,
    lastHandoff: "Lead Engineer — Test plan approved",
    nextHandoff: null,
    avatar: "PR",
    color: "#fbbf24",
  },
  {
    id: "media-01",
    name: "Echo",
    role: "Media Lead — Content & Brand",
    department: "media",
    status: "active",
    mission: "Crafting BusinessOS launch narrative. Scheduling social campaign across 4 platforms.",
    progress: 55,
    lastHandoff: "CEO — Brand voice guidelines",
    nextHandoff: "Design Agent — Asset review",
    avatar: "EC",
    color: "#f472b6",
  },
  {
    id: "design-01",
    name: "Canvas",
    role: "Design Agent — Visual Systems",
    department: "media",
    status: "reviewing",
    mission: "Reviewing landing page mockups. Preparing design tokens for developer handoff.",
    progress: 38,
    lastHandoff: "Media Lead — Brand kit",
    nextHandoff: "Senior Developer — Design system",
    avatar: "CV",
    color: "#fb923c",
  },
  {
    id: "rev-01",
    name: "Pulse",
    role: "Revenue Lead — Sales & Growth",
    department: "revenue",
    status: "active",
    mission: "Building enterprise prospecting list. Drafting outbound sequence for Q3 pipeline.",
    progress: 27,
    lastHandoff: "CFO — Pricing model approved",
    nextHandoff: "CEO — Pipeline review",
    avatar: "PL",
    color: "#4ade80",
  },
  {
    id: "ops-01",
    name: "Grid",
    role: "Operations Agent — Infrastructure",
    department: "operations",
    status: "active",
    mission: "Monitoring production cluster. Scaling compute nodes ahead of demo day traffic.",
    progress: 91,
    lastHandoff: "Lead Engineer — Infra requirements",
    nextHandoff: null,
    avatar: "GD",
    color: "#38bdf8",
  },
];

export interface HandoffEvent {
  id: string;
  from: string;
  to: string;
  message: string;
  timestamp: string;
  type: "handoff" | "review" | "approval" | "report";
}

export const RECENT_HANDOFFS: HandoffEvent[] = [
  {
    id: "h1",
    from: "Forge",
    to: "Prism",
    message: "Handoff protocol v2 implemented. Running at 99.7% reliability. Test suite ready.",
    timestamp: "2 min ago",
    type: "handoff",
  },
  {
    id: "h2",
    from: "Pilot",
    to: "Aria",
    message: "Architecture review complete. Microservices plan approved. Ready for sprint kickoff.",
    timestamp: "8 min ago",
    type: "approval",
  },
  {
    id: "h3",
    from: "Canvas",
    to: "Echo",
    message: "Landing page v3 mockups ready for brand review. 12 component variants attached.",
    timestamp: "14 min ago",
    type: "review",
  },
  {
    id: "h4",
    from: "Ledger",
    to: "Pulse",
    message: "Q2 financial close complete. Revenue targets updated for Q3. Invoice batch generated.",
    timestamp: "22 min ago",
    type: "report",
  },
  {
    id: "h5",
    from: "Grid",
    to: "Pilot",
    message: "Production cluster stable at 99.99%. Auto-scaling configured for demo day traffic.",
    timestamp: "31 min ago",
    type: "report",
  },
];
