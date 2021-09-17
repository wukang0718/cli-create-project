import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "./theme";
import "@/assets/scss/reset.scss";
import "@/assets/scss/common.scss";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Element);
app.mount("#app");
