<script setup lang="ts">
import { onMounted, ref } from "vue";
import toolStore from "./useTool";

// Hooks
const { canvas, setupTool } = toolStore();

// States
const canvasRef = ref();

onMounted(() => {
  setupTool(canvasRef);
});
</script>
<template>
  <div class="flex flex-col items-center justify-center">
    <div>Tool</div>
    <canvas
      class="border-2 m-1 rounded-lg"
      ref="canvasRef"
      id="circle-id"
    ></canvas>
  </div>
</template>
