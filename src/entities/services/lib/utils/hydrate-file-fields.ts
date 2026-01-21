import { hydrateFileFields } from "@/shared/utils";
import type { Service } from "../../model/schema";

const FILE_FIELDS = ["image"] as const satisfies readonly (keyof Service)[];

export const hydrateServicesFileFields = <T extends Partial<Service>>(
  service: T,
) => hydrateFileFields(service, FILE_FIELDS);
