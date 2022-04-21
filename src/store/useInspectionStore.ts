import { defineStore } from "pinia";
import Editor, { Field } from "@/services/editor";

import admission1 from "@/assets/sample/admission/temp1.jpg";
import admission_json1 from "@/assets/sample/admission/temp1.json";
import admission2 from "@/assets/sample/admission/temp2.jpg";
import admission_json2 from "@/assets/sample/admission/temp2.json";
import diagnosis1 from "@/assets/sample/diagnosis/temp1.jpg";
import diagnosis_json1 from "@/assets/sample/diagnosis/temp1.json";
import diagnosis2 from "@/assets/sample/diagnosis/temp2.jpg";
import diagnosis_json2 from "@/assets/sample/diagnosis/temp2.json";
import hospitalization1 from "@/assets/sample/hospitalization/temp1.jpg";
import hospitalization_json1 from "@/assets/sample/hospitalization/temp1.json";
import hospitalization2 from "@/assets/sample/hospitalization/temp2.jpg";
import hospitalization_json2 from "@/assets/sample/hospitalization/temp2.json";
import prescription1 from "@/assets/sample/prescription/temp1.jpg";
import prescription_json1 from "@/assets/sample/prescription/temp1.json";
import prescription2 from "@/assets/sample/prescription/temp2.jpeg";
import prescription_json2 from "@/assets/sample/prescription/temp2.json";
import surgery1 from "@/assets/sample/surgery/temp1.jpg";
import surgery_json1 from "@/assets/sample/surgery/temp1.json";
import surgery2 from "@/assets/sample/surgery/temp2.jpg";
import surgery_json2 from "@/assets/sample/surgery/temp2.json";

type ResponseMetadata = {
  request_datetime: string;
  response_datetime: string;
  time_elapsed: string;
};

type RequestData = {
  detection_rezise_ratio: number;
  detection_score_threshold: number;
  hint: {
    doc_type: {
      use: boolean;
      trust: boolean;
      doc_type: string;
    };
    key_value: {
      use: boolean;
      trust: boolean;
      key: string;
      value: string;
    };
  };
  idcard_version: string;
  image_id: string;
  page: number;
  rectify: {
    rotation_90n: boolean;
    rotation_fine: boolean;
  };
  task_id: string;
};

type ImageMetadata = {
  filename: string;
  format: string;
  height: number;
  upload_datetime: string;
  width: number;
};

type KeyValues = {
  bbox: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  id: string;
  key: string;
  text: string;
  confidence: number;
  is_hint_trusted: boolean;
  is_hint_used: boolean;
  text_ids: string[];
};

type Texts = {
  bbox: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  id: string;
  confidence: number;
  text: string;
  kv_ids: string[];
};

type Prediction = {
  doc_type: {
    code: string;
    confidence: number;
    is_hint_trusted: boolean;
    is_hint_used: boolean;
    name: string;
  };
  key_values: KeyValues[];
  rectification: {
    rotated: number;
  };
  texts: Texts[];
};

type Inspection = {
  img: string;
  image_metadata: ImageMetadata;
  prediction: Prediction;
  request: RequestData;
  response_metadata: ResponseMetadata;
};

type InspectionItems = Inspection[];

type InspectionInfo = {
  filename: string;
  taskId: string;
};
type PreviewItem = {
  info: InspectionInfo;
  items: InspectionItems;
};

type States = {
  previewList: PreviewItem[];
  inspectionItems: InspectionItems;
  inspectionInfo: InspectionInfo;
  synonymList: Field[];
  isInspection: boolean;
  editors: Editor[];
  currentEditor: Editor | null;
  currentPage: number;
  total: number;
  observer: IntersectionObserver | null;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useInspectionStore = defineStore("inspectionStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      previewList: getPreviewList(),
      inspectionItems: [],
      inspectionInfo: {
        filename: "test",
        taskId: "test-01",
      },
      synonymList: [],
      isInspection: false,
      editors: [],
      currentEditor: null,
      currentPage: 1,
      total: 0,
      observer: null,
    };
  },
  actions: {
    async getInspectionItems(idx: number = 0) {
      try {
        // TODO: Get inspection list
        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
        this.inspectionItems = this.previewList[idx].items;
        this.inspectionInfo = this.previewList[idx].info;
        this.editors = this.inspectionItems.map((item, idx) => {
          const editor = new Editor();

          editor.setSectionDraw(true);
          const items =
            item?.prediction.key_values.length || 0 > 0
              ? item?.prediction.key_values
              : item?.prediction.texts;
          items.forEach((item) => {
            editor.setField({
              id: item.id,
              text: item.text,
              dx: item.bbox.x,
              dy: item.bbox.y,
              dWidth: item.bbox.w,
              dHeight: item.bbox.h,
              type: "stroke",
              color: `rgba(220, 118, 118, 1)`,
              lineWidth: 5,
            });

            if (idx === 0) {
              editor.setSections(getSection(idx));
            }
          });
          editor.setImgUrl(item.img);
          editor.setDrawEndCallback(() => {
            this.total = editor.getSections().length || 1;
            this.synonymList = editor.getFields();
            this.setPagination(this.currentPage);
          });
          editor.setBoxSelectedCallback(() => {
            this.total = editor.getSections().length || 1;
            this.synonymList = editor.getFields();
          });
          editor.setResizeCallback(() => {
            this.total = editor.getSections().length || 1;
            this.synonymList = editor.getFields();
            this.setPagination(this.currentPage);
          });
          return editor;
        });

        this.currentPage = 1;
        this.currentEditor = this.editors[0];
        this.total = this.currentEditor.getSectionLength();
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async setInspectionItem(page: number) {
      this.currentEditor = this.editors[page - 1];
      this.total = this.currentEditor.getSectionLength();
      this.synonymList = this.currentEditor.getFields();
      this.currentPage = this.currentEditor.getSectionIdx() + 1;
    },
    async setPagination(page: number) {
      if (this.total <= 1) {
        return;
      }
      this.currentPage = page;
      this.currentEditor?.setSectionField(page - 1);
      this.synonymList = this.currentEditor?.getFields() || [];
    },
    async onStartInspection() {
      // alert("준비중...");
    },
    async onCompleted() {
      alert("준비중...");
    },
    async onSave() {
      alert("준비중...");
    },
    async onOCR() {
      alert("준비중...");
    },
    async onGOCR() {
      alert("준비중...");
    },
  },
});

function getSection(idx: number = 0): Field[] {
  const tmp: Field[][] = [];

  const section0: Field[] = [
    {
      id: `${Date.now() + 1}`,
      text: "Section1-1",

      dx: 413.59,
      dy: 916.09,
      dWidth: 2230,
      dHeight: 857.5,
      type: "stroke",
      color: `#FFD59E`,
      lineWidth: 5,
    },
    {
      id: `${Date.now() + 2}`,
      text: "Section1-2",

      dx: 363.59,
      dy: 2891.1,
      dWidth: 2305,
      dHeight: 805,
      type: "stroke",
      color: `#FFD59E`,
      lineWidth: 5,
    },
  ];
  tmp.push(section0);

  return tmp[idx];
}

function setInspectionList() {
  const tmp = [];

  tmp.push(JSON.parse(JSON.stringify(admission_json1)) as Inspection);
  tmp[0].img = admission1;
  tmp.push(JSON.parse(JSON.stringify(admission_json2)) as Inspection);
  tmp[1].img = admission2;
  tmp.push(JSON.parse(JSON.stringify(diagnosis_json1)) as Inspection);
  tmp[2].img = diagnosis1;
  tmp.push(JSON.parse(JSON.stringify(diagnosis_json2)) as Inspection);
  tmp[3].img = diagnosis2;
  tmp.push(JSON.parse(JSON.stringify(hospitalization_json1)) as Inspection);
  tmp[4].img = hospitalization1;
  tmp.push(JSON.parse(JSON.stringify(hospitalization_json2)) as Inspection);
  tmp[5].img = hospitalization2;
  tmp.push(JSON.parse(JSON.stringify(prescription_json1)) as Inspection);
  tmp[6].img = prescription1;
  tmp.push(JSON.parse(JSON.stringify(prescription_json2)) as Inspection);
  tmp[7].img = prescription2;
  tmp.push(JSON.parse(JSON.stringify(surgery_json1)) as Inspection);
  tmp[8].img = surgery1;
  tmp.push(JSON.parse(JSON.stringify(surgery_json2)) as Inspection);
  tmp[9].img = surgery2;

  return tmp;
}

function getPreviewList(): PreviewItem[] {
  const l1: PreviewItem = {
    info: {
      filename: "test1",
      taskId: "test-01",
    },
    items: setInspectionList().slice(0, 10),
  };
  const l2 = {
    info: {
      filename: "test2",
      taskId: "test-02",
    },
    items: setInspectionList().slice(0, 7),
  };
  const l3 = {
    info: {
      filename: "test3",
      taskId: "test-03",
    },
    items: setInspectionList().slice(0, 9),
  };
  const l4 = {
    info: {
      filename: "test4",
      taskId: "test-04",
    },
    items: setInspectionList().slice(0, 10),
  };
  return [l1, l2, l3, l4];
}
