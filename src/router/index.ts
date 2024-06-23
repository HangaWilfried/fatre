import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/views/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home page",
      component: HomePage,
    },
    {
      path: "/login",
      name: "login page",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/signup",
      name: "signup page",
      component: () => import("@/views/SignupPage.vue"),
    },
  ],
});

export default router;
