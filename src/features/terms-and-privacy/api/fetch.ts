import { db } from "@/db/client";
import { settings } from "@/db/schema";

export async function fetchTermsMD() {
  const [{ termsOfService }] = await db
    .select({
      termsOfService: settings.termsOfService,
    })
    .from(settings);
  if (!termsOfService) throw new Error("No terms of service found");
  return termsOfService;
}
export async function fetchPrivacyMD() {
  const [{ privacyPolicy }] = await db
    .select({
      privacyPolicy: settings.privacyPolicy,
    })
    .from(settings);
  if (!privacyPolicy) throw new Error("No privacy policy found");
  return privacyPolicy;
}
