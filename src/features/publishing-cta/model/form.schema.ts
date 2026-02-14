import { ContactSchema } from "@/shared/utils";
import { z } from "astro:schema";

export const PublishingCTAFormSchema = z.object({
  full_name: z
    .string({
      required_error: "Укажите ФИО",
      invalid_type_error: "ФИО должно быть строкой",
    })
    .trim()
    .min(1, "Укажите ФИО")
    .max(200, "ФИО слишком длинное"),

  contact: ContactSchema,

  build_link: z
    .string({
      required_error: "Укажите ссылку на сборку",
      invalid_type_error: "Ссылка на сборку должна быть строкой",
    })
    .trim()
    .min(1, "Укажите ссылку на сборку")
    .url("Укажите корректную ссылку на сборку"),

  description: z
    .string({
      invalid_type_error: "Описание должно быть строкой",
    })
    .trim()
    .max(1000, "Описание должно быть не длиннее 1000 символов")
    .optional(),
  agree_privacy: z
    .boolean({
      required_error: "Необходимо согласие с политикой конфиденциальности",
      invalid_type_error: "Необходимо согласие с политикой конфиденциальности",
    })
    .refine((value) => value === true, {
      message: "Необходимо согласие с политикой конфиденциальности",
    }),

});

export type PublishingCTAFormType = z.infer<typeof PublishingCTAFormSchema>;
