import { z } from "astro:schema";

export const SettingsSchema = z.object({
  supportEmails: z.object({
    publishing: z.string().nullable(),
    development: z.string().nullable(),
    career: z.string().nullable(),
  }),
});
export type Settings = z.infer<typeof SettingsSchema>;
