import React from 'react';
import { 
  Eye, 
  Brain, 
  Scale, 
  Zap, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const stages = [
    {
      step: '01',
      title: 'Observe',
      subtitle: 'Multi-Signal Ingestion',
      icon: Eye,
      color: 'text-amber-300',
      borderColor: 'border-amber-500/30',
      bgColor: 'bg-[#0E0D09]',
      desc: 'Ingests real-time metrics, traces, system logs, and CI/CD deployment events.',
      bullets: [
        'Clusters noisy alert storms into 1 root incident graph',
        'Correlates telemetry changes with recent GitOps commits'
      ]
    },
    {
      step: '02',
      title: 'Reason',
      subtitle: 'Multi-Hypothesis AI',
      icon: Brain,
      color: 'text-yellow-400',
      borderColor: 'border-yellow-500/30',
      bgColor: 'bg-[#0E0D09]',
      desc: 'AI agents formulate and score competing causal root cause candidates.',
      bullets: [
        'Scores candidates with transparent confidence ratings',
        'Grounds diagnostics strictly in live logs and verified runbooks'
      ]
    },
    {
      step: '03',
      title: 'Decide',
      subtitle: 'Deterministic Policy Gate',
      icon: Scale,
      color: 'text-amber-400',
      borderColor: 'border-amber-400/30',
      bgColor: 'bg-[#0E0D09]',
      desc: 'Deterministic OPA engine enforces blast-radius and safety constraints.',
      bullets: [
        'Low Risk: Autonomous zero-touch execution',
        'Medium Risk: Mandatory human-in-the-loop approval gate'
      ]
    },
    {
      step: '04',
      title: 'Act',
      subtitle: 'Policy-Bound Remediation',
      icon: Zap,
      color: 'text-[#E5C048]',
      borderColor: 'border-[#E5C048]/30',
      bgColor: 'bg-[#0E0D09]',
      desc: 'Dispatches validated remediation via Kubernetes Operator or Cloud APIs.',
      bullets: [
        'Pre-computes automated rollback baseline before execution',
        'Streams real-time execution logs directly to incident bridge'
      ]
    },
    {
      step: '05',
      title: 'Verify',
      subtitle: 'Closed-Loop Assertion',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      bgColor: 'bg-[#0E0D09]',
      desc: 'Never closes tickets on exit-code 0. Actively asserts telemetric recovery.',
      bullets: [
        'Asserts error rates and p99 SLA across consecutive intervals',
        'Signs immutable SHA-256 audit record on ticket closure'
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 border-b border-amber-500/15 relative scroll-mt-16 bg-[#040405] overflow-hidden">
      


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-3">
            <span className="uppercase tracking-widest text-[11px] font-bold">Closed-Loop Cognitive Model</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How The <span className="bg-gradient-to-r from-[#FFF1C5] via-[#D4AF37] to-[#E5C048] bg-clip-text text-transparent text-glow-gold">Autonomous Engine</span> Works
          </h2>
          <p className="mt-3.5 text-[#C9C4B7] text-sm sm:text-base font-tech font-medium leading-relaxed">
            Resolvia closes the loop between telemetry detection and verifiable recovery. 
            Here is how our five-stage cognitive architecture orchestrates mission-critical reliability.
          </p>
        </div>

        {/* 5-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className={`rounded-2xl border p-5 flex flex-col justify-between transition-all hover:scale-[1.02] ${stage.bgColor} ${stage.borderColor} hover:border-amber-400/50`}
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-amber-500/50 tracking-wider">
                      {stage.step}
                    </span>
                    <div className={`p-2 rounded-xl bg-[#14120D] border border-amber-500/20 ${stage.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-unbounded text-base sm:text-lg font-black text-white mb-1.5 tracking-tight">
                    {stage.title}
                  </h3>
                  <div className={`text-xs font-mono font-bold uppercase tracking-wider mb-3 ${stage.color}`}>
                    {stage.subtitle}
                  </div>

                  <p className="text-xs text-[#A8A295] leading-relaxed mb-4">
                    {stage.desc}
                  </p>
                </div>

                {/* Bullets */}
                <div className="space-y-2 pt-3 border-t border-amber-500/15 text-[11px] text-[#D5D0C5]">
                  {stage.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className={`text-[10px] font-mono mt-0.5 ${stage.color}`}>▸</span>
                      <span className="leading-snug">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner: LLM Reasoning vs Deterministic System Control */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#12110D] via-[#1A1710] to-[#12110D] border border-amber-500/30 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-glow-primary">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Clear Separation: AI Reasoning vs Deterministic System Control
              </h4>
              <p className="text-xs text-[#C9C4B7] mt-1 leading-relaxed">
                Large Language Models generate diagnostic hypotheses and query runbooks. 
                They <strong>never</strong> have direct mutation access to infrastructure. 
                Policy rules, risk scores, and telemetry verifiers are 100% deterministic code.
              </p>
            </div>
          </div>

          <a
            href="#safety"
            className="shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black hover:from-[#FFF1C5] hover:to-[#D4AF37] transition-all shadow-glow-primary"
          >
            Review Safety Model
          </a>
        </div>

      </div>
    </section>
  );
};
