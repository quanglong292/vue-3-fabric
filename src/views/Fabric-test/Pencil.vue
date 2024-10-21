<template>
  <div>
    <button @click="toggleDrawingMode">
      {{ isDrawing ? "Disable" : "Enable" }} Drawing Mode
    </button>
    <canvas ref="canvasContainer" style="border: 1px solid #ccc"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { fabric } from "fabric";

export default {
  name: "FabricPencilExample",
  setup() {
    const canvas = ref(null);
    const canvasContainer = ref(null);
    const isDrawing = ref(false);

    onMounted(() => {
      // Initialize the Fabric.js canvas
      canvas.value = new fabric.Canvas(canvasContainer.value, {
        width: 800,
        height: 600,
      });

      // Set up pencil drawing options
      canvas.value.isDrawingMode = isDrawing.value;
      canvas.value.freeDrawingBrush.color = "#000000"; // Set default color to black
      canvas.value.freeDrawingBrush.width = 5; // Set default brush width
    });

    // Toggle drawing mode
    const toggleDrawingMode = () => {
      isDrawing.value = !isDrawing.value;
      canvas.value.isDrawingMode = isDrawing.value;
    };

    return {
      canvasContainer,
      isDrawing,
      toggleDrawingMode,
    };
  },
};
</script>

<style>
/* Add some simple styling */
#canvasContainer {
  width: 800px;
  height: 600px;
}
</style>
