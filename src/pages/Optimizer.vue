<script lang="ts" setup>
const splitterPos = ref(100);
</script>

<template>
  <v-container class="fill-height d-flex flex-row ma-0 pa-0" :fluid="true">
    <v-sheet class="fill-height border-e-md" style="z-index: 1">
      <Menu :width="splitterPos"></Menu>
    </v-sheet>
    <v-hover class="fill-height">
      <template v-slot:default="{ isHovering, props }">
        <v-sheet
          :class="[
            'fill-height',
            'mx-n1',
            isHovering ? 'opacity-100' : 'opacity-0',
          ]"
          :width="8"
          v-bind="props"
          color="primary"
          style="cursor: ew-resize; z-index: 2"
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
