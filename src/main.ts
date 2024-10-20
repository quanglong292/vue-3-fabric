import { createApp } from "vue";
import App from "./App.vue";
import "./index.css"; // Tailwind CSS
import { createPinia } from "pinia";
import router from "./router";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
