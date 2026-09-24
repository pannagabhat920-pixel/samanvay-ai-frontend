export const SeverityBadge = ({ severity }: { severity: string }) => {
  const normalized = severity.toUpperCase();
  let colorClass = "text-status-muted";
  let dotClass = "bg-status-muted";
  if (normalized === "LOW") { colorClass = "text-status-safe"; dotClass = "bg-status-safe"; }
  if (normalized === "MEDIUM") { colorClass = "text-status-info"; dotClass = "bg-status-info"; }
  if (normalized === "HIGH") { colorClass = "text-status-warning"; dotClass = "bg-status-warning"; }
  if (normalized === "CRITICAL") { colorClass = "text-status-emergency"; dotClass = "bg-status-emergency"; }

  return <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] ${colorClass}`}><span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />{normalized}</span>;
};
