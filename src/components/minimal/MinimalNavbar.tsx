import React from 'react';
import { Shield, Play, Terminal, Maximize2 } from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const MinimalNavbar: React.FC<{ onToggleCockpit?: () => void; isCockpitExpanded?: boolean }> = ({
  onToggleCockpit,
  isCockpitExpanded
}) => {
  const { currentState, startSimulation, isPlaying } = useSimulator();

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#F5D061] to-[#AA820A] flex items-center justify-center text-black shadow-glow-primary group-hover:scale-105 transition-transform">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-sans font-bold text-white tracking-tight text-base">
            Resolvia <span className="text-amber-400">AI</span>
          </span>
        </a>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#A1A1AA]">
          <a href="#bento" className="hover:text-white transition-colors">Overview</a>
          <a href="#demo" className="hover:text-white transition-colors">Live Demo</a>
          <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-3">
          {/* Live State Badge */}
          <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/[0.03] border border-white/[0.08] text-[#A1A1AA]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="uppercase">{currentState}</span>
          </div>

          {onToggleCockpit && (
            <button
              onClick={onToggleCockpit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#A1A1AA] hover:text-white text-xs font-mono border border-white/[0.08] transition-colors"
              title="Toggle Full SRE Cockpit"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isCockpitExpanded ? 'Lite View' : 'Full Cockpit'}</span>
            </button>
          )}

          <a
            href="#demo"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white text-black hover:bg-white/90 font-semibold text-xs transition-all"
          >
            <Play className="w-3 h-3 fill-black" />
            <span>Launch</span>
          </a>
        </div>

      </div>
    </header>
  );
};
