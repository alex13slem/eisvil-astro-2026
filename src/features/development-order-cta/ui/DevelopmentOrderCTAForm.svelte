<script lang="ts">
  import type { Settings } from "@/entities/settings";
  import { DEFAULT_SUPPORT_EMAIL } from "@/shared/consts";
  import { ConsentCheckbox, FormHeader } from "@/shared/ui";
  import InputGroup from "@/shared/ui/InputGroup.svelte";
  import { validator } from "@felte/validator-zod";
  import Icon from "@iconify/svelte";
  import { DIRECTUS_URL } from "astro:env/client";
  import { createForm } from "felte";
  import { onMount } from "svelte";
  import {
    DevelopmentOrderCTAFormSchema,
    type DevelopmentOrderCTAFormType,
  } from "../model/form.schema";

  const MAX_FILES = 3;
  const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

  let { onSuccess }: { onSuccess?: () => void } = $props();

  let hasSubmitted = $state(false);
  let selectedFiles = $state<File[]>([]);
  let filesError = $state<string | null>(null);
  let fileInput: HTMLInputElement | null = null;
  let supportEmail = $state(DEFAULT_SUPPORT_EMAIL);

  const { form, reset, errors, isSubmitting } = createForm({
    extend: validator<DevelopmentOrderCTAFormType>({
      schema: DevelopmentOrderCTAFormSchema,
    }),
    onSubmit: async (values) => {
      if (selectedFiles.length > MAX_FILES) {
        filesError = "Можно загрузить до 3 файлов";
        throw new Error("File limit exceeded");
      }
      if (selectedFiles.some((file) => file.size > MAX_FILE_SIZE_BYTES)) {
        filesError = "Размер каждого файла должен быть не больше 10 МБ";
        throw new Error("File size limit exceeded");
      }
      filesError = null;

      const uploadedIds: string[] = [];
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", file.name);
        const uploadResponse = await fetch(`${DIRECTUS_URL}/files`, {
          method: "POST",
          body: formData,
        });
        if (!uploadResponse.ok) {
          throw new Error("Ошибка загрузки файлов");
        }
        const uploadResult = (await uploadResponse.json()) as {
          data?: { id?: string };
        };
        const uploadedId = uploadResult.data?.id;
        if (!uploadedId) throw new Error("Ошибка загрузки файлов");
        uploadedIds.push(uploadedId);
      }

      const { agree_privacy, files, ...payload } = values;
      const response = await fetch(
        `${DIRECTUS_URL}/items/form_development_order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...payload,
            files: uploadedIds.length
              ? uploadedIds.map((id) => ({ directus_files_id: id }))
              : undefined,
          }),
        },
      );
      if (!response.ok) throw new Error("Ошибка отправки формы");
    },

    onSuccess: () => {
      toast.success("Ваша заявка успешно отправлена!");
      hasSubmitted = false;
      applySelectedFiles([]);
      filesError = null;
      reset();
      onSuccess?.();
    },

    onError: () => {
      toast.error("Произошла ошибка при отправке формы");
    },
  });

  type Field = {
    name: keyof DevelopmentOrderCTAFormType;
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
      name: "company_name",
      placeholder: "Компания",
      error: hasSubmitted ? $errors.company_name?.at(0) : null,
    },
    {
      name: "contact",
      placeholder: "Контакт (tg:, vk:, email, phone) *",
      error: hasSubmitted ? $errors.contact?.at(0) : null,
    },
    {
      name: "description",
      placeholder: "Описание *",
      error: hasSubmitted ? $errors.description?.at(0) : null,
      isTextarea: true,
    },
  ]);

  const syncInputFiles = (files: File[]) => {
    if (!fileInput) return;
    try {
      const dataTransfer = new DataTransfer();
      for (const file of files) dataTransfer.items.add(file);
      fileInput.files = dataTransfer.files;
    } catch {
      // Fallback: at least clear native count if we can't reassign files.
      fileInput.value = "";
    }
  };

  const applySelectedFiles = (files: File[]) => {
    selectedFiles = files;
    syncInputFiles(files);
  };

  const onFilesChange = (event: Event) => {
    const input = event.currentTarget as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    if (files.length > MAX_FILES) {
      filesError = "Можно загрузить до 3 файлов";
    }

    const validBySize = files.filter(
      (file) => file.size <= MAX_FILE_SIZE_BYTES,
    );
    if (validBySize.length !== files.length) {
      filesError = "Размер каждого файла должен быть не больше 10 МБ";
    }

    applySelectedFiles(validBySize.slice(0, MAX_FILES));
  };

  const removeFile = (name: string) => {
    const nextFiles = selectedFiles.filter((file) => file.name !== name);
    applySelectedFiles(nextFiles);
    if (selectedFiles.length <= MAX_FILES) filesError = null;
  };

  onMount(async () => {
    const res = await fetch("/api/settings.json");
    const { supportEmails }: Settings = await res.json();
    if (supportEmails.development) supportEmail = supportEmails.development;
  });
</script>

<form use:form onsubmit={() => (hasSubmitted = true)}>
  <FormHeader
    title="Заявка на разработку"
    subtitle="Опишите проект и приложите материалы, если есть."
  />
  <div class="fields">
    {#each fields as field (field.name)}
      <InputGroup {...field} />
    {/each}
    <div class="file-field">
      <label class="file-label" for="development-order-files">
        Файлы (до 3, до 10 МБ)
      </label>
      <input
        id="development-order-files"
        class="file-input"
        type="file"
        multiple
        bind:this={fileInput}
        onchange={onFilesChange}
      />
      {#if selectedFiles.length > 0}
        <ul class="file-list">
          {#each selectedFiles as file (file.name)}
            <li>
              <span class="file-name">{file.name}</span>
              <button
                type="button"
                class="file-remove"
                onclick={(event) => {
                  event.stopPropagation();
                  removeFile(file.name);
                }}
              >
                <Icon icon="mingcute:close-fill" />
              </button>
            </li>
          {/each}
        </ul>
      {/if}
      <span class="file-error">
        {#if hasSubmitted && filesError}
          {filesError}
        {/if}
      </span>
    </div>
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

  .file-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .file-label {
    font-size: 0.875rem;
    color: var(--color-text-primary);
  }

  .file-input {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid
      color-mix(in srgb, var(--color-text-primary), transparent 70%);
    color: var(--color-text-primary);
  }

  .file-error {
    display: inline-flex;
    min-height: 0.875rem;
    font-size: 0.75rem;
    color: var(--color-accent-400);
  }

  .file-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.875rem;
  }

  .file-list li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .file-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-remove {
    margin-bottom: 2px;
    background: none;
    border: none;
    cursor: pointer;
  }

  .file-remove:hover {
    text-decoration: underline;
  }

  .support {
    font-size: 0.875rem;
    text-align: center;
  }
</style>
