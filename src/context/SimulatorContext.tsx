import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  IncidentScenario,
  SimulatorState,
  MetricSnapshot,
  LogEntry,
  RootCauseCandidate
} from '../types/incident';
import {
  SCENARIOS,
  SCENARIO_PAYMENT_FAILURE,
  SCENARIO_LOW_CONFIDENCE_DB
} from '../data/mockScenarios';

interface SimulatorContextType {
  activeScenario: IncidentScenario;
  currentState: SimulatorState;
  currentStepIndex: number;
  isPlaying: boolean;
  playbackSpeed: number; // 1 or 2
  metrics: MetricSnapshot;
  logs: LogEntry[];
  isDemoMode: boolean;
  isEvaluatorModalOpen: boolean;
  isWhyModalOpen: boolean;
  selectedCandidate: RootCauseCandidate | null;
  approvalStatus: 'none' | 'pending' | 'approved' | 'rejected';
  
  // Actions
  startSimulation: () => void;
  pauseSimulation: () => void;
  resumeSimulation: () => void;
  resetSimulation: () => void;
  nextStep: () => void;
  goToStep: (index: number) => void;
  approveRemediation: () => void;
  rejectRemediation: () => void;
  triggerManualRollback: () => void;
  switchScenario: (scenarioId: string) => void;
  toggleDemoMode: () => void;
  setIsDemoMode: (val: boolean) => void;
  toggleEvaluatorModal: () => void;
  setIsEvaluatorModalOpen: (val: boolean) => void;
  openWhyModal: (candidate: RootCauseCandidate) => void;
  closeWhyModal: () => void;
}

const SimulatorContext = createContext<SimulatorContextType | undefined>(undefined);

export const SimulatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeScenario, setActiveScenario] = useState<IncidentScenario>(SCENARIO_PAYMENT_FAILURE);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [isEvaluatorModalOpen, setIsEvaluatorModalOpen] = useState<boolean>(false);
  const [isWhyModalOpen, setIsWhyModalOpen] = useState<boolean>(false);
  const [selectedCandidate, setSelectedCandidate] = useState<RootCauseCandidate | null>(null);
  const [approvalStatus, setApprovalStatus] = useState<'none' | 'pending' | 'approved' | 'rejected'>('none');

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentTimelineEvent = activeScenario.timeline[currentStepIndex] || activeScenario.timeline[0];
  const currentState: SimulatorState = currentTimelineEvent.stateTarget;

  // Gather active metrics based on current state
  const metrics: MetricSnapshot = activeScenario.metricsByState[currentState] || activeScenario.metricsByState.IDLE;

  // Gather logs cumulatively up to current state
  const logs: LogEntry[] = React.useMemo(() => {
    const accumulated: LogEntry[] = [];
    const seenIds = new Set<string>();

    for (let i = 0; i <= currentStepIndex; i++) {
      const step = activeScenario.timeline[i];
      const stateLogs = activeScenario.logsByState[step.stateTarget] || [];
      for (const log of stateLogs) {
        if (!seenIds.has(log.id)) {
          seenIds.add(log.id);
          accumulated.push(log);
        }
      }
    }
    return accumulated;
  }, [activeScenario, currentStepIndex]);

  // Handle Confetti on Resolution
  useEffect(() => {
    if (currentState === 'RESOLVED') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F5D061', '#AA820A', '#10B981', '#FFF1C5']
      });
    }
  }, [currentState]);

  // Next Step handler
  const nextStep = useCallback(() => {
    if (currentStepIndex < activeScenario.timeline.length - 1) {
      const nextIdx = currentStepIndex + 1;
      const nextTargetState = activeScenario.timeline[nextIdx].stateTarget;

      // If next step requires approval and it hasn't been granted, pause simulation
      if (nextTargetState === 'WAITING_APPROVAL' && approvalStatus !== 'approved') {
        setIsPlaying(false);
        setApprovalStatus('pending');
      }

      setCurrentStepIndex(nextIdx);
    } else {
      setIsPlaying(false);
    }
  }, [currentStepIndex, activeScenario, approvalStatus]);

  const goToStep = useCallback((index: number) => {
    if (index >= 0 && index < activeScenario.timeline.length) {
      setCurrentStepIndex(index);
      const targetState = activeScenario.timeline[index].stateTarget;
      if (targetState === 'WAITING_APPROVAL' && approvalStatus !== 'approved') {
        setApprovalStatus('pending');
        setIsPlaying(false);
      }
    }
  }, [activeScenario, approvalStatus]);

  // Auto-play interval
  useEffect(() => {
    if (isPlaying) {
      const currentStep = activeScenario.timeline[currentStepIndex];
      // If waiting for approval, pause and wait for user
      if (currentStep.stateTarget === 'WAITING_APPROVAL' && approvalStatus !== 'approved') {
        setIsPlaying(false);
        setApprovalStatus('pending');
        return;
      }

      const delay = (currentStep.stateTarget === 'REMEDIATING' || currentStep.stateTarget === 'VERIFYING' ? 3200 : 2500) / playbackSpeed;
      timerRef.current = setTimeout(() => {
        nextStep();
      }, delay);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, activeScenario, playbackSpeed, approvalStatus, nextStep]);

  const startSimulation = useCallback(() => {
    if (currentStepIndex >= activeScenario.timeline.length - 1) {
      setCurrentStepIndex(0);
      setApprovalStatus('none');
    }
    setIsPlaying(true);
  }, [currentStepIndex, activeScenario]);

  const pauseSimulation = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resumeSimulation = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const resetSimulation = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setApprovalStatus('none');
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const approveRemediation = useCallback(() => {
    setApprovalStatus('approved');
    // Advance to REMEDIATING
    const remediateStepIndex = activeScenario.timeline.findIndex(t => t.stateTarget === 'REMEDIATING');
    if (remediateStepIndex !== -1) {
      setCurrentStepIndex(remediateStepIndex);
      setIsPlaying(true);
    }
  }, [activeScenario]);

  const rejectRemediation = useCallback(() => {
    setApprovalStatus('rejected');
    setIsPlaying(false);
    // Move to ESCALATED
    const escalateStep = activeScenario.timeline.findIndex(t => t.stateTarget === 'ESCALATED');
    if (escalateStep !== -1) {
      setCurrentStepIndex(escalateStep);
    }
  }, [activeScenario]);

  const triggerManualRollback = useCallback(() => {
    setIsPlaying(false);
    const rollbackStep = activeScenario.timeline.findIndex(t => t.stateTarget === 'ROLLBACK' || t.stateTarget === 'REMEDIATING');
    if (rollbackStep !== -1) {
      setCurrentStepIndex(rollbackStep);
    }
  }, [activeScenario]);

  const switchScenario = useCallback((scenarioId: string) => {
    const found = SCENARIOS.find(s => s.id === scenarioId) || SCENARIO_PAYMENT_FAILURE;
    setActiveScenario(found);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setApprovalStatus('none');
  }, []);

  const toggleDemoMode = useCallback(() => {
    setIsDemoMode(prev => !prev);
  }, []);

  const toggleEvaluatorModal = useCallback(() => {
    setIsEvaluatorModalOpen(prev => !prev);
  }, []);

  const openWhyModal = useCallback((candidate: RootCauseCandidate) => {
    setSelectedCandidate(candidate);
    setIsWhyModalOpen(true);
  }, []);

  const closeWhyModal = useCallback(() => {
    setIsWhyModalOpen(false);
    setSelectedCandidate(null);
  }, []);

  return (
    <SimulatorContext.Provider
      value={{
        activeScenario,
        currentState,
        currentStepIndex,
        isPlaying,
        playbackSpeed,
        metrics,
        logs,
        isDemoMode,
        isEvaluatorModalOpen,
        isWhyModalOpen,
        selectedCandidate,
        approvalStatus,
        startSimulation,
        pauseSimulation,
        resumeSimulation,
        resetSimulation,
        nextStep,
        goToStep,
        approveRemediation,
        rejectRemediation,
        triggerManualRollback,
        switchScenario,
        toggleDemoMode,
        setIsDemoMode,
        toggleEvaluatorModal,
        setIsEvaluatorModalOpen,
        openWhyModal,
        closeWhyModal,
      }}
    >
      {children}
    </SimulatorContext.Provider>
  );
};

export const useSimulator = (): SimulatorContextType => {
  const context = useContext(SimulatorContext);
  if (!context) {
    throw new Error('useSimulator must be used within a SimulatorProvider');
  }
  return context;
};
