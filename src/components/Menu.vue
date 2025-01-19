<script setup lang="ts">
const props = defineProps<{
  width: number;
  height: number;
}>();
const containerPadding = 4;
</script>

<template>
  <v-container
    :fluid="true"
    :width="props.width"
    :height="props.height"
    :class="[`pa-${containerPadding}`]"
    style="display: block; overflow-y: auto"
  >
    <v-row v-for="i in 20">
      <v-col :cols="12">{{ i }}</v-col>
    </v-row>
  </v-container>
</template>
