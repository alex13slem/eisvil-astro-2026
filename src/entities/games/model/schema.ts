import { PlatformWithLinkSchema } from "@/entities/platforms/model/schema";
import { z } from "astro:schema";

export const GameSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  logo: z.string(),
  bannerDescription: z.string(),
  description: z.string(),
  shortPromoDescription: z.string(),
  bannerBg: z.string(),
  bannerFg: z.string(),
  fullBanner: z.string(),
  genre: z.string(),
  developer: z.string(),
  publisher: z.string(),
  releaseDate: z.string().nullable(),
  siteUrl: z.string().nullable(),
  decorLeft: z.string().nullable(),
  decorTop: z.string().nullable(),
  decorRight: z.string().nullable(),
  decorBottom: z.string().nullable(),

  platforms: z.array(PlatformWithLinkSchema),
});
export type Game = z.infer<typeof GameSchema>;
