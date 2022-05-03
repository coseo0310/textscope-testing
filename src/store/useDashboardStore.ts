import { defineStore } from "pinia";
import { Grid } from "@/types";

type States = {
  taskColumns: Grid.Columns;
  taskList: Grid.GridList;
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
      no: `${i + 1}`,
      user: users[i],
      task: `${20 + i}`,
      inprogress: `${20 + i}`,
      done: `${5 + i}`,
    };
    tmp.push(obj);
  }
  return tmp;
}

function getDocumentModelColumns(): Grid.Columns {
  return [];
}
