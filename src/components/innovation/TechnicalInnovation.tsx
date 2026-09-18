import React from 'react';
import { 
  Bot, 
  Database, 
  GitBranch, 
  Network, 
  ShieldCheck, 
  Scale, 
  Play, 
  Activity, 
  RotateCcw, 
  FileText,
  CheckCircle2
} from 'lucide-react';

export const TechnicalInnovation: React.FC = () => {
  const innovations = [
    {
      title: 'AI Investigation Agent',
      icon: Bot,
      color: 'text-yellow-400',
      role: 'Triangulates anomaly traces and scores competing causal hypotheses.'
    },
    {
      title: 'Vector RAG Knowledge',
      icon: Database,
      color: 'text-amber-300',
      role: 'Indexes verified historical post-mortems and approved SRE runbooks.'
    },
    {
      title: 'Root Cause Analysis',
      icon: GitBranch,
      color: 'text-amber-400',
      role: 'Correlates git commit diffs and canary traffic splits against telemetry.'
    },
    {
      title: 'Event Correlation',
      icon: Network,
      color: 'text-yellow-300',
      role: 'Clusters cascading multi-service alert storms into 1 root incident graph.'
    },
    {
      title: 'Deterministic Policy',
      icon: ShieldCheck,
      color: 'text-amber-400',
      role: 'Enforces hard OPA blast-radius rules before any mutation is permitted.'
    },
    {
      title: '3-Tier Risk Hierarchy',
      icon: Scale,
      color: 'text-emerald-400',
      role: 'Categorizes actions into zero-touch, human approval, or escalation.'
    },
    {
      title: 'Runbook Automation',
      icon: Play,
      color: 'text-amber-300',
      role: 'Orchestrates safe, reproducible Kubernetes and Cloud API workflows.'
    },
    {
      title: 'Closed-Loop Verification',
      icon: Activity,
      color: 'text-emerald-400',
      role: 'Asserts p99 latency and error recovery before marking incidents resolved.'
    },
    {
      title: 'Automated Rollback',
      icon: RotateCcw,
      color: 'text-rose-400',
      role: 'Pre-computes fallback baselines if recovery assertions fail.'
    },
    {
      title: 'Cryptographic Audit',
      icon: FileText,
      color: 'text-amber-300',
      role: 'Logs tamper-resistant SHA-256 signatures for every action and prompt.'
    }
  ];

  const stackCategories = [
    {
      name: 'Frontend & Command Center',
      items: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide Icons']
    },
    {
      name: 'Backend & Orchestration',
      items: ['FastAPI (Python)', 'Redis Streams', 'Kubernetes Operator', 'Docker']
    },
    {
      name: 'AI & Knowledge RAG',
      items: ['LLM Reasoning Models', 'pgvector', 'OpenAI Embeddings', 'LangChain']
    },
    {
      name: 'Observability & Telemetry',
      items: ['OpenTelemetry (OTel)', 'Prometheus', 'Grafana Loki', 'eBPF Probes']
    },
    {
      name: 'Policy & Enterprise APIs',
      items: ['Open Policy Agent (OPA)', 'ServiceNow API', 'Slack/Teams Webhooks', 'GitHub GitOps']
    }
  ];

  return (
    <section className="py-20 border-b border-amber-500/15 relative overflow-hidden">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header: Innovation */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-3">
            <span className="uppercase tracking-widest text-[11px] font-bold">Core Technical Pillars</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            10 Pillars of <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent text-glow-gold">Autonomous SRE</span>
          </h2>
          <p className="mt-3.5 text-[#C9C4B7] text-sm sm:text-base font-display font-medium leading-relaxed">
            Each component operates as an isolated, verifiable micro-service designed to eliminate 
            single points of failure in mission-critical operations.
          </p>
        </div>

        {/* 10 Innovation Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
          {innovations.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#090806] border border-amber-500/20 hover:border-amber-400/50 transition-all hover:-translate-y-0.5 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-xl bg-[#14120D] border border-amber-500/25 ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] text-amber-500/50 font-bold">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-sm font-bold text-white mb-1.5 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#A8A295] leading-relaxed">
                    {item.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Stack Breakdown */}
        <div className="rounded-3xl border border-amber-500/25 bg-[#080705] p-6 sm:p-10 shadow-command-center">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-6 border-b border-amber-500/15">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                Production-Grade Engineering
              </span>
              <h3 className="font-unbounded text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                Enterprise Technology Stack
              </h3>
            </div>
            <span className="text-xs font-mono text-amber-200/50">
              Only battle-tested enterprise components
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {stackCategories.map((cat) => (
              <div key={cat.name} className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-200/90">
                  {cat.name}
                </h4>
                <div className="space-y-2">
                  {cat.items.map((tech) => (
                    <div
                      key={tech}
                      className="p-2.5 rounded-lg bg-[#11100C] border border-amber-500/15 text-xs font-mono text-[#D5D0C5] flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
