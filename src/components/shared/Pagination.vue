<script setup lang="ts">
import { ref, computed, watch } from "vue";
interface Props {
  limit?: number;
  total?: number;
  current?: number;
  inspection?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  limit: 10,
  total: 35,
  current: 1,
});
const emits = defineEmits<{
  (e: "change", v: number): void;
}>();
const current = ref<number>(props.current);
const limit = ref<number>(props.limit);
const total = ref<number>(props.total);
const pages = computed(() => {
  let p = [];
  let s =
    current.value % limit.value === 0
      ? (current.value / limit.value - 1) * limit.value + 1
      : Math.floor(current.value / limit.value) * limit.value + 1;
  let e = s + limit.value >= props.total ? props.total + 1 : s + limit.value;
  for (let i = s; i < e; i++) {
    p.push(i);
  }
  return p;
});
watch(props, () => {
  current.value = props.current;
  limit.value = props.limit;
  total.value = props.total;
});
const onFirst = () => {
  current.value = 1;
  emits("change", current.value);
};
const onPrev = () => {
  if (current.value <= 1) {
    return;
  }
  current.value = current.value - 1;
  emits("change", current.value);
};
const onNext = () => {
  current.value = current.value + 1;
  emits("change", current.value);
};
const onLast = () => {
  if (current.value >= total.value) {
    return;
  }
  current.value = total.value;
  emits("change", current.value);
};
const onPage = (n: number) => {
  if (props.inspection) {
    emits("change", n);
  } else {
    current.value = n;
    emits("change", current.value);
  }
};
</script>

<template>
  <div class="pagination" :class="{ inspection: props.inspection }">
    <div class="first" @click="onFirst">{{ "<<" }}</div>
    <div class="prev" @click="onPrev">{{ "<" }}</div>
    <div class="paging">
      <div
        v-for="n in pages"
        class="page"
        :class="{ current: n === current }"
        @click="onPage(n)"
      >
        {{ n }}
      </div>
    </div>
    <div class="next" @click="onNext">
      {{ ">" }}
    </div>
    <div class="last" @click="onLast">{{ ">>" }}</div>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: $n-500;
  cursor: pointer;
  .paging {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .first,
  .prev,
  .next,
  .last {
    padding: 0 5px;
    &:hover {
      color: $lomin-deep-orange;
    }
  }
  .paging {
    .page {
      padding: 0 10px;
      &.current {
        color: #ffffff;
        font-weight: 700;
        background-color: $m-900;
        border-radius: 3px;
        padding: 6px 12px;
      }
      &:hover {
        color: $lomin-deep-orange;
      }
    }
  }
}
</style>
