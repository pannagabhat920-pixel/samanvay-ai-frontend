import { useEffect, useMemo, useState } from "react";
import { BookOpen, Info, Link2 } from "lucide-react";
import { getStandards } from "../api/standards";
import { Standard } from "../types";
import { StandardsSection } from "../components/standards/StandardsSection";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { demoStandards } from "../data/demo";

const fallbackStandards: Standard[] = demoStandards.map((standard) => ({ code: standard.code, full_name: standard.label, authority: standard.authority, applicable_to: "Railway maintenance coordination", type: standard.code === "G&SR" || standard.code === "PWM" ? "INDIAN_RAILWAY" : "GENERAL_ENGINEERING" }));

export const StandardsPage = () => {
  const [standards, setStandards] = useState<Standard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    getStandards().then((response) => {
      setStandards([
        ...response.INDIAN_RAILWAY_REFERENCES.map((item) => ({ ...item, type: "INDIAN_RAILWAY" as const })),
        ...response.GENERAL_ENGINEERING_REFERENCES.map((item) => ({ ...item, type: "GENERAL_ENGINEERING" as const })),
      ]);
    }).catch((reason) => setError(reason instanceof Error ? reason.message : "Standards service unavailable")).finally(() => setLoading(false));
  }, []);
  const displayStandards = standards.length ? standards : fallbackStandards;
  const irStandards = useMemo(() => displayStandards.filter((standard) => standard.type === "INDIAN_RAILWAY"), [displayStandards]);
  const geStandards = useMemo(() => displayStandards.filter((standard) => standard.type === "GENERAL_ENGINEERING"), [displayStandards]);
  if (loading) return <LoadingSpinner />;
  return <div className="mx-auto max-w-6xl space-y-5 pb-10 animate-fade-up"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="flex items-center gap-2 text-xs text-text-muted"><span>Samanvay AI</span><span className="text-border-strong">/</span><span>Standards</span></div><h1 className="mt-3 flex items-center gap-2 text-2xl font-semibold tracking-[-0.035em] text-text-primary sm:text-3xl"><BookOpen className="h-5 w-5 text-accent" /> Standards reference</h1><p className="mt-2 text-sm text-text-secondary">A clean reference layer for railway and engineering practice.</p></div><Badge variant="outline">Reference only</Badge></div>{error && <Alert variant="info"><Info className="h-4 w-4" /><AlertTitle>Showing the local reference set</AlertTitle><AlertDescription>The standards service is not connected, so this page is using the clearly separated local reference list.</AlertDescription></Alert>}<Card className="border-accent/20 bg-accent/[0.035]"><CardContent className="flex items-start gap-3 p-5"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent"><Link2 className="h-4 w-4" /></div><div><div className="text-sm font-medium text-text-primary">Built with reference to railway and engineering standards.</div><p className="mt-2 max-w-2xl text-xs leading-5 text-text-secondary">Samanvay is designed with reference to the operating manuals and standards that shape railway maintenance decisions. This reference layer does not claim certification or regulatory approval.</p></div></CardContent></Card><div className="grid gap-5"><StandardsSection title="Indian Railway references" standards={irStandards} /><StandardsSection title="General engineering references" standards={geStandards} /></div></div>;
};
