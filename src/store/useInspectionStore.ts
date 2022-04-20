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

type Bbox = {
  id: string;
  text: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

type InspectionItems = Inspection[];

type PreviewList = InspectionItems[];

type States = {
  previewList: PreviewList;
  inspectionItems: InspectionItems;
  synonymList: Field[];
  isInspection: boolean;
  editor: Editor[];
  currentPage: number;
  total: number;
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
      synonymList: [],
      isInspection: false,
      editor: [],
      currentPage: 1,
      total: 0,
    };
  },
  actions: {
    async getInspectionItems(idx: number = 0) {
      try {
        // TODO: Get inspection list
        this.inspectionItems = this.previewList[idx];
        this.editor = this.inspectionItems.map((item) => {
          const editor = new Editor();
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
          });
          editor.setImgUrl(item.img);
          editor.setDrawEndCallback(() => {
            this.synonymList = editor.getFields();
          });
          return editor;
        });

        this.total = this.inspectionItems.length;
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async setInspectionItem(page: number) {
      this.currentPage = page;
      this.synonymList = this.editor[page - 1].getFields();
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

function getPreviewList() {
  const l1 = setInspectionList().slice(0, 10);
  const l2 = setInspectionList().slice(0, 5);
  const l3 = setInspectionList().slice(0, 8);
  const l4 = setInspectionList().slice(0, 6);
  return [l1, l2, l3, l4];
}
