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
    {
      path: "/admin/products",
      name: "admin page",
      component: () => import("@/views/admin/LayoutPage.vue"),
      children: [
        {
          path: "",
          name: "products page",
          component: () => import("@/views/admin/PostsListPage.vue"),
        },
        {
          path: "/products/:id",
          props: true,
          name: "single product page",
          component: () => import("@/views/admin/PostDetailsPage.vue"),
        },
        {
          path: "/admin/settings",
          name: "user settings page",
          component: () => import("@/views/admin/SettingsPage.vue"),
        },
      ]
    },
  ],
});

export default router;
