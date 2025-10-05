import { defineCollection, z } from "astro:content";


const bibliography = defineCollection({
  type: "data", // <= important: this enables JSON/YAML/TS data files
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
  // keep existing:
  news,
  events,
  ruthLectures,
  // add:
  bibliography,
};