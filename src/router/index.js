import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";

// import { useBrachioStore } from "@/stores/brachioStore";
// const store = useBrachioStore();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/PageView.vue"),
    },

    // needs to take params
    {
      path: "/nodes",
      name: "nodes",
      component: () => import("../views/NodeListView.vue"),
      alias: ["/libraries"],
    },
    {
      path: "/nodes/:id",
      name: "node",
      component: () => import("../views/NodeView.vue"),
      alias: ["/libraries/:id"],
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    // return desired position
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
