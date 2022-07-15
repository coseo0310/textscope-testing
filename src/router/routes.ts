import { RouteRecordRaw } from "vue-router";
import LoginPage from "@/pages/login/LoginPage.vue";
import WorkPage from "@/pages/work/WorkPage.vue";
import SettingsPage from "@/pages/settings/Settings.vue";
import DashboardPage from "@/pages/dashboard/Dashboard.vue";
import Error from "@/pages/auth/404.vue";

export const path = {
  login: { path: "/login", name: "login", component: LoginPage },
  dashboard: {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPage,
  },
  work: { path: "/work", name: "work", component: WorkPage },
  settings: { path: "/settings", name: "settings", component: SettingsPage },
  404: { path: "/404", name: "404", component: Error },
};

export const routes: RouteRecordRaw[] = [
  { path: "/", redirect: { name: path.login.name } },
  {
    path: path.login.path,
    name: path.login.name,
    component: path.login.component,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: path.dashboard.path,
    name: path.dashboard.name,
    component: path.dashboard.component,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: path.work.path,
    name: path.work.name,
    component: path.work.component,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: path.settings.path,
    name: path.settings.name,
    component: path.settings.component,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: path[404].path,
    name: path[404].name,
    component: path[404].component,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "404",
  },
];
