import { z } from "astro:schema";

export const ContactSchema = z
  .string()
  .trim()
  .min(1, "Контакт обязателен")
  .superRefine((value, ctx) => {
    // email
    if (z.string().email().safeParse(value).success) return;

    // phone (международный формат, упрощённо)
    const phoneOk = /^\+?[0-9][0-9\s().-]{6,19}$/.test(value);
    if (phoneOk) return;

    // соцсети
    if (value.startsWith("tg:") && value.length > 3) return;
    if (value.startsWith("vk:") && value.length > 3) return;

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        "Укажите корректный контакт: email, номер телефона или формат tg: / vk:",
    });
  });
