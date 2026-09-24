import { AlertTriangle, Check, ShieldAlert } from "lucide-react";

export const ConflictBadge = ({ status }: { status: "SAFE" | "WARNING" | "CONFLICT" }) => {
  const config = status === "SAFE"
    ? { className: "border-status-safe/25 bg-status-safe/10 text-status-safe", Icon: Check, text: "SAFE" }
    : status === "WARNING"
      ? { className: "border-status-warning/25 bg-status-warning/10 text-status-warning", Icon: AlertTriangle, text: "WARNING" }
      : { className: "border-status-emergency/25 bg-status-emergency/10 text-status-emergency", Icon: ShieldAlert, text: "CONFLICT" };
  const Icon = config.Icon;
  return <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.12em] ${config.className}`}><Icon className="h-3 w-3" />{config.text}</span>;
};
