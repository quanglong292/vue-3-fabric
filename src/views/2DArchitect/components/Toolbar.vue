<script setup lang="ts">
import Draw from "vue-material-design-icons/Draw.vue";
import VectorLine from "vue-material-design-icons/VectorLine.vue";
import VectorSquare from "vue-material-design-icons/VectorSquare.vue";
import VectorCircleVariant from "vue-material-design-icons/VectorCircleVariant.vue";
import CursorMove from "vue-material-design-icons/CursorMove.vue";
import SofaSingleOutline from "vue-material-design-icons/SofaSingleOutline.vue";
import { useArchitectStore } from "@/stores/useArchitectStore";

const { selectTool } = useArchitectStore();

const iconClass = "hover:bg-blue-300 p-1 rounded-md";
</script>
<template>
  <div
    class="absolute top-1/4 left-2 bg-blue-200 shadow-md rounded-md flex flex-col gap-2"
  >
    <CursorMove :onclick="() => selectTool('edit')" :class="iconClass" />
    <Draw :onclick="() => selectTool('draw')" :class="iconClass" />
    <VectorLine :onclick="() => selectTool('line')" :class="iconClass" />
    <VectorSquare :onclick="() => selectTool('rectangle')" :class="iconClass" />
    <VectorCircleVariant
      :onclick="() => selectTool('circle')"
      :class="iconClass"
    />
    <SofaSingleOutline
      :onclick="() => selectTool('furniture')"
      :class="iconClass"
    />
  </div>
</template>

<style scoped></style>
