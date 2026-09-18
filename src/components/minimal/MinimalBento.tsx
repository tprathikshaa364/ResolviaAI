import React from 'react';
import { Layers, BrainCircuit, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const MinimalBento: React.FC = () => {
  return (
    <section id="bento" className="py-24 bg-black border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Headline */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Built for Zero Cognitive Toil.
          </h2>
          <p className="mt-3 text-base text-[#A1A1AA]">
            Replace tribal knowledge and manual runbooks with a deterministic, self-healing reliability loop.
          </p>
        </div>

        {/* 3-Card Bento Box Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Alert Fatigue */}
          <div className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-500/30 hover:bg-white/[0.03] transition-all flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />
            
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-amber-300 mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#71717A] block mb-2">01 / Alert Triage</span>
              <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                Alert Fatigue
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Resolvia dynamically correlates hundreds of distributed alerts from Envoy, Postgres, and Kubernetes into a single causal incident graph.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 font-semibold">17 Alerts → 1 Root Graph</span>
              <ArrowUpRight className="w-4 h-4 text-[#71717A] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>

          {/* Card 2: AI Investigation */}
          <div className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/30 hover:bg-white/[0.03] transition-all flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
            
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#71717A] block mb-2">02 / Causal AI</span>
              <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                AI Investigation
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Multi-hypothesis reasoning automatically cross-references stack traces against recent Git commit diffs to isolate root cause with 94% confidence.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 font-semibold">94% Confidence Correlation</span>
              <ArrowUpRight className="w-4 h-4 text-[#71717A] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>

          {/* Card 3: Safe Execution */}
          <div className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-500/30 hover:bg-white/[0.03] transition-all flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />
            
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-amber-300 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#71717A] block mb-2">03 / Governance</span>
              <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                Safe Execution
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Deterministic OPA policies evaluate remediation risk. High-blast actions halt at human gates before closed-loop verification asserts health.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 font-semibold">Deterministic Policy Gates</span>
              <ArrowUpRight className="w-4 h-4 text-[#71717A] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
