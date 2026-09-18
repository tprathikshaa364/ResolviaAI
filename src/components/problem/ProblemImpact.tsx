import React from 'react';

export const ProblemImpact: React.FC = () => {
  const painPoints = [
    {
      title: 'Alert Storms & Fatigue',
      summary: 'Cascading failure alerts drown out the actual root origin.',
      traditional: 'Manual triage across 50+ noisy Slack & PagerDuty alerts',
      resolvia: 'Clusters 50+ alerts into 1 unified root incident graph'
    },
    {
      title: 'Slow Manual Triangulation',
      summary: '70% of MTTR is wasted hunting through logs and git commits.',
      traditional: 'Juggling 10+ tabs across APMs, ArgoCD & SSH sessions',
      resolvia: 'AI agent isolates code diffs and traces in < 45 seconds'
    },
    {
      title: 'Stale Runbooks & Siloed Knowledge',
      summary: 'Recovery knowledge is trapped in outdated wikis or senior heads.',
      traditional: 'Waiting for senior on-call; dangerous trial-and-error',
      resolvia: 'Vector RAG retrieves verified runbooks & post-mortems'
    },
    {
      title: 'Unverified Fixes & Secondary Crashes',
      summary: 'Restart commands exit 0, tickets close, but systems crash again.',
      traditional: 'Blind ticket closure right after command exits 0',
      resolvia: 'Enforces 4-step telemetric recovery assertions before closure'
    }
  ];

  const impactMetrics = [
    { label: 'Manual Triage Toil', value: '-82%', detail: 'Eliminated on known failure modes' },
    { label: 'Average MTTR', value: '-93%', detail: 'From 48 mins to 3.2 mins' },
    { label: 'Execution Accuracy', value: '100%', detail: 'Zero skipped policy guardrails' },
    { label: 'Audit Trail Integrity', value: '100%', detail: 'Cryptographic SHA-256 ledger' },
  ];

  return (
    <section className="py-20 border-b border-amber-500/15 relative bg-[#040405] overflow-hidden">
      


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-3">
            <span className="uppercase tracking-widest text-[11px] font-bold">The Enterprise Challenge</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Why Traditional Incident Response <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FFF4CC] via-[#F5D061] to-[#D4AF37] bg-clip-text text-transparent text-glow-gold">
              Fails Under Modern Scale
            </span>
          </h2>
          <p className="mt-3.5 text-[#C9C4B7] text-sm sm:text-base font-sans leading-relaxed max-w-2xl mx-auto">
            Distributed microservices generate alerts faster than humans can triage. 
            Here is how Resolvia replaces manual firefighting with deterministic autonomy.
          </p>
        </div>

        {/* 4 Contrast Cards: Traditional vs Resolvia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {painPoints.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-amber-500/20 bg-[#0A0907] p-5 space-y-3.5 hover:border-amber-400/40 transition-all shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-md bg-[#181611] text-amber-300 font-mono text-xs flex items-center justify-center font-bold border border-amber-500/30 shrink-0">
                  {idx + 1}
                </span>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {item.title}
                </h3>
              </div>

              <p className="text-xs text-[#A8A295] leading-relaxed">
                {item.summary}
              </p>

              <div className="space-y-2 pt-1 text-xs font-mono">
                {/* Traditional */}
                <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/20 text-rose-300 flex items-start gap-2">
                  <span className="text-rose-400 font-bold uppercase text-[10px] shrink-0 mt-0.5">Manual:</span>
                  <span>{item.traditional}</span>
                </div>

                {/* Resolvia */}
                <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-200 flex items-start gap-2">
                  <span className="text-amber-400 font-bold uppercase text-[10px] shrink-0 mt-0.5">Resolvia:</span>
                  <span>{item.resolvia}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Dashboard Banner */}
        <div className="rounded-2xl border border-amber-500/35 bg-gradient-to-br from-[#17140D] via-[#0E0D09] to-[#0A0907] p-8 shadow-command-center">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
              Measurable Business & Engineering Impact
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Transforming SRE from Emergency Firefighting to Resilient Operations
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactMetrics.map((m, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#0F0E0B] border border-amber-500/20 shadow-sm">
                <div className="text-3xl font-extrabold text-amber-300 font-mono mb-1 text-glow-gold">
                  {m.value}
                </div>
                <div className="text-xs font-semibold text-white mb-1">
                  {m.label}
                </div>
                <p className="text-[11px] text-amber-200/50 leading-snug">
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
