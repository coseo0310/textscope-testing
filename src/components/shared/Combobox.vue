<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

export type ComboboxItem = { id: number; text: string; value: string };

export type DefaultType = number | null;

interface Props {
  default?: DefaultType;
  items: ComboboxItem[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "change", item: ComboboxItem): void;
}>();

const initData = props.items.find((item) => item.id === props.default);

const item = ref<ComboboxItem>(initData ? initData : props.items[0]);
const open = ref<boolean>(false);
const id = `id-${Date.now()}`;

const onOpen = () => {
  open.value = !open.value;
};

const onSelect = (e: MouseEvent) => {
  const el = e.target as HTMLElement;
  const i = props.items.find((item) => Number(el.dataset.id) === item.id);
  if (!i) {
    return;
  }
  item.value = i;
  emit("change", item.value);
  open.value = false;
};

const closeEvent = (e: MouseEvent) => {
  const el = e.target as HTMLElement;
  const closest = el.closest(`#${id}`);
  if (!closest && open.value) {
    open.value = false;
  }
};
onMounted(() => {
  window.addEventListener("click", closeEvent);
});

onUnmounted(() => {
  window.removeEventListener("click", closeEvent);
});
</script>

<template>
  <div class="combobox-container" :id="id">
    <div :class="{ select: true, open }" @click="onOpen">
      <div :class="{ text: true, open }">
        {{ item.text }}
      </div>
      <div :class="{ chevron: true, open }">
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.25 9.75L12.5 14.25L16.75 9.75"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
    <ul v-if="open" class="list" @click="onSelect">
      <li
        v-for="i in items"
        :class="{ item: true, on: i.id === item.id }"
        :data-id="i.id"
      >
        {{ i.text }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.combobox-container {
  position: relative;
  z-index: 11;
  .select {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: $d5;
    cursor: pointer;
    border-radius: 8px;
    width: 100%;
    height: 40px;
    padding: 0 10px 0 20px;

    &.open {
      background-color: $d2;
    }

    .text {
      margin-bottom: 2px;
      &.open {
        color: $point-blue;
      }
    }

    .chevron {
      path {
        stroke: $d4;
      }

      &.open {
        background-color: $d2;

        path {
          stroke: $point-blue;
        }
      }
    }
  }

  .list {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: $d1;
    width: 100%;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 200;
    color: $d5;
    cursor: pointer;
    box-shadow: 10px 1px 20px 1px rgba(0, 0, 0, 0.1);
    padding: 10px 0;
    z-index: 10;
    .item {
      display: flex;
      align-items: center;
      height: 32px;
      padding: 10px 20px;

      &.on {
        background-color: $d2;
        color: $point-blue;
      }

      &:hover {
        background-color: $point-blue;
        color: $d1;
      }
    }
  }
}
</style>
