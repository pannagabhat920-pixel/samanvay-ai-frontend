import * as React from "react";
import { CalendarDays } from "lucide-react";
import { cn } from "../../lib/utils";

export interface CalendarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Calendar = React.forwardRef<HTMLInputElement, CalendarProps>(({ className, ...props }, ref) => (
  <div className="relative">
    <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
    <input ref={ref} type="date" className={cn("flex h-10 w-full rounded-lg border border-border bg-surface2/80 px-9 py-2 text-sm text-text-primary shadow-inset outline-none focus:border-accent/70 focus:ring-1 focus:ring-accent/20", className)} {...props} />
  </div>
));
Calendar.displayName = "Calendar";

export { Calendar };
