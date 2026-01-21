import { z } from "astro:schema";

export const VacancySchema = z.object({
  id: z.string(),
  positionName: z.string(),
  workplace: z.preprocess((v) => {
    if (typeof v === "string") {
      try {
        return JSON.parse(v);
      } catch {
        return v;
      }
    }
    return v;
  }, z.array(z.string())),
  body: z.string(),
  formLink: z.string(),
});
export type Vacancy = z.infer<typeof VacancySchema>;
