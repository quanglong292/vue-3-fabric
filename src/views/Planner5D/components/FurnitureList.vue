<template>
  <div>
    <h3>Furniture</h3>
    <ul>
      <li v-for="item in furnitureItems" :key="item.name">
        <button @click="addFurniture(item)">{{ item.name }}</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCanvasStore } from "@/stores/canvasStore";
import { fabric } from "fabric";

interface FurnitureItem {
  name: string;
  src: string;
}

const furnitureItems = ref<FurnitureItem[]>([
  { name: "Chair", src: "/images/chair.png" },
  { name: "Table", src: "/images/table.png" },
  // Add more furniture items here
]);

const canvasStore = useCanvasStore();

const addFurniture = (item: FurnitureItem) => {
  const { canvas } = canvasStore;
  if (canvas) {
    fabric.Image.fromURL(item.src, (img) => {
      img.set({
        left: canvas.width! / 2,
        top: canvas.height! / 2,
        originX: "center",
        originY: "center",
      });
      canvas.add(img);
      canvas.renderAll();
    });
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
