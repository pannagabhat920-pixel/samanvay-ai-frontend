import { ArrowUpRight, GitMerge } from "lucide-react";
import { Link } from "react-router-dom";
import { BlockProposal } from "../../types";
import { Badge } from "../ui/badge";

export const BlockSuggestion = ({ blocks }: { blocks: BlockProposal[] }) => {
  if (!blocks?.length) return null;
  return <div className="mt-5"><div className="mb-3 flex items-center justify-between"><h4 className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">Suggested block merges</h4><Link to="/review" className="inline-flex items-center gap-1 text-[10px] text-accent hover:underline">Review <ArrowUpRight className="h-3 w-3" /></Link></div><div className="space-y-3">{blocks.map((block) => <div key={block.block_id} className="rounded-lg border border-status-info/25 bg-status-info/[0.04] p-3"><div className="mb-2 flex items-center justify-between gap-3"><span className="flex items-center gap-2 font-mono text-xs text-status-info"><GitMerge className="h-3.5 w-3.5" />{block.block_id}</span><span className="font-mono text-[10px] text-text-muted">{block.estimated_duration_hours}h window</span></div><p className="text-sm leading-5 text-text-primary">{block.reason}</p><div className="mt-3 flex flex-wrap gap-2">{block.departments.map((department) => <Badge key={department} variant="secondary">{department === "SNT" ? "S&T" : department}</Badge>)}</div></div>)}</div></div>;
};
