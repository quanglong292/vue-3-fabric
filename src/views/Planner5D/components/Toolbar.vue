<template>
  <div class="toolbar">
    <button @click="startDrawing">Draw Room</button>
    <button @click="stopDrawing">Stop Drawing</button>
    <FurnitureList />
    <ExportButton />
  </div>
</template>

<script setup lang="ts">
import { useCanvasStore } from "@/stores/canvasStore";
import FurnitureList from "./FurnitureList.vue";
import ExportButton from "./ExportButton.vue";

const canvasStore = useCanvasStore();

const startDrawing = () => {
  canvasStore.startDrawingMode();
};

const stopDrawing = () => {
  canvasStore.stopDrawingMode();
};
</script>

<style scoped>
.toolbar {
  @apply fixed top-0 left-0 h-full w-48 bg-gray-100 p-4 overflow-y-auto;
}

button {
  @apply w-full mb-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600;
}
</style>
