import { defineStore } from "pinia";
import { Grid } from "@/types";

type States = {};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useSettingsStore = defineStore("settingsStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
    };
  },
  getters: {},
  actions: {},
});

function getWorkColumns(): Grid.Columns {
  return [
    {
      width: 150,
      text: "Task ID",
      align: "start",
      sortable: false,
      value: "id",
    },
    {
      width: 220,
      text: "문서종류",
      align: "start",
      sortable: false,
      value: "document",
    },
    {
      text: "문서명",
      align: "start",
      sortable: false,
      value: "name",
    },
    {
      width: 100,
      text: "페이지수",
      align: "center",
      sortable: false,
      value: "pageTotal",
    },
    {
      width: 210,
      text: "등록자/등록일",
      align: "center",
      sortable: false,
      value: "register",
    },
    {
      width: 210,
      text: "검수자/검수일",
      align: "center",
      sortable: false,
      value: "inspector",
    },
    {
      width: 100,
      text: "처리 상태",
      align: "center",
      sortable: false,
      value: "status",
    },
    {
      width: 150,
      text: "정확도",
      align: "center",
      sortable: false,
      value: "accuracy",
    },
  ];
}

function getGridList(c: number = 1): Grid.GridList {
  let tmp = [];
  const documents = [
    "-",
    "Commercial Invoice",
    "해외투자 사업계획서",
    "B/L",
    "Invoice",
  ];
  const status = ["analysis", "wait", "progress", "complete"];
  const teams = ["검수 1팀", "검수 2팀", "검수 3팀", "검수 4팀"];
  const names = ["우영우", "정명석", "동그라미", "최수연"];
  //TODO: Get Grid list
  for (let i = 0; i < 10; i++) {
    const id = `${Date.now() + i + c}`;
    const min = 0;
    const max = 4;
    const r = Math.floor(Math.random() * (max - min) + min);

    const a = Math.floor(Math.random() * (100 - 80) + 80);

    const obj = {
      id,
      document: documents[r],
      documentTotal: `9`,
      name: `document-${id}-${i}.pdf`,
      pageTotal: r === 0 ? `-` : `${Math.floor(99 / (i + 1))}`,
      register: names[r],
      rDate: `2022-07-12 10:00:00`,
      rTeam: teams[r],
      inspector: r === 0 ? `-` : names[r],
      iDate: `2022-07-12 10:00:00`,
      iTeam: teams[r],
      status: status[r],
      accuracy: r === 0 ? "-" : `${a}`,
    };
    tmp.push(obj);
  }
  return tmp;
}
