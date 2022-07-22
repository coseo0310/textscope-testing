import { defineStore } from "pinia";
import { login } from "@/api/http/auth";
import { errorHandler } from "@/utils";
import { HTTP } from "@/types";

type States = {};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useDashboardStore = defineStore("dashboardStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
    };
  },
  getters: {},
  actions: {},
});
