export type Severity = 'SEV-1' | 'SEV-2' | 'SEV-3';

export type SimulatorState =
  | 'IDLE'
  | 'INCIDENT_DETECTED'
  | 'INVESTIGATING'
  | 'ROOT_CAUSE_IDENTIFIED'
  | 'POLICY_CHECK'
  | 'WAITING_APPROVAL'
  | 'REMEDIATING'
  | 'VERIFYING'
  | 'RESOLVED'
  | 'VERIFICATION_FAILED'
  | 'ROLLBACK'
  | 'ESCALATED';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface RootCauseCandidate {
  id: string;
  title: string;
  confidence: number; // 0 to 100
  isProbable: boolean;
  description: string;
  evidence: string[];
  gitCommit?: {
    hash: string;
    message: string;
    author: string;
    timestamp: string;
    diffSummary: string;
  };
}

export interface MetricSnapshot {
  errorRate: number; // percentage e.g. 14.8%
  errorRateDelta: string;
  p99Latency: number; // ms e.g. 2480ms
  latencyDelta: string;
  healthChecks: string; // "0/6 Passing"
  healthChecksHealthy: boolean;
  cpuUtilization: number; // % e.g. 88%
  memoryUtilization: number; // % e.g. 74%
  activeAlerts: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'AI-AGENT' | 'POLICY' | 'VERIFY';
  source: string;
  message: string;
  highlight?: boolean;
}

export interface RemediationAction {
  id: string;
  name: string;
  command: string;
  targetService: string;
  riskLevel: RiskLevel;
  executionType: 'AUTO_EXECUTE' | 'HUMAN_APPROVAL' | 'RECOMMENDATION_ONLY';
  estimatedRecoverySecs: number;
  rollbackStrategy: string;
  reason: string;
}

export interface PolicyRule {
  id: string;
  name: string;
  riskLevel: RiskLevel;
  condition: string;
  decision: 'AUTO_APPROVE' | 'REQUIRE_APPROVAL' | 'BLOCK_AND_ESCALATE';
  description: string;
  matched: boolean;
}

export interface VerificationCondition {
  id: string;
  name: string;
  metric: string;
  target: string;
  currentValue: string;
  status: 'pending' | 'checking' | 'passed' | 'failed';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  operator: string;
  action: string;
  policyId: string;
  gitHash?: string;
  justification: string;
  verificationResult: string;
  signature: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  stepIndex: number;
  title: string;
  description: string;
  stateTarget: SimulatorState;
  category: 'alert' | 'telemetry' | 'ai' | 'policy' | 'approval' | 'remediation' | 'verification' | 'resolution' | 'escalation';
  badge?: string;
}

export interface IncidentScenario {
  id: string;
  title: string;
  severity: Severity;
  service: string;
  environment: string;
  incidentId: string;
  summary: string;
  confidence: number;
  isLowConfidenceDemo?: boolean;
  timeline: TimelineEvent[];
  rootCauses: RootCauseCandidate[];
  remediation: RemediationAction;
  policyRules: PolicyRule[];
  verificationChecks: VerificationCondition[];
  metricsByState: Record<SimulatorState, MetricSnapshot>;
  logsByState: Record<SimulatorState, LogEntry[]>;
  auditLog: AuditLogEntry;
}
