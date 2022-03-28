import { defineStore } from "pinia";
import { Viewer } from "@/services";

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

type Prediction = {
  doc_type: {
    code: string;
    confidence: number;
    is_hint_trusted: boolean;
    is_hint_used: boolean;
    name: string;
  };
  key_value: {
    bbox: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    id: string;
    key: string;
    text: string;
    confidence: number;
    is_hint_trusted: boolean;
    is_hint_used: boolean;
    text_ids: string[];
  }[];
  rectification: {
    rotated: number;
  };
  texts: {
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
  }[];
};

type Inspection = {
  img: string;
  image_metadata: ImageMetadata;
  prediction: Prediction;
  request: RequestData;
  response_metadata: ResponseMetadata;
};

type States = {
  inspectionItems: Inspection[];
  inspectionItem: Inspection | null;
  isInspection: boolean;
  viewer: Viewer;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useInspectionStore = defineStore("inspectionStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      inspectionItems: [],
      inspectionItem: null,
      isInspection: false,
      viewer: new Viewer(),
    };
  },
  actions: {
    async getInspectionItems() {
      try {
        // TODO: Get inspection list
        this.inspectionItems = await setInspectionList();
        this.inspectionItem = this.inspectionItems[0];
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async setInspectionItem(item: Inspection) {
      this.inspectionItem = item;
    },
    async onStartInspection() {
      alert("준비중...");
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
