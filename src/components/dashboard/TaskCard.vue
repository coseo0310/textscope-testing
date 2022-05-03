<script setup lang="ts">
import Grid from "@/components/shared/Grid.vue";
import DatePicker from "@/components/shared/DatePicker.vue";
import { useDashboardStore } from "@/store";

const dashboardStore = useDashboardStore();

const onSelected = (date: string) => {
  const sp = date.split("~");

  const startDt = sp[0];
  const endDt = sp[1];
  console.log("date", startDt, endDt);
};
</script>

<template>
  <div class="task-card">
    <div class="header">
      <div class="title">1. 업무</div>
      <div class="date">
        <DatePicker :range="true" @selected="onSelected" />
      </div>
    </div>
    <div class="grid-wrap">
      <Grid
        :columns="dashboardStore.taskColumns"
        :grid-list="dashboardStore.taskList"
      ></Grid>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task-card {
  width: 100%;
  color: $d5;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;

    .title {
      font-size: 14px;
      font-weight: 700;
    }
  }
}
</style>
