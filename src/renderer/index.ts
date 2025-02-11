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
    ctx.save();
    ctx.translate(
      Math.floor(canvasWidth.value / 2),
      Math.floor(canvasHeight.value / 2)
    );
    const img = imageStore as Record<StateProps, ImageBitmap>;
    draw(ctx, img.grid, 0, 0, 1, 1, 0);
    ctx.restore();
  };
}

const pixelPerBlock = 64;

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
    sSize * pixelPerBlock,
    sSize * pixelPerBlock,
    controlStore.blockSize * (controlStore.zeroX + dx),
    Math.round(controlStore.blockSize * (controlStore.zeroY + dy)),
    controlStore.blockSize * sSize,
    controlStore.blockSize * sSize
  );
}
