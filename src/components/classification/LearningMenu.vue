<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "@/components/shared/Button.vue";
import { useClassificationStore, useCommonStore } from "@/store";
import { path } from "@/router";
import { storeToRefs } from "pinia";

const routes = useRoute();
const router = useRouter();
const commonStore = useCommonStore();
const classificationStore = useClassificationStore();
const { model, modelList } = storeToRefs(classificationStore);

const onStopLearning = () => {
  commonStore.setConfirm(
    ["학습이 중지되면 학습 데이터는 보존되지", "않습니다."],
    "warn",
    () => {
      const id = routes.query.id;
      modelList.value = modelList.value.filter((f) => f.id !== id);
      model.value = null;
      router.push(path.classification.path);
    },
    () => {}
  );
};

const onTesting = () => {};

onMounted(() => {
  const id = routes.query.id;
  if (!id) {
    router.push(path.classification.path);
    return;
  }
  const find = modelList.value.find((f) => f.id === id);
  if (!find) {
    router.push(path.classification.path);
    return;
  }
  model.value = find;
});
</script>

<template>
  <div class="learning-menu">
    <div class="title">
      {{ model?.title }}
    </div>
    <div v-if="!model?.isTest" class="btn-wrap">
      <Button class="primary color-red extra-bold" @click="onStopLearning">
        학습 중지
      </Button>
    </div>
    <div v-else class="btn-wrap">
      <Button class="primary extra-bold" @click="onTesting"> 학습 완료 </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.learning-menu {
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    color: $d5;
    font-size: 18px;
    font-weight: 600;
  }

  .btn-wrap {
    width: 180px;
    height: 46px;
  }
}
</style>
