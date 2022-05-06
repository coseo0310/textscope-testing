<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import Icons from "@/components/shared/Icons.vue";
import Grid, { GridList, GridItem } from "@/components/shared/Grid.vue";
import Pagination from "@/components/shared/Pagination.vue";
import { useTaskStore } from "@/store";
import { path } from "@/router";
import Job from "@/assets/img/job_1.png";
import Magnifier from "@/assets/img/magnifier.png";

interface Props {
  isAdmin?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isAdmin: false,
});

const img = props.isAdmin ? Job : Magnifier;

const taskStore = useTaskStore();
const router = useRouter();
const columns = ref(taskStore.taskColumns);
const selected = ref(taskStore.selected);
const currentPage = ref<number>(1);

const onSelected = (list: GridList) => {
  taskStore.selected = list
    .filter((item) => !!item.checked)
    .map((item) => ({ id: item.id as string }));
};

const onPageChange = (current: number) => {
  currentPage.value = current;
  taskStore.getGridList(currentPage.value);
};

const onRow = (v: GridItem) => {
  if (typeof v.id !== "string") {
    return;
  }
  router.push({
    name: path.inspection.name,
    params: {
      id: v.id,
      type: props.isAdmin ? "admin" : "user",
    },
  });
};

onMounted(() => {});
onUnmounted(() => {});
</script>

<template>
  <div class="grid-form">
    <div class="grid-form__grid">
      <Grid
        :columns="columns"
        :grid-list="taskStore.taskList"
        :selected="selected"
        @selected="onSelected"
        @row="onRow"
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
      <div v-if="taskStore.taskList.length === 0" class="not-found">
        <img :src="img" alt="magnifier" />
        <div class="text">검색 필터가 선택되지 않았습니다</div>
      </div>
    </div>
    <div v-if="taskStore.taskList.length > 0" class="grid-form__pagination">
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
