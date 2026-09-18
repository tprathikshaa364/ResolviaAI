import React from 'react';
import { 
  Check, 
  Info
} from 'lucide-react';

export const DifferentiationMatrix: React.FC = () => {
  const capabilities = [
    { name: 'Incident Detection & Alerting', resolvia: 'Core', datadog: 'Core', dynatrace: 'Core', pagerduty: 'Core', servicenow: 'Core' },
    { name: 'Distributed Alert Correlation', resolvia: 'Core', datadog: 'Advanced', dynatrace: 'Advanced', pagerduty: 'Advanced', servicenow: 'Core' },
    { name: 'Multi-Hypothesis AI Investigation', resolvia: 'Prototype Focus', datadog: 'Emerging', dynatrace: 'Davis AI Engine', pagerduty: 'Generative Assist', servicenow: 'Now Assist' },
    { name: 'Correlated Git Diff & Evidence Dossier', resolvia: 'Prototype Focus', datadog: 'Manual Plugin', dynatrace: 'Telemetry Links', pagerduty: 'Links', servicenow: 'Change Request' },
    { name: '3-Tier Risk Classification & Blast Guard', resolvia: 'Core Guardrail', datadog: 'Partner Tools', dynatrace: 'Runbook Automation', pagerduty: 'Process Automation', servicenow: 'Change Policy' },
    { name: 'Interactive ChatOps Human Approval Gate', resolvia: 'Integrated', datadog: 'Webhooks', dynatrace: 'ServiceNow Sync', pagerduty: 'Core', servicenow: 'Core' },
    { name: 'Autonomous Policy-Bound Remediation', resolvia: 'Prototype Focus', datadog: 'Workflow Automation', dynatrace: 'AutomationEngine', pagerduty: 'Automation Actions', servicenow: 'IntegrationHub' },
    { name: 'Closed-Loop Telemetric Recovery Verification', resolvia: 'Mandatory Loop', datadog: 'Manual Dashboard', dynatrace: 'Auto-Remediation Check', pagerduty: 'Manual / Webhook', servicenow: 'Ticket Closure' },
    { name: 'Automatic Rollback on Verification Failure', resolvia: 'Built-in Fallback', datadog: 'Custom Script', dynatrace: 'Workflow Step', pagerduty: 'Manual Trigger', servicenow: 'Change Rollback' },
    { name: 'Cryptographic Audit Trail (SHA-256)', resolvia: 'Tamper-Resistant', datadog: 'System Audit Logs', dynatrace: 'Audit Logging', pagerduty: 'Audit Trail', servicenow: 'Enterprise Audit' },
  ];

  return (
    <section id="differentiation" className="py-20 border-b border-amber-500/15 relative scroll-mt-16 overflow-hidden">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-3">
            <span className="uppercase tracking-widest text-[11px] font-bold">Market Context & Innovation Focus</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Enterprise Ecosystem <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent text-glow-gold">Differentiation</span>
          </h2>
          <p className="mt-3.5 text-[#C9C4B7] text-sm sm:text-base font-display font-medium leading-relaxed">
            Enterprise platforms like Datadog, Dynatrace, PagerDuty, and ServiceNow provide powerful observability and incident management. Resolvia focuses specifically on autonomous, policy-guarded closed-loop remediation and verifiable recovery.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="rounded-2xl border border-amber-500/25 bg-[#080705] overflow-hidden shadow-command-center mb-8">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              
              {/* Table Header */}
              <thead className="bg-[#0D0C09] border-b border-amber-500/20 text-amber-200/80 font-unbounded font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4 sm:p-5 font-bold w-2/5">Capability Area</th>
                  <th className="p-4 sm:p-5 font-bold text-amber-300 bg-amber-950/25 border-x border-amber-500/30 w-1/5">
                    Resolvia AI (Prototype)
                  </th>
                  <th className="p-4 sm:p-5 font-normal text-[#A8A295]">Datadog</th>
                  <th className="p-4 sm:p-5 font-normal text-[#A8A295]">Dynatrace</th>
                  <th className="p-4 sm:p-5 font-normal text-[#A8A295]">PagerDuty</th>
                  <th className="p-4 sm:p-5 font-normal text-[#A8A295]">ServiceNow</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-amber-500/10 font-mono text-[11px]">
                {capabilities.map((row, i) => (
                  <tr key={i} className="hover:bg-[#12110D] transition-colors">
                    
                    {/* Capability Name */}
                    <td className="p-4 sm:p-5 font-sans font-medium text-[#EFEBE4] text-xs">
                      {row.name}
                    </td>

                    {/* Resolvia AI Column */}
                    <td className="p-4 sm:p-5 font-bold text-amber-200 bg-amber-950/20 border-x border-amber-500/30">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{row.resolvia}</span>
                      </div>
                    </td>

                    {/* Datadog */}
                    <td className="p-4 sm:p-5 text-[#A8A295]">
                      {row.datadog}
                    </td>

                    {/* Dynatrace */}
                    <td className="p-4 sm:p-5 text-[#A8A295]">
                      {row.dynatrace}
                    </td>

                    {/* PagerDuty */}
                    <td className="p-4 sm:p-5 text-[#A8A295]">
                      {row.pagerduty}
                    </td>

                    {/* ServiceNow */}
                    <td className="p-4 sm:p-5 text-[#A8A295]">
                      {row.servicenow}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Ethical Statement Callout */}
        <div className="p-5 rounded-2xl bg-[#0F0E0B] border border-amber-500/20 flex items-start gap-3.5 text-xs text-[#C9C4B7] leading-relaxed max-w-4xl mx-auto shadow-sm">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-white">Our Architectural Distinction:</strong> Resolvia does not replace your monitoring stack. Rather, it functions as an autonomous execution and verification overlay that ingests signals from your existing Prometheus/Datadog instrumentation, enforces OPA policy gates, and automatically closes tickets in ServiceNow once recovery is asserted.
          </span>
        </div>

      </div>
    </section>
  );
};
