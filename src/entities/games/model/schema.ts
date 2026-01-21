import { z } from "astro:schema";

export const GameSchema = z.object({
  id: z.string(),
  userCreated: z.string(),
  dateCreated: z.string(),
  userUpdated: z.string(),
  dateUpdated: z.string(),
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
  movingScenery: z.string(),
});
export type Game = z.infer<typeof GameSchema>;
