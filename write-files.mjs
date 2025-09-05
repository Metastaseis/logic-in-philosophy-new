import { mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';

const files = {
  // Root configs
  'package.json': `{
  "name": "logic-in-philosophy",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^4.14.0",
    "@astrojs/mdx": "^3.1.0",
    "@astrojs/tailwind": "^5.1.0",
    "clsx": "^2.1.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.41",
    "tailwindcss": "^3.4.9",
    "typescript": "^5.5.4"
  }
}
`,
  'astro.config.mjs': `import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://logic-in-philosophy.sites.tau.ac.il',
  integrations: [tailwind({ applyBaseStyles: false }), mdx()],
  scopedStyleStrategy: 'where'
});
`,
  'tailwind.config.cjs': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"]
      },
      colors: { link: '#0a5bd6' },
      maxWidth: { prose: '70ch' }
    }
  },
  plugins: []
};
`,
  'postcss.config.cjs': `module.exports = {
  plugins: { tailwindcss: {}, autoprefixer: {} }
};
`,
  'tsconfig.json': `{
  "compilerOptions": {
    "strict": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "target": "ES2020",
    "types": ["astro/client"]
  }
}
`,

  // Styles
  'src/styles.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: light; }
html { font-family: Georgia, Cambria, "Times New Roman", Times, serif; }
body { color: #0a0a0a; }
a { color: #0a5bd6; }
a:focus { outline: 2px solid; outline-offset: 2px; }

.main-wrap { padding-inline: 1rem; }
.container { max-width: 70ch; margin-left: auto; margin-right: auto; }

.prose { line-height: 2; font-size: 1.05rem; }
.prose h1 { font-size: 2.25rem; font-weight: 600; margin: 2rem 0 1rem; }
.prose h2 { font-size: 1.5rem; font-weight: 600; margin: 2rem 0 0.75rem; }
.prose h3 { font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.5rem; }
.prose p { margin: 1rem 0; }
.prose ul { margin: 1rem 0; padding-inline-start: 1.5rem; list-style: disc; }
.prose ol { margin: 1rem 0; padding-inline-start: 1.5rem; list-style: decimal; }
`,

  // Layout + components
  'src/layouts/BaseLayout.astro': `---
const { title = 'Logic in Philosophy', lang = 'en', dir = 'ltr' } = Astro.props;
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import "../styles.css";
---
<!DOCTYPE html>
<html lang={lang} dir={dir}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
    <title>{title}</title>
  </head>
  <body>
    <a class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 bg-yellow-200 p-2" href="#content">Skip to content</a>
    <Header lang={lang} dir={dir} />
    <main id="content" class="main-wrap container">
      <slot />
    </main>
    <Footer />
  </body>
</html>
`,
  'src/components/LangSwitcher.astro': `---
const { lang = 'en' } = Astro.props;
const langs = [
  { code: 'en', label: 'EN', dir: 'ltr' },
  { code: 'he', label: 'HE', dir: 'rtl' },
  { code: 'ar', label: 'AR', dir: 'rtl' }
];
---
<div class="text-sm">
  {langs.map((l, i) => (
    <>
      <a href={'/' + l.code + '/'} class={l.code === lang ? 'font-semibold' : 'opacity-70 hover:opacity-100'}>{l.label}</a>
      {i < langs.length - 1 ? <span class="mx-1">|</span> : null}
    </>
  ))}
</div>
`,
  'src/components/Header.astro': `---
import LangSwitcher from './LangSwitcher.astro';
const { lang = 'en' } = Astro.props;
const nav = [
  { href: \`/\${lang}/ruth-manor/\`, label: { en: 'Ruth Manor', he: 'רות מנור', ar: 'روث مانور' } },
  { href: \`/\${lang}/actah/\`, label: { en: 'ACTAH', he: 'ACTAH', ar: 'ACTAH' } },
  { href: \`/\${lang}/research-themes\`, label: { en: 'Research Themes', he: 'נושאי מחקר', ar: 'محاور البحث' } },
  { href: \`/\${lang}/news/\`, label: { en: 'News', he: 'חדשות', ar: 'أخبار' } },
  { href: \`/\${lang}/events/\`, label: { en: 'Events', he: 'אירועים', ar: 'فعاليات' } },
  { href: \`/\${lang}/people/\`, label: { en: 'People', he: 'אנשים', ar: 'أشخاص' } },
  { href: \`/\${lang}/publications\`, label: { en: 'Publications', he: 'פרסומים', ar: 'منشورات' } },
  { href: \`/\${lang}/impact\`, label: { en: 'Impact', he: 'השפעה', ar: 'أثر' } },
  { href: \`/\${lang}/teaching-guide\`, label: { en: 'Teaching Guide', he: 'מדריך הוראה', ar: 'دليل التدريس' } }
];
---
<header class="container py-6 flex items-center justify-between gap-4">
  <a href={'/' + lang + '/'} class="flex items-center gap-3">
    <img src="/logo.svg" alt="Logic in Philosophy" class="w-10 h-10" />
    <span class="text-2xl font-semibold">Logic in Philosophy</span>
  </a>
  <nav class="hidden md:flex gap-5">
    {nav.map((item) => (
      <a href={item.href} class="hover:underline">{item.label[lang]}</a>
    ))}
  </nav>
  <div class="flex items-center gap-3">
    <LangSwitcher lang={lang} />
    <details class="md:hidden">
      <summary class="cursor-pointer px-3 py-2 border rounded">Menu</summary>
      <div class="mt-2 flex flex-col gap-2 bg-white border p-3">
        {nav.map((item) => (
          <a href={item.href} class="hover:underline">{item.label[lang]}</a>
        ))}
      </div>
    </details>
  </div>
</header>
`,
  'src/components/Footer.astro': `<footer class="container py-10 text-sm opacity-80">
  <p>&copy; ${new Date().getFullYear()} Logic in Philosophy — Tel Aviv University.</p>
  <p>Contact: <a href="mailto:info@example.com">info@example.com</a></p>
</footer>
`,
  'src/components/Prose.astro': `<div class="prose">
  <slot />
</div>
`,

  // Content collections
  'src/content/config.ts': `import { defineCollection, z } from 'astro:content';

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string().optional(),
    lang: z.enum(['en','he','ar']).default('en')
  })
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    start: z.string(),
    end: z.string().optional(),
    location: z.string().optional(),
    links: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
    lang: z.enum(['en','he','ar']).default('en')
  })
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lang: z.enum(['en','he','ar']).default('en')
  })
});

export const collections = { news, events, pages };
`,
  'src/content/news/en/2025-09-03-welcome.md': `---
title: "Welcome to Logic in Philosophy"
date: "2025-09-03"
summary: "Our new website is live."
lang: en
---
We’re excited to launch our new trilingual website for Logic in Philosophy at Tel Aviv University.
`,
  'src/content/events/en/2025-10-01-launch-colloquium.md': `---
title: "Launch Colloquium"
start: "2025-10-01T17:00:00+03:00"
end: "2025-10-01T19:00:00+03:00"
location: "Gilman Building, Room 496"
lang: en
---
Short talks and a discussion on conceptual engineering and logic.
`,
  'src/content/pages/en/about.md': `---
title: "About Logic in Philosophy"
lang: en
---
Logic in Philosophy is a research initiative at Tel Aviv University focused on logic, language, and conceptual engineering.
`,
  'src/content/people/core.json': `[
  { "name": "Prof. A. Scholar", "role": "Director", "affiliation": "TAU", "url": "#" },
  { "name": "Dr. B. Researcher", "role": "Member", "affiliation": "TAU", "url": "#" },
  { "name": "C. Student", "role": "Graduate Fellow", "affiliation": "TAU", "url": "#" }
]
`,

  // Pages (simplified to avoid extra components)
  'src/pages/en/index.astro': `---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Prose from "../../components/Prose.astro";
import { getCollection } from 'astro:content';

const news = (await getCollection('news'))
  .filter(n => n.data.lang === 'en')
  .sort((a,b)=> (a.data.date < b.data.date ? 1 : -1))
  .slice(0,3);

const events = (await getCollection('events'))
  .filter(e => e.data.lang === 'en')
  .sort((a,b)=> (a.data.start > b.data.start ? 1 : -1))
  .slice(0,3);

const core = (await import('../../content/people/core.json')).default;
---
<BaseLayout title="Logic in Philosophy" lang="en" dir="ltr">
  <section class="mt-8 flex items-center gap-6">
    <img src="/logo.svg" alt="Logic in Philosophy logo" class="w-20 h-20" />
    <div class="prose">
      <p><strong>Logic in Philosophy</strong> is a research initiative at Tel Aviv University exploring logic, language, and conceptual engineering.</p>
      <p><a href="/en/teaching-guide">Teaching Guide</a> · <a href="/en/research-themes">About our themes</a></p>
    </div>
  </section>

  <section class="mt-10">
    <h2 class="text-2xl font-semibold mb-3">Participants</h2>
    <ul class="list-disc ps-6">
      {core.slice(0,3).map(p => (
        <li><a href={p.url}>{p.name}</a> — {p.role}, {p.affiliation}</li>
      ))}
    </ul>
    <p class="mt-2"><a href="/en/people/">All people →</a></p>
  </section>

  <section class="mt-10">
    <h2 class="text-2xl font-semibold mb-3">News</h2>
    {news.map(n => (
      <article class="mb-6">
        <h3 class="text-lg font-semibold"><a href={'/en/news/' + n.slug + '/'}>{n.data.title}</a></h3>
        <p class="opacity-80">{new Date(n.data.date).toLocaleDateString()}</p>
        {n.data.summary ? <p>{n.data.summary}</p> : null}
      </article>
    ))}
    <p><a href="/en/news/">All news →</a></p>
  </section>

  <section class="mt-10">
    <h2 class="text-2xl font-semibold mb-3">Events</h2>
    {events.map(e => (
      <article class="my-4">
        <h3 class="text-lg font-semibold">{e.data.title}</h3>
        <p class="opacity-80">
          {new Date(e.data.start).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
          {e.data.end ? ' – ' + new Date(e.data.end).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : ''}
          {e.data.location ? ', ' + e.data.location : ''}
        </p>
      </article>
    ))}
    <p><a href="/en/events/">All events →</a></p>
  </section>
</BaseLayout>
`,
  'src/pages/en/news/index.astro': `---
import BaseLayout from "../../../layouts/BaseLayout.astro";
import { getCollection } from 'astro:content';
const posts = (await getCollection('news')).filter(n => n.data.lang==='en').sort((a,b)=> (a.data.date<b.data.date?1:-1));
---
<BaseLayout title="News — Logic in Philosophy" lang="en" dir="ltr">
  <h1>News</h1>
  {posts.map(p => (
    <article class="mb-6">
      <h3 class="text-lg font-semibold"><a href={'/en/news/' + p.slug + '/'}>{p.data.title}</a></h3>
      <p class="opacity-80">{new Date(p.data.date).toLocaleDateString()}</p>
    </article>
  ))}
</BaseLayout>
`,
  'src/pages/en/events/index.astro': `---
import BaseLayout from "../../../layouts/BaseLayout.astro";
import { getCollection } from 'astro:content';
const items = (await getCollection('events')).filter(e=>e.data.lang==='en').sort((a,b)=> (a.data.start>b.data.start?1:-1));
const now = Date.now();
const upcoming = items.filter(e => new Date(e.data.start).getTime() >= now);
const past = items.filter(e => new Date(e.data.start).getTime() < now);
---
<BaseLayout title="Events — Logic in Philosophy" lang="en" dir="ltr">
  <h1>Events</h1>
  <p>Subscribe: <a href="#">Email list</a> · <a href="#">Google Calendar</a></p>

  <h2 class="mt-8">Upcoming</h2>
  {upcoming.length ? upcoming.map(e => (
    <article class="my-4">
      <h3 class="text-lg font-semibold">{e.data.title}</h3>
      <p class="opacity-80">
        {new Date(e.data.start).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
        {e.data.end ? ' – ' + new Date(e.data.end).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : ''}
        {e.data.location ? ', ' + e.data.location : ''}
      </p>
    </article>
  )) : <p>No upcoming events yet.</p>}

  <h2 class="mt-8">Past talks</h2>
  {past.length ? past.map(e => (
    <article class="my-4">
      <h3 class="text-lg font-semibold">{e.data.title}</h3>
      <p class="opacity-80">
        {new Date(e.data.start).toLocaleDateString()}
        {e.data.location ? ', ' + e.data.location : ''}
      </p>
    </article>
  )) : <p>No past events yet.</p>}
</BaseLayout>
`,
  'src/pages/en/people/index.astro': `---
import BaseLayout from "../../../layouts/BaseLayout.astro";
const core = (await import('../../../content/people/core.json')).default;
---
<BaseLayout title="People — Logic in Philosophy" lang="en" dir="ltr">
  <h1>People</h1>
  <h2 class="mt-6">Core participants</h2>
  <ul class="list-disc ps-6">
    {core.map(p => <li><a href={p.url}>{p.name}</a> — {p.role}, {p.affiliation}</li>)}
  </ul>
</BaseLayout>
`,
  'src/pages/en/research-themes.astro': `---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Prose from "../../components/Prose.astro";
---
<BaseLayout title="Research Themes — Logic in Philosophy" lang="en" dir="ltr">
  <h1>Research Themes</h1>
  <Prose><p>Short overview of the lab’s themes.</p></Prose>
</BaseLayout>
`,
  'src/pages/en/publications.astro': `---
import BaseLayout from "../../layouts/BaseLayout.astro";
---
<BaseLayout title="Publications — Logic in Philosophy" lang="en" dir="ltr">
  <h1>Publications</h1>
  <p>Curated list coming soon.</p>
</BaseLayout>
`,
  'src/pages/en/impact.astro': `---
import BaseLayout from "../../layouts/BaseLayout.astro";
---
<BaseLayout title="Impact — Logic in Philosophy" lang="en" dir="ltr">
  <h1>Impact</h1>
  <p>Short essay or bullet list.</p>
</BaseLayout>
`,
  'src/pages/en/teaching-guide.astro': `---
import BaseLayout from "../../layouts/BaseLayout.astro";
---
<BaseLayout title="Teaching Guide — Logic in Philosophy" lang="en" dir="ltr">
  <h1>Teaching Guide</h1>
  <p>Materials and links for teaching conceptual engineering and logic.</p>
</BaseLayout>
`,

  // Basic logo
  'public/logo.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#ffffff"/>
  <circle cx="50" cy="50" r="30" stroke="#000" fill="none" stroke-width="4"/>
  <path d="M20 50h60" stroke="#000" stroke-width="4"/>
</svg>
`
};

for (const [path, content] of Object.entries(files)) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, 'utf8');
  console.log('✔ wrote', path);
}
console.log('All files written.');
