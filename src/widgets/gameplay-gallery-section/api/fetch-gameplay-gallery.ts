import { db } from "@/db/client";
import { directusFiles, gamesFiles } from "@/db/schema";
import { toAssetUrl } from "@/shared/utils";
import { eq, inArray } from "drizzle-orm";

export default async function fetchGameplayGallery(gameId: string) {
  const galleryItems = await db
    .select()
    .from(gamesFiles)
    .where(eq(gamesFiles.gamesId, gameId));
  const filesIds = galleryItems
    .map((item) => item.directusFilesId)
    .filter((id): id is string => !!id);
  const files = await db
    .select()
    .from(directusFiles)
    .where(inArray(directusFiles.id, filesIds));
  return files
    .sort(
      (a, b) =>
        new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime(),
    )
    .map((f) => ({
      src: toAssetUrl(f.filenameDisk as string),
      width: f.width as number,
      height: f.height as number,
    }));
}
