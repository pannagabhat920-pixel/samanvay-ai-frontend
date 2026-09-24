import { Search, SlidersHorizontal } from "lucide-react";
import { DEPARTMENTS } from "../../utils/constants";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export interface RequestFilterState {
  department: string;
  status: string;
  emergency: string;
  search: string;
}

interface Props {
  filters: RequestFilterState;
  onChange: (filters: RequestFilterState) => void;
}

const FilterSelect = ({ value, onValueChange, children, ariaLabel, placeholder }: { value: string; onValueChange: (value: string) => void; children: React.ReactNode; ariaLabel: string; placeholder: string }) => <Select value={value} onValueChange={onValueChange}><SelectTrigger aria-label={ariaLabel}><SelectValue placeholder={placeholder} /></SelectTrigger><SelectContent>{children}</SelectContent></Select>;

export const RequestFilters = ({ filters, onChange }: Props) => {
  const update = (key: keyof RequestFilterState, value: string) => onChange({ ...filters, [key]: value });
  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-inset sm:p-5">
      <div className="mb-4 flex items-center gap-2 text-xs font-medium text-text-secondary"><SlidersHorizontal className="h-3.5 w-3.5 text-accent" /> Filter the operational queue</div>
      <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" /><Input aria-label="Search requests" value={filters.search} onChange={(event) => update("search", event.target.value)} placeholder="Search ID, section, or work" className="pl-9" /></div>
        <FilterSelect value={filters.department} onValueChange={(value) => update("department", value)} ariaLabel="Filter by department" placeholder="Department"><SelectItem value="All">All departments</SelectItem>{DEPARTMENTS.map((department) => <SelectItem key={department.value} value={department.value}>{department.label}</SelectItem>)}</FilterSelect>
        <FilterSelect value={filters.status} onValueChange={(value) => update("status", value)} ariaLabel="Filter by status" placeholder="Status"><SelectItem value="All">All statuses</SelectItem><SelectItem value="SUBMITTED">Submitted</SelectItem><SelectItem value="PROCESSING">Processing</SelectItem><SelectItem value="APPROVED">Approved</SelectItem><SelectItem value="REJECTED">Rejected</SelectItem></FilterSelect>
        <FilterSelect value={filters.emergency} onValueChange={(value) => update("emergency", value)} ariaLabel="Filter by request type" placeholder="Type"><SelectItem value="All">All types</SelectItem><SelectItem value="EMERGENCY">Emergency only</SelectItem><SelectItem value="ROUTINE">Routine only</SelectItem></FilterSelect>
      </div>
    </div>
  );
};
