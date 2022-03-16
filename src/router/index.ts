import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "@/pages/auth/LoginPage.vue";
import LogoutPage from "@/pages/auth/LogoutPage.vue";
import NotFound from "@/pages/auth/404.vue";
import DashboardPage from "@/pages/dashboard/DashboardPage.vue";
import SettingsPage from "@/pages/settings/SettingsPage.vue";
import ProfilePage from "@/pages/settings/ProfilePage.vue";
import PushPage from "@/pages/settings/PushPage.vue";
import HolidaysPage from "@/pages/settings/HolidaysPage.vue";
import WorkPage from "@/pages/work/WorkPage.vue";
import Test from "@/pages/Test.vue";
import { getCookie } from "@/utils";
import { TOKEN } from "@/constants";
import { Constants, MenuList, MenuItem } from "@/types";
import { Icons } from "@/types";

export const constants: Constants = {
  root: {
    isMenu: false,
    routeRecordRaw: {
      path: "/",
      redirect: "/login",
      meta: {
        requiresAuth: false,
      },
    },
  },
  login: {
    isMenu: false,
    routeRecordRaw: {
      path: "/login",
      name: "login",
      component: LoginPage,
      meta: {
        requiresAuth: false,
      },
    },
  },
  dashboard: {
    isMenu: true,
    routeRecordRaw: {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardPage,
      meta: {
        requiresAuth: true,
        title: "대시보드",
        icons: "dashboard",
      },
    },
  },
  work: {
    isMenu: true,
    routeRecordRaw: {
      path: "/work",
      name: "work",
      component: WorkPage,
      meta: {
        requiresAuth: true,
        title: "업무 리스트",
        icons: "work",
      },
    },
  },
  settings: {
    isMenu: true,
    routeRecordRaw: {
      path: "/settings",
      name: "settings",
      component: SettingsPage,
      children: [
        {
          path: "",
          name: "profile",
          component: ProfilePage,
          meta: {
            requiresAuth: true,
            title: "프로필",
            icons: "user",
          },
        },

        {
          path: "holidays",
          name: "holidays",
          component: HolidaysPage,
          meta: {
            requiresAuth: true,
            title: "연차",
            icons: "calendar",
          },
        },

        {
          path: "push",
          name: "push",
          component: PushPage,
          meta: {
            requiresAuth: true,
            title: "푸시알림",
            icons: "bell",
          },
        },
      ],

      meta: {
        requiresAuth: true,
        title: "설정",
        icons: "setting",
      },
    },
  },
  logout: {
    isMenu: false,
    routeRecordRaw: {
      path: "/logout",
      name: "logout",
      component: LogoutPage,
      meta: {
        requiresAuth: false,
      },
    },
  },
  errors: {
    isMenu: false,
    routeRecordRaw: {
      path: "/404",
      name: "404",
      component: NotFound,
      meta: {
        requiresAuth: false,
      },
    },
  },
  test: {
    isMenu: false,
    routeRecordRaw: {
      path: "/test",
      name: "test",
      component: Test,
      meta: {
        requiresAuth: false,
      },
    },
  },
  catch: {
    isMenu: false,
    routeRecordRaw: {
      path: "/:catchAll(.*)",
      redirect: "/404",
      meta: {
        requiresAuth: false,
      },
    },
  },
};

const cEntries = Object.entries(constants);

export const routes = cEntries.map(([_, v]) => v.routeRecordRaw);

export const getMainMenu = (): MenuList => {
  return cEntries
    .filter(([_, v]) => !!v.isMenu)
    .map(([_, v]): MenuItem => {
      return {
        path: v.routeRecordRaw.path,
        icons: v.routeRecordRaw.meta!.icons as Icons.IconType,
        title: v.routeRecordRaw.meta!.title as string,
      };
    });
};

export const getSubMenu = (path: string): MenuList => {
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
  return find.routeRecordRaw.children.map((m): MenuItem => {
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
