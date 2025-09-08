import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

const isCI = process.env.GITHUB_ACTIONS === 'true';
const repo = (process.env.GITHUB_REPOSITORY || '').split('/')[1] || '';
const base = isCI && repo ? `/${repo}/` : '/';

export default defineConfig({
  base,
  integrations: [tailwind({ applyBaseStyles: false }), mdx()],
  scopedStyleStrategy: 'where'
});