import React, { useState, useRef, KeyboardEvent } from 'react';
import { cn } from '@/shared/utils/cn';
import type { InputOTPProps } from './InputOTP.types';

export const InputOTP: React.FC<InputOTPProps> = ({ length = 6, onComplete, className }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (idx: number, value: string) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (value && idx < length - 1) inputRefs.current[idx + 1]?.focus();
    if (newOtp.every(v => v) && onComplete) onComplete(newOtp.join(''));
  };

  const handleKeyDown = (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) inputRefs.current[idx - 1]?.focus();
  };

  return (
    <div className={cn('flex gap-2', className)}>
      {otp.map((digit, idx) => (
        <input
          key={idx}
          ref={el => inputRefs.current[idx] = el}
          type="text"
          maxLength={1}
          value={digit}
          onChange={e => handleChange(idx, e.target.value)}
          onKeyDown={e => handleKeyDown(idx, e)}
          className="w-12 h-14 text-center text-2xl font-bold border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:border-blue-600 focus:outline-none bg-white dark:bg-slate-800 dark:text-white"
        />
      ))}
    </div>
  );
};
