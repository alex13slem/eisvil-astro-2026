<script lang="ts">
  import "swiper/css";
  import "swiper/css/navigation";

  import { VacancyCard, type Vacancy } from "@/entities/vacancies";
  import { ArrowIcon } from "@/shared/ui";
  import { attachNavigation } from "@/shared/utils";
  import { onMount } from "svelte";
  import { Navigation } from "swiper";
  import { Swiper, SwiperSlide } from "swiper/svelte";
  import type { Swiper as SwiperInstance } from "swiper/types";

  let { vacancies }: { vacancies: Vacancy[] } = $props();

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

<div class="slider" class:-is-loading={isLoading} class:-is-end={isEnd}>
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
    slidesPerView={1.1}
    spaceBetween={8}
    breakpoints={{
      768: { slidesPerView: 2, spaceBetween: 24 },
      1024: { slidesPerView: 3, spaceBetween: 24 },
      1440: { slidesPerView: 4, spaceBetween: 24 },
    }}
  >
    {#each vacancies as v, idx}
      <SwiperSlide>
        <VacancyCard type="detail" vacancy={v} {idx} />
      </SwiperSlide>
    {/each}
  </Swiper>

  <div class="nav">
    <button class="nav-btn prev" aria-label="Предыдущий" bind:this={prevEl}>
      <ArrowIcon direction="left" />
    </button>

    <button class="nav-btn next" aria-label="Следующий" bind:this={nextEl}>
      <ArrowIcon direction="right" />
    </button>
  </div>
</div>

<style>
  .slider {
    position: relative;

    transition: opacity 0.3s ease-in-out;
    &.-is-loading {
      opacity: 0;
    }

    &.-is-end {
      &::after {
        opacity: 0;
      }
      &::before {
        opacity: 1;
      }
    }

    /* &::after,
    &::before {
      content: "";
      z-index: 2;
      position: absolute;
      bottom: 0;
      height: calc(100% + 1px);
      width: 30%;
      transition: opacity 0.3s ease-in-out;
      pointer-events: none;

      @media (width < 1024px) {
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
    } */

    :global(.swiper-slide) {
      overflow: clip;

      border-radius: 8px;

      box-shadow:
        -1px -1px 0 0 rgba(17, 20, 39, 0.28) inset,
        1px 1px 0 0 rgba(213, 255, 252, 0.25) inset;
    }

    @media (width < 768px) {
      :global(.swiper) {
        padding-inline: 1.25rem;
      }
    }
  }

  .nav {
    position: relative;
    z-index: 3;
    margin-top: 1rem;
    display: flex;
    justify-content: end;
    gap: 2rem;

    @media (width < 768px) {
      display: none;
    }
  }
</style>
