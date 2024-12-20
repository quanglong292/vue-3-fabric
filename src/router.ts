import { createWebHistory, createRouter } from "vue-router";

import FabricDemo from "./views/FabricDemo/index.vue";
import Planner5D from "./views/Planner5D/index.vue";
import TwoDArchitect from "./views/2DArchitect/index.vue";

import Home from "@/views/Home.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/painting", component: FabricDemo },
  { path: "/planner5d", component: TwoDArchitect },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
