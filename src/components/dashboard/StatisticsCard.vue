<script setup lang="ts">
import Grid, { Columns, GridList } from "@/components/shared/Grid.vue";
import DatePicker from "@/components/shared/DatePicker.vue";

interface Props {
  columns: Columns;
  gridList: GridList;
  title: string;
  callback: Function;
}

const props = defineProps<Props>();

const onSelected = (date: string) => {
  props.callback(date);
};
</script>

<template>
  <div class="task-card">
    <div class="header">
      <div class="title">{{ props.title }}</div>
      <div class="date">
        <DatePicker class="bottom-right" :range="true" @selected="onSelected" />
      </div>
    </div>
    <div class="grid-wrap">
      <Grid :columns="props.columns" :grid-list="props.gridList"></Grid>
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
