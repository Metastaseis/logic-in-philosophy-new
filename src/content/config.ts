import { defineCollection, z } from 'astro:content';

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string().optional(),
    lang: z.enum(['en','he','ar']).default('en'),
    excerpt: z.string().optional(),
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
    lang: z.enum(['en','he','ar']).default('en'),
    url: z.string().optional()
  })
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lang: z.enum(['en','he','ar']).default('en')
  })
});

const ruthLectures = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(), // ISO date
    lang: z.enum(["en", "he", "ar"]).default("en"),
    speakers: z.array(z.string()).default([]),
    note: z.string().optional(),
    materials: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
        })
      )
      .default([]),
    photos: z.array(z.string()).default([]), // filenames under public/ruth-manor/photos/
  }),
});

export const collections = { news, events, pages };
