import React from 'react';
import { 
  Play, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Search, 
  GitCommit, 
  Clock, 
  Activity, 
  Cpu,
  RefreshCw,
  Lock
} from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const HeroCommandCenter: React.FC = () => {
  const { 
    currentState, 
    activeScenario, 
    metrics, 
    startSimulation, 
    goToStep 
  } = useSimulator();

  const steps = [
    { label: 'Detection', state: 'INCIDENT_DETECTED', icon: AlertTriangle, color: 'text-rose-400' },
    { label: 'Investigation', state: 'INVESTIGATING', icon: Search, color: 'text-amber-300' },
    { label: 'Root Cause', state: 'ROOT_CAUSE_IDENTIFIED', icon: GitCommit, color: 'text-yellow-400' },
    { label: 'Risk & Policy', state: 'POLICY_CHECK', icon: Lock, color: 'text-amber-400' },
    { label: 'Remediation', state: 'REMEDIATING', icon: Zap, color: 'text-yellow-300' },
    { label: 'Verification', state: 'VERIFYING', icon: RefreshCw, color: 'text-emerald-300' },
    { label: 'Resolved', state: 'RESOLVED', icon: CheckCircle2, color: 'text-emerald-400' }
  ];

  const getStateIndex = (st: string) => {
    switch (st) {
      case 'IDLE': return 0;
      case 'INCIDENT_DETECTED': return 1;
      case 'INVESTIGATING': return 2;
      case 'ROOT_CAUSE_IDENTIFIED': return 3;
      case 'POLICY_CHECK':
      case 'WAITING_APPROVAL': return 4;
      case 'REMEDIATING': return 5;
      case 'VERIFYING': return 6;
      case 'RESOLVED': return 7;
      default: return 3;
    }
  };

  const activeIdx = getStateIndex(currentState);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 border-b border-amber-500/15 bg-[#040405]">


      {/* Dynamic Golden Black lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-gradient pointer-events-none" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-60 -left-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Trust Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-[#11100D] border border-amber-500/30 shadow-glow-primary">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[#D5D0C5] uppercase tracking-widest text-[11px] font-bold">Autonomous Enterprise SRE Platform</span>
            <span className="text-amber-500/40">/</span>
            <span className="text-amber-300 font-mono font-bold tracking-wide">Zero Blind Automation</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[62px] font-extrabold tracking-[-0.03em] text-white leading-[1.12]">
            From Incident Detection <br className="hidden sm:inline" />
            to Verified Resolution —{' '}
            <span className="bg-gradient-to-r from-[#FFF8DE] via-[#F5D061] to-[#D4AF37] bg-clip-text text-transparent text-glow-gold">
              Autonomously.
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#C9C4B7] font-sans font-normal leading-relaxed max-w-2xl mx-auto">
            Autonomous AI that investigates alerts, isolates probable root causes, applies policy-guarded remediation, and verifies recovery — in seconds.
          </p>
        </div>

        {/* CTAs & Trust loop statement */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="#simulator"
            onClick={startSimulation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-black bg-gradient-to-r from-[#F5D061] via-[#D4AF37] to-[#AA820A] hover:from-[#FFF1C5] hover:to-[#D4AF37] shadow-glow-primary transition-all active:scale-95 group"
          >
            <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            <span>Run Live Incident Demo</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
          </a>
          
          <a
            href="#architecture"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-amber-200/90 bg-[#12110D] hover:bg-[#1A1813] border border-amber-500/25 hover:border-amber-400/40 transition-all"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Explore Architecture</span>
          </a>
        </div>

        {/* Trust Statement Flow */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 rounded-full bg-[#11100C] border border-amber-500/20 text-xs sm:text-sm font-mono text-[#D5D0C5]">
            <span className="text-amber-300 font-semibold">Observe</span>
            <span className="text-amber-500/40">→</span>
            <span className="text-yellow-400 font-semibold">Reason</span>
            <span className="text-amber-500/40">→</span>
            <span className="text-amber-400 font-semibold">Decide</span>
            <span className="text-amber-500/40">→</span>
            <span className="text-amber-200 font-semibold">Act</span>
            <span className="text-amber-500/40">→</span>
            <span className="text-emerald-400 font-semibold">Verify</span>
          </div>
        </div>

        {/* Hero Visual: SOPHISTICATED ANIMATED MINI COMMAND CENTER */}
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-amber-500/25 bg-[#0A0907]/95 shadow-command-center backdrop-blur-xl overflow-hidden">
            
            {/* Command Center Top Bar */}
            <div className="px-4 py-3 bg-[#0E0D09] border-b border-amber-500/20 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-amber-200/50 ml-2">resolvia-core-engine://golden-telemetry-stream</span>
              </div>
              <div className="flex items-center gap-3 text-amber-200/70">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Telemetry Link Active
                </span>
                <span className="text-amber-500/30 hidden sm:inline">|</span>
                <span className="hidden sm:inline text-amber-300 font-semibold">
                  Incident: {activeScenario.incidentId}
                </span>
              </div>
            </div>

            {/* Autonomous Resolution Pipeline Track */}
            <div className="p-4 sm:p-6 bg-[#070705] border-b border-amber-500/15">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-200/70">
                  Autonomous State Progression Loop
                </span>
                <span className="text-xs font-mono text-amber-400 font-bold">
                  Stage {Math.min(activeIdx, steps.length)} of {steps.length}
                </span>
              </div>

              {/* Progress Stepper */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isCompleted = activeIdx > idx + 1;
                  const isCurrent = activeIdx === idx + 1;

                  return (
                    <button
                      key={step.label}
                      onClick={() => goToStep(Math.min(idx + 1, activeScenario.timeline.length - 1))}
                      className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition-all ${
                        isCurrent
                          ? 'bg-amber-950/40 border-amber-400/80 shadow-glow-primary'
                          : isCompleted
                          ? 'bg-[#11100C] border-emerald-500/30 text-emerald-300'
                          : 'bg-[#0A0907] border-white/5 text-amber-200/30 hover:border-amber-500/20'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <Icon className={`w-3.5 h-3.5 ${isCurrent ? step.color : isCompleted ? 'text-emerald-400' : 'text-amber-500/30'}`} />
                        {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                        {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
                      </div>
                      <span className={`text-[11px] font-medium tracking-tight ${isCurrent ? 'text-white font-bold' : isCompleted ? 'text-slate-200' : 'text-slate-400'}`}>
                        {step.label}
                      </span>
                      <span className="text-[9px] font-mono text-amber-500/60 uppercase mt-0.5">
                        {isCurrent ? 'ACTIVE' : isCompleted ? 'VERIFIED' : 'QUEUED'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Metrics Ribbon */}
            <div className="p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 bg-[#0B0A08]">
              
              {/* Metric 1: MTTR */}
              <div className="p-3 rounded-xl bg-[#12110D] border border-amber-500/15">
                <div className="flex items-center justify-between text-amber-200/60 text-xs mb-1">
                  <span className="font-mono">Autonomous MTTR</span>
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-xl font-mono font-bold text-white tracking-tight">
                  63 <span className="text-xs font-normal text-amber-400/60">secs</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-1">
                  ↓ 98% vs human MTTR
                </span>
              </div>

              {/* Metric 2: Incident Confidence */}
              <div className="p-3 rounded-xl bg-[#12110D] border border-amber-500/15">
                <div className="flex items-center justify-between text-amber-200/60 text-xs mb-1">
                  <span className="font-mono">AI Confidence</span>
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                </div>
                <div className="text-xl font-mono font-bold text-white tracking-tight">
                  {activeScenario.confidence}%
                </div>
                <span className="text-[10px] font-mono text-amber-400/60 flex items-center gap-1 mt-1">
                  Multi-signal score
                </span>
              </div>

              {/* Metric 3: Error Rate */}
              <div className="p-3 rounded-xl bg-[#12110D] border border-amber-500/15">
                <div className="flex items-center justify-between text-amber-200/60 text-xs mb-1">
                  <span className="font-mono">HTTP 5xx Rate</span>
                  <Activity className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <div className={`text-xl font-mono font-bold tracking-tight ${metrics.errorRate > 5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {metrics.errorRate.toFixed(2)}%
                </div>
                <span className="text-[10px] font-mono text-amber-400/60 truncate mt-1 block">
                  {metrics.errorRateDelta}
                </span>
              </div>

              {/* Metric 4: p99 Latency */}
              <div className="p-3 rounded-xl bg-[#12110D] border border-amber-500/15">
                <div className="flex items-center justify-between text-amber-200/60 text-xs mb-1">
                  <span className="font-mono">p99 Latency</span>
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-xl font-mono font-bold text-white tracking-tight">
                  {metrics.p99Latency} <span className="text-xs font-normal text-amber-400/60">ms</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400/60 truncate mt-1 block">
                  {metrics.latencyDelta}
                </span>
              </div>

              {/* Metric 5: Health Probes */}
              <div className="p-3 rounded-xl bg-[#12110D] border border-amber-500/15">
                <div className="flex items-center justify-between text-amber-200/60 text-xs mb-1">
                  <span className="font-mono">Service Probes</span>
                  <Cpu className="w-3.5 h-3.5 text-yellow-400" />
                </div>
                <div className={`text-xl font-mono font-bold tracking-tight ${metrics.healthChecksHealthy ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {metrics.healthChecks.split(' ')[0]}
                </div>
                <span className="text-[10px] font-mono text-amber-400/60 truncate mt-1 block">
                  {metrics.healthChecksHealthy ? 'All pods healthy' : 'Healthz failing'}
                </span>
              </div>

              {/* Metric 6: Remediation Status */}
              <div className="p-3 rounded-xl bg-[#12110D] border border-amber-500/15">
                <div className="flex items-center justify-between text-amber-200/60 text-xs mb-1">
                  <span className="font-mono">Remediation Gate</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-base font-mono font-bold text-amber-300 tracking-tight truncate">
                  {currentState === 'WAITING_APPROVAL' ? 'Approval Gate' : currentState === 'RESOLVED' ? 'Verified' : 'Guarded'}
                </div>
                <span className="text-[10px] font-mono text-amber-400/60 truncate mt-1 block">
                  Policy: {activeScenario.remediation.riskLevel} Risk
                </span>
              </div>

            </div>

            {/* Subtle interactive prompt banner */}
            <div className="px-4 py-2.5 bg-amber-950/20 border-t border-amber-500/20 flex flex-wrap items-center justify-between text-xs text-amber-200/60">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Active scenario: <strong className="text-amber-300">{activeScenario.title}</strong>
              </span>
              <a 
                href="#simulator" 
                className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1"
              >
                Jump to full interactive console <ArrowRight className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
