import { defineStore } from "pinia";
import { Grid } from "@/types";

type States = {
  noticeColumns: Grid.Columns;
  noticeList: Grid.GridList;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useSettingsStore = defineStore("settingsStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      noticeColumns: getAlarmColumns(),
      noticeList: [],
    };
  },
  actions: {
    async getNoticeList(n: number = 1) {
      try {
        //TODO: NOTICE
        this.noticeList = await getGridList();
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});

function getAlarmColumns(): Grid.Columns {
  return [
    {
      text: "제목",
      align: "start",
      sortable: false,
      value: "title",
    },
    {
      width: 210,
      text: "날짜",
      align: "center",
      sortable: false,
      value: "date",
    },
  ];
}

function getGridList(c: number = 1): Grid.GridList {
  let tmp = [];

  //TODO: Get Grid list
  for (let i = 0; i < 10; i++) {
    const id = `${Date.now() + i}`;

    const obj = {
      id,
      title: `notice-${c}-${i + 1}`,
      date: `2022-03-${String(i + 2).padStart(2, "0")}`,
      new: i < 3 ? true : false,
      content: `test content`,
    };
    tmp.push(obj);
  }
  return tmp;
}
