import { IconType } from "@/components/shared/type";

export type MenuItem = {
  path: string;
  icons: IconType;
  title: string;
};

export type MenuList = MenuItem[];
