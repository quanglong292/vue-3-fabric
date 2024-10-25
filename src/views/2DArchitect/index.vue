<script setup lang="ts">
import Canvas from "./components/Canvas.vue";
import HToolbar from "./components/HToolbar.vue";
import Toolbar from "./components/Toolbar.vue";
</script>
<template>
  <div class="max-w-full max-h-screen relative">
    <HToolbar />
    <Canvas />
    <Toolbar />
  </div>
</template>

<style scoped></style>
