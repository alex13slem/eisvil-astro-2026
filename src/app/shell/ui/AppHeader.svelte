<script lang="ts">
  import { ServiceCTATrigger } from "@/features/service-cta";
  import logoPng from "@/shared/assets/logo.png";
  import { windowScroll } from "@sveu/browser";
  import { navLinks } from "../lib/nav-links";

  const { y } = windowScroll();
  let isHide = $state<boolean>(false);
  let isOnTop = $state<boolean>(true);
  let prevY = $state<number>(0);

  $effect(() => {
    if ($y <= 0) {
      isOnTop = true;
      isHide = false;
      prevY = 0;
      return;
    } else isOnTop = false;

    const delta = $y - prevY;
    if (delta > 0) isHide = true;
    else if (delta < 0) isHide = false;

    prevY = $y;
  });
</script>

<header class:--hide={isHide} class:--scrolled={!isOnTop}>
  <div class="container">
    <div class="logo">
      <img src={logoPng.src} alt="logo" height={46} />
    </div>
    <nav>
      {#each navLinks as { href, name }}
        <a {href}>{name}</a>
      {/each}
    </nav>
    <div class="service-cta"><ServiceCTATrigger /></div>
  </div>
</header>

<style>
  header {
    position: sticky;
    inset: 0;
    bottom: auto;
    z-index: 5;

    padding-block: 1.5rem;

    transition: transform 0.3s ease-in-out;

    &.--hide {
      transform: translateY(-100%);
    }
    &.--scrolled {
      &::after {
        opacity: 1;
      }
    }
    &::after {
      z-index: -1;
      content: "";
      position: absolute;
      inset: 0;
      opacity: 0;
      backdrop-filter: blur(4px);
      background-color: var(--color-neutral-800-50);
      transition: opacity ease-in-out 0.3s;
    }

    @media (width < 1024px) {
      display: none;
    }
  }

  .container {
    display: flex;
    align-items: center;
    gap: 4rem;
  }

  .logo {
    height: 46px;

    @media (width < 1024px) {
      height: 35px;
    }

    img {
      height: 100%;
      width: auto;
    }
  }

  nav {
    display: flex;
    align-items: center;
    gap: 2rem;

    @media (width < 1024px) {
      display: none;
    }

    a {
      font-weight: 700;
      font-variant-caps: all-small-caps;
    }
  }

  .service-cta {
    margin-left: auto;
  }
</style>
