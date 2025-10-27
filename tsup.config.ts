import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'index.ts',
    components: 'components/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: {
    compilerOptions: {
      skipLibCheck: true,
    },
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
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
