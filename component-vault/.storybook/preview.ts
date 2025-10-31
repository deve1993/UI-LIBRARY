import type { Preview } from '@storybook/react';
import '../styles/globals.css'; // Tailwind CSS

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a202c' },
        { name: 'gray', value: '#f7fafc' },
      ],
    },
  },
};

export default preview;
