import "./style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n  } from "vue-i18n";
import { prepareApis } from "@/utils/gateway";

import App from "./App.vue";
import router from "./router";
import messages from "@/i18n.json";

const app = createApp(App);

prepareApis();
const getBrowserLanguage = (): string => {
    const locale = navigator.language.split("-")[0]
    return locale === "fr" ? locale : "en";
};

const i18n = createI18n({
    messages,
    legacy: false,
    fallbackLocale: "en",
    locale: getBrowserLanguage(),
})

app.use(createPinia());
app.use(i18n)
app.use(router);
app.mount("#app");
