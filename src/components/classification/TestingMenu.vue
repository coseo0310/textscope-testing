<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Input from "@/components/shared/Input.vue";
import Button from "@/components/shared/Button.vue";
import { useClassificationStore, useCommonStore } from "@/store";
import { path } from "@/router";
import { storeToRefs } from "pinia";
import JSZip from "jszip";

const routes = useRoute();
const router = useRouter();
const commonStore = useCommonStore();
const classificationStore = useClassificationStore();

const {
  modelSelected,
  model,
  modelList,
  isProgress,
  uploadPercent,
  testModel,
  isTesting,
  testStatistics,
} = storeToRefs(classificationStore);

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
        const id = `test-model-${Date.now()}`;
        testModel.value = {
          id,
          title: model.value?.title || "",
          isTest: false,
          items: [],
          accuracy: 0,
        };
        if (testStatistics.value) {
          testStatistics.value.id = id;
        }
        let cnt = 0;
        let tmp = "";

        for (const [k, v] of Object.entries(zip.files)) {
          const sp = k.split("/");
          const category = sp[0];
          const name = sp[1].toLocaleLowerCase();

          if (v.dir || !/\.(jpg|jpeg|pdf|png|tiff)/gm.test(name)) {
            continue;
          }
          testModel.value.items.push({
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
  isTesting.value = false;
  for (let i = 0; i < fileEl.value.files.length; i++) {
    const file = fileEl.value.files[i];
    if (!file) {
      continue;
    }
    zipCreateInstance(file);
  }
};

const onTesting = (type: "start" | "stop") => {
  if (!testModel.value) {
    return;
  }
  if (type === "start") {
    isTesting.value = true;
    testModel.value.accuracy = 81.3;
    setTimeout(() => {
      if (!testModel.value) {
        return;
      }
      testModel.value = { ...testModel.value, isTest: true };
      commonStore.setConfirm(
        ["테스트가 완료되었습니다.", "문서분류 모델 관리로 이동하시겠습니까?"],
        "info",
        () => {
          router.push({ name: path.classification.name });
        },
        () => {},
        "이동"
      );
    }, 1000);
  } else {
    commonStore.setConfirm(
      [
        "테스트가 중지되면 진행된 테스트 결과는 저장",
        "되지 않습니다.",
        "정말 테스트를 중지하시겠습니까?",
      ],
      "warn",
      () => {
        isTesting.value = false;
      },
      () => {},
      "중지"
    );
  }
};

const onStatistics = () => {
  if (!testModel.value) {
    return;
  }
  router.push({
    name: path.classification_statistics.name,
    query: { id: testModel.value.id },
  });
};

onMounted(() => {
  const id = routes.query.id;
  if (!id) {
    router.push({ name: path.classification_management.name });
    return;
  }
  const find = modelList.value.find((f) => f.id == id);
  if (!find) {
    router.push({ name: path.classification_management.name });
    return;
  }
  model.value = find;
});
</script>

<template>
  <div class="register-menu-container">
    <div class="input-wrap">
      <div class="title">
        {{ model?.title }}
      </div>
      <div v-if="isTesting" class="accuracy">
        정확도:
        <span>{{ testModel?.accuracy }}</span>
        %
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
          v-if="!testModel?.isTest"
          class="primary extra-bold"
          :class="{
            ['color-red']: isTesting,
          }"
          :disabled="!testModel"
          @click="isTesting ? onTesting('stop') : onTesting('start')"
        >
          {{ isTesting ? "테스트 중지" : "테스트 시작" }}
        </Button>
        <Button
          v-else
          class="outline extra-bold"
          :disabled="!testModel"
          @click="onStatistics"
        >
          통계
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

  .title {
    display: flex;
    align-items: flex-end;
    color: $d5;
    font-size: 18px;
    font-weight: 600;
    height: 20px;
  }

  .accuracy {
    height: 20px;
    display: flex;
    align-items: flex-end;
    color: $d5;
    font-size: 18px;
    font-weight: 600;
    padding-left: 20px;

    span {
      padding: 0 10px;
      font-size: 40px;
    }
  }

  .input-wrap {
    width: 542px;
    height: 46px;
    display: flex;
    align-items: center;
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
