import React from 'react';
import { Radio, BrainCircuit, ShieldAlert, CheckCheck } from 'lucide-react';

export const MinimalArchitecture: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Telemetry Ingestion',
      icon: Radio,
      desc: 'OTel, Prometheus, and eBPF stream aggregation with sub-second alert clustering.'
    },
    {
      num: '02',
      title: 'AI Reasoning',
      icon: BrainCircuit,
      desc: 'Multi-hypothesis causal inference correlating stack traces with recent git commit diffs.'
    },
    {
      num: '03',
      title: 'Human Approval Gate',
      icon: ShieldAlert,
      desc: 'Deterministic OPA guardrails enforce risk classification before any production action.'
    },
    {
      num: '04',
      title: 'Closed-Loop Verification',
      icon: CheckCheck,
      desc: 'Strict multi-interval telemetry assertions guarantee healthy state before ticket closure.'
    }
  ];

  return (
    <section id="architecture" className="py-24 bg-black border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#71717A] block mb-3">
            Core Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Four Stages. Absolute Certainty.
          </h2>
          <p className="mt-3 text-base text-[#A1A1AA]">
            Engineered with strict separation between probabilistic AI and deterministic execution.
          </p>
        </div>

        {/* 4 Small Neat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div 
                key={p.num}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-500/30 hover:bg-white/[0.03] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-amber-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono text-[#52525B]">{p.num}</span>
                  </div>
                  
                  <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                    {p.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
