import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Play, 
  Award, 
  Menu, 
  X, 
  ChevronRight,
  Activity
} from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const Navbar: React.FC = () => {
  const { 
    currentState, 
    activeScenario, 
    switchScenario, 
    toggleDemoMode, 
    toggleEvaluatorModal 
  } = useSimulator();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('mission');

  const navItems = [
    { id: 'mission', label: 'AI-01 Mission' },
    { id: 'simulator', label: 'Live Demo' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'safety', label: 'Safety' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'differentiation', label: 'Differentiation' },
  ];

  // Dynamic ScrollSpy: Tracks currently visible section as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180; // 180px offset for sticky header & trigger margin
      const sectionIds = ['mission', 'simulator', 'how-it-works', 'architecture', 'safety', 'analytics', 'differentiation'];

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            return;
          }
        }
      }
      setActiveSection('mission');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Status color pill
  const getStatusBadge = () => {
    switch (currentState) {
      case 'IDLE':
        return { text: 'Engine Ready', bg: 'bg-[#14120C]', border: 'border-amber-500/20', dot: 'bg-amber-400/60' };
      case 'INCIDENT_DETECTED':
      case 'INVESTIGATING':
        return { text: 'SEV-1 Active', bg: 'bg-rose-500/10', border: 'border-rose-500/30', dot: 'bg-rose-500 animate-ping' };
      case 'WAITING_APPROVAL':
        return { text: 'Approval Required', bg: 'bg-amber-500/15', border: 'border-amber-400/50', dot: 'bg-amber-400 animate-pulse' };
      case 'REMEDIATING':
        return { text: 'Remediating', bg: 'bg-amber-950/30', border: 'border-amber-500/40', dot: 'bg-amber-300 animate-pulse' };
      case 'VERIFYING':
        return { text: 'Verifying Signals', bg: 'bg-yellow-950/30', border: 'border-yellow-500/40', dot: 'bg-yellow-400 animate-spin' };
      case 'RESOLVED':
        return { text: 'Resolved & Verified', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', dot: 'bg-emerald-400' };
      case 'ESCALATED':
        return { text: 'Escalated to Human', bg: 'bg-amber-500/10', border: 'border-amber-500/30', dot: 'bg-amber-400' };
      default:
        return { text: currentState, bg: 'bg-[#121214]', border: 'border-white/10', dot: 'bg-slate-400' };
    }
  };

  const status = getStatusBadge();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-500/15 bg-[#050505]/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Badges - Single clean row, NO wrapping */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E6C045] via-[#D4AF37] to-[#8C6C1B] flex items-center justify-center shadow-glow-primary border border-amber-300/40 group-hover:scale-105 transition-transform shrink-0">
              <Shield className="w-4 h-4 text-black stroke-[2.5]" />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-unbounded font-black text-sm sm:text-base tracking-tight text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
                Resolvia <span className="text-amber-400">AI</span>
              </span>
              <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black whitespace-nowrap shrink-0 shadow-sm leading-none">
                AI-01
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold whitespace-nowrap shrink-0 hidden md:inline-block leading-none">
                Enterprise
              </span>
            </div>
          </a>

          {/* Engine Status Chip - High screen widths only */}
          <div className={`hidden 2xl:flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono border ${status.bg} ${status.border} shrink-0 whitespace-nowrap`}>
            <span className={`w-2 h-2 rounded-full ${status.dot}`} />
            <span className="text-amber-100">{status.text}</span>
            <span className="text-amber-500/40">|</span>
            <span className="text-amber-300 font-semibold">{activeScenario.incidentId}</span>
          </div>
        </div>

        {/* Desktop Nav Links with Dynamic ScrollSpy Indicator */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs xl:text-sm font-medium whitespace-nowrap bg-[#0C0B08]/80 p-1 rounded-xl border border-amber-500/20 backdrop-blur-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-black font-extrabold bg-gradient-to-r from-[#F5D061] via-[#D4AF37] to-[#AA820A] shadow-glow-primary scale-[1.03]'
                    : 'text-[#C9C4B7] hover:text-amber-200 hover:bg-amber-500/10'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                )}
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls - Always crisp, right-aligned, shrink-0 */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* Quick Scenario Selector (Visible on large screens) */}
          <div className="hidden xl:flex items-center bg-[#0C0B08] border border-amber-500/20 rounded-lg p-0.5 text-xs shrink-0 whitespace-nowrap">
            <button
              onClick={() => switchScenario('payment-api-failure')}
              className={`px-2.5 py-1 rounded font-medium text-[11px] font-mono transition-all whitespace-nowrap ${
                activeScenario.id === 'payment-api-failure'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89228] text-black font-bold shadow-sm'
                  : 'text-amber-200/60 hover:text-amber-100'
              }`}
            >
              SEV-1 Rollback
            </button>
            <button
              onClick={() => switchScenario('database-latency-anomaly')}
              className={`px-2.5 py-1 rounded font-medium text-[11px] font-mono transition-all whitespace-nowrap ${
                activeScenario.id === 'database-latency-anomaly'
                  ? 'bg-amber-600 text-white font-bold shadow-sm'
                  : 'text-amber-200/60 hover:text-amber-100'
              }`}
              title="Demonstrates Responsible AI Guardrail"
            >
              Low Conf (51%)
            </button>
          </div>

          {/* Evaluator Checklist Button */}
          <button
            onClick={toggleEvaluatorModal}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-500/30 transition-all hover:shadow-glow-primary shrink-0 whitespace-nowrap"
            title="Open Hackathon Judge & Evaluator View"
          >
            <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">Evaluator View</span>
          </button>

          {/* 2-Min Demo Mode Toggle */}
          <button
            onClick={toggleDemoMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-[#F5D061] via-[#D4AF37] to-[#AA820A] hover:from-[#FFF1C5] hover:to-[#D4AF37] text-black shadow-glow-primary transition-all active:scale-95 shrink-0 whitespace-nowrap"
            title="Full-Screen 2-Minute Pitch Command Center"
          >
            <Play className="w-3 h-3 fill-current shrink-0" />
            <span>Demo Mode</span>
          </button>

          {/* Mobile menu hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-amber-300 hover:text-white hover:bg-[#15140F] shrink-0"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-amber-500/20 bg-[#080806] px-4 pt-3 pb-5 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-amber-500/15">
            <button
              onClick={() => { switchScenario('payment-api-failure'); setMobileMenuOpen(false); }}
              className={`p-2 rounded text-xs text-left font-medium border ${
                activeScenario.id === 'payment-api-failure'
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                  : 'bg-[#11100D] border-amber-500/10 text-amber-200/60'
              }`}
            >
              Demo 1: SEV-1 Payment Rollback
            </button>
            <button
              onClick={() => { switchScenario('database-latency-anomaly'); setMobileMenuOpen(false); }}
              className={`p-2 rounded text-xs text-left font-medium border ${
                activeScenario.id === 'database-latency-anomaly'
                  ? 'bg-amber-600/30 border-amber-500 text-amber-300 font-bold'
                  : 'bg-[#11100D] border-amber-500/10 text-amber-200/60'
              }`}
            >
              Demo 2: Responsible AI (51%)
            </button>
          </div>

          <nav className="flex flex-col space-y-1.5 text-sm text-[#D5D0C5] font-medium">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F5D061] via-[#D4AF37] to-[#AA820A] text-black font-extrabold shadow-sm'
                      : 'hover:bg-amber-500/10 text-[#D5D0C5] hover:text-amber-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isActive && <span className="w-2 h-2 rounded-full bg-black animate-pulse" />}
                    <span>{item.label}</span>
                  </span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-black font-bold' : 'text-amber-500/50'}`} />
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
