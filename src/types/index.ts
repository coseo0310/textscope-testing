import { RouteRecordRaw } from "vue-router";
import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth: boolean;
    isMenu?: boolean;
    title?: string;
    icons?: Icons.IconType;
  }
}
export declare module Routes {
  type CommonConstant =
    | "root"
    | "login"
    | "dashboard"
    | "alarm"
    | "task"
    | "inspection"
    | "classification"
    | "logout"
    | "errors"
    | "catch";

  type DefaultConstant = CommonConstant | "settings";

  type DefaultConstantChild =
    | "settings_profile"
    | "settings_group"
    | "settings_push";

  type AdminConstant = CommonConstant | "user" | "team" | "template" | "notice";

  type AdminConstantChild =
    | "classification_register"
    | "classification_management"
    | "classification_learning"
    | "classification_test"
    | "team_department"
    | "team_memeber";

  interface Routes {
    isMenu: boolean;
    routeRecordRaw: RouteRecordRaw;
  }

  type DefaultConstants = {
    [k in DefaultConstant]: Routes;
  };

  type AdminConstants = {
    [k in AdminConstant]: Routes;
  };

  interface MenuItem {
    path: string;
    icons: Icons.IconType;
    title: string;
  }

  type MenuList = MenuItem[];
}

export declare module Task {
  type FilterLists = {
    [k in FilterKeys]: FilterItem[];
  };

  type FilterKeys = "category" | "type" | "save" | "inspection" | "ocr";
  type ManagementFilterKeys =
    | "category"
    | "department"
    | "register"
    | "inspector"
    | "inspection"
    | "status";

  type ManagementFilterLists = {
    [k in ManagementFilterKeys]: FilterItem[];
  };

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

  type GridItem = {
    [k in string]: string | boolean;
  };

  type GridList = GridItem[];

  interface Selected {
    id: string;
  }
}

export declare module Chart {
  type BarChartData = {
    labels: string[];
    datasets: {
      legend: string;
      data: number[];
    }[];
    max: number;
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
    | "notice"
    | "reset"
    | "search"
    | "info";

  interface SvgType {
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
    line?: {
      x1: string;
      y1: string;
      x2: string;
      y2: string;
      stroke?: string;
      strokeWidth?: string;
      strokeLinecap?: "butt" | "round" | "square" | "inherit";
      strokeLinejoin?: "miter" | "round" | "bevel" | "inherit";
    };
    circle?: {
      cx: string;
      cy: string;
      r: string;
      fill?: string;
      stroke?: string;
      strokeWidth?: string;
    };
  }

  type Svgs = {
    [k in IconType]: SvgType;
  };
}

export declare module HTTP {
  interface ResponseMetadata {
    request_datetime: string;
    response_datetime: string;
    time_elapsed: string;
  }

  interface RequestType {
    password: string;
  }

  interface User {
    id: string;
    name: string;
    division: string;
    job_position: string;
    phone_number: string;
    authority: string;
    extension_number: string;
    profile_img: string;
    team?: User[];
  }

  interface Token {
    token: string;
    expires_after: string;
    created_at: string;
  }

  interface PostAuthToken {
    request: RequestType;
    response_metadata: ResponseMetadata;
    token: Token;
  }

  interface GetAuthToken {
    user: User;
    request: RequestType;
    response_metadata: ResponseMetadata;
  }

  interface DeleteAuthToken {
    request: RequestType;
    response_metadata: ResponseMetadata;
  }
}
