import { defineStore } from "pinia";

import PreviewImg from "@/assets/img/tmp1.png";

interface Preview {
  img: string;
  text: string;
  num: number;
  total: number;
}

type States = {
  isInspector: boolean;
  previewList: Preview[];
  currentPage: number;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useInspectionStore = defineStore("inspectionStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      isInspector: false,
      previewList: getPreview(),
      currentPage: 1,
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
