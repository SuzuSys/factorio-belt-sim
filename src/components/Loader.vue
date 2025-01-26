<script setup lang="ts">
import { useImageStore, stateProps, type StateProps } from "@/stores/app";

const store = useImageStore();
const imgs: Map<StateProps, HTMLImageElement> = new Map();

function elementRegister(
  el: Element | ComponentPublicInstance | null,
  name: StateProps
) {
  if (el instanceof HTMLImageElement) {
    imgs.set(name, el);
  }
}

async function loaded(name: StateProps) {
  const el = imgs.get(name);
  if (!el) return;
  store[name] = await createImageBitmap(el);
}
</script>

<template>
  <img
    v-for="name in stateProps"
    v-if="!store.loaded"
    :ref="(el) => elementRegister(el, name)"
    v-show="false"
    :src="`/factorio/${name}.png`"
    @load="loaded(name)"
  />
</template>
