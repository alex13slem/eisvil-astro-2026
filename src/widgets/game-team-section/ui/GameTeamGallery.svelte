<script lang="ts">
  import { socialNetworksSlugToIcon } from "@/entities/social-networks";
  import { ArrowIcon } from "@/shared/ui";
  import { attachNavigation } from "@/shared/utils";
  import Icon from "@iconify/svelte";
  import { parse } from "marked";
  import { onMount } from "svelte";
  import { Navigation } from "swiper";
  import { Swiper, SwiperSlide } from "swiper/svelte";
  import type { Swiper as SwiperInstance } from "swiper/types";
  import type { GameTeamMember } from "../model/schema";

  let swiper = $state<SwiperInstance>();
  let prevEl = $state<HTMLButtonElement>();
  let nextEl = $state<HTMLButtonElement>();
  let isLoading = $state<boolean>(true);
  let isEnd = $state<boolean>(false);
  let rootEl = $state<HTMLDivElement>();

  let { members }: { members: GameTeamMember[] } = $props();
  let activeMemberId = $state<string | null>(null);

  const onWindowClick = (event: MouseEvent) => {
    if (!activeMemberId || !rootEl) return;
    const activeCard = rootEl.querySelector(".slide.-active");
    if (!activeCard) return;
    if (activeCard.contains(event.target as Node)) return;
    activeMemberId = null;
  };

  onMount(() => {
    if (!swiper || !prevEl || !nextEl) return;
    attachNavigation(swiper, prevEl, nextEl);
  });
</script>

<svelte:window onclick={onWindowClick} />

<div class="container" class:-is-loading={isLoading} bind:this={rootEl}>
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
      slidesPerView={1}
      spaceBetween={8}
      breakpoints={{
        768: { slidesPerView: 2.2, spaceBetween: 24 },
        1024: { slidesPerView: 4, spaceBetween: 24 },
        1440: { slidesPerView: 5, spaceBetween: 32 },
      }}
    >
      {#each members as m}
        <SwiperSlide>
          <button
            class="slide"
            class:-active={m.id === activeMemberId}
            onclick={() =>
              (activeMemberId = activeMemberId === m.id ? null : m.id)}
          >
            <img src={m.image} alt={m.name} />
            <div class="info">
              <h3>{m.name}</h3>
              <p class="_role">{m.role}</p>
              <p class="_description">
                {@html parse(m.description)}
              </p>
              {#if !!m.socialNetworks.length}
                <div class="socials">
                  {#each m.socialNetworks as sn}
                    {@const icon = socialNetworksSlugToIcon[sn.slug]}
                    <a href={sn.link} target="_blank" rel="noopener noreferrer">
                      {#if icon.type === "iconify"}
                        <Icon icon={icon.icon} />
                      {:else if icon.type === "svg"}
                        {@html icon.icon}
                      {/if}
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
          </button>
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
      width: 15%;
      transition: opacity 0.3s ease-in-out;
      pointer-events: none;

      @media (width < 768px) or (width >= 1024px) {
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
    --radius: 0.5rem;
    position: relative;
    z-index: 0;
    text-align: left;

    aspect-ratio: 22 / 34;

    overflow: hidden;
    border-radius: var(--radius);

    &.-active {
      .info {
        translate: 0 0;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    .info {
      position: absolute;
      inset: 0;
      z-index: 2;
      padding: 1.5rem;
      gap: 0.875rem;
      display: flex;
      flex-direction: column;
      background: linear-gradient(
        146deg,
        rgba(33, 79, 132, 0.6) 4.95%,
        rgba(26, 31, 40, 0.6) 97.73%
      );

      border-radius: var(--radius);

      box-shadow:
        -1px -1px 0 0 rgba(17, 20, 39, 0.28) inset,
        1px 1px 0 0 rgba(213, 255, 252, 0.25) inset;
      backdrop-filter: blur(10px);

      translate: 0 100%;
      transition: translate 0.3s ease-in-out;

      h3 {
        font-weight: bold;
      }

      ._role {
        font-weight: bold;
        text-transform: uppercase;
      }

      ._description {
        flex: 1;
      }

      .socials {
        display: flex;
        gap: 0.5rem;
        font-size: 1.5rem;
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
