<script lang="ts">
  import { FormDialog } from "@/shared/ui";
  import { Dialog } from "melt/builders";
  import DevelopmentOrderCTAForm from "./DevelopmentOrderCTAForm.svelte";

  const dialog = new Dialog({ closeOnOutsideClick: false });
</script>

<button class="cta" {...dialog.trigger}>подать заявку</button>

<FormDialog {dialog}>
  <DevelopmentOrderCTAForm onSuccess={() => (dialog.open = false)} />
</FormDialog>
