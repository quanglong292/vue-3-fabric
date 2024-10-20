<!-- components/Canvas.vue -->
<template>
  <div class="canvas-container">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { fabric } from "fabric";
import { useToolStore } from "../stores/toolStore";
import { watchEffect } from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let canvas: fabric.Canvas;

const toolStore = useToolStore();

onMounted(() => {
  const canvasElement = canvasRef.value;
  if (canvasElement) {
    canvas = new fabric.Canvas(canvasElement, {
      isDrawingMode: false,
      selection: false,
    });
    canvas.setHeight(600);
    canvas.setWidth(800);
    canvas.setBackgroundColor("#ffffff", canvas.renderAll.bind(canvas));

    // Initialize with pencil tool
    canvas.isDrawingMode = true;

    // Disable selection globally
    canvas.selection = false;
    canvas.defaultCursor = "crosshair";

    // Watch for tool changes
    watch(
      () => toolStore.selectedTool,
      (newTool, oldTool) => {
        switch (newTool) {
          case "select":
            activateSelectMode();
            break;
          case "pencil":
            activatePencilMode();
            break;
          case "line":
            activateLineMode();
            break;
          case "rectangle":
            activateRectangleMode();
            break;
          case "eraser":
            activateEraserMode();
            break;
          case "reset":
            canvas.clear();
            canvas.setBackgroundColor("#ffffff", canvas.renderAll.bind(canvas));
            break;
          case "export":
            exportCanvasImage();
            break;
          case "import":
            // importImageToCanvas();
            break;
        }
      },
      { immediate: true }
    );
  }
});

watchEffect(() => {
  if (toolStore.selectedTool === "import" && toolStore.imageData) {
    importImageToCanvas();
  }
});

function activatePencilMode() {
  canvas.isDrawingMode = true;
  const pencilBrush = new fabric.PencilBrush(canvas);
  pencilBrush.color = "black";
  pencilBrush.width = 2;
  canvas.freeDrawingBrush = pencilBrush;
  removeCanvasEvents();
}

function activateEraserMode() {
  canvas.isDrawingMode = true;
  const eraserBrush = new fabric.PencilBrush(canvas);
  eraserBrush.color = "#ffffff"; // Assuming white background
  eraserBrush.width = 30;
  canvas.freeDrawingBrush = eraserBrush;
  removeCanvasEvents();
}

function exportCanvasImage() {
  const dataURL = canvas.toDataURL({
    format: "png",
    quality: 1.0,
  });
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "canvas.png";
  link.click();
}

let isDrawing = false;
let startX = 0;
let startY = 0;
let currentObject: fabric.Object | null = null;

function activateLineMode() {
  canvas.isDrawingMode = false;
  canvas.selection = false;
  setObjectsSelectable(false);
  removeCanvasEvents();

  canvas.on("mouse:down", (o: any) => {
    setObjectsSelectable(false);
    isDrawing = true;
    const pointer = canvas.getPointer(o.e);
    startX = pointer.x;
    startY = pointer.y;
    const points = [startX, startY, startX, startY];
    currentObject = new fabric.Line(points, {
      stroke: "black",
      strokeWidth: 2,
    });
    canvas.add(currentObject);
  });

  canvas.on("mouse:move", (o: any) => {
    setObjectsSelectable(false);
    if (!isDrawing) return;
    const pointer = canvas.getPointer(o.e);
    const line = currentObject as fabric.Line;
    line.set({ x2: pointer.x, y2: pointer.y });
    canvas.renderAll();
  });

  canvas.on("mouse:up", () => {
    setObjectsSelectable(false);
    isDrawing = false;
  });
}

function activateRectangleMode() {
  canvas.isDrawingMode = false;
  canvas.selection = false;
  setObjectsSelectable(false);
  removeCanvasEvents();

  canvas.on("mouse:down", (o: any) => {
    setObjectsSelectable(false);
    isDrawing = true;
    const pointer = canvas.getPointer(o.e);
    startX = pointer.x;
    startY = pointer.y;
    currentObject = new fabric.Rect({
      left: startX,
      top: startY,
      width: 0,
      height: 0,
      fill: "transparent",
      stroke: "black",
      strokeWidth: 2,
    });
    canvas.add(currentObject);
  });

  canvas.on("mouse:move", (o: any) => {
    setObjectsSelectable(false);
    if (!isDrawing) return;
    const pointer = canvas.getPointer(o.e);
    const rect = currentObject as fabric.Rect;
    rect.set({
      width: Math.abs(pointer.x - startX),
      height: Math.abs(pointer.y - startY),
    });
    if (pointer.x < startX) {
      rect.set({ left: pointer.x });
    }
    if (pointer.y < startY) {
      rect.set({ top: pointer.y });
    }
    canvas.renderAll();
  });

  canvas.on("mouse:up", () => {
    setObjectsSelectable(false);
    isDrawing = false;
  });
}

function activateSelectMode() {
  canvas.isDrawingMode = false;
  canvas.selection = true;
  setObjectsSelectable(true);
  removeCanvasEvents();
  canvas.defaultCursor = "default";
}

function importImageToCanvas() {
  const dataURL = toolStore.imageData;
  if (dataURL) {
    fabric.Image.fromURL(dataURL, (img: any) => {
      img.set({
        left: canvas.getWidth() / 2 - img.getScaledWidth() / 2,
        top: canvas.getHeight() / 2 - img.getScaledHeight() / 2,
        selectable: true,
      });
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
      toolStore.imageData = null;
      toolStore.setTool("select");
    });
  }
}

function removeCanvasEvents() {
  canvas.off("mouse:down");
  canvas.off("mouse:move");
  canvas.off("mouse:up");
}

function setObjectsSelectable(selectable: boolean) {
  canvas.getObjects().forEach((obj: any) => {
    obj.selectable = selectable;
  });
}
</script>

<style scoped>
.canvas-container {
  border: 1px solid #ccc;
  margin: 20px;
}
canvas {
  display: block;
  margin: 0 auto;
}
</style>
