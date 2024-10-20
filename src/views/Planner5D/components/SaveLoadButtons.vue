<template>
  <div>
    <button @click="saveDesign">Save Design</button>
    <button @click="loadDesign">Load Design</button>
  </div>
</template>

<script setup lang="ts">
import { useCanvasStore } from "@/stores/canvasStore";

const canvasStore = useCanvasStore();

const saveDesign = () => {
  const { canvas } = canvasStore;
  if (canvas) {
    const json = canvas.toJSON();
    localStorage.setItem("design", JSON.stringify(json));
    alert("Design saved locally!");
  }
};

const loadDesign = () => {
  const { canvas } = canvasStore;
  if (canvas) {
    const json = localStorage.getItem("design");
    if (json) {
      canvas.loadFromJSON(json, () => {
        canvas.renderAll();
        alert("Design loaded!");
      });
    } else {
      alert("No design found in local storage.");
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
