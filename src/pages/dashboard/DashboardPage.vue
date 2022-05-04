<script setup lang="ts">
import { onMounted } from "vue";
import MainLayout from "@/components/layout/MainLayout.vue";
import StatisticsCard from "@/components/dashboard/StatisticsCard.vue";
import ChartCard from "@/components/dashboard/ChartCard.vue";
import { useAuthStore, useDashboardStore, useCommonStore } from "@/store";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const commonStore = useCommonStore();
const dashboardStore = useDashboardStore();
const {
  taskColumns,
  taskList,
  taskChartData,
  modelColumns,
  modelList,
  modelChartData,
} = storeToRefs(dashboardStore);
const isAdmin = import.meta.env.MODE.includes("admin");

const onTaskData = (date: string) => {
  const sp = date.split("~");

  const startDt = sp[0];
  const endDt = sp[1];
};

const onModelData = (date: string) => {
  const sp = date.split("~");

  const startDt = sp[0];
  const endDt = sp[1];
};

onMounted(() => {
  // commonStore.setConfirm(
  //   ["저장된 업무가 있습니다.", "이동하시겠습니까?"],
  //   "info",
  //   () => {},
  //   () => {}
  // );
});
</script>

<template>
  <MainLayout>
    <div class="dashboard-page">
      <div class="title">
        {{ isAdmin ? "대시보드" : authStore.user?.division }}
      </div>
      <div class="list-wrap">
        <div class="task-wrap">
          <div class="card-wrap">
            <StatisticsCard
              title="1. 업무"
              :columns="taskColumns"
              :grid-list="taskList"
              :callback="onTaskData"
            />
          </div>
          <div class="card-wrap">
            <ChartCard :data="taskChartData" />
          </div>
        </div>
        <div class="model-wrap">
          <div class="card-wrap">
            <StatisticsCard
              title="2. 문서 모델별 분류"
              :columns="modelColumns"
              :grid-list="modelList"
              :callback="onModelData"
            />
          </div>
          <div class="card-wrap">
            <ChartCard :data="modelChartData" />
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>
.dashboard-page {
  padding: 40px 80px;
  width: 100%;

  .title {
    font-size: 24px;
    font-weight: 600;
    color: $d5;
  }

  .list-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    .task-wrap {
      width: 890px;
      padding: 10px 0;

      .card-wrap {
        padding: 10px 0;
      }
    }
    .model-wrap {
      width: 1150px;
      padding: 10px 0;

      .card-wrap {
        padding: 10px 0;
      }
    }
  }
}
</style>
