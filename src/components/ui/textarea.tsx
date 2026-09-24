import * as React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[110px] w-full resize-y rounded-lg border border-border bg-surface2/80 px-3 py-2.5 text-sm leading-6 text-text-primary shadow-inset transition-colors placeholder:text-text-muted focus:border-accent/70 focus:bg-surface2 focus:outline-none focus:ring-1 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
