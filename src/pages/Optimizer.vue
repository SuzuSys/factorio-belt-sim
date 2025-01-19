<script lang="ts" setup>
const splitterPos = ref(100);
const isForcusing = ref(false);
function splitterMousedown(e: MouseEvent) {
  isForcusing.value = true;
  splitterPos.value = e.clientX - 2;
  document.addEventListener("mousemove", resize);
}
function splitterMouseup(e: MouseEvent) {
  isForcusing.value = false;
  document.removeEventListener("mousemove", resize);
}
function resize(e: MouseEvent) {
  splitterPos.value = e.clientX - 2;
}
</script>

<template>
  <v-container class="fill-height d-flex flex-row ma-0 pa-0" :fluid="true">
    <v-sheet class="fill-height border-e-md" style="z-index: 1">
      <Menu :width="splitterPos"></Menu>
    </v-sheet>
    <v-hover open-delay="100">
      <template v-slot:default="{ isHovering, props }">
        <v-sheet
          @mousedown="splitterMousedown"
          @mouseup="splitterMouseup"
          :class="[
            'fill-height',
            'mx-n1',
            isHovering || isForcusing ? 'opacity-100' : 'opacity-0',
          ]"
          :width="8"
          v-bind="props"
          color="primary"
          style="
            cursor: ew-resize;
            z-index: 2;
            transition: opacity 0.1s 0.1s ease-in-out;
          "
        ></v-sheet>
      </template>
    </v-hover>
    <v-sheet class="fill-height flex-grow-1 border-s-md" style="z-index: 1">
      <Canvas></Canvas>
    </v-sheet>
  </v-container>

  <div>
    <GridLoader />
  </div>
</template>
