import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility per combinare classi CSS condizionalmente con supporto Tailwind CSS
 * Combina clsx per classi condizionali e tailwind-merge per deduplic azione intelligente
 *
 * @example
 * cn('px-2 py-1', 'px-4') // => 'py-1 px-4' (rimuove px-2 conflittuale)
 * cn('base-class', condition && 'conditional-class')
 * cn({ 'text-red-500': isError }, 'text-base')
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export default cn;
