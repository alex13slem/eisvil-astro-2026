<script lang="ts">
  import { buildShareLinks } from "@/shared/utils";
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";

  let origin = $state<string>("");

  const { facebook, telegram, vk, x } = $derived(
    buildShareLinks({
      url: origin + "/vacancies",
      title: "EISVIL • Вакансии",
      text: "Мы предлагаем дружественную и профессиональную обстановку, где вы сможете реализовать свой потенциал и работать над уникальными проектами вместе с единомышленниками.",
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
