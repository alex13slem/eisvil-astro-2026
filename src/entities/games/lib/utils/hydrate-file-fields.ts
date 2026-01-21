import { hydrateFileFields } from "@/shared/utils";
import type { Game } from "../../model/schema";

const FILE_FIELDS = [
  "logo",
  "bannerBg",
  "bannerFg",
  "fullBanner",
  "movingScenery",
] as const satisfies readonly (keyof Game)[];

export const hydrateGamesFileFields = <T extends Partial<Game>>(game: T) =>
  hydrateFileFields(game, FILE_FIELDS);
