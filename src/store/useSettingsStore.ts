import { defineStore } from "pinia";
import { Grid } from "@/types";

type States = {
  logColumns: Grid.Columns;
  logList: Grid.GridList;
  authColumns: Grid.Columns;
  authList: Grid.GridList;
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
      authColumns: getAuthColumns(),
      authList: getGridAuthList(),
    };
  },
  getters: {},
  actions: {
    getLogList(n: number) {
      this.logList = getGridLogList(n);
    },
    getAuthList(n: number) {
      this.authList = getGridAuthList(n);
    },
  },
});

function getAuthColumns(): Grid.Columns {
  return [
    {
      width: 150,
      text: "행번",
      align: "center",
      sortable: false,
      value: "id",
    },
    {
      width: 100,
      text: "이름",
      align: "center",
      sortable: false,
      value: "name",
    },
    {
      width: 100,
      text: "직위",
      align: "center",
      sortable: false,
      value: "position",
    },
    {
      width: 100,
      text: "권한",
      align: "center",
      sortable: false,
      value: "auth",
    },
    {
      text: "이메일",
      align: "start",
      sortable: false,
      value: "email",
    },
    {
      width: 80,
      text: "내선번호",
      align: "center",
      sortable: false,
      value: "phone",
    },
    {
      width: 150,
      text: "등록일",
      align: "center",
      sortable: false,
      value: "date",
    },
    {
      width: 80,
      text: "",
      align: "center",
      sortable: false,
      value: "modify",
    },
  ];
}

function getGridAuthList(c: number = 1): Grid.GridList {
  let tmp = [];
  //TODO: Get Grid list
  for (let i = 0; i < 10; i++) {
    const auth = ["admin", "user", "nil", "nil"];
    const positions = ["대리", "사원", "과장", "부장"];
    const names = ["우영우", "정명석", "동그라미", "최수연"];
    const id = `${Date.now() + i + c}`;
    const min = 0;
    const max = 4;
    const r = Math.floor(Math.random() * (max - min) + min);

    const a = Math.floor(Math.random() * (100 - 80) + 80);

    const obj = {
      id,
      name: names[r],
      team: "검수 1팀",
      position: positions[r],
      auth: auth[r],
      email: `test-${a}@test.co.kr`,
      phone: "0000",
      date: `2022-07-12`,
      startDt: `2022-07-12`,
      endDt: `2022-07-12`,
      modify: "",
    };
    tmp.push(obj);
  }
  return tmp;
}

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
