import { RouteRecordRaw } from "vue-router";
import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth: boolean;
    title?: string;
    icons?: IconType;
  }
}

export type IconType =
  | "dash-on"
  | "class-on"
  | "temp-on"
  | "work-on"
  | "user-plus"
  | "user"
  | "bell"
  | "classification"
  | "dashboard"
  | "password"
  | "calendar"
  | "show"
  | "template"
  | "setting"
  | "hide"
  | "work"
  | "chevron-down"
  | "logout"
  | "save";

export type SvgType = {
  width: string;
  height: string;
  viewBox: string;
  fill: string;
  xmlns: string;
  path: {
    fillRule?: "nonzero" | "evenodd" | "inherit";
    clipRule?: number;
    d: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
    strokeLinecap?: "butt" | "round" | "square" | "inherit";
    strokeLinejoin?: "miter" | "round" | "bevel" | "inherit";
  }[];
  rect?: {
    width: string;
    height: string;
    rx: string;
    fill: string;
  };
};

export type Svgs = {
  [k in IconType]: SvgType;
};

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

export type MenuItem = {
  path: string;
  icons: IconType;
  title: string;
};

export type MenuList = MenuItem[];
