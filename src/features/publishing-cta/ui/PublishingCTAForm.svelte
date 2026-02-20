<script lang="ts">
  import type { Settings } from "@/entities/settings";
  import { DEFAULT_SUPPORT_EMAIL } from "@/shared/consts";
  import { ConsentCheckbox, FormHeader } from "@/shared/ui";
  import InputGroup from "@/shared/ui/InputGroup.svelte";
  import { validator } from "@felte/validator-zod";
  import { DIRECTUS_URL } from "astro:env/client";
  import { createForm } from "felte";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";
  import {
    PublishingCTAFormSchema,
    type PublishingCTAFormType,
  } from "../model/form.schema";
  import { PUBLISHING_CTA_HEADER } from "../model/config";

  let {
    onSuccess,
    showHeader = true,
  }: { onSuccess?: () => void; showHeader?: boolean } = $props();

  let hasSubmitted = $state(false);
  let supportEmail = $state(DEFAULT_SUPPORT_EMAIL);
  const { form, reset, errors, isSubmitting } = createForm({
    extend: validator<PublishingCTAFormType>({
      schema: PublishingCTAFormSchema,
    }),
    onSubmit: async (values) => {
      const { agree_privacy, ...payload } = values;
      const response = await fetch(`${DIRECTUS_URL}/items/form_publishing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Ошибка отправки формы");
    },

    onSuccess: () => {
      toast.success("Ваша заявка успешно отправлена!");
      hasSubmitted = false;
      reset();
      onSuccess?.();
    },
    onError: () => {
      toast.error("Произошла ошибка при отправке формы");
    },
  });

  type Field = {
    name: keyof PublishingCTAFormType;
    placeholder: string;
    error?: string | null;
  } & ({ isTextarea: true } | { isTextarea?: undefined });

  const fields = $derived<Field[]>([
    {
      name: "full_name",
      placeholder: "ФИО *",
      error: hasSubmitted ? $errors.full_name?.at(0) : null,
    },
    {
      name: "contact",
      placeholder: "Контакт (tg:, vk:, email, phone) *",
      error: hasSubmitted ? $errors.contact?.at(0) : null,
    },
    {
      name: "build_link",
      placeholder: "Ссылка на сборку *",
      error: hasSubmitted ? $errors.build_link?.at(0) : null,
    },
    {
      name: "description",
      placeholder: "Описание",
      error: hasSubmitted ? $errors.description?.at(0) : null,
      isTextarea: true,
    },
  ]);

  onMount(async () => {
    const res = await fetch("/api/settings.json");
    const { supportEmails }: Settings = await res.json();
    if (supportEmails.publishing) supportEmail = supportEmails.publishing;
  });
</script>

<form use:form onsubmit={() => (hasSubmitted = true)}>
  {#if showHeader}
    <FormHeader
      title={PUBLISHING_CTA_HEADER.title}
      subtitle={PUBLISHING_CTA_HEADER.subtitle}
    />
  {/if}
  <div class="fields">
    {#each fields as field (field.name)}
      <InputGroup {...field} />
    {/each}
    <ConsentCheckbox
      error={hasSubmitted ? $errors.agree_privacy?.at(0) : null}
    />
  </div>
  <button class="cta" disabled={$isSubmitting}>
    {#if $isSubmitting}
      Отправка...
    {:else}
      Отправить
    {/if}
  </button>
  <p class="support">
    Справка: <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
  </p>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .fields {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .cta {
    align-self: center;
  }

  .support {
    font-size: 0.875rem;
    text-align: center;
  }
</style>
