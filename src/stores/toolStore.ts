// stores/toolStore.ts
import { defineStore } from "pinia";

export type Tool =
  | "select"
  | "pencil"
  | "line"
  | "rectangle"
  | "eraser"
  | "reset"
  | "export"
  | "import";

export const useToolStore = defineStore("toolStore", {
  state: () => ({
    selectedTool: "pencil" as Tool,
    imageData: null as string | null,
  }),
  actions: {
    setTool(tool: Tool) {
      this.selectedTool = tool;
    },
    setImageData(data: string) {
      this.imageData = data;
      this.setTool("import");
    },
  },
});
