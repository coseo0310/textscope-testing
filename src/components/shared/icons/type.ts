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
  | "chevron-down";

export type SvgType = {
  width: string;
  height: string;
  viewBox: string;
  fill: string;
  xmlns: string;
  path: {
    fillRule?: string;
    clipRule?: string;
    d: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
    strokeLinecap?: string;
    strokeLinejoin?: string;
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
