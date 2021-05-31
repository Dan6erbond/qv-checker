import { createApp } from "vue";
import App from "./App.vue";
import Equal from "equal-vue";
import "../node_modules/equal-vue/dist/style.css";

const app = createApp(App).use(Equal).mount("#app");
