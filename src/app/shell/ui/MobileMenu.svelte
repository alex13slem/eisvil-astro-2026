<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Dialog } from "melt/builders";
  import { portal } from "svelte-portal";
  import { navLinks } from "../lib/nav-links";

  const dialog = new Dialog();
</script>

<button class="mobile-menu-trigger" {...dialog.trigger}>
  <Icon icon="mingcute:menu-fill" />
</button>

<div class="mobile-menu" use:portal={"body"}>
  <div {...dialog.overlay}></div>
  <dialog class="container" {...dialog.content}>
    <button class="_close" onclick={() => (dialog.open = false)}>
      <Icon icon="mingcute:close-fill" />
    </button>
    <nav class="_nav">
      {#each navLinks as { href, name } (href)}
        <a {href}>{name}</a>
      {/each}
    </nav>
  </dialog>
</div>

<style>
  .mobile-menu-trigger {
    font-size: 35px;
    cursor: pointer;
    transition: opacity ease-in-out 0.3s;
    &[data-open] {
      opacity: 0;
    }
  }
  .mobile-menu {
    [data-melt-dialog-overlay] {
      overflow-x: clip;
      border: none;
      position: fixed;
      width: 100%;
      height: 100%;
      background: transparent;
      opacity: 0;
      transition: opacity ease-in-out 0.3s;
      pointer-events: none;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 200%;
        translate: 50% -50%;
        border-radius: 9999px;
        aspect-ratio: 1 / 1;
        background: var(--color-primary);
        filter: blur(8rem);
      }
      &[data-open] {
        pointer-events: all;
        opacity: 0.9875;
      }
    }

    dialog {
      position: fixed;
      background: transparent;
      margin: 0;
      border: none;
      opacity: 0;
      scale: 0.95;
      transition: ease-in-out 0.3s;
      padding-block: 1.5rem;

      display: flex;
      flex-direction: column;
      align-items: end;
      gap: 3rem;

      pointer-events: none;

      &::backdrop {
        display: none;
      }
      &[data-open] {
        pointer-events: all;
        opacity: 1;
        scale: 1;
      }
    }

    ._close {
      font-size: 35px;
    }

    ._nav {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      align-items: end;
      font-variant-caps: all-small-caps;
      font-weight: 700;
      font-size: min(2rem, 5vw);
    }
  }
</style>
