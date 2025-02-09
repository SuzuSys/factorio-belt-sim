import { useImageStore, type StateProps } from "@/stores/bitmaps";
import { useControlStore } from "@/stores/controls";

const imageStore = useImageStore();
const controlStore = useControlStore();

export function useRenderer(
  canvasWidth: globalThis.ComputedRef<number>,
  canvasHeight: globalThis.ComputedRef<number>
) {
  return function renderer(ctx: CanvasRenderingContext2D) {
    if (!imageStore.loaded) return;
    ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
    const img = imageStore as Record<StateProps, ImageBitmap>;
    draw(ctx, img.grid, 0, 0, 64, 0, 0);
  };
}

export function draw(
  ctx: CanvasRenderingContext2D,
  img: ImageBitmap,
  sx: number,
  sy: number,
  sSize: number,
  dx: number,
  dy: number
) {
  ctx.drawImage(
    img,
    sx,
    sy,
    sSize,
    sSize,
    controlStore.zeroX + dx,
    controlStore.zeroY + dy,
    controlStore.blockSize,
    controlStore.blockSize
  );
}
