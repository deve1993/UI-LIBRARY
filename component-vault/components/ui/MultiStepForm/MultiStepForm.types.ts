import type { ReactNode } from 'react';

export interface FormStep {
  title: string;
  content: ReactNode;
}

export interface MultiStepFormProps {
  steps: FormStep[];
  onComplete?: (data: any) => void;
  className?: string;
}
