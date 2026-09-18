import React from 'react';
import { 
  Activity, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const MetricsPanel: React.FC = () => {
  const { metrics } = useSimulator();

  return (
    <div className="bg-[#0A0907]/90 rounded-xl border border-amber-500/20 p-4 flex flex-col">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-500/15">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-amber-400" />
          <h3 className="font-semibold text-xs tracking-wider uppercase font-mono text-amber-200">
            Real-Time Telemetry Stream
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono text-amber-200/50">OTel Live / 1s interval</span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Metric 1: HTTP Error Rate */}
        <div className={`p-3 rounded-xl border transition-all ${
          metrics.errorRate > 5 
            ? 'bg-rose-950/20 border-rose-500/40 shadow-glow-critical'
            : metrics.errorRate > 0.5
            ? 'bg-amber-950/20 border-amber-500/40'
            : 'bg-[#100F0C] border-emerald-500/30'
        }`}>
          <div className="flex items-center justify-between text-xs text-amber-200/50 mb-1">
            <span className="font-mono">HTTP 5xx Errors</span>
            {metrics.errorRate > 5 ? (
              <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
            )}
          </div>
          
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-mono font-bold ${
              metrics.errorRate > 5 ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              {metrics.errorRate.toFixed(2)}%
            </span>
          </div>

          <div className="w-full bg-[#1A1813] h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                metrics.errorRate > 5 ? 'bg-rose-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(metrics.errorRate * 4, 100)}%` }}
            />
          </div>

          <span className="text-[10px] font-mono text-amber-200/50 mt-1.5 block truncate">
            {metrics.errorRateDelta}
          </span>
        </div>

        {/* Metric 2: p99 Latency */}
        <div className={`p-3 rounded-xl border transition-all ${
          metrics.p99Latency > 1000 
            ? 'bg-amber-950/20 border-amber-500/40' 
            : 'bg-[#100F0C] border-amber-500/15'
        }`}>
          <div className="flex items-center justify-between text-xs text-amber-200/50 mb-1">
            <span className="font-mono">p99 Latency</span>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </div>

          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-mono font-bold ${
              metrics.p99Latency > 1000 ? 'text-amber-400' : 'text-white'
            }`}>
              {metrics.p99Latency}
            </span>
            <span className="text-xs font-mono text-amber-200/50">ms</span>
          </div>

          <div className="w-full bg-[#1A1813] h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                metrics.p99Latency > 1000 ? 'bg-amber-500' : 'bg-[#D4AF37]'
              }`}
              style={{ width: `${Math.min((metrics.p99Latency / 3000) * 100, 100)}%` }}
            />
          </div>

          <span className="text-[10px] font-mono text-amber-200/50 mt-1.5 block truncate">
            {metrics.latencyDelta}
          </span>
        </div>

        {/* Metric 3: Pod Health Probes */}
        <div className={`p-3 rounded-xl border transition-all ${
          !metrics.healthChecksHealthy 
            ? 'bg-rose-950/20 border-rose-500/40' 
            : 'bg-[#100F0C] border-emerald-500/30'
        }`}>
          <div className="flex items-center justify-between text-xs text-amber-200/50 mb-1">
            <span className="font-mono">K8s Pod Probes</span>
            {metrics.healthChecksHealthy ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
            )}
          </div>

          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-mono font-bold ${
              metrics.healthChecksHealthy ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {metrics.healthChecks.split(' ')[0]}
            </span>
            <span className="text-xs font-mono text-amber-200/50">Ready</span>
          </div>

          <div className="flex items-center gap-1 mt-2">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full ${
                  metrics.healthChecksHealthy 
                    ? 'bg-emerald-500' 
                    : i === 0 ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
            ))}
          </div>

          <span className="text-[10px] font-mono text-amber-200/50 mt-1.5 block truncate">
            Liveness & Readiness
          </span>
        </div>

        {/* Metric 4: Correlated Alerts */}
        <div className="p-3 rounded-xl bg-[#100F0C] border border-amber-500/15">
          <div className="flex items-center justify-between text-xs text-amber-200/50 mb-1">
            <span className="font-mono">Active Alerts</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          </div>

          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-mono font-bold ${
              metrics.activeAlerts > 0 ? 'text-amber-400' : 'text-slate-300'
            }`}>
              {metrics.activeAlerts}
            </span>
            <span className="text-xs font-mono text-amber-200/50">signals grouped</span>
          </div>

          <div className="w-full bg-[#1A1813] h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-[#D4AF37] transition-all duration-500 rounded-full"
              style={{ width: `${Math.min((metrics.activeAlerts / 20) * 100, 100)}%` }}
            />
          </div>

          <span className="text-[10px] font-mono text-amber-200/50 mt-1.5 block truncate">
            Graph correlation active
          </span>
        </div>

      </div>
    </div>
  );
};
