<script lang="ts">
  import { buildShareLinks, type BuildShareLinksOpts } from "@/shared/utils";
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";

  let { title, text, url }: BuildShareLinksOpts = $props();

  let origin = $state<string>("");

  const { facebook, telegram, vk, x } = $derived(
    buildShareLinks({
      url: origin + url,
      title,
      text,
    }),
  );

  const links = $derived([
    {
      href: x,
      icon: "simple-icons:x",
    },
    {
      href: facebook,
      icon: "simple-icons:facebook",
    },
    {
      href: vk,
      icon: "simple-icons:vk",
    },
    {
      href: telegram,
      icon: "simple-icons:telegram",
    },
  ]);

  onMount(() => {
    origin = window.location.origin;
  });
</script>

<div class="root">
  <span>Поделиться:</span>
  <div class="icons">
    {#each links as { href, icon }}
      <a {href} target="_blank"><Icon {icon} /></a>
    {/each}
  </div>
</div>

<style>
  .root {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .icons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    a {
      display: inline-block;
    }
  }
</style>
