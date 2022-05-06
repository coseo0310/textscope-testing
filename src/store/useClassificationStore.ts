import { defineStore } from "pinia";

type States = {
  modelList: string[];
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useClassificationStore = defineStore("classificationStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      modelList: [],
    };
  },
  actions: {},
});
