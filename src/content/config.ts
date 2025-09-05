import { defineCollection, z } from 'astro:content';

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
