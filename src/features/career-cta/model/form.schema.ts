import { ContactSchema } from "@/shared/utils";
import { z } from "astro:schema";

export const CareerCTAFormSchema = z.object({
  full_name: z
    .string({
      required_error: "Укажите ФИО",
      invalid_type_error: "ФИО должно быть строкой",
    })
    .trim()
    .min(1, "Укажите ФИО")
    .max(200, "ФИО слишком длинное"),

  contact: ContactSchema,

  portfolio_link: z
    .string({
      required_error: "Укажите ссылку на портфолио",
      invalid_type_error: "Ссылка на портфолио должна быть строкой",
    })
    .trim()
    .min(1, "Укажите ссылку на портфолио")
    .url("Укажите корректную ссылку на портфолио"),

  cover_letter: z
    .string({
      invalid_type_error: "Сопроводительное письмо должно быть строкой",
    })
    .trim()
    .max(1000, "Сопроводительное письмо должно быть не длиннее 1000 символов")
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
export type CareerCTAFormType = z.infer<typeof CareerCTAFormSchema>;
