import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'index.ts',
    components: 'components/index.ts',
    ui: 'components/ui/index.ts',
    sections: 'components/sections/index.ts',
    'sections-hero': 'components/sections/Hero/index.ts',
    'sections-features': 'components/sections/Features/index.ts',
    'sections-footer': 'components/sections/Footer/index.ts',
    'sections-cta': 'components/sections/CTA/index.ts',
    'sections-navigation': 'components/sections/Navigation/index.ts',
    'sections-social-proof': 'components/sections/SocialProof/index.ts',
    'sections-pricing': 'components/sections/Pricing/index.ts',
    'sections-contact': 'components/sections/Contact/index.ts',
    'sections-content': 'components/sections/Content/index.ts',
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
