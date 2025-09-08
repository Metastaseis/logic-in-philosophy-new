import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// On GitHub Actions, set base to "/<repo>/"; locally it's "/"
const isCI = process.env.GITHUB_ACTIONS === 'true';
const repo = (process.env.GITHUB_REPOSITORY || '').split('/')[1] || '';
const base = isCI && repo ? `/${repo}/` : '/';

export default defineConfig({
  base,
  integrations: [tailwind({ applyBaseStyles: false }), mdx()],
  scopedStyleStrategy: 'where'
});