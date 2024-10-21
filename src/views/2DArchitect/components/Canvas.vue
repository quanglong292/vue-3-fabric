<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { fabric } from "fabric";
import { useArchitectStore } from "@/stores/useArchitectStore";

// Store
const store = useArchitectStore();

// State
const canvasRef = ref();
let canvas: fabric.Canvas;

// Functions
function addGrid(canvas: any, gridSize = 20) {
  const width = canvas.width;
  const height = canvas.height;
  const gridOptions = {
    stroke: "#ccc", // grid line color
    selectable: false, // prevent selection of gridlines
    evented: false, // don't trigger events on gridlines
  };

  // Horizontal lines
  for (let i = 0; i <= height; i += gridSize) {
    canvas.add(new fabric.Line([0, i, width, i], gridOptions));
  }

  // Vertical lines
  for (let i = 0; i <= width; i += gridSize) {
    canvas.add(new fabric.Line([i, 0, i, height], gridOptions));
  }

  canvas.renderAll();
}

function activatePencilMode() {
  canvas.isDrawingMode = true;
  const pencilBrush = new fabric.PencilBrush(canvas);
  pencilBrush.color = "black";
  pencilBrush.width = 2;
  canvas.freeDrawingBrush = pencilBrush;
  removeCanvasEvents();
}

function removeCanvasEvents() {
  canvas.off("mouse:down");
  canvas.off("mouse:move");
  canvas.off("mouse:up");
}

// Effects
onMounted(() => {
  const refElement = canvasRef.value;

  if (refElement) {
    const { innerHeight, innerWidth } = window;

    canvas = new fabric.Canvas(refElement, {});
    canvas.setHeight(innerHeight);
    canvas.setWidth(innerWidth);
    canvas.setBackgroundColor("#f5f5f5", canvas.renderAll.bind(canvas));
    canvas.selection = false;
    canvas.defaultCursor = "crosshair";

    addGrid(canvas);
  }
});

watch(
  () => store.selectingTool,
  (newTool) => {
    switch (newTool) {
      case "draw":
        activatePencilMode();
        break;
      default:
        break;
    }
  },
  { immediate: true }
);
</script>
<template>
  <canvas ref="canvasRef" class="w-full h-full border-2 border-red-600" />
</template>

<style scoped></style>
