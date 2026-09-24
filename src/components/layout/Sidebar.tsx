import {
  Activity,
  BellRing,
  ClipboardCheck,
  FileClock,
  GitMerge,
  LayoutDashboard,
  Map,
  Plus,
  ScrollText,
  Settings2,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { useRequests } from "../../hooks/useRequests";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navGroups: { label: string; items: { path: string; label: string; icon: LucideIcon; end?: boolean; count?: string }[] }[] = [
  { label: "Operations", items: [{ path: "/operations", label: "Overview", icon: LayoutDashboard, end: true }, { path: "/job-board", label: "Requests", icon: ClipboardCheck }, { path: "/new-request", label: "New request", icon: Plus }, { path: "/corridor", label: "Corridor", icon: Map }] },
  { label: "Control room", items: [{ path: "/blocks", label: "Blocks", icon: GitMerge }, { path: "/review", label: "Review", icon: ShieldCheck }, { path: "/audit", label: "Audit", icon: ScrollText }, { path: "/standards", label: "Standards", icon: FileClock }] },
];

function SidebarBrand() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-accent/35 bg-accent/10 text-accent shadow-[0_0_24px_rgba(217,75,80,0.12)]">
        <Activity className="h-[18px] w-[18px]" strokeWidth={1.7} />
        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full border-2 border-surface bg-accent" />
      </div>
      <div className="leading-none">
        <div className="font-mono text-[13px] font-semibold tracking-[0.2em] text-text-primary">SAMANVAY</div>
        <div className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.2em] text-text-muted">Operations control</div>
      </div>
    </div>
  );
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  const { requests, fetchRequests } = useRequests();
  useEffect(() => { fetchRequests(); }, [location.pathname, fetchRequests]);
  return (
    <>
      <div className={cn("fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")} onClick={onClose} />
      <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-[256px] -translate-x-full flex-col border-r border-border bg-surface/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0", open && "translate-x-0")}>
        <div className="flex h-[72px] items-center justify-between border-b border-border px-5">
          <Link to="/operations" onClick={onClose}><SidebarBrand /></Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose} aria-label="Close navigation"><X className="h-4 w-4" /></Button>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-5">
          <div className="mb-6 rounded-xl border border-accent/20 bg-accent/[0.045] p-3.5">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-accent" />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">Foundation online</span>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-text-secondary">Shared context for Engineering, S&amp;T, and TRD.</p>
            <div className="mt-3 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted"><span className="h-1 w-1 rounded-full bg-status-safe" /> Human approval required</div>
          </div>

          {navGroups.map((group) => (
            <div key={group.label} className="mb-7">
              <div className="mb-2 px-3 font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">{group.label}</div>
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.end}
                      onClick={onClose}
                      className={({ isActive }) => cn(
                        "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                        isActive
                          ? "bg-accent/10 text-text-primary shadow-[inset_2px_0_0_#d94b50]"
                          : "text-text-secondary hover:bg-surface2 hover:text-text-primary",
                      )}
                    >
                      <Icon className="h-[17px] w-[17px] text-text-muted transition-colors group-[.active]:text-accent" strokeWidth={1.7} />
                      <span>{item.label}</span>
                      {item.label === "Requests" && requests.length > 0 && <span className="ml-auto rounded-md bg-surface3 px-1.5 py-0.5 font-mono text-[9px] text-text-muted">{String(requests.length).padStart(2, "0")}</span>}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-status-safe/25 bg-status-safe/10 text-status-safe"><BellRing className="h-3.5 w-3.5" /></div>
            <div className="min-w-0 flex-1"><div className="text-xs text-text-primary">System status</div><div className="mt-1 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-status-safe"><span className="h-1.5 w-1.5 rounded-full bg-status-safe" /> Nominal</div></div>
            <Settings2 className="h-4 w-4 text-text-muted" />
          </div>
          <Separator className="my-3" />
          <div className="flex items-center justify-between px-3 font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted"><span>Indian Railways</span><span>v0.1</span></div>
        </div>
      </aside>
    </>
  );
}
