import { defineStore } from "pinia";
import getBlockSize from "@/renderer/zoom";
import velocity from "@/renderer/move";
import params from "@/renderer/params";

const { lambda } = params;

export const useControlStore = defineStore("controler", {
  state: () => ({
    wheelPos: 48,
    zeroX: 0,
    zeroY: 0,
  }),
  getters: {
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
      this.zeroX += velocity(this.blockSize);
    },
    posYIncrement() {
      this.zeroY += velocity(this.blockSize);
    },
    posXDecrement() {
      this.zeroX -= velocity(this.blockSize);
    },
    posYDecrement() {
      this.zeroY -= velocity(this.blockSize);
    },
  },
});
