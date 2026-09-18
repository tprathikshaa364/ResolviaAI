import React from 'react';
import { 
  X, 
  Award, 
  CheckCircle2, 
  Star, 
  Info
} from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const EvaluatorChecklistModal: React.FC = () => {
  const { isEvaluatorModalOpen, toggleEvaluatorModal } = useSimulator();

  if (!isEvaluatorModalOpen) return null;

  const criteria = [
    { label: 'Problem Understanding', score: 5, detail: 'Accurately targets SRE alert fatigue, human handoffs, and MTTR inflation in distributed production systems.' },
    { label: 'Technical Depth', score: 5, detail: 'Multi-signal graph correlation, semantic RAG log indexing, OPA-based policy safety matrix, and deterministic telemetry assertion.' },
    { label: 'Feasibility & Scalability', score: 5, detail: 'Vendor-neutral integration with Prometheus, OpenTelemetry, Kubernetes Operator, and ServiceNow without ripping out existing stack.' },
    { label: 'Innovation & Responsible AI', score: 4, detail: 'Guardrail-first architecture: AI models propose hypotheses, but deterministic policy engines control mutations and refuse low-confidence actions.' },
    { label: 'Demo Readiness & Polish', score: 5, detail: 'Complete interactive state machine with live telemetry, streaming terminal logs, human-in-the-loop approval, and recovery celebration.' }
  ];

  const evaluatorHighlights = [
    { title: 'Real Autonomous Workflow', desc: 'Notice how the system steps through Observe → Reason → Decide → Act → Verify rather than stopping at detection.' },
    { title: 'Evidence-Grounded Reasoning', desc: 'Click the "Why?" button on any candidate to inspect correlated git diffs, error timestamps, and log traces.' },
    { title: 'Deterministic Safety Guardrails', desc: 'Notice the 3-tier risk classification: Low risk auto-executes, Medium risk pauses for human approval, High risk is recommendation-only.' },
    { title: 'Responsible AI Demonstration', desc: 'Switch to the "Low Confidence (51%)" scenario to see the engine actively refuse unverified database mutations and escalate with diagnostics.' },
    { title: 'Closed-Loop Verification', desc: 'Remediation is never marked complete simply because a command was executed; 4 telemetric assertions must pass across consecutive intervals.' },
    { title: 'Cryptographic Auditability', desc: 'Every autonomous and human action is recorded with operator identity, policy ID, git hash, and SHA-256 signature.' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-3xl bg-[#0C0B08] border border-amber-500/30 rounded-2xl shadow-command-center overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#11100C] border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-tech text-base sm:text-lg font-bold uppercase tracking-tight text-white">
                Hackathon Evaluator & Judge Companion
              </h3>
              <p className="text-xs font-mono text-amber-300">
                Internal prototype readiness checklist & assessment guide
              </p>
            </div>
          </div>
          <button
            onClick={toggleEvaluatorModal}
            className="p-1.5 rounded-lg text-amber-300 hover:text-white hover:bg-[#1A1813] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin">
          
          {/* Disclaimer Alert */}
          <div className="p-3.5 rounded-xl bg-[#11100C] border border-amber-500/20 flex items-start gap-2.5 text-xs text-[#C9C4B7] leading-relaxed">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Note to Evaluators:</strong> The readiness scores below reflect our team's internal rubric checklist for MVP prototype completeness. We encourage you to interact with the live state machine and test edge cases.
            </span>
          </div>

          {/* Internal Readiness Scorecard */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-200/60 font-semibold mb-3">
              Prototype Readiness Rubric
            </h4>
            <div className="space-y-3">
              {criteria.map((item) => (
                <div 
                  key={item.label}
                  className="p-3.5 rounded-xl bg-[#100F0C] border border-amber-500/15 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.label}</span>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < item.score ? 'fill-amber-400 text-amber-400' : 'text-stone-800'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-[#A8A295] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* What Evaluators Should Notice */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-200/60 font-semibold mb-3">
              Key Capabilities to Test During Evaluation
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {evaluatorHighlights.map((hl) => (
                <div 
                  key={hl.title}
                  className="p-3.5 rounded-xl bg-[#100F0C] border border-amber-500/15 text-xs space-y-1"
                >
                  <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{hl.title}</span>
                  </div>
                  <p className="text-[11px] text-[#A8A295] leading-relaxed">
                    {hl.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#11100C] border-t border-amber-500/20 flex items-center justify-between text-xs">
          <span className="text-amber-200/40 font-mono">
            Resolvia AI • Hackathon Evaluation Portal
          </span>
          <button
            onClick={toggleEvaluatorModal}
            className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black hover:from-[#FFF1C5] hover:to-[#D4AF37] transition-all shadow-glow-primary"
          >
            Return to Live Demo
          </button>
        </div>
      </div>
    </div>
  );
};
