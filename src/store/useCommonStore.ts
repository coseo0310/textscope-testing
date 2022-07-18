import { defineStore } from "pinia";

interface Selector {
  id: string;
  text: string;
}

type States = {
  isMenuExtend: boolean;
  teams: Selector[];
  registers: Selector[];
  documnets: Selector[];
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useCommonStore = defineStore("commonStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      isMenuExtend: false,
      teams: [],
      registers: [],
      documnets: [],
    };
  },
  getters: {
    getTeams: (state) => [
      { id: "1", text: "검수 1팀" },
      { id: "2", text: "검수 2팀" },
      { id: "3", text: "검수 3팀" },
      { id: "4", text: "검수 4팀" },
    ],
    getRegisters: (state) => [
      { id: "1", text: "김철수" },
      { id: "2", text: "김영희" },
      { id: "3", text: "홍길동" },
      { id: "4", text: "이아름" },
    ],
    getDocuments: (state) => [
      { id: "1", text: "해외투자 신고서" },
      { id: "2", text: "1해외투자 사업계획서" },
      { id: "3", text: "2Commercial Invoice" },
      { id: "4", text: "3Bill Of Landing" },
      { id: "5", text: "4해외투자 신고서" },
      { id: "6", text: "5해외투자 사업계획서" },
      { id: "7", text: "6Commercial Invoice" },
      { id: "8", text: "7Bill Of Landing" },
      { id: "9", text: "8해외투자 신고서" },
      { id: "10", text: "9해외투자 사업계획서" },
      { id: "11", text: "10Commercial Invoice" },
      { id: "12", text: "11Bill Of Landing" },
      { id: "13", text: "12해외투자 신고서" },
      { id: "14", text: "13해외투자 사업계획서" },
      { id: "15", text: "14Commercial Invoice" },
      { id: "16", text: "15Bill Of Landing" },
    ],
  },
  actions: {},
});
