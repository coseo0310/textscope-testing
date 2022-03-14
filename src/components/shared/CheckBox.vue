<script setup lang="ts">
import { ref } from "vue";

type Props = {
  default?: boolean;
  label?: string;
};

const props = withDefaults(defineProps<Props>(), {
  default: false,
  label: "",
});
const emits = defineEmits<{
  (e: "change", value: boolean): void;
}>();

const checked = ref<boolean>(props.default);

const onClick = () => {
  checked.value = !checked.value;
  emits("change", checked.value);
};
</script>

<template>
  <div class="checkbox" @click="onClick">
    <div class="checkbox__box" :class="{ active: checked }">
      <div class="icon">
        <svg
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.86337 7.58358L1.55004 5.27025C1.42548 5.14542 1.25638 5.07526 1.08004 5.07526C0.903694 5.07526 0.734593 5.14542 0.610039 5.27025C0.350039 5.53025 0.350039 5.95025 0.610039 6.21025L3.39671 8.99692C3.65671 9.25692 4.07671 9.25692 4.33671 8.99692L11.39 1.94358C11.65 1.68358 11.65 1.26358 11.39 1.00358C11.2655 0.878749 11.0964 0.808594 10.92 0.808594C10.7437 0.808594 10.5746 0.878749 10.45 1.00358L3.86337 7.58358Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
    <p>{{ props.label }}</p>
  </div>
</template>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20px;
  cursor: pointer;

  .checkbox__box {
    width: 16px;
    height: 16px;
    border: 1px solid $point-blue;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      color: transparent;
    }
    &.active {
      background-color: $point-blue;

      .icon {
        color: $d2;
      }
    }
  }

  p {
    margin-left: 10px;
    color: $d5;
    font-size: 18px;
    font-weight: 400;
  }
}
</style>
