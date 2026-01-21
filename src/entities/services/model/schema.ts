import { z } from "astro:schema";

export const ServiceSchema = z.object({
  image: z.string(),
  description: z.string(),
  body: z.string(),
});
export type Service = z.infer<typeof ServiceSchema>;
