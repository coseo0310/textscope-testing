import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";
import SettingsPage from "@/pages/SettingsPAge.vue";
import LogoutPage from "@/pages/LogoutPage.vue";
import NotFound from "@/pages/404.vue";
import Test from "@/pages/Test.vue";
import { getCookie } from "@/utils";
import { TOKEN } from "@/constants";

export const constants = {
  root: {
    path: "/",
    redirect: "/login",
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
  logout: {
    path: "/logout",
    name: "logout",
    component: LogoutPage,
  },
  errors: {
    path: "/404",
    name: "404",
    component: NotFound,
  },
  test: { path: "/test", name: "test", component: Test },
  catch: { path: "/:catchAll(.*)", redirect: "/404" },
};

export const routes = Object.entries(constants).map(([_, v]) => v);

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const ignoreList = ["test", "logout", "404"];

router.beforeEach(async (to, from, next) => {
  const ignore = ignoreList.includes(to.name as string);

  const auth = getCookie(TOKEN);

  if (!ignore && !auth && to.name !== "login") {
    next("/login");
  } else if (!ignore && auth && to.name === "login") {
    next("/dashboard");
  } else {
    next();
  }
});
