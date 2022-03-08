import axios from "axios";
import { setInterceptors } from "./interceptor";

function createInstance() {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
  });
  return setInterceptors(instance);
}

export const instance = createInstance();
