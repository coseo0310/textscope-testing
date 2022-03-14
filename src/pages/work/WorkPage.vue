<script setup lang="ts">
import { ref } from "vue";
import MainLayout from "@/components/layout/MainLayout.vue";
import Grid, { GridList, Columns } from "@/components/shared/Grid.vue";

const columns = ref<Columns>([
  {
    text: "Task ID",
    align: "center",
    sortable: false,
    value: "task",
  },
  {
    text: "카테고리",
    align: "center",
    sortable: false,
    value: "cartegory",
  },
  {
    text: "문서 유형",
    align: "center",
    sortable: false,
    value: "document",
  },
  {
    text: "문서명",
    align: "center",
    sortable: false,
    value: "name",
  },
  {
    text: "OCR",
    align: "center",
    sortable: false,
    value: "ocr",
  },
  {
    text: "검수",
    align: "center",
    sortable: false,
    value: "inspection",
  },
  {
    text: "정확도",
    align: "center",
    sortable: false,
    value: "accuracy",
  },
  {
    text: "작업 일자",
    align: "center",
    sortable: false,
    value: "date",
  },
]);
const gridList = ref<GridList>([]);
</script>

<template>
  <MainLayout>
    <Grid :columns="columns" :grid-list="gridList" />
  </MainLayout>
</template>

<style lang="scss" scoped></style>
