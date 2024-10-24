import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { fabric } from "fabric";

const toolStore = defineStore("toolStore", () => {
  let canvas: fabric.Canvas | null = null;
  const selectionMode = ref(false);

  // Functions
  const setupTool = (elementRef: Ref<string | HTMLCanvasElement | null>) => {
    if (!elementRef.value) return;
    canvas = new fabric.Canvas(elementRef.value, {
      isDrawingMode: false,
      selection: false,
    });

    canvas.setHeight(window.innerHeight - 100);
    canvas.setWidth(window.innerWidth - 50);
    canvas.setBackgroundColor("#ffffff", canvas.renderAll.bind(canvas));

    // Initialize with pencil tool
    canvas.isDrawingMode = true;

    // Disable selection globally
    canvas.selection = false;
    canvas.defaultCursor = "crosshair";
  };
  return {
    canvas,
    selectionMode,
    setupTool,
  };
});
export default toolStore;
