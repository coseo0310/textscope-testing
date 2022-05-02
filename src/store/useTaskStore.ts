import { defineStore } from "pinia";
import { Work } from "@/types";
import { Grid } from "@/types";

type States = {
  filterLists: Work.FilterLists;
  selected: Grid.Selected[];
  workColumns: Grid.Columns;
  workList: Grid.GridList;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useTaskStore = defineStore("taskStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      filterLists: getFilterLists(),
      workColumns: getWorkColumns(),
      selected: [],
      workList: [],
    };
  },
  actions: {
    resetFilterLists() {
      this.filterLists = getFilterLists();
    },
    async getGridList(n: number = 1) {
      try {
        //TODO: Get Grid list

        this.workList = getWorkList(n);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});

function getWorkColumns(): Grid.Columns {
  return [
    {
      width: 100,
      text: "Task ID",
      align: "center",
      sortable: false,
      value: "task",
    },
    {
      width: 210,
      text: "카테고리",
      align: "center",
      sortable: false,
      value: "category",
    },
    {
      width: 120,
      text: "문서 유형",
      align: "center",
      sortable: false,
      value: "types",
    },
    {
      text: "문서명",
      align: "center",
      sortable: false,
      value: "name",
    },
    {
      width: 120,
      text: "등록담당자",
      align: "center",
      sortable: false,
      value: "user1",
    },
    {
      width: 120,
      text: "등록일",
      align: "center",
      sortable: false,
      value: "date1",
    },
    {
      width: 120,
      text: "검수담당자",
      align: "center",
      sortable: false,
      value: "user2",
    },
    {
      width: 116,
      text: "검수",
      align: "center",
      sortable: false,
      value: "inspection",
    },
    {
      width: 100,
      text: "정확도",
      align: "center",
      sortable: false,
      value: "accuracy",
    },
    {
      width: 178,
      text: "검수일",
      align: "center",
      sortable: false,
      value: "date2",
    },
  ];
}
function getFilterLists(): Work.FilterLists {
  return {
    category: [
      {
        name: "해외투자 신고서",
        checked: false,
      },
      {
        name: "해외투자 사업계획서",
        checked: false,
      },
      {
        name: "Invoice",
        checked: false,
      },
      {
        name: "Bill of Landing",
        checked: false,
      },
      {
        name: "Purchase Order",
        checked: false,
      },
    ],
    type: [
      {
        name: "템플릿 OCR",
        checked: false,
      },
      {
        name: "정형",
        checked: false,
      },
      {
        name: "비정형",
        checked: false,
      },
    ],
    save: [
      {
        name: "저장",
        checked: false,
      },
      {
        name: "저장 안함",
        checked: false,
      },
    ],
    ocr: [
      {
        name: "시스템",
        checked: false,
      },
      {
        name: "수동",
        checked: false,
      },
      {
        name: "대기",
        checked: false,
      },
    ],
    inspection: [
      {
        name: "변경",
        checked: false,
      },
      {
        name: "변경 안함",
        checked: false,
      },
    ],
  };
}
function getWorkList(c: number = 1): Grid.GridList {
  let tmp = [];
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
  for (let i = 0; i < 14; i++) {
    const id = `${Date.now() + i}`;

    const obj = {
      id,
      checked: false,
      task: `s-${c}-${134 - i}`,
      category: `Category-${c}-${i + 1}`,
      types: `type-${c}-${i + 1}`,
      name: `document-${c}-${i + 1} (${(i % 10) + 1})`,
      user1: users[i % 10],
      user2: users[i % 10],
      inspection: i % 5 === 0 ? "save" : i % 3 ? `완료-${i + 1}` : "-",
      accuracy: `${Math.ceil(Math.random() * 10) + 90}%`,
      date1: `2022-03-${String(i + 1).padStart(2, "0")}`,
      date2: `2022-03-${String(i + 2).padStart(2, "0")}`,
    };
    tmp.push(obj);
  }
  return tmp;
}
