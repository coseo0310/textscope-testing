<script setup lang="ts">
import { computed } from "vue";
import Grid, { GridList, GridItem } from "@/components/shared/Grid.vue";
import homeworkImg from "@/assets/img/homework1.png";
import { useClassificationStore } from "@/store";
import { storeToRefs } from "pinia";

const classificationStore = useClassificationStore();

const { model, modelColumns, modelSelected } = storeToRefs(classificationStore);

const getFileList = computed(() => {
  if (!model.value) {
    return [];
  }
  const gridList: GridList = model.value.items.map((item, idx) => {
    const no = `${(model.value?.items.length || 10) - idx}`;
    const obj: GridItem = {
      id: item.id,
      no,
      category: item.category,
      name: item.name,
      divider: !!item.divider,
    };
    return obj;
  });
  return gridList;
});

const onSelected = (list: GridList) => {
  modelSelected.value = list
    .filter((item) => !!item.checked)
    .map((item) => ({ id: item.id as string }));
};
</script>

<template>
  <div class="register-form">
    <div v-if="model" class="grid-wrap">
      <Grid
        :columns="modelColumns"
        :grid-list="getFileList"
        :selected="modelSelected"
        @selected="onSelected"
      />
    </div>
    <div v-else class="not-found">
      <img :src="homeworkImg" alt="homework" />
      <div class="text">
        `업로드` 버튼을 물러 문서 분류 모델 학습에 사용될 zip 압축파일을
        업로드해주세요.
      </div>
      <div class="text">
        문서 파일은 png, jpg, pdf, tiff 형식만 포함시켜주세요.
      </div>
      <div class="text">
        카테고리별 최소 30장 이상의 문서를 업로드해야 학습이 가능합니다.
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register-form {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .grid-wrap {
    width: 100%;
  }
  .not-found {
    padding-top: 15vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      padding-bottom: 20px;
    }

    .text {
      color: $d5;
      font-size: 24px;
      font-weight: 600;
      padding: 10px 0;
    }
  }
}
</style>
