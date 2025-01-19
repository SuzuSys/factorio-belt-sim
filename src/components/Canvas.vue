<script setup lang="ts">
const props = defineProps<{
  width: number;
  height: number;
}>();
</script>

<template>
  <v-container class="fill-height pa-0" :fluid="true">
    <canvas ref="canvas" :width="props.width" :height="props.height"></canvas>
  </v-container>
</template>
