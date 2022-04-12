import { createRouter, createWebHashHistory } from "vue-router";
import { d, a } from "./routes";
import { getCookie } from "@/utils";
import { TOKEN } from "@/constants";
import { Routes } from "@/types";
import { Icons } from "@/types";

export const constants: Routes.DefaultConstants | Routes.AdminConstants =
  import.meta.env.MODE.includes("admin") ? a : d;

const cEntries = Object.entries(constants);

export const routes = cEntries.map(([_, v]) => v.routeRecordRaw);

export const getMainMenu = (): Routes.MenuList => {
  return cEntries
    .filter(([_, v]) => !!v.isMenu)
    .map(([_, v]): Routes.MenuItem => {
      return {
        path: v.routeRecordRaw.path,
        icons: v.routeRecordRaw.meta!.icons as Icons.IconType,
        title: v.routeRecordRaw.meta!.title as string,
      };
    });
};

export const getSubMenu = (path: string): Routes.MenuList => {
  console.log(">>>", path);
  const item = cEntries.find(
    ([k, v]) => path.includes(k) && !!v.routeRecordRaw.children
  );
  if (!item) {
    return [];
  }
  const find = item.find((f) => typeof f !== "string");
  if (!find || typeof find === "string" || !find.routeRecordRaw.children) {
    return [];
  }

  const menu = find.routeRecordRaw.children.filter((m) => m.meta?.isMenu);

  return menu.map((m): Routes.MenuItem => {
    return {
      path: `${find.routeRecordRaw.path}${m.path ? `/${m.path}` : ""}`,
      icons: m.meta!.icons as Icons.IconType,
      title: m.meta!.title as string,
    };
  });
};

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
  } else if (!auth && to.meta.requiresAuth) {
    next("/404");
  } else {
    next();
  }
});
