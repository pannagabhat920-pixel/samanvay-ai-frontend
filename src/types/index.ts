export type Department = 'ENGINEERING' | 'SNT' | 'TRD';
export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface MaintenanceRequest {
  id: number;
  request_id: string;
  department: Department;
  section: string;
  start_km: number;
  end_km: number;
  work_description: string;
  duration_hours: number;
  preferred_date: string;
  due_date: string;
  severity: Severity;
  is_emergency: boolean;
  required_resources: string[];
  submitted_by: string;
  status: string;
  priority_score?: number | null;
  priority_score_details?: PriorityScoreResult | null;
  created_at: string;
  updated_at: string;
}

export interface BlockProposal {
  id: number;
  block_id: string;
  section: string;
  start_km: number;
  end_km: number;
  status: string;
  request_ids: string[];
  requests: MaintenanceRequest[];
  departments: string[];
  estimated_duration_hours: number;
  reason: string;
  reviewed_by?: string | null;
  review_timestamp?: string | null;
  review_reason?: string | null;
  created_at: string;
}

export interface AuditEvent {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  request_id?: string | null;
  block_id?: string | null;
  details: string;
}

export interface PriorityRule {
  id: number;
  version: string;
  name: string;
  weight_safety_risk: number;
  weight_asset_criticality: number;
  weight_failure_likelihood: number;
  weight_overdue_status: number;
  weight_operational_impact: number;
  weight_emergency_status: number;
  is_active: boolean;
  notes?: string | null;
}

export interface PriorityScoreResult {
  request_id: string;
  total_score: number;
  factors: {
    safety_risk: { value: number; weight: number; contribution: number };
    asset_criticality: { value: number; weight: number; contribution: number };
    failure_likelihood: { value: number; weight: number; contribution: number };
    overdue_status: { value: number; weight: number; contribution: number };
    operational_impact: { value: number; weight: number; contribution: number };
    emergency_status: { value: number; weight: number; contribution: number };
  };
  rule_version: string;
  calculated_at: string;
}

export interface ConflictDetail {
  conflicting_request_id: string;
  reason: string;
  severity: 'WARNING' | 'CONFLICT';
}

export interface ConflictResult {
  status: 'SAFE' | 'WARNING' | 'CONFLICT';
  conflicts: ConflictDetail[];
}

export interface DashboardStats {
  open_requests: number;
  emergency: number;
  pending_approval: number;
  approved_blocks: number;
  critical: number;
}

export interface SectionStatus {
  section: string;
  requests: number;
  emergency: number;
  conflicts: number;
  status: 'CLEAR' | 'ACTIVE' | 'CRITICAL';
}

export interface Standard {
  code: string;
  full_name: string;
  authority: string;
  applicable_to: string | string[];
  type: string; // 'INDIAN_RAILWAY' | 'GENERAL_ENGINEERING'
}

export interface CreateRequestPayload {
  department: Department;
  section: string;
  start_km: number;
  end_km: number;
  work_description: string;
  duration_hours: number;
  preferred_date: string;
  due_date: string;
  severity: Severity;
  is_emergency: boolean;
  required_resources: string[];
  submitted_by: string;
}

export interface CreateRequestResponse {
  request: MaintenanceRequest;
  score_breakdown: PriorityScoreResult | null;
  conflict_result: ConflictResult;
  block_proposals: BlockProposal[];
}
