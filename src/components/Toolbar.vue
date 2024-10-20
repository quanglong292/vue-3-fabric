<!-- components/Toolbar.vue -->
<template>
  <div class="toolbar flex space-x-4 p-4 bg-gray-200">
    <button @click="selectTool('select')" :class="buttonClass('select')">
      Select
    </button>
    <button @click="selectTool('pencil')" :class="buttonClass('pencil')">
      Pencil
    </button>
    <button @click="selectTool('line')" :class="buttonClass('line')">
      Line
    </button>
    <button @click="selectTool('rectangle')" :class="buttonClass('rectangle')">
      Rectangle
    </button>
    <button @click="selectTool('eraser')" :class="buttonClass('eraser')">
      Eraser
    </button>
    <button
      @click="triggerFileInput"
      class="bg-purple-500 text-white px-4 py-2 rounded"
    >
      Import Image
    </button>
    <input
      type="file"
      ref="fileInput"
      @change="handleFileUpload"
      accept="image/*"
      class="hidden"
    />
    <button
      @click="resetCanvas"
      class="bg-red-500 text-white px-4 py-2 rounded"
    >
      Reset
    </button>
    <button
      @click="exportCanvas"
      class="bg-green-500 text-white px-4 py-2 rounded"
    >
      Export
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useToolStore, Tool } from "../stores/toolStore.ts";

const toolStore = useToolStore();
const fileInput = ref<HTMLInputElement | null>(null);

function triggerFileInput() {
  fileInput.value?.click();
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      toolStore.setImageData(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
}

function selectTool(tool: Tool) {
  toolStore.setTool(tool);
}

function resetCanvas() {
  toolStore.setTool("reset");
}

function exportCanvas() {
  toolStore.setTool("export");
}

const buttonClass = (tool: Tool) =>
  computed(() => ({
    "bg-blue-500 text-white px-4 py-2 rounded": toolStore.selectedTool === tool,
    "bg-gray-300 text-black px-4 py-2 rounded": toolStore.selectedTool !== tool,
  }));
</script>
