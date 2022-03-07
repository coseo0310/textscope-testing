<script setup lang="ts">
import { ref } from "vue";

interface Props {
  default: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  default: false,
});

const emit = defineEmits<{
  (e: "change", state: boolean): void;
}>();

const state = ref<boolean>(props.default);
const str = ref<"ON" | "OFF">(props.default ? "ON" : "OFF");
const onClick = () => {
  str.value = !state.value ? "ON" : "OFF";
  state.value = !state.value;
  emit("change", state.value);
};
const onCheck = () => {};
</script>

<template>
  <div class="switch-wrap" @click="onClick">
    <div id="switch" :class="{ on: state }">{{ str }}</div>
  </div>
</template>

<style lang="scss" scoped>
.switch-wrap {
  border: 0;
  border-radius: 20px;
  background-color: $d1;
  max-width: 162px;
  max-height: 40px;
  width: 100%;
  height: 100%;
  cursor: pointer;

  #switch {
    border: 0;
    border-radius: 20px;
    color: $d1;
    background-color: $point-blue;
    max-width: 83px;
    max-height: 40px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    transition: all 0.2s;

    &.on {
      transform: translateX(83px);
    }
  }
}
</style>
