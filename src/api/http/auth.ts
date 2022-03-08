import { instance as http } from "./index";
import { v4 as uuidv4 } from "uuid";
import { PostAuthToken, GetAuthToken, DeleteAuthToken } from "./type";

const URL = "/auth/token";

export const postAuthToken = async (username: string, password: string) => {
  const uuid = uuidv4();
  const res = await http.post<PostAuthToken>(
    URL,
    {
      username,
      password,
      grant_type: "",
      scope: "",
      client_id: "",
      client_secret: "",
    },
    {
      headers: {
        "x-request-id": uuid,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    }
  );

  return res.data;
};

export const getAuthToken = async (token: string) => {
  const uuid = uuidv4();
  const res = await http.get<GetAuthToken>(URL, {
    headers: {
      "x-request-id": uuid,
      Accept: "application/json",
      Authorization: `bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteAuthToken = async (token: string) => {
  const uuid = uuidv4();
  const res = await http.delete<DeleteAuthToken>(URL, {
    headers: {
      "x-request-id": uuid,
      Accept: "application/json",
      Authorization: `bearer ${token}`,
    },
  });

  return res.data;
};
