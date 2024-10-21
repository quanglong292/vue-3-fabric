<template>
  <div>
    <button @click="toggleDrawingLineMode">
      {{ isDrawingLine ? "Disable" : "Enable" }} Line Drawing Mode
    </button>
    <canvas ref="canvasElement" style="border: 1px solid #ccc"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { fabric } from "fabric";

export default {
  name: "FabricLineExample",
  setup() {
    const canvas = ref(null);
    const canvasElement = ref(null);
    const isDrawingLine = ref(false);
    let line, isDown;

    onMounted(() => {
      // Initialize the Fabric.js canvas
      canvas.value = new fabric.Canvas(canvasElement.value, {
        width: 800,
        height: 600,
      });

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
        const origX = line.x1;
        const origY = line.y1;
        let x2 = pointer.x;
        let y2 = pointer.y;

        // If shift key is pressed, make the line straight (horizontal, vertical, or 45 degrees)
        if (options.e.shiftKey) {
          const dx = Math.abs(x2 - origX);
          const dy = Math.abs(y2 - origY);
          if (dx > dy) {
            y2 = origY; // Make line horizontal
          } else {
            x2 = origX; // Make line vertical
          }
        }

        line.set({ x2, y2 });
        canvas.value.renderAll();
      });

      canvas.value.on("mouse:up", () => {
        isDown = false;
        // Log current canvas data to ensure it doesn't store unnecessary data
        const canvasData = canvas.value.toJSON();
        console.log("Current Canvas Data:", canvasData);
      });
    });

    // Toggle drawing line mode
    const toggleDrawingLineMode = () => {
      isDrawingLine.value = !isDrawingLine.value;
      canvas.value.selection = !isDrawingLine.value;
    };

    return {
      canvasElement,
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
