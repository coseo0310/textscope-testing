export type ComboboxItem = { id: number; text: string; value: string };
export type DefaultType = number | null;
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
  | "logout";

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
