<script setup lang="ts">
import { ref } from "vue";
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
  //   gridList.value.push(obj);
}
</script>

<template>
  <div class="grid-form">
    <div class="grid-form__grid">
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
      <div v-if="gridList.length === 0" class="not-found">
        <img src="@/assets/img/magnifier.png" alt="magnifier" />
        <div class="text">검색 필터가 선택되지 않았습니다</div>
      </div>
    </div>
    <div v-if="gridList.length > 0" class="grid-form__pagination">
      <Pagination :current="13" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-form {
  width: 100%;
  height: 100%;
  .grid-form__grid {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      color: $d5;
      cursor: pointer;
    }

    .not-found {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 200px 0;

      .text {
        color: $d5;
        font-size: 24px;
        font-weight: 600;
        padding: 30px 0;
      }
    }
  }
  .grid-form__pagination {
    padding-top: 40px;
  }
}
</style>
