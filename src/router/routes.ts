import { RouteRecordRaw } from "vue-router";
import LoginPage from "@/pages/login/LoginPage.vue";
import WorkPage from "@/pages/work/WorkPage.vue";
import SettingsPage from "@/pages/settings/Settings.vue";
import DashboardPage from "@/pages/dashboard/Dashboard.vue";
import InspectorPage from "@/pages/inspector/Inspector.vue";
import ProfilePage from "@/pages/settings/Profile.vue";
import ManagementAuthPage from "@/pages/settings/ManagementAuth.vue";
import ManagementRPAPage from "@/pages/settings/ManagementRPA.vue";
import ManagementLogPage from "@/pages/settings/ManagementLog.vue";
import Error from "@/pages/auth/404.vue";

export const path = {
  login: { path: "/login", name: "login", component: LoginPage },
  dashboard: {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPage,
  },
  work: { path: "/work", name: "work", component: WorkPage },
  inspection: {
    path: "/inspection",
    name: "inspection",
    component: InspectorPage,
  },
  profile: { path: "/profile", name: "profile", component: ProfilePage },
  settings: { path: "/settings", name: "settings", component: SettingsPage },
  auth: { path: "/settings/auth", name: "auth", component: ManagementAuthPage },
  log: { path: "/settings/log", name: "log", component: ManagementLogPage },
  rpa: { path: "/settings/rpa", name: "rpa", component: ManagementRPAPage },
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
    path: path.inspection.path,
    name: path.inspection.name,
    component: path.inspection.component,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: path.profile.path,
    name: path.profile.name,
    component: path.profile.component,
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
    children: [
      { path: "", redirect: path.auth.path },
      {
        path: path.auth.path,
        name: path.auth.name,
        component: path.auth.component,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: path.log.path,
        name: path.log.name,
        component: path.log.component,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: path.rpa.path,
        name: path.rpa.name,
        component: path.rpa.component,
        meta: {
          requiresAuth: true,
        },
      },
    ],
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
