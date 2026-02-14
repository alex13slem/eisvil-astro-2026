<script lang="ts">
  import type { Dialog } from "melt/builders";
  import type { Snippet } from "svelte";
  import FormDialogContent from "./FormDialogContent.svelte";
  import FormDialogOverlay from "./FormDialogOverlay.svelte";
  import FormDialogRoot from "./FormDialogRoot.svelte";

  let { dialog, children }: { dialog: Dialog; children: Snippet } = $props();
</script>

<FormDialogRoot>
  <FormDialogOverlay {dialog} />
  <FormDialogContent {dialog}>
    {@render children()}
  </FormDialogContent>
</FormDialogRoot>
