<script lang="ts" setup></script>

<template>
  <v-container class="fill-height d-flex flex-row ma-0 pa-0" :fluid="true">
    <v-sheet class="fill-height">
      <Menu :width="100"></Menu>
    </v-sheet>
    <v-sheet
      class="fill-height border-e-sm"
      :width="3"
      style="cursor: ew-resize"
    ></v-sheet>
    <v-sheet
      class="fill-height border-s-sm"
      :width="3"
      style="cursor: ew-resize"
    ></v-sheet>
    <v-sheet class="fill-height flex-grow-1">
      <Canvas></Canvas>
    </v-sheet>
  </v-container>

  <div>
    <GridLoader />
  </div>
</template>
