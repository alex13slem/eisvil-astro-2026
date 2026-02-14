import { db } from "@/db/client";
import { games } from "@/db/schema";
import { hydrateGamesFileFields } from "@/entities/games/server";
import { desc } from "drizzle-orm";
import {
  GamesGalleryItemSchema,
  type GamesGalleryItem,
} from "../model/games-gallery-item.schema";

export default async function fetchGamesGallery(): Promise<GamesGalleryItem[]> {
  const gamesEntries = await db
    .select({
      slug: games.slug,
      name: games.name,
      logo: games.logo,
      fullBanner: games.fullBanner,
      shortPromoDescription: games.shortPromoDescription,
    })
    .from(games)
    .orderBy(desc(games.dateCreated));

  const { success, data, error } =
    await GamesGalleryItemSchema.array().safeParseAsync(gamesEntries);
  if (!success) throw new Error(error.message);

  return data.map(hydrateGamesFileFields);
}
