import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import { createClient } from "@urql/vue";

const client = createClient({
  url: "http://localhost:3000/graphql",
});

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
      path: "/libraries/library_name",
      name: "library",
      component: () => import("../views/NodeView.vue"),
    },
  ],
});

export default router;
