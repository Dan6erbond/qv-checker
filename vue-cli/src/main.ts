import { createApp } from "vue";
import { VuesticPlugin } from "vuestic-ui";
import "vuestic-ui/dist/vuestic-ui.css";
import App from "./App.vue";
import "./registerServiceWorker";
import "@/styles/utils.css";

const app = createApp(App);

app.use(VuesticPlugin);
app.provide("toast", app.config.globalProperties.$vaToast);

app.mount("#app");
