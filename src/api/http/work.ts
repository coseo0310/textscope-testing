import { instance as http } from "./index";
import { HTTP } from "@/types";
import { v4 as uuidv4 } from "uuid";

const URL = "/docx/info";

export const getList = async (n: number) => {
  const requestId = uuidv4();
  const params = {
    upload_date_start: "string",
    upload_date_end: "string",
    inspect_date_start: "string",
    inspect_date_end: "string",
    date_sort_desc: true,
    group_list: [],
    uploader_list: [],
    inspecter_list: [],
    doc_type_idx_list: [],
    doc_structed: [],
    document_status: [],
    rows_offset: (n - 1) * 10,
    rows_limit: 10,
  };

  const res = await http.post<HTTP.RespnseLoginData>(`${URL}/list`, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
      "x-request-id": requestId,
    },
  });

  return res.data;
};
