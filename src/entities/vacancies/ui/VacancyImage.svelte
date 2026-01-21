<script lang="ts">
  import { getVacancyDecorByIdx } from "../lib/get-vacancy-decor-by-idx";

  let { vacancyIdx = 0 }: { vacancyIdx?: number } = $props();
  const image = $derived(getVacancyDecorByIdx(vacancyIdx));
</script>

<div class="image">
  <img src={image.src} alt="" />
  <img class="_shadow --1" src={image.src} alt="" />
  <img class="_shadow --2" src={image.src} alt="" />
</div>

<style>
  .image {
    z-index: 0;
    position: relative;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    & ._shadow {
      z-index: -1;
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      &.--1 {
        filter: blur(20px);
      }
      &.--2 {
        filter: blur(56px);
      }
    }
  }
</style>
