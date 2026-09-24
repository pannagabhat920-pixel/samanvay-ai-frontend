import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useState } from "react";
import { PriorityScoreResult } from "../../types";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";

export function ScoreBreakdown({ scoreResult }: { scoreResult: PriorityScoreResult }) {
  const [expanded, setExpanded] = useState(false);
  const factors = Object.entries(scoreResult.factors);
  return <div className="rounded-lg border border-border bg-surface2/70"><div className="flex items-center justify-between gap-3 p-4"><div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded bg-accent/10 text-accent"><Sparkles className="h-4 w-4" /></div><div><div className="text-xs font-medium text-text-primary">Priority score</div><div className="mt-1 font-mono text-[9px] uppercase tracking-wider text-text-muted">Rule v{scoreResult.rule_version}</div></div></div><div className="text-right"><div className="font-mono text-xl text-text-primary">{scoreResult.total_score.toFixed(1)}</div><div className="font-mono text-[9px] uppercase tracking-wider text-text-muted">out of 100</div></div></div><div className="px-4 pb-4"><Progress value={scoreResult.total_score} /><Button type="button" variant="ghost" size="sm" className="mt-3 h-7 w-full justify-between px-0 text-[10px] uppercase tracking-wider text-text-muted hover:bg-transparent hover:text-text-primary" onClick={() => setExpanded(value => !value)}><span>{expanded ? "Hide score explanation" : "Explain score"}</span>{expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}</Button></div>{expanded && <><Separator /><div className="space-y-3 p-4">{factors.map(([key, factor]) => <div key={key}><div className="mb-1.5 flex items-center justify-between gap-3"><span className="text-[10px] capitalize text-text-secondary">{key.replace(/_/g, " ")}</span><span className="font-mono text-[10px] text-text-primary">+{factor.contribution.toFixed(2)}</span></div><div className="flex items-center gap-2"><Progress value={factor.value} className="flex-1" /><span className="w-12 text-right font-mono text-[9px] text-text-muted">{Math.round(factor.weight * 100)}% wt</span></div></div>)}</div></>}</div>;
}
