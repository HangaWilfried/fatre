import "./style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { prepareApis } from "@/utils/gateway";

import App from "./App.vue";
import router from "./router";

prepareApis();

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
