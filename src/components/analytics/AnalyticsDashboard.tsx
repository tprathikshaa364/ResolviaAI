import React from 'react';
import { 
  BarChart3, 
  Clock, 
  Activity,
  Info
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  return (
    <section id="analytics" className="py-20 border-b border-amber-500/15 relative scroll-mt-16 overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-3 backdrop-blur-md">
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="uppercase tracking-widest text-[11px] font-bold">Operational Intelligence</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Incident Analytics & <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500 bg-clip-text text-transparent text-glow-gold">MTTR Benchmarks</span>
            </h2>
            <p className="mt-2.5 text-[#C9C4B7] text-sm sm:text-base max-w-2xl font-sans">
              Telemetry aggregated across simulated enterprise environments. 
              Observe how autonomous verification shrinks mean time to recovery (MTTR) while maintaining strict human governance.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-[#0F0E0B]/85 backdrop-blur-md border border-amber-500/20 text-xs font-mono text-amber-200/60 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400" />
            <span>Dataset: <strong className="text-amber-300">Prototype Simulation Telemetry</strong></span>
          </div>
        </div>

        {/* 6 Top Metric Cards with Frosted Glass */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          
          <div className="p-4 rounded-xl bg-[#0A0907]/80 backdrop-blur-md border border-amber-500/20 hover:border-amber-500/40 transition-colors">
            <span className="text-xs font-mono text-amber-200/50 block mb-1">Total Incidents</span>
            <div className="text-2xl font-mono font-bold text-white">1,248</div>
            <span className="text-[10px] font-mono text-amber-200/40 mt-1 block">Simulated runs</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0907]/80 backdrop-blur-md border border-emerald-500/30 hover:border-emerald-500/50 transition-colors">
            <span className="text-xs font-mono text-amber-200/50 block mb-1">Autonomous Fix</span>
            <div className="text-2xl font-mono font-bold text-emerald-400">74%</div>
            <span className="text-[10px] font-mono text-emerald-400/80 mt-1 block">924 zero-touch</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0907]/80 backdrop-blur-md border border-amber-500/40 hover:border-amber-500/60 transition-colors">
            <span className="text-xs font-mono text-amber-200/50 block mb-1">Human Gate / Esc</span>
            <div className="text-2xl font-mono font-bold text-amber-300">26%</div>
            <span className="text-[10px] font-mono text-amber-400/80 mt-1 block">324 governed</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0907]/80 backdrop-blur-md border border-amber-400/50 shadow-glow-primary hover:border-amber-400 transition-colors">
            <span className="text-xs font-mono text-amber-200/50 block mb-1">Autonomous MTTR</span>
            <div className="text-2xl font-mono font-bold text-amber-300 text-glow-gold">3.2m</div>
            <span className="text-[10px] font-mono text-emerald-400 mt-1 block">↓ 93% vs 48m</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0907]/80 backdrop-blur-md border border-yellow-500/30 hover:border-yellow-500/50 transition-colors">
            <span className="text-xs font-mono text-amber-200/50 block mb-1">Verification Rate</span>
            <div className="text-2xl font-mono font-bold text-yellow-300">98.4%</div>
            <span className="text-[10px] font-mono text-yellow-400/80 mt-1 block">Post-action SLA</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0907]/80 backdrop-blur-md border border-rose-500/30 hover:border-rose-500/50 transition-colors">
            <span className="text-xs font-mono text-amber-200/50 block mb-1">Auto-Rollback</span>
            <div className="text-2xl font-mono font-bold text-rose-400">1.6%</div>
            <span className="text-[10px] font-mono text-amber-200/40 mt-1 block">Safe failback</span>
          </div>

        </div>

        {/* Detailed Visual Analytics: Traditional vs Autonomous MTTR Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* MTTR Breakdown Comparison (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#090806]/85 backdrop-blur-xl border border-amber-500/30 space-y-6 shadow-command-center">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-tech font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                MTTR Breakdown: Traditional SRE vs Autonomous Engine
              </h3>
              <span className="text-[11px] font-mono text-amber-300 font-bold">
                48m → 3.2m
              </span>
            </div>

            {/* Traditional Workflow Timeline Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-200/60">Traditional Manual Workflow (Average: 48 mins)</span>
                <span className="text-rose-400 font-semibold">High Cognitive Toil</span>
              </div>
              <div className="w-full h-8 bg-[#14120D] rounded-lg overflow-hidden flex text-[10px] font-mono text-white font-semibold">
                <div className="bg-rose-900/60 border-r border-rose-500/30 h-full flex items-center justify-center text-rose-200" style={{ width: '25%' }}>
                  Alert Triage (12m)
                </div>
                <div className="bg-amber-900/60 border-r border-amber-500/30 h-full flex items-center justify-center text-amber-200" style={{ width: '35%' }}>
                  Log & Diff Search (17m)
                </div>
                <div className="bg-stone-800 border-r border-stone-600 h-full flex items-center justify-center text-stone-300" style={{ width: '25%' }}>
                  Runbook Exec (12m)
                </div>
                <div className="bg-stone-900 h-full flex items-center justify-center text-stone-400" style={{ width: '15%' }}>
                  Verify (7m)
                </div>
              </div>
            </div>

            {/* Resolvia Autonomous Workflow Timeline Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-300 font-bold">Resolvia Autonomous Engine (Average: 3.2 mins / Demo: 63s)</span>
                <span className="text-emerald-400 font-semibold">93% MTTR Reduction</span>
              </div>
              <div className="w-full h-8 bg-[#14120D] rounded-lg overflow-hidden flex text-[10px] font-mono text-black font-bold">
                <div className="bg-[#AA820A] border-r border-amber-500/40 h-full flex items-center justify-center text-amber-100" style={{ width: '20%' }}>
                  Graph Ingest (25s)
                </div>
                <div className="bg-[#D4AF37] border-r border-amber-300/40 h-full flex items-center justify-center" style={{ width: '30%' }}>
                  Multi-Hypothesis (45s)
                </div>
                <div className="bg-[#F5D061] border-r border-yellow-200 h-full flex items-center justify-center" style={{ width: '25%' }}>
                  Policy Gate (30s)
                </div>
                <div className="bg-emerald-500 h-full flex items-center justify-center text-white" style={{ width: '25%' }}>
                  Closed-Loop Verify (90s)
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#100F0C] border border-amber-500/15 text-xs text-[#A8A295] leading-relaxed">
              <strong className="text-amber-200">Observation:</strong> The primary bottleneck in enterprise incident resolution is not command execution—it is alert deduplication, causal hypothesis triangulation, and manual post-fix verification. Resolvia automates the entire verification loop.
            </div>
          </div>

          {/* Incident Distribution & Resolution Mix (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#090806]/85 backdrop-blur-xl border border-amber-500/30 flex flex-col justify-between space-y-4 shadow-command-center">
            <h3 className="text-sm font-tech font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              Resolution Strategy Distribution
            </h3>

            {/* Strategy breakdown list */}
            <div className="space-y-3 font-mono text-xs">
              
              <div>
                <div className="flex items-center justify-between text-[#D5D0C5] mb-1">
                  <span>Stateless Container Rolling Restarts</span>
                  <span className="text-emerald-400 font-bold">48% (599)</span>
                </div>
                <div className="w-full bg-[#14120D] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '48%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[#D5D0C5] mb-1">
                  <span>Canary GitOps Deployment Rollbacks</span>
                  <span className="text-amber-300 font-bold">26% (324)</span>
                </div>
                <div className="w-full bg-[#14120D] h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-[#D4AF37] h-full rounded-full" style={{ width: '26%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[#D5D0C5] mb-1">
                  <span>Circuit Breaker & Rate Throttling</span>
                  <span className="text-yellow-300 font-bold">14% (175)</span>
                </div>
                <div className="w-full bg-[#14120D] h-2 rounded-full overflow-hidden">
                  <div className="bg-yellow-500 h-full rounded-full" style={{ width: '14%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[#D5D0C5] mb-1">
                  <span>Human Escalation (Low Conf / High Blast)</span>
                  <span className="text-amber-400 font-bold">12% (150)</span>
                </div>
                <div className="w-full bg-[#14120D] h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: '12%' }} />
                </div>
              </div>

            </div>

            {/* Prototype simulation disclaimer */}
            <div className="pt-3 border-t border-amber-500/15 text-[11px] font-mono text-amber-200/40">
              * Metrics generated from synthetic chaos engineering workloads simulating 1,248 microservice fault injections.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
