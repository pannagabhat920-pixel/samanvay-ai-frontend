import { AlertTriangle, ArrowUpRight, CheckCircle2, ClipboardCheck, GitMerge, RefreshCw, Siren, TriangleAlert, Waypoints } from "lucide-react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { BlockRecommendations, LiveCorridor, OperationsMetricStrip, PriorityQueue, RecentRequests, StatusLegend, UpcomingWork } from "../components/dashboard/OperationsWidgets";
import { useDashboard } from "../hooks/useDashboard";
import { demoDashboard } from "../data/demo";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";

export function DashboardPage() {
  const { stats, sections, loading, error, refresh } = useDashboard();
  const liveConflictCount = sections.reduce((total, section) => total + section.conflicts, 0);
  const hasLiveData = stats !== null;
  const metrics = stats ? { activeBlocks: stats.approved_blocks, openRequests: stats.open_requests, emergencies: stats.emergency, conflicts: liveConflictCount } : demoDashboard.stats;
  if (loading && !stats) return <LoadingSpinner />;

  return (
    <div className="space-y-5 pb-10 animate-fade-up">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2 text-xs text-text-muted"><Link to="/" className="transition-colors hover:text-text-primary">Samanvay AI</Link><span className="text-border-strong">/</span><span>Operations</span></div>
          <div className="mt-3 flex flex-wrap items-center gap-3"><h1 className="text-2xl font-semibold tracking-[-0.035em] text-text-primary sm:text-3xl">Good morning, Operations.</h1><Badge variant={hasLiveData ? "success" : "warning"}><span className={`h-1.5 w-1.5 rounded-full ${hasLiveData ? "bg-status-safe" : "bg-status-warning"}`} />{hasLiveData ? "LIVE + DEMO" : "DEMO PREVIEW"}</Badge></div>
          <p className="mt-2 text-sm text-text-secondary">A clear view of work moving through the corridor.</p>
        </div>
        <div className="flex items-center gap-2"><Button variant="outline" size="sm" onClick={refresh}><RefreshCw className="h-3.5 w-3.5" /> Refresh</Button><Button asChild size="sm"><Link to="/new-request">New request <ArrowUpRight className="h-3.5 w-3.5" /></Link></Button></div>
      </div>

      {error && <Alert variant="warning"><AlertTriangle className="h-4 w-4" /><AlertTitle>Live operations data unavailable</AlertTitle><AlertDescription>Showing the clearly marked foundation preview. The API connection can be retried from refresh.</AlertDescription></Alert>}

      <OperationsMetricStrip items={[
        { label: "Active blocks", value: metrics.activeBlocks, detail: "coordinated windows", icon: GitMerge, tone: "accent" },
        { label: "Open requests", value: metrics.openRequests, detail: "awaiting coordination", icon: ClipboardCheck, tone: "blue" },
        { label: "Emergencies", value: metrics.emergencies, detail: "require attention", icon: Siren, tone: "amber" },
        { label: "Conflicts", value: metrics.conflicts, detail: "overlap signals", icon: TriangleAlert, tone: "green" },
      ]} />

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <LiveCorridor />
        <Card className="panel-sheen overflow-hidden border-accent/20 bg-accent/[0.035]">
          <CardContent className="flex h-full flex-col justify-between p-5 sm:p-6">
            <div className="flex items-start justify-between"><div><div className="eyebrow">Shift brief</div><h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-text-primary">Keep the corridor moving.</h2></div><div className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent"><Waypoints className="h-4 w-4" /></div></div>
            <p className="mt-5 max-w-sm text-sm leading-6 text-text-secondary">The next useful decision is usually hiding between two requests. Bring them into the same conversation before the block fills.</p>
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-accent/15 pt-4"><div><div className="metric-number font-mono text-2xl text-text-primary">{demoDashboard.shiftBrief.readiness}%</div><div className="mt-1 font-mono text-[9px] uppercase tracking-wider text-text-muted">readiness</div></div><div><div className="metric-number font-mono text-2xl text-status-safe">{demoDashboard.shiftBrief.fitGain}</div><div className="mt-1 font-mono text-[9px] uppercase tracking-wider text-text-muted">fit gain</div></div><div><div className="metric-number font-mono text-2xl text-text-primary">{String(demoDashboard.shiftBrief.departments).padStart(2, "0")}</div><div className="mt-1 font-mono text-[9px] uppercase tracking-wider text-text-muted">departments</div></div></div>
            <div className="mt-6 flex items-center gap-2 text-xs text-status-safe"><CheckCircle2 className="h-4 w-4" /> Human review stays in the loop</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <PriorityQueue />
        <RecentRequests />
      </div>
      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <UpcomingWork />
        <BlockRecommendations />
      </div>

      <div className="flex flex-col justify-between gap-3 rounded-lg border border-border/70 bg-surface/40 px-4 py-3 sm:flex-row sm:items-center"><StatusLegend /><div className="flex items-center gap-2 text-[10px] text-text-muted"><Waypoints className="h-3.5 w-3.5 text-accent" /> Corridor control foundation <span className="text-border-strong">·</span> v0.1</div></div>
    </div>
  );
}
