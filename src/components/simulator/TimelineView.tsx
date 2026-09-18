import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertTriangle, 
  Search, 
  ShieldCheck, 
  UserCheck, 
  Zap, 
  Activity
} from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';
import type { TimelineEvent } from '../../types/incident';

export const TimelineView: React.FC = () => {
  const { activeScenario, currentStepIndex, goToStep } = useSimulator();

  const getEventIcon = (category: TimelineEvent['category'], isPassed: boolean, isCurrent: boolean) => {
    if (isCurrent) {
      return <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />;
    }
    if (isPassed) {
      return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    }
    switch (category) {
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      case 'ai':
        return <Search className="w-4 h-4 text-amber-300" />;
      case 'policy':
        return <ShieldCheck className="w-4 h-4 text-yellow-400" />;
      case 'approval':
        return <UserCheck className="w-4 h-4 text-amber-400" />;
      case 'remediation':
        return <Zap className="w-4 h-4 text-amber-300" />;
      case 'verification':
        return <Activity className="w-4 h-4 text-emerald-300" />;
      case 'resolution':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      default:
        return <Circle className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="bg-[#0A0907]/90 rounded-xl border border-amber-500/20 p-4 flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-500/15">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <h3 className="font-semibold text-xs tracking-wider uppercase font-mono text-amber-200">
            Autonomous Incident Timeline
          </h3>
        </div>
        <span className="text-[11px] font-mono text-amber-200/50">
          Click step to inspect
        </span>
      </div>

      {/* Scrollable vertical timeline */}
      <div className="space-y-2 overflow-y-auto pr-1 max-h-[520px] scrollbar-thin">
        {activeScenario.timeline.map((event, idx) => {
          const isCurrent = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;

          return (
            <div
              key={event.id}
              onClick={() => goToStep(idx)}
              className={`group cursor-pointer rounded-xl p-3 border text-left transition-all relative ${
                isCurrent
                  ? 'bg-amber-950/40 border-amber-400 shadow-glow-primary'
                  : isPassed
                  ? 'bg-[#100F0C] border-white/5 hover:border-amber-500/30'
                  : 'bg-[#080705] border-white/[0.03] opacity-60 hover:opacity-100 hover:border-amber-500/20'
              }`}
            >
              {/* Header inside card: Timestamp + Badge */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#070705] border border-amber-500/20">
                    {getEventIcon(event.category, isPassed, isCurrent)}
                  </div>
                  <span className="font-mono text-xs font-semibold text-amber-200/80">
                    {event.timestamp}
                  </span>
                </div>

                {event.badge && (
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    isCurrent
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400 font-bold'
                      : 'bg-[#15130E] text-amber-200/50 border-amber-500/20'
                  }`}>
                    {event.badge}
                  </span>
                )}
              </div>

              {/* Event Title */}
              <h4 className={`text-xs font-semibold tracking-tight transition-colors ${
                isCurrent ? 'text-white font-bold' : 'text-[#EFEBE4] group-hover:text-amber-300'
              }`}>
                {event.title}
              </h4>

              {/* Event Description */}
              <p className="text-[11px] text-[#A8A295] mt-1 leading-relaxed line-clamp-2">
                {event.description}
              </p>

              {/* Active Pulse indicator bar */}
              {isCurrent && (
                <div className="absolute left-0 top-3 bottom-3 w-1 bg-amber-400 rounded-r shadow-glow-primary" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
