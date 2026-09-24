export const DeptBadge = ({ dept }: { dept: string }) => {
  const normalized = dept.toUpperCase();
  let colorClass = "text-text-secondary";
  let bgClass = "bg-surface2";
  if (normalized.includes("ENG")) { colorClass = "text-dept-engineering"; bgClass = "bg-dept-engineering/10"; }
  if (normalized.includes("SNT") || normalized.includes("S&T") || normalized.includes("SIG")) { colorClass = "text-dept-st"; bgClass = "bg-dept-st/10"; }
  if (normalized.includes("TRD")) { colorClass = "text-dept-trd"; bgClass = "bg-dept-trd/10"; }

  return <span className={`inline-flex items-center rounded-md border border-border/70 ${bgClass} px-2 py-1 font-mono text-[9px] font-medium tracking-[0.12em] ${colorClass}`}>{normalized === "SNT" ? "S&T" : normalized}</span>;
};
