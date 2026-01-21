import { GameSchema } from "@/entities/games";
import { z } from "astro:schema";

export const GamesGalleryItemSchema = GameSchema.pick({
  slug: true,
  name: true,
  logo: true,
  fullBanner: true,
  shortPromoDescription: true,
});
export type GamesGalleryItem = z.infer<typeof GamesGalleryItemSchema>;
