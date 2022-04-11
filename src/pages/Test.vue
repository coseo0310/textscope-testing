<script setup lang="ts">
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

type Items = {
  [k in string]: {
    img: string;
    json: any;
  };
};
const items: Items = {
  admission1: {
    img: admission1,
    json: admission_json1,
  },
  admission2: {
    img: admission2,
    json: admission_json2,
  },
  diagnosis1: {
    img: diagnosis1,
    json: diagnosis_json1,
  },
  diagnosis2: {
    img: diagnosis2,
    json: diagnosis_json2,
  },
  hospitalization1: {
    img: hospitalization1,
    json: hospitalization_json1,
  },
  hospitalization2: {
    img: hospitalization2,
    json: hospitalization_json2,
  },
  prescription1: {
    img: prescription1,
    json: prescription_json1,
  },
  prescription2: {
    img: prescription2,
    json: prescription_json2,
  },
  surgery1: {
    img: surgery1,
    json: surgery_json1,
  },
  surgery2: {
    img: surgery2,
    json: surgery_json2,
  },
};
</script>

<template>
  <div class="test"></div>
</template>

<style lang="scss" scoped>
.test {
  width: 100%;
  height: 100vh;
  background-color: $d2;
  display: grid;
  grid-template-columns: 1fr 500px;
  justify-content: space-between;
  align-items: center;

  .viewer-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: rgba(240, 128, 128, 0.8);
    overflow: scroll;
  }

  .info {
    padding: 5px 0;
  }
  .btn-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 5px;

    .btn-box {
      padding-left: 10px;
      button {
        width: 150px;
        height: 50px;
        margin: 5px;
      }
    }

    .rect-wrap {
      .input {
        display: flex;
        flex-direction: column;
      }
      button {
        width: 130px;
        height: 50px;
        margin: 10px 10px 0 10px;
      }
    }
  }
}
</style>
