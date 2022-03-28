import { defineStore } from "pinia";
import { InspectionData } from "@/types";

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

type States = {
  inspectionItems: InspectionData.Inspection[];
  inspectionItem: InspectionData.Inspection | null;
  isInspection: boolean;
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
  },
});

function setInspectionList() {
  const tmp = [];
  tmp.push(
    JSON.parse(JSON.stringify(admission_json1)) as InspectionData.Inspection
  );
  tmp[0].img = admission1;
  tmp.push(
    JSON.parse(JSON.stringify(admission_json2)) as InspectionData.Inspection
  );
  tmp[1].img = admission2;
  tmp.push(
    JSON.parse(JSON.stringify(diagnosis_json1)) as InspectionData.Inspection
  );
  tmp[2].img = diagnosis1;
  tmp.push(
    JSON.parse(JSON.stringify(diagnosis_json2)) as InspectionData.Inspection
  );
  tmp[3].img = diagnosis2;
  tmp.push(
    JSON.parse(
      JSON.stringify(hospitalization_json1)
    ) as InspectionData.Inspection
  );
  tmp[4].img = hospitalization1;
  tmp.push(
    JSON.parse(
      JSON.stringify(hospitalization_json2)
    ) as InspectionData.Inspection
  );
  tmp[5].img = hospitalization2;
  tmp.push(
    JSON.parse(JSON.stringify(prescription_json1)) as InspectionData.Inspection
  );
  tmp[6].img = prescription1;
  tmp.push(
    JSON.parse(JSON.stringify(prescription_json2)) as InspectionData.Inspection
  );
  tmp[7].img = prescription2;
  tmp.push(
    JSON.parse(JSON.stringify(surgery_json1)) as InspectionData.Inspection
  );
  tmp[8].img = surgery1;
  tmp.push(
    JSON.parse(JSON.stringify(surgery_json2)) as InspectionData.Inspection
  );
  tmp[9].img = surgery2;

  return tmp;
}
