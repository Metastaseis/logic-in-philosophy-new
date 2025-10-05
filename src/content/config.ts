import { defineCollection, z } from "astro:content";

/** News posts (markdown) */
const news = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(), // ISO
    lang: z.enum(["en", "he", "ar"]).default("en"),
    excerpt: z.string().optional(),
  }),
});

/** Events (markdown) */
const events = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(), // ISO
    lang: z.enum(["en", "he", "ar"]).default("en"),
    location: z.string().optional(),
    url: z.string().optional(),
  }),
});

/** Ruth Manor Guest Lectures (markdown) */
const ruthLectures = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(), // ISO
    lang: z.enum(["en", "he", "ar"]).default("en"),
    speakers: z.array(z.string()).default([]),
    note: z.string().optional(),
    materials: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    photos: z.array(z.string()).default([]),
  }),
});

/** Bibliography (JSON data collection) */
const bibliography = defineCollection({
  type: "data",
  schema: z.array(
    z.object({
      author: z.string(),
      title: z.string(),
      year: z.union([z.number(), z.string()]),
      venue: z.string().optional(),
      url: z.string().url().optional(),
      note: z.string().optional(),
    })
  ),
});

export const collections = {
  news,
  events,
  ruthLectures,
  bibliography,
};