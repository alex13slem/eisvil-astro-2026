import { ContactSchema } from "@/shared/utils";
import { z } from "astro:schema";

export const DevelopmentOrderCTAFormSchema = z.object({
  full_name: z
    .string({
      required_error: "Укажите ФИО",
      invalid_type_error: "ФИО должно быть строкой",
    })
    .trim()
    .min(1, "Укажите ФИО")
    .max(200, "ФИО слишком длинное"),

  company_name: z
    .string({
      invalid_type_error: "Название компании должно быть строкой",
    })
    .trim()
    .max(200, "Название компании слишком длинное")
    .optional(),

  contact: ContactSchema,

  description: z
    .string({
      required_error: "Укажите описание",
      invalid_type_error: "Описание должно быть строкой",
    })
    .trim()
    .min(1, "Укажите описание")
    .max(1000, "Описание должно быть не длиннее 1000 символов"),

  files: z
    .array(z.string())
    .max(3, "Можно загрузить до 3 файлов")
    .optional(),

  agree_privacy: z
    .boolean({
      required_error:
        "Необходимо согласие с политикой конфиденциальности",
      invalid_type_error:
        "Необходимо согласие с политикой конфиденциальности",
    })
    .refine((value) => value === true, {
      message: "Необходимо согласие с политикой конфиденциальности",
    }),
});

export type DevelopmentOrderCTAFormType = z.infer<
  typeof DevelopmentOrderCTAFormSchema
>;
