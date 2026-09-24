import { useState } from "react";
import { Check, Clock3, GitMerge, LockKeyhole, MessageSquareText, ShieldCheck, X } from "lucide-react";
import { BlockProposal } from "../../types";
import { StatusBadge } from "../ui/StatusBadge";
import { DeptBadge } from "../ui/DeptBadge";
import { Alert, AlertDescription } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";

interface Props {
  block: BlockProposal;
  onReview: (id: string, action: "APPROVE" | "REJECT", reason: string, officer: string, key: string) => Promise<void>;
}

export const ReviewPanel = ({ block, onReview }: Props) => {
  const [officer, setOfficer] = useState("");
  const [officerKey, setOfficerKey] = useState("");
  const [reason, setReason] = useState("");
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyNote, setModifyNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const linkedRequests = block.requests ?? [];
  const isProposed = block.status.toUpperCase() === "PROPOSED";

  const handleAction = async (action: "APPROVE" | "REJECT") => {
    if (!officer.trim()) { setError("Officer name is required."); return; }
    if (!officerKey) { setError("Officer authorization key is required."); return; }
    if (action === "REJECT" && !reason.trim()) { setError("Add a reason before rejecting this proposal."); return; }
    setLoading(true); setError(null);
    try { await onReview(block.block_id, action, reason.trim() || "Approved after review", officer.trim(), officerKey); setReason(""); }
    catch (reviewError) { setError(reviewError instanceof Error ? reviewError.message : "Unable to record this decision."); }
    finally { setLoading(false); }
  };

  return <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-panel"><div className="flex flex-col justify-between gap-4 border-b border-border bg-surface2/55 p-5 sm:flex-row sm:items-start"><div><div className="flex flex-wrap items-center gap-2"><GitMerge className="h-4 w-4 text-accent" /><span className="font-mono text-sm text-text-primary">{block.block_id}</span><StatusBadge status={block.status} /></div><h3 className="mt-3 text-base font-medium text-text-primary">{block.section} <span className="font-mono text-xs font-normal text-text-muted">KM {block.start_km} — {block.end_km}</span></h3><div className="mt-2 flex flex-wrap gap-2">{block.departments.map((department) => <Badge key={department} variant="secondary">{department === "SNT" ? "S&T" : department}</Badge>)}</div></div><div className="flex items-center gap-2 text-xs text-text-secondary"><Clock3 className="h-4 w-4 text-text-muted" /><span className="font-mono">{block.estimated_duration_hours}h window</span></div></div><div className="space-y-5 p-5"><div className="rounded-lg border border-accent/20 bg-accent/[0.04] p-4"><div className="flex items-center gap-2 text-accent"><SparkleMark /><span className="font-mono text-[9px] uppercase tracking-[0.18em]">Recommended because</span></div><p className="mt-2 text-sm leading-6 text-text-primary">“{block.reason}”</p></div><div><div className="mb-3 flex items-center justify-between"><div className="data-label">Included requests</div><span className="font-mono text-[10px] text-text-muted">{linkedRequests.length} linked</span></div><div className="space-y-2">{linkedRequests.length ? linkedRequests.map((request) => <div key={request.request_id} className="flex flex-col gap-2 rounded-lg border border-border bg-surface2/50 p-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex min-w-0 flex-wrap items-center gap-2"><span className="font-mono text-[10px] text-text-primary">{request.request_id}</span><DeptBadge dept={request.department} /><span className="max-w-[240px] truncate text-xs text-text-secondary">{request.work_description}</span></div><span className="font-mono text-[10px] text-text-muted">{request.priority_score?.toFixed(1) ? `Score ${request.priority_score.toFixed(1)}` : "Scored on submit"}</span></div>) : <div className="rounded-lg border border-dashed border-border p-4 text-xs text-text-muted">Linked request details are not available in this preview.</div>}</div></div>{isProposed && <><Separator /><div className="space-y-4"><div className="flex items-center gap-2 text-xs text-text-secondary"><ShieldCheck className="h-4 w-4 text-status-warning" /><span>Review the reasoning, then record the officer decision.</span></div>{error && <Alert variant="destructive"><X className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}<div className="grid gap-3 sm:grid-cols-2"><div><label className="data-label mb-2 block" htmlFor={`officer-${block.block_id}`}>Officer name</label><Input id={`officer-${block.block_id}`} value={officer} onChange={(event) => setOfficer(event.target.value)} placeholder="Enter officer name" /></div><div><label className="data-label mb-2 block" htmlFor={`key-${block.block_id}`}>Authorization key</label><Input id={`key-${block.block_id}`} type="password" value={officerKey} onChange={(event) => setOfficerKey(event.target.value)} placeholder="Enter operations key" /></div></div><div><label className="data-label mb-2 block" htmlFor={`reason-${block.block_id}`}>Decision note</label><Textarea id={`reason-${block.block_id}`} value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Add context for the decision (required for rejection)" rows={3} /></div>{modifyMode && <div className="rounded-lg border border-status-info/20 bg-status-info/[0.04] p-4"><label className="data-label mb-2 block" htmlFor={`modify-${block.block_id}`}>Modification note</label><Textarea id={`modify-${block.block_id}`} value={modifyNote} onChange={(event) => setModifyNote(event.target.value)} placeholder="What should be adjusted before approval?" rows={2} /><Button type="button" variant="secondary" size="sm" className="mt-3" onClick={() => { setModifyMode(false); setReason(modifyNote); }}><MessageSquareText className="h-3.5 w-3.5" /> Save note to decision</Button></div>}<div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 text-[10px] text-text-muted"><LockKeyhole className="h-3.5 w-3.5" /> Actions are recorded in the audit history.</div><div className="flex flex-wrap gap-2"><Button type="button" variant="ghost" size="sm" onClick={() => setModifyMode((value) => !value)}><MessageSquareText className="h-3.5 w-3.5" /> Modify</Button><Button type="button" variant="destructive" size="sm" disabled={loading} onClick={() => handleAction("REJECT")}><X className="h-3.5 w-3.5" /> Reject</Button><Button type="button" size="sm" disabled={loading} onClick={() => handleAction("APPROVE")}><Check className="h-3.5 w-3.5" /> {loading ? "Recording…" : "Approve block"}</Button></div></div></div></>}</div></div>;
};

function SparkleMark() { return <span className="flex h-5 w-5 items-center justify-center rounded-md bg-accent/10 text-accent"><GitMerge className="h-3 w-3" /></span>; }
