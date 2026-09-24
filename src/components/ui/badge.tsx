import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.12em]",
  {
    variants: {
      variant: {
        default: "border-accent/25 bg-accent/10 text-accent",
        secondary: "border-border bg-surface2 text-text-secondary",
        outline: "border-border bg-transparent text-text-muted",
        success: "border-status-safe/25 bg-status-safe/10 text-status-safe",
        warning: "border-status-warning/25 bg-status-warning/10 text-status-warning",
        danger: "border-status-emergency/25 bg-status-emergency/10 text-status-emergency",
        info: "border-status-info/25 bg-status-info/10 text-status-info",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
