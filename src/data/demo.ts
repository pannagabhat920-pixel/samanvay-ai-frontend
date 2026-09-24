// Preview/demo data is intentionally centralized here so operational screens can
// show a believable product state without creating fake submitted records.
export type DemoStatus = "clear" | "active" | "critical" | "warning";
export type CorridorStatus = "NORMAL" | "PROPOSED" | "APPROVED" | "CRITICAL";

export interface DemoDepartment {
  code: "ENGINEERING" | "SNT" | "TRD";
  label: string;
  shortLabel: string;
  description: string;
  focus: string;
  accent: "blue" | "amber" | "green";
  requestCount?: number;
}

export interface DemoRequest {
  id: string;
  department: DemoDepartment["code"];
  section: string;
  work: string;
  km: string;
  status: "SUBMITTED" | "IN REVIEW" | "APPROVED";
  priority: number;
  due?: string;
  age?: string;
  emergency?: boolean;
}

export interface DemoBlockRecommendation {
  id: string;
  section: string;
  km: string;
  departments: DemoDepartment["code"][];
  duration: string;
  reason: string;
  confidence: string;
  status: "RECOMMENDED" | "PENDING";
}

export interface DemoCorridorSection {
  id: string;
  station: string;
  label: string;
  km: string;
  status: CorridorStatus;
  work: string;
  note: string;
  departments: DemoDepartment["code"][];
  load: number;
}

export const demoDepartments: DemoDepartment[] = [
  {
    code: "ENGINEERING",
    label: "Engineering",
    shortLabel: "ENG",
    description: "Track, structures and infrastructure.",
    focus: "Permanent way · structures · drainage",
    accent: "blue",
    requestCount: 4,
  },
  {
    code: "SNT",
    label: "S&T",
    shortLabel: "S&T",
    description: "Signals, telecom and control systems.",
    focus: "Interlocking · telecom · control circuits",
    accent: "amber",
    requestCount: 3,
  },
  {
    code: "TRD",
    label: "TRD",
    shortLabel: "TRD",
    description: "Traction power and OHE.",
    focus: "OHE · feeder · traction substation",
    accent: "green",
    requestCount: 2,
  },
];

export const demoDashboard = {
  stats: {
    activeBlocks: 7,
    openRequests: 24,
    emergencies: 3,
    conflicts: 5,
  },
  shiftBrief: {
    readiness: 92,
    fitGain: "+18%",
    departments: 3,
  },
  blocksSummary: {
    awaitingReview: 5,
    approved: 2,
    departments: 3,
  },
  corridorDetails: [
    { label: "Corridor length", value: "204 km", icon: "route" },
    { label: "Active work windows", value: "07", icon: "gauge" },
    { label: "Shared blocks", value: "03", icon: "radio" },
    { label: "Safety posture", value: "Nominal", icon: "shield" },
  ],
  corridor: {
    name: "Delhi–Agra Main Line",
    code: "DLI–AGR / CORRIDOR 04",
    status: "DEMO VIEW",
    lastSync: "2 min ago",
    segments: [
      { label: "Delhi Junction", km: "0–42", status: "clear" as DemoStatus, load: 42 },
      { label: "Agra Cantt", km: "42–188", status: "active" as DemoStatus, load: 76 },
      { label: "Agra Yard", km: "188–204", status: "warning" as DemoStatus, load: 64 },
    ],
  },
  upcomingWork: [
    { time: "06:40", department: "SNT" as const, title: "Signal interlocking test", section: "Agra Cantt", window: "06:40–09:10", status: "READY" },
    { time: "08:15", department: "ENGINEERING" as const, title: "Rail renewal · block B", section: "Delhi–Agra Main Line", window: "08:15–12:00", status: "PLANNED" },
    { time: "11:30", department: "TRD" as const, title: "OHE feeder inspection", section: "Agra Yard", window: "11:30–13:00", status: "PLANNED" },
  ],
  recentRequests: [
    { id: "SAM-SNT-240918-0042", department: "SNT" as const, work: "Interlocking cable route", section: "Agra Cantt", km: "118.4–119.1", priority: 82, status: "IN REVIEW", age: "8 min ago", emergency: true },
    { id: "SAM-ENG-240918-0039", department: "ENGINEERING" as const, work: "Turnout tamping", section: "Delhi–Agra Main Line", km: "74.2–75.8", priority: 64, status: "SUBMITTED", age: "21 min ago" },
    { id: "SAM-TRD-240918-0036", department: "TRD" as const, work: "Feeder isolation review", section: "Agra Yard", km: "192.0–192.6", priority: 57, status: "APPROVED", age: "34 min ago" },
    { id: "SAM-ENG-240918-0031", department: "ENGINEERING" as const, work: "Catch pit cleaning", section: "Agra Cantt", km: "121.0–121.3", priority: 39, status: "SUBMITTED", age: "48 min ago" },
  ] satisfies DemoRequest[],
  blockRecommendations: [
    { id: "BLK-240918-0018", section: "Agra Cantt", km: "118.4–119.1", departments: ["ENGINEERING", "SNT"] as const, duration: "3h 20m", reason: "Adjacent work can share one possession window.", confidence: "High", status: "RECOMMENDED" },
    { id: "BLK-240918-0017", section: "Agra Yard", km: "191.8–192.6", departments: ["TRD", "ENGINEERING"] as const, duration: "2h 10m", reason: "Low operational overlap with adjacent work.", confidence: "Medium", status: "PENDING" },
  ] satisfies DemoBlockRecommendation[],
  priorityQueue: [
    { id: "Q-01", request: "SAM-SNT-240918-0042", department: "SNT" as const, reason: "Emergency + overdue risk", score: 82, trend: "+12" },
    { id: "Q-02", request: "SAM-ENG-240918-0039", department: "ENGINEERING" as const, reason: "Main line asset criticality", score: 64, trend: "+4" },
    { id: "Q-03", request: "SAM-TRD-240918-0036", department: "TRD" as const, reason: "Block adjacency", score: 57, trend: "−2" },
  ],
};

export const demoCorridorSections: DemoCorridorSection[] = [
  {
    id: "MAQ",
    station: "MAQ",
    label: "MAQ",
    km: "312/0",
    status: "NORMAL",
    work: "Approach monitoring",
    note: "No active work windows. Approach signals are reporting nominal.",
    departments: [],
    load: 18,
  },
  {
    id: "312",
    station: "MAQ",
    label: "Section 312",
    km: "312/4 → 314/2",
    status: "PROPOSED",
    work: "Rail renewal + interlocking test",
    note: "Two compatible demands are waiting for a combined block review.",
    departments: ["ENGINEERING", "SNT"],
    load: 64,
  },
  {
    id: "313",
    station: "MAQ",
    label: "Section 313",
    km: "313/2 → 315/0",
    status: "APPROVED",
    work: "OHE feeder inspection",
    note: "Authorized work window is protected. Keep the corridor clear for movement.",
    departments: ["TRD"],
    load: 48,
  },
  {
    id: "314",
    station: "UD",
    label: "Section 314",
    km: "314/6 → 316/1",
    status: "CRITICAL",
    work: "Points inspection + drainage",
    note: "Emergency demand is active. Officer review is required before coordination.",
    departments: ["ENGINEERING", "SNT"],
    load: 92,
  },
  {
    id: "UD",
    station: "UD",
    label: "UD",
    km: "316/1 → 318/0",
    status: "NORMAL",
    work: "Junction readiness",
    note: "Approach is clear and ready for the next planning cycle.",
    departments: [],
    load: 22,
  },
];

export const demoStandards = [
  { code: "G&SR", label: "General & Subsidiary Rules", authority: "Indian Railways" },
  { code: "PWM", label: "Permanent Way Manual", authority: "Indian Railways" },
  { code: "RDSO", label: "RDSO guidelines", authority: "RDSO" },
  { code: "ISO", label: "Systems and quality references", authority: "Standards bodies" },
  { code: "EN", label: "Engineering interoperability", authority: "Standards bodies" },
  { code: "IEC", label: "Electrical and control systems", authority: "Standards bodies" },
];

export const demoIntelligence = [
  { key: "priority", label: "Priority scoring", description: "A transparent six-factor score keeps urgency explainable." },
  { key: "conflict", label: "Conflict detection", description: "Surface overlapping work before it becomes an operational surprise." },
  { key: "block", label: "Block coordination", description: "Recommend a shared window when departments can work together." },
  { key: "approval", label: "Human approval", description: "Every recommendation remains subject to officer review." },
];

export const demoLanding = {
  corridorCode: "DLI—AGR / 04",
  corridorLine: "MAQ → UD",
  corridorCoordinates: "51° 02′ N / 01° 18′ E",
  corridorControl: "CORRIDOR CONTROL / 04",
  sharedKmRange: "118.4—119.1",
  sharedBlock: { departments: "03", window: "03:20", fit: "0.92" },
  recommendation: { time: "02:00 — 05:00", duration: "3 hour window" },
};

