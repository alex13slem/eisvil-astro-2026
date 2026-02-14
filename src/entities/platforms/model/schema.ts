import { z } from "astro:schema";

const PLATFORM_SLUGS = [
  "app-store",
  "google-play",
  "appgalery",
  "rustore",
] as const;
export type PlatformSlug = (typeof PLATFORM_SLUGS)[number];

export const PlatformSchema = z.object({
  name: z.string(),
  slug: z.enum(PLATFORM_SLUGS),
});
export type Platform = z.infer<typeof PlatformSchema>;

export const PlatformWithLinkSchema = PlatformSchema.extend({
  link: z.string(),
});
export type PlatformWithLink = z.infer<typeof PlatformWithLinkSchema>;
