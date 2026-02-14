<script lang="ts">
  import type { GameFeature } from "@/entities/game-features";
  import { ArrowIcon } from "@/shared/ui";
  import { Tween } from "svelte/motion";
  import { fade } from "svelte/transition";

  let { features }: { features: GameFeature[] } = $props();

  let activeFeatureIndex = $state(0);

  function nextFeature() {
    activeFeatureIndex = (activeFeatureIndex + 1) % features.length;
  }
  function prevFeature() {
    activeFeatureIndex =
      (activeFeatureIndex + features.length - 1) % features.length;
  }

  const progress = new Tween(0);

  $effect(() => {
    const target = ((activeFeatureIndex + 1) / features.length) * 100;
    progress.set(target);
  });
</script>

<div class="root">
  <div class="info-block">
    {#each features as feature, index (feature.id)}
      {#if index === activeFeatureIndex}
        <h3>{feature.title}</h3>
        <div class="description">
          <p>{feature.description}</p>
        </div>
        <nav>
          <button
            class="nav-btn prev"
            aria-label="Previous"
            onclick={prevFeature}
          >
            <ArrowIcon direction="left" />
          </button>

          <button class="nav-btn next" aria-label="Next" onclick={nextFeature}>
            <ArrowIcon direction="right" />
          </button>
        </nav>
      {/if}
    {/each}
  </div>
  <div class="image-block">
    {#each features as feature, index (feature.id)}
      {#if index === activeFeatureIndex}
        <img transition:fade src={feature.image} alt="" />
      {/if}
    {/each}
    <div class="progress">
      <div class="bar" style:width={`${progress.current}%`}></div>
    </div>
  </div>
</div>

<style>
  .root {
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (width < 1024px) {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
    }
  }
  .info-block {
    padding: 96px 132px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    border-radius: 8px 0 0 8px;
    background: linear-gradient(
      146deg,
      rgba(33, 79, 132, 0.6) 4.95%,
      rgba(26, 31, 40, 0.6) 97.73%
    );

    box-shadow:
      -1px -1px 0 0 rgba(17, 20, 39, 0.28) inset,
      1px 1px 0 0 rgba(213, 255, 252, 0.25) inset;
    backdrop-filter: blur(10px);

    @media (width < 1440px) {
      padding: 64px 100px;
    }

    @media (width < 1024px) {
      border-radius: 8px 8px 0 0;
    }

    @media (width < 768px) {
      padding: 32px 28px;
    }
  }

  h3 {
    font-size: 2rem;
    line-height: 1;
  }

  .description {
    height: 148px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 8;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    font-weight: 300;
  }

  .image-block {
    padding: 20px 24px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: end;
    border-radius: 0 8px 8px 0;
    overflow: hidden;

    @media (width < 1024px) {
      border-radius: 0 0 8px 8px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      position: absolute;
      inset: 0;
    }
  }
  .progress {
    position: relative;
    width: 100%;
    height: 0.5rem;
    border-radius: 9999px;
    background: hsla(222, 21%, 13%, 0.5);
    overflow: clip;
  }
  .bar {
    height: 100%;
    background: hsla(212, 60%, 32%, 1);
  }

  nav {
    height: 24px;
    display: flex;
    gap: 2rem;

    @media (width < 768px) {
      justify-content: space-between;
    }
  }
</style>
