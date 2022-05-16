import { RouteComponent } from "vue-router";
import { Routes } from "@/types";

import LoginPage from "@/pages/auth/LoginPage.vue";
import LogoutPage from "@/pages/auth/LogoutPage.vue";
import NotFound from "@/pages/auth/404.vue";
import DashboardPage from "@/pages/dashboard/DashboardPage.vue";
import SettingsPage from "@/pages/settings/SettingsPage.vue";
import ClassificationPage from "@/pages/classification/ClassificationPage.vue";
import ClassificationManagementPage from "@/pages/classification/ClassificationManagementPage.vue";
import ClassificationRegisterPage from "@/pages/classification/ClassificationRegisterPage.vue";
import ClassificationLearningPage from "@/pages/classification/ClassificationLearningPage.vue";
import ClassificationTestPage from "@/pages/classification/ClassificationTestPage.vue";
import ClassificationStatisticsPage from "@/pages/classification/ClassificationStatisticsPage.vue";
import ProfilePage from "@/pages/settings/ProfilePage.vue";
import PushPage from "@/pages/settings/PushPage.vue";
import GroupPage from "@/pages/settings/GroupPage.vue";
import TaskPage from "@/pages/task/TaskPage.vue";
import InspectionPage from "@/pages/inspection/InspectionPage.vue";
import AlarmPage from "@/pages/auth/AlarmPage.vue";
import UserPage from "@/pages/settings/UserPage.vue";
import TeamPage from "@/pages/settings/settingsPage.vue";
import DepartmentPage from "@/pages/settings/DepartmentPage.vue";
import MemberPage from "@/pages/settings/MemberPage.vue";
import TaskManagementPage from "@/pages/task/TaskManagementPage.vue";
import TemplatePage from "@/pages/template/TemplatePage.vue";

type Keys =
  | Routes.CommonConstant
  | Routes.AdminConstant
  | Routes.DefaultConstant
  | Routes.DefaultConstantChild
  | Routes.AdminConstantChild;

type Lazy<T> = () => Promise<T>;

interface PathItem {
  path: string;
  name: string;
  component: RouteComponent | Lazy<RouteComponent>;
}

type Path = {
  [k in Keys]: PathItem;
};

const isAdmin = import.meta.env.MODE.includes("admin");

export const path: Path = {
  root: {
    path: "/",
    name: "/",
    component: DashboardPage,
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
  alarm: {
    path: "/alarm",
    name: "alarm",
    component: AlarmPage,
  },
  task: {
    path: "/task",
    name: "task",
    component: isAdmin ? TaskManagementPage : TaskPage,
  },
  inspection: {
    path: "/inspection",
    name: "inspection",
    component: InspectionPage,
  },
  classification: {
    path: "/classification",
    name: "classification",
    component: ClassificationPage,
  },
  classification_management: {
    path: "/classification",
    name: "classification_management",
    component: ClassificationManagementPage,
  },
  classification_register: {
    path: "/classification/classification_register",
    name: "classification_register",
    component: ClassificationRegisterPage,
  },
  classification_learning: {
    path: "/classification/classification_learning",
    name: "classification_learning",
    component: ClassificationLearningPage,
  },
  classification_test: {
    path: "/classification/classification_test",
    name: "classification_test",
    component: ClassificationTestPage,
  },
  classification_statistics: {
    path: "/classification/classification_statistics",
    name: "classification_statistics",
    component: ClassificationStatisticsPage,
  },
  logout: {
    path: "/logout",
    name: "logout",
    component: LogoutPage,
  },
  errors: {
    path: "/errors",
    name: "errors",
    component: NotFound,
  },
  catch: {
    path: "/404",
    name: "404",
    component: NotFound,
  },
  settings: {
    path: "/settings",
    name: "settings",
    component: SettingsPage,
  },
  settings_profile: {
    path: "/settings",
    name: "settings_profile",
    component: ProfilePage,
  },
  settings_group: {
    path: "/settings/settings_group",
    name: "settings_group",
    component: GroupPage,
  },
  settings_push: {
    path: "/settings/settings_push",
    name: "settings_push",
    component: PushPage,
  },
  user: {
    path: "/user",
    name: "user",
    component: UserPage,
  },
  team: {
    path: "/team",
    name: "team",
    component: TeamPage,
  },
  team_department: {
    path: "/team",
    name: "team_department",
    component: DepartmentPage,
  },
  team_memeber: {
    path: "/team/team_memeber",
    name: "team_memeber",
    component: MemberPage,
  },
  template: {
    path: "/template",
    name: "template",
    component: TemplatePage,
  },
};

export const d: Routes.DefaultConstants = {
  root: {
    isMenu: false,
    routeRecordRaw: {
      path: path.root.path,
      redirect: path.login.path,
      meta: {
        requiresAuth: false,
      },
    },
  },
  login: {
    isMenu: false,
    routeRecordRaw: {
      path: path.login.path,
      name: path.login.name,
      component: path.login.component,
      meta: {
        requiresAuth: false,
      },
    },
  },
  dashboard: {
    isMenu: true,
    routeRecordRaw: {
      path: path.dashboard.path,
      name: path.dashboard.name,
      component: path.dashboard.component,
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
      path: path.classification.path,
      name: path.classification.name,
      component: path.classification.component,
      meta: {
        requiresAuth: true,
        title: "문서 분류",
        icons: "classification",
      },
    },
  },
  inspection: {
    isMenu: false,
    routeRecordRaw: {
      path: path.inspection.path,
      name: path.inspection.name,
      component: path.inspection.component,
      meta: {
        requiresAuth: true,
        title: "검수",
        icons: "template",
      },
    },
  },
  task: {
    isMenu: true,
    routeRecordRaw: {
      path: path.task.path,
      name: path.task.name,
      component: path.task.component,
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
      path: path.settings.path,
      name: path.settings.name,
      component: path.settings.component,
      children: [
        {
          path: "",
          name: path.settings_profile.name,
          component: path.settings_profile.component,
          meta: {
            isMenu: true,
            requiresAuth: true,
            title: "프로필",
            icons: "user",
          },
        },
        {
          path: path.settings_group.path,
          name: path.settings_group.name,
          component: path.settings_group.component,
          meta: {
            isMenu: true,
            requiresAuth: true,
            title: "조직",
            icons: "group",
          },
        },
        {
          path: path.settings_push.path,
          name: path.settings_push.name,
          component: path.settings_push.component,
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
      path: path.alarm.path,
      name: path.alarm.name,
      component: path.alarm.component,
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
      path: path.logout.path,
      name: path.logout.name,
      component: path.login.component,
      meta: {
        requiresAuth: false,
      },
    },
  },
  errors: {
    isMenu: false,
    routeRecordRaw: {
      path: path.errors.path,
      name: path.errors.name,
      component: path.errors.component,
      meta: {
        requiresAuth: false,
      },
    },
  },
  catch: {
    isMenu: false,
    routeRecordRaw: {
      path: "/:catchAll(.*)",
      redirect: path.errors.path,
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
      path: path.root.path,
      redirect: path.login.path,
      meta: {
        requiresAuth: false,
      },
    },
  },
  login: {
    isMenu: false,
    routeRecordRaw: {
      path: path.login.path,
      name: path.login.name,
      component: path.login.component,
      meta: {
        requiresAuth: false,
      },
    },
  },
  dashboard: {
    isMenu: true,
    routeRecordRaw: {
      path: path.dashboard.path,
      name: path.dashboard.name,
      component: path.dashboard.component,
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
      path: path.user.path,
      name: path.user.name,
      component: path.user.component,
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
      path: path.team.path,
      name: path.team.name,
      component: path.team.component,
      children: [
        {
          path: "",
          name: path.team_department.name,
          component: path.team_department.component,
          meta: {
            isMenu: false,
            requiresAuth: true,
            title: "조직",
            icons: "group",
          },
        },
        {
          path: path.team_memeber.path,
          name: path.team_memeber.name,
          component: path.team_memeber.component,
          meta: {
            isMenu: false,
            requiresAuth: true,
            title: "사용자",
            icons: "user",
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
      path: path.task.path,
      name: path.task.name,
      component: path.task.component,
      meta: {
        requiresAuth: true,
        title: "업무 관리",
        icons: "work",
      },
    },
  },
  inspection: {
    isMenu: false,
    routeRecordRaw: {
      path: path.inspection.path,
      name: path.inspection.name,
      component: path.inspection.component,
      meta: {
        requiresAuth: true,
        title: "검수",
        icons: "template",
      },
    },
  },
  classification: {
    isMenu: true,
    routeRecordRaw: {
      path: path.classification.path,
      name: path.classification.name,
      component: ClassificationPage,
      children: [
        {
          path: "",
          name: path.classification_management.name,
          component: ClassificationManagementPage,
          meta: {
            isMenu: false,
            requiresAuth: true,
            title: "문서 모델 관리",
            icons: "user",
          },
        },
        {
          path: path.classification_register.path,
          name: path.classification_register.name,
          component: ClassificationRegisterPage,
          meta: {
            isMenu: false,
            requiresAuth: true,
            title: "문서 모델 등록",
            icons: "group",
          },
        },
        {
          path: path.classification_learning.path,
          name: path.classification_learning.name,
          component: path.classification_learning.component,
          meta: {
            isMenu: false,
            requiresAuth: true,
            title: "문서 모델 학습",
            icons: "bell",
          },
        },
        {
          path: path.classification_test.path,
          name: path.classification_test.name,
          component: path.classification_test.component,
          meta: {
            isMenu: false,
            requiresAuth: true,
            title: "문서 모델 테스트",
            icons: "bell",
          },
        },
        {
          path: path.classification_statistics.path,
          name: path.classification_statistics.name,
          component: path.classification_statistics.component,
          meta: {
            isMenu: false,
            requiresAuth: true,
            title: "문서 모델 통계",
            icons: "bell",
          },
        },
      ],
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
      path: path.template.path,
      name: path.template.name,
      component: path.template.component,
      meta: {
        requiresAuth: true,
        title: "템플릿 OCR 관리",
        icons: "template",
      },
    },
  },
  alarm: {
    isMenu: false,
    routeRecordRaw: {
      path: path.alarm.path,
      name: path.alarm.name,
      component: path.alarm.component,
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
      path: path.logout.path,
      name: path.logout.name,
      component: path.logout.component,
      meta: {
        requiresAuth: false,
      },
    },
  },
  errors: {
    isMenu: false,
    routeRecordRaw: {
      path: path.errors.path,
      name: path.errors.name,
      component: path.errors.component,
      meta: {
        requiresAuth: false,
      },
    },
  },
  catch: {
    isMenu: false,
    routeRecordRaw: {
      path: "/:catchAll(.*)",
      redirect: path.errors.path,
      meta: {
        requiresAuth: false,
      },
    },
  },
};
