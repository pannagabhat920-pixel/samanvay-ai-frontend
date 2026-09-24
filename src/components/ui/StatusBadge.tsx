export const StatusBadge = ({ status }: { status: string }) => {
  const normalized = status.toUpperCase();
  let colorClass = "border-status-muted/25 bg-status-muted/10 text-status-muted";
  if (normalized === "PENDING" || normalized === "PROPOSED") colorClass = "border-status-info/25 bg-status-info/10 text-status-info";
  if (normalized === "APPROVED") colorClass = "border-status-safe/25 bg-status-safe/10 text-status-safe";
  if (normalized === "IN_PROGRESS" || normalized === "ACTIVE" || normalized === "IN REVIEW") colorClass = "border-status-warning/25 bg-status-warning/10 text-status-warning";
  if (normalized === "COMPLETED") colorClass = "border-border bg-surface2 text-text-secondary";
  if (normalized === "REJECTED") colorClass = "border-status-emergency/25 bg-status-emergency/10 text-status-emergency";
  if (normalized === "CRITICAL") colorClass = "border-status-emergency/25 bg-status-emergency/10 text-status-emergency";
  if (normalized === "CLEAR" || normalized === "SUBMITTED") colorClass = "border-status-safe/25 bg-status-safe/10 text-status-safe";

  return <span className={`inline-flex items-center rounded-md border px-2 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.12em] ${colorClass}`}>{normalized.replace(/_/g, " ")}</span>;
};
