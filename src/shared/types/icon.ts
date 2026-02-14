import type { IconifyIcon } from "@iconify/svelte";

export type UiIcon =
  | { type: "iconify"; icon: IconifyIcon | string }
  | { type: "svg"; icon: string };

export type SlugToIconMap<TSlug extends string> = Record<TSlug, UiIcon>;
