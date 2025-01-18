<script setup lang="ts">
import { type ShallowRef } from "vue";
import { useImageStore } from "@/stores/app";

const store = useImageStore();
const image = useTemplateRef("img") as Readonly<
  ShallowRef<HTMLImageElement | null>
>;

async function loaded() {
  if (!image.value) return;
  const bm = await createImageBitmap(image.value);
  store.registerGrid("grid", bm);
}
</script>

<template>
  <img ref="img" v-show="false" src="../assets/grid.png" @load="loaded" />
</template>
