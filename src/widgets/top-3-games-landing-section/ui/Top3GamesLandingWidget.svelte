<script lang="ts">
  import { PlatformsLinksBlock } from "@/entities/platforms";
  import type { Top3Game } from "@/features/top-3-games";
  import { ArrowIcon } from "@/shared/ui";
  import { mediaQuery } from "@sveu/browser";
  import Parallax from "parallax-js";
  import { fade, fly } from "svelte/transition";

  let { games }: { games: Top3Game[] } = $props();

  let activeGameIndex = $state(0);
  const activeGame = $derived((games[activeGameIndex] ?? games[0])!);
  const activeGameSlug = $derived<string>(activeGame.slug);

  const TIME_INTERVAL = 6_000;
  let isPaused = $state(false);
  let timerId: ReturnType<typeof setTimeout> | null = null;

  // Parallax scene
  let sceneRef = $state<HTMLElement>();
  $effect.pre(() => {
    let scene: Parallax;
    if (sceneRef && $isHoverDevice) {
      scene = new Parallax(sceneRef, {
        hoverOnly: true,
      });
    }
    return () => {
      if (scene) scene.destroy();
    };
  });

  const goNext = (resetTimer = false) => {
    if (!games.length) return;
    activeGameIndex = (activeGameIndex + 1) % games.length;
    if (resetTimer) scheduleNext();
  };

  const goPrev = (resetTimer = false) => {
    if (!games.length) return;
    activeGameIndex = (activeGameIndex - 1 + games.length) % games.length;
    if (resetTimer) scheduleNext();
  };

  const isHoverDevice = mediaQuery("(hover: hover) and (pointer: fine)");
  $effect(() => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    if (games.length < 2) return;
    scheduleNext();
    return () => {
      if (timerId) clearTimeout(timerId);
      timerId = null;
    };
  });

  const scheduleNext = () => {
    if (games.length < 2) return;
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      if (isPaused && $isHoverDevice) {
        scheduleNext();
        return;
      }
      goNext();
      scheduleNext();
    }, TIME_INTERVAL);
  };
</script>

<section>
  {#key activeGameSlug}
    <div class="bg" transition:fade>
      <img src={activeGame.bannerBg} alt="bg" />
    </div>
  {/key}

  <div class="container">
    <div
      class="banner"
      role="group"
      aria-label="Top game banner"
      onfocusin={() => (isPaused = true)}
      onfocusout={() => (isPaused = false)}
      onmouseenter={() => (isPaused = true)}
      onmouseleave={() => (isPaused = false)}
    >
      <div class="_scene" bind:this={sceneRef}>
        {#key activeGameSlug}
          <img
            data-depth="0.3"
            transition:fly={{ y: 100, duration: 1000 }}
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
          <PlatformsLinksBlock platforms={activeGame.platforms} />
        {:else}
          <div class="_platforms-ph"></div>
        {/if}
      </div>
    </div>

    <div class="nav">
      <button aria-label="Previous" onclick={() => goPrev(true)}>
        <ArrowIcon direction="left" />
      </button>

      <button aria-label="Next" onclick={() => goNext(true)}>
        <ArrowIcon direction="right" />
      </button>
    </div>

    <div class="games-list">
      <div class=""></div>
      {#each games as game, index}
        <button
          class="_item"
          data-active={index === activeGameIndex}
          onclick={() => {
            activeGameIndex = index;
            scheduleNext();
          }}
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
    top: -94px;
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
    z-index: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (width >= 1440px) {
      flex-direction: row;
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

  .nav {
    display: flex;
    @media (width < 1024px) {
      z-index: 1;
      position: absolute;
      left: 0;
      padding-inline: 2rem;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      justify-content: space-between;
      filter: drop-shadow(0px 0px 1px var(--color-neutral-900))
        drop-shadow(0px 0px 1px var(--color-neutral-900))
        drop-shadow(0px 0px 1px var(--color-neutral-900));
    }
    @media (1024px <= width < 1440px) {
      justify-content: end;
      gap: 2rem;
    }
    @media (width >= 1440px) {
      display: none;
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

      @media (width < 1440px) {
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

    ._platforms-ph {
      height: 34px;

      @media (width < 1024px) {
        display: none;
      }
    }
  }

  .games-list {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 3rem;

    @media (width < 1440px) {
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
