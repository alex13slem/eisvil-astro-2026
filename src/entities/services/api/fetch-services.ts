import { db } from "@/db/client";
import { developmentPage, publishingPage } from "@/db/schema";
import { hydrateServicesFileFields } from "../lib/utils/hydrate-file-fields";
import { ServiceSchema, type Service } from "../model/schema";

/**
 * Fetches development and publishing page services.
 *
 * @returns {Promise<[Service, Service]>} An array of two services, publishing and development.
 */
export default async function fetchServices(): Promise<[Service, Service]> {
  const developmentPageEntity = (await db.select().from(developmentPage)).at(0);
  const publishingPageEntity = (await db.select().from(publishingPage)).at(0);

  const { success, data, error } = await ServiceSchema.array().safeParseAsync([
    publishingPageEntity,
    developmentPageEntity,
  ]);
  if (!success) throw new Error(error.message);
  return data.map(hydrateServicesFileFields) as [Service, Service];
}
