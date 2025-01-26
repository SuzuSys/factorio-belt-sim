import { useImageStore, type StateProps } from "@/stores/bitmaps";
import { useControlStore } from "@/stores/controls";

const imageStore = useImageStore();
const controlStore = useControlStore();

export function renderer(ctx: CanvasRenderingContext2D) {
  if (!imageStore.loaded) return;
  const img = imageStore as Record<StateProps, ImageBitmap>;
  draw(ctx, img.grid, 0, 0, 64, 0, 0);
}

function draw(
  ctx: CanvasRenderingContext2D,
  img: ImageBitmap,
  sx: number,
  sy: number,
  sSize: number,
  dx: number,
  dy: number
) {
  const { pixelSize } = controlStore;
  ctx.drawImage(img, sx, sy, sSize, sSize, dx, dy, pixelSize, pixelSize);
}
