<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
export type ComboBoxItem = { id: number; text: string; value: string };
export type DefaultType = number | null;
interface Props {
  default?: DefaultType;
  items: ComboBoxItem[];
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "change", item: ComboBoxItem): void;
}>();
const initData = props.items.find((item) => item.id === props.default);
const item = ref<ComboBoxItem>(initData ? initData : props.items[0]);
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
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" fill="white" fill-opacity="0.01" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.29201 10.2929C8.1052 10.4818 8.00043 10.7368 8.00043 11.0024C8.00043 11.2681 8.1052 11.523 8.29201 11.7119L11.231 14.6769C11.449 14.8919 11.731 14.9989 12.01 14.9989C12.289 14.9989 12.566 14.8919 12.779 14.6769L15.709 11.7219C15.8956 11.5329 16.0002 11.278 16.0002 11.0124C16.0002 10.7469 15.8956 10.492 15.709 10.3029C15.6172 10.2098 15.5077 10.1358 15.387 10.0853C15.2664 10.0347 15.1368 10.0087 15.006 10.0087C14.8752 10.0087 14.7457 10.0347 14.625 10.0853C14.5043 10.1358 14.3948 10.2098 14.303 10.3029L12.005 12.6199L9.69801 10.2929C9.60597 10.2001 9.49646 10.1264 9.3758 10.0762C9.25514 10.0259 9.12572 10 8.99501 10C8.86429 10 8.73487 10.0259 8.61421 10.0762C8.49355 10.1264 8.38404 10.2001 8.29201 10.2929V10.2929Z"
            fill="#42526E"
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
    font-weight: 400;
    color: #7a869a;
    cursor: pointer;
    border: 1px solid #dfe1e6;
    border-radius: 4px;
    width: 100%;
    &.open {
      background-color: #f4f5f7;
    }
    .text {
      margin-bottom: 1px;
      &.open {
        color: #1b1b1b;
      }
    }
  }
  .list {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffff;
    width: 100%;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 200;
    color: #1b1b1b;
    cursor: pointer;
    box-shadow: 0px 10px 18px rgba(9, 30, 66, 0.15),
      0px 0px 1px rgba(9, 30, 66, 0.31);
    padding: 10px 0;
    z-index: 10;
    .item {
      display: flex;
      align-items: center;
      height: 32px;
      padding: 10px 20px;
      &.on {
        background-color: #1b1b1b;
        color: #ffffff;
      }
      &:hover {
        background-color: #5e5e5e;
        color: #ffffff;
      }
    }
  }
}
</style>
