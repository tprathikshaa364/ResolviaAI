import React from 'react';
import { Play, Pause, RotateCcw, ChevronRight, CheckCircle2, AlertTriangle, ShieldCheck, Terminal, Maximize2 } from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const MinimalTerminalDemo: React.FC<{ onExpandFull?: () => void }> = ({ onExpandFull }) => {
  const {
    activeScenario,
    currentState,
    currentStepIndex,
    isPlaying,
    startSimulation,
    pauseSimulation,
    resetSimulation,
    nextStep,
    approveRemediation
  } = useSimulator();

  const isAwaitingApproval = currentState === 'WAITING_APPROVAL';
  const isResolved = currentState === 'RESOLVED';

  // Simplified terminal sequence lines matching the current simulation state
  const terminalLines = [
    {
      id: 'step-0',
      prefix: '[TELEMETRY]',
      color: 'text-amber-400',
      text: 'Baseline nominal: payment-gateway-api (p99: 195ms, 5xx: 0.04%)',
      minStep: 0
    },
    {
      id: 'step-1',
      prefix: '[ALERT]',
      color: 'text-rose-400 font-bold',
      text: 'SEV-1 Detected: HTTP 500 error rate spiked to 18.2% across 17 dependent services',
      minStep: 1
    },
    {
      id: 'step-2',
      prefix: '[AI-GRAPH]',
      color: 'text-yellow-400',
      text: 'Correlated 17 alerts into unified incident graph (payment-gateway + checkout-ui)',
      minStep: 2
    },
    {
      id: 'step-3',
      prefix: '[AI-CAUSE]',
      color: 'text-emerald-400 font-bold',
      text: 'Probable Root Cause (94% Conf): Null pointer in commit 4f98a1b (deployment v2.7)',
      minStep: 3
    },
    {
      id: 'step-4',
      prefix: '[POLICY]',
      color: 'text-amber-300',
      text: 'Matched POL-PROD-04 (MEDIUM RISK) → Rollback requires explicit human gate',
      minStep: 4
    },
    {
      id: 'step-5',
      prefix: '[GATE]',
      color: isAwaitingApproval ? 'text-amber-400 font-bold animate-pulse' : 'text-[#71717A]',
      text: isAwaitingApproval ? 'GATE PAUSED: Waiting for human approval via Webhook...' : 'Operator approved rollback to revision v2.6.2',
      minStep: 5
    },
    {
      id: 'step-6',
      prefix: '[ACTION]',
      color: 'text-emerald-400',
      text: 'Executing: kubectl rollout undo deployment/payment-gateway-api --to-revision=14',
      minStep: 6
    },
    {
      id: 'step-7',
      prefix: '[VERIFY]',
      color: 'text-cyan-400',
      text: 'Asserting closed-loop telemetry: Error rate < 0.5%, p99 < 350ms for 3 cycles',
      minStep: 7
    },
    {
      id: 'step-8',
      prefix: '[RESOLVED]',
      color: 'text-emerald-400 font-bold',
      text: 'Recovery verified in 63s. Audit packet cryptographically hashed to ledger.',
      minStep: 8
    }
  ];

  const visibleLines = terminalLines.filter(line => currentStepIndex >= line.minStep);

  return (
    <section id="demo" className="py-24 bg-black border-t border-white/[0.06] relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-[#A1A1AA] mb-4">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Watch the Autonomous Loop in Action.
          </h2>
          <p className="mt-2.5 text-sm text-[#A1A1AA]">
            Click <strong className="text-white">Run</strong> to trigger the automated incident response sequence.
          </p>
        </div>

        {/* The Floating Mac Terminal Window */}
        <div className="rounded-2xl border border-white/[0.12] bg-[#0A0A0C]/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Mac Terminal Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
            {/* Window Dots */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
              <span className="ml-3 text-xs font-mono text-[#71717A]">resolvia-agent — live-cluster:us-east-1</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={isPlaying ? pauseSimulation : startSimulation}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-mono transition-colors"
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isPlaying ? 'Pause' : 'Run'}</span>
              </button>

              <button
                onClick={nextStep}
                disabled={isResolved}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#A1A1AA] text-xs font-mono transition-colors disabled:opacity-30"
              >
                <span>Step</span>
                <ChevronRight className="w-3 h-3" />
              </button>

              <button
                onClick={resetSimulation}
                className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#71717A] hover:text-white transition-colors"
                title="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {onExpandFull && (
                <button
                  onClick={onExpandFull}
                  className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#71717A] hover:text-white transition-colors ml-1"
                  title="Open Full SRE Cockpit"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-xs sm:text-[13px] leading-relaxed min-h-[300px] flex flex-col justify-between space-y-3">
            <div className="space-y-2.5">
              {visibleLines.map((line) => (
                <div key={line.id} className="flex items-start gap-3 animate-fadeIn">
                  <span className={`shrink-0 ${line.color}`}>{line.prefix}</span>
                  <span className="text-[#D4D4D8]">{line.text}</span>
                </div>
              ))}

              {/* Cursor indicator when running */}
              {isPlaying && (
                <div className="flex items-center gap-2 text-amber-400 pt-1">
                  <span className="w-2 h-4 bg-amber-400 animate-pulse" />
                  <span className="text-xs text-[#71717A]">Resolvia loop evaluating active telemetry...</span>
                </div>
              )}
            </div>

            {/* In-Terminal Interactive Action (Human Approval Gate) */}
            {isAwaitingApproval && (
              <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
                <div className="flex items-center gap-2 text-amber-300">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs">Policy Gate Active: Rollback requires human confirmation.</span>
                </div>
                <button
                  onClick={approveRemediation}
                  className="w-full sm:w-auto px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs shadow-glow-primary transition-all shrink-0"
                >
                  Approve Rollback (v2.6.2)
                </button>
              </div>
            )}

            {/* Resolved Badge */}
            {isResolved && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between animate-fadeIn">
                <div className="flex items-center gap-2 text-emerald-400 text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Incident INC-2847 Closed & Verified. All assertions passed.</span>
                </div>
                <button
                  onClick={resetSimulation}
                  className="text-xs text-amber-300 hover:underline font-mono"
                >
                  Restart Loop
                </button>
              </div>
            )}

          </div>

          {/* Terminal Footer Status Bar */}
          <div className="px-5 py-2.5 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#71717A]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isResolved ? 'bg-emerald-400' : isAwaitingApproval ? 'bg-amber-400 animate-ping' : 'bg-emerald-400/80'}`} />
                <span>STATE: <strong className="text-white">{currentState}</strong></span>
              </span>
              <span>•</span>
              <span>Scenario: {activeScenario.title}</span>
            </div>

            <div className="hidden sm:block">
              MTTR: <span className="text-emerald-400 font-bold">63s</span> (vs 48m manual)
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
