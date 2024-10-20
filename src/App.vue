<template>
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { useRoute, RouterView, RouterLink } from "vue-router";

const route = useRoute();
</script>
