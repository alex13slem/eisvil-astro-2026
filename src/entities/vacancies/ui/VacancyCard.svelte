<script lang="ts">
  import type { Vacancy } from "../model/schema";
  import VacanciesSharedBlock from "./VacanciesSharedBlock.svelte";
  import VacancyImage from "./VacancyImage.svelte";

  let {
    vacancy,
    idx,
    type,
  }: { vacancy: Vacancy; idx: number; type: "landing" | "detail" } = $props();
</script>

<a
  href="/career/{vacancy.id}"
  class="vacancy-card"
  class:-is-landing={type === "landing"}
  class:-is-detail={type === "detail"}
>
  <div class="info">
    <h3 class="_name">{vacancy.positionName}</h3>
    <p class="_workplace">{vacancy.workplace.join(" | ")}</p>
  </div>
  <div class="image">
    <VacancyImage vacancyIdx={idx} />
  </div>
  <button class="link"
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
  </button>
  <VacanciesSharedBlock />
</a>

<style>
  .vacancy-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    transition: filter 0.3s ease-in-out;

    &.-is-landing {
      background: linear-gradient(
        146deg,
        rgba(33, 79, 132, 0.97) 4.95%,
        rgba(26, 31, 40, 0.97) 97.73%
      );
      padding: 72px 82px;
      @media (width < 768px) {
        padding: 38px 1.5rem;
      }
    }

    &.-is-detail {
      background: linear-gradient(
        146deg,
        rgba(33, 79, 132, 0.6) 4.95%,
        rgba(26, 31, 40, 0.6) 97.73%
      );
      padding: 28px 32px;
      @media (width < 768px) {
        padding: 38px 1.5rem;
      }
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
    @media (width >= 1440px) {
      height: 148px;
    }
  }

  .link {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
  }
</style>
