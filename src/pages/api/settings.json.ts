import { fetchSettings } from "@/entities/settings/server";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const settings = await fetchSettings();
  return new Response(JSON.stringify(settings));
};
