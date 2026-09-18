import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Info
} from 'lucide-react';

interface ArchNode {
  id: string;
  label: string;
  role: string;
  technologies: string[];
  description: string;
  category: 'ingestion' | 'intelligence' | 'governance' | 'execution' | 'integration';
}

export const ArchitectureDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('ai-agent');

  const nodes: ArchNode[] = [
    {
      id: 'telemetry-sources',
      label: 'Telemetry Sources',
      role: 'Metrics, Logs & Distributed Traces',
      technologies: ['Prometheus', 'OpenTelemetry', 'FluentBit', 'Grafana Loki'],
      description: 'Collects high-frequency metrics, container logs, kernel events, and eBPF network flows across distributed Kubernetes clusters.',
      category: 'ingestion'
    },
    {
      id: 'correlation-engine',
      label: 'Graph Correlation Engine',
      role: 'Alert Clustering & Topology Mapping',
      technologies: ['FastAPI', 'Redis Streams', 'NetworkX'],
      description: 'Collapses cascading alert storms into a single unified incident topology graph. Maps upstream caller dependencies to downstream database nodes.',
      category: 'ingestion'
    },
    {
      id: 'ai-agent',
      label: 'AI Investigation Agent',
      role: 'Multi-Hypothesis Diagnostics',
      technologies: ['LLM Reasoning Engine', 'LangChain', 'Python SRE Tools'],
      description: 'Formulates competing hypotheses for observed anomalies. Queries log patterns, git commit history, and runtime stack traces without executing mutations.',
      category: 'intelligence'
    },
    {
      id: 'rag-vector-db',
      label: 'Knowledge & RAG Layer',
      role: 'Runbook Vector Search & Post-Mortems',
      technologies: ['pgvector', 'PostgreSQL', 'OpenAI Embeddings'],
      description: 'Semantic vector repository indexing historical incident resolutions, approved operational runbooks, architecture diagrams, and service SLA policies.',
      category: 'intelligence'
    },
    {
      id: 'policy-risk-engine',
      label: 'Policy & Risk Gate',
      role: 'Deterministic OPA Guardrail',
      technologies: ['Open Policy Agent (OPA)', 'Rego', 'Cryptographic Signatures'],
      description: 'Enforces hardcoded enterprise safety policies. Evaluates production blast radius, service tier, and data mutation risk before permitting remediation.',
      category: 'governance'
    },
    {
      id: 'approval-bus',
      label: 'Human Approval & Notifier',
      role: 'Interactive ChatOps Bridge',
      technologies: ['Slack Webhooks', 'Microsoft Teams', 'ServiceNow Incident API'],
      description: 'Dispatches high-context approval cards with git diffs and telemetry evidence to on-call engineers. Awaits cryptographically authenticated authorization.',
      category: 'integration'
    },
    {
      id: 'remediation-engine',
      label: 'Remediation Runner',
      role: 'Safe Orchestration Engine',
      technologies: ['Kubernetes Operator', 'Helm', 'ArgoCD GitOps', 'Docker'],
      description: 'Executes validated operational actions (rollbacks, pod restarts, circuit breaker toggles) with automatic pre-computed rollback fallback plans.',
      category: 'execution'
    },
    {
      id: 'verification-engine',
      label: 'Closed-Loop Verifier',
      role: 'Telemetry Assertion Engine',
      technologies: ['PromQL', 'gRPC Health Probes', 'Statistical Anomaly Filter'],
      description: 'Continuously asserts post-remediation system recovery across error rates, p99 latencies, and health probes. Automatically triggers rollback if signals fail.',
      category: 'execution'
    },
    {
      id: 'audit-ledger',
      label: 'Immutable Audit Trail',
      role: 'Cryptographic Event Recording',
      technologies: ['SHA-256 Signatures', 'PostgreSQL Audit Ledger', 'Jira Sync'],
      description: 'Logs every diagnostic signal, prompt trace, policy evaluation, human operator confirmation, command execution, and post-mortem summary.',
      category: 'governance'
    }
  ];

  const activeNode = nodes.find(n => n.id === selectedNode) || nodes[2];

  return (
    <section id="architecture" className="py-20 border-b border-amber-500/15 relative scroll-mt-16 bg-[#040405] overflow-hidden">
      


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-3">
            <span className="uppercase tracking-widest text-[11px] font-bold">Enterprise System Blueprint</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Technical <span className="bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-500 bg-clip-text text-transparent text-glow-gold">System Architecture</span>
          </h2>
          <p className="mt-3.5 text-[#C9C4B7] text-sm sm:text-base font-display font-medium leading-relaxed">
            Engineered for enterprise scale with strict separation between probabilistic AI reasoning 
            and deterministic operational guardrails. Click any node to inspect technology details.
          </p>
        </div>

        {/* Interactive Architecture Visual Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Flow Grid (8 cols) */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-[#090806] border border-amber-500/25 space-y-6 shadow-command-center">
            
            {/* Stage 1: Ingestion & Correlation */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-amber-200/60 mb-3">
                <span className="uppercase tracking-wider font-semibold">1. Telemetry Ingestion & Correlation</span>
                <span className="text-amber-300 font-mono">Real-Time Streams</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {nodes.slice(0, 2).map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedNode === node.id
                        ? 'bg-amber-950/40 border-amber-400 shadow-glow-primary'
                        : 'bg-[#100F0C] border-white/5 hover:border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-semibold text-amber-300">{node.role}</span>
                      <Activity className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-sm font-bold text-white mb-2">{node.label}</div>
                    <div className="flex flex-wrap gap-1">
                      {node.technologies.slice(0, 3).map((t, i) => (
                        <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#16140E] text-amber-200/50 border border-amber-500/15">
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="flex justify-center -my-2 text-amber-500/40 font-mono text-xs">
              ↓ Telemetry Topology Graph
            </div>

            {/* Stage 2: AI Investigation & RAG Layer */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-amber-200/60 mb-3">
                <span className="uppercase tracking-wider font-semibold">2. Cognitive Diagnostics & RAG Knowledge</span>
                <span className="text-yellow-400 font-mono">Probabilistic Reasoning</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {nodes.slice(2, 4).map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedNode === node.id
                        ? 'bg-amber-950/40 border-amber-400 shadow-glow-primary'
                        : 'bg-[#100F0C] border-white/5 hover:border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-semibold text-yellow-300">{node.role}</span>
                      <Search className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div className="text-sm font-bold text-white mb-2">{node.label}</div>
                    <div className="flex flex-wrap gap-1">
                      {node.technologies.slice(0, 3).map((t, i) => (
                        <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#16140E] text-amber-200/50 border border-amber-500/15">
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="flex justify-center -my-2 text-amber-500/40 font-mono text-xs">
              ↓ Action Proposal & Causal Confidence
            </div>

            {/* Stage 3: Policy Gate & Human Approval */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-amber-200/60 mb-3">
                <span className="uppercase tracking-wider font-semibold">3. Deterministic Governance & Human Gate</span>
                <span className="text-amber-400 font-mono">Zero Hallucinations Allowed</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {nodes.slice(4, 6).map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedNode === node.id
                        ? 'bg-amber-950/40 border-amber-400 shadow-glow-warning'
                        : 'bg-[#100F0C] border-white/5 hover:border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-semibold text-amber-300">{node.role}</span>
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-sm font-bold text-white mb-2">{node.label}</div>
                    <div className="flex flex-wrap gap-1">
                      {node.technologies.slice(0, 3).map((t, i) => (
                        <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#16140E] text-amber-200/50 border border-amber-500/15">
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="flex justify-center -my-2 text-amber-500/40 font-mono text-xs">
              ↓ Authorized Remediation Execution
            </div>

            {/* Stage 4: Execution, Verification & Audit */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-amber-200/60 mb-3">
                <span className="uppercase tracking-wider font-semibold">4. Remediation, Closed-Loop Verification & Audit</span>
                <span className="text-emerald-400 font-mono">Recovery Assertion</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {nodes.slice(6, 9).map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedNode === node.id
                        ? 'bg-emerald-950/40 border-emerald-500 shadow-glow-safe'
                        : 'bg-[#100F0C] border-white/5 hover:border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-semibold text-emerald-300 truncate">{node.role}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>
                    <div className="text-sm font-bold text-white mb-2">{node.label}</div>
                    <div className="flex flex-wrap gap-1">
                      {node.technologies.slice(0, 2).map((t, i) => (
                        <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#16140E] text-amber-200/50 border border-amber-500/15">
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Node Detail Inspector Drawer (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0D0C09] border border-amber-500/25 sticky top-24 space-y-4 shadow-command-center">
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/15">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                Component Inspector
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#16140E] text-amber-300 border border-amber-500/25 uppercase font-bold">
                {activeNode.category}
              </span>
            </div>

            <div>
              <h3 className="font-syne text-xl font-bold text-white tracking-tight">
                {activeNode.label}
              </h3>
              <p className="text-xs font-mono text-amber-200/60 mt-0.5">
                {activeNode.role}
              </p>
            </div>

            <p className="text-xs text-[#C9C4B7] leading-relaxed">
              {activeNode.description}
            </p>

            {/* Technologies Badges */}
            <div className="space-y-2 pt-2 border-t border-amber-500/10">
              <span className="text-[11px] font-mono uppercase text-amber-200/60 block font-semibold">
                Core Technologies & Integrations
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeNode.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-md text-xs font-mono bg-[#14120D] border border-amber-500/20 text-[#EFEBE4]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Enterprise Compatibility Note */}
            <div className="p-3 rounded-xl bg-[#100F0C] border border-amber-500/15 text-[11px] text-[#A8A295] space-y-1">
              <strong className="text-amber-200 block">Vendor Neutrality:</strong>
              Compatible with your existing Prometheus, Datadog, ServiceNow, and Kubernetes investments without vendor lock-in.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
