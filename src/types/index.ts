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

export declare module HTTP {
  interface ResponseMetadata {
    request_datatime: string;
    response_datatime: string;
    time_elapsed: string;
  }

  interface RespnseLoginData {
    request: {
      email: string;
      password: string;
    };
    response_metadata: ResponseMetadata;
  }
}
