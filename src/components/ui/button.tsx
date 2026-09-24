import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-45 active:translate-y-px",
  {
    variants: {
      variant: {
        default: "bg-accent text-white shadow-[0_10px_28px_rgba(217,75,80,0.17)] hover:bg-accent-strong hover:shadow-[0_12px_34px_rgba(217,75,80,0.24)]",
        secondary: "border border-border bg-surface2 text-text-primary shadow-inset hover:border-border-strong hover:bg-surface3",
        outline: "border border-border bg-transparent text-text-secondary hover:border-border-strong hover:bg-surface2 hover:text-text-primary",
        ghost: "text-text-secondary hover:bg-surface2 hover:text-text-primary",
        destructive: "border border-status-emergency/25 bg-status-emergency/10 text-status-emergency hover:bg-status-emergency/20",
        success: "bg-status-safe text-[#08100b] shadow-[0_10px_28px_rgba(104,187,140,0.14)] hover:brightness-110",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
