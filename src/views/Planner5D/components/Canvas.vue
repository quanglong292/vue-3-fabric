<template>
  <canvas ref="canvasContainer" class="canvas-container"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { fabric } from "fabric";
import { useCanvasStore } from "@/stores/canvasStore";

const canvasContainer = ref<HTMLElement | any>(null);
const canvas = ref<fabric.Canvas | null>(null);
const canvasStore = useCanvasStore();

onMounted(() => {
  if (canvasContainer.value) {
    canvas.value = new fabric.Canvas(canvasContainer.value, {
      width: 1000,
      height: 1000,
      backgroundColor: "#fff",
    });
    canvasStore.setCanvas(canvas.value);
  }
});

onBeforeUnmount(() => {
  canvas.value?.dispose();
});
</script>

<style scoped>
.canvas-container {
  @apply ml-52 p-4; /* Adjust according to toolbar width */
  border: 1px solid #ccc;
}
</style>
