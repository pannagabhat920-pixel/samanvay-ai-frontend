import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { ConflictResult as IConflictResult } from "../../types";
import { ConflictBadge } from "../ui/ConflictBadge";

export const ConflictResult = ({ result }: { result: IConflictResult }) => {
  if (result.status === "SAFE") return <div className="flex items-center gap-3 rounded-lg border border-status-safe/20 bg-status-safe/[0.05] p-3"><ConflictBadge status="SAFE" /><span className="text-sm text-text-secondary">No scheduling conflicts detected.</span><CheckCircle2 className="ml-auto h-4 w-4 text-status-safe" /></div>;
  return <div className={`rounded-lg border p-4 ${result.status === "CONFLICT" ? "border-status-emergency/25 bg-status-emergency/[0.06]" : "border-status-warning/25 bg-status-warning/[0.06]"}`}><div className="mb-3 flex items-center gap-3"><ConflictBadge status={result.status} /><span className="text-sm font-medium text-text-primary">{result.conflicts.length} potential issue{result.conflicts.length === 1 ? "" : "s"} detected</span></div><ul className="space-y-2">{result.conflicts.map((conflict) => <li key={conflict.conflicting_request_id} className="flex items-start gap-2 text-xs leading-5 text-text-secondary"><AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-status-warning" /><span><span className="font-mono text-text-primary">{conflict.conflicting_request_id}</span> — {conflict.reason}</span></li>)}</ul></div>;
};
