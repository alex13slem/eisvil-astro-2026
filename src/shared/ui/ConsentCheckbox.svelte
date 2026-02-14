<script lang="ts">
  export let name = "agree_privacy";
  export let error: string | null = null;
</script>

<div class="consent">
  <label>
    <input class="checkbox" type="checkbox" {name} />
    <span>
      Нажимая на кнопку, вы соглашаетесь с
      <a href="/privacy">политикой конфиденциальности</a> и с
      <a href="/terms">пользовательским соглашением</a>
    </span>
  </label>
  <p class="consent-error">
    {#if error}
      {error}
    {/if}
  </p>
</div>

<style>
  .consent {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.875rem;

    label {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    a {
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .consent-error {
    height: 1rem;
    font-size: 0.75rem;
    color: var(--color-accent-400);
  }
</style>
