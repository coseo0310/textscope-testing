<script setup lang="ts">
import { ref, computed, watch } from "vue";
import CheckBox from "@/components/shared/CheckBox.vue";
import { Grid } from "@/types";
export type Columns = Grid.Columns;
export type GridList = Grid.GridList;
export type GridItem = Grid.GridItem;
export type Selected = Grid.Selected;
interface Props {
  columns: Columns;
  gridList: GridList;
  selected?: Selected[];
  accordion?: string;
}
const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "selected", v: GridList): void;
  (e: "row", v: GridItem): void;
}>();
const selected = ref<Selected[]>(props.selected || []);
const list = ref<GridList>(props.gridList);
const allSelected = computed(() => {
  return selected.value.length === list.value.length;
});
const getGridTemplateColumns = () => {
  return props.columns
    .map((column) => {
      return `${column.width ? `${column.width}px` : `1fr`}`;
    })
    .join(" ");
};
const gridTemplateColumns = ref<string>(
  `${props.selected ? "70px " : ""}${getGridTemplateColumns()}`
);
const onSelected = (id: string) => {
  selected.value = [];
  list.value = list.value.map((g) => {
    if (g.id === id) {
      g.checked = !g.checked;
    }
    if (g.checked) {
      selected.value.push({ id: g.id as string });
    }
    return g;
  });
  emits("selected", list.value);
};
const onAllSelected = (c: boolean) => {
  selected.value = [];
  if (!c) {
    list.value = list.value.map((g) => {
      g.checked = false;
      return g;
    });
  } else {
    list.value = list.value.map((g) => {
      g.checked = true;
      selected.value.push({ id: g.id as string });
      return g;
    });
  }
  emits("selected", list.value);
};
watch(props, () => {
  list.value = props.gridList;
  if (!props.selected) {
    return;
  }
  selected.value = props.selected;
});
</script>

<template>
  <div class="grid">
    <div class="grid__headers">
      <div v-if="props.selected" class="header center checked">
        <CheckBox :default="allSelected" @change="onAllSelected" />
      </div>
      <div
        v-for="c in props.columns"
        class="header"
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
    <div class="grid__columns" :class="{ none: list.length === 0 }">
      <template v-for="g in list">
        <div
          class="row"
          :class="{
            selected: !!g.checked,
            accordion: props.accordion,
            divider: g.divider,
          }"
          @click="
            (e) => {
              emits('row', g);
            }
          "
        >
          <div v-if="props.selected" class="col center checked">
            <CheckBox
              :default="!!g.checked"
              @change="onSelected(g.id as string)"
            />
          </div>
          <div
            v-for="c in props.columns"
            class="col"
            :class="{
              center: c.align === 'center',
              start: c.align === 'start',
              end: c.align === 'end',
            }"
          >
            <slot :name="c.value" :item="g">{{ g[c.value] }}</slot>
          </div>
        </div>
        <div
          v-if="props.accordion"
          class="row accordion-section"
          v-html="g[props.accordion || '']"
        ></div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  width: 100%;
  .grid__headers {
    display: grid;
    grid-template-columns: v-bind("gridTemplateColumns");
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #ffffff;
    padding: 5px 0;
    border-bottom: 1px solid #dfe1e6;

    .header {
      display: flex;
      align-items: center;
      width: 100%;
      line-height: 16px;
      font-size: 12px;
      font-weight: 600;
      color: #5e5e5e;
      // padding: 0 5px;
      &.center {
        justify-content: center;
      }
    }

    .checked {
      width: 40px;
    }
  }
  .grid__columns {
    width: 100%;
    border-bottom: 1px solid #dfe1e6;

    &.none {
      border-bottom: 0;
    }
    .row {
      display: grid;
      grid-template-columns: v-bind("gridTemplateColumns");
      justify-content: space-between;
      align-items: center;
      width: 100%;
      background-color: #ffffff;

      &.accordion-section {
        padding: 20px 30px;
      }
      &.accordion {
        cursor: pointer;
      }
      // &.selected {
      //   background-color: #eee;
      // }
      // &:hover {
      //   background-color: #eee;
      //   cursor: pointer;
      // }
      .col {
        display: flex;
        align-items: center;
        color: #7c7c7c;
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
        min-height: 40px;
        background-color: transparent;
        &.center {
          justify-content: center;
        }
        &.start {
          justify-content: flex-start;
        }
        &.end {
          justify-content: flex-end;
        }

        &.checked {
          width: 40px;
        }
      }
    }
  }
}
</style>
