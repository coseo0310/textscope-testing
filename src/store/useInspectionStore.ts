import { defineStore } from "pinia";
import { Field } from "@/services/editor/";

import PreviewImg from "@/assets/img/tmp1.png";

interface Preview {
  img: string;
  text: string;
  num: number;
  total: number;
}

type States = {
  previewList: Preview[];
  currentPage: number;
  currentField: Field[] | null;
  isInspector: boolean;
  isComplex: boolean;
  documentType: "default" | "normal" | "complex";
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useInspectionStore = defineStore("inspectionStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      previewList: getPreview(),
      currentPage: 1,
      currentField: getFields(),
      isInspector: false,
      isComplex: false,
      documentType: "default",
    };
  },
  getters: {},
  actions: {},
});

function getPreview() {
  const p: Preview[] = [];

  let cnt = 1;
  for (let i = 0; i < 6; i++) {
    const preview = {
      img: PreviewImg,
      text: i < 3 ? "해외투자 사업계획서" : "Commercial Invoice",
      num: cnt,
      total: 3,
    };

    p.push(preview);

    if (cnt === 3) {
      cnt = 1;
    } else {
      cnt++;
    }
  }
  return p;
}

function getFields() {
  const f: Field[] = [];
  const k = [
    "상호 또는 성명",
    "설립연월일",
    "소재지(주소)",
    "투자자 규모",
    "투자자 법인성격",
    "외국인투자기업 여부",
    "총자산",
    "자기자본(자본금)",
    "업종(제품)",
    "담당자 및 연락처",
    "최대주주 소속국가",
  ];
  const v = [
    "(주) 반할라",
    "2018.01.30",
    "서울시 강남구 강남대로 32 신흥빌딩 4층",
    "중소기업",
    "실제영업법인",
    "아니오",
    "2,351",
    "50",
    "IT 솔루션",
    "010-1234-5678",
    "대한미국",
  ];
  for (let i = 0; i < 11; i++) {
    const field: Field = {
      id: `${Date.now}${i}`,
      text: v[i],
      dx: 0,
      dy: 0,
      dWidth: 0,
      dHeight: 0,
      type: "confirm",
      key: k[i],
    };

    f.push(field);
  }
  return f;
}
