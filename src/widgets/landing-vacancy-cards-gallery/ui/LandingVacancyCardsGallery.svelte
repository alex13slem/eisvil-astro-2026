<script lang="ts">
  import "swiper/css";
  import "swiper/css/effect-cards";
  import "swiper/css/navigation";

  import { VacancyCard, type Vacancy } from "@/entities/vacancies";
  import { ArrowIcon } from "@/shared/ui";
  import { attachNavigation } from "@/shared/utils";
  import { onMount } from "svelte";
  import { EffectCards, Navigation } from "swiper";
  import { Swiper, SwiperSlide } from "swiper/svelte";
  import type { Swiper as SwiperInstance } from "swiper/types";

  let { vacancies }: { vacancies: Vacancy[] } = $props();

  let swiper = $state<SwiperInstance>();
  let prevEl = $state<HTMLButtonElement>();
  let nextEl = $state<HTMLButtonElement>();
  let isLoading = $state<boolean>(true);

  onMount(() => {
    if (!swiper || !prevEl || !nextEl) return;
    attachNavigation(swiper, prevEl, nextEl);
  });
</script>

<div class="slider" class:-is-loading={isLoading}>
  <Swiper
    modules={[Navigation, EffectCards]}
    effect="cards"
    grabCursor={true}
    cardsEffect={{ perSlideOffset: 15, perSlideRotate: 0 }}
    breakpoints={{
      1440: { cardsEffect: { perSlideOffset: 20, perSlideRotate: 0 } },
    }}
    on:init={(e) => {
      swiper = e.detail[0];
      isLoading = false;
    }}
  >
    {#each vacancies as v, idx}
      <SwiperSlide>
        <VacancyCard type="landing" vacancy={v} {idx} />
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
    --width: calc(70svw - 32px);
    --offset-x: 64px;
    width: calc(var(--width) + var(--offset-x) * 2);
    padding-inline: var(--offset-x);

    position: relative;

    transition: opacity 0.3s ease-in-out;
    &.-is-loading {
      opacity: 0;
    }

    @media (width >= 768px) {
      --width: 392px;
      --offset-x: 130px;
    }
    @media (width >= 1440px) {
      --offset-x: 200px;
    }

    :global(.swiper) {
      overflow: visible !important;
    }
    :global(.swiper-slide) {
      border-radius: 8px;

      box-shadow:
        -1px -1px 0 0 rgba(17, 20, 39, 0.28) inset,
        1px 1px 0 0 rgba(213, 255, 252, 0.25) inset;
    }

    :global(.swiper-slide:not(.swiper-slide-active) .vacancy-card) {
      filter: blur(16px);
    }
  }

  .nav {
    position: absolute;
    inset: 0;

    @media (width < 768px) {
      display: none;
    }
  }

  .nav-btn {
    z-index: 1;
    position: absolute;

    top: 50%;
    transform: translateY(-50%);

    &.prev {
      left: 0;
    }
    &.next {
      right: 0;
    }
  }
</style>
