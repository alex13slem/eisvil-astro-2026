<script lang="ts">
  import Icon from "@iconify/svelte";
  import { platformSlugToIcon } from "../lib/platform-slug-to-icon";
  import type { PlatformWithLink } from "../model/schema";

  let { platforms }: { platforms: PlatformWithLink[] } = $props();
</script>

<div class="root">
  {#each platforms as platform}
    {@const { type, icon } = platformSlugToIcon[platform.slug]}
    <a
      title={platform.name}
      href={platform.link}
      target="_blank"
      class="_platform"
    >
      {#if type === "svg"}
        {@html icon}
      {:else if type === "iconify"}
        <Icon {icon} />
      {/if}
    </a>
  {/each}
</div>

<style>
  .root {
    display: inline-flex;
    width: fit-content;
    gap: 0.5rem;
    padding: 6px 1rem;
    border-radius: 9999px;
    border: thin solid var(--color-neutral-50);
    background: color-mix(in srgb, var(--color-neutral-900), transparent 90%);
    backdrop-filter: blur(4px);

    ._platform {
      color: var(--color-neutral-50);
      font-size: 1.25rem;
    }
  }
</style>
