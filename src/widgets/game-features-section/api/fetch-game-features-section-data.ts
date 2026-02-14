import { db } from "@/db/client";
import { gameFeatures, games } from "@/db/schema";
import { GameFeatureSchema } from "@/entities/game-features";
import { GameSchema } from "@/entities/games";
import { toAssetUrl } from "@/shared/utils";
import { z } from "astro:schema";
import { eq } from "drizzle-orm";

export default async function fetchGameFeaturesSectionData(gameId: string) {
  const [{ decorLeft, decorTop, decorRight, decorBottom }] = await db
    .select({
      decorLeft: games.decorLeft,
      decorTop: games.decorTop,
      decorRight: games.decorRight,
      decorBottom: games.decorBottom,
    })
    .from(games)
    .where(eq(games.id, gameId));
  const features = await db
    .select()
    .from(gameFeatures)
    .where(eq(gameFeatures.gameId, gameId));

  const { success, data } = await z
    .object({
      decorLeft: GameSchema.shape.decorLeft,
      decorTop: GameSchema.shape.decorTop,
      decorRight: GameSchema.shape.decorRight,
      decorBottom: GameSchema.shape.decorBottom,
      features: z.array(GameFeatureSchema),
    })
    .safeParseAsync({
      decorLeft: toAssetUrl(decorLeft),
      decorTop: toAssetUrl(decorTop),
      decorRight: toAssetUrl(decorRight),
      decorBottom: toAssetUrl(decorBottom),
      features: features.map((f) => ({ ...f, image: toAssetUrl(f.image) })),
    });

  if (!success) throw new Error("Error fetching game features");
  return data;
}
export type GameFeaturesSectionData = Awaited<
  ReturnType<typeof fetchGameFeaturesSectionData>
>;
