<script setup lang="ts">
import ContentSaveOutline from "vue-material-design-icons/ContentSaveOutline.vue";
import FileImportOutline from "vue-material-design-icons/FileImportOutline.vue";
import TrashCanOutline from "vue-material-design-icons/TrashCanOutline.vue";
import Refresh from "vue-material-design-icons/Refresh.vue";
import { useArchitectStore } from "@/stores/useArchitectStore";

// Store
const { selectTool } = useArchitectStore();
const iconClass = "hover:bg-blue-300 p-1 rounded-md";
</script>
<template>
  <div
    class="absolute top-2 left-2 bg-blue-200 shadow-md rounded-md flex gap-2 z-10"
  >
    <ContentSaveOutline
      :onclick="() => selectTool('save')"
      :class="iconClass"
    />
    <FileImportOutline
      :onclick="() => selectTool('import_file')"
      :class="iconClass"
    />
    <TrashCanOutline :onclick="() => selectTool('delete')" :class="iconClass" />
    <Refresh :onclick="() => selectTool('refresh')" :class="iconClass" />
  </div>
</template>

<style scoped></style>
