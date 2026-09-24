import { useMemo, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Clock3, MapPin, Plus, ShieldAlert, Users, X, Zap } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { CreateRequestPayload, CreateRequestResponse, Department, Severity } from "../../types";
import { PREDEFINED_SECTIONS, DEPARTMENTS, SEVERITIES } from "../../utils/constants";
import { cn } from "../../lib/utils";

type RequestFormData = Omit<CreateRequestPayload, "required_resources"> & { required_resources: string };

interface Props {
  onSubmit: (data: CreateRequestPayload) => Promise<CreateRequestResponse>;
  onSuccess: (res: CreateRequestResponse) => void;
}

const today = new Date().toISOString().split("T")[0];
const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0];
const numericFields = ["start_km", "end_km", "duration_hours"];

const FieldLabel = ({ children, optional = false, hint }: { children: React.ReactNode; optional?: boolean; hint?: string }) => (
  <label className="mb-2 flex items-center justify-between gap-2 text-xs font-medium text-text-secondary">
    <span>{children}</span>
    {hint && <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted">{hint}</span>}
    {optional && <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted">optional</span>}
  </label>
);

function FormSection({ number, title, description, children }: { number: string; title: string; description: string; children: React.ReactNode }) {
  return <Card className="overflow-hidden"><div className="flex items-start gap-3 border-b border-border px-5 py-4 sm:px-6"><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 font-mono text-[10px] text-accent">{number}</div><div><h2 className="text-sm font-medium text-text-primary">{title}</h2><p className="mt-1 text-xs text-text-muted">{description}</p></div></div><div className="p-5 sm:p-6">{children}</div></Card>;
}

function SummaryRow({ icon: Icon, label, value, emphasis = false }: { icon: typeof MapPin; label: string; value: string; emphasis?: boolean }) {
  return <div className="flex items-center justify-between gap-3 border-b border-border/70 py-3 last:border-b-0"><div className="flex items-center gap-2 text-xs text-text-muted"><Icon className="h-3.5 w-3.5" />{label}</div><div className={cn("text-right text-xs", emphasis ? "font-medium text-text-primary" : "text-text-secondary")}>{value}</div></div>;
}

export function RequestForm({ onSubmit, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resourceDraft, setResourceDraft] = useState("");
  const [customSection, setCustomSection] = useState("");
  const [formData, setFormData] = useState<RequestFormData>({
    department: DEPARTMENTS[0].value,
    section: PREDEFINED_SECTIONS[0],
    start_km: 312.4,
    end_km: 314.2,
    work_description: "",
    duration_hours: 3,
    preferred_date: today,
    due_date: nextWeek,
    severity: "MEDIUM",
    is_emergency: false,
    required_resources: "",
    submitted_by: "",
  });

  const updateField = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: numericFields.includes(name) ? Number(value) : value }));
  };

  const resources = useMemo(() => formData.required_resources.split(",").map((item) => item.trim()).filter(Boolean), [formData.required_resources]);
  const department = DEPARTMENTS.find((item) => item.value === formData.department) ?? DEPARTMENTS[0];
  const severityWeight: Record<Severity, number> = { LOW: 5, MEDIUM: 14, HIGH: 23, CRITICAL: 32 };
  const priorityPreview = Math.min(98, 24 + severityWeight[formData.severity] + (formData.is_emergency ? 24 : 0) + (formData.duration_hours >= 4 ? 6 : 0));
  const kmValid = formData.end_km > formData.start_km;

  const addResource = (value = resourceDraft) => {
    const next = value.trim();
    if (!next || resources.some((item) => item.toLowerCase() === next.toLowerCase())) return;
    setFormData((previous) => ({ ...previous, required_resources: [...resources, next].join(", ") }));
    setResourceDraft("");
  };

  const removeResource = (value: string) => setFormData((previous) => ({ ...previous, required_resources: resources.filter((item) => item !== value).join(", ") }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!kmValid) { setError("End KM must be greater than start KM."); return; }
    if (formData.due_date < formData.preferred_date) { setError("Due date must be on or after the preferred date."); return; }
    if (!formData.work_description.trim()) { setError("Add a short description of the work."); return; }
    const effectiveSection = formData.section === "Other (specify)" ? customSection.trim() : formData.section;
    if (!effectiveSection) { setError("Enter the custom section name."); return; }
    if (!resources.length) { setError("Add at least one required resource."); return; }
    setLoading(true);
    try {
      const response = await onSubmit({ ...formData, section: effectiveSection, required_resources: resources });
      onSuccess(response);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to submit this request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_310px]">
      <div className="space-y-4">
        {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}

        <FormSection number="01" title="Work" description="Tell the operations team what needs to happen and who owns it.">
          <div className="grid gap-5 sm:grid-cols-2">
            <div><FieldLabel>Department</FieldLabel><Select value={formData.department} onValueChange={(value) => setFormData((previous) => ({ ...previous, department: value as Department }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{DEPARTMENTS.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select></div>
            <div><FieldLabel>Section</FieldLabel><Select value={formData.section} onValueChange={(value) => setFormData((previous) => ({ ...previous, section: value }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{PREDEFINED_SECTIONS.map((section) => <SelectItem key={section} value={section}>{section}</SelectItem>)}</SelectContent></Select>{formData.section === "Other (specify)" && <Input value={customSection} onChange={(event) => setCustomSection(event.target.value)} placeholder="Enter section name" className="mt-2" />}</div>
          </div>
          <div className="mt-5"><FieldLabel>Work description</FieldLabel><Textarea name="work_description" value={formData.work_description} onChange={updateField} placeholder="Describe the work, access needs, and expected outcome." required rows={4} /></div>
        </FormSection>

        <FormSection number="02" title="Location" description="Place the request on the corridor so shared work can be found.">
          <div className="grid gap-5 sm:grid-cols-2"><div><FieldLabel hint="km">Start KM</FieldLabel><Input type="number" step="0.01" name="start_km" value={formData.start_km} onChange={updateField} required /></div><div><FieldLabel hint="km">End KM</FieldLabel><Input type="number" step="0.01" name="end_km" value={formData.end_km} onChange={updateField} required /></div></div>
          {!kmValid && <p className="mt-3 flex items-center gap-1.5 text-xs text-status-emergency"><AlertCircle className="h-3.5 w-3.5" /> End KM must be greater than start KM.</p>}
        </FormSection>

        <FormSection number="03" title="Timing" description="Set the preferred window and the time the work should be complete.">
          <div className="grid gap-5 sm:grid-cols-3"><div><FieldLabel>Preferred date</FieldLabel><Calendar name="preferred_date" value={formData.preferred_date} onChange={updateField} required /></div><div><FieldLabel>Due date</FieldLabel><Calendar name="due_date" value={formData.due_date} onChange={updateField} required /></div><div><FieldLabel hint="hours">Duration</FieldLabel><Input type="number" step="0.5" min="0.5" name="duration_hours" value={formData.duration_hours} onChange={updateField} required /></div></div>
        </FormSection>

        <FormSection number="04" title="Risk" description="Give the officer enough context to understand urgency before coordination.">
          <div><FieldLabel>Severity</FieldLabel><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{SEVERITIES.map((severity) => <button key={severity} type="button" onClick={() => setFormData((previous) => ({ ...previous, severity }))} className={cn("rounded-lg border px-3 py-2.5 text-left transition-all", formData.severity === severity ? "border-accent/50 bg-accent/10 text-text-primary" : "border-border bg-surface2 text-text-muted hover:border-border-strong hover:text-text-secondary")}><span className="block font-mono text-[10px] uppercase tracking-[0.12em]">{severity}</span><span className="mt-1 block text-[10px] text-text-muted">{severity === "LOW" ? "Routine" : severity === "MEDIUM" ? "Monitor" : severity === "HIGH" ? "Elevated" : "Immediate"}</span></button>)}</div></div>
          <div className="mt-5 rounded-xl border border-status-emergency/20 bg-status-emergency/[0.045] p-4"><div className="flex items-start justify-between gap-4"><div className="flex items-start gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg border border-status-emergency/25 bg-status-emergency/10 text-status-emergency"><ShieldAlert className="h-4 w-4" /></div><div><div className="text-sm font-medium text-text-primary">Emergency request</div><p className="mt-1 max-w-md text-xs leading-5 text-text-secondary">Use for work that cannot wait for the normal planning cycle. It will be visibly prioritized in the queue.</p></div></div><button type="button" role="switch" aria-label="Emergency request" aria-checked={formData.is_emergency} onClick={() => setFormData((previous) => ({ ...previous, is_emergency: !previous.is_emergency }))} className={cn("relative mt-1 h-6 w-11 shrink-0 rounded-full border transition-colors", formData.is_emergency ? "border-status-emergency/50 bg-status-emergency/30" : "border-border bg-surface3")}><span className={cn("absolute top-1 h-4 w-4 rounded-full transition-transform", formData.is_emergency ? "translate-x-6 bg-status-emergency" : "translate-x-1 bg-text-muted")} /></button></div></div>
        </FormSection>

        <FormSection number="05" title="Resources" description="List the crew, equipment, and support required to execute safely.">
          <div><FieldLabel>Resource list</FieldLabel><div className="flex gap-2"><Input value={resourceDraft} onChange={(event) => setResourceDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addResource(); } }} placeholder="e.g. line crew, excavator, isolation support" /><Button type="button" variant="secondary" size="icon" onClick={() => addResource()} aria-label="Add resource"><Plus className="h-4 w-4" /></Button></div><p className="mt-2 text-[10px] text-text-muted">Press enter or add each resource separately.</p></div>
          <div className="mt-4 flex flex-wrap gap-2">{resources.map((resource) => <span key={resource} className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface2 px-3 py-2 text-xs text-text-secondary">{resource}<button type="button" onClick={() => removeResource(resource)} className="text-text-muted transition-colors hover:text-status-emergency" aria-label={`Remove ${resource}`}><X className="h-3.5 w-3.5" /></button></span>)}</div>
          <div className="mt-4"><FieldLabel>Submitted by</FieldLabel><Input name="submitted_by" value={formData.submitted_by} onChange={updateField} placeholder="Officer or department user" required /></div>
        </FormSection>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-border pt-5 sm:flex-row sm:items-center"><p className="max-w-md text-xs leading-5 text-text-muted">Submitting calculates a transparent score and checks for a potential shared block. It never approves work automatically.</p><Button type="submit" disabled={loading}>{loading ? "Submitting…" : "Submit request"}<ArrowRight className="h-4 w-4" /></Button></div>
      </div>

      <Card className="sticky top-5 overflow-hidden border-accent/20 bg-surface/90"><div className="border-b border-border bg-accent/[0.045] px-5 py-4"><div className="flex items-center gap-2"><div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent"><Zap className="h-3.5 w-3.5" /></div><div><div className="eyebrow">Indicative preview</div><div className="mt-1 text-sm font-medium text-text-primary">Request summary</div></div></div></div><div className="p-5"><SummaryRow icon={Users} label="Department" value={department.label} emphasis /><SummaryRow icon={MapPin} label="Section" value={formData.section === "Other (specify)" ? (customSection || "Specify section") : formData.section} emphasis /><SummaryRow icon={MapPin} label="Corridor" value={`km ${formData.start_km.toFixed(1)} → ${formData.end_km.toFixed(1)}`} /><SummaryRow icon={Clock3} label="Duration" value={`${formData.duration_hours} hours`} /><SummaryRow icon={ShieldAlert} label="Mode" value={formData.is_emergency ? "Emergency" : "Routine"} emphasis={formData.is_emergency} /><div className="mt-5 rounded-xl border border-border bg-surface2/55 p-4"><div className="flex items-center justify-between"><span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">Indicative priority</span><span className="metric-number font-mono text-lg text-text-primary">{priorityPreview}</span></div><Progress value={priorityPreview} className="mt-3" /><div className="mt-3 flex items-center gap-2 text-[10px] text-text-muted"><span className={cn("h-1.5 w-1.5 rounded-full", priorityPreview >= 70 ? "bg-status-emergency" : priorityPreview >= 45 ? "bg-status-warning" : "bg-status-safe")} />{priorityPreview >= 70 ? "Officer attention" : priorityPreview >= 45 ? "Coordinate soon" : "Routine coordination"}</div></div><div className="mt-5 flex items-start gap-2 text-[10px] leading-5 text-text-muted"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-status-safe" /> Your request will be scored, checked for overlap, and added to the shared queue.</div></div></Card>
    </form>
  );
}
