<script setup lang="ts">
import { ref } from "vue";
import CheckBox from "@/components/shared/CheckBox.vue";
import Icons from "@/components/shared/Icons.vue";
import { IconType } from "@/types/";

export type GridList = {
  [k in string]: string;
}[];

export type Columns = {
  text: string;
  align: "start" | "center" | "end";
  sortable: boolean;
  value: string;
}[];

type Props = {
  columns: Columns;
  gridList: GridList;
};

const props = defineProps<Props>();
</script>

<template>
  <div class="grid">
    <div class="grid__columns">
      <div
        v-for="c in props.columns"
        class="column"
        :class="{
          center: c.align === 'center',
          start: c.align === 'start',
          end: c.align === 'end',
          sortable: c.sortable,
        }"
      >
        {{ c.text }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  width: 100%;
  .grid__columns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .column {
      display: flex;
      align-items: center;
      width: 100%;

      &.center {
        justify-content: center;
      }
    }
  }
}
</style>
