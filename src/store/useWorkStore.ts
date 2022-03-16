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
export const useWorkStore = defineStore("workStore", {
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
    async getGridList() {
      try {
        let tmp = [];
        //TODO: Get Grid list
        for (let i = 0; i < 14; i++) {
          const id = `${Date.now() + i}`;

          if (i % 3 === 0) {
            this.selected.push({ id });
          }
          const obj = {
            id,
            checked: false,
            task: `abcs-${134 - i}`,
            category: `Category-${i + 1}`,
            types: `type-${i + 1}`,
            name: `document-${i + 1}`,
            ocr: `orc-${i + 1}`,
            inspection: i % 5 === 0 ? "save" : i % 3 ? `완료-${i + 1}` : "-",
            accuracy: `${100 - i}%`,
            date: `${Date.now()}`,
          };
          tmp.push(obj);
        }
        this.workList = tmp;
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
      width: 264,
      text: "문서 유형",
      align: "center",
      sortable: false,
      value: "types",
    },
    {
      width: 401,
      text: "문서명",
      align: "center",
      sortable: false,
      value: "name",
    },
    {
      width: 120,
      text: "OCR",
      align: "center",
      sortable: false,
      value: "ocr",
    },
    {
      width: 116,
      text: "검수",
      align: "center",
      sortable: false,
      value: "inspection",
    },
    {
      width: 124,
      text: "정확도",
      align: "center",
      sortable: false,
      value: "accuracy",
    },
    {
      width: 178,
      text: "작업 일자",
      align: "center",
      sortable: false,
      value: "date",
    },
  ];
}
function getFilterLists(): Work.FilterLists {
  return {
    category: [
      {
        name: "실손 의료비 영수증",
        checked: false,
      },
      {
        name: "온라인 뱅킹 가입 신청서",
        checked: false,
      },
      {
        name: "통장 사본",
        checked: false,
      },
      {
        name: "가계 대출 신청서",
        checked: false,
      },
      {
        name: "진료비 계산서",
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
function getWorkList(): Grid.GridList {
  let tmp = [];
  //TODO: Get Grid list
  for (let i = 0; i < 14; i++) {
    const id = `${Date.now() + i}`;

    const obj = {
      id,
      checked: false,
      task: `abcs-${134 - i}`,
      category: `Category-${i + 1}`,
      types: `type-${i + 1}`,
      name: `document-${i + 1}`,
      ocr: `orc-${i + 1}`,
      inspection: i % 5 === 0 ? "save" : i % 3 ? `완료-${i + 1}` : "-",
      accuracy: `${100 - i}%`,
      date: `${Date.now()}`,
    };
    tmp.push(obj);
  }
  return tmp;
}
