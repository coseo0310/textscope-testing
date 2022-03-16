import { defineStore } from "pinia";
import { getCookie, setCookie, eraseCookie } from "@/utils";
import { postAuthToken, deleteAuthToken } from "@/api/http/auth";
import { TOKEN } from "@/constants";
import { User } from "@/api/http/type";
import { FilterLists } from "@/types";

type States = {
  filterLists: FilterLists;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useWorkStore = defineStore("workStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      filterLists: getFilterLists(),
    };
  },
  actions: {
    resetFilterLists() {
      this.filterLists = getFilterLists();
    },
  },
});

function getFilterLists() {
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
