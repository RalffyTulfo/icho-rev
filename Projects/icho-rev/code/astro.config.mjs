import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeDropFirstH1 from './rehype-drop-first-h1.mjs';
import cardAnchor from './src/plugins/card-anchor.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://ralffytulfo.github.io',
  base: '/icho-rev/',
  integrations: [
    mdx(),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeDropFirstH1, cardAnchor],
  },
});
