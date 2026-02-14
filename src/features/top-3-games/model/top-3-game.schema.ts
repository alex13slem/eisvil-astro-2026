import { GameSchema } from "@/entities/games";
import { z } from "astro:schema";

export const Top3GameSchema = GameSchema.pick({
  slug: true,
  name: true,
  logo: true,
  bannerDescription: true,
  bannerBg: true,
  bannerFg: true,
  platforms: true,
});
export type Top3Game = z.infer<typeof Top3GameSchema>;
