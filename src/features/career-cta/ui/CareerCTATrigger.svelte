<script lang="ts">
  import { FormDialog } from "@/shared/ui";
  import { Dialog } from "melt/builders";
  import CareerCTAForm from "./CareerCTAForm.svelte";

  const dialog = new Dialog();

  let { testLink }: { testLink: string } = $props();
</script>

<button class="cta" {...dialog.trigger}>присоединиться</button>

<FormDialog {dialog}>
  <CareerCTAForm {testLink} onSuccess={() => (dialog.open = false)} />
</FormDialog>
