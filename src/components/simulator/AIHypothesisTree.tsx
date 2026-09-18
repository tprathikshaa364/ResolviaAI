import React from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  ChevronRight, 
  ShieldAlert
} from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const AIHypothesisTree: React.FC = () => {
  const { activeScenario, openWhyModal } = useSimulator();

  return (
    <div className="bg-[#0A0907]/90 rounded-xl border border-amber-500/20 p-4 flex flex-col">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-500/15">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="font-semibold text-xs tracking-wider uppercase font-mono text-amber-200">
            AI Investigation Engine
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/25">
          Multi-Hypothesis Reasoning
        </span>
      </div>

      {/* Trust & Logic Flow */}
      <div className="mb-3 px-3 py-2 rounded-lg bg-[#11100C] border border-amber-500/15 flex items-center justify-between text-[11px] font-mono text-amber-200/60">
        <span className="text-amber-300">Evidence</span>
        <span>→</span>
        <span className="text-yellow-400">Hypothesis</span>
        <span>→</span>
        <span className="text-amber-300">Confidence</span>
        <span>→</span>
        <span className="text-amber-400">Policy Gate</span>
      </div>

      {/* Root Cause Candidates */}
      <div className="space-y-2.5">
        <div className="text-[11px] font-mono text-amber-200/50 uppercase tracking-wider">
          Probable Root Cause Candidates ({activeScenario.rootCauses.length})
        </div>

        {activeScenario.rootCauses.map((candidate, idx) => (
          <div
            key={candidate.id}
            className={`p-3 rounded-xl border transition-all ${
              candidate.isProbable
                ? 'bg-amber-950/20 border-amber-400/50 shadow-sm'
                : 'bg-[#100F0C] border-white/5 opacity-80'
            }`}
          >
            {/* Header: Rank + Title + Confidence */}
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded flex items-center justify-center font-mono text-xs font-bold ${
                  candidate.isProbable 
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black' 
                    : 'bg-[#1A1813] text-amber-200/40'
                }`}>
                  {idx + 1}
                </span>
                <span className={`text-xs font-semibold ${
                  candidate.isProbable ? 'text-white' : 'text-[#D5D0C5]'
                }`}>
                  {candidate.title}
                </span>
              </div>

              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${
                candidate.confidence > 80
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : candidate.confidence > 50
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-[#15130E] text-amber-200/40 border-amber-500/15'
              }`}>
                {candidate.confidence}% Conf
              </span>
            </div>

            {/* Confidence progress bar */}
            <div className="w-full bg-[#1A1813] h-1.5 rounded-full mb-2 overflow-hidden">
              <div
                className={`h-full transition-all rounded-full ${
                  candidate.isProbable
                    ? candidate.confidence >= 80 ? 'bg-emerald-400' : 'bg-amber-400'
                    : 'bg-amber-700/40'
                }`}
                style={{ width: `${candidate.confidence}%` }}
              />
            </div>

            {/* Candidate Summary */}
            <p className="text-[11px] text-[#A8A295] leading-relaxed mb-2.5">
              {candidate.description}
            </p>

            {/* "Why?" Expandable Action Button */}
            <div className="flex items-center justify-between pt-1 border-t border-amber-500/10">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-200/50">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>{candidate.evidence.length} evidence signals</span>
              </div>

              <button
                onClick={() => openWhyModal(candidate)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-amber-950/40 hover:bg-amber-900/60 text-amber-200 border border-amber-500/30 transition-colors"
                title="Expand AI reasoning and telemetry evidence"
              >
                <HelpCircle className="w-3 h-3 text-amber-400" />
                <span>Why?</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Responsible AI Disclaimer Banner */}
      <div className="mt-3 p-2.5 rounded-lg bg-[#11100D] border border-amber-500/15 flex items-start gap-2 text-[11px] text-[#A8A295] leading-relaxed">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong className="text-amber-200">Zero Blind Execution:</strong> The engine validates hypotheses against system telemetry before proposing remediation.
        </span>
      </div>
    </div>
  );
};
