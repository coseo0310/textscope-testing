import { instance as http } from "./index";
import { HTTP } from "@/types";
import { setCookie } from "@/utils";
// import { v4 as uuidv4 } from "uuid";

const URL =
  import.meta.env.MODE === "development" ? "/auth/v1/token" : "/auth/token";

export const login = async (email: string, password: string) => {
  const params = new URLSearchParams();
  params.append("email", email);
  params.append("password", password);
  const res = await http.post<HTTP.RespnseLoginData>(URL, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
  });
  console.log(res);

  // res.data.request.

  return res.data;
};
