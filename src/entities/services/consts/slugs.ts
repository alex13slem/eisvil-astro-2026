export const SERVICES_SLUGS = ["publishing", "development"] as const;
export type ServicesSlug = (typeof SERVICES_SLUGS)[number];
