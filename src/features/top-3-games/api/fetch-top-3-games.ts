import { db } from "@/db/client";
import {
  gamePlatformLinks,
  games,
  platforms,
  settingsGames1,
} from "@/db/schema";
import { hydrateGamesFileFields } from "@/entities/games/server";
import type { PlatformSlug } from "@/entities/platforms";
import { eq, inArray } from "drizzle-orm";
import { type Top3Game, Top3GameSchema } from "../model/top-3-game.schema";

export default async function fetchTop3Games(): Promise<Top3Game[]> {
  const settingsGamesEntries = await db
    .select({ gamesId: settingsGames1.gamesId })
    .from(settingsGames1);
  const gamesIds = settingsGamesEntries
    .map((row) => row.gamesId)
    .filter((id): id is string => !!id);

  const top3GamesEntries = gamesIds.length
    ? await db.select().from(games).where(inArray(games.id, gamesIds)).limit(3)
    : [];

  const top3GameIds = top3GamesEntries.map((game) => game.id);
  const joinedRows = top3GameIds.length
    ? await db
        .select({
          gameId: gamePlatformLinks.gameId,
          link: gamePlatformLinks.link,
          platformId: platforms.id,
          platformName: platforms.name,
          platformSlug: platforms.slug,
        })
        .from(gamePlatformLinks)
        .leftJoin(platforms, eq(platforms.id, gamePlatformLinks.platformId))
        .where(inArray(gamePlatformLinks.gameId, top3GameIds))
    : [];

  const gamesById = new Map<
    string,
    (typeof top3GamesEntries)[number] & {
      platforms: Top3Game["platforms"][number][];
    }
  >();

  for (const game of top3GamesEntries) {
    gamesById.set(game.id, { ...game, platforms: [] });
  }

  for (const row of joinedRows) {
    const target = gamesById.get(row.gameId!);
    if (target) {
      target.platforms.push({
        link: row.link!,
        name: row.platformName!,
        slug: row.platformSlug as PlatformSlug,
      });
    }
  }

  const top3GamesWithPlatforms = Array.from(gamesById.values());

  const { success, data, error } = await Top3GameSchema.array().safeParseAsync(
    top3GamesWithPlatforms,
  );
  if (!success) throw new Error(error.message);

  return data.map(hydrateGamesFileFields);
}
