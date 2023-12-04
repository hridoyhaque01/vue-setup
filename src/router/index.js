import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layouts/Layout.vue";
import AboutView from "../views/AboutView.vue";
import HomeView from "../views/HomeView.vue";
const routes = [
  {
    path: "/",
    component: Layout,

    children: [
      {
        path: "/",
        component: HomeView,
      },
      {
        path: "/about",
        component: AboutView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
