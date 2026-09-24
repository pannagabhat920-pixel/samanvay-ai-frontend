interface StatCardProps {
  label: string;
  value: number | string;
  isRed?: boolean;
  isGreen?: boolean;
}

export const StatCard = ({ label, value, isRed, isGreen }: StatCardProps) => {
  const valueColor = isRed ? "text-status-emergency" : isGreen ? "text-status-safe" : "text-text-primary";
  return <div className="rounded-xl border border-border bg-surface p-4 shadow-inset"><div className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted">{label}</div><div className={`metric-number mt-3 font-mono text-2xl ${valueColor}`}>{value}</div></div>;
};
