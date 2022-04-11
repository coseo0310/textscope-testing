<script setup lang="ts">
import { ref } from "vue";

export type Labels = {
  on: string;
  off: string;
};

interface Props {
  default: boolean;
  labels?: Labels;
}

const props = withDefaults(defineProps<Props>(), {
  default: false,
});

const emit = defineEmits<{
  (e: "change", state: boolean): void;
}>();

const state = ref<boolean>(props.default);
const onClick = () => {
  state.value = !state.value;
  emit("change", state.value);
};
const onCheck = () => {};
</script>

<template>
  <div class="switch-wrap" @click="onClick">
    <div id="switch" :class="{ active: state }"></div>
    <div id="on" :class="{ active: state }">{{ props.labels?.on || "ON" }}</div>
    <div id="off" :class="{ active: !state }">
      {{ props.labels?.off || "OFF" }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.switch-wrap {
  position: relative;
  border: 0;
  border-radius: 20px;
  background-color: $d1;
  max-width: 162px;
  max-height: 40px;
  width: 100%;
  height: 100%;
  cursor: pointer;

  #on,
  #off {
    max-width: 83px;
    max-height: 40px;
    position: absolute;
    font-size: 18px;
    font-weight: 400;
    color: $d5;
    transition: color 0.3s ease-in-out;

    &.active {
      color: $d1;
    }
  }

  #on {
    border: 0;
    border-radius: 20px;
    /* background-color: $point-blue; */
    max-height: 40px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
  }

  #off {
    border: 0;
    border-radius: 20px;
    /* background-color: $point-blue; */
    max-height: 40px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
  }

  #switch {
    border: 0;
    border-radius: 20px;
    background-color: $point-blue;
    max-width: 83px;
    max-height: 40px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;

    &.active {
      color: $d1;
      transform: translateX(80px);
    }
  }
}
</style>
