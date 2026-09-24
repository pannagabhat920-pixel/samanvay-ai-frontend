import { Clock3, FileText, MapPin, ShieldAlert, Users } from "lucide-react";
import { MaintenanceRequest } from "../../types";
import { StatusBadge } from "../ui/StatusBadge";
import { SeverityBadge } from "../ui/SeverityBadge";
import { DeptBadge } from "../ui/DeptBadge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { formatDate, formatDateTime } from "../../utils/formatters";

interface Props {
  request: MaintenanceRequest | null;
  onClose: () => void;
}

export const RequestDetail = ({ request, onClose }: Props) => {
  return (
    <Sheet open={Boolean(request)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent className="overflow-y-auto p-0">
        {request && <>
          <div className="border-b border-border bg-surface2/60 px-6 pb-5 pt-6"><SheetHeader><div className="flex items-center gap-2"><SheetTitle className="font-mono text-sm tracking-[0.08em] text-text-primary">{request.request_id}</SheetTitle><StatusBadge status={request.status} /></div><SheetDescription className="flex items-center gap-2 pt-1"><DeptBadge dept={request.department} /><span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted">Request detail</span></SheetDescription></SheetHeader></div>
          <div className="flex-1 space-y-6 p-6">
            <div className="flex flex-wrap items-center gap-2"><SeverityBadge severity={request.severity} />{request.is_emergency && <Badge variant="danger"><ShieldAlert className="h-3 w-3" /> Emergency</Badge>}</div>
            <div className="rounded-xl border border-border bg-surface2/45 p-4"><div className="flex items-start gap-3"><FileText className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><div><div className="data-label">Work description</div><p className="mt-2 text-sm leading-6 text-text-primary">{request.work_description}</p></div></div></div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div><div className="data-label">Section</div><div className="mt-2 text-sm text-text-primary">{request.section}</div></div>
              <div><div className="data-label">Department</div><div className="mt-2"><DeptBadge dept={request.department} /></div></div>
              <div><div className="data-label">Corridor</div><div className="mt-2 flex items-center gap-1.5 font-mono text-xs text-text-primary"><MapPin className="h-3.5 w-3.5 text-text-muted" />{request.start_km.toFixed(1)} — {request.end_km.toFixed(1)} km</div></div>
              <div><div className="data-label">Duration</div><div className="mt-2 flex items-center gap-1.5 text-sm text-text-primary"><Clock3 className="h-3.5 w-3.5 text-text-muted" />{request.duration_hours} hours</div></div>
              <div><div className="data-label">Preferred date</div><div className="mt-2 text-sm text-text-primary">{formatDate(request.preferred_date)}</div></div>
              <div><div className="data-label">Due date</div><div className="mt-2 text-sm text-text-primary">{formatDate(request.due_date)}</div></div>
            </div>
            <div className="border-t border-border pt-5"><div className="data-label">Required resources</div><div className="mt-3 flex flex-wrap gap-2">{request.required_resources.map((resource) => <span key={resource} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface2 px-2.5 py-1.5 text-xs text-text-secondary"><Users className="h-3 w-3 text-text-muted" />{resource}</span>)}</div></div>
            <div className="rounded-xl border border-accent/20 bg-accent/[0.04] p-4"><div className="flex items-center justify-between"><span className="data-label">Priority score</span><span className="metric-number font-mono text-xl text-text-primary">{request.priority_score?.toFixed(1) ?? "—"}</span></div><Progress value={request.priority_score ?? 0} className="mt-3" /><p className="mt-3 text-[10px] leading-5 text-text-muted">Calculated from transparent safety, asset, timing, and emergency signals.</p></div>
            <div className="border-t border-border pt-5"><div className="data-label">Record</div><div className="mt-3 space-y-2 text-xs text-text-muted"><div className="flex justify-between gap-4"><span>Submitted by</span><span className="text-right text-text-secondary">{request.submitted_by}</span></div><div className="flex justify-between gap-4"><span>Created</span><span className="text-right text-text-secondary">{formatDateTime(request.created_at)}</span></div></div></div>
          </div>
        </>}
      </SheetContent>
    </Sheet>
  );
};
