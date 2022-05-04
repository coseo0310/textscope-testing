import { defineStore } from "pinia";
import { Grid, Chart } from "@/types";

type States = {
  taskColumns: Grid.Columns;
  taskList: Grid.GridList;
  taskChartData: Chart.BarChartData;
  modelColumns: Grid.Columns;
  modelList: Grid.GridList;
  modelChartData: Chart.BarChartData;
  speedColumns: Grid.Columns;
  speedList: Grid.GridList;
  speedChartData: Chart.BarChartData;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useDashboardStore = defineStore("dashboardStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      taskColumns: getTaskColoumns(),
      taskList: getTaskList(),
      taskChartData: getTaskChartData(),
      modelColumns: getModelColumns(),
      modelList: getModelList(),
      modelChartData: getModelChartData(),
      speedColumns: getSpeedColumns(),
      speedList: getSpeedList(),
      speedChartData: getSpeedChartData(),
    };
  },
  actions: {},
});

function getTaskColoumns(): Grid.Columns {
  return [
    {
      width: 100,
      text: "No.",
      align: "center",
      sortable: false,
      value: "no",
    },
    {
      text: "담당자",
      align: "center",
      sortable: false,
      value: "user",
    },
    {
      text: "업무등록 (개)",
      align: "center",
      sortable: false,
      value: "task",
    },
    {
      text: "업무진행 (개)",
      align: "center",
      sortable: false,
      value: "inprogress",
    },
    {
      text: "업무완료 (개)",
      align: "center",
      sortable: false,
      value: "done",
    },
  ];
}

function getTaskList(): Grid.GridList {
  let tmp: Grid.GridList = [];
  const users = [
    "영희",
    "장화",
    "린",
    "홍련",
    "심청",
    "성춘향",
    "그레이스",
    "이난나",
    "에일리",
    "혜리",
  ];
  //TODO: Get Grid list
  for (let i = 0; i < 3; i++) {
    const obj = {
      no: `${3 - i}`,
      user: users[i],
      task: `${20 + i}`,
      inprogress: `${20 + i}`,
      done: `${5 + i}`,
    };
    tmp.push(obj);
  }
  return tmp;
}

function getTaskChartData(): Chart.BarChartData {
  return {
    labels: ["전우치", "홍길동", "심청"],
    datasets: [
      {
        legend: "등록",
        data: [30, 25, 9],
      },
      {
        legend: "진행",
        data: [16, 23, 11],
      },
      {
        legend: "완료",
        data: [9, 11, 9],
      },
    ],
    max: 40,
  };
}

function getModelColumns(): Grid.Columns {
  return [
    {
      width: 100,
      text: "No.",
      align: "center",
      sortable: false,
      value: "no",
    },
    {
      text: "문서모델",
      align: "center",
      sortable: false,
      value: "model",
    },
    {
      text: "유형",
      align: "center",
      sortable: false,
      value: "type",
    },
    {
      text: "오인식 (%)",
      align: "center",
      sortable: false,
      value: "wrongPerception",
    },
    {
      text: "미인식 (%)",
      align: "center",
      sortable: false,
      value: "missPerception",
    },
    {
      text: "오검출 (%)",
      align: "center",
      sortable: false,
      value: "wrongDetection",
    },
    {
      text: "카테고리 분류 오류 (%)",
      align: "center",
      sortable: false,
      value: "category",
    },
  ];
}

function getModelList(): Grid.GridList {
  let tmp: Grid.GridList = [];
  const types = ["템플릿 OCR", "정형", "비정형"];
  //TODO: Get Grid list
  for (let i = 0; i < 3; i++) {
    const obj = {
      no: `${3 - i}`,
      model: `AAAA-${i}`,
      type: types[i],
      wrongPerception: `${2.1 + i}`,
      missPerception: `${11.8 - i}`,
      wrongDetection: `${3.2 + i}`,
      category: `${1.1 + i}`,
    };
    tmp.push(obj);
  }
  return tmp;
}

function getModelChartData(): Chart.BarChartData {
  return {
    labels: ["AAAA-0", "AAAA-1", "AAAA-2"],
    datasets: [
      {
        legend: "오인식",
        data: [2.1, 3.1, 4.1, 5.1],
      },
      {
        legend: "미인식",
        data: [11.8, 10.8, 9.8, 8.8],
      },
      {
        legend: "오검출",
        data: [3.2, 4.2, 5.2, 6.2],
      },
      {
        legend: "카테고리 분류 오류",
        data: [1.1, 2.1, 3.1, 4.1],
      },
    ],
    max: 15,
  };
}

function getSpeedColumns(): Grid.Columns {
  return [
    {
      width: 100,
      text: "No.",
      align: "center",
      sortable: false,
      value: "no",
    },
    {
      text: "문서 분류 모델",
      align: "center",
      sortable: false,
      value: "model",
    },
    {
      text: "유형",
      align: "center",
      sortable: false,
      value: "type",
    },
    {
      text: "속도 (초)",
      align: "center",
      sortable: false,
      value: "speed",
    },
  ];
}

function getSpeedList(): Grid.GridList {
  let tmp: Grid.GridList = [];
  const types = ["템플릿 OCR", "정형", "비정형"];
  //TODO: Get Grid list
  for (let i = 0; i < 3; i++) {
    const obj = {
      no: `${3 - i}`,
      model: `AAAA-${i}`,
      type: types[i],
      speed: `${2.1 + i}`,
    };
    tmp.push(obj);
  }
  return tmp;
}

function getSpeedChartData(): Chart.BarChartData {
  return {
    labels: ["AAAA-0", "AAAA-1", "AAAA-2"],
    datasets: [
      {
        legend: "속도",
        data: [2.1, 3.1, 4.1],
      },
    ],
    max: 7,
  };
}
