<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { Dialog } from "melt/builders";
  import type { Snippet } from "svelte";

  let { dialog, children }: { dialog: Dialog; children: Snippet } = $props();
</script>

<dialog {...dialog.content}>
  <div class="surface">
    <button class="_close" onclick={() => (dialog.open = false)}>
      <Icon icon="mingcute:close-fill" />
    </button>
    <div class="body">
      {@render children()}
    </div>
  </div>
</dialog>

<style>
  dialog {
    --radius: 0.5rem;
    position: fixed;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    z-index: 1;
    background: transparent;
    margin: 0;
    border: none;
    opacity: 0;
    scale: 0.95;
    transition: ease-in-out 0.3s;

    width: min(calc(100% - 1.5rem), 800px);
    max-height: calc(100% - 48px);

    padding: 0;
    border-radius: var(--radius);
    overscroll-behavior: contain;
    scrollbar-width: none;

    &::backdrop {
      display: none;
    }
    &[data-open] {
      opacity: 1;
      scale: 1;
    }
  }

  .surface {
    position: relative;
    min-height: 100%;
    padding: 3rem;
    border-radius: var(--radius);
    overflow: auto;

    /* surface */
    box-shadow:
      -1px -1px 0 0 rgba(17, 20, 39, 0.28) inset,
      1px 1px 0 0 rgba(213, 255, 252, 0.25) inset;
    backdrop-filter: blur(8px);

    &::after {
      z-index: 0;
      opacity: 0.5;
      content: "";
      height: 100%;
      width: 100%;
      position: absolute;
      inset: 0;
      background: linear-gradient(
        146deg,
        rgba(33, 79, 132, 0.6) 4.95%,
        rgba(26, 31, 40, 0.6) 97.73%
      );
    }

    @media (width < 768px) {
      padding: 3rem 1.5rem;
    }
  }

  .body {
    position: relative;
    z-index: 1;
  }

  ._close {
    position: absolute;
    top: 24px;
    right: 24px;
    cursor: pointer;
    z-index: 2;
  }

  :global(.iconify) {
    flex: 0 0 auto;
  }
</style>
