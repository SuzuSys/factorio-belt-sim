import { defineStore } from "pinia";
import getBlockSize from "@/renderers/zoom";
import params from "@/renderers/params";

const { lambda } = params;

export const useControlStore = defineStore("controler", {
  state: () => ({
    /** positive integer. Range: [0, params.lambda] */
    wheelPos: 48,
    /** real number. (unit: block) */
    zeroX: 0,
    /** real number. (unit: block) */
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
      this.zeroX += params.blockStep;
    },
    posYIncrement() {
      this.zeroY += params.blockStep;
    },
    posXDecrement() {
      this.zeroX -= params.blockStep;
    },
    posYDecrement() {
      this.zeroY -= params.blockStep;
    },
  },
});
