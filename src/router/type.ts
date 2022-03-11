import { RouteRecordRaw } from "vue-router";
import { IconType } from "@/components/shared/type";

import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth: boolean;
    title?: string;
    icons?: IconType;
  }
}

export type Constant =
  | "root"
  | "login"
  | "dashboard"
  | "work"
  | "settings"
  | "logout"
  | "errors"
  | "catch"
  | "test";

export type Routes = {
  isMenu: boolean;
  routeRecordRaw: RouteRecordRaw;
};

export type Constants = {
  [k in Constant]: Routes;
};
