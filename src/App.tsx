import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { AuditPage } from "./pages/AuditPage";
import { BlocksPage } from "./pages/BlocksPage";
import { CorridorPage } from "./pages/CorridorPage";
import { DashboardPage } from "./pages/DashboardPage";
import { JobBoardPage } from "./pages/JobBoardPage";
import { NewRequestPage } from "./pages/NewRequestPage";
import { ReviewPage } from "./pages/ReviewPage";
import { StandardsPage } from "./pages/StandardsPage";

const LandingPage = lazy(() => import("./pages/LandingPage").then((module) => ({ default: module.LandingPage })));

function LandingFallback() {
  return <div role="status" aria-live="polite" className="flex min-h-screen items-center justify-center bg-background"><div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted"><span className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-accent" /> Loading Samanvay</div></div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Suspense fallback={<LandingFallback />}><LandingPage /></Suspense>} />
        <Route element={<AppLayout />}>
          <Route path="/operations" element={<DashboardPage />} />
          <Route path="/dashboard" element={<Navigate to="/operations" replace />} />
          <Route path="/job-board" element={<JobBoardPage />} />
          <Route path="/requests" element={<Navigate to="/job-board" replace />} />
          <Route path="/new-request" element={<NewRequestPage />} />
          <Route path="/corridor" element={<CorridorPage />} />
          <Route path="/blocks" element={<BlocksPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/standards" element={<StandardsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
