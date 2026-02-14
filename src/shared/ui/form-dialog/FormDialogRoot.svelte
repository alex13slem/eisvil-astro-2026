<script lang="ts">
  import type { Snippet } from "svelte";
  import { portal } from "svelte-portal";

  let { children }: { children: Snippet } = $props();
</script>

<div use:portal={"body"}>
  {@render children()}
</div>
