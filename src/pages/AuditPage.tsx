import { Activity, FileClock, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAudit } from "../hooks/useAudit";
import { AuditTable } from "../components/audit/AuditTable";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

export const AuditPage = () => {
  const { events, loading, error, fetchEvents } = useAudit();
  const [filterAction, setFilterAction] = useState("All");
  if (loading && events.length === 0) return <LoadingSpinner />;
  const actions = Array.from(new Set(events.map((event) => event.action)));
  const filteredEvents = filterAction === "All" ? events : events.filter((event) => event.action === filterAction);
  return <div className="space-y-5 pb-10 animate-fade-up"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="flex items-center gap-2 text-xs text-text-muted"><Link to="/operations" className="hover:text-text-primary">Overview</Link><span className="text-border-strong">/</span><span>Audit</span></div><h1 className="mt-3 flex items-center gap-2 text-2xl font-semibold tracking-[-0.035em] text-text-primary sm:text-3xl"><FileClock className="h-5 w-5 text-accent" /> Audit trail</h1><p className="mt-2 text-sm text-text-secondary">A durable record of requests, recommendations, and officer decisions.</p></div><Button variant="outline" size="sm" onClick={fetchEvents}><RefreshCw className="h-3.5 w-3.5" /> Refresh</Button></div>{error && <Alert variant="warning"><Activity className="h-4 w-4" /><AlertTitle>Audit stream unavailable</AlertTitle><AlertDescription>Start the API and retry to load the live event stream.</AlertDescription></Alert>}<div className="flex flex-col justify-between gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center"><div><div className="data-label">Showing</div><div className="mt-1 text-sm text-text-primary">{filteredEvents.length} events</div></div><Select value={filterAction} onValueChange={setFilterAction}><SelectTrigger className="w-full sm:w-56"><SelectValue placeholder="Filter action" /></SelectTrigger><SelectContent><SelectItem value="All">All actions</SelectItem>{actions.map((action) => <SelectItem key={action} value={action}>{action}</SelectItem>)}</SelectContent></Select></div><AuditTable events={filteredEvents} /></div>;
};
