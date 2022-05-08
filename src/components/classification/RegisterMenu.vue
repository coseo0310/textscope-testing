<script setup lang="ts">
import { ref, onMounted } from "vue";
import Input from "@/components/shared/Input.vue";
import Button from "@/components/shared/Button.vue";
import Icons from "@/components/shared/Icons.vue";
import { useForm } from "@/hooks";
import { useClassificationStore, useCommonStore } from "@/store";
import { storeToRefs } from "pinia";
import JSZip from "jszip";

const commonStore = useCommonStore();
const classificationStore = useClassificationStore();
const { register, getValues, errors, setValidate } = useForm();

const { modelSelected, model, modelList, isProgress, uploadPercent } =
  storeToRefs(classificationStore);

const fileEl = ref<HTMLInputElement | null>(null);

const onDelete = () => {
  commonStore.setConfirm(
    ["삭제된 데이터는 복구할 수 없습니다.", "정말 삭제하시겠습니까?"],
    "warn",
    () => {
      if (!model.value?.items) {
        return;
      }

      model.value.items = model.value.items.filter(
        (f) => !modelSelected.value.some((s) => s.id === f.id)
      );
      modelSelected.value = [];
    },
    () => {
      // TODO: Cancel Func
    }
  );
};

const onUpload = () => {
  if (errors.value.title?.type === "required") {
    commonStore.setToast("문서 분류 모델 이름을 입력해주세요", "warn");
    return;
  } else if (errors.value.title?.type === "pattern") {
    commonStore.setToast(
      "<p>카테고리명이 올바르지 않습니다.</p><p>문서분류 모델명 작성 규칙을 참고해서 수정</p><p>해주세요</p>",
      "warn"
    );
    return;
  }
  const { title } = getValues();

  for (const m of modelList.value) {
    if (m.title === title) {
      commonStore.setToast("카테고리명이 올바르지 않습니다.", "warn");
      return;
    }
  }
  if (new Blob([title]).size > 40) {
    commonStore.setToast("문류 모델명이 40bytes를 초과하였습니다.", "warn");
    return;
  }
  if (!fileEl.value) {
    return;
  }
  fileEl.value.click();
};

const fileUpload = () => {
  // TODO: File Upload
  isProgress.value = true;
  uploadPercent.value = 30;
};

const zipCreateInstance = (file: File) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = function (e) {
    const result = e.target?.result;
    if (!result) {
      return;
    }
    JSZip.loadAsync(result)
      .then((zip) => {
        const { title } = getValues();
        model.value = {
          title,
          items: [],
        };

        let cnt = 0;
        let tmp = "";

        for (const [k, v] of Object.entries(zip.files)) {
          const sp = k.split("/");
          const category = sp[0];
          const name = sp[1].toLocaleLowerCase();

          if (v.dir || !/\.(jpg|jpeg|pdf|png|tiff)/gm.test(name)) {
            continue;
          }
          model.value.items.push({
            id: `${Date.now() + cnt++}`,
            category,
            name,
            divider: tmp === category,
          });
          tmp = category;
        }

        fileUpload();
      })
      .catch(console.error);
  };
};

const onUploadZip = async () => {
  if (!fileEl.value) {
    return;
  }
  if (!fileEl.value.files) {
    return;
  }
  for (let i = 0; i < fileEl.value.files.length; i++) {
    const file = fileEl.value.files[i];
    if (!file) {
      continue;
    }
    zipCreateInstance(file);
  }
};

const onLearning = () => {
  alert("준비중...");
};

onMounted(() => {
  setValidate();
});
</script>

<template>
  <div class="register-menu-container">
    <div class="input-wrap">
      <Input
        class="border-color-d4 color-d5"
        name="title"
        :ref="
          register({
            required: true,
            pattern: /^[ㄱ-ㅎ\s|가-힣\s|a-z\s|A-Z\s|0-9\s|]+$/,
          })
        "
      />
      <div class="icon-wrap">
        <Icons icons="info" />
        <div class="info">
          <div class="box">
            <div class="title">
              문서 분류 모델 이름은 한글과 영어 그리고 숫자만 입력해주세요
            </div>
            <div class="subject">
              <p>∙ 사업투자 심사97 ( O )</p>
              <p>∙ 사업투자 !@ ( X )</p>
              <p>∙ 사업투자 investment( O )</p>
            </div>
          </div>
          <div class="box">
            <div class="title">
              문서 분류 모델 이름은 중복하여 사용할 수 없고, 띄어쓰기가
              반영됩니다.
            </div>
            <div class="subject">
              <p>
                ∙ 사업투자 심사 모델과 사업투자심사 모델은 다른 모델로
                인식됩니다.
              </p>
            </div>
          </div>
          <div class="box">
            <div class="title">영어 알파벳 대소문자가 구분됩니다.</div>
            <div class="subject">
              <p>
                ∙ 사업투자 Investment 와 investment는 다른 모델로 인식됩니다.
              </p>
            </div>
          </div>
          <div class="box">
            <div class="title">
              문서 분류 모델 이름은 띄어쓰기 포함 40bytes를 초과할 수 없습니다.
            </div>
            <div class="subject">
              <p>∙ 한글 1자는 2~3bytes</p>
              <p>∙ 띄어쓰기 공백은 1bytes</p>
              <p>∙ 알파벳 한자는 1bytes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-group">
      <div class="btn-wrap">
        <Button
          class="primary color-red extra-bold"
          :disabled="modelSelected.length === 0"
          @click="onDelete"
        >
          삭제
        </Button>
      </div>
      <div class="btn-wrap">
        <Button class="primary extra-bold" @click="onUpload">업로드</Button>
        <input
          ref="fileEl"
          style="display: none"
          accept="zip/*,.zip"
          type="file"
          @change="onUploadZip"
        />
      </div>
      <div class="btn-wrap">
        <Button
          class="primary extra-bold"
          :disabled="!model"
          @click="onLearning"
        >
          학습시작
        </Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register-menu-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  .input-wrap {
    width: 542px;
    height: 46px;
    display: flex;
    align-items: center;

    .icon-wrap {
      position: relative;
      color: $d4;
      padding: 5px;
      cursor: pointer;

      &:hover {
        .info {
          display: flex;
        }
      }

      .info {
        display: none;
        flex-direction: column;
        color: $d5;
        position: absolute;
        background-color: $d1;
        width: 605px;
        height: 410px;
        border-radius: 10px;
        box-shadow: $shadow-alpha-1;
        z-index: 2;
        padding: 30px 0;

        .box {
          padding: 10px 40px;
          .title,
          .subject {
            font-size: 18px;
            font-weight: 600;
          }

          .title {
            padding: 5px 0;
          }

          .subject {
            color: $d4;
            padding-left: 25px;
          }
        }
      }
    }
  }

  .btn-group {
    display: flex;

    .btn-wrap {
      width: 180px;
      height: 46px;
      padding-left: 20px;
    }
  }
}
</style>
