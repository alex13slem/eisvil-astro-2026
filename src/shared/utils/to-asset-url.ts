import { DIRECTUS_URL } from "astro:env/client";

export function toAssetUrl<T extends string | null>(
  id: T,
): T extends string ? string : null;
export function toAssetUrl(id: string | null) {
  return id ? new URL(`/assets/${id}`, DIRECTUS_URL).toString() : null;
}
