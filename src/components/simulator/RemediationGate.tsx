import React from 'react';
import {
  ShieldCheck,
  Lock,
  Terminal,
  Check,
  X,
  UserCheck,
  RefreshCw
} from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const RemediationGate: React.FC = () => {
  const {
    activeScenario,
    currentState,
    approveRemediation,
    rejectRemediation
  } = useSimulator();

  const rem = activeScenario.remediation;
  const isAwaitingApproval = currentState === 'WAITING_APPROVAL';
  const isRemediating = currentState === 'REMEDIATING';
  const isVerified = currentState === 'RESOLVED';

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'LOW':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'MEDIUM':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/40 font-bold';
      case 'HIGH':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="bg-[#0A0907]/90 rounded-xl border border-amber-500/20 p-4 flex flex-col">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-500/15">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-amber-400" />
          <h3 className="font-semibold text-xs tracking-wider uppercase font-mono text-amber-200">
            Policy-Controlled Remediation
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
          Guardrail Active
        </span>
      </div>

      {/* 3-Tier Risk Hierarchy Mini Matrix */}
      <div className="grid grid-cols-3 gap-1.5 mb-3 text-center text-[10px] font-mono">
        <div className={`p-1.5 rounded border ${rem.riskLevel === 'LOW' ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold' : 'bg-[#0E0D0A] border-white/5 text-amber-200/40'}`}>
          <div>LOW RISK</div>
          <div className="text-[9px] opacity-70">Auto-Execute</div>
        </div>
        <div className={`p-1.5 rounded border ${rem.riskLevel === 'MEDIUM' ? 'bg-amber-950/40 border-amber-400 text-amber-300 font-bold' : 'bg-[#0E0D0A] border-white/5 text-amber-200/40'}`}>
          <div>MEDIUM RISK</div>
          <div className="text-[9px] opacity-70">Human Gate</div>
        </div>
        <div className={`p-1.5 rounded border ${rem.riskLevel === 'HIGH' ? 'bg-rose-950/40 border-rose-500 text-rose-300 font-bold' : 'bg-[#0E0D0A] border-white/5 text-amber-200/40'}`}>
          <div>HIGH RISK</div>
          <div className="text-[9px] opacity-70">Manual Only</div>
        </div>
      </div>

      {/* Proposed Action Card */}
      <div className="p-3 rounded-xl bg-[#100F0C] border border-amber-500/15 space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase text-amber-200/50">Proposed Action</span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getRiskBadge(rem.riskLevel)}`}>
            {rem.riskLevel} RISK • {rem.executionType.replace('_', ' ')}
          </span>
        </div>

        <h4 className="text-xs font-semibold text-white">
          {rem.name}
        </h4>

        {/* Command Box */}
        <div className="bg-[#070705] p-2 rounded-lg border border-amber-500/15 font-mono text-[11px] text-amber-300 flex items-center gap-2 overflow-x-auto">
          <Terminal className="w-3.5 h-3.5 text-amber-500/50 shrink-0" />
          <span className="truncate">{rem.command}</span>
        </div>

        <div className="text-[11px] text-[#A8A295] leading-relaxed">
          <strong className="text-amber-200">Policy Rationale:</strong> {rem.reason}
        </div>
      </div>

      {/* Dynamic Status / Interactive Gate */}
      <div className="mt-auto">
        {isAwaitingApproval && (
          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-400/60 shadow-glow-warning space-y-2.5">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
              <UserCheck className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Human Authorization Gate Active</span>
            </div>
            <p className="text-[11px] text-amber-200/80 leading-relaxed">
              Medium-risk production rollback requires operator approval. Engine has prepared rollback payload and safety baseline.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={approveRemediation}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow-safe transition-all active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>Approve Action</span>
              </button>
              <button
                onClick={rejectRemediation}
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/40 transition-all"
              >
                <X className="w-4 h-4" />
                <span>Reject</span>
              </button>
            </div>
          </div>
        )}

        {isRemediating && (
          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
              <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
              <span>Executing Rollback via Kubernetes Operator...</span>
            </div>
            <div className="w-full bg-[#1A1813] h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-[#D4AF37] animate-pulse rounded-full w-3/4" />
            </div>
            <span className="text-[10px] font-mono text-amber-200/50 block">
              Replacing pods with stable digest sha256:8f2a1b9
            </span>
          </div>
        )}

        {isVerified && (
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-center gap-2.5 text-emerald-300 text-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold">Remediation Executed & Verified</div>
              <div className="text-[10px] text-emerald-400/80 font-mono">
                Audit Hash: 0x74a981c2f... Recorded
              </div>
            </div>
          </div>
        )}

        {!isAwaitingApproval && !isRemediating && !isVerified && (
          <div className="p-2.5 rounded-lg bg-[#0F0E0B] border border-amber-500/10 flex items-center justify-between text-xs text-amber-200/60 font-mono">
            <span>Governance State:</span>
            <span className="text-amber-300">
              {currentState === 'ESCALATED' ? 'Escalated to On-Call' : 'Policy Guard Standby'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
