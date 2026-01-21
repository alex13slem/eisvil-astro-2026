const DIRECTUS_URL = import.meta.env.DIRECTUS_URL;
export const toAssetUrl = (id: string | null) =>
  id ? new URL(`/assets/${id}`, DIRECTUS_URL).toString() : null;
