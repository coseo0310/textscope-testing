<script setup lang="ts">
import { computed } from "vue";
import Grid, { GridList, GridItem } from "@/components/shared/Grid.vue";
import homeworkImg from "@/assets/img/homework1.png";
import { useClassificationStore } from "@/store";
import { storeToRefs } from "pinia";

const classificationStore = useClassificationStore();

const { testModel, testModelColumns, modelSelected } =
  storeToRefs(classificationStore);

const getFileList = computed(() => {
  if (!testModel.value) {
    return [];
  }
  const gridList: GridList = testModel.value.items.map((item, idx) => {
    const no = `${(testModel.value?.items.length || 10) - idx}`;
    const obj: GridItem = {
      id: item.id,
      no,
      category: item.category,
      name: item.name,
      divider: !!item.divider,
      matchCategory: testModel.value?.isTest
        ? idx % 2 === 0
          ? item.category
          : "not found"
        : "-",
      result: testModel.value?.isTest
        ? idx % 2 === 0
          ? "일치"
          : "불일치"
        : "-",
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
    <div v-if="testModel" class="grid-wrap">
      <Grid
        :columns="testModelColumns"
        :grid-list="getFileList"
        :selected="modelSelected"
        @selected="onSelected"
      >
        <template v-slot:matchCategory="{ item }">
          <div
            :class="{
              red: item.result === '불일치',
            }"
          >
            {{ item.matchCategory }}
          </div>
        </template>
        <template v-slot:result="{ item }">
          <div
            :class="{
              red: item.result === '불일치',
            }"
          >
            {{ item.result }}
          </div>
        </template>
      </Grid>
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
        최소 30개 이상의 문서로 테스트하는 것을 권장합니다.
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

    .red {
      color: $point-red;
    }
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
