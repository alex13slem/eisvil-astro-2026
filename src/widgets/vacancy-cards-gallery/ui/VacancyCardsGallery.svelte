<script lang="ts">
  import "swiper/css";
  import "swiper/css/effect-cards";
  import "swiper/css/navigation";

  import {
    VacanciesSharedBlock,
    VacancyImage,
    type Vacancy,
  } from "@/entities/vacancies";
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
      1536: { cardsEffect: { perSlideOffset: 20, perSlideRotate: 0 } },
    }}
    on:init={(e) => {
      swiper = e.detail[0];
      isLoading = false;
    }}
  >
    {#each vacancies as v, idx}
      <SwiperSlide>
        <div class="slide">
          <div class="info">
            <h3 class="_name">{v.positionName}</h3>
            <p class="_workplace">{v.workplace.join(" | ")}</p>
          </div>
          <div class="image">
            <VacancyImage vacancyIdx={idx} />
          </div>
          <a href="/vacancies" class="link"
            >узнать больше
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="8"
              viewBox="0 0 24 8"
              fill="none"
            >
              <path
                d="M20.1529 0.157252C20.3405 -0.0535119 20.6435 -0.052373 20.8294 0.160435L23.8615 3.63175C24.0473 3.84463 24.0459 4.18862 23.8587 4.39986L20.8014 7.84253C20.6138 8.05376 20.311 8.05227 20.1249 7.83935C19.9388 7.62635 19.9401 7.2825 20.1277 7.07125L22.3637 4.55157L0.476543 4.44972C0.212363 4.44848 -0.00102941 4.20435 3.73572e-06 3.90441C0.00109365 3.60446 0.216113 3.36217 0.48028 3.36334L22.3684 3.46625L20.1501 0.926417C19.9641 0.713415 19.9653 0.368504 20.1529 0.157252Z"
                fill="currentColor"
              ></path>
            </svg>
          </a>
          <VacanciesSharedBlock />
        </div>
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
    @media (width >= 1536px) {
      --offset-x: 200px;
    }

    :global(.swiper-slide) {
      border-radius: 8px;

      box-shadow:
        -1px -1px 0 0 rgba(17, 20, 39, 0.28) inset,
        1px 1px 0 0 rgba(213, 255, 252, 0.25) inset;
    }

    :global(.swiper-slide:not(.swiper-slide-active) .slide) {
      filter: blur(16px);
    }
  }

  .slide {
    padding: 72px 82px;
    background: linear-gradient(
      146deg,
      rgba(33, 79, 132, 0.6) 4.95%,
      rgba(26, 31, 40, 0.6) 97.73%
    );

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    transition: filter 0.3s ease-in-out;

    @media (width < 768px) {
      padding: 38px 1.5rem;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    & ._name {
      font-size: 1.5rem;
      font-weight: 700;
    }
  }

  .image {
    height: 128px;
    @media (width >= 1536px) {
      height: 148px;
    }
  }

  .link {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
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
