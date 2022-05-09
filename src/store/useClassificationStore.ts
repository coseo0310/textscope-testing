import { defineStore } from "pinia";
import { Grid } from "@/types";

interface ModelItem {
  id: string;
  category: string;
  name: string;
  divider?: boolean;
}

interface Model {
  id: string;
  title: string;
  items: ModelItem[];
  isTest: boolean;
}

type States = {
  modelList: Model[];
  model: Model | null;
  modelSelected: Grid.Selected[];
  modelColumns: Grid.Columns;
  uploadPercent: number;
  isProgress: boolean;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useClassificationStore = defineStore("classificationStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      modelList: [
        {
          id: "model-1652056697466",
          title: "미국 수출입 20종",
          isTest: false,
          items: [
            {
              id: "1652056697466",
              category: "admission",
              name: "temp2.jpg",
              divider: false,
            },
            {
              id: "1652056697467",
              category: "admission",
              name: "temp1.jpg",
              divider: true,
            },
            {
              id: "1652056697468",
              category: "diagnosis",
              name: "temp2.jpg",
              divider: false,
            },
            {
              id: "1652056697469",
              category: "diagnosis",
              name: "temp1.jpg",
              divider: true,
            },
            {
              id: "1652056697470",
              category: "hospitalization",
              name: "temp2.jpg",
              divider: false,
            },
            {
              id: "1652056697471",
              category: "hospitalization",
              name: "temp1.jpg",
              divider: true,
            },
            {
              id: "1652056697472",
              category: "prescription",
              name: "temp1.jpg",
              divider: false,
            },
            {
              id: "1652056697473",
              category: "prescription",
              name: "temp2.jpeg",
              divider: true,
            },
            {
              id: "1652056697474",
              category: "surgery",
              name: "temp2.jpg",
              divider: false,
            },
            {
              id: "1652056697475",
              category: "surgery",
              name: "temp1.jpg",
              divider: true,
            },
          ],
        },
      ],
      model: null,
      modelSelected: [],
      modelColumns: getModelColumns(),
      uploadPercent: 0,
      isProgress: false,
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
