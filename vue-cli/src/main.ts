import { createApp } from "vue";
import { VuesticPlugin } from "vuestic-ui";
import "vuestic-ui/dist/vuestic-ui.css";
import App from "./App.vue";
import "./registerServiceWorker";

const app = createApp(App);
app.use(VuesticPlugin);
app.mount("#app");
