import { defineCollection, z } from 'astro:content';

/**
 * Lesson front matter.
 *
 * Every field is optional and unknown keys are kept, because the 38 existing
 * lessons carry keys this schema does not name (e.g. proofreader-era fields).
 * Nothing is removed; the site task only adds unitNumber, unitTitle, lessonId,
 * legacy and teacherReviewed.
 */
const lessons = defineCollection({
  schema: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      author: z.string().optional(),
      readingTime: z.union([z.string(), z.number()]).optional(),
      unit: z.string().optional(),
      color: z.string().optional(),
      unitNumber: z.number().optional(),
      unitTitle: z.string().optional(),
      lessonId: z.string().optional(),
      legacy: z.boolean().default(false),
      teacherReviewed: z.boolean().default(false),
      cleanModeMapping: z.record(z.string()).optional(),
      syllabusId: z.string().optional(),
      level: z.union([z.string(), z.number()]).optional(),
      version: z.union([z.string(), z.number()]).optional(),
    })
    .passthrough(),
});

// src/content/problems holds one .json file, so this collection is data, not content.
const problems = defineCollection({
  type: 'data',
  schema: z.object({}).passthrough(),
});

export const collections = { lessons, problems };
