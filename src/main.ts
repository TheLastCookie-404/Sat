import { createApp } from "vue";
import { router } from "@/router/router";
import "./style.css";
import App from "./App.vue";
import { VueQrcodeReader } from "vue-qrcode-reader";

createApp(App).use(router).use(VueQrcodeReader).mount("#app");
