<script lang="ts">
  import type { Settings } from "@/entities/settings";
  import { DEFAULT_SUPPORT_EMAIL } from "@/shared/consts";
  import { ConsentCheckbox, FormHeader, InputGroup } from "@/shared/ui";
  import { validator } from "@felte/validator-zod";
  import { DIRECTUS_URL } from "astro:env/client";
  import { createForm } from "felte";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";
  import {
    CareerCTAFormSchema,
    type CareerCTAFormType,
  } from "../model/form.schema";

  let { onSuccess, testLink }: { onSuccess?: () => void; testLink: string } =
    $props();

  let hasSubmitted = $state(false);
  let supportEmail = $state(DEFAULT_SUPPORT_EMAIL);
  const { form, reset, errors, isSubmitting } = createForm({
    extend: validator<CareerCTAFormType>({
      schema: CareerCTAFormSchema,
    }),
    onSubmit: async (values) => {
      const { agree_privacy, ...payload } = values;
      const response = await fetch(`${DIRECTUS_URL}/items/form_career`, {
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
      toast.error("Что-то пошло не так, попробуйте еще раз");
    },
  });

  type Field = {
    name: keyof CareerCTAFormType;
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
      name: "portfolio_link",
      placeholder: "Ссылка на портфолио *",
      error: hasSubmitted ? $errors.portfolio_link?.at(0) : null,
    },
    {
      name: "cover_letter",
      placeholder: "Сопроводительное письмо",
      error: hasSubmitted ? $errors.cover_letter?.at(0) : null,
      isTextarea: true,
    },
  ]);

  onMount(async () => {
    const res = await fetch("/api/settings.json");
    const { supportEmails }: Settings = await res.json();
    if (supportEmails.career) supportEmail = supportEmails.career;
  });
</script>

<form use:form onsubmit={() => (hasSubmitted = true)}>
  <FormHeader
    title="Стань частью комманды"
    subtitle="Отправь своё портфолио и мы свяжемся с тобой в ближайшее время"
  />
  <div class="fields">
    {#each fields as field (field.name)}
      <InputGroup {...field} />
    {/each}
    <ConsentCheckbox
      error={hasSubmitted ? $errors.agree_privacy?.at(0) : null}
    />
  </div>
  <footer>
    <a
      class="cta --outline"
      href={testLink}
      target="_blank"
      rel="noopener noreferrer">тестовое задание</a
    >
    <button class="cta" disabled={$isSubmitting}>
      {#if $isSubmitting}
        Отправка...
      {:else}
        Отправить
      {/if}
    </button>
  </footer>
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

  footer {
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: center;
  }

  .support {
    font-size: 0.875rem;
    text-align: center;
  }
</style>
