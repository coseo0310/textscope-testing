<script setup lang="ts">
import { ref } from "vue";
import MainLayout from "@/components/layout/MainLayout.vue";
import Icons from "@/components/shared/Icons.vue";
import Grid, {
  GridList,
  Columns,
  Selected,
} from "@/components/shared/Grid.vue";
import Pagination from "@/components/shared/Pagination.vue";

const columns = ref<Columns>([
  {
    width: 100,
    text: "Task ID",
    align: "center",
    sortable: false,
    value: "task",
  },
  {
    width: 210,
    text: "카테고리",
    align: "center",
    sortable: false,
    value: "category",
  },
  {
    width: 264,
    text: "문서 유형",
    align: "center",
    sortable: false,
    value: "types",
  },
  {
    width: 401,
    text: "문서명",
    align: "center",
    sortable: false,
    value: "name",
  },
  {
    width: 120,
    text: "OCR",
    align: "center",
    sortable: false,
    value: "ocr",
  },
  {
    width: 116,
    text: "검수",
    align: "center",
    sortable: false,
    value: "inspection",
  },
  {
    width: 124,
    text: "정확도",
    align: "center",
    sortable: false,
    value: "accuracy",
  },
  {
    width: 178,
    text: "작업 일자",
    align: "center",
    sortable: false,
    value: "date",
  },
]);

const gridList = ref<GridList>([]);
const selected = ref<Selected[]>([]);

for (let i = 0; i < 14; i++) {
  const id = `${Date.now() + i}`;

  if (i % 3 === 0) {
    console.log("??");
    selected.value.push({ id });
  }
  const obj = {
    id,
    checked: i % 3 === 0 ? true : false,
    task: `abcs-${134 - i}`,
    category: `Category-${i + 1}`,
    types: `type-${i + 1}`,
    name: `document-${i + 1}`,
    ocr: `orc-${i + 1}`,
    inspection: i % 5 === 0 ? "save" : i % 3 ? `완료-${i + 1}` : "-",
    accuracy: `${100 - i}%`,
    date: `${Date.now()}`,
  };
  gridList.value.push(obj);
}

console.log(">>", selected.value);
</script>

<template>
  <MainLayout>
    <div class="work-page">
      <Grid :columns="columns" :grid-list="gridList" :selected="selected">
        <template v-slot:inspection="{ item }">
          <template v-if="item.inspection !== 'save'">
            {{ item.inspection }}
          </template>
          <template v-else>
            <div class="icon">
              <Icons icons="save" />
            </div>
          </template>
        </template>
      </Grid>
      <Pagination :current="13" />
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>
.work-page {
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: $d5;
    cursor: pointer;
  }
}
</style>
