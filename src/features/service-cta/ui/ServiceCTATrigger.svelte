<script lang="ts">
  import DevelopmentOrderCTAForm from "@/features/development-order-cta/ui/DevelopmentOrderCTAForm.svelte";
  import PublishingCTAForm from "@/features/publishing-cta/ui/PublishingCTAForm.svelte";
  import { FormDialog } from "@/shared/ui";
  import { Dialog } from "melt/builders";

  type ServiceCTAType = "development" | "publishing";

  let {
    initialType = "development",
  }: { initialType?: ServiceCTAType } = $props();

  const dialog = new Dialog({ closeOnOutsideClick: false });
  let selectedType = $state<ServiceCTAType>("development");

  $effect(() => {
    selectedType = initialType;
  });
</script>

<button class="cta" {...dialog.trigger}>РїРѕРґР°С‚СЊ Р·Р°СЏРІРєСѓ</button>

<FormDialog {dialog}>
  <div class="content">
    <label class="label" for="service-cta-type">РўРёРї Р·Р°СЏРІРєРё</label>
    <select id="service-cta-type" bind:value={selectedType}>
      <option value="development">Р Р°Р·СЂР°Р±РѕС‚РєР°</option>
      <option value="publishing">РџСѓР±Р»РёС€РёРЅРі</option>
    </select>

    {#if selectedType === "development"}
      <DevelopmentOrderCTAForm onSuccess={() => (dialog.open = false)} />
    {:else}
      <PublishingCTAForm onSuccess={() => (dialog.open = false)} />
    {/if}
  </div>
</FormDialog>

<style>
  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .label {
    font-size: 0.875rem;
  }

  select {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid
      color-mix(in srgb, var(--color-text-primary), transparent 70%);
    color: var(--color-text-primary);
    background-color: transparent;
  }
</style>
