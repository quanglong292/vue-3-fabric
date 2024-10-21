import { defineStore } from "pinia";
import { ref } from "vue";
import { Tools } from "@/types/architect.type";

export const useArchitectStore = defineStore("architect-store", () => {
  // State
  const canvasRef = ref<any>(null);
  const selectingTool = ref<keyof typeof Tools | null>(null);

  // Functions
  const drawRoom = () => {};
  const putFurniture = () => {};
  const editFurniture = () => {};
  const saveProcess = () => {};
  const exportPNG = () => {};
  const selectTool = (name: keyof typeof Tools | null) => {
    console.log("selectTool", name);
    
    selectingTool.value = name;
  };

  console.log({ store: selectingTool.value });

  // Export
  return {
    canvasRef,
    selectingTool,
    drawRoom,
    putFurniture,
    editFurniture,
    saveProcess,
    exportPNG,
    selectTool,
  };
});
