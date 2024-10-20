<template>
  <button @click="exportAsPNG">Export as PNG</button>
</template>

<script setup lang="ts">
import { useCanvasStore } from "@/stores/canvasStore";

const canvasStore = useCanvasStore();

const exportAsPNG = () => {
  const { canvas } = canvasStore;
  if (canvas) {
    const dataURL = canvas.toDataURL({
      format: "png",
      multiplier: 2,
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "design.png";
    link.click();
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
