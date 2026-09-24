import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { MaintenanceRequest } from "../../types";
import { StatusBadge } from "../ui/StatusBadge";
import { SeverityBadge } from "../ui/SeverityBadge";
import { DeptBadge } from "../ui/DeptBadge";
import { formatDate, formatRelativeTime } from "../../utils/formatters";
import { cn } from "../../lib/utils";

interface Props {
  requests: MaintenanceRequest[];
  onRowClick: (req: MaintenanceRequest) => void;
}

function scoreTone(score?: number | null) {
  if (score === null || score === undefined) return "text-text-muted";
  if (score >= 75) return "text-status-emergency";
  if (score >= 50) return "text-status-warning";
  return "text-status-safe";
}

function scoreBar(score?: number | null) {
  if (score === null || score === undefined) return "bg-border-strong";
  if (score >= 75) return "bg-status-emergency";
  if (score >= 50) return "bg-status-warning";
  return "bg-status-safe";
}

export const RequestTable = ({ requests, onRowClick }: Props) => {
  if (!requests.length) return null;

  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-border bg-surface lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-xs">
            <thead className="border-b border-border bg-surface2/70 font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted"><tr><th className="px-4 py-3 font-medium">Request</th><th className="px-3 py-3 font-medium">Department</th><th className="px-3 py-3 font-medium">Location</th><th className="px-3 py-3 font-medium">Work</th><th className="px-3 py-3 font-medium">Risk</th><th className="px-3 py-3 font-medium">Status</th><th className="px-3 py-3 font-medium">Priority</th><th className="px-4 py-3 text-right font-medium">Created</th></tr></thead>
            <tbody className="divide-y divide-border/70">
              {requests.map((request) => <tr key={request.request_id} tabIndex={0} onClick={() => onRowClick(request)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onRowClick(request); } }} className="group cursor-pointer transition-colors hover:bg-surface2/55 focus:bg-surface2/55 focus:outline-none"><td className="px-4 py-3.5"><div className="font-mono text-[11px] text-text-primary">{request.request_id}</div><div className="mt-1 text-[10px] text-text-muted">Open record</div></td><td className="px-3 py-3.5"><DeptBadge dept={request.department} /></td><td className="px-3 py-3.5"><div className="text-xs text-text-primary">{request.section}</div><div className="mt-1 font-mono text-[10px] text-text-muted">{request.start_km.toFixed(1)} — {request.end_km.toFixed(1)} km</div></td><td className="max-w-[220px] px-3 py-3.5"><div className="truncate text-xs text-text-secondary" title={request.work_description}>{request.work_description}</div></td><td className="px-3 py-3.5"><div className="flex flex-col items-start gap-1.5"><SeverityBadge severity={request.severity} />{request.is_emergency && <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-status-emergency">Emergency</span>}</div></td><td className="px-3 py-3.5"><StatusBadge status={request.status} /></td><td className="px-3 py-3.5"><div className={cn("font-mono text-xs", scoreTone(request.priority_score))}>{request.priority_score?.toFixed(1) ?? "—"}</div><div className="mt-2 h-1 w-14 overflow-hidden rounded-full bg-surface3"><div className={cn("h-full rounded-full", scoreBar(request.priority_score))} style={{ width: `${Math.min(100, request.priority_score ?? 0)}%` }} /></div></td><td className="px-4 py-3.5 text-right"><div className="text-[10px] text-text-muted">{formatRelativeTime(request.created_at)}</div><ArrowUpRight className="ml-auto mt-2 h-3.5 w-3.5 text-text-muted opacity-0 transition-opacity group-hover:opacity-100" /></td></tr>)}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-2 lg:hidden">
        {requests.map((request) => <button type="button" key={request.request_id} onClick={() => onRowClick(request)} className="w-full rounded-xl border border-border bg-surface p-4 text-left transition-colors hover:border-border-strong hover:bg-surface2/60"><div className="flex items-start justify-between gap-3"><div><div className="font-mono text-[10px] text-text-primary">{request.request_id}</div><div className="mt-2 text-sm text-text-primary">{request.section}</div></div><StatusBadge status={request.status} /></div><div className="mt-4 flex items-center gap-2"><DeptBadge dept={request.department} /><SeverityBadge severity={request.severity} />{request.is_emergency && <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-status-emergency">Emergency</span>}</div><p className="mt-3 line-clamp-2 text-xs leading-5 text-text-secondary">{request.work_description}</p><div className="mt-4 flex items-center justify-between border-t border-border pt-3"><span className="inline-flex items-center gap-1.5 font-mono text-[9px] text-text-muted"><MapPin className="h-3 w-3" />{request.start_km.toFixed(1)} — {request.end_km.toFixed(1)} km</span><span className="inline-flex items-center gap-1.5 font-mono text-[9px] text-text-muted"><CalendarDays className="h-3 w-3" />{formatDate(request.preferred_date)}</span><span className={cn("font-mono text-xs", scoreTone(request.priority_score))}>{request.priority_score?.toFixed(1) ?? "—"}</span></div></button>)}
      </div>
    </>
  );
};
