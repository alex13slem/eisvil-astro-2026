<script lang="ts">
  import DevelopmentOrderCTAForm from "@/features/development-order-cta/ui/DevelopmentOrderCTAForm.svelte";
  import PublishingCTAForm from "@/features/publishing-cta/ui/PublishingCTAForm.svelte";
  import { FormDialog, FormHeader } from "@/shared/ui";
  import Icon from "@iconify/svelte";
  import { Dialog, Select } from "melt/builders";
  import {
    SERVICE_CTA_HEADER_BY_TYPE,
    SERVICE_CTA_TRIGGER_TEXT,
    SERVICE_CTA_TYPE_OPTIONS,
    SERVICE_CTA_TYPE_PLACEHOLDER,
    type ServiceCTAType,
  } from "../model/config";

  let { initialType = "development" }: { initialType?: ServiceCTAType } =
    $props();

  const dialog = new Dialog({ closeOnOutsideClick: false });
  const typeSelect = new Select<ServiceCTAType>({
    value: "development",
    onValueChange: (value) => {
      if (value) selectedType = value;
    },
  });
  let selectedType = $state<ServiceCTAType>("development");

  $effect(() => {
    selectedType = initialType;
    typeSelect.value = initialType;
  });
</script>

<button class="cta" {...dialog.trigger}>{SERVICE_CTA_TRIGGER_TEXT}</button>

<FormDialog {dialog}>
  <div class="content">
    <FormHeader
      title={SERVICE_CTA_HEADER_BY_TYPE[selectedType].title}
      subtitle={SERVICE_CTA_HEADER_BY_TYPE[selectedType].subtitle}
    />

    <div class="select-group">
      <button class="select-trigger" type="button" {...typeSelect.trigger}>
        <span>{typeSelect.valueAsString || SERVICE_CTA_TYPE_PLACEHOLDER}</span>
        <Icon icon="mingcute:down-fill" />
      </button>

      <div class="select-content" {...typeSelect.content}>
        <div class="select-options">
          {#each SERVICE_CTA_TYPE_OPTIONS as option (option.value)}
            <div
              class="select-option"
              {...typeSelect.getOption(option.value, option.label)}
            >
              {option.label}
            </div>
          {/each}
        </div>
      </div>
    </div>

    {#if selectedType === "development"}
      <DevelopmentOrderCTAForm
        showHeader={false}
        onSuccess={() => (dialog.open = false)}
      />
    {:else}
      <PublishingCTAForm
        showHeader={false}
        onSuccess={() => (dialog.open = false)}
      />
    {/if}
  </div>
</FormDialog>

<style>
  .content {
    display: flex;
    flex-direction: column;
    gap: 1.625rem;
  }

  .select-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .label {
    font-size: 0.875rem;
    color: var(--color-text-primary);
  }

  .select-trigger {
    width: 100%;
    background: var(--color-text-primary);
    color: var(--color-primary);
    border: none;
    border-radius: 0.5rem;
    padding: 0 1rem;
    min-height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    @media (width < 768px) {
      min-height: 2.5rem;
    }
  }

  .select-content {
    z-index: 10;
    margin-top: 0.25rem;
    border-radius: 0.5rem;
    background: var(--color-text-primary);
    color: var(--color-primary);
    overflow: hidden;
  }

  .select-options {
    display: flex;
    flex-direction: column;
    max-height: 14rem;
    overflow: auto;
  }

  .select-option {
    padding: 0.75rem 1rem;
    cursor: pointer;
  }

  .select-option[data-highlighted],
  .select-option[aria-selected="true"] {
    background: color-mix(in srgb, var(--color-primary), transparent 85%);
  }
</style>
