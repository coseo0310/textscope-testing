import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";
import SettingsPage from "@/pages/SettingsPAge.vue";
import Test from "@/pages/Test.vue";
import { getCookie } from "@/utils";
import { TOKEN } from "@/constants";

export const constants = {
  root: {
    path: "/",
  },
  login: {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  dashboard: {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPage,
  },
  settings: {
    path: "/settins",
    name: "settins",
    component: SettingsPage,
  },
};

export const routes = [
  { path: constants.root.path, redirect: constants.login.path },
  {
    path: constants.login.path,
    name: constants.login.name,
    component: constants.login.component,
  },
  {
    path: constants.dashboard.path,
    name: constants.dashboard.name,
    component: constants.dashboard.component,
  },
  {
    path: constants.settings.path,
    name: constants.settings.name,
    component: constants.settings.component,
  },
  { path: "/test", name: "test", component: Test },
  { path: "/:catchAll(.*)", redirect: "/dashboard" },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.name === "test") {
    next();
  }

  const auth = getCookie(TOKEN);

  if (!auth && to.name !== "login") {
    next("/login");
  }

  if (auth && to.name === "login") {
    next("/dashboard");
  }

  next();
});
