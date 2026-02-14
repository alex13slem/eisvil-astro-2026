<script lang="ts">
  import { SharedBlock } from "@/shared/ui";
  import { getGameShareLinksOpts } from "../lib/get-game-share-links-opts";
  import type { Game } from "../model/schema";

  let props: Pick<Game, "slug" | "name" | "description"> = $props();
</script>

<SharedBlock {...getGameShareLinksOpts(props)} />
