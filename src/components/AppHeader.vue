<script setup lang="ts">
const route = useRouter();
const path = route.currentRoute.value.name;
type PathOption = typeof path;
type PageOption = PathOption extends `/${infer page}` ? page : never;
type NameOption = Exclude<PageOption, "[...page]"> | null;

function path2name(p: PathOption): NameOption {
  const page = p.slice(1) as PageOption;
  return page === "[...path]" ? null : page;
}

const nameOption = ref(path2name(route.currentRoute.value.name));

route.beforeEach((to, _, next) => {
  nameOption.value = path2name(to.name);
  next();
});
</script>

<template>
  <v-app-bar class="px-3">
    <v-img
      src="../assets/favicon.png"
      contain
      max-width="35"
      max-height="35"
    ></v-img>
    <v-app-bar-title>Factorio Belts Optimizer</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn-toggle v-model="nameOption" rounded="0" group>
      <v-btn value="Optimizer" @click="$router.push('/Optimizer')">
        Optimizer
      </v-btn>
      <v-btn value="Algorithm" @click="$router.push('/Algorithm')">
        Algorithm
      </v-btn>
    </v-btn-toggle>
  </v-app-bar>
</template>

<style scoped lang="sass"></style>
