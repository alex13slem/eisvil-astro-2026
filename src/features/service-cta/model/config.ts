import { DEVELOPMENT_ORDER_CTA_HEADER } from "@/features/development-order-cta/model/config";
import { PUBLISHING_CTA_HEADER } from "@/features/publishing-cta/model/config";

export type ServiceCTAType = "development" | "publishing";

export const SERVICE_CTA_TRIGGER_TEXT = "подать заявку";
export const SERVICE_CTA_TYPE_PLACEHOLDER = "Выберите тип заявки";

export const SERVICE_CTA_TYPE_OPTIONS = [
  { value: "development", label: "Разработка" },
  { value: "publishing", label: "Публикация" },
] as const satisfies ReadonlyArray<{ value: ServiceCTAType; label: string }>;

export const SERVICE_CTA_HEADER_BY_TYPE = {
  development: DEVELOPMENT_ORDER_CTA_HEADER,
  publishing: PUBLISHING_CTA_HEADER,
} as const satisfies Record<
  ServiceCTAType,
  { title: string; subtitle: string }
>;
