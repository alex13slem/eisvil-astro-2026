import decor1Png from "@/shared/assets/jov-roles-decors-1.png";
import decor2Png from "@/shared/assets/jov-roles-decors-2.png";
import decor3Png from "@/shared/assets/jov-roles-decors-3.png";
import decor4Png from "@/shared/assets/jov-roles-decors-4.png";
import decor5Png from "@/shared/assets/jov-roles-decors-5.png";
import decor6Png from "@/shared/assets/jov-roles-decors-6.png";
import decor7Png from "@/shared/assets/jov-roles-decors-7.png";
import decor8Png from "@/shared/assets/jov-roles-decors-8.png";
import decor9Png from "@/shared/assets/jov-roles-decors-9.png";

const DECORS = [
  decor1Png,
  decor2Png,
  decor3Png,
  decor4Png,
  decor5Png,
  decor6Png,
  decor7Png,
  decor8Png,
  decor9Png,
] as const;

export function getVacancyDecorByIdx(index: number): (typeof DECORS)[number] {
  const n = DECORS.length;
  const i = ((index % n) + n) % n;
  return DECORS[i];
}
