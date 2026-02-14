<script lang="ts">
  import { FormDialog } from "@/shared/ui";
  import { Dialog } from "melt/builders";
  import PublishingCTAForm from "./PublishingCTAForm.svelte";

  const dialog = new Dialog();
</script>

<button class="cta" {...dialog.trigger}>подать заявку</button>

<FormDialog {dialog}>
  <PublishingCTAForm onSuccess={() => (dialog.open = false)} />
</FormDialog>
