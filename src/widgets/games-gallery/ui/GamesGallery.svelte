<script lang="ts">
  import "swiper/css";
  import "swiper/css/navigation";

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
        1441: { slidesPerView: 2.5 },
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
    <button class="nav-btn prev" aria-label="Предыдущий" bind:this={prevEl}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M11.5211 0.675161C11.8075 0.267272 12.2805 0 12.8167 0C13.6912 0 14.4 0.708858 14.4 1.58328C14.4 1.88781 14.3108 2.11365 14.2835 2.18113C14.2447 2.27745 14.2044 2.35091 14.1815 2.39038C14.135 2.47054 14.0899 2.53212 14.0681 2.56149C14.0202 2.62603 13.9707 2.68481 13.9362 2.72487C13.8616 2.81133 13.7659 2.91569 13.662 3.02637C13.4501 3.25213 13.1514 3.56071 12.792 3.92676C12.0706 4.66145 11.0755 5.65757 9.97488 6.75213C8.21265 8.50469 6.16878 10.5189 4.52051 12.1385C6.16878 13.7581 8.21265 15.7722 9.97488 17.5248C11.0755 18.6194 12.0706 19.6155 12.792 20.3502C13.1514 20.7162 13.4501 21.0248 13.662 21.2506C13.7659 21.3612 13.8616 21.4656 13.9362 21.5521C13.9707 21.5921 14.0202 21.6509 14.0681 21.7154C14.0899 21.7448 14.135 21.8064 14.1815 21.8866C14.2044 21.926 14.2447 21.9995 14.2835 22.0958C14.3108 22.1633 14.4 22.3891 14.4 22.6937C14.4 23.5681 13.6912 24.2769 12.8167 24.2769C12.2801 24.2769 11.8069 24.0092 11.5205 23.6007C11.4872 23.563 11.4331 23.5026 11.353 23.4173C11.1663 23.2183 10.8877 22.9306 10.5325 22.5689C9.82466 21.848 8.8405 20.8626 7.74221 19.7704C5.54687 17.5871 2.91066 14.9925 1.15295 13.2692L2.38419e-05 12.1385L1.15295 11.0077C2.91066 9.28446 5.54687 6.68987 7.74221 4.50657C8.8405 3.41431 9.82466 2.42891 10.5325 1.708C10.8877 1.34631 11.1663 1.05861 11.353 0.859671C11.4337 0.773685 11.4878 0.712854 11.5211 0.675161Z"
          fill="currentColor"
        />
        <path
          d="M22.2512 6.39519C22.4277 6.15594 22.7106 6 23.0307 6C23.566 6 24 6.43396 24 6.96928C24 7.15551 23.9456 7.29366 23.929 7.33465C23.9053 7.39325 23.8808 7.43778 23.867 7.46149C23.839 7.50969 23.8121 7.5462 23.7998 7.56277C23.7725 7.59952 23.7455 7.63186 23.7283 7.65175C23.6907 7.69538 23.6437 7.74601 23.5953 7.79752C23.4961 7.90323 23.3575 8.04654 23.1921 8.21495C22.8599 8.55332 22.4022 9.0114 21.8967 9.5141C21.1487 10.258 20.2901 11.1044 19.5668 11.8157C20.2901 12.5269 21.1487 13.3733 21.8967 14.1172C22.4022 14.6199 22.8599 15.078 23.1921 15.4164C23.3575 15.5848 23.4961 15.7281 23.5953 15.8338C23.6437 15.8853 23.6907 15.9359 23.7283 15.9796C23.7455 15.9995 23.7725 16.0318 23.7998 16.0685C23.8121 16.0851 23.839 16.1216 23.867 16.1698C23.8808 16.1935 23.9053 16.2381 23.929 16.2967C23.9456 16.3377 24 16.4758 24 16.662C24 17.1974 23.566 17.6313 23.0307 17.6313C22.7106 17.6313 22.4277 17.4754 22.2512 17.2361C22.2382 17.2215 22.2161 17.1966 22.1821 17.1604C22.0984 17.0711 21.9719 16.9404 21.8092 16.7747C21.4852 16.4447 21.034 15.993 20.5299 15.4916C19.5225 14.4897 18.3125 13.2986 17.5057 12.5076L16.8 11.8157L17.5057 11.1237C18.3125 10.3327 19.5225 9.14159 20.5299 8.1397C21.034 7.63836 21.4852 7.18658 21.8092 6.85664C21.9719 6.69093 22.0984 6.56018 22.1821 6.47091C22.2161 6.4347 22.2382 6.40986 22.2512 6.39519Z"
          fill="currentColor"
        />
      </svg>
    </button>

    <button class="nav-btn next" aria-label="Следующий" bind:this={nextEl}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M12.4789 0.675161C12.1925 0.267272 11.7195 0 11.1833 0C10.3088 0 9.59998 0.708858 9.59998 1.58328C9.59998 1.88781 9.68921 2.11365 9.71645 2.18113C9.75534 2.27745 9.79561 2.35091 9.8185 2.39038C9.86499 2.47054 9.9101 2.53212 9.93189 2.56149C9.97977 2.62603 10.0293 2.68481 10.0638 2.72487C10.1384 2.81133 10.2341 2.91569 10.338 3.02637C10.5499 3.25213 10.8486 3.56071 11.208 3.92676C11.9294 4.66145 12.9245 5.65757 14.0251 6.75213C15.7874 8.50469 17.8312 10.5189 19.4795 12.1385C17.8312 13.7581 15.7874 15.7722 14.0251 17.5248C12.9245 18.6194 11.9294 19.6155 11.208 20.3502C10.8486 20.7162 10.5499 21.0248 10.338 21.2506C10.2341 21.3612 10.1384 21.4656 10.0638 21.5521C10.0293 21.5921 9.97977 21.6509 9.93189 21.7154C9.9101 21.7448 9.86499 21.8064 9.8185 21.8866C9.79561 21.926 9.75534 21.9995 9.71645 22.0958C9.68921 22.1633 9.59998 22.3891 9.59998 22.6937C9.59998 23.5681 10.3088 24.2769 11.1833 24.2769C11.7199 24.2769 12.1931 24.0092 12.4795 23.6007C12.5128 23.563 12.5669 23.5026 12.647 23.4173C12.8337 23.2183 13.1123 22.9306 13.4675 22.5689C14.1753 21.848 15.1595 20.8626 16.2578 19.7704C18.4531 17.5871 21.0893 14.9925 22.847 13.2692L24 12.1385L22.847 11.0077C21.0893 9.28446 18.4531 6.68987 16.2578 4.50657C15.1595 3.41431 14.1753 2.42891 13.4675 1.708C13.1123 1.34631 12.8337 1.05861 12.647 0.859671C12.5663 0.773685 12.5122 0.712854 12.4789 0.675161Z"
          fill="currentColor"
        />
        <path
          d="M1.74877 6.39519C1.57227 6.15594 1.2894 6 0.969276 6C0.43396 6 0 6.43396 0 6.96928C0 7.15551 0.0544467 7.29366 0.0709919 7.33465C0.0946573 7.39325 0.119246 7.43778 0.132992 7.46149C0.160951 7.50969 0.187903 7.5462 0.200197 7.56277C0.227457 7.59952 0.254517 7.63186 0.271662 7.65175C0.309283 7.69538 0.356316 7.74601 0.404654 7.79752C0.503858 7.90323 0.642527 8.04654 0.807888 8.21495C1.14014 8.55332 1.59778 9.0114 2.10325 9.5141C2.85129 10.258 3.70986 11.1044 4.43321 11.8157C3.70986 12.5269 2.85129 13.3733 2.10325 14.1172C1.59778 14.6199 1.14014 15.078 0.807888 15.4164C0.642527 15.5848 0.503858 15.7281 0.404654 15.8338C0.356316 15.8853 0.309283 15.9359 0.271662 15.9796C0.254517 15.9995 0.227457 16.0318 0.200197 16.0685C0.187904 16.0851 0.160951 16.1216 0.132992 16.1698C0.119246 16.1935 0.0946572 16.2381 0.0709919 16.2967C0.0544467 16.3377 0 16.4758 0 16.662C0 17.1974 0.43396 17.6313 0.969276 17.6313C1.2894 17.6313 1.57227 17.4754 1.74877 17.2361C1.76181 17.2215 1.78389 17.1966 1.81787 17.1604C1.90164 17.0711 2.0281 16.9404 2.19081 16.7747C2.5148 16.4447 2.96598 15.993 3.47008 15.4916C4.47751 14.4897 5.68752 13.2986 6.49434 12.5076L7.2 11.8157L6.49434 11.1237C5.68752 10.3327 4.47751 9.14159 3.47008 8.1397C2.96598 7.63836 2.5148 7.18658 2.19081 6.85664C2.0281 6.69093 1.90164 6.56018 1.81787 6.47091C1.78389 6.4347 1.76181 6.40986 1.74877 6.39519Z"
          fill="currentColor"
        />
      </svg>
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

      @media (width < 768px) or (1024px < width <= 1536px) {
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
