<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import Icons from "@/components/shared/Icons.vue";

export type DropdownItem = {
  id: string;
  text: string;
  value: string;
};

interface Props {
  list: DropdownItem[];
  default?: string;
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "select", item: DropdownItem): void;
}>();

const cur = props.default
  ? props.list.find((l) => l.id === props.default) || props.list[0]
  : props.list[0];
const current = ref<DropdownItem>(cur);
const isDown = ref<boolean>(false);

const onOpen = () => {
  isDown.value = !isDown.value;
};

const onSelect = (e: MouseEvent) => {
  const el = e.target as HTMLElement;
  if (!el || !el.dataset.id) {
    return;
  }

  const find = props.list.find((l) => l.id === el.dataset.id);

  if (!find) {
    return;
  }

  current.value = find;

  emits("select", find);

  isDown.value = false;
};

const onClosest = (e: MouseEvent) => {
  const el = e.target as HTMLElement;
  if (!el) {
    return;
  }
  const closest = el.closest(".dropdown");
  if (!closest) {
    isDown.value = false;
  }
};

watch(props, () => {
  current.value = props.default
    ? props.list.find((l) => l.id === props.default) || props.list[0]
    : props.list[0];
});

onMounted(() => {
  window.addEventListener("click", onClosest);
});

onUnmounted(() => {
  window.removeEventListener("click", onClosest);
});
</script>

<template>
  <div class="dropdown">
    <div class="current" :class="{ active: isDown }" @click="onOpen">
      {{ current?.text }}
    </div>
    <div class="icon" :class="{ active: isDown }" @click="onOpen">
      <Icons icons="chevron-down" />
    </div>
    <ul v-if="isDown" class="list" @click="onSelect">
      <li v-for="item in props.list" class="item" :data-id="item.id">
        {{ item?.text }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  width: 100%;
  height: 100%;

  .current {
    width: 100%;
    height: 100%;
    border: 1px solid $d5;
    border-radius: 5px;
    background-color: $d1;
    height: 48px;
    font-size: 18px;
    font-weight: 400;
    display: flex;
    align-items: center;
    padding: 20px;
    cursor: pointer;

    &.active {
      border-color: $point-blue;
    }
  }

  .icon {
    position: absolute;
    top: 13px;
    right: 15px;
    transform: scale(1.5);

    &.active {
      top: 9px;
      color: $point-blue;
      transform: rotate(180deg) scale(1.5);
    }
  }

  &.border-color-d4 {
    .current {
      border-color: $d4;
    }
    &:hover {
      .current {
        border-color: $d5;
      }
    }
  }

  &.color-d4 {
    .current,
    .icon {
      color: $d4;
    }
    &:hover {
      .current,
      .icon {
        color: $d5;
      }
    }
  }

  .list {
    position: absolute;
    top: 50px;
    width: 100%;
    z-index: 2;
    border-radius: 5px;
    background-color: $d1;
    box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);
    padding: 5px 0;
    cursor: pointer;

    .item {
      width: 100%;
      height: 48px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      font-size: 18px;
      font-weight: 400;

      &:hover {
        background-color: $point-blue;
        color: $d1;
      }
    }
  }

  &.minimal {
    .current {
      border: 0;
      font-size: 14px;
      font-weight: 600;
      padding: 0 15px 0 0;
      height: 30px;
      justify-content: center;
    }

    .icon {
      position: absolute;
      top: 3px;
      right: -10px;
      transform: scale(1.1);
      cursor: pointer;

      &.active {
        top: 1px;
        color: $point-blue;
        transform: rotate(180deg) scale(1.1);
      }
    }

    .list {
      top: 30px;
      .item {
        font-size: 14px;
        font-weight: 600;
        padding: 0 20px;
        height: 30px;
      }
    }
  }
}
</style>
