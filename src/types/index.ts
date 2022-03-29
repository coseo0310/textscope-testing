import { RouteRecordRaw } from "vue-router";
import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth: boolean;
    title?: string;
    icons?: Icons.IconType;
  }
}

export type Constant =
  | "root"
  | "login"
  | "dashboard"
  | "classification"
  | "work"
  | "settings"
  | "alarm"
  | "logout"
  | "errors"
  | "catch"
  | "inspection"
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
  icons: Icons.IconType;
  title: string;
};

export type MenuList = MenuItem[];

export declare module Work {
  type FilterLists = {
    [k in FilterKeys]: FilterItem[];
  };

  type FilterKeys = "category" | "type" | "save" | "inspection" | "ocr";

  type FilterItem = {
    name: string;
    checked: boolean;
  };
}

export declare module Grid {
  type Columns = {
    text: string;
    align: "start" | "center" | "end";
    sortable: boolean;
    value: string;
    width?: number;
  }[];

  type GridList = {
    [k in string]: string | boolean;
  }[];

  type Selected = {
    id: string;
  };
}

export declare module Icons {
  type IconType =
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
    | "save"
    | "reload"
    | "group"
    | "plus"
    | "minus"
    | "rotate-left"
    | "rotate-right"
    | "init"
    | "confirm"
    | "cancel"
    | "notice";

  type SvgType = {
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

  type Svgs = {
    [k in IconType]: SvgType;
  };
}

export declare module HTTP {
  type ResponseMetadata = {
    request_datetime: string;
    response_datetime: string;
    time_elapsed: string;
  };

  type RequestType = {
    password: string;
  };

  type User = {
    id: string;
    name: string;
    division: string;
    job_position: string;
    phone_number: string;
    authority: string;
    extension_number: string;
    profile_img: string;
    team?: User[];
  };

  type Token = {
    token: string;
    expires_after: string;
    created_at: string;
  };

  type PostAuthToken = {
    request: RequestType;
    response_metadata: ResponseMetadata;
    token: Token;
  };

  type GetAuthToken = {
    user: User;
    request: RequestType;
    response_metadata: ResponseMetadata;
  };

  type DeleteAuthToken = {
    request: RequestType;
    response_metadata: ResponseMetadata;
  };
}
