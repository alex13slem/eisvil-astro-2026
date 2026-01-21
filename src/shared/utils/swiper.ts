import type { Swiper } from "swiper/types";

export function attachNavigation(
  swiper: Swiper,
  prevEl: HTMLElement,
  nextEl: HTMLElement
) {
  swiper.params.navigation = {
    ...(typeof swiper.params.navigation === "object"
      ? swiper.params.navigation
      : {}),
    prevEl,
    nextEl,
  };

  swiper.navigation.destroy();
  swiper.navigation.init();
  swiper.navigation.update();
}
