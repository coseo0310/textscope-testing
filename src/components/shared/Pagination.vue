<script setup lang="ts">
import { ref, computed, watch } from "vue";
interface Props {
  limit?: number;
  total?: number;
  current?: number;
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
  <div class="pagination">
    <div class="first" :class="{ off: current === 1 }" @click="onFirst">
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.3738 5.12639C10.7643 5.51691 10.7643 6.15008 10.3738 6.5406L6.91421 10.0002L10.3738 13.4597C10.7643 13.8502 10.7643 14.4834 10.3738 14.8739C9.98325 15.2645 9.35008 15.2645 8.95956 14.8739L4.79289 10.7073C4.40237 10.3167 4.40237 9.68358 4.79289 9.29306L8.95956 5.12639C9.35008 4.73586 9.98325 4.73586 10.3738 5.12639Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.2071 5.12639C16.5976 5.51691 16.5976 6.15008 16.2071 6.5406L12.7475 10.0002L16.2071 13.4597C16.5976 13.8502 16.5976 14.4834 16.2071 14.8739C15.8166 15.2645 15.1834 15.2645 14.7929 14.8739L10.6262 10.7073C10.2357 10.3167 10.2357 9.68358 10.6262 9.29306L14.7929 5.12639C15.1834 4.73586 15.8166 4.73586 16.2071 5.12639Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <div class="prev" :class="{ off: current === 1 }" @click="onPrev">
      <svg
        width="7"
        height="12"
        viewBox="0 0 7 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.504998 4.99505L5.098 0.402052C5.18958 0.308597 5.29879 0.234225 5.41929 0.183236C5.5398 0.132248 5.66922 0.105654 5.80007 0.104993C5.93092 0.104332 6.0606 0.129617 6.18161 0.179386C6.30263 0.229155 6.41258 0.30242 6.50511 0.394945C6.59763 0.48747 6.6709 0.597419 6.72066 0.718435C6.77043 0.839451 6.79572 0.969132 6.79506 1.09998C6.7944 1.23083 6.7678 1.36025 6.71681 1.48076C6.66582 1.60126 6.59145 1.71047 6.498 1.80205L2.598 5.70205L6.498 9.60205C6.68056 9.78834 6.78223 10.0392 6.78091 10.3C6.7796 10.5608 6.6754 10.8106 6.49096 10.995C6.30653 11.1795 6.05676 11.2837 5.79593 11.285C5.5351 11.2863 5.28429 11.1846 5.098 11.0021L0.504998 6.41005C0.317527 6.22252 0.212212 5.96822 0.212212 5.70305C0.212212 5.43789 0.317527 5.18358 0.504998 4.99605V4.99505Z"
          fill="currentColor"
        />
      </svg>
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
      <svg
        width="7"
        height="12"
        viewBox="0 0 7 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.49501 4.99507C6.68249 5.1826 6.7878 5.43691 6.7878 5.70207C6.7878 5.96723 6.68249 6.22154 6.49501 6.40907L1.90201 11.0021C1.71573 11.1846 1.46491 11.2863 1.20409 11.285C0.943257 11.2837 0.693486 11.1795 0.50905 10.995C0.324613 10.8106 0.220416 10.5608 0.219098 10.3C0.217781 10.0392 0.319451 9.78836 0.502014 9.60207L4.40202 5.70207L0.502014 1.80207C0.319451 1.61578 0.217781 1.36497 0.219098 1.10414C0.220416 0.843312 0.324613 0.593541 0.50905 0.409105C0.693486 0.224668 0.943257 0.120471 1.20409 0.119153C1.46491 0.117836 1.71573 0.219506 1.90201 0.402069L6.49501 4.99507V4.99507Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <div class="last" @click="onLast">
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.6262 5.12639C11.0168 4.73586 11.6499 4.73586 12.0405 5.12639L16.2071 9.29306C16.5976 9.68358 16.5976 10.3167 16.2071 10.7073L12.0405 14.8739C11.6499 15.2645 11.0168 15.2645 10.6262 14.8739C10.2357 14.4834 10.2357 13.8502 10.6262 13.4597L14.0858 10.0002L10.6262 6.5406C10.2357 6.15008 10.2357 5.51691 10.6262 5.12639Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.79289 5.12639C5.18342 4.73586 5.81658 4.73586 6.20711 5.12639L10.3738 9.29306C10.7643 9.68358 10.7643 10.3167 10.3738 10.7073L6.20711 14.8739C5.81658 15.2645 5.18342 15.2645 4.79289 14.8739C4.40237 14.4834 4.40237 13.8502 4.79289 13.4597L8.25245 10.0002L4.79289 6.5406C4.40237 6.15008 4.40237 5.51691 4.79289 5.12639Z"
          fill="currentColor"
        />
      </svg>
    </div>
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
    padding: 0 9px;

    &.off {
      color: #a5adba;
    }

    &:hover {
      color: #121212;
    }
  }
  .paging {
    padding: 0 9px;

    .page {
      padding: 0 10px;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      padding: 6px 12px;

      &.current {
        color: #ffffff;
        font-weight: 700;
        background-color: #121212;
        border-radius: 3px;
      }
      &:hover {
        font-weight: 700;
      }
    }
  }
}
</style>
