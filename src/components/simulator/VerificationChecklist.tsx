import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  Activity
} from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const VerificationChecklist: React.FC = () => {
  const { activeScenario, currentState } = useSimulator();

  const isVerifying = currentState === 'VERIFYING';
  const isResolved = currentState === 'RESOLVED';
  const isPastRemediation = ['REMEDIATING', 'VERIFYING', 'RESOLVED'].includes(currentState);

  const checks = activeScenario.verificationChecks;

  return (
    <div className="bg-[#0A0907]/90 rounded-xl border border-amber-500/20 p-4 flex flex-col">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-500/15">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-amber-400" />
          <h3 className="font-semibold text-xs tracking-wider uppercase font-mono text-amber-200">
            Closed-Loop Verification
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
          Telemetry Assertions
        </span>
      </div>

      {/* Verification Stages Flow */}
      <div className="grid grid-cols-4 gap-1.5 mb-3 text-[10px] font-mono text-center">
        <div className={`p-1.5 rounded border ${isPastRemediation ? 'bg-amber-950/40 border-amber-400 text-amber-300 font-bold' : 'bg-[#0E0D0A] border-white/5 text-amber-200/40'}`}>
          <div>1. Executed</div>
        </div>
        <div className={`p-1.5 rounded border ${isVerifying ? 'bg-yellow-950/40 border-yellow-400 text-yellow-300 font-bold animate-pulse' : isResolved ? 'bg-amber-950/40 border-amber-400 text-amber-300' : 'bg-[#0E0D0A] border-white/5 text-amber-200/40'}`}>
          <div>2. Signals</div>
        </div>
        <div className={`p-1.5 rounded border ${isResolved ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold' : 'bg-[#0E0D0A] border-white/5 text-amber-200/40'}`}>
          <div>3. Verified</div>
        </div>
        <div className={`p-1.5 rounded border ${isResolved ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold' : 'bg-[#0E0D0A] border-white/5 text-amber-200/40'}`}>
          <div>4. Resolved</div>
        </div>
      </div>

      {/* Assertion Checklist */}
      <div className="space-y-2 flex-1">
        {checks.length === 0 ? (
          <div className="p-4 text-center text-xs font-mono text-amber-200/40 italic">
            Verification bypassed: Autonomous action blocked by confidence gate.
          </div>
        ) : (
          checks.map((check) => {
            const passed = isResolved;
            const checking = isVerifying;

            return (
              <div
                key={check.id}
                className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                  passed
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                    : checking
                    ? 'bg-yellow-950/20 border-yellow-500/30 text-yellow-200'
                    : 'bg-[#100F0C] border-white/5 text-amber-200/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  {passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : checking ? (
                    <RefreshCw className="w-4 h-4 text-yellow-400 animate-spin shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-500/40 shrink-0" />
                  )}
                  <div>
                    <div className="font-medium">{check.name}</div>
                    <div className="text-[10px] font-mono text-amber-200/50">
                      Target: {check.target}
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono text-[11px]">
                  <span className={`font-bold ${passed ? 'text-emerald-400' : 'text-amber-200/50'}`}>
                    {passed ? check.currentValue : checking ? 'Testing...' : 'Pending'}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Statement */}
      <div className="mt-3 pt-2.5 border-t border-amber-500/10 text-[11px] font-mono text-amber-200/50 flex items-center justify-between">
        <span>Recovery Criteria:</span>
        <span className="text-emerald-400 font-semibold">
          {isResolved ? '4/4 Metrics Satisfied' : isVerifying ? 'Asserting SLA...' : '3 Intervals Required'}
        </span>
      </div>
    </div>
  );
};
