<script lang="ts">
  import "photoswipe/style.css";
  import "swiper/css";
  import "swiper/css/navigation";

  import { ArrowIcon } from "@/shared/ui";
  import { attachNavigation } from "@/shared/utils";
  import PhotoSwipeLightbox from "photoswipe/lightbox";
  import { onMount } from "svelte";
  import { Navigation } from "swiper";
  import { Swiper, SwiperSlide } from "swiper/svelte";
  import type { Swiper as SwiperInstance } from "swiper/types";

  let { images }: { images: { src: string; width: number; height: number }[] } =
    $props();

  let swiper = $state<SwiperInstance>();
  let prevEl = $state<HTMLButtonElement>();
  let nextEl = $state<HTMLButtonElement>();
  let isLoading = $state<boolean>(true);

  let isEnd = $state<boolean>(false);

  onMount(() => {
    if (!swiper || !prevEl || !nextEl) return;
    attachNavigation(swiper, prevEl, nextEl);

    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gameplay-gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
  });
</script>

<div class="container" class:-is-loading={isLoading}>
  <div class="slider" id="gameplay-gallery" class:-is-end={isEnd}>
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
      slidesPerView={2.5}
      spaceBetween={8}
      breakpoints={{
        768: { slidesPerView: 2.2, spaceBetween: 24 },
        1024: { slidesPerView: 4, spaceBetween: 24 },
        1440: { slidesPerView: 5, spaceBetween: 32 },
      }}
    >
      {#each images as { src, width, height }}
        <SwiperSlide>
          <div class="slide">
            <a
              class="_link"
              href={src}
              data-pswp-width={width}
              data-pswp-height={height}>.</a
            >
            <img {src} alt="" />
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

      @media (width >= 1024px) {
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

    aspect-ratio: 320 / 216;

    display: flex;
    flex-direction: column;
    justify-content: end;
    overflow: clip;
    border-radius: 0.5rem;

    ._link {
      position: absolute;
      inset: 0;
      z-index: 2;
      opacity: 0;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
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
