import React from 'react';
import { 
  Shield, 
  Play, 
  Layers, 
  GitBranch, 
  FileText, 
  ArrowRight
} from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const Footer: React.FC = () => {
  const { startSimulation } = useSimulator();

  return (
    <footer className="bg-[#040404] border-t border-amber-500/20 relative">
      
      {/* Final High-Impact CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-3xl border border-amber-500/30 bg-[#060607] p-8 sm:p-14 text-center relative overflow-hidden shadow-command-center">

          
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6 bg-[#070708]/50 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-amber-500/20 shadow-2xl">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="uppercase tracking-widest text-[11px] font-bold">Ready for Evaluation & Production Testing</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Don't just detect incidents. <br />
              <span className="bg-gradient-to-r from-[#FFF4CC] via-[#D4AF37] to-[#E5C048] bg-clip-text text-transparent text-glow-gold">
                Resolve them. Verify them. Learn from them.
              </span>
            </h2>

            <p className="text-[#C9C4B7] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-tech font-medium">
              Experience the next generation of autonomous site reliability engineering. 
              Reduce MTTR from hours to seconds while maintaining deterministic policy control.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#simulator"
                onClick={startSimulation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-black bg-gradient-to-r from-[#F5D061] via-[#D4AF37] to-[#AA820A] hover:from-[#FFF1C5] hover:to-[#D4AF37] shadow-glow-primary transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Run the Autonomous Demo</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#architecture"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-amber-200/90 bg-[#12110D] hover:bg-[#1A1813] border border-amber-500/25 transition-all"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>View Architecture</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-amber-500/15">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#8C6C1B] flex items-center justify-center text-black font-bold shadow-glow-primary">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white">
                Resolvia <span className="text-amber-400">AI</span>
              </span>
            </div>

            <p className="text-xs text-[#A8A295] max-w-md leading-relaxed">
              Autonomous enterprise incident detection, multi-hypothesis diagnosis, 
              policy-controlled remediation, and closed-loop verification engine. 
              Engineered to eliminate SRE alert fatigue and high MTTR.
            </p>

            <div className="text-[11px] font-mono text-amber-500/50">
              Built for Autonomous AI Operations Hackathon 2026 • Enterprise SaaS Prototype
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3 text-xs font-mono">
            <span className="text-amber-200 font-bold uppercase tracking-wider block">
              Navigation
            </span>
            <ul className="space-y-2 text-[#A8A295]">
              <li><a href="#simulator" className="hover:text-amber-300 transition-colors">Live Demo Center</a></li>
              <li><a href="#how-it-works" className="hover:text-amber-300 transition-colors">How It Works</a></li>
              <li><a href="#architecture" className="hover:text-amber-300 transition-colors">System Architecture</a></li>
              <li><a href="#safety" className="hover:text-amber-300 transition-colors">Safety & Guardrails</a></li>
              <li><a href="#analytics" className="hover:text-amber-300 transition-colors">Incident Analytics</a></li>
              <li><a href="#differentiation" className="hover:text-amber-300 transition-colors">Competitive Matrix</a></li>
            </ul>
          </div>

          {/* Technical Documentation & GitHub Placeholders */}
          <div className="space-y-3 text-xs font-mono">
            <span className="text-amber-200 font-bold uppercase tracking-wider block">
              Resources & Artifacts
            </span>
            <div className="space-y-2.5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-[#0F0E0B] border border-amber-500/20 hover:border-amber-400/50 text-[#D5D0C5] hover:text-white flex items-center gap-2 transition-all"
              >
                <GitBranch className="w-4 h-4 text-amber-400" />
                <span>GitHub Repository</span>
              </a>

              <a
                href="#architecture"
                className="p-2.5 rounded-lg bg-[#0F0E0B] border border-amber-500/20 hover:border-amber-400/50 text-[#D5D0C5] hover:text-white flex items-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>System Specifications</span>
              </a>

              <div className="text-[11px] text-amber-200/40 pt-1">
                Zero telemetry credentials stored in client. Fully air-gapped simulation mode active.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-amber-500/10 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-200/40 font-mono gap-3">
          <div>
            © 2026 Resolvia AI Engine. All rights reserved.
          </div>
          <div>
            Observe → Reason → Decide → Act → Verify
          </div>
        </div>

      </div>
    </footer>
  );
};
