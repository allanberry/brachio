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
      path: "/nodes",
      name: "nodes",
      component: () => import("../views/NodeListView.vue"),
    },
    {
      path: "/nodes/:id",
      name: "node",
      component: () => import("../views/NodeView.vue"),
    }
  ],
});

export default router;
