import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // site: 'https://logic-in-philosophy.sites.tau.ac.il', // set this when we point the TAU domain
  integrations: [tailwind({ applyBaseStyles: false }), mdx()],
  scopedStyleStrategy: 'where'
});
