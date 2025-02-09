import { defineStore } from "pinia";

const lambda = 64;
const minBlockSize = 1;
const maxBlockSize = 128;
const slopeA = 1;
const slopeB = 8;

const xmid =
  (lambda * slopeB + minBlockSize - maxBlockSize) / (slopeB - slopeA);
const ymid = slopeA * xmid + minBlockSize;
const condition =
  lambda < (2 * (maxBlockSize - minBlockSize)) / (slopeA + slopeB);
const hFunc = xmid / (lambda - 2 * xmid);

function yFunc(x: number) {
  function tFunc(x: number) {
    const sqr = Math.sqrt(x / (lambda - 2 * xmid) + Math.pow(hFunc, 2));
    return -hFunc + (condition ? sqr : -sqr);
  }
  const t = tFunc(x);
  return Math.pow(t, 2) * (maxBlockSize - 2 * minBlockSize) + 2 * t * ymid;
}

export const useControlStore = defineStore("controler", {
  state: () => ({
    wheelPos: 48,
    zeroX: 0,
    zeroY: 0,
  }),
  getters: {
    blockSize(state): number {
      return Math.round(yFunc(state.wheelPos));
    },
  },
  actions: {
    wheelIncrement() {
      if (this.wheelPos < lambda) this.wheelPos++;
    },
    wheelDecrement() {
      if (this.wheelPos > 0) this.wheelPos--;
    },
  },
});
