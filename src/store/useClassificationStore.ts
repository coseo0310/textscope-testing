import { defineStore } from "pinia";

interface ModelItem {
  category: string;
  name: string;
}

interface Model {
  title: string;
  items: ModelItem[];
}

type States = {
  modelList: Model[];
  model: Model | null;
  itemSelected: string[];
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useClassificationStore = defineStore("classificationStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      modelList: [],
      model: null,
      itemSelected: [],
    };
  },
  actions: {},
});
