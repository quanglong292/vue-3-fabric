<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { fabric } from "fabric";
import { useArchitectStore } from "@/stores/useArchitectStore";
import use2DTools from "@/tools/2dTools";

// Store
const store = useArchitectStore();

// State
const canvasRef = ref();
let canvas: fabric.Canvas;

// Hooks
const { initial, addCircle } = use2DTools();

// Functions

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
    canvas = new fabric.Canvas(refElement, {});
    initial(canvas);
  }
});

watch(
  () => store.selectToolCount,
  () => {
    console.log({
      count: store.selectToolCount,
      selecting: store.selectingTool,
    });

    switch (store.selectingTool) {
      case "draw":
        activatePencilMode();
        break;
      case "circle":
        addCircle();
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
