import { RouteRecordRaw } from "vue-router";
import LoginPage from "@/pages/auth/LoginPage.vue";
import Error from "@/pages/auth/404.vue";

export const path = {
  login: { path: "/login", name: "login", component: LoginPage },
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
