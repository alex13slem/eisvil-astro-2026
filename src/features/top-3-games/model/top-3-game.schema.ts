import { GameSchema } from "@/entities/games";
import { PlatformSchema } from "@/entities/platforms";
import { z } from "astro:schema";

export const Top3GameSchema = GameSchema.pick({
  slug: true,
  name: true,
  logo: true,
  bannerDescription: true,
  bannerBg: true,
  bannerFg: true,
  movingScenery: true,
}).extend({
  platforms: z.array(
    z.object({
      link: z.string(),
      name: PlatformSchema.shape.name,
      slug: PlatformSchema.shape.slug,
    })
  ),
});
export type Top3Game = z.infer<typeof Top3GameSchema>;
