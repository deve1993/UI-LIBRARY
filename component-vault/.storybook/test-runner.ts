import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  async postRender(page) {
    // Wait for fonts and images to load
    await page.waitForLoadState('networkidle');

    // Check for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error('Console error in story:', msg.text());
      }
    });

    // Check for runtime errors
    page.on('pageerror', error => {
      console.error('Page error in story:', error.message);
      throw error;
    });
  },
};

export default config;
