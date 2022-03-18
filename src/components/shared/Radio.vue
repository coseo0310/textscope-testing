<script setup lang="ts">
import { ref, watch } from "vue";

type Props = {
  label: string;
  default: boolean;
  disabled?: boolean;
};

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "change", v: boolean): void;
}>();

const isChecked = ref<boolean>(props.default);

const onClick = () => {
  if (props.disabled) {
    return;
  }
  isChecked.value = isChecked.value ? true : !isChecked.value;
  emits("change", isChecked.value);
};

watch(props, () => {
  isChecked.value = props.default;
});
</script>

<template>
  <div class="radio" :class="{ disabled: props.disabled }" @click="onClick">
    <div class="checked" :class="{ on: isChecked }"></div>
    <label>{{ props.label }}</label>
  </div>
</template>

<style lang="scss" scoped>
.radio {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &.disabled {
    opacity: 0.7;
  }

  .checked {
    position: relative;
    display: block;
    margin-right: 5px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid $point-blue;

    &::before {
      position: absolute;
      content: "";
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: $point-blue;
      display: none;
    }

    &.on {
      &::before {
        display: block;
      }
    }
  }

  label {
    display: block;
    font-size: 18px;
    font-weight: 400;
  }
}
</style>
