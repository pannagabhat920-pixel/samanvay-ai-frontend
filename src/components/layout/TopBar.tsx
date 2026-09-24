import { Bell, ChevronDown, CircleHelp, Clock3, LogOut, Menu, Settings, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { useHealth } from "../../hooks/useHealth";

const routeMeta: Record<string, { section: string; title: string }> = {
  "/operations": { section: "Operations", title: "Overview" },
  "/job-board": { section: "Operations", title: "Request queue" },
  "/requests": { section: "Operations", title: "Request queue" },
  "/new-request": { section: "Operations", title: "New request" },
  "/corridor": { section: "Operations", title: "Corridor" },
  "/blocks": { section: "Control room", title: "Blocks" },
  "/review": { section: "Control room", title: "Review" },
  "/audit": { section: "Control room", title: "Audit" },
  "/standards": { section: "Control room", title: "Standards" },
};

export function TopBar({ onMenu }: { onMenu: () => void }) {
  const location = useLocation();
  const { online, health } = useHealth();
  const [time, setTime] = useState(new Date());
  useEffect(() => { const timer = window.setInterval(() => setTime(new Date()), 30000); return () => window.clearInterval(timer); }, []);
  const meta = routeMeta[location.pathname] || routeMeta["/operations"];

  return (
    <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-border bg-surface/80 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenu} aria-label="Open navigation"><Menu className="h-5 w-5" /></Button>
        <div className="hidden items-center gap-2 text-xs text-text-muted sm:flex"><Link to="/operations" className="transition-colors hover:text-text-primary">Samanvay</Link><span className="text-border-strong">/</span><span className="text-text-secondary">{meta.title}</span></div>
        <div className="sm:hidden"><div className="text-sm font-medium text-text-primary">{meta.title}</div><div className="mt-1 font-mono text-[9px] uppercase tracking-wider text-text-muted">{meta.section}</div></div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className={`hidden items-center gap-2 rounded-lg border px-3 py-2 lg:flex ${online ? "border-status-safe/15 bg-status-safe/[0.04]" : "border-status-warning/20 bg-status-warning/[0.05]"}`}><span className={`h-1.5 w-1.5 animate-soft-pulse rounded-full ${online ? "bg-status-safe" : "bg-status-warning"}`} /><span className={`font-mono text-[9px] uppercase tracking-[0.15em] ${online ? "text-status-safe" : "text-status-warning"}`}>{online ? `API / ${health?.database || "connected"}` : "API / reconnecting"}</span></div>
        <div className="hidden items-center gap-2 font-mono text-[10px] text-text-muted xl:flex"><Clock3 className="h-3.5 w-3.5" />{time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</div>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications"><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(217,75,80,0.8)]" /></Button>
        <Separator orientation="vertical" className="hidden h-6 sm:block" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" className="h-10 gap-2 px-1.5 sm:px-2"><Avatar className="h-8 w-8 border border-border"><AvatarFallback className="bg-accent/10 text-accent">OP</AvatarFallback></Avatar><span className="hidden text-left sm:block"><span className="block text-xs text-text-primary">Operations Officer</span><span className="mt-0.5 block font-mono text-[9px] uppercase tracking-wider text-text-muted">Railway control</span></span><ChevronDown className="hidden h-3.5 w-3.5 text-text-muted sm:block" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60"><DropdownMenuLabel><div className="flex items-center gap-2"><Avatar className="h-8 w-8"><AvatarFallback className="bg-accent/10 text-accent">OP</AvatarFallback></Avatar><div><div className="text-xs text-text-primary">Operations Officer</div><div className="font-mono text-[9px] uppercase tracking-wider text-text-muted">Officer role</div></div></div></DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem><UserRound className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem><DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Preferences</DropdownMenuItem><DropdownMenuItem><CircleHelp className="mr-2 h-4 w-4" /> Help center</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem className="text-status-emergency"><LogOut className="mr-2 h-4 w-4" /> Sign out</DropdownMenuItem></DropdownMenuContent>
        </DropdownMenu>
        <div className="hidden border-l border-border pl-4 font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted md:block">Dept / all</div>
      </div>
    </header>
  );
}
