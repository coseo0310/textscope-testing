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
