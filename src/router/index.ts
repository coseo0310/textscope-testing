import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "@/pages/auth/LoginPage.vue";
import LogoutPage from "@/pages/auth/LogoutPage.vue";
import NotFound from "@/pages/auth/404.vue";
import DashboardPage from "@/pages/dashboard/DashboardPage.vue";
import SettingsPage from "@/pages/settings/SettingsPage.vue";
import ClassificationPage from "@/pages/classification/ClassificationPage.vue";
import ProfilePage from "@/pages/settings/ProfilePage.vue";
import PushPage from "@/pages/settings/PushPage.vue";
import NoticePage from "@/pages/settings/NoticePage.vue";
import GroupPage from "@/pages/settings/GroupPage.vue";
import WorkPage from "@/pages/work/WorkPage.vue";
import InspectionPage from "@/pages/inspection/InspectionPage.vue";
import AlarmPage from "@/pages/auth/AlarmPage.vue";
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
  classification: {
    isMenu: true,
    routeRecordRaw: {
      path: "/classification",
      name: "classification",
      component: ClassificationPage,
      meta: {
        requiresAuth: true,
        title: "문서 분류",
        icons: "classification",
      },
    },
  },
  inspection: {
    isMenu: true,
    routeRecordRaw: {
      path: "/inspection",
      name: "inspection",
      component: InspectionPage,
      meta: {
        requiresAuth: true,
        title: "검수",
        icons: "template",
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
          path: "group",
          name: "group",
          component: GroupPage,
          meta: {
            requiresAuth: true,
            title: "조직",
            icons: "group",
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
  alarm: {
    isMenu: false,
    routeRecordRaw: {
      path: "/alarm",
      name: "alarm",
      component: AlarmPage,
      meta: {
        requiresAuth: true,
        title: "alarm",
        icons: "bell",
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
    isMenu: true,
    routeRecordRaw: {
      path: "/test",
      name: "test",
      component: Test,
      meta: {
        requiresAuth: false,
        title: "테스트",
        icons: "hide",
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
