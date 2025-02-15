import { defineStore } from "pinia";
import getBlockSize from "@/renderers/zoom";
import pixelStep from "@/renderers/move";
import params from "@/renderers/params";

const { lambda } = params;

export const useControlStore = defineStore("controler", {
  state: () => ({
    /** positive integer. Range: [0, params.lambda] */
    wheelPos: 48,
    /** integer */
    zeroX: 0,
    /** integer */
    zeroY: 0,
  }),
  getters: {
    /** positive real number. Range: [params.minBlockSize, params.maxBlockSize] */
    blockSize(state): number {
      return getBlockSize(state.wheelPos);
    },
  },
  actions: {
    wheelIncrement() {
      if (this.wheelPos < lambda) this.wheelPos++;
    },
    wheelDecrement() {
      if (this.wheelPos > 0) this.wheelPos--;
    },
    posXIncrement() {
      this.zeroX += pixelStep(this.blockSize);
    },
    posYIncrement() {
      this.zeroY += pixelStep(this.blockSize);
    },
    posXDecrement() {
      this.zeroX -= pixelStep(this.blockSize);
    },
    posYDecrement() {
      this.zeroY -= pixelStep(this.blockSize);
    },
  },
});
