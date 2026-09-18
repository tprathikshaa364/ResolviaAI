import React, { useState, useRef, useEffect } from 'react';
import { Terminal, ArrowDown } from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';
import type { LogEntry } from '../../types/incident';

export const LogStream: React.FC = () => {
  const { logs } = useSimulator();
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const filteredLogs = logs.filter(log => {
    if (filterLevel === 'ALL') return true;
    return log.level === filterLevel;
  });

  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const getBadgeStyle = (level: LogEntry['level']) => {
    switch (level) {
      case 'ERROR':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'WARN':
        return 'text-amber-400 bg-amber-500/15 border-amber-500/40';
      case 'AI-AGENT':
        return 'text-[#F5D061] bg-amber-500/15 border-amber-400/40 font-bold';
      case 'POLICY':
        return 'text-amber-200 bg-amber-950/40 border-amber-500/30';
      case 'VERIFY':
        return 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30';
      case 'INFO':
      default:
        return 'text-amber-200/50 bg-[#14120D] border-amber-500/15';
    }
  };

  return (
    <div className="bg-[#060605] rounded-xl border border-amber-500/20 flex flex-col h-[280px]">
      {/* Terminal Title Bar */}
      <div className="px-3.5 py-2 bg-[#0C0B08] border-b border-amber-500/15 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-mono font-semibold text-amber-100">
            System & AI Event Stream
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#15130E] text-amber-300/60 border border-amber-500/20">
            {filteredLogs.length} events
          </span>
        </div>

        {/* Level Filter Tabs */}
        <div className="flex items-center gap-1 text-[11px] font-mono">
          {['ALL', 'AI-AGENT', 'ERROR', 'POLICY', 'VERIFY'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-2 py-0.5 rounded transition-all ${
                filterLevel === lvl
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-bold'
                  : 'text-amber-200/60 hover:text-white hover:bg-[#1A1813]'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Logs Viewport */}
      <div 
        ref={logContainerRef}
        className="flex-1 p-3 font-mono text-[11px] space-y-1.5 overflow-y-auto overflow-x-hidden scrollbar-thin selection:bg-amber-500/30"
      >
        {filteredLogs.length === 0 ? (
          <div className="text-amber-200/40 italic p-4 text-center">
            No events match current filter.
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div 
              key={log.id} 
              className={`flex items-start gap-2 leading-relaxed py-0.5 px-1.5 rounded transition-colors ${
                log.level === 'AI-AGENT' ? 'bg-amber-950/20' : 'hover:bg-[#12110D]'
              }`}
            >
              <span className="text-amber-500/40 select-none shrink-0">
                {log.timestamp}
              </span>
              
              <span className={`px-1.5 py-0.2 rounded text-[10px] border shrink-0 ${getBadgeStyle(log.level)}`}>
                {log.level}
              </span>

              <span className="text-amber-400/80 font-medium shrink-0">
                [{log.source}]
              </span>

              <span className={`break-all ${
                log.level === 'ERROR' 
                  ? 'text-rose-300' 
                  : log.level === 'AI-AGENT'
                  ? 'text-[#FFF1C5]'
                  : log.level === 'VERIFY'
                  ? 'text-emerald-300'
                  : 'text-[#D5D0C5]'
              }`}>
                {log.message}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Terminal Footer */}
      <div className="px-3 py-1.5 bg-[#0C0B08] border-t border-amber-500/10 flex items-center justify-between text-[10px] font-mono text-amber-200/50">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Stream buffer active • OpenTelemetry collector v0.98</span>
        </div>
        <button
          onClick={() => setAutoScroll(!autoScroll)}
          className={`hover:text-amber-200 flex items-center gap-1 ${autoScroll ? 'text-amber-400' : 'text-amber-200/40'}`}
        >
          <ArrowDown className="w-3 h-3" />
          <span>Auto-scroll: {autoScroll ? 'ON' : 'OFF'}</span>
        </button>
      </div>
    </div>
  );
};
