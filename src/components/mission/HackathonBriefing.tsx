import React from 'react';
import { 
  CheckCircle2, 
  Target, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Network, 
  GitBranch, 
  FileText, 
  Lock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const HackathonBriefing: React.FC = () => {
  const { startSimulation, goToStep, toggleEvaluatorModal } = useSimulator();

  const deliverables = [
    {
      id: 'd1',
      title: 'Correlate Heterogeneous Alerts',
      solution: 'Groups 17 alerts across Envoy, Postgres, and K8s into 1 unified root graph.',
      status: 'Fully Implemented',
      stepTarget: 2
    },
    {
      id: 'd2',
      title: 'Identify Probable Root Causes',
      solution: 'Multi-hypothesis AI reasoning with git diff and commit correlation (94% confidence).',
      status: 'Fully Implemented',
      stepTarget: 3
    },
    {
      id: 'd3',
      title: 'Prioritize by Business Impact',
      solution: 'Automated SEV-1 vs SEV-2 triage with real-time payment revenue loss estimation.',
      status: 'Fully Implemented',
      stepTarget: 1
    },
    {
      id: 'd4',
      title: 'Recommend Remediation Actions',
      solution: 'Synthesizes targeted rollback command with pre-computed recovery metrics.',
      status: 'Fully Implemented',
      stepTarget: 4
    },
    {
      id: 'd5',
      title: 'Support Autonomous Execution',
      solution: 'Executes Low Risk operations (stateless restarts, cache flushes) zero-touch.',
      status: 'Fully Implemented',
      stepTarget: 5
    },
    {
      id: 'd6',
      title: 'Human-in-the-Loop Governance',
      solution: 'Mandatory cryptographic approval gate for Medium Risk production rollbacks.',
      status: 'Fully Implemented',
      stepTarget: 5
    },
    {
      id: 'd7',
      title: 'Closed-Loop Verification & Audit',
      solution: 'Asserts error rates, latency SLA, and pod health; writes SHA-256 audit ledger.',
      status: 'Fully Implemented',
      stepTarget: 7
    }
  ];

  return (
    <section id="mission" className="py-12 border-b border-amber-500/15 relative scroll-mt-16 bg-[#040405] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Official Track Header Card - Frosted Glassmorphic Panel with Embedded Cybernetic AI Core */}
        <div className="rounded-3xl border border-amber-500/35 bg-[#060605] p-6 sm:p-8 shadow-command-center relative overflow-hidden">
          


          {/* Subtle Neon Green & Gold Accent Lighting */}
          <div className="absolute -top-10 right-10 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />

          {/* Relative Container for Card Contents */}
          <div className="relative z-10">
          
          {/* Top Track Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-amber-500/20">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-mono text-sm font-extrabold shadow-glow-primary shrink-0">
                AI-01
              </span>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Autonomous Enterprise Incident Resolution Engine
                </h3>
                <span className="text-xs font-mono text-amber-300/80 font-medium tracking-wide uppercase">
                  Official Problem Statement & Solution Mapping
                </span>
              </div>
            </div>

            <button
              onClick={toggleEvaluatorModal}
              className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#14120D] hover:bg-[#1E1B13] text-amber-300 border border-amber-500/30 transition-all flex items-center gap-2 shadow-sm shrink-0"
            >
              <span>Evaluator Assessment Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Problem Statement 3-Card Summary */}
          <div className="py-6 space-y-4">
            <div className="text-xs sm:text-sm font-tech font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              <span>Core Problem & Mission Objective</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-xl bg-[#0D0C09]/75 backdrop-blur-md border border-amber-500/20 space-y-1.5 shadow-sm">
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
                  1. The Pain Point
                </span>
                <p className="text-xs text-[#D5D0C5] leading-relaxed">
                  Heterogeneous alerts flood in from applications, DBs, and K8s—masking the true root cause under cognitive toil.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0D0C09]/75 backdrop-blur-md border border-amber-500/25 space-y-1.5 shadow-sm">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold block">
                  2. Key Challenge
                </span>
                <p className="text-xs text-[#D5D0C5] leading-relaxed">
                  Go beyond just displaying alerts: build an AI system that <strong className="text-white">decides and acts safely</strong> rather than just summarizing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0D0C09]/75 backdrop-blur-md border border-emerald-500/25 space-y-1.5 shadow-sm">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                  3. The Autonomous Loop
                </span>
                <p className="text-xs text-amber-200/90 leading-relaxed font-mono">
                  Detect → Correlate → Investigate → Policy Gate → Remediate → Verify.
                </p>
              </div>
            </div>
          </div>

          {/* 7 Required Solutions Grid */}
          <div className="pt-6 border-t border-amber-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-unbounded font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                The Solution Must Demonstrate (7/7 Implemented):
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Deliverable Coverage
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {deliverables.map((item) => (
                <div 
                  key={item.id}
                  className={`p-3.5 rounded-xl bg-[#0C0B08]/90 border border-amber-500/15 hover:border-amber-400/40 transition-all flex flex-col justify-between group ${item.id === 'd7' ? 'md:col-span-2' : ''}`}
                >
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-start gap-1.5">
                        <span className="text-amber-400 font-mono font-bold shrink-0">•</span>
                        <span>{item.title}</span>
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 shrink-0">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A8A295] pl-3 leading-relaxed">
                      {item.solution}
                    </p>
                  </div>

                  <div className="pt-2 pl-3 mt-1.5 border-t border-amber-500/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-500/60">
                      Evaluated in Step {item.stepTarget}
                    </span>
                    <button
                      onClick={() => {
                        goToStep(item.stepTarget);
                        const el = document.getElementById('simulator');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-[10px] font-mono text-amber-300 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>Jump to Simulator</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Callout */}
          <div className="mt-6 pt-5 border-t border-amber-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#D5D0C5]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Resolvia goes beyond LLM text chat: It executes, verifies, and audits real SRE decisions.</span>
            </div>
            <a
              href="#simulator"
              onClick={startSimulation}
              className="px-5 py-2.5 rounded-xl font-bold text-black bg-gradient-to-r from-[#F5D061] via-[#D4AF37] to-[#AA820A] hover:from-[#FFF1C5] hover:to-[#D4AF37] shadow-glow-primary transition-all shrink-0"
            >
              Verify in Live Simulator
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};
