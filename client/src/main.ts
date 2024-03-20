import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import { useAuthStore } from "@/stores/authStore";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedState);
app.use(pinia);
app.use(router);

app.mount("#app");

// Rutas protegidas
const authStore = useAuthStore();

router.beforeEach((to, from, next) => {
  const isAuth = to.meta.isAuth;
  if (!authStore.token && isAuth) {
    next("login");
  } else {
    next();
  }
});
