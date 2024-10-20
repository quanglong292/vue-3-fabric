import { defineStore } from "pinia";
import { fabric } from "fabric";
import { ref } from "vue";

export const useArchitectStore = defineStore("architect-store", () => {
  // State
  const canvasRef = ref<any>(null);

  // Functions
  const drawRoom = () => {};
  const putFurniture = () => {};
  const editFurniture = () => {};
  const saveProcess = () => {};
  const exportPNG = () => {};

  // Export
  return {
    canvasRef,
    drawRoom,
    putFurniture,
    editFurniture,
    saveProcess,
    exportPNG,
  };
});
