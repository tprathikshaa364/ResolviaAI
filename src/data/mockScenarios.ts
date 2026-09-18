import { IncidentScenario } from '../types/incident';

export const SCENARIO_PAYMENT_FAILURE: IncidentScenario = {
  id: 'payment-api-failure',
  title: 'Payment API Deployment Failure',
  severity: 'SEV-1',
  service: 'payment-gateway-api',
  environment: 'production-us-east-1',
  incidentId: 'INC-2847',
  summary: 'Payment API health checks failing with 380% error spike immediately following v2.7 canary rollout.',
  confidence: 94,
  isLowConfidenceDemo: false,
  timeline: [
    {
      id: 't-1',
      timestamp: '14:32:04',
      stepIndex: 0,
      title: 'Deployment v2.7 detected',
      description: 'Kubernetes deployment rollout triggered for payment-gateway-api:v2.7 (commit 4f98a1b)',
      stateTarget: 'IDLE',
      category: 'telemetry',
      badge: 'GitOps'
    },
    {
      id: 't-2',
      timestamp: '14:32:19',
      stepIndex: 1,
      title: 'Error rate increased by 380%',
      description: 'HTTP 500 error rate spiked from 0.04% to 18.2% across payment endpoints. 17 dependent alerts triggered.',
      stateTarget: 'INCIDENT_DETECTED',
      category: 'alert',
      badge: 'SEV-1 Alert'
    },
    {
      id: 't-3',
      timestamp: '14:32:26',
      stepIndex: 2,
      title: 'AI correlation engine groups 17 alerts',
      description: 'Resolvia Graph Correlator clustered payment-gateway, checkout-ui, and invoice-worker alerts into single incident graph.',
      stateTarget: 'INVESTIGATING',
      category: 'ai',
      badge: 'Signal Graph'
    },
    {
      id: 't-4',
      timestamp: '14:32:31',
      stepIndex: 3,
      title: 'AI identifies deployment v2.7 as probable root cause',
      description: 'Multi-hypothesis analysis: 94% confidence correlation with StripeConnector.buildPayload() null reference in v2.7.',
      stateTarget: 'ROOT_CAUSE_IDENTIFIED',
      category: 'ai',
      badge: 'Confidence 94%'
    },
    {
      id: 't-5',
      timestamp: '14:32:37',
      stepIndex: 4,
      title: 'Remediation policy evaluated',
      description: 'Policy Engine matched Rule POL-PROD-04: "Production Rollback on Core Payment Service". Classified as MEDIUM RISK.',
      stateTarget: 'POLICY_CHECK',
      category: 'policy',
      badge: 'Medium Risk'
    },
    {
      id: 't-6',
      timestamp: '14:32:40',
      stepIndex: 5,
      title: 'Rollback requires human approval',
      description: 'Autonomous execution gate paused. Sent high-priority webhook to on-call SRE with complete diff and evidence packet.',
      stateTarget: 'WAITING_APPROVAL',
      category: 'approval',
      badge: 'Approval Gate'
    },
    {
      id: 't-7',
      timestamp: '14:32:50',
      stepIndex: 6,
      title: 'Remediation initiated',
      description: 'Operator approved. Executing kubectl rollout undo deployment/payment-gateway-api to stable v2.6.2.',
      stateTarget: 'REMEDIATING',
      category: 'remediation',
      badge: 'Rollback'
    },
    {
      id: 't-8',
      timestamp: '14:32:58',
      stepIndex: 7,
      title: 'Closed-loop verification underway',
      description: 'Asserting recovery thresholds: Error rate < 1%, Liveness checks passing, p99 latency < 350ms for 3 consecutive intervals.',
      stateTarget: 'VERIFYING',
      category: 'verification',
      badge: 'Telemetric Check'
    },
    {
      id: 't-9',
      timestamp: '14:33:05',
      stepIndex: 8,
      title: 'Incident automatically resolved',
      description: 'All 4 verification assertions passed. Incident INC-2847 closed. Post-incident diagnostic packet archived to audit ledger.',
      stateTarget: 'RESOLVED',
      category: 'resolution',
      badge: 'Recovery Verified'
    }
  ],
  rootCauses: [
    {
      id: 'rc-1',
      title: 'Deployment v2.7 (Null pointer in Stripe payload builder)',
      confidence: 94,
      isProbable: true,
      description: 'Error spike began exactly 15 seconds after v2.7 container initialization. Stack traces indicate missing idempotency key field in new payload structure.',
      evidence: [
        'Error rate increased from 0.04% to 18.2% within 15s of deployment v2.7',
        'Stack trace: StripeConnector.buildPayload(StripeConnector.java:142) NullPointerException',
        'Database connections and query latencies remain completely stable (< 4ms)',
        'Historical similarity: 89% structural match with INC-1904 resolved by rollback'
      ],
      gitCommit: {
        hash: '4f98a1b',
        message: 'feat(payments): optimize checkout payload serialization and fee calculation',
        author: 'sarah.chen@enterprise.internal',
        timestamp: '14:31:10 UTC',
        diffSummary: 'Changed StripeConnector.java (+34, -12) adding optional fee metadata without fallback guard'
      }
    },
    {
      id: 'rc-2',
      title: 'Downstream Database Latency / Pool Saturation',
      confidence: 38,
      isProbable: false,
      description: 'Connection pool metrics show 12% utilization with steady p95 response time of 3.8ms. Incompatible with primary root cause.',
      evidence: [
        'PostgreSQL primary connection pool: 14/120 active connections',
        'Disk IOPS and CPU below 28% capacity on db-primary-01',
        'No lock contention or slow query logs detected in window'
      ]
    },
    {
      id: 'rc-3',
      title: 'Cross-AZ Network Instability / Transit Gateway',
      confidence: 16,
      isProbable: false,
      description: 'AWS VPC flow logs confirm zero packet drops and steady 0.4ms ping across us-east-1a and us-east-1b.',
      evidence: [
        'VPC transit gateway drop rate: 0.0001%',
        'Other services deployed in same subnet show 99.99% availability'
      ]
    }
  ],
  remediation: {
    id: 'rem-payment-rollback',
    name: 'Rollback Canary Deployment to v2.6.2',
    command: 'kubectl rollout undo deployment/payment-gateway-api --to-revision=14',
    targetService: 'payment-gateway-api.production',
    riskLevel: 'MEDIUM',
    executionType: 'HUMAN_APPROVAL',
    estimatedRecoverySecs: 25,
    rollbackStrategy: 'Automatic fallback to previous image digest sha256:8f2a1b9',
    reason: 'Critical error rate spike began 15 seconds after v2.7 deployment. Immediate revision rollback is the safest deterministic remedy.'
  },
  policyRules: [
    {
      id: 'POL-CORE-01',
      name: 'Stateless Service Rolling Restart',
      riskLevel: 'LOW',
      condition: 'service.type == "stateless" && env != "pci-core"',
      decision: 'AUTO_APPROVE',
      description: 'Safe for automated execution without human intervention.',
      matched: false
    },
    {
      id: 'POL-PROD-04',
      name: 'Production Rollback on Core Financial Service',
      riskLevel: 'MEDIUM',
      condition: 'service.tier == "tier-1" && action.type == "rollback" && env == "production"',
      decision: 'REQUIRE_APPROVAL',
      description: 'Mandatory human approval gate. AI generates action and context; human confirms authorization.',
      matched: true
    },
    {
      id: 'POL-DATA-09',
      name: 'Production Schema Alteration or Data Mutation',
      riskLevel: 'HIGH',
      condition: 'action.touches_storage == true',
      decision: 'BLOCK_AND_ESCALATE',
      description: 'Strictly prohibited from autonomous execution. Recommendation only with manual DBA handover.',
      matched: false
    }
  ],
  verificationChecks: [
    {
      id: 'v-1',
      name: 'HTTP 5xx Error Rate',
      metric: 'rate(http_requests_total{status=~"5.."}[1m])',
      target: '< 0.5%',
      currentValue: '0.04%',
      status: 'pending'
    },
    {
      id: 'v-2',
      name: 'Service Health Probes',
      metric: 'kube_pod_status_ready{service="payment-api"}',
      target: '6/6 Ready',
      currentValue: '6/6 Ready',
      status: 'pending'
    },
    {
      id: 'v-3',
      name: 'p99 End-to-End Latency',
      metric: 'histogram_quantile(0.99, payment_duration_seconds_bucket)',
      target: '< 350ms',
      currentValue: '184ms',
      status: 'pending'
    },
    {
      id: 'v-4',
      name: 'Payment Processing Success Rate',
      metric: 'sum(payment_processed_success) / sum(payment_processed_total)',
      target: '> 99.8%',
      currentValue: '99.96%',
      status: 'pending'
    }
  ],
  metricsByState: {
    IDLE: {
      errorRate: 0.04,
      errorRateDelta: 'Normal baseline',
      p99Latency: 195,
      latencyDelta: 'Normal',
      healthChecks: '6/6 Passing',
      healthChecksHealthy: true,
      cpuUtilization: 32,
      memoryUtilization: 48,
      activeAlerts: 0
    },
    INCIDENT_DETECTED: {
      errorRate: 18.2,
      errorRateDelta: '+380% spike',
      p99Latency: 2840,
      latencyDelta: '+1350ms degraded',
      healthChecks: '1/6 Passing (5 Failing)',
      healthChecksHealthy: false,
      cpuUtilization: 78,
      memoryUtilization: 64,
      activeAlerts: 17
    },
    INVESTIGATING: {
      errorRate: 18.5,
      errorRateDelta: 'Critically elevated',
      p99Latency: 2950,
      latencyDelta: '+1420ms',
      healthChecks: '0/6 Passing',
      healthChecksHealthy: false,
      cpuUtilization: 82,
      memoryUtilization: 66,
      activeAlerts: 17
    },
    ROOT_CAUSE_IDENTIFIED: {
      errorRate: 18.4,
      errorRateDelta: 'Correlated to v2.7',
      p99Latency: 2890,
      latencyDelta: '+1400ms',
      healthChecks: '0/6 Passing',
      healthChecksHealthy: false,
      cpuUtilization: 81,
      memoryUtilization: 65,
      activeAlerts: 17
    },
    POLICY_CHECK: {
      errorRate: 18.6,
      errorRateDelta: 'Medium risk policy active',
      p99Latency: 2910,
      latencyDelta: '+1410ms',
      healthChecks: '0/6 Passing',
      healthChecksHealthy: false,
      cpuUtilization: 79,
      memoryUtilization: 65,
      activeAlerts: 17
    },
    WAITING_APPROVAL: {
      errorRate: 18.5,
      errorRateDelta: 'Awaiting operator signoff',
      p99Latency: 2880,
      latencyDelta: '+1380ms',
      healthChecks: '0/6 Passing',
      healthChecksHealthy: false,
      cpuUtilization: 80,
      memoryUtilization: 66,
      activeAlerts: 17
    },
    REMEDIATING: {
      errorRate: 9.1,
      errorRateDelta: '-50% rolling back pod pods',
      p99Latency: 920,
      latencyDelta: 'Recovering...',
      healthChecks: '3/6 Passing',
      healthChecksHealthy: false,
      cpuUtilization: 54,
      memoryUtilization: 55,
      activeAlerts: 8
    },
    VERIFYING: {
      errorRate: 0.12,
      errorRateDelta: 'Within SLA (<0.5%)',
      p99Latency: 210,
      latencyDelta: 'Normalizing',
      healthChecks: '6/6 Passing',
      healthChecksHealthy: true,
      cpuUtilization: 34,
      memoryUtilization: 49,
      activeAlerts: 0
    },
    RESOLVED: {
      errorRate: 0.03,
      errorRateDelta: 'Fully stabilized',
      p99Latency: 184,
      latencyDelta: 'Optimal (184ms)',
      healthChecks: '6/6 Passing',
      healthChecksHealthy: true,
      cpuUtilization: 31,
      memoryUtilization: 47,
      activeAlerts: 0
    },
    VERIFICATION_FAILED: {
      errorRate: 14.2,
      errorRateDelta: 'Recovery verification failed',
      p99Latency: 2100,
      latencyDelta: 'Persistent degradation',
      healthChecks: '2/6 Passing',
      healthChecksHealthy: false,
      cpuUtilization: 72,
      memoryUtilization: 61,
      activeAlerts: 12
    },
    ROLLBACK: {
      errorRate: 7.5,
      errorRateDelta: 'Secondary fallback engaged',
      p99Latency: 800,
      latencyDelta: 'Fallback',
      healthChecks: '4/6 Passing',
      healthChecksHealthy: false,
      cpuUtilization: 48,
      memoryUtilization: 52,
      activeAlerts: 4
    },
    ESCALATED: {
      errorRate: 16.8,
      errorRateDelta: 'Escalated to PagerDuty Tier-3',
      p99Latency: 2400,
      latencyDelta: 'Manual intervention',
      healthChecks: '1/6 Passing',
      healthChecksHealthy: false,
      cpuUtilization: 76,
      memoryUtilization: 63,
      activeAlerts: 17
    }
  },
  logsByState: {
    IDLE: [
      { id: 'l-0', timestamp: '14:31:50', level: 'INFO', source: 'k8s-operator', message: 'Syncing ingress routing configuration for payment-gateway' },
      { id: 'l-0b', timestamp: '14:32:04', level: 'INFO', source: 'argocd', message: 'Application payment-gateway synchronized to revision 4f98a1b (v2.7)' }
    ],
    INCIDENT_DETECTED: [
      { id: 'l-1', timestamp: '14:32:15', level: 'WARN', source: 'envoy-proxy', message: 'Upstream payment-gateway:8080 returned 502 Bad Gateway (42 req/s)' },
      { id: 'l-2', timestamp: '14:32:19', level: 'ERROR', source: 'payment-api-pod-1', message: 'java.lang.NullPointerException at com.resolvia.payment.StripeConnector.buildPayload(StripeConnector.java:142)' },
      { id: 'l-3', timestamp: '14:32:21', level: 'ERROR', source: 'prometheus-alertmanager', message: 'ALERT: PaymentApiHighErrorRate [severity: critical, rate: 18.2%]' }
    ],
    INVESTIGATING: [
      { id: 'l-4', timestamp: '14:32:26', level: 'AI-AGENT', source: 'resolvia-correlator', message: 'Ingesting 17 anomalous telemetry streams. Correlating timeline against CI/CD events.' },
      { id: 'l-5', timestamp: '14:32:28', level: 'AI-AGENT', source: 'resolvia-rag', message: 'Retrieved runbook: RB-FIN-204 "Payment Gateway Rollout Anomaly". Comparing semantic vector signatures.' },
      { id: 'l-6', timestamp: '14:32:30', level: 'INFO', source: 'db-telemetry', message: 'Postgres primary connection pool is healthy (12% utilization, p95 3.8ms).' }
    ],
    ROOT_CAUSE_IDENTIFIED: [
      { id: 'l-7', timestamp: '14:32:31', level: 'AI-AGENT', source: 'resolvia-rca', message: 'HYPOTHESIS 1 [CONFIDENCE 94%]: v2.7 deployment introduced null pointer exception in Stripe payload constructor.' },
      { id: 'l-8', timestamp: '14:32:32', level: 'AI-AGENT', source: 'resolvia-rca', message: 'DISPROVED HYPOTHESIS 2: Database latency candidate discarded (confidence 38%). Database latency is within normal p95 envelope.' },
      { id: 'l-9', timestamp: '14:32:34', level: 'AI-AGENT', source: 'resolvia-rca', message: 'Candidate selected: rollback to deployment v2.6.2 (revision 14).' }
    ],
    POLICY_CHECK: [
      { id: 'l-10', timestamp: '14:32:37', level: 'POLICY', source: 'opa-policy-engine', message: 'Evaluating OPA policy bundle "enterprise-safety-v3"' },
      { id: 'l-11', timestamp: '14:32:38', level: 'POLICY', source: 'opa-policy-engine', message: 'Rule POL-PROD-04 TRIGGERED: Action modifies Tier-1 payment infrastructure in Production. Risk rating: MEDIUM.' },
      { id: 'l-12', timestamp: '14:32:39', level: 'POLICY', source: 'opa-policy-engine', message: 'Autonomous execution BLOCKED pending cryptographic human approval signature.' }
    ],
    WAITING_APPROVAL: [
      { id: 'l-13', timestamp: '14:32:40', level: 'WARN', source: 'guardrail-manager', message: 'Dispatched interactive approval card to Slack #sre-incident-bridge & ServiceNow INC-2847.' },
      { id: 'l-14', timestamp: '14:32:42', level: 'AI-AGENT', source: 'resolvia-agent', message: 'Standing by for human confirmation. Automated timeout limit: 300s before secondary escalation.' }
    ],
    REMEDIATING: [
      { id: 'l-15', timestamp: '14:32:46', level: 'INFO', source: 'audit-trail', message: 'Approval granted by operator: Sarah Chen (Principal SRE). Token signature: 0x9f18a... verified.' },
      { id: 'l-16', timestamp: '14:32:48', level: 'INFO', source: 'remediation-runner', message: 'Executing: kubectl rollout undo deployment/payment-gateway-api --to-revision=14' },
      { id: 'l-17', timestamp: '14:32:52', level: 'INFO', source: 'k8s-deployment', message: 'Terminating pods running v2.7. Provisioning verified stable replicas running v2.6.2.' }
    ],
    VERIFYING: [
      { id: 'l-18', timestamp: '14:32:58', level: 'VERIFY', source: 'resolvia-verifier', message: 'Initiating telemetry assertion cycle 1 of 3 (interval 5s).' },
      { id: 'l-19', timestamp: '14:33:00', level: 'VERIFY', source: 'resolvia-verifier', message: 'Assertion 1/4: HTTP 5xx error rate dropped to 0.08% (Threshold < 0.5% PASSED).' },
      { id: 'l-20', timestamp: '14:33:02', level: 'VERIFY', source: 'resolvia-verifier', message: 'Assertion 2/4: 6/6 pods reporting healthy HTTP 200 on /healthz probe (PASSED).' },
      { id: 'l-21', timestamp: '14:33:03', level: 'VERIFY', source: 'resolvia-verifier', message: 'Assertion 3/4: p99 latency settled to 184ms (Threshold < 350ms PASSED).' }
    ],
    RESOLVED: [
      { id: 'l-22', timestamp: '14:33:05', level: 'INFO', source: 'resolvia-verifier', message: 'All verification assertions passed with 100% confidence. System health completely normalized.' },
      { id: 'l-23', timestamp: '14:33:06', level: 'AI-AGENT', source: 'post-mortem-generator', message: 'Drafted immutable incident post-mortem: INC-2847-summary.pdf. Synced with ServiceNow and Jira.' },
      { id: 'l-24', timestamp: '14:33:07', level: 'INFO', source: 'incident-manager', message: 'Incident INC-2847 marked as CLOSED. Total autonomous remediation loop MTTR: 63 seconds.' }
    ],
    VERIFICATION_FAILED: [
      { id: 'l-f1', timestamp: '14:33:00', level: 'ERROR', source: 'resolvia-verifier', message: 'Verification assertion FAILED: HTTP 500 rate remains above 10% after 20s.' },
      { id: 'l-f2', timestamp: '14:33:02', level: 'WARN', source: 'remediation-runner', message: 'Engaging emergency rollback to safe fallback image digest.' }
    ],
    ROLLBACK: [
      { id: 'l-r1', timestamp: '14:33:05', level: 'WARN', source: 'remediation-runner', message: 'Invoking secondary rollback to base baseline image sha256:8f2a1b9.' }
    ],
    ESCALATED: [
      { id: 'l-e1', timestamp: '14:33:08', level: 'ERROR', source: 'escalation-engine', message: 'Human intervention required. Escalated to Tier-3 incident response team via high-urgency PagerDuty.' }
    ]
  },
  auditLog: {
    id: 'AUD-2026-98102',
    timestamp: '2026-09-18T14:33:05.120Z',
    operator: 'Autonomous Engine + SRE Approval (Sarah Chen)',
    action: 'Rollback payment-gateway-api from v2.7 to v2.6.2 (revision 14)',
    policyId: 'POL-PROD-04 (Medium Risk)',
    gitHash: '4f98a1b -> e82c401',
    justification: 'Error rate spike of 380% immediately post-canary rollout due to null pointer in Stripe connector',
    verificationResult: '4/4 checks passed: Error rate 0.03%, p99 184ms, pods 6/6 ready',
    signature: 'ecdsa-sha256-verified-0x74a981c2f901b7e4d89a23c'
  }
};

export const SCENARIO_LOW_CONFIDENCE_DB: IncidentScenario = {
  id: 'database-latency-anomaly',
  title: 'Database Query Latency Anomaly',
  severity: 'SEV-2',
  service: 'order-processing-db',
  environment: 'production-us-east-1',
  incidentId: 'INC-2850',
  summary: 'Intermittent query spikes observed on order-processing-db with conflicting telemetry and low AI diagnostic confidence (51%).',
  confidence: 51,
  isLowConfidenceDemo: true,
  timeline: [
    {
      id: 'db-1',
      timestamp: '11:05:12',
      stepIndex: 0,
      title: 'Database query latency threshold warning',
      description: 'p99 query latency elevated to 940ms on read replicas. No recent code or schema deployments detected.',
      stateTarget: 'IDLE',
      category: 'telemetry',
      badge: 'Latency Alert'
    },
    {
      id: 'db-2',
      timestamp: '11:05:22',
      stepIndex: 1,
      title: 'Alert triggered on order-processing-db',
      description: 'Prometheus alert: DbReplicaLatencyHigh. 5 downstream services reporting elevated queue times.',
      stateTarget: 'INCIDENT_DETECTED',
      category: 'alert',
      badge: 'SEV-2 Alert'
    },
    {
      id: 'db-3',
      timestamp: '11:05:30',
      stepIndex: 2,
      title: 'AI correlation engine aggregates telemetry',
      description: 'Correlating slow query logs, pg_stat_activity, and AWS RDS cloudwatch metrics.',
      stateTarget: 'INVESTIGATING',
      category: 'ai',
      badge: 'Signal Graph'
    },
    {
      id: 'db-4',
      timestamp: '11:05:38',
      stepIndex: 3,
      title: 'Low AI confidence score (51%)',
      description: 'Hypotheses divided: 51% Lock contention on order_items table vs 43% AWS EBS burst balance exhaustion.',
      stateTarget: 'ROOT_CAUSE_IDENTIFIED',
      category: 'ai',
      badge: 'Confidence 51%'
    },
    {
      id: 'db-5',
      timestamp: '11:05:44',
      stepIndex: 4,
      title: 'Guardrail check: Below 80% confidence threshold',
      description: 'Safety Policy POL-SAFETY-01 enforces: "Autonomous actions prohibited when diagnostic confidence < 80%".',
      stateTarget: 'POLICY_CHECK',
      category: 'policy',
      badge: 'Guardrail Enforced'
    },
    {
      id: 'db-6',
      timestamp: '11:05:50',
      stepIndex: 5,
      title: 'Autonomous execution blocked & escalated',
      description: 'System refuses to execute unverified database restarts. Escalates with structured diagnostic dossier to Database Administrator.',
      stateTarget: 'ESCALATED',
      category: 'escalation',
      badge: 'Responsible AI'
    }
  ],
  rootCauses: [
    {
      id: 'rc-db-1',
      title: 'Row Lock Contention on orders_v2 Table',
      confidence: 51,
      isProbable: false,
      description: 'High number of transactions in state "idle in transaction", but lock graphs are inconclusive without deeper profiling.',
      evidence: [
        'pg_stat_activity shows 8 long-running queries (> 15s)',
        'No schema changes in last 72 hours',
        'Telemetry is ambiguous: could be caused by bad batch job or external API backpressure'
      ]
    },
    {
      id: 'rc-db-2',
      title: 'AWS EBS gp3 Volume IOPS Throttling',
      confidence: 43,
      isProbable: false,
      description: 'Burst balance metric indicates possible storage throttling, but RDS telemetry has 2-minute reporting delay.',
      evidence: [
        'Storage read IOPS spiked to 4,200',
        'Could resolve spontaneously once batch job completes'
      ]
    }
  ],
  remediation: {
    id: 'rem-db-escalate',
    name: 'Escalate to On-Call DBA with Profiling Dump',
    command: 'resolvia-cli escalate --target=dba-oncall --dossier=INC-2850.json',
    targetService: 'order-processing-db.production',
    riskLevel: 'HIGH',
    executionType: 'RECOMMENDATION_ONLY',
    estimatedRecoverySecs: 180,
    rollbackStrategy: 'N/A (Read-only escalation)',
    reason: 'Confidence is 51%, below the mandatory 80% autonomy threshold. Autonomous execution is strictly forbidden by policy.'
  },
  policyRules: [
    {
      id: 'POL-SAFETY-01',
      name: 'Minimum AI Confidence Gate for Action',
      riskLevel: 'HIGH',
      condition: 'ai.confidence < 80',
      decision: 'BLOCK_AND_ESCALATE',
      description: 'Strict guardrail against hallucinated or under-evidenced remediation actions.',
      matched: true
    }
  ],
  verificationChecks: [],
  metricsByState: {
    IDLE: {
      errorRate: 0.02,
      errorRateDelta: 'Normal',
      p99Latency: 140,
      latencyDelta: 'Normal',
      healthChecks: '4/4 Passing',
      healthChecksHealthy: true,
      cpuUtilization: 42,
      memoryUtilization: 52,
      activeAlerts: 0
    },
    INCIDENT_DETECTED: {
      errorRate: 3.4,
      errorRateDelta: 'Elevated query latency',
      p99Latency: 940,
      latencyDelta: '+800ms query lag',
      healthChecks: '3/4 Passing',
      healthChecksHealthy: false,
      cpuUtilization: 71,
      memoryUtilization: 68,
      activeAlerts: 5
    },
    INVESTIGATING: {
      errorRate: 3.8,
      errorRateDelta: 'Collecting DB traces',
      p99Latency: 1100,
      latencyDelta: '+960ms',
      healthChecks: '3/4 Passing',
      healthChecksHealthy: false,
      cpuUtilization: 74,
      memoryUtilization: 70,
      activeAlerts: 5
    },
    ROOT_CAUSE_IDENTIFIED: {
      errorRate: 4.1,
      errorRateDelta: 'Ambiguous telemetry',
      p99Latency: 1150,
      latencyDelta: '+1010ms',
      healthChecks: '3/4 Passing',
      healthChecksHealthy: false,
      cpuUtilization: 75,
      memoryUtilization: 71,
      activeAlerts: 5
    },
    POLICY_CHECK: {
      errorRate: 4.0,
      errorRateDelta: 'Confidence (51%) < 80%',
      p99Latency: 1120,
      latencyDelta: 'Guardrail triggered',
      healthChecks: '3/4 Passing',
      healthChecksHealthy: false,
      cpuUtilization: 73,
      memoryUtilization: 70,
      activeAlerts: 5
    },
    WAITING_APPROVAL: {
      errorRate: 4.0,
      errorRateDelta: 'Blocked',
      p99Latency: 1120,
      latencyDelta: 'Blocked',
      healthChecks: '3/4 Passing',
      healthChecksHealthy: false,
      cpuUtilization: 73,
      memoryUtilization: 70,
      activeAlerts: 5
    },
    REMEDIATING: {
      errorRate: 4.0,
      errorRateDelta: 'N/A',
      p99Latency: 1120,
      latencyDelta: 'N/A',
      healthChecks: '3/4 Passing',
      healthChecksHealthy: false,
      cpuUtilization: 73,
      memoryUtilization: 70,
      activeAlerts: 5
    },
    VERIFYING: {
      errorRate: 4.0,
      errorRateDelta: 'N/A',
      p99Latency: 1120,
      latencyDelta: 'N/A',
      healthChecks: '3/4 Passing',
      healthChecksHealthy: false,
      cpuUtilization: 73,
      memoryUtilization: 70,
      activeAlerts: 5
    },
    RESOLVED: {
      errorRate: 0.02,
      errorRateDelta: 'Resolved by DBA',
      p99Latency: 140,
      latencyDelta: 'Stabilized',
      healthChecks: '4/4 Passing',
      healthChecksHealthy: true,
      cpuUtilization: 40,
      memoryUtilization: 50,
      activeAlerts: 0
    },
    VERIFICATION_FAILED: {
      errorRate: 4.0,
      errorRateDelta: 'Failed',
      p99Latency: 1120,
      latencyDelta: 'Failed',
      healthChecks: '3/4 Passing',
      healthChecksHealthy: false,
      cpuUtilization: 73,
      memoryUtilization: 70,
      activeAlerts: 5
    },
    ROLLBACK: {
      errorRate: 4.0,
      errorRateDelta: 'N/A',
      p99Latency: 1120,
      latencyDelta: 'N/A',
      healthChecks: '3/4 Passing',
      healthChecksHealthy: false,
      cpuUtilization: 73,
      memoryUtilization: 70,
      activeAlerts: 5
    },
    ESCALATED: {
      errorRate: 4.2,
      errorRateDelta: 'Safely handed over to human DBA',
      p99Latency: 1180,
      latencyDelta: 'Dossier generated',
      healthChecks: '3/4 Passing',
      healthChecksHealthy: false,
      cpuUtilization: 76,
      memoryUtilization: 72,
      activeAlerts: 5
    }
  },
  logsByState: {
    IDLE: [
      { id: 'db-l0', timestamp: '11:05:00', level: 'INFO', source: 'pg_stat_monitor', message: 'Routine query statistics aggregation complete.' }
    ],
    INCIDENT_DETECTED: [
      { id: 'db-l1', timestamp: '11:05:22', level: 'WARN', source: 'rds-cloudwatch', message: 'ReadLatency exceeded 800ms threshold on db-replica-02.' },
      { id: 'db-l2', timestamp: '11:05:24', level: 'ERROR', source: 'order-service', message: 'QueryTimeoutException: connection timed out waiting for pooled connection (3000ms).' }
    ],
    INVESTIGATING: [
      { id: 'db-l3', timestamp: '11:05:30', level: 'AI-AGENT', source: 'resolvia-investigator', message: 'Querying execution plans for top 5 consuming queries.' },
      { id: 'db-l4', timestamp: '11:05:33', level: 'AI-AGENT', source: 'resolvia-investigator', message: 'Lock table inspection shows multiple conflicting intent locks on orders_v2.' }
    ],
    ROOT_CAUSE_IDENTIFIED: [
      { id: 'db-l5', timestamp: '11:05:38', level: 'AI-AGENT', source: 'resolvia-rca', message: 'Confidence calculation complete: Model cannot determine root cause with high confidence (Confidence: 51%).' },
      { id: 'db-l6', timestamp: '11:05:40', level: 'WARN', source: 'resolvia-rca', message: 'Ambiguity between application transaction leak and disk volume IOPS exhaustion.' }
    ],
    POLICY_CHECK: [
      { id: 'db-l7', timestamp: '11:05:44', level: 'POLICY', source: 'opa-policy-engine', message: 'Evaluating Rule POL-SAFETY-01: ai.confidence (51%) < threshold (80%).' },
      { id: 'db-l8', timestamp: '11:05:46', level: 'POLICY', source: 'opa-policy-engine', message: 'Autonomous execution DENIED. Mandatory rule: "Refuse autonomous action on sub-threshold confidence".' }
    ],
    WAITING_APPROVAL: [],
    REMEDIATING: [],
    VERIFYING: [],
    RESOLVED: [],
    VERIFICATION_FAILED: [],
    ROLLBACK: [],
    ESCALATED: [
      { id: 'db-l9', timestamp: '11:05:50', level: 'AI-AGENT', source: 'escalation-engine', message: 'Generated diagnostic dossier: query traces, lock graph, and connection pool metrics attached.' },
      { id: 'db-l10', timestamp: '11:05:52', level: 'INFO', source: 'pagerduty-integration', message: 'Dispatched SEV-2 page to on-call DBA team with root cause hypotheses and collected evidence.' },
      { id: 'db-l11', timestamp: '11:05:53', level: 'POLICY', source: 'guardrail-manager', message: 'Safety guarantee upheld: Zero unverified mutations applied to production database.' }
    ]
  },
  auditLog: {
    id: 'AUD-2026-98105',
    timestamp: '2026-09-18T11:05:53.000Z',
    operator: 'Autonomous Engine (Safety Policy Gate)',
    action: 'Escalation to Human DBA (Autonomous Action Blocked)',
    policyId: 'POL-SAFETY-01 (Confidence Threshold Guardrail)',
    justification: 'AI confidence score (51%) is below the autonomous execution safety threshold (80%).',
    verificationResult: 'Guardrail enforced: Production database protected from unverified remediation.',
    signature: 'ecdsa-sha256-verified-0x289f01c88d741a'
  }
};

export const SCENARIOS: IncidentScenario[] = [
  SCENARIO_PAYMENT_FAILURE,
  SCENARIO_LOW_CONFIDENCE_DB
];

export const INCIDENT_CATALOG = [
  {
    id: 'cpu-saturation',
    title: 'CPU Saturation & Thread Starvation',
    scenarioId: 'payment-api-failure',
    trigger: 'CPU usage > 92% across worker nodes for > 2m',
    diagnosis: 'Unindexed query loop in invoice aggregation background worker',
    recommendedAction: 'Scale replica count from 4 to 10 + throttle batch consumer queue',
    riskLevel: 'LOW',
    execution: 'Autonomous Execution',
    verificationMethod: 'CPU average drops < 55% within 90s, queue latency normalizes'
  },
  {
    id: 'failed-deployment',
    title: 'Failed Canary Deployment (v2.7)',
    scenarioId: 'payment-api-failure',
    trigger: '380% error rate spike within 30s of new pod rollout',
    diagnosis: 'Null pointer exception in Stripe connector serialization logic',
    recommendedAction: 'Rollback canary deployment to stable revision v2.6.2',
    riskLevel: 'MEDIUM',
    execution: 'Human Approval Required',
    verificationMethod: 'Error rate drops < 0.5%, 6/6 pods pass healthz checks'
  },
  {
    id: 'service-crash',
    title: 'OOMKilled Pod CrashLoopBackOff',
    scenarioId: 'payment-api-failure',
    trigger: 'Container restart count > 5 within 3 minutes on gateway pods',
    diagnosis: 'JVM heap exhaustion under unexpected JSON payload surge',
    recommendedAction: 'Hot-patch container memory limit 2Gi -> 4Gi and rolling restart',
    riskLevel: 'LOW',
    execution: 'Autonomous Execution',
    verificationMethod: '0 pod restarts in 180s, JVM GC pause times settle < 15ms'
  },
  {
    id: 'memory-pressure',
    title: 'Redis Cache Eviction Pressure',
    scenarioId: 'database-latency-anomaly',
    trigger: 'Redis used_memory > 95% with eviction rate > 4,000 keys/sec',
    diagnosis: 'Session token TTL configuration omitted in new auth flow',
    recommendedAction: 'Apply volatile-lru eviction policy & prune orphaned auth sessions',
    riskLevel: 'MEDIUM',
    execution: 'Human Approval Required',
    verificationMethod: 'Memory buffer stabilizes at 72%, cache hit ratio > 96%'
  },
  {
    id: 'elevated-error-rate',
    title: 'Elevated Downstream API Error Rate',
    scenarioId: 'database-latency-anomaly',
    trigger: 'Third-party webhook endpoint returning HTTP 504 Gateway Timeout',
    diagnosis: 'Payment partner degradation with cascading thread pool exhaustion',
    recommendedAction: 'Engage circuit breaker and route transactions to secondary gateway',
    riskLevel: 'LOW',
    execution: 'Autonomous Execution',
    verificationMethod: 'Outbound request latency normalizes, circuit breaker half-opens'
  }
];
