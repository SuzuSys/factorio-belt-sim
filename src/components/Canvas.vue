<script setup lang="ts">
import { useImageStore } from "@/stores/bitmaps";
import { renderer } from "@/renderers";
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
  if (!ctx || !store.loaded) return;
  renderer(ctx);
});

watch(
  () => store.loaded,
  () => {
    if (!ctx) return;
    renderer(ctx);
  }
);

onUpdated(() => {
  if (!ctx) return;
  renderer(ctx);
});
</script>

<template>
  <v-container class="fill-height pa-0" :fluid="true">
    <canvas ref="canvas" :width="props.width" :height="props.height"></canvas>
  </v-container>
</template>
