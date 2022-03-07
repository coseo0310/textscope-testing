import { AxiosInstance } from "axios";

export function setInterceptors(instace: AxiosInstance) {
  instace.interceptors.request.use(
    function (config) {
      // Set Request
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instace.interceptors.response.use(
    function (response) {
      // Set Response
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return instace;
}
