import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "../../lib/utils";

const Command = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("flex h-full w-full flex-col overflow-hidden rounded-md border border-border bg-surface text-text-secondary", className)} {...props} />);
Command.displayName = "Command";
const CommandInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => <div className="flex items-center border-b border-border px-3"><Search className="mr-2 h-4 w-4 text-text-muted" /><input ref={ref} className={cn("flex h-11 w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted", className)} {...props} /></div>);
CommandInput.displayName = "CommandInput";
const CommandList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("max-h-64 overflow-y-auto overflow-x-hidden p-1", className)} {...props} />);
CommandList.displayName = "CommandList";
const CommandEmpty = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("py-6 text-center text-sm text-text-muted", className)} {...props} />);
CommandEmpty.displayName = "CommandEmpty";
const CommandGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("px-1 py-1", className)} {...props} />);
CommandGroup.displayName = "CommandGroup";
const CommandItem = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => <button ref={ref} className={cn("flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-left text-sm text-text-secondary outline-none transition-colors hover:bg-surface2 hover:text-text-primary focus:bg-surface2", className)} {...props} />);
CommandItem.displayName = "CommandItem";
const CommandSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />);
CommandSeparator.displayName = "CommandSeparator";

export { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator };
