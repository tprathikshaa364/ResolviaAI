import React from 'react';
import { SimulatorProvider } from './context/SimulatorContext';
import { Navbar } from './components/layout/Navbar';
import { HeroCommandCenter } from './components/hero/HeroCommandCenter';
import { HackathonBriefing } from './components/mission/HackathonBriefing';
import { LiveIncidentSimulator } from './components/simulator/LiveIncidentSimulator';
import { HowItWorks } from './components/howitworks/HowItWorks';
import { ProblemImpact } from './components/problem/ProblemImpact';
import { SafetyGuardrails } from './components/safety/SafetyGuardrails';
import { ArchitectureDiagram } from './components/architecture/ArchitectureDiagram';
import { IncidentTypesCatalog } from './components/catalog/IncidentTypesCatalog';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { DifferentiationMatrix } from './components/differentiation/DifferentiationMatrix';
import { TechnicalInnovation } from './components/innovation/TechnicalInnovation';
import { Footer } from './components/layout/Footer';
import { WhyEvidenceModal } from './components/modals/WhyEvidenceModal';
import { EvaluatorChecklistModal } from './components/modals/EvaluatorChecklistModal';
import { PresentationModeModal } from './components/presentation/PresentationModeModal';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#040405] text-[#EFEBE4] flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* 1. Sticky Navigation Header with Dynamic ScrollSpy */}
      <Navbar />

      {/* 2. Main Comprehensive Incident Resolution Platform */}
      <main className="flex-1">
        {/* Hero Section with Live Telemetry Pilot Cockpit */}
        <HeroCommandCenter />

        {/* Official Hackathon Problem Statement & Solution Mapping (AI-01) */}
        <HackathonBriefing />

        {/* The Centerpiece: Live Autonomous SRE Simulator */}
        <LiveIncidentSimulator />

        {/* Core Operating Model: Observe -> Reason -> Decide -> Act -> Verify */}
        <HowItWorks />

        {/* Enterprise Problem & SRE Toil Impact */}
        <ProblemImpact />

        {/* Safety, Governance & Deterministic Guardrails */}
        <SafetyGuardrails />

        {/* Interactive Technical System Architecture */}
        <ArchitectureDiagram />

        {/* Production Incident Catalog */}
        <IncidentTypesCatalog />

        {/* Incident Analytics & MTTR Comparisons */}
        <AnalyticsDashboard />

        {/* Market Context & Competitive Differentiation Matrix */}
        <DifferentiationMatrix />

        {/* 10 Technical Innovation Pillars & Technology Stack */}
        <TechnicalInnovation />
      </main>

      {/* 3. Global Footer & Executive Summary */}
      <Footer />

      {/* Global AI Modals & Diagnostic Walkthroughs */}
      <WhyEvidenceModal />
      <EvaluatorChecklistModal />
      <PresentationModeModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SimulatorProvider>
      <AppContent />
    </SimulatorProvider>
  );
};

export default App;
