import { Routes } from "@/types";
// Default pages
import LoginPage from "@/pages/auth/LoginPage.vue";
import LogoutPage from "@/pages/auth/LogoutPage.vue";
import NotFound from "@/pages/auth/404.vue";
import DashboardPage from "@/pages/dashboard/DashboardPage.vue";
import SettingsPage from "@/pages/settings/SettingsPage.vue";
import ClassificationPage from "@/pages/classification/ClassificationPage.vue";
import ProfilePage from "@/pages/settings/ProfilePage.vue";
import PushPage from "@/pages/settings/PushPage.vue";
import GroupPage from "@/pages/settings/GroupPage.vue";
import WorkPage from "@/pages/task/TaskPage.vue";
import InspectionPage from "@/pages/inspection/InspectionPage.vue";
import AlarmPage from "@/pages/auth/AlarmPage.vue";
// Admin pages
import UserPage from "@/pages/settings/UserPage.vue";
import TeamPage from "@/pages/settings/settingsPage.vue";
import DepartmentPage from "@/pages/settings/DepartmentPage.vue";
import MemberPage from "@/pages/settings/MemberPage.vue";

import TaskManagementPage from "@/pages/task/TaskManagementPage.vue";

export const d: Routes.DefaultConstants = {
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
            isMenu: true,
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
            isMenu: true,
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
            isMenu: true,
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

export const a: Routes.AdminConstants = {
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
  user: {
    isMenu: true,
    routeRecordRaw: {
      path: "/user",
      name: "user",
      component: UserPage,
      meta: {
        requiresAuth: true,
        title: "구성원 관리",
        icons: "user-plus",
      },
    },
  },
  team: {
    isMenu: true,
    routeRecordRaw: {
      path: "/settings",
      name: "team",
      component: TeamPage,
      children: [
        {
          path: "",
          name: "department",
          component: DepartmentPage,
          meta: {
            isMenu: false,
            requiresAuth: true,
            title: "프로필",
            icons: "user",
          },
        },
        {
          path: "memeber",
          name: "memeber",
          component: MemberPage,
          meta: {
            isMenu: false,
            requiresAuth: true,
            title: "조직",
            icons: "group",
          },
        },
      ],
      meta: {
        requiresAuth: true,
        title: "부서 관리",
        icons: "group",
      },
    },
  },
  task: {
    isMenu: true,
    routeRecordRaw: {
      path: "/task",
      name: "task",
      component: TaskManagementPage,
      meta: {
        requiresAuth: true,
        title: "업무 관리",
        icons: "work",
      },
    },
  },
  classification: {
    isMenu: true,
    routeRecordRaw: {
      path: "/classification",
      name: "classification",
      component: DashboardPage,
      meta: {
        requiresAuth: true,
        title: "문서 분류 모델 관리",
        icons: "classification",
      },
    },
  },
  template: {
    isMenu: true,
    routeRecordRaw: {
      path: "/template",
      name: "template",
      component: DashboardPage,
      meta: {
        requiresAuth: true,
        title: "템플릿 OCR 관리",
        icons: "template",
      },
    },
  },
  notice: {
    isMenu: true,
    routeRecordRaw: {
      path: "/notice",
      name: "notice",
      component: DashboardPage,
      meta: {
        requiresAuth: true,
        title: "공지사항",
        icons: "notice",
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
            isMenu: true,
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
            isMenu: true,
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
            isMenu: true,
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
