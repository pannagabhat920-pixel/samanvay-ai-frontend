import { CircleCheck, Inbox, type LucideIcon } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: LucideIcon;
}

export const EmptyState = ({ title = "Nothing waiting here", message, actionLabel, onAction, icon: Icon = Inbox }: EmptyStateProps) => (
  <div className="rounded-xl border border-dashed border-border bg-surface/60 px-6 py-12 text-center">
    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface2 text-text-muted"><Icon className="h-5 w-5" /></div>
    <h3 className="mt-4 text-sm font-medium text-text-primary">{title}</h3>
    <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-text-muted">{message}</p>
    {actionLabel && onAction && <Button variant="outline" size="sm" className="mt-5" onClick={onAction}>{actionLabel}<CircleCheck className="h-3.5 w-3.5" /></Button>}
  </div>
);
