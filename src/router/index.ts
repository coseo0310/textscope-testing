import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/pages/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Settings from "@/pages/Settings.vue";
import Test from "@/pages/Test.vue";

export const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "login", component: Login },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  { path: "/settings", name: "settings", component: Settings },
  { path: "/test", name: "test", component: Test },
  { path: "/:catchAll(.*)", redirect: "/dashboard" },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const auth = true;

router.beforeEach(async (to, from, next) => {
  if (!auth && to.name !== "login") {
    next("/login");
  }

  if (auth && to.name === "login") {
    next("/dashboard");
  }

  next();
});
