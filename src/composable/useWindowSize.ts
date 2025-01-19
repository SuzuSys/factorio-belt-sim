// Reference: https://zenn.dev/nakurei/articles/real-time-screen-size-detection-in-nuxtjs
import { useLayout } from "vuetify";

interface WindowSize {
  width: number;
  height: number;
  headerHeight: number;
}

export function useWindowSize(): globalThis.Ref<WindowSize> {
  const windowSize = ref<WindowSize>({
    width: 0,
    height: 0,
    headerHeight: 0,
  });

  const onResize = (): void => {
    windowSize.value.width = window.innerWidth;
    windowSize.value.height = window.innerHeight;
  };

  onMounted(() => {
    onResize();
    windowSize.value.headerHeight = useLayout().mainRect.value.top;
    window.addEventListener("resize", onResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });

  return windowSize;
}
