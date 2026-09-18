import React from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  Check, 
  ShieldCheck, 
  HelpCircle
} from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const PresentationModeModal: React.FC = () => {
  const { 
    isDemoMode, 
    toggleDemoMode, 
    activeScenario, 
    currentState, 
    currentStepIndex, 
    isPlaying, 
    metrics, 
    startSimulation, 
    pauseSimulation, 
    resetSimulation, 
    nextStep, 
    approveRemediation, 
    switchScenario,
    openWhyModal 
  } = useSimulator();

  if (!isDemoMode) return null;

  const currentEvent = activeScenario.timeline[currentStepIndex] || activeScenario.timeline[0];
  const isAwaitingApproval = currentState === 'WAITING_APPROVAL';
  const probableCause = activeScenario.rootCauses.find(r => r.isProbable) || activeScenario.rootCauses[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#040404] flex flex-col text-[#EFEBE4] overflow-hidden font-sans select-none">
      
      {/* 1. Presentation Header Bar */}
      <div className="h-16 px-6 bg-[#0A0907] border-b border-amber-500/25 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-extrabold text-lg tracking-tight text-white">
              Resolvia <span className="text-amber-400">AI</span>
            </span>
          </div>

          <span className="text-amber-500/40">|</span>

          <span className="px-2.5 py-1 rounded bg-amber-500/15 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
            2-MINUTE EVALUATOR PITCH MODE
          </span>

          <div className="hidden md:flex items-center gap-2 font-mono text-xs text-amber-200/70">
            <span className="text-amber-200/40">Active Incident:</span>
            <span className="font-bold text-white">{activeScenario.incidentId}</span>
            <span className="text-amber-200/40">({activeScenario.service})</span>
          </div>
        </div>

        {/* Quick controls in header */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#100F0C] border border-amber-500/20 rounded-lg p-1 text-xs font-mono">
            <button
              onClick={() => switchScenario('payment-api-failure')}
              className={`px-3 py-1 rounded transition-all ${
                activeScenario.id === 'payment-api-failure' ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-bold' : 'text-amber-200/50'
              }`}
            >
              SEV-1 Rollback (94%)
            </button>
            <button
              onClick={() => switchScenario('database-latency-anomaly')}
              className={`px-3 py-1 rounded transition-all ${
                activeScenario.id === 'database-latency-anomaly' ? 'bg-amber-600 text-white font-bold' : 'text-amber-200/50'
              }`}
            >
              Responsible AI Guardrail (51%)
            </button>
          </div>

          <button
            onClick={toggleDemoMode}
            className="p-2 rounded-xl bg-[#14120D] hover:bg-[#1E1B13] text-amber-200/70 hover:text-white border border-amber-500/20 transition-colors flex items-center gap-1 text-xs font-mono"
            title="Exit Presentation Mode"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </div>

      {/* 2. Main Pitch Command Center Canvas */}
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 max-w-7xl mx-auto w-full">
        
        {/* Big Status Banner */}
        <div className={`p-6 rounded-2xl border transition-all ${
          currentState === 'RESOLVED'
            ? 'bg-emerald-950/40 border-emerald-500/60 shadow-glow-safe'
            : currentState === 'WAITING_APPROVAL'
            ? 'bg-amber-950/40 border-amber-400/80 shadow-glow-warning'
            : currentState === 'REMEDIATING'
            ? 'bg-amber-950/30 border-amber-500/50 shadow-glow-primary'
            : 'bg-[#0A0907] border-amber-500/20'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider ${
                  currentState === 'RESOLVED' ? 'bg-emerald-500 text-black' : 'bg-amber-500 text-black'
                }`}>
                  {currentState.replace('_', ' ')}
                </span>
                <span className="text-sm font-mono text-amber-200/60">
                  Step {currentStepIndex + 1} of {activeScenario.timeline.length}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentEvent.title}
              </h1>
              <p className="mt-1 text-[#C9C4B7] text-sm sm:text-base max-w-3xl">
                {currentEvent.description}
              </p>
            </div>

            {/* Approval Action Button right on banner if needed */}
            {isAwaitingApproval && (
              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={approveRemediation}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-black shadow-glow-safe transition-all active:scale-95 flex items-center gap-2"
                >
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>Approve Rollback</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Large Telemetry Ribbon for Projection Distance */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#0A0907] border border-amber-500/20">
            <span className="text-xs font-mono text-amber-200/50 block mb-1">HTTP 5xx Error Rate</span>
            <span className={`text-3xl sm:text-4xl font-mono font-extrabold ${
              metrics.errorRate > 5 ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              {metrics.errorRate.toFixed(2)}%
            </span>
            <span className="text-xs font-mono text-amber-200/50 mt-1 block">
              {metrics.errorRateDelta}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0907] border border-amber-500/20">
            <span className="text-xs font-mono text-amber-200/50 block mb-1">p99 Latency</span>
            <span className="text-3xl sm:text-4xl font-mono font-extrabold text-white">
              {metrics.p99Latency} <span className="text-sm font-normal text-amber-200/50">ms</span>
            </span>
            <span className="text-xs font-mono text-amber-200/50 mt-1 block">
              {metrics.latencyDelta}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0907] border border-amber-500/20">
            <span className="text-xs font-mono text-amber-200/50 block mb-1">Service Pod Health</span>
            <span className={`text-3xl sm:text-4xl font-mono font-extrabold ${
              metrics.healthChecksHealthy ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {metrics.healthChecks.split(' ')[0]}
            </span>
            <span className="text-xs font-mono text-amber-200/50 mt-1 block">
              {metrics.healthChecksHealthy ? 'Ready & Verified' : 'Failing Liveness Probes'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0907] border border-amber-400/40 shadow-glow-primary">
            <span className="text-xs font-mono text-amber-200/50 block mb-1">Autonomous MTTR</span>
            <span className="text-3xl sm:text-4xl font-mono font-extrabold text-amber-300 text-glow-gold">
              63 <span className="text-sm font-normal text-amber-400/60">secs</span>
            </span>
            <span className="text-xs font-mono text-emerald-400 mt-1 block">
              vs 48m Traditional MTTR
            </span>
          </div>
        </div>

        {/* 2-Column Split: Visual Timeline & AI Reasoning */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
          
          {/* Left: Simplified Clean Timeline Stepper */}
          <div className="p-5 rounded-xl bg-[#0A0907] border border-amber-500/20 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase font-semibold text-amber-200/70">
                Timeline Progression
              </span>
              <span className="text-xs font-mono text-amber-300">
                {currentStepIndex + 1} / {activeScenario.timeline.length} Steps
              </span>
            </div>

            <div className="space-y-2 flex-1">
              {activeScenario.timeline.map((ev, i) => {
                const isCurrent = i === currentStepIndex;
                const isPassed = i < currentStepIndex;
                return (
                  <div
                    key={ev.id}
                    className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-bold border-amber-300 shadow-glow-primary'
                        : isPassed
                        ? 'bg-[#100F0C] border-emerald-500/30 text-emerald-300'
                        : 'bg-[#070705] border-white/5 text-amber-200/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[11px] opacity-75">{ev.timestamp}</span>
                      <span>{ev.title}</span>
                    </div>
                    {isPassed && <span className="text-emerald-400 font-mono text-[10px]">VERIFIED</span>}
                    {isCurrent && <span className="text-black font-mono text-[10px] animate-pulse">ACTIVE</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: AI Evidence & Decision Summary */}
          <div className="p-5 rounded-xl bg-[#0A0907] border border-amber-500/20 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase font-semibold text-amber-200/70">
                  AI Investigation & Policy Guardrail
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Confidence: {activeScenario.confidence}%
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#070705] border border-amber-500/15 space-y-2 mb-3">
                <div className="text-xs text-amber-200/50 font-mono">Probable Root Cause:</div>
                <div className="text-sm font-bold text-white">{probableCause.title}</div>
                <div className="text-xs text-[#C9C4B7]">{probableCause.description}</div>
                <button
                  onClick={() => openWhyModal(probableCause)}
                  className="mt-2 text-xs text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-mono"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Inspect git commit & telemetry correlation</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#070705] border border-amber-500/15 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-200/50">Policy Check:</span>
                  <span className="text-amber-300 font-bold">{activeScenario.remediation.riskLevel} RISK</span>
                </div>
                <div className="text-xs text-[#C9C4B7]">
                  {activeScenario.remediation.reason}
                </div>
                <div className="text-xs font-mono text-amber-200/60 pt-1 border-t border-amber-500/10">
                  Action: <strong className="text-white">{activeScenario.remediation.name}</strong>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Closed-loop telemetry verification required before ticket closure.</span>
            </div>
          </div>

        </div>

      </div>

      {/* 3. Presentation Bottom Controller Bar */}
      <div className="h-20 px-6 bg-[#0A0907] border-t border-amber-500/20 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {isPlaying ? (
            <button
              onClick={pauseSimulation}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all flex items-center gap-2"
            >
              <Pause className="w-4 h-4" />
              <span>Pause Demo</span>
            </button>
          ) : (
            <button
              onClick={startSimulation}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#F5D061] via-[#D4AF37] to-[#AA820A] hover:from-[#FFF1C5] hover:to-[#D4AF37] text-black shadow-glow-primary transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{currentStepIndex === 0 ? 'Start Autonomous Demo' : 'Resume Playback'}</span>
            </button>
          )}

          <button
            onClick={nextStep}
            disabled={currentStepIndex >= activeScenario.timeline.length - 1}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#14120D] hover:bg-[#1E1B13] text-amber-100 border border-amber-500/20 disabled:opacity-40 transition-all flex items-center gap-1.5"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={resetSimulation}
            className="px-4 py-2.5 rounded-xl text-xs font-medium bg-[#100F0C] hover:bg-[#1A1813] text-amber-200/50 hover:text-white border border-amber-500/20 transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-amber-200/60">
          <span>Trust Flow:</span>
          <span className="text-white font-bold">Observe → Reason → Decide → Act → Verify</span>
        </div>
      </div>

    </div>
  );
};
