import { toAssetUrl } from "./to-asset-url";

type FileFieldValue = string | null | undefined;

export const hydrateFileFields = <
  T extends Record<string, unknown>,
  K extends string,
>(
  collectionItem: T,
  fileFields: readonly K[],
) => {
  const hydrated = { ...collectionItem } as Record<string, unknown>;
  for (const field of fileFields) {
    if (!(field in hydrated)) continue;
    const id = hydrated[field] as FileFieldValue;
    hydrated[field] = toAssetUrl(id ?? null);
  }
  return hydrated as T;
};
