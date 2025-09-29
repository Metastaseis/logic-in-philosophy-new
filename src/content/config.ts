import { defineCollection, z } from "astro:content";

// (Keep your existing news/events if you have them.)
const news = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    lang: z.enum(["en", "he", "ar"]).default("en"),
    excerpt: z.string().optional(),
  }),
});

const events = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    lang: z.enum(["en", "he", "ar"]).default("en"),
    location: z.string().optional(),
    url: z.string().optional(),
  }),
});

// Ruth Manor — Guest Lectures
const ruthLectures = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(), // ISO date
    lang: z.enum(["en", "he", "ar"]).default("en"),
    speakers: z.array(z.string()).default([]),
    note: z.string().optional(),
    materials: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    photos: z.array(z.string()).default([]), // paths under public/
  }),
});

export const collections = { news, events, ruthLectures };