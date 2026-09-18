import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  Hash, 
  Clock, 
  GitCommit
} from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const SafetyGuardrails: React.FC = () => {
  const { activeScenario } = useSimulator();
  const audit = activeScenario.auditLog;

  const riskTiers = [
    {
      tier: 'LOW RISK',
      badge: 'Autonomous Execution',
      color: 'text-emerald-400',
      bgColor: 'bg-[#0E0D0A]',
      borderColor: 'border-emerald-500/30',
      desc: 'Zero state loss risk. Engine autonomously executes and verifies recovery.',
      examples: [
        'Restart stateless container pods',
        'Purge non-persistent Redis cache keys',
        'Auto-scale worker replica counts'
      ]
    },
    {
      tier: 'MEDIUM RISK',
      badge: 'Mandatory Human Approval',
      color: 'text-amber-300',
      bgColor: 'bg-[#0E0D0A]',
      borderColor: 'border-amber-400/50',
      desc: 'Traffic routing & version changes. Requires authenticated engineer sign-off.',
      examples: [
        'Rollback production canary deployment',
        'Toggle global traffic circuit breaker',
        'Re-route traffic to secondary AZ'
      ]
    },
    {
      tier: 'HIGH RISK',
      badge: 'Recommendation Only',
      color: 'text-rose-400',
      bgColor: 'bg-[#0E0D0A]',
      borderColor: 'border-rose-500/30',
      desc: 'Persistent storage & schema mutations. Strictly prohibited from autonomous execution.',
      examples: [
        'Apply database schema migrations',
        'Direct disk volume format or resize',
        'Modify production IAM security policies'
      ]
    }
  ];

  return (
    <section id="safety" className="py-20 border-b border-amber-500/15 relative scroll-mt-16 overflow-hidden">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest text-[11px] font-bold">Enterprise Governance Framework</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Autonomy With <span className="bg-gradient-to-r from-amber-200 via-[#F7DB7A] to-[#D4AF37] bg-clip-text text-transparent text-glow-gold">Guardrails.</span>
          </h2>
          <p className="mt-3.5 text-amber-200 text-base sm:text-lg max-w-2xl mx-auto font-tech font-semibold italic">
            "The AI recommends and reasons. Policy determines what it is allowed to do."
          </p>
          <p className="mt-2 text-[#A8A295] text-xs sm:text-sm font-sans">
            Resolvia prevents runaway AI actions through strict deterministic blast-radius control, 
            immutable audit trails, and cryptographically verified approval gates.
          </p>
        </div>

        {/* 3-Tier Risk Hierarchy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {riskTiers.map((tier) => (
            <div
              key={tier.tier}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all hover:scale-[1.01] ${tier.bgColor} ${tier.borderColor}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-unbounded text-xs font-bold tracking-wider ${tier.color}`}>
                    {tier.tier}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${tier.borderColor} ${tier.color} bg-[#14120D]`}>
                    {tier.badge}
                  </span>
                </div>

                <p className="text-xs text-[#C9C4B7] leading-relaxed mb-4">
                  {tier.desc}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-amber-500/15">
                <span className="text-[11px] font-mono text-amber-200/50 uppercase tracking-wider block font-semibold">
                  Example Operations:
                </span>
                {tier.examples.map((ex, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#D5D0C5]">
                    <span className={`text-[10px] font-mono ${tier.color}`}>✓</span>
                    <span>{ex}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Governance Pipeline Flow Visualization */}
        <div className="mb-16 p-6 rounded-2xl bg-[#0A0907] border border-amber-500/20">
          <div className="text-xs font-mono uppercase tracking-wider text-amber-200/60 font-semibold mb-4 text-center">
            Deterministic Decision Chain: From Prompt to Infrastructure
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-lg bg-[#14120D] border border-amber-500/30 text-amber-200">
              LLM Reasoning
            </span>
            <span className="text-amber-500/40">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-[#14120D] border border-amber-500/30 text-yellow-300">
              Evidence Graph
            </span>
            <span className="text-amber-500/40">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-400 text-amber-300 font-bold shadow-glow-primary">
              Policy Engine (OPA)
            </span>
            <span className="text-amber-500/40">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-[#14120D] border border-white/10 text-slate-300">
              Permission Check
            </span>
            <span className="text-amber-500/40">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-[#18150D] border border-amber-500/30 text-amber-200">
              Approval Gate
            </span>
            <span className="text-amber-500/40">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
              Remediation Runner
            </span>
            <span className="text-amber-500/40">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
              Signal Verification
            </span>
          </div>
        </div>

        {/* Cryptographic Audit Trail Component */}
        <div className="rounded-2xl border border-amber-500/25 bg-[#090806] overflow-hidden shadow-command-center">
          <div className="px-6 py-4 bg-[#0D0C09] border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Hash className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-tech font-bold uppercase tracking-wider text-white">
                Immutable Cryptographic Audit Ledger
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Tamper-Resistant
              </span>
            </div>

            <span className="text-xs font-mono text-amber-200/50">
              Record ID: <strong className="text-amber-300">{audit.id}</strong>
            </span>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            
            {/* Operator */}
            <div className="p-3.5 rounded-xl bg-[#100F0C] border border-amber-500/15 space-y-1">
              <span className="text-amber-200/40 block text-[10px] uppercase">Authorized Operator</span>
              <span className="text-white font-semibold flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                {audit.operator}
              </span>
            </div>

            {/* Policy ID */}
            <div className="p-3.5 rounded-xl bg-[#100F0C] border border-amber-500/15 space-y-1">
              <span className="text-amber-200/40 block text-[10px] uppercase">Policy Evaluated</span>
              <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                {audit.policyId}
              </span>
            </div>

            {/* Git Hash Target */}
            <div className="p-3.5 rounded-xl bg-[#100F0C] border border-amber-500/15 space-y-1">
              <span className="text-amber-200/40 block text-[10px] uppercase">CI/CD Git Transition</span>
              <span className="text-yellow-300 font-semibold flex items-center gap-1.5">
                <GitCommit className="w-3.5 h-3.5 text-amber-400" />
                {audit.gitHash || 'N/A'}
              </span>
            </div>

            {/* Timestamp */}
            <div className="p-3.5 rounded-xl bg-[#100F0C] border border-amber-500/15 space-y-1">
              <span className="text-amber-200/40 block text-[10px] uppercase">Audit Timestamp</span>
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400/60" />
                {audit.timestamp}
              </span>
            </div>

          </div>

          {/* Action & Verification Details */}
          <div className="px-6 pb-6 space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-[#100F0C] border border-amber-500/15 space-y-1.5">
              <div className="text-[#A8A295] font-mono text-[11px]">
                <strong className="text-white">Action Executed:</strong> {audit.action}
              </div>
              <div className="text-[#A8A295] font-mono text-[11px]">
                <strong className="text-white">Evidence Justification:</strong> {audit.justification}
              </div>
              <div className="text-emerald-300 font-mono text-[11px]">
                <strong className="text-white">Verification Result:</strong> {audit.verificationResult}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#060605] border border-amber-500/15 font-mono text-[10px] text-amber-200/40 flex items-center justify-between overflow-x-auto">
              <span>Cryptographic Signature: {audit.signature}</span>
              <span className="text-emerald-400 font-semibold shrink-0">✓ ECDSA Signature Verified</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
