import { db } from "@/db/client";
import { gamePlatformLinks, games, platforms } from "@/db/schema";
import { type Game } from "@/entities/games";
import type { PlatformSlug } from "@/entities/platforms";
import { eq, inArray } from "drizzle-orm";
import { GameSchema } from "../model/schema";
import { hydrateGamesFileFields } from "../server";

export default async function fetchGames(): Promise<Game[]> {
  const gamesEntries = await db.select().from(games);
  if (!gamesEntries.length) return [];

  const gamesIds = gamesEntries.map((row) => row.id);

  const joinedRows = await db
    .select({
      gameId: gamePlatformLinks.gameId,
      link: gamePlatformLinks.link,
      platformName: platforms.name,
      platformSlug: platforms.slug,
    })
    .from(gamePlatformLinks)
    .leftJoin(platforms, eq(platforms.id, gamePlatformLinks.platformId))
    .where(inArray(gamePlatformLinks.gameId, gamesIds));

  const gamesById = new Map<
    string,
    (typeof gamesEntries)[number] & { platforms: Game["platforms"] }
  >();

  for (const game of gamesEntries) {
    gamesById.set(game.id, { ...game, platforms: [] });
  }

  for (const row of joinedRows) {
    const target = gamesById.get(row.gameId!);
    if (!target) continue;
    if (!row.link || !row.platformName || !row.platformSlug) continue;
    target.platforms.push({
      link: row.link,
      name: row.platformName,
      slug: row.platformSlug as PlatformSlug,
    });
  }

  const gamesWithPlatforms = Array.from(gamesById.values());

  const { success, data, error } =
    await GameSchema.array().safeParseAsync(gamesWithPlatforms);
  if (!success) throw new Error(error.message);

  return data.map(hydrateGamesFileFields);
}
