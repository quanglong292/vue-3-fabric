<!-- App.vue -->
<template>
  <div class="app-container flex flex-col items-center">
    <Toolbar />
    <Canvas />
  </div>
</template>

<script setup lang="ts">
import Toolbar from "./components/Toolbar.vue";
import Canvas from "./components/Canvas.vue";
import { defineAsyncComponent } from "vue";
</script>
