<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Icons from "@/components/shared/Icons.vue";
import Grid, { GridList } from "@/components/shared/Grid.vue";
import Pagination from "@/components/shared/Pagination.vue";
import { useTaskStore } from "@/store";

const taskStroe = useTaskStore();
const columns = ref(taskStroe.workColumns);
const selected = ref(taskStroe.selected);
const currentPage = ref<number>(1);

const onSelected = (list: GridList) => {
  taskStroe.selected = list
    .filter((item) => !!item.checked)
    .map((item) => ({ id: item.id as string }));
};

const onPageChange = (current: number) => {
  currentPage.value = current;
  taskStroe.getGridList(currentPage.value);
};

onMounted(() => {});
onUnmounted(() => {});
</script>

<template>
  <div class="grid-form">
    <div class="grid-form__grid">
      <Grid
        :columns="columns"
        :grid-list="taskStroe.workList"
        :selected="selected"
        @selected="onSelected"
      >
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
      <div v-if="taskStroe.workList.length === 0" class="not-found">
        <img src="@/assets/img/magnifier.png" alt="magnifier" />
        <div class="text">검색 필터가 선택되지 않았습니다</div>
      </div>
    </div>
    <div v-if="taskStroe.workList.length > 0" class="grid-form__pagination">
      <Pagination :current="currentPage" @change="onPageChange" />
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
      margin-top: 25vh;
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
