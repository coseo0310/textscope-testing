import { defineStore } from "pinia";
import { login } from "@/api/http/auth";
import { errorHandler } from "@/utils";
import { HTTP } from "@/types";

interface User {
  email: string;
  name: string;
  department: string;
  phone: string;
  auth: "admin" | "user";
}

type States = {
  user: User | null;
  isLogin: boolean;
  isSubMenu: boolean;
  errorMsg: string;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useAuthStore = defineStore("authStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      user: null,
      isLogin: false,
      isSubMenu: false,
      errorMsg: "",
    };
  },
  getters: {
    getAuth: (state) => {
      return true;
    },
  },
  actions: {
    async onLogin(email: string, password: string) {
      try {
        const res = await login(email, password);
        res.data.status = res.status;
        res.data.error = "nil";
        return res.data;
      } catch (error) {
        return errorHandler<HTTP.RespnseLoginData>(error);
      }
    },
    async getUser() {
      try {
        // TODO: GET USER
        this.user = {
          email: "test@test.com",
          name: "test",
          department: "검수 1팀",
          phone: "010-0000-1111",
          auth: "admin",
        };
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});
