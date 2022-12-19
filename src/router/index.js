import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/PageView.vue"),
    },
    {
      path: "/libraries",
      name: "libraries",
      component: () => import("../views/NodeListView.vue"),
    },
    {
      path: "/libraries/:id",
      name: "library",
      component: () => import("../views/NodeView.vue"),
    },
  ],
});

export default router;
