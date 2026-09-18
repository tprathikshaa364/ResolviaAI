import React from 'react';
import { SimulatorHeader } from './SimulatorHeader';
import { TimelineView } from './TimelineView';
import { MetricsPanel } from './MetricsPanel';
import { LogStream } from './LogStream';
import { AIHypothesisTree } from './AIHypothesisTree';
import { RemediationGate } from './RemediationGate';
import { VerificationChecklist } from './VerificationChecklist';
import { Radio } from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const LiveIncidentSimulator: React.FC = () => {
  const { currentState } = useSimulator();

  return (
    <section id="simulator" className="py-16 relative scroll-mt-16 bg-[#040405] overflow-hidden">
      
      {/* Ambient background lighting glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-radial-gradient opacity-30" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-3 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="uppercase tracking-widest text-[11px] font-bold">Interactive Incident Resolution Center</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Live Autonomous <span className="bg-gradient-to-r from-[#F5D061] via-[#D4AF37] to-[#E5C048] bg-clip-text text-transparent text-glow-gold">SRE Demonstration</span>
            </h2>
            <p className="mt-2 text-[#C9C4B7] text-sm sm:text-base max-w-2xl font-sans">
              Watch the autonomous loop correlate live alerts, score causal hypotheses, enforce deterministic policy gates, and verify recovery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#0F0E0B]/85 backdrop-blur-md border border-amber-500/25 text-xs font-mono text-[#D5D0C5] flex items-center gap-2.5 shadow-glow-primary">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>State: <strong className="font-unbounded text-xs font-black uppercase tracking-wider text-amber-300 ml-1">{currentState}</strong></span>
            </div>
          </div>
        </div>

        {/* The Main Command Center Container with Frosted Glass */}
        <div className="rounded-2xl border border-amber-500/30 bg-[#060605]/85 backdrop-blur-xl shadow-command-center overflow-hidden">
          
          {/* 1. Header Toolbar */}
          <SimulatorHeader />

          {/* 2. Real-Time Telemetry Gauges Ribbon */}
          <div className="p-4 sm:p-6 border-b border-amber-500/15 bg-[#080806]/75 backdrop-blur-md">
            <MetricsPanel />
          </div>

          {/* 3. Main Multi-Pane Grid */}
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#060605]/70 backdrop-blur-md">
            
            {/* Left Column: Interactive Timeline (4 cols) */}
            <div className="lg:col-span-4 flex flex-col">
              <TimelineView />
            </div>

            {/* Middle Column: Log Console & Remediation Gate (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <LogStream />
              <RemediationGate />
            </div>

            {/* Right Column: AI Hypotheses & Closed-Loop Verification (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <AIHypothesisTree />
              <VerificationChecklist />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
