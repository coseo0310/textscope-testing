<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Button from "@/components/shared/Button.vue";
import ModelCard from "@/components/classification/ModelCard.vue";
import FormImg from "@/assets/img/form1.png";
import { useClassificationStore, useCommonStore } from "@/store";
import { storeToRefs } from "pinia";
import { path } from "@/router";

const commonStore = useCommonStore();
const classificationStore = useClassificationStore();
const { modelList, model, testModel } = storeToRefs(classificationStore);
const router = useRouter();

const onMapping = () => {
  if (modelList.value.length > 0) {
    router.push({ name: path.classification_mapping.name });
  } else {
    commonStore.setToast("등록된 모델이 없습니다.", "warn");
  }
};

const onRegister = () => {
  router.push({
    name: path.classification_register.name,
  });
};

onMounted(() => {
  model.value = null;
  testModel.value = null;
});
</script>

<template>
  <div class="classification-register">
    <div class="menu-bar">
      <div class="title">문서분류 모델 관리({{ modelList.length }})</div>
      <div class="btn-group">
        <div class="btn-wrap">
          <Button class="outline extra-bold" @click="onMapping">
            모델 맵핑
          </Button>
        </div>
        <div class="btn-wrap">
          <Button class="primary extra-bold" @click="onRegister">
            모델 등록
          </Button>
        </div>
      </div>
    </div>
    <div v-if="modelList.length > 0" class="card-wrap">
      <ModelCard
        v-for="m in modelList"
        :id="m.id"
        :title="m.title"
        :date="m.date"
      />
    </div>
    <div v-else class="form">
      <img :src="FormImg" alt="form" />
      <div class="text">
        `모델 등록` 버튼을 눌러 문서 분류 모델을 등록해주세요.
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.classification-register {
  width: 100%;
  height: 100vh;
  padding: 80px 70px;

  .menu-bar {
    display: flex;
    justify-content: space-between;

    .title {
      font-size: 24px;
      font-weight: 600;
      color: $d5;
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

  .card-wrap {
    padding: 40px 0;
    display: flex;
    flex-wrap: wrap;

    div {
      margin-right: 50px;
      margin-bottom: 30px;
    }
  }

  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .text {
      font-size: 24px;
      color: $d5;
      font-weight: 600;
      padding-top: 20px;
    }
  }
}
</style>
