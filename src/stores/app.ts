// Utilities
import { defineStore } from "pinia";

export type Grid = "grid";

export type Belt =
  | "belt-straight"
  | "belt-left"
  | "belt-right"
  | "underbelt-in-straight"
  | "underbelt-in-left"
  | "underbelt-in-right"
  | "underbelt-out";

export const useImageStore = defineStore("imager", {
  state: () => ({
    bitmapGrid: new Map<Grid, ImageBitmap>(),
    bitmapBelt: new Map<
      Belt,
      [ImageBitmap, ImageBitmap, ImageBitmap, ImageBitmap]
    >(),
  }),
  actions: {
    registerBelt(
      name: Belt,
      images: [ImageBitmap, ImageBitmap, ImageBitmap, ImageBitmap]
    ) {
      this.bitmapBelt.set(name, images);
    },
    registerGrid(name: Grid, image: ImageBitmap) {
      this.bitmapGrid.set(name, image);
    },
    getBitmapBelt(name: Belt, index: 0 | 1 | 2 | 3) {
      return this.bitmapBelt.get(name)?.[index];
    },
    getBitmapGrid(name: Grid) {
      return this.bitmapGrid.get(name);
    },
  },
});
