import { defineStore } from "pinia";
import { getList } from "@/api/http/work";
import { Grid } from "@/types";

interface Selector {
  id: string;
  text: string;
}
interface Filter {
  align: "register" | "inspector";
  startDate: string;
  endDate: string;
  status: string[];
  documents: Selector[];
  teams: Selector[];
  register: Selector[];
}

interface FileItem {
  id: string;
  complete: boolean;
  type: string;
  file: File;
}

type FileItems = FileItem[];

type States = {
  imperfectTotal: number;
  completeTotal: number;
  workTotal: number;
  searchTerm: string;
  selection: string[];
  columns: Grid.Columns;
  list: Grid.GridList;
  filter: Filter;
  files: FileItems;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useWorkStore = defineStore("workStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      imperfectTotal: 25,
      completeTotal: 325,
      workTotal: 350,
      searchTerm: "",
      selection: [],
      columns: getWorkColumns(),
      list: getGridList(),
      files: [],
      filter: {
        align: "register",
        startDate: "",
        endDate: "",
        status: [],
        documents: [],
        teams: [],
        register: [],
      },
    };
  },
  getters: {
    isSelection: (state) => state.selection.length > 0,
    isRPA: (state) => state.selection.length > 0,
  },
  actions: {
    clearFilter() {
      this.filter = {
        align: "register",
        startDate: ``,
        endDate: ``,
        status: [],
        documents: [],
        teams: [],
        register: [],
      };
    },

    async getGridList(n: number = 1) {
      try {
        const data = await getList(n);
        console.log(data);
        this.list = getGridList(n);
      } catch (error: any) {
        console.log(error.response);
      }
    },
  },
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
      text: "????????????",
      align: "start",
      sortable: false,
      value: "document",
    },
    {
      text: "?????????",
      align: "start",
      sortable: false,
      value: "name",
    },
    {
      width: 100,
      text: "????????????",
      align: "center",
      sortable: false,
      value: "pageTotal",
    },
    {
      width: 210,
      text: "?????????/?????????",
      align: "center",
      sortable: false,
      value: "register",
    },
    {
      width: 210,
      text: "?????????/?????????",
      align: "center",
      sortable: false,
      value: "inspector",
    },
    {
      width: 100,
      text: "?????? ??????",
      align: "center",
      sortable: false,
      value: "status",
    },
    {
      width: 150,
      text: "?????????",
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
    "???????????? ???????????????",
    "B/L",
    "Invoice",
  ];
  const status = ["analysis", "wait", "progress", "complete"];
  const teams = ["?????? 1???", "?????? 2???", "?????? 3???", "?????? 4???"];
  const names = ["?????????", "?????????", "????????????", "?????????"];
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
