import { db } from "@/db/client";
import { settings } from "@/db/schema";
import type { Settings } from "../model/schema";

export default async function fetchSettings(): Promise<Settings> {
  const [
    { careerSupportEmail, developmentSupportEmail, publishingSupportEmail },
  ] = await db
    .select({
      careerSupportEmail: settings.careerSupportEmail,
      developmentSupportEmail: settings.developmentSupportEmail,
      publishingSupportEmail: settings.publishingSupportEmail,
    })
    .from(settings);
  return {
    supportEmails: {
      publishing: publishingSupportEmail,
      development: developmentSupportEmail,
      career: careerSupportEmail,
    },
  };
}
