<script lang="ts" setup>
import { useWindowSize } from "@/composable/useWindowSize";
const windowSize = useWindowSize();
const splitterNagativeMarginX = 1;
const splitterWidthPx = 8;
const splitterPos = ref(200);
const isForcusing = ref(false);

function splitterMousedown(e: MouseEvent) {
  isForcusing.value = true;
  splitterPos.value = e.clientX;
  document.addEventListener("mousemove", resize);
}
function splitterMouseup() {
  isForcusing.value = false;
  document.removeEventListener("mousemove", resize);
}
function resize(e: MouseEvent) {
  splitterPos.value = e.clientX;
}

const menuWidth = computed(() => splitterPos.value - 2); // 2 is border-md line width
const canvasWidth = computed(
  () => windowSize.value.width - splitterPos.value - 2
); // 2 is border-md line width
const vMainHeight = computed(
  () => windowSize.value.height - windowSize.value.headerHeight
);
</script>

<template>
  <v-container class="fill-height d-flex flex-row ma-0 pa-0" :fluid="true">
    <v-sheet class="fill-height border-e-md" style="z-index: 2">
      <Menu :width="menuWidth" :height="vMainHeight"></Menu>
    </v-sheet>
    <v-hover open-delay="100">
      <template v-slot:default="{ isHovering, props }">
        <v-sheet
          @mousedown="splitterMousedown"
          @mouseup="splitterMouseup"
          :class="[
            'fill-height',
            `mx-n${splitterNagativeMarginX}`,
            isHovering || isForcusing ? 'opacity-100' : 'opacity-0',
          ]"
          :width="splitterWidthPx"
          v-bind="props"
          color="primary"
          style="
            cursor: ew-resize;
            z-index: 3;
            transition: opacity 0.1s 0.1s ease-in-out;
          "
        ></v-sheet>
      </template>
    </v-hover>
    <v-sheet class="fill-height flex-grow-1 border-s-md" style="z-index: 1">
      <Canvas :width="canvasWidth" :height="vMainHeight"></Canvas>
    </v-sheet>
  </v-container>

  <div>
    <GridLoader />
  </div>
</template>
