<script lang="ts">
  let { title, subtitle }: { title: string; subtitle?: string } = $props();
</script>

<header>
  <h2>{title}</h2>
  {#if subtitle}
    <p class="hint">
      {subtitle}
    </p>
  {/if}
</header>

<style>
  h2 {
    font-variant-caps: all-small-caps;
    font-weight: 700;
    font-size: 2rem;
    @media (width < 768px) {
      font-size: 1.75rem;
    }
  }
  .hint {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    opacity: 0.75;
    @media (width < 768px) {
      font-size: 0.75rem;
    }
  }
</style>
