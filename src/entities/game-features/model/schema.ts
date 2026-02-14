import { z } from "astro:schema";

export const GameFeatureSchema = z.object({
  id: z.number(),
  gameId: z.string(),
  order: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
});
export type GameFeature = z.infer<typeof GameFeatureSchema>;
