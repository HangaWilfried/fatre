import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/views/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homePage",
      component: HomePage,
    },
    {
      path: "/login",
      name: "loginPage",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/signup",
      name: "signupPage",
      component: () => import("@/views/SignupPage.vue"),
    },
    {
      path: "/admin",
      name: "adminSpace",
      component: () => import("@/views/admin/LayoutPage.vue"),
      children: [
        {
          path: "products",
          name: "productsListPage",
          component: () => import("@/views/admin/PostsListPage.vue"),
        },
        {
          path: "products/:id",
          props: true,
          name: "productDetailsPage",
          component: () => import("@/views/admin/PostDetailsPage.vue"),
        },
        {
          path: "products/new",
          props: true,
          name: "addProductPage",
          component: () => import("@/views/admin/CreatePostPage.vue"),
        },
        {
          path: "settings",
          name: "settingsPage",
          component: () => import("@/views/admin/SettingsPage.vue"),
        },
      ],
    },
  ],
});

export default router;
