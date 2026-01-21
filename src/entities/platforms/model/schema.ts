import { z } from "astro:schema";

const PLATFORM_SLUGS = [
  "app-store",
  "google-play",
  "appgalery",
  "rustore",
] as const;
export type PlatformSlug = (typeof PLATFORM_SLUGS)[number];

export const PlatformSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.enum(PLATFORM_SLUGS),
});
export type Platform = z.infer<typeof PlatformSchema>;
