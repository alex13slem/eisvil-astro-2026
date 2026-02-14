import type { BuildShareLinksOpts } from "@/shared/utils";
import type { Game } from "../model/schema";

export const getGameShareLinksOpts = ({
  slug,
  name,
  description,
}: Pick<Game, "slug" | "name" | "description">): BuildShareLinksOpts => ({
  url: "/games/" + slug,
  title: `EISVIL • ${name}`,
  text: description,
});
