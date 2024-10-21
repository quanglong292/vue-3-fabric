<template>
  <div>
    <button class="border-2" @click="toggleDrawingLineMode">
      {{ isDrawingLine ? "Disable" : "Enable" }} Line Drawing Mode
    </button>
    <canvas ref="canvasContainer" style="border: 1px solid #ccc"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { fabric } from "fabric";

export default {
  name: "FabricLineExample",
  setup() {
    const canvas = ref(null);
    const canvasContainer = ref(null);
    const isDrawingLine = ref(false);
    let line, isDown;

    onMounted(() => {
      // Initialize the Fabric.js canvas
      canvas.value = new fabric.Canvas(canvasContainer.value, {
        width: 800,
        height: 600,
      });

      canvas.value.selection = false;

      // Event listeners for drawing a line
      canvas.value.on("mouse:down", (options) => {
        if (!isDrawingLine.value) return;
        const pointer = canvas.value.getPointer(options.e);
        isDown = true;
        line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
          stroke: "blue",
          strokeWidth: 3,
        });
        canvas.value.add(line);
      });

      canvas.value.on("mouse:move", (options) => {
        if (!isDrawingLine.value || !isDown) return;
        const pointer = canvas.value.getPointer(options.e);
        line.set({ x2: pointer.x, y2: pointer.y });
        canvas.value.renderAll();
      });

      canvas.value.on("mouse:up", () => {
        if (
          line &&
          Math.abs(line.x1 - line.x2) < 1 &&
          Math.abs(line.y1 - line.y2) < 1
        ) {
          canvas.value.remove(line);
        }
        isDown = false;
        const canvasData = canvas.value.toJSON();
        console.log("Current Canvas Data:", canvasData);
      });
    });

    // Toggle drawing line mode
    const toggleDrawingLineMode = () => {
      isDrawingLine.value = !isDrawingLine.value;
    };

    return {
      canvasContainer,
      isDrawingLine,
      toggleDrawingLineMode,
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
