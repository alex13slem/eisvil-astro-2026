<script lang="ts">
  import type { Dialog } from "melt/builders";

  let { dialog }: { dialog: Dialog } = $props();
</script>

<div {...dialog.overlay}></div>

<style>
  [data-melt-dialog-overlay] {
    z-index: 5;
    position: fixed;
    inset: 0;
    border: none;
    width: 100%;
    height: 100%;
    background: var(--color-neutral-800-50);
    backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity ease-in-out 0.3s;
    pointer-events: none;
    &[data-open] {
      pointer-events: all;
      opacity: 1;
    }
  }
</style>
