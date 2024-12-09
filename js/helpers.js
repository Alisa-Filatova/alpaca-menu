export const isTouchDevice = () => {
  return 'ontouchstart' in window
    || navigator.maxTouchPoints > 0
    || navigator.msMaxTouchPoints > 0;
};

export const isDesktopDevice = () => {
  const isLargeScreen = window.innerWidth >= 1440;

  return !isTouchDevice() && isLargeScreen;
};
