import { defineStore } from "pinia";
import { Grid, Chart } from "@/types";

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

interface TestModel extends Model {
  accuracy: number;
}

interface StatisticsClass {
  labels: string[];
  datasets: number[][];
}

interface Statistics {
  modelId: string;
  id: string;
  totalAccuracy: number;
  totalF1Score: number;
  accuracy: Chart.BarChartData;
  class: StatisticsClass;
}

type States = {
  modelList: Model[];
  model: Model | null;
  testModel: TestModel | null;
  modelSelected: Grid.Selected[];
  modelColumns: Grid.Columns;
  testModelColumns: Grid.Columns;
  testStatistics: Statistics | null;
  uploadPercent: number;
  isProgress: boolean;
  isTesting: boolean;
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
          isTest: true,
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
      testModel: null,
      modelSelected: [],
      modelColumns: getModelColumns(),
      testModelColumns: getModelColumns("test"),
      testStatistics: {
        modelId: "model-1652056697466",
        id: "test-model-1652056697466",
        totalAccuracy: 77.2,
        totalF1Score: 77.2,
        accuracy: {
          labels: ["해외투자 사업계획서", "해외투자 신고서", "Invoice"],
          datasets: [
            { legend: "정확도 (%)", data: [72.7, 81.0, 77.8] },
            { legend: "F-1 Score (%)", data: [77.1, 74.6, 71.2] },
          ],
          max: 100,
        },
        class: {
          labels: ["해외투자 사업계획서", "해외투자 신고서", "Invoice"],
          datasets: [
            [7, 8, 9],
            [1, 2, 3],
            [3, 2, 1],
          ],
        },
      },
      uploadPercent: 0,
      isProgress: false,
      isTesting: false,
    };
  },
  actions: {},
});

function getModelColumns(type: "model" | "test" = "model"): Grid.Columns {
  return type === "model"
    ? [
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
      ]
    : [
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
        {
          text: "매칭 카테고리",
          align: "center",
          sortable: false,
          value: "matchCategory",
        },
        {
          width: 200,
          text: "결과",
          align: "center",
          sortable: false,
          value: "result",
        },
      ];
}
