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
  current.value = n;
  emits("change", current.value);
};
</script>

<template>
  <div class="pagination" :class="{ inspection: props.inspection }">
    <div class="first" @click="onFirst">[처음]</div>
    <div class="prev" @click="onPrev">
      {{ props.inspection ? "<" : "[이전]" }}
    </div>
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
      {{ props.inspection ? ">" : "[다음]" }}
    </div>
    <div class="last" @click="onLast">[끝]</div>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 18px;
  font-weight: 400;
  color: $d5;
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
      color: $point-blue;
    }
  }

  .paging {
    .page {
      padding: 0 10px;

      &.current {
        color: $point-blue;
        font-weight: 700;
      }

      &:hover {
        color: $point-blue;
      }
    }
  }

  &.inspection {
    padding: 10px 10px;
    justify-content: flex-start;

    .first,
    .last {
      display: none;
    }

    .prev,
    .next {
      /* display: none; */
      padding: 0 10px;
      width: 27px;
      height: 33px;
      background-color: $d4;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: 600;
      margin: 0 5px;
    }

    .paging {
      .page {
        padding: 0 10px;
        width: 27px;
        height: 33px;
        background-color: $d4;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        margin: 0 5px;

        &.current {
          color: $d1;
          background-color: $d5;
        }

        &:hover {
          color: $d1;
        }
      }
    }
  }
}
</style>
