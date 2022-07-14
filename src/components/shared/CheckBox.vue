<script setup lang="ts">
import { ref, watch } from "vue";
interface Props {
  default?: boolean;
  label?: string;
  middle?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  default: false,
  label: "",
  middle: false,
});
const emits = defineEmits<{
  (e: "change", value: boolean): void;
}>();
const checked = ref<boolean>(props.default);
const mark = ref<boolean>(props.middle);
watch(props, () => {
  checked.value = props.default;
  mark.value = props.middle;
});
const onClick = () => {
  checked.value = !checked.value;
  emits("change", checked.value);
};
</script>

<template>
  <div class="checkbox" @click="onClick">
    <div
      v-if="props.default"
      class="checkbox__box"
      :class="{ active: checked }"
    >
      <div class="icon">
        <svg
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.07361 3.60323C3.25661 3.68184 3.42213 3.79611 3.5605 3.93938L5.5 5.87888L10.4395 0.939379C10.5779 0.796114 10.7434 0.68184 10.9264 0.603226C11.1094 0.524613 11.3062 0.483233 11.5054 0.481502C11.7046 0.479771 11.9021 0.517725 12.0864 0.593147C12.2708 0.668568 12.4383 0.779947 12.5791 0.920786C12.7199 1.06163 12.8313 1.2291 12.9067 1.41345C12.9822 1.59779 13.0201 1.79531 13.0184 1.99448C13.0166 2.19365 12.9753 2.39048 12.8967 2.57348C12.818 2.75649 12.7038 2.92201 12.5605 3.06038L6.5605 9.06038C6.27921 9.34158 5.89775 9.49956 5.5 9.49956C5.10225 9.49956 4.72079 9.34158 4.4395 9.06038L1.4395 6.06038C1.29623 5.92201 1.18196 5.75649 1.10335 5.57348C1.02473 5.39048 0.983355 5.19365 0.981624 4.99448C0.979893 4.79531 1.01785 4.59779 1.09327 4.41345C1.16869 4.2291 1.28007 4.06163 1.42091 3.92079C1.56175 3.77995 1.72922 3.66857 1.91357 3.59315C2.09791 3.51772 2.29543 3.47977 2.4946 3.4815C2.69377 3.48323 2.8906 3.52461 3.07361 3.60323Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
    <div v-else class="checkbox__box" :class="{ active: mark }">
      <div class="icon">
        <svg
          width="12"
          height="4"
          viewBox="0 0 12 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.85718 0.714355H2.14289C1.43281 0.714355 0.857178 1.28999 0.857178 2.00007C0.857178 2.71015 1.43281 3.28578 2.14289 3.28578H9.85718C10.5673 3.28578 11.1429 2.71015 11.1429 2.00007C11.1429 1.28999 10.5673 0.714355 9.85718 0.714355Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
    <p v-if="props.label">{{ props.label }}</p>
  </div>
</template>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  cursor: pointer;

  .checkbox__box {
    position: relative;
    width: 18px;
    height: 18px;
    border: 1px solid #dfe1e6;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    &::before {
      position: absolute;
      content: "";
      width: 35px;
      height: 35px;
      background-color: #0052cc;
      opacity: 0;
      border-radius: 50%;
    }
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      color: transparent;
    }
    &.active {
      border: 1px solid #0052cc;
      background-color: #0052cc;
      .icon {
        color: #ffffff;
      }
    }
  }
  p {
    margin-left: 10px;
    color: #242424;
    font-size: 18px;
    font-weight: 400;
  }

  &.color-blue {
    border-radius: 4px;
    border: 1px solid #0052cc;
  }
}
</style>
