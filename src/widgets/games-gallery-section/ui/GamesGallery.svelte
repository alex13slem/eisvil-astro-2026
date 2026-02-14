<script lang="ts">
  import "swiper/css";
  import "swiper/css/navigation";

  import { ArrowIcon } from "@/shared/ui";
  import { attachNavigation } from "@/shared/utils";
  import { onMount } from "svelte";
  import { Navigation } from "swiper";
  import { Swiper, SwiperSlide } from "swiper/svelte";
  import type { Swiper as SwiperInstance } from "swiper/types";
  import type { GamesGalleryItem } from "../model/games-gallery-item.schema";

  let { items }: { items: GamesGalleryItem[] } = $props();

  let swiper = $state<SwiperInstance>();
  let prevEl = $state<HTMLButtonElement>();
  let nextEl = $state<HTMLButtonElement>();
  let isLoading = $state<boolean>(true);

  let isEnd = $state<boolean>(false);

  onMount(() => {
    if (!swiper || !prevEl || !nextEl) return;
    attachNavigation(swiper, prevEl, nextEl);
  });
</script>

<div class="container" class:-is-loading={isLoading}>
  <div class="slider" class:-is-end={isEnd}>
    <Swiper
      modules={[Navigation]}
      on:init={(e) => {
        swiper = e.detail[0];
        isEnd = swiper.isEnd;
        isLoading = false;
      }}
      on:slideChange={(e) => {
        isEnd = e.detail[0].isEnd;
      }}
      slidesPerView={1.25}
      spaceBetween={8}
      breakpoints={{
        768: { spaceBetween: 24 },
        1024: { slidesPerView: 2 },
        1440: { slidesPerView: 2.5 },
      }}
    >
      {#each items as item (item.slug)}
        <SwiperSlide>
          <div class="slide">
            <a class="_link" href={`/games/${item.slug}`}>.</a>
            <img class="_bg" src={item.fullBanner} alt={item.name} />
            <img class="_logo" src={item.logo} alt="" />
            <div class="_info">
              <h3 class="_name">{item.name}</h3>
              <p class="_description">{item.shortPromoDescription}</p>
            </div>
          </div>
        </SwiperSlide>
      {/each}
    </Swiper>
  </div>

  <div class="nav">
    <button class="nav-btn prev" aria-label="Previous" bind:this={prevEl}>
      <ArrowIcon direction="left" />
    </button>

    <button class="nav-btn next" aria-label="Next" bind:this={nextEl}>
      <ArrowIcon direction="right" />
    </button>
  </div>
</div>

<style>
  .container {
    @media (width < 768px) {
      padding: 0;
    }

    transition: opacity 0.3s ease-in-out;
    &.-is-loading {
      opacity: 0;
    }
  }
  .slider {
    position: relative;

    &.-is-end {
      &::after {
        opacity: 0;
      }
      &::before {
        opacity: 1;
      }
    }

    &::after,
    &::before {
      content: "";
      z-index: 2;
      position: absolute;
      bottom: 0;
      height: calc(100% + 1px);
      width: 30%;
      transition: opacity 0.3s ease-in-out;
      pointer-events: none;

      @media (width < 768px) or (1024px < width <= 1440px) {
        display: none;
      }
    }

    &::before {
      left: -1px;
      opacity: 0;
      background: linear-gradient(
        90deg,
        var(--color-neutral-200) 0%,
        transparent 100%
      );
    }
    &::after {
      right: -1px;
      background: linear-gradient(
        -90deg,
        var(--color-neutral-400) 0%,
        transparent 100%
      );
    }

    @media (width < 768px) {
      :global(.swiper) {
        padding-inline: 1.25rem;
      }
    }
  }
  .slide {
    position: relative;
    z-index: 0;

    aspect-ratio: 628 / 352;

    display: flex;
    flex-direction: column;
    justify-content: end;
    overflow: clip;
    border-radius: 0.5rem;

    &::after {
      content: "";
      z-index: -1;
      position: absolute;
      inset: 0;
      top: auto;
      height: 100px;
      width: 100%;
      background: linear-gradient(
        180deg,
        transparent 0%,
        var(--color-neutral-900) 100%
      );
    }

    ._link {
      position: absolute;
      inset: 0;
      z-index: 2;
      opacity: 0;
    }

    ._bg {
      z-index: -1;
      position: absolute;
      inset: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }

    ._logo {
      position: absolute;
      top: 1.5rem;
      left: 1.5rem;
      height: 5rem;

      @media (width < 768px) {
        height: 2rem;
        top: 0.5rem;
        left: 0.5rem;
      }
    }

    ._info {
      position: relative;
      z-index: 1;
      padding: 1.5rem;

      @media (width < 768px) {
        padding: 1rem 0.5rem;
      }
    }

    ._name {
      font-size: 1.25rem;
      text-transform: uppercase;
      line-height: 1;
      margin-bottom: 0.5rem;

      @media (width < 768px) {
        font-size: 1rem;
      }
    }

    ._description {
      line-height: 1;
      font-weight: 300;
      @media (width < 768px) {
        font-size: 0.875rem;
      }
    }
  }

  .nav {
    margin-top: 1rem;
    display: flex;
    justify-content: end;
    gap: 2rem;

    @media (width < 768px) {
      display: none;
    }
  }
</style>
