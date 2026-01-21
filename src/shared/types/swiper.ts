import type { Swiper } from "swiper/types";

export type SwiperOnProgressEvent = CustomEvent<
  [swiper: Swiper, progress: number]
>;
export type SwiperOnSlideChangeEvent = CustomEvent<[swiper: Swiper]>;
