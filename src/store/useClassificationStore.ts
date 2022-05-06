import { defineStore } from "pinia";
import { Grid } from "@/types";

interface ModelItem {
  id: string;
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
  modelSelected: Grid.Selected[];
  modelColumns: Grid.Columns;
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
      modelSelected: [],
      modelColumns: getModelColumns(),
    };
  },
  actions: {},
});

function getModelColumns(): Grid.Columns {
  return [
    {
      width: 100,
      text: "No",
      align: "center",
      sortable: false,
      value: "no",
    },
    {
      text: "카테고리",
      align: "center",
      sortable: false,
      value: "category",
    },
    {
      text: "문서명",
      align: "center",
      sortable: false,
      value: "name",
    },
  ];
}
