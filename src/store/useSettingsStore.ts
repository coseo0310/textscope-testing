import { defineStore } from "pinia";
import { Grid } from "@/types";

type States = {
  logColumns: Grid.Columns;
  logList: Grid.GridList;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useSettingsStore = defineStore("settingsStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      logColumns: getLogColumns(),
      logList: getGridLogList(),
    };
  },
  getters: {},
  actions: {
    getLogList(n: number) {
      this.logList = getGridLogList(n);
    },
  },
});

function getLogColumns(): Grid.Columns {
  return [
    {
      width: 220,
      text: "배치시작 일시",
      align: "center",
      sortable: false,
      value: "startDt",
    },
    {
      width: 220,
      text: "배치종료 일시",
      align: "center",
      sortable: false,
      value: "endDt",
    },
    {
      text: "배치유형",
      align: "center",
      sortable: false,
      value: "type",
    },
    {
      width: 100,
      text: "배치명",
      align: "center",
      sortable: false,
      value: "name",
    },
    {
      text: "결과 메시지",
      align: "center",
      sortable: false,
      value: "message",
    },
  ];
}

function getGridLogList(c: number = 1): Grid.GridList {
  let tmp = [];
  //TODO: Get Grid list
  for (let i = 0; i < 10; i++) {
    const id = `${Date.now() + i + c}`;
    const min = 0;
    const max = 4;
    const r = Math.floor(Math.random() * (max - min) + min);

    const a = Math.floor(Math.random() * (100 - 80) + 80);

    const obj = {
      id,
      startDt: `2022-07-12 10:00:00`,
      endDt: `2022-07-12 10:00:00`,
      type: `type-${id}`,
      name: i % 2 === 0 ? "auth" : "data",
      message: `success-${id}`,
    };
    tmp.push(obj);
  }
  return tmp;
}
