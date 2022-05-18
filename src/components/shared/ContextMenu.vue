<script setup lang="ts">
import { onMounted, onUnmounted, computed, watch } from "vue";

export interface Context {
  text: string;
  callback: () => void;
  color: "blue" | "red";
}

export type Contexts = Context[];

export type Translate = {
  x: number;
  y: number;
};

interface Props {
  contexts: Contexts;
  isShow: boolean;
  translate: Translate;
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "close"): void;
}>();

const display = computed(() => {
  onClose();
  return props.isShow ? "flex" : "none";
});

const translate = computed(
  () => `translate(${props.translate.x}px, ${props.translate.y}px)`
);

const onClose = () => {
  const menus = document.querySelectorAll(".context-menu");
  menus.forEach((m) => {
    const el = m as HTMLDivElement;
    if (!el) {
      return;
    }
    el.style.display = "none";
  });
};

const onClosest = (e: MouseEvent) => {
  const el = e.target as HTMLElement;
  if (!el) {
    return;
  }

  const closest = el.closest(".context-menu");

  if (closest) {
    return;
  }

  onClose();
  emits("close");
};

const onClick = (callback: Function) => {
  callback();
  emits("close");
};

onMounted(() => {
  window.addEventListener("click", onClosest);
});

onUnmounted(() => {
  window.removeEventListener("click", onClosest);
});
</script>

<template>
  <div v-show="props.isShow" class="context-menu" ref="contextMenu">
    <div
      v-for="b in props.contexts"
      role="button"
      class="btn"
      :class="{
        [b.color]: true,
      }"
      @click="onClick(b.callback)"
    >
      {{ b.text }}
    </div>
  </div>
</template>

<style lang="scss">
.context-menu {
  position: absolute;
  top: 0;
  left: 0;
  background-color: $d1;
  box-shadow: $shadow-alpha-1;

  display: v-bind("display");
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: 112px;
  border-radius: 16px;
  padding: 15px 30px;
  transform: v-bind("translate");

  .btn {
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;

    &.blue {
      color: $point-blue;
    }

    &.red {
      color: $point-red;
    }
  }
}
</style>
