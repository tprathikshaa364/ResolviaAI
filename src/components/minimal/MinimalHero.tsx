import React from 'react';
import { ArrowRight, Terminal, Sparkles, Shield, Cpu, CheckCircle2 } from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const MinimalHero: React.FC = () => {
  const { startSimulation, isPlaying } = useSimulator();

  const handleRunDemo = () => {
    const el = document.getElementById('demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (!isPlaying) {
      startSimulation();
    }
  };

  const steps = [
    { label: 'Observe', desc: 'OTel & eBPF Streams' },
    { label: 'Reason', desc: 'Multi-Hypothesis AI' },
    { label: 'Decide', desc: 'Deterministic Policies' },
    { label: 'Act', desc: 'GitOps Rollback' },
    { label: 'Verify', desc: 'Closed-Loop Assertions' }
  ];

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-black">
      {/* Ultra-subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
        
        {/* Minimal pill badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-[#A1A1AA] mb-8 hover:border-amber-500/30 transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-wide">Autonomous SRE Engine</span>
          <span className="text-white/20">|</span>
          <span className="text-amber-400/90 font-semibold">Zero Blind Automation</span>
        </div>

        {/* Huge Clean Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
          From Incident Detection to Verified Resolution — <span className="bg-gradient-to-r from-[#FFFFFF] via-[#F5D061] to-[#D4AF37] bg-clip-text text-transparent">Autonomously.</span>
        </h1>

        {/* Punchy 2-sentence Subtext */}
        <p className="mt-6 text-lg sm:text-xl text-[#A1A1AA] max-w-2xl mx-auto font-normal leading-relaxed">
          AI that investigates, safely remediates, and verifies recovery in seconds. Zero blind automation.
        </p>

        {/* Sleek CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleRunDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89228] text-black font-semibold text-sm shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Run Live Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#architecture"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-[#D4D4D8] border border-white/[0.08] font-medium text-sm transition-all"
          >
            <span>Read Architecture</span>
          </a>
        </div>

        {/* Visual Anchor: Minimalist Glowing Horizontal Flow */}
        <div className="mt-20 pt-10 border-t border-white/[0.06]">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#71717A] mb-6">
            The Autonomous Loop
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-3xl mx-auto">
            {steps.map((step, idx) => (
              <div 
                key={step.label}
                className="relative group p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/30 transition-all text-left"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {step.label}
                  </span>
                  <span className="text-[10px] font-mono text-[#52525B]">0{idx + 1}</span>
                </div>
                <div className="text-[11px] text-[#71717A] font-sans truncate">
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
