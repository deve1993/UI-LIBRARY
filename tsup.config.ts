import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'index.ts',
    components: 'components/index.ts',
    ui: 'components/ui/index.ts',
    sections: 'components/sections/index.ts',
    effects: 'components/effects/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: {
    compilerOptions: {
      skipLibCheck: true,
    },
  },
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: true,
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'framer-motion',
    'lucide-react',
    'clsx',
    'tailwind-merge',
    'class-variance-authority',
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
