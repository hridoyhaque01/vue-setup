import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layouts/Layout.vue";
import Auth from "../views/Auth.vue";
const routes = [
  {
    path: "/",
    component: Layout,

    children: [
      {
        path: "/",
        component: Auth,
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
