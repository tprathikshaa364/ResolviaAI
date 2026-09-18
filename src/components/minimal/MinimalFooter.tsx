import React from 'react';
import { Shield } from 'lucide-react';

export const MinimalFooter: React.FC = () => {
  return (
    <footer className="py-12 bg-black border-t border-white/[0.06] text-xs font-mono text-[#71717A]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#F5D061] to-[#AA820A] flex items-center justify-center text-black">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <span className="font-sans font-bold text-white tracking-wide text-sm">
            Resolvia <span className="text-amber-400">AI</span>
          </span>
          <span className="text-white/20">|</span>
          <span>© 2026 Autonomous SRE</span>
        </div>

        {/* Simple Links */}
        <div className="flex items-center gap-6 text-[#A1A1AA]">
          <a href="#bento" className="hover:text-white transition-colors">Overview</a>
          <a href="#demo" className="hover:text-white transition-colors">Live Demo</a>
          <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </div>

        {/* Air-gapped status */}
        <div className="flex items-center gap-2 text-emerald-400/90">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Air-gapped simulation mode active</span>
        </div>

      </div>
    </footer>
  );
};
