import { db } from "@/db/client";
import { jobRoles, vacancies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { VacancySchema } from "../model/schema";

export default async function fetchVacancies() {
  const vacanciesEntities = await db
    .select({
      id: vacancies.id,
      positionName: jobRoles.name,
      workplace: vacancies.workplace,
      body: vacancies.body,
      formLink: vacancies.formLink,
    })
    .from(vacancies)
    .leftJoin(jobRoles, eq(vacancies.positionId, jobRoles.id));

  const { success, data, error } =
    await VacancySchema.array().safeParseAsync(vacanciesEntities);
  if (!success) throw new Error(error.message);
  return data;
}
