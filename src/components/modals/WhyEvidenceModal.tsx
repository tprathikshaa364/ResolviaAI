import React from 'react';
import { 
  X, 
  HelpCircle, 
  CheckCircle2, 
  GitCommit, 
  ShieldCheck
} from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const WhyEvidenceModal: React.FC = () => {
  const { isWhyModalOpen, selectedCandidate, closeWhyModal } = useSimulator();

  if (!isWhyModalOpen || !selectedCandidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-[#0C0B08] border border-amber-500/30 rounded-2xl shadow-command-center overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#11100C] border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-tech text-base sm:text-lg font-bold uppercase tracking-tight text-white">
                AI Diagnostic Reasoning & Evidence Dossier
              </h3>
              <p className="text-xs font-mono text-amber-200/60">
                Hypothesis Confidence: <strong className="text-amber-300">{selectedCandidate.confidence}%</strong>
              </p>
            </div>
          </div>
          <button
            onClick={closeWhyModal}
            className="p-1.5 rounded-lg text-amber-300 hover:text-white hover:bg-[#1A1813] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 scrollbar-thin">
          
          {/* Candidate Title & Description */}
          <div className="p-4 rounded-xl bg-[#12110D] border border-amber-500/20">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
              Evaluated Root Cause
            </span>
            <h4 className="text-sm font-semibold text-white mb-2">
              {selectedCandidate.title}
            </h4>
            <p className="text-xs text-[#C9C4B7] leading-relaxed">
              {selectedCandidate.description}
            </p>
          </div>

          {/* Git Commit Correlation (If applicable) */}
          {selectedCandidate.gitCommit && (
            <div className="p-4 rounded-xl bg-[#100F0C] border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                  <GitCommit className="w-4 h-4 text-amber-400" />
                  Correlated CI/CD Commit
                </span>
                <span className="text-xs font-mono text-amber-200/60">
                  SHA: <strong className="text-white">{selectedCandidate.gitCommit.hash}</strong>
                </span>
              </div>

              <div className="text-xs text-[#D5D0C5]">
                <div className="font-semibold text-white">{selectedCandidate.gitCommit.message}</div>
                <div className="text-[11px] text-amber-200/50 mt-1">
                  Author: {selectedCandidate.gitCommit.author} • Committed: {selectedCandidate.gitCommit.timestamp}
                </div>
              </div>

              {/* Code Diff Simulation */}
              <div className="bg-[#060605] rounded-lg p-3 font-mono text-[11px] border border-amber-500/15 space-y-1">
                <div className="text-amber-500/40">// StripeConnector.java</div>
                <div className="text-rose-400">- String feePlan = null;</div>
                <div className="text-emerald-400">+ Map&lt;String, Object&gt; payload = new HashMap&lt;&gt;();</div>
                <div className="text-rose-400">+ payload.put("custom_rate", feePlan.toLowerCase()); // &lt;-- NullPointer trigger!</div>
                <div className="text-amber-500/40">// diff summary: {selectedCandidate.gitCommit.diffSummary}</div>
              </div>
            </div>
          )}

          {/* Telemetry Evidence Signals List */}
          <div>
            <h5 className="text-xs font-mono uppercase font-semibold text-amber-200/60 mb-2.5">
              Verified Telemetry Signals ({selectedCandidate.evidence.length})
            </h5>
            <div className="space-y-2">
              {selectedCandidate.evidence.map((item, i) => (
                <div 
                  key={i} 
                  className="p-3 rounded-lg bg-[#100F0C] border border-amber-500/15 text-xs text-[#D5D0C5] flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Probabilistic vs Deterministic note */}
          <div className="p-3.5 rounded-xl bg-amber-950/25 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Deterministic Verification Gate:</strong> While AI generates this causal hypothesis via vector similarity and log correlation, the remediation policy engine requires deterministic conditions before initiating rollback.
            </span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#11100C] border-t border-amber-500/20 flex items-center justify-end">
          <button
            onClick={closeWhyModal}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black hover:from-[#FFF1C5] hover:to-[#D4AF37] transition-all shadow-glow-primary"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
