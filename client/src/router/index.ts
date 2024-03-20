import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import AddTaskView from "@/views/AddTaskView.vue";
import RegisterView from "@/views/RegisterView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        isAuth: false,
      },
    },
    {
      path: "/task/:title?/:description?/:id?",
      name: "task",
      component: AddTaskView,
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: {
        isAuth: false,
      },
    },
  ],
});

export default router;
