import { defineStore } from "pinia";

type States = {
  imperfectTotal: number;
  completeTotal: number;
  workTotal: number;
  searchTerm: string;
  selection: string[];
  align: "register" | "inspection";
  isFilter: boolean;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useWorkStore = defineStore("workStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      imperfectTotal: 25,
      completeTotal: 325,
      workTotal: 350,
      searchTerm: "",
      selection: [],
      align: "register",
      isFilter: false,
    };
  },
  getters: {
    isSelection: (state) => state.selection.length > 0,
    isRPA: (state) => false,
  },
  actions: {},
});
