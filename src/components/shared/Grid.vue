<script setup lang="ts">
import { ref, computed, watch } from "vue";
import CheckBox from "@/components/shared/CheckBox.vue";
import { Grid } from "@/types";

export type Columns = Grid.Columns;
export type GridList = Grid.GridList;
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
}>();

const selected = ref<Selected[]>(props.selected || []);
const list = ref<GridList>(props.gridList);
const allSelected = computed(() => {
  return list.value.length === 0
    ? false
    : !list.value.find((f) => f.checked === false);
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
  list.value = list.value.map((g) => {
    if (g.id === id) {
      g.checked = !g.checked;
    }
    return g;
  });
  emits("selected", list.value);
};

const onAllSelected = (c: boolean) => {
  if (!c && selected.value.length > 0) {
    list.value = list.value.map((g) => {
      g.checked = false;
      return g;
    });
  } else {
    list.value = list.value.map((g) => {
      g.checked = true;
      return g;
    });
  }
  emits("selected", list.value);
};

watch(props, () => {
  list.value = props.gridList;
});
</script>

<template>
  <div class="grid">
    <div class="grid__headers">
      <div v-if="props.selected" class="header center">
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
          :class="{ selected: !!g.checked, accordion: props.accordion }"
        >
          <div v-if="props.selected" class="col center">
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
    background-color: $d3;
    padding: 10px 0;
    border-top: 2px solid $d4;
    border-bottom: 2px solid $d4;

    .header {
      display: flex;
      align-items: center;
      width: 100%;
      font-size: 18px;
      font-weight: 600;
      color: $d5;
      padding: 0 20px;

      &.center {
        justify-content: center;
      }
    }
  }
  .grid__columns {
    width: 100%;
    border-bottom: 2px solid $d4;

    &.none {
      border-bottom: 0;
    }

    .row {
      display: grid;
      grid-template-columns: v-bind("gridTemplateColumns");
      justify-content: space-between;
      align-items: center;
      width: 100%;
      background-color: $d2;

      &.accordion-section {
        padding: 20px 30px;
      }

      &.accordion {
        cursor: pointer;
      }

      &.selected {
        background-color: $d3;
      }
      &:hover {
        background-color: $d3;
      }
      .col {
        display: flex;
        align-items: center;
        color: $d5;
        font-size: 18px;
        font-weight: 400;
        min-height: 45px;
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
      }
    }
  }

  &.underline {
    .grid__columns {
      .row {
        border-bottom: 2px solid $d4;
      }

      :last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>
