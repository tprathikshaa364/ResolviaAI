import React from 'react';
import { 
  Cpu, 
  GitCommit, 
  AlertOctagon, 
  Database, 
  Activity, 
  Play
} from 'lucide-react';
import { INCIDENT_CATALOG } from '../../data/mockScenarios';
import { useSimulator } from '../../context/SimulatorContext';

export const IncidentTypesCatalog: React.FC = () => {
  const { switchScenario } = useSimulator();

  const handleSelectScenario = (scenarioId: string) => {
    switchScenario(scenarioId);
    // Scroll to simulator
    const el = document.getElementById('simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'cpu-saturation': return Cpu;
      case 'failed-deployment': return GitCommit;
      case 'service-crash': return AlertOctagon;
      case 'memory-pressure': return Database;
      case 'elevated-error-rate':
      default: return Activity;
    }
  };

  return (
    <section className="py-20 border-b border-amber-500/15 relative overflow-hidden">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-3">
            <span className="uppercase tracking-widest text-[11px] font-bold">Production Incident Catalog</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Supported Enterprise <span className="bg-gradient-to-r from-[#FFF4CC] via-[#D4AF37] to-[#E5C048] bg-clip-text text-transparent text-glow-gold">Incident Catalog</span>
          </h2>
          <p className="mt-3.5 text-[#C9C4B7] text-sm sm:text-base font-tech font-medium leading-relaxed">
            Resolvia ships with validated diagnostic signatures and policy templates for 
            distributed container and cloud-native failure modes.
          </p>
        </div>

        {/* Catalog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INCIDENT_CATALOG.map((item) => {
            const Icon = getIcon(item.id);
            const isMedium = item.riskLevel === 'MEDIUM';

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-amber-500/20 bg-[#0A0907] p-6 flex flex-col justify-between hover:border-amber-400/50 transition-all hover:scale-[1.01] group shadow-sm"
              >
                <div>
                  {/* Top: Icon + Risk Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-[#14120D] border border-amber-500/20 text-amber-400 group-hover:text-black group-hover:bg-gradient-to-r group-hover:from-[#D4AF37] group-hover:to-[#AA820A] transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                      isMedium 
                        ? 'bg-amber-500/15 text-amber-300 border-amber-400/40' 
                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    }`}>
                      {item.riskLevel} RISK • {item.execution}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-syne text-lg font-extrabold text-white mb-2.5 tracking-tight">
                    {item.title}
                  </h3>

                  {/* Trigger & Diagnosis */}
                  <div className="space-y-2 text-xs font-mono mb-4">
                    <div className="p-2.5 rounded-lg bg-[#070705] border border-amber-500/15">
                      <span className="text-rose-400 font-semibold block text-[10px] uppercase">Telemetry Trigger:</span>
                      <span className="text-[#C9C4B7]">{item.trigger}</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#070705] border border-amber-500/15">
                      <span className="text-yellow-400 font-semibold block text-[10px] uppercase">AI Diagnosis:</span>
                      <span className="text-[#C9C4B7]">{item.diagnosis}</span>
                    </div>
                  </div>

                  {/* Remediation & Verification */}
                  <div className="space-y-1.5 text-xs text-[#D5D0C5] mb-6">
                    <div>
                      <strong className="text-amber-300">Action:</strong> {item.recommendedAction}
                    </div>
                    <div className="text-[11px] text-emerald-400/90">
                      <strong>Verification:</strong> {item.verificationMethod}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA to load into simulator */}
                <button
                  onClick={() => handleSelectScenario(item.scenarioId)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#14120D] hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#AA820A] text-amber-300 hover:text-black border border-amber-500/25 transition-all shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Load Scenario into Simulator</span>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
