import { defineStore } from "pinia";

export const stateProps = [
  "grid",
  "belt",
  "ubelt",
  "ubeltFrontPatch",
  "ubeltBackPatch",
] as const;

export type StateProps = (typeof stateProps)[number];
type State = Record<StateProps, ImageBitmap | undefined>;

export const useImageStore = defineStore("imager", {
  state: () => ({} as State),
  getters: {
    loaded(state): boolean {
      for (const p of stateProps) {
        if (!state[p]) return false;
      }
      return true;
    },
  },
});
