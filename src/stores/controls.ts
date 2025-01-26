import { defineStore } from "pinia";

export const useControlStore = defineStore("controler", {
  state: () => ({
    pixelSize: 64,
    zeroX: 0,
    zeroY: 0,
  }),
});
