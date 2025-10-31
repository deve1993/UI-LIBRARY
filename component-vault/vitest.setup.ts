import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { toHaveNoViolations } from 'jest-axe';

// Extend Vitest's expect with jest-dom matchers
expect.extend(jestDomMatchers);

// Extend Vitest's expect with jest-axe matchers
expect.extend({ toHaveNoViolations });

// Cleanup after each test
afterEach(() => {
  cleanup();
});
