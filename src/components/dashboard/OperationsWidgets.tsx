import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarClock,
  ChevronRight,
  CircleAlert,
  GitMerge,
  RadioTower,
  Route,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/shadcn-table";
import { demoDashboard, demoDepartments, type DemoBlockRecommendation } from "../../data/demo";

const departmentMeta = Object.fromEntries(demoDepartments.map((department) => [department.code, department]));
const departmentIcon = { ENGINEERING: Wrench, SNT: RadioTower, TRD: Zap } as const;
const departmentColor = { ENGINEERING: "text-dept-engineering", SNT: "text-dept-st", TRD: "text-dept-trd" } as const;
const departmentBg = { ENGINEERING: "bg-dept-engineering/10 border-dept-engineering/20", SNT: "bg-dept-st/10 border-dept-st/20", TRD: "bg-dept-trd/10 border-dept-trd/20" } as const;

export function OperationsMetricCard({ label, value, detail, icon: Icon, tone, to }: { label: string; value: string | number; detail: string; icon: LucideIcon; tone: "accent" | "amber" | "green" | "blue"; to?: string }) {
  const toneClasses = { accent: "text-accent bg-accent/10 border-accent/20", amber: "text-status-warning bg-status-warning/10 border-status-warning/20", green: "text-status-safe bg-status-safe/10 border-status-safe/20", blue: "text-status-info bg-status-info/10 border-status-info/20" };
  const content = <Card className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface2/70"><CardContent className="p-5"><div className="flex items-start justify-between"><div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${toneClasses[tone]}`}><Icon className="h-4 w-4" strokeWidth={1.7} /></div>{to && <ArrowUpRight className="h-4 w-4 text-text-muted opacity-0 transition-opacity group-hover:opacity-100" />}</div><div className="metric-number mt-6 font-mono text-3xl text-text-primary">{value}</div><div className="mt-1 text-xs font-medium text-text-secondary">{label}</div><div className="mt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted">{detail}</div></CardContent></Card>;
  return to ? <Link to={to}>{content}</Link> : content;
}

export function OperationsMetricStrip({ items }: { items: { label: string; value: string | number; detail: string; icon: LucideIcon; tone: "accent" | "amber" | "green" | "blue" }[] }) {
  const toneClasses = { accent: "text-accent bg-accent/10 border-accent/20", amber: "text-status-warning bg-status-warning/10 border-status-warning/20", green: "text-status-safe bg-status-safe/10 border-status-safe/20", blue: "text-status-info bg-status-info/10 border-status-info/20" };
  return <Card className="overflow-hidden"><CardContent className="grid divide-y divide-border/70 p-0 sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">{items.map((item) => { const Icon = item.icon; return <div key={item.label} className="group relative flex min-h-[112px] items-center gap-4 px-5 py-4 transition-colors hover:bg-surface2/45"><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${toneClasses[item.tone]}`}><Icon className="h-4 w-4" strokeWidth={1.7} /></div><div className="min-w-0"><div data-dashboard-number={item.value} className="metric-number font-mono text-2xl text-text-primary">{item.value}</div><div className="mt-1 text-xs font-medium text-text-secondary">{item.label}</div><div className="mt-1 truncate font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted">{item.detail}</div></div><ArrowUpRight className="ml-auto h-4 w-4 text-text-muted opacity-0 transition-opacity group-hover:opacity-100" /></div>; })}</CardContent></Card>;
}

export function LiveCorridor() {
  const { corridor } = demoDashboard;
  const statusConfig = { clear: { label: "CLEAR", className: "text-status-safe", dot: "bg-status-safe" }, active: { label: "ACTIVE", className: "text-status-info", dot: "bg-status-info" }, warning: { label: "WATCH", className: "text-status-warning", dot: "bg-status-warning" }, critical: { label: "CRITICAL", className: "text-status-emergency", dot: "bg-status-emergency" } } as const;
  return (
    <Card data-dashboard-widget="corridor" className="panel-sheen overflow-hidden">
      <CardHeader className="flex-row items-start justify-between space-y-0">
        <div><div className="flex items-center gap-2"><Route className="h-4 w-4 text-accent" /><CardTitle>Live corridor</CardTitle></div><p className="mt-2 text-xs text-text-secondary">{corridor.name} <span className="text-text-muted">·</span> {corridor.code}</p></div>
        <Badge variant="success"><span className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-status-safe" /> {corridor.status}</Badge>
      </CardHeader>
      <CardContent>
        <div className="relative mt-4 overflow-hidden rounded-xl border border-border bg-surface2/45 p-4 sm:p-5">
          <div className="technical-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="absolute left-4 right-4 top-[51%] h-px bg-border-strong" />
          <div className="absolute left-4 right-4 top-[calc(51%+9px)] h-px bg-border-strong" />
          <div className="absolute left-4 right-4 top-[calc(51%+4px)] h-px rail-track animate-rail-scan opacity-70" />
          <div className="relative flex min-h-[128px] items-center justify-between gap-2">
            {corridor.segments.map((segment, index) => {
              const config = statusConfig[segment.status];
              return <div data-corridor-node key={segment.label} className="relative flex h-full flex-1 flex-col items-center justify-center"><div className="relative z-10 mx-auto flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-surface2 bg-surface shadow-sm"><span className={`absolute inset-0 animate-soft-pulse rounded-full ${config.dot} opacity-40`} /><span className={`relative h-1.5 w-1.5 rounded-full ${config.dot}`} /></div><div className="mt-5 text-center"><div className="text-[11px] font-medium text-text-primary">{segment.label}</div><div className="mt-1 font-mono text-[9px] text-text-muted">KM {segment.km}</div></div><div className={`mt-3 font-mono text-[8px] uppercase tracking-[0.12em] ${config.className}`}>{config.label}</div>{index < corridor.segments.length - 1 && <div className="absolute left-[calc(50%+20px)] right-[-50%] top-[61px] hidden h-px bg-border sm:block" />}</div>;
            })}
          </div>
          <div className="absolute bottom-2 left-5 font-mono text-[8px] uppercase tracking-[0.16em] text-text-muted">DLI / 00.000</div><div className="absolute bottom-2 right-5 font-mono text-[8px] uppercase tracking-[0.16em] text-text-muted">AGR / 204.000</div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[10px] text-text-muted"><span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-status-safe" /> Clear <span className="ml-2 h-1.5 w-1.5 rounded-full bg-status-info" /> Active <span className="ml-2 h-1.5 w-1.5 rounded-full bg-status-warning" /> Watch</span><span className="font-mono uppercase tracking-[0.12em]">Sync / {corridor.lastSync}</span></div>
      </CardContent>
    </Card>
  );
}

export function UpcomingWork() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0"><div className="flex items-center gap-2"><CalendarClock className="h-4 w-4 text-accent" /><CardTitle>Upcoming work</CardTitle></div><Button asChild variant="ghost" size="sm"><Link to="/job-board">View board <ChevronRight className="h-3.5 w-3.5" /></Link></Button></CardHeader>
      <CardContent className="space-y-1">
        {demoDashboard.upcomingWork.map((item) => { const Icon = departmentIcon[item.department]; return <div key={`${item.time}-${item.title}`} className="group flex items-center gap-3 rounded-lg border border-transparent px-2 py-3 transition-colors hover:border-border hover:bg-surface2/60"><div className="w-12 shrink-0 font-mono text-xs text-text-primary">{item.time}</div><div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${departmentBg[item.department]}`}><Icon className={`h-4 w-4 ${departmentColor[item.department]}`} /></div><div className="min-w-0 flex-1"><div className="truncate text-xs font-medium text-text-primary">{item.title}</div><div className="mt-1 truncate text-[10px] text-text-muted">{item.section} <span className="text-border-strong">·</span> {item.window}</div></div><Badge variant={item.status === "READY" ? "success" : "secondary"}>{item.status}</Badge></div>; })}
      </CardContent>
    </Card>
  );
}

export function RecentRequests() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0"><div><div className="flex items-center gap-2"><Wrench className="h-4 w-4 text-accent" /><CardTitle>Recent requests</CardTitle></div><p className="mt-2 text-xs text-text-secondary">Latest activity across the corridor</p></div><Button asChild variant="outline" size="sm"><Link to="/job-board">Open job board <ArrowUpRight className="h-3.5 w-3.5" /></Link></Button></CardHeader>
      <CardContent className="px-0 pb-1 sm:px-2"><Table><TableHeader><TableRow><TableHead>Request</TableHead><TableHead>Department</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{demoDashboard.recentRequests.map((request) => <TableRow key={request.id}><TableCell><div className="font-mono text-[11px] text-text-primary">{request.id.replace("SAM-", "")}</div><div className="mt-1 max-w-[210px] truncate text-[10px] text-text-muted">{request.work} <span className="text-border-strong">·</span> {request.section}</div></TableCell><TableCell><span className={`font-mono text-[10px] ${departmentColor[request.department]}`}>{departmentMeta[request.department].shortLabel}</span></TableCell><TableCell><div className="flex items-center gap-2"><span className="font-mono text-xs text-text-primary">{request.priority}</span><Progress value={request.priority} className="w-14" /></div></TableCell><TableCell><Badge variant={request.status === "APPROVED" ? "success" : request.status === "IN REVIEW" ? "warning" : "secondary"}>{request.status}</Badge></TableCell></TableRow>)}</TableBody></Table></CardContent>
    </Card>
  );
}

export function BlockRecommendations() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0"><div><div className="flex items-center gap-2"><GitMerge className="h-4 w-4 text-accent" /><CardTitle>Block recommendations</CardTitle></div><p className="mt-2 text-xs text-text-secondary">Potential combined windows for officer review</p></div><Button asChild variant="ghost" size="sm"><Link to="/review">Review queue <ChevronRight className="h-3.5 w-3.5" /></Link></Button></CardHeader>
      <CardContent className="space-y-3">{demoDashboard.blockRecommendations.map((block) => <BlockRecommendationCard key={block.id} block={block} />)}</CardContent>
    </Card>
  );
}

export function BlockRecommendationCard({ block }: { block: DemoBlockRecommendation }) {
  return <div className="rounded-lg border border-border bg-surface2/45 p-4 transition-colors hover:border-border-strong"><div className="flex items-start justify-between gap-3"><div><div className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{block.id}</div><div className="mt-2 text-sm font-medium text-text-primary">{block.section} <span className="font-mono text-xs font-normal text-text-muted">KM {block.km}</span></div></div><Badge variant={block.status === "RECOMMENDED" ? "default" : "secondary"}>{block.status}</Badge></div><p className="mt-3 text-xs leading-5 text-text-secondary">{block.reason}</p><div className="mt-4 flex items-center justify-between gap-3"><div className="flex -space-x-1.5">{block.departments.map((department) => { const Icon = departmentIcon[department]; return <div key={department} className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-surface2 ${departmentBg[department]}`} title={department}><Icon className={`h-3 w-3 ${departmentColor[department]}`} /></div>; })}</div><div className="flex items-center gap-3 font-mono text-[10px] text-text-muted"><span>{block.duration}</span><span className="text-status-safe">{block.confidence} fit</span></div></div></div>;
}

export function PriorityQueue() {
  return (
    <Card data-dashboard-widget="queue">
      <CardHeader className="flex-row items-center justify-between space-y-0"><div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" /><CardTitle>Priority queue</CardTitle></div><Badge variant="outline">Explainable</Badge></CardHeader>
      <CardContent className="space-y-1">{demoDashboard.priorityQueue.map((item, index) => { const meta = departmentMeta[item.department]; return <div key={item.id} className="flex items-center gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-surface2/60"><div className="font-mono text-[10px] text-text-muted">0{index + 1}</div><div className="min-w-0 flex-1"><div className="truncate font-mono text-[10px] text-text-primary">{item.request.replace("SAM-", "")}</div><div className="mt-1 truncate text-[10px] text-text-muted">{meta.shortLabel} <span className="text-border-strong">·</span> {item.reason}</div></div><div className="text-right"><div data-dashboard-number={item.score} className="font-mono text-sm text-text-primary">{item.score}</div><div className={`font-mono text-[9px] ${item.trend.startsWith("+") ? "text-status-emergency" : "text-status-safe"}`}>{item.trend}</div></div></div>; })}</CardContent>
    </Card>
  );
}

export function StatusLegend() {
  return <div className="flex flex-wrap items-center gap-2 text-[10px] text-text-muted"><CircleAlert className="h-3.5 w-3.5 text-status-warning" /><span>Demo values are clearly separated from live API data.</span><Link to="/new-request" className="text-accent hover:underline">Create a real request <ArrowUpRight className="inline h-3 w-3" /></Link></div>;
}

export { demoDashboard };
