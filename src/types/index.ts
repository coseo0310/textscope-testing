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
  interface ErrorResponse {
    error_code: string;
    error_message: string;
  }
  interface ResponseMetadata {
    request_datatime: string;
    response_datatime: string;
    time_elapsed: string;
  }

  interface ResponseData {
    error: ErrorResponse | "nil";
    status: number;
  }

  interface RespnseLoginData extends ResponseData {
    access_token: string;
    token_type: string;
  }

  // interface ResponseWorkListData extends ResponseData {
  //   document_info:
  // }
}
