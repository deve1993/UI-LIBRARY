import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { MultiStepFormProps } from './MultiStepForm.types';

export const MultiStepForm: React.FC<MultiStepFormProps> = ({ steps, onComplete, className }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1);
  const prev = () => currentStep > 0 && setCurrentStep(currentStep - 1);
  const isLast = currentStep === steps.length - 1;

  return (
    <div className={cn('max-w-2xl mx-auto p-6', className)}>
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center">
            <div className={cn('w-10 h-10 rounded-full flex items-center justify-center font-bold', idx <= currentStep ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600')}>{idx + 1}</div>
            {idx < steps.length - 1 && <div className={cn('w-20 h-1 mx-2', idx < currentStep ? 'bg-blue-600' : 'bg-slate-200')} />}
          </div>
        ))}
      </div>
      <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
        <h2 className="text-2xl font-bold mb-6 dark:text-white">{steps[currentStep].title}</h2>
        {steps[currentStep].content}
      </motion.div>
      <div className="flex justify-between mt-8">
        <button onClick={prev} disabled={currentStep === 0} className="px-6 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg disabled:opacity-50">Indietro</button>
        <button onClick={isLast ? onComplete : next} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{isLast ? 'Completa' : 'Avanti'}</button>
      </div>
    </div>
  );
};
