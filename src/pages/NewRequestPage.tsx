import { ArrowRight, CheckCircle2, FilePlus2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { RequestForm } from "../components/requests/RequestForm";
import { ScoreBreakdown } from "../components/requests/ScoreBreakdown";
import { ConflictResult } from "../components/requests/ConflictResult";
import { BlockSuggestion } from "../components/requests/BlockSuggestion";
import { CreateRequestResponse } from "../types";
import { useRequests } from "../hooks/useRequests";

export function NewRequestPage() {
  const [result, setResult] = useState<CreateRequestResponse | null>(null);
  const { createRequest } = useRequests();
  const navigate = useNavigate();

  if (result) return <div className="mx-auto max-w-6xl space-y-5 pb-10 animate-fade-up"><div className="flex items-center gap-2 text-xs text-text-muted"><Link to="/operations" className="hover:text-text-primary">Overview</Link><span className="text-border-strong">/</span><span>Request complete</span></div><Card className="border-status-safe/30 bg-status-safe/[0.045]"><CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-xl border border-status-safe/25 bg-status-safe/10 text-status-safe"><CheckCircle2 className="h-5 w-5" /></div><div><div className="flex flex-wrap items-center gap-2"><h1 className="text-lg font-medium text-text-primary">Request submitted</h1><Badge variant="success">Persisted</Badge></div><p className="mt-1 text-sm text-text-secondary">Request ID <span className="font-mono text-text-primary">{result.request.request_id}</span> is now in the operations queue.</p></div></div><div className="flex items-center gap-2 text-xs text-status-safe"><ShieldCheck className="h-4 w-4" /> Ready for coordination</div></CardContent></Card><div className="grid gap-4 lg:grid-cols-2"><Card><CardContent className="p-5">{result.score_breakdown ? <ScoreBreakdown scoreResult={result.score_breakdown} /> : <p className="text-sm text-text-secondary">Priority score is not available.</p>}</CardContent></Card><Card><CardContent className="space-y-4 p-5"><ConflictResult result={result.conflict_result} />{result.block_proposals.length > 0 && <BlockSuggestion blocks={result.block_proposals} />}</CardContent></Card></div><div className="flex flex-wrap gap-3 border-t border-border pt-5"><Button onClick={() => navigate("/job-board")}>View request queue <ArrowRight className="h-4 w-4" /></Button><Button variant="outline" onClick={() => setResult(null)}>Submit another request</Button><Button asChild variant="ghost"><Link to="/review">Open review queue</Link></Button></div></div>;

  return <div className="mx-auto max-w-6xl space-y-5 pb-10 animate-fade-up"><div className="flex items-center gap-2 text-xs text-text-muted"><Link to="/operations" className="hover:text-text-primary">Overview</Link><span className="text-border-strong">/</span><span>New request</span></div><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="flex items-center gap-2"><FilePlus2 className="h-4 w-4 text-accent" /><span className="eyebrow">Request intake</span></div><h1 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-text-primary sm:text-3xl">New maintenance request</h1><p className="mt-2 max-w-xl text-sm leading-6 text-text-secondary">Submit the work once. Samanvay will score it, check for overlap, and prepare a possible shared block for human review.</p></div><Badge variant="outline">Foundation / simple flow</Badge></div><RequestForm onSubmit={createRequest} onSuccess={setResult} /></div>;
}
