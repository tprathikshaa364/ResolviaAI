import React from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  X, 
  AlertOctagon, 
  ShieldAlert, 
  Clock, 
  Server,
  ChevronRight
} from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const SimulatorHeader: React.FC = () => {
  const {
    activeScenario,
    currentState,
    currentStepIndex,
    isPlaying,
    startSimulation,
    pauseSimulation,
    resetSimulation,
    nextStep,
    approveRemediation,
    rejectRemediation,
    triggerManualRollback,
    switchScenario
  } = useSimulator();

  const isAtApprovalGate = currentState === 'WAITING_APPROVAL';

  return (
    <div className="border-b border-amber-500/20 bg-[#0B0A08]/85 backdrop-blur-md p-4 sm:p-6 rounded-t-2xl">
      {/* Top row: Incident Metadata & Scenario Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-amber-500/15">
        
        {/* Left: Incident Identity */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 font-mono text-xs font-bold border border-rose-500/30 flex items-center gap-1.5">
            <AlertOctagon className="w-3.5 h-3.5" />
            {activeScenario.severity}
          </span>

          <span className="font-mono text-lg font-bold text-white tracking-wide">
            {activeScenario.incidentId}
          </span>

          <span className="text-amber-500/30">|</span>

          <div className="flex items-center gap-2 text-[#D5D0C5] font-mono text-xs">
            <Server className="w-3.5 h-3.5 text-amber-500/50" />
            <span className="text-amber-300 font-semibold">{activeScenario.service}</span>
            <span className="text-amber-200/40">({activeScenario.environment})</span>
          </div>

          <span className="text-amber-500/30 hidden sm:inline">|</span>

          <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
            currentState === 'RESOLVED' 
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              : currentState === 'WAITING_APPROVAL'
              ? 'bg-amber-500/25 text-amber-300 border-amber-400/60 animate-pulse'
              : currentState === 'ESCALATED'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
          }`}>
            STATUS: {currentState.replace('_', ' ')}
          </span>
        </div>

        {/* Right: Quick Scenario Switch */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-amber-200/50 font-mono text-[11px] mr-1 hidden sm:inline">Scenario:</span>
          <button
            onClick={() => switchScenario('payment-api-failure')}
            className={`px-3 py-1.5 rounded-lg font-mono transition-all ${
              activeScenario.id === 'payment-api-failure'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-bold shadow-glow-primary'
                : 'bg-[#14120D] text-amber-200/60 hover:text-white border border-amber-500/15'
            }`}
          >
            SEV-1 Rollback (94% Conf)
          </button>
          <button
            onClick={() => switchScenario('database-latency-anomaly')}
            className={`px-3 py-1.5 rounded-lg font-mono transition-all ${
              activeScenario.id === 'database-latency-anomaly'
                ? 'bg-amber-600 text-white font-bold shadow-glow-warning'
                : 'bg-[#14120D] text-amber-200/60 hover:text-white border border-amber-500/15'
            }`}
            title="Demonstrates Responsible AI"
          >
            Low Conf Guardrail (51%)
          </button>
        </div>

      </div>

      {/* Bottom row: Interactive Controller Button Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
        
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          {isPlaying ? (
            <button
              onClick={pauseSimulation}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={startSimulation}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F5D061] via-[#D4AF37] to-[#AA820A] hover:from-[#FFF1C5] hover:to-[#D4AF37] text-black shadow-glow-primary transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{currentStepIndex === 0 ? 'Start Simulation' : 'Resume'}</span>
            </button>
          )}

          <button
            onClick={nextStep}
            disabled={currentStepIndex >= activeScenario.timeline.length - 1 || isPlaying}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium bg-[#14130F] hover:bg-[#1D1B15] text-[#D5D0C5] border border-amber-500/20 disabled:opacity-40 disabled:pointer-events-none transition-all"
            title="Advance one step in simulation"
          >
            <span>Step</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={resetSimulation}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-[#14130F] hover:bg-[#1D1B15] text-amber-200/50 hover:text-white border border-amber-500/20 transition-all"
            title="Reset to beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Action Gate Buttons (When human approval is needed or rollback is possible) */}
        <div className="flex items-center gap-2.5">
          {isAtApprovalGate && (
            <div className="flex items-center gap-2 animate-bounce-short">
              <button
                onClick={approveRemediation}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow-safe border border-emerald-400/40 transition-all active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>Approve Remediation</span>
              </button>
              <button
                onClick={rejectRemediation}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/40 transition-all"
              >
                <X className="w-4 h-4" />
                <span>Reject</span>
              </button>
            </div>
          )}

          {/* Manual Emergency Rollback button */}
          <button
            onClick={triggerManualRollback}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-amber-200/70 bg-[#12110D] hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-500/40 border border-amber-500/20 transition-all"
            title="Trigger emergency manual rollback action"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Rollback</span>
          </button>

          {/* Current Step Tracker */}
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-amber-500/20 text-xs font-mono text-amber-200/60">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Step {currentStepIndex + 1} / {activeScenario.timeline.length}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
