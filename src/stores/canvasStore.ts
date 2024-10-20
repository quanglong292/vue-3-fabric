import { defineStore } from "pinia";
import { fabric } from "fabric";

export const useCanvasStore = defineStore("canvas", {
  state: () => ({
    canvas: null as fabric.Canvas | null,
    isDrawing: false,
  }),
  actions: {
    setCanvas(canvas: fabric.Canvas) {
      this.canvas = canvas;
    },
    startDrawingMode() {
      if (this.canvas) {
        this.isDrawing = true;
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush.width = 2;
        this.canvas.freeDrawingBrush.color = "#000";
      }
    },
    stopDrawingMode() {
      if (this.canvas) {
        this.isDrawing = false;
        this.canvas.isDrawingMode = false;
      }
    },
  },
});
