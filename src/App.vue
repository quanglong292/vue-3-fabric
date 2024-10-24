<template>
  <main>
    <RouterView />
    <!-- <Pencil /> -->
    <!-- <Line /> -->
    <!-- <Circle /> -->
  </main>
</template>

<script setup lang="ts">
import { useRoute, RouterView, RouterLink } from "vue-router";
import Pencil from "./views/Fabric-test/Pencil.vue";
import Line from "./views/Fabric-test/Line.vue";
import Circle from "./views/Fabric-test/Circle.vue";

const route = useRoute();
</script>
