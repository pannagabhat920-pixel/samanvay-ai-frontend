import { AlertTriangle, ClipboardCheck, Filter, Plus, RefreshCw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RequestDetail } from "../components/requests/RequestDetail";
import { RequestFilters, type RequestFilterState } from "../components/requests/RequestFilters";
import { RequestTable } from "../components/requests/RequestTable";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { EmptyState } from "../components/ui/EmptyState";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { useRequests } from "../hooks/useRequests";
import { MaintenanceRequest } from "../types";

export function JobBoardPage() {
  const { requests, loading, error, fetchRequests } = useRequests();
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [filters, setFilters] = useState<RequestFilterState>({ department: "All", status: "All", emergency: "All", search: "" });
  const filteredRequests = useMemo(() => requests.filter((request) => {
    if (filters.department !== "All" && request.department !== filters.department) return false;
    if (filters.status !== "All" && request.status.toUpperCase() !== filters.status) return false;
    if (filters.emergency === "EMERGENCY" && !request.is_emergency) return false;
    if (filters.emergency === "ROUTINE" && request.is_emergency) return false;
    if (filters.search) { const query = filters.search.toLowerCase(); if (!request.request_id.toLowerCase().includes(query) && !request.section.toLowerCase().includes(query) && !request.work_description.toLowerCase().includes(query)) return false; }
    return true;
  }), [requests, filters]);
  if (loading && requests.length === 0) return <LoadingSpinner />;

  return (
    <div className="space-y-5 pb-10 animate-fade-up">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="flex items-center gap-2 text-xs text-text-muted"><Link to="/operations" className="hover:text-text-primary">Overview</Link><span className="text-border-strong">/</span><span>Requests</span></div><div className="mt-3 flex items-center gap-3"><h1 className="text-2xl font-semibold tracking-[-0.035em] text-text-primary sm:text-3xl">Request queue</h1><Badge variant="secondary"><ClipboardCheck className="h-3 w-3" /> {requests.length} total</Badge></div><p className="mt-2 text-sm text-text-secondary">Dense operational view of every demand entering the shared corridor.</p></div><div className="flex items-center gap-2"><Button variant="outline" size="sm" onClick={fetchRequests}><RefreshCw className="h-3.5 w-3.5" /> Refresh</Button><Button asChild size="sm"><Link to="/new-request"><Plus className="h-3.5 w-3.5" /> New request</Link></Button></div></div>
      {error && <Alert variant="warning"><AlertTriangle className="h-4 w-4" /><AlertTitle>Live request queue unavailable</AlertTitle><AlertDescription>Start the FastAPI service and retry. The form is still connected to the same request endpoint.</AlertDescription></Alert>}
      <RequestFilters filters={filters} onChange={setFilters} />
      <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 text-xs text-text-muted"><Filter className="h-3.5 w-3.5 text-accent" /> {filteredRequests.length} matching requests</div><div className="hidden items-center gap-2 text-[10px] text-text-muted sm:flex"><Search className="h-3.5 w-3.5" /> Select a row to inspect the full record</div></div>
      {filteredRequests.length > 0 ? <RequestTable requests={filteredRequests} onRowClick={setSelectedRequest} /> : <EmptyState title={requests.length ? "No requests match" : "Your corridor is clear"} message={requests.length ? "Try widening the filters to bring more work into view." : "No maintenance requests have been submitted yet. Start a request to place the first demand into the shared queue."} actionLabel={!requests.length ? "Create first request" : undefined} onAction={!requests.length ? () => navigate("/new-request") : undefined} />}
      <RequestDetail request={selectedRequest} onClose={() => setSelectedRequest(null)} />
    </div>
  );
}
