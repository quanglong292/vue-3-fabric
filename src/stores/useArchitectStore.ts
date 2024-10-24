import { defineStore } from "pinia";
import { ref } from "vue";
import { Tools } from "@/types/architect.type";

export const useArchitectStore = defineStore("architect-store", () => {
  // State
  const canvasRef = ref<any>(null);
  const selectToolCount = ref<number>(0);
  const selectingTool = ref<keyof typeof Tools | null>(null);
  // Functions
  const drawRoom = () => {};
  const putFurniture = () => {};
  const editFurniture = () => {};
  const saveProcess = () => {};
  const exportPNG = () => {};
  const selectTool = (name: keyof typeof Tools | null) => {
    selectingTool.value = name;
    selectToolCount.value += 1;
  };

  // Export
  return {
    canvasRef,
    selectToolCount,
    // @ts-ignore
    selectingTool,
    drawRoom,
    putFurniture,
    editFurniture,
    saveProcess,
    exportPNG,
    selectTool,
  };
});
