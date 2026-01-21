<script lang="ts">
  import { platformSlugToIcon } from "@/entities/platforms";
  import type { Top3Game } from "@/features/top-3-games";
  import Icon from "@iconify/svelte";
  import Parallax from "parallax-js";
  import { fade, fly } from "svelte/transition";

  let { games }: { games: Top3Game[] } = $props();

  // Parallax scene
  let sceneRef = $state<HTMLElement>();
  $effect.pre(() => {
    let scene: Parallax;
    if (sceneRef) {
      scene = new Parallax(sceneRef, {
        hoverOnly: true,
      });
    }
    return () => {
      if (scene) scene.destroy();
    };
  });

  let activeGameSlug = $derived<string>(games[0].slug);
  const activeGame = $derived(
    games.find((game) => game.slug === activeGameSlug)!
  );
</script>

<section>
  {#key activeGameSlug}
    <div class="bg" transition:fade>
      <img src={activeGame.bannerBg} alt="bg" />
    </div>
  {/key}

  <div class="container">
    <div class="banner">
      <div class="_scene" bind:this={sceneRef}>
        {#key activeGameSlug}
          <img
            data-depth="0.3"
            transition:fly={{ y: 100 }}
            class="_fg"
            src={activeGame.bannerFg}
            alt=""
          />
        {/key}
      </div>
      <img class="_bg" src={activeGame.bannerBg} alt="" />
      <div class="_info">
        <div class=""></div>
        <img
          class="_logo"
          height={144}
          src={activeGame.logo}
          alt={activeGame.name}
        />
        <p class="_description">{activeGame.bannerDescription}</p>
        <a class="cta" href={`/games/${activeGame.slug}`}>узнать больше</a>
        {#if !!activeGame.platforms.length}
          <div class="_platforms">
            {#each activeGame.platforms as platform}
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
        {:else}
          <div class="_platforms-ph"></div>
        {/if}
      </div>
    </div>

    <div class="games-list">
      <div class=""></div>
      {#each games as game}
        <button
          class="_item"
          data-active={game.slug === activeGameSlug}
          onclick={() => (activeGameSlug = game.slug)}
        >
          <div class="_logo">
            <img width="96" height="96" src={game.logo} alt="" />
          </div>
          <div class="_info">
            <h3 class="_name">{game.name}</h3>
            <p class="_description">{game.bannerDescription}</p>
          </div>
        </button>
      {/each}
    </div>
  </div>
</section>

<style>
  section {
    overflow-x: clip;
  }
  .bg {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100svh;
    opacity: 0.05;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .container {
    position: relative;

    @media (width >= 1024px) {
      display: flex;
      gap: 96px;
      align-items: center;
    }

    &::after {
      content: "";
      z-index: -2;
      position: absolute;

      left: 50%;
      bottom: 0;
      translate: -40% 20%;
      height: 100%;
      aspect-ratio: 1 / 1;
      background: var(--color-secondary);
      border-radius: 9999px;
      filter: blur(187.5px);
    }
  }

  .banner {
    --top-offset: max(5svh, 3rem);

    z-index: 0;
    overflow: clip;
    position: relative;
    aspect-ratio: 9 / 16;

    padding-top: var(--top-offset);
    padding-bottom: 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;

    @media (width >= 768px) {
      padding-bottom: 112px;
      aspect-ratio: 728 / 1120;
    }

    @media (width >= 1024px) {
      flex: 1;
      flex-direction: row;
      justify-content: start;
      aspect-ratio: 1280 / 588;
      padding-inline-start: 3svw;
      padding-top: calc(var(--top-offset) + 1rem);
      padding-bottom: 1rem;
    }

    ._bg {
      z-index: -1;
      height: calc(100% - var(--top-offset));
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      object-fit: cover;
      object-position: top right;
      border-radius: 0.5rem;
    }

    ._scene {
      position: absolute;
      inset: 0;
    }

    ._fg {
      z-index: 0;
      position: absolute;
      width: 100%;
      top: 0;
      right: 0;
      object-fit: cover;
      object-position: top left;
      margin-left: auto;

      @media (width < 1600px) {
        top: calc(var(--top-offset) - 1.5rem) !important;
      }
      @media (width >= 1024px) {
        width: 50%;
      }
    }

    ._info {
      position: relative;
      max-width: 248px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;

      /* @media (width < 1024px) {
        gap: 1rem;
      } */
    }

    ._logo {
      height: 144px;
      width: auto;

      /* @media (width < 1024px) {
        height: 128px;
      } */
    }

    ._description {
      height: 37px;
      overflow: hidden;
      text-align: center;
      font-weight: 500;
      filter: drop-shadow(0px 0px 1px var(--color-neutral-900))
        drop-shadow(0px 0px 1px var(--color-neutral-900))
        drop-shadow(0px 0px 1px var(--color-neutral-900));

      /* @media (width < 1024px) {
          font-size: 14px;
        } */
    }

    ._platforms {
      display: flex;
      gap: 0.5rem;
      padding: 6px 1rem;
      border-radius: 9999px;
      border: thin solid var(--color-neutral-50);
      background: color-mix(in srgb, var(--color-neutral-900), transparent 90%);
      backdrop-filter: blur(4px);
    }

    ._platforms-ph {
      height: 34px;

      @media (width < 1024px) {
        display: none;
      }
    }

    ._platform {
      color: var(--color-neutral-50);
      font-size: 1.25rem;
    }
  }

  .games-list {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 3rem;

    @media (width < 1600px) {
      display: none;
    }

    ._item {
      text-align: start;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      &[data-active="false"] {
        opacity: 0.78;
        ._logo {
          filter: grayscale(0.75);
        }
      }
    }
    ._logo {
      --size: 96px;
      background: color-mix(in srgb, var(--color-neutral-50), transparent 95%);
      border-radius: 0.5rem;
      img {
        object-fit: contain;
        width: var(--size);
        height: var(--size);
      }
    }
    ._info {
      max-width: 232px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    ._name {
      font-size: 1.25rem;
      text-transform: uppercase;
    }
    ._description {
      font-weight: 300;
      text-transform: lowercase;
    }
  }
</style>
