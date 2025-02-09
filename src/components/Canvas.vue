<script setup lang="ts">
import { useImageStore } from "@/stores/bitmaps";
import { useRenderer } from "@/renderer";
import { type ShallowRef } from "vue";
import { useControlStore } from "@/stores/controls";
const props = defineProps<{
  width: number;
  height: number;
}>();

const canvas = useTemplateRef("canvas") as Readonly<
  ShallowRef<HTMLCanvasElement | null>
>;

const imageStore = useImageStore();
const controlStore = useControlStore();

const canvasWidth = computed(() => props.width);
const canvasHeight = computed(() => props.height);
const renderer = useRenderer(canvasWidth, canvasHeight);

let ctx: CanvasRenderingContext2D | null | undefined;

onMounted(() => {
  ctx = canvas.value?.getContext("2d");
  if (!ctx || !imageStore.loaded) return;
  renderer(ctx);
});

watch(
  () => imageStore.loaded,
  () => {
    if (!ctx) return;
    renderer(ctx);
  },
  { once: true }
);

onUpdated(() => {
  if (!ctx) return;
  renderer(ctx);
});

function expand(e: WheelEvent) {
  if (!ctx) return;
  if (e.deltaY > 0) controlStore.wheelIncrement();
  else controlStore.wheelDecrement();
  renderer(ctx);
}
</script>

<template>
  <v-container class="fill-height pa-0" :fluid="true">
    <canvas
      ref="canvas"
      :width="props.width"
      :height="props.height"
      @wheel="expand"
    ></canvas>
  </v-container>
</template>
