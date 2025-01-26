<script setup lang="ts">
import { useImageStore } from "@/stores/app";
import { type ShallowRef } from "vue";
const props = defineProps<{
  width: number;
  height: number;
}>();

const canvas = useTemplateRef("canvas") as Readonly<
  ShallowRef<HTMLCanvasElement | null>
>;
const store = useImageStore();
let ctx: CanvasRenderingContext2D | null | undefined;
let img:
  | {
      readonly height: number;
      readonly width: number;
      close: () => void;
    }
  | undefined;

onMounted(() => {
  ctx = canvas.value?.getContext("2d");
  if (!store.loaded) return;
  img = store.grid;
  if (!img) return;
  ctx?.drawImage(img, -50, 0);
});

watch(
  () => store.loaded,
  () => {
    img = store.grid;
    if (!img) return;
    ctx?.drawImage(img, -50, 0);
  }
);

onUpdated(() => {
  if (!img) return;
  ctx?.drawImage(img, -50, 0);
});
</script>

<template>
  <v-container class="fill-height pa-0" :fluid="true">
    <canvas ref="canvas" :width="props.width" :height="props.height"></canvas>
  </v-container>
</template>
