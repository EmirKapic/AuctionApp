import { ReactNode, useState } from "react";

export default function useMultistepForm(steps: ReactNode[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }

  function back() {
    setCurrentStepIndex((i) => Math.max(i - 1, 0));
  }

  function goTo(index: number) {
    setCurrentStepIndex((i) => {
      if (index > 0 && index < steps.length) return index;
      else return i;
    });
  }

  return {
    stepIndex: currentStepIndex,
    step: steps[currentStepIndex],
    next: next,
    back: back,
    goTo: goTo,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
  };
}
