import { instance as http } from "./index";
import { HTTP } from "@/types";

const URL = "/auth/token";

export const getList = async (email: string, password: string) => {
  const params = new URLSearchParams();
  params.append("email", email);
  params.append("password", password);
  const res = await http.post<HTTP.RespnseLoginData>(URL, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
  });

  return res.data;
};
