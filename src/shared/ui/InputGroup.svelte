<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { HTMLInputTypeAttribute } from "svelte/elements";

  type Props = {
    name: string;
    placeholder?: string;
    error?: string | null;
  };

  let {
    error,
    isTextarea,
    ...props
  }:
    | (Props & {
        type?: Extract<HTMLInputTypeAttribute, "text" | "email" | "password">;
        isTextarea?: never;
      })
    | (Props & {
        type?: never;
        isTextarea: true;
      }) = $props();
</script>

<label class="input-group">
  {#if isTextarea}
    <textarea {...props}></textarea>
  {:else}
    <input {...props} />
  {/if}
  <span class="error">
    {#if error}
      <Icon icon="mdi:alert-circle" />{error}
    {/if}
  </span>
</label>

<style>
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    input,
    textarea {
      background: var(--color-text-primary);
      color: var(--color-primary);
      border: none;
      border-radius: 0.5rem;
    }
    input {
      padding: 0 1rem;
      line-height: 3rem;
      @media (width < 768px) {
        line-height: 2.5rem;
      }
    }
    textarea {
      padding: 1rem;
      resize: vertical;
      min-height: 8rem;
    }

    .error {
      display: inline-flex;
      gap: 0.25rem;
      font-size: 0.75rem;
      color: var(--color-accent-400);
      min-height: 0.875rem;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      &:not(:empty) {
        opacity: 1;
      }
    }
  }
</style>
