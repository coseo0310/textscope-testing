import { IconType } from "@/components/shared/icons/type";

export type MenuItem = {
  path: string;
  icons: IconType;
  title: string;
};

export type MenuList = MenuItem[];
