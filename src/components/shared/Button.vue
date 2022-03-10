<script setup lang="ts">
import GradientLoader from "@/components/shared/GradientLoader.vue";

type Props = {
  loader?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  loader: false,
});
</script>

<template>
  <button id="btn">
    <slot />

    <div class="loader" v-show="props.loader">
      <GradientLoader class="white" />
    </div>
  </button>
</template>

<style lang="scss" scoped>
button {
  width: 100%;
  height: 100%;
  position: relative;
  outline: none;
  border: 0;
  background-color: $d1;
  cursor: pointer;
}

.loader {
  position: absolute;
  top: -78px;
  left: 110px;
  /* width: 200px;
  height: 200px; */
  transform: scale(0.15);
}

.primary {
  color: $d1;
  background-color: $point-blue;
  border-radius: 10px;

  &.cancel {
    background-color: $d3;
    color: $point-blue;
  }
}

.outline {
  color: $point-blue;
  background-color: transparent;
  border: 1px solid $point-blue;
  font-size: 18px;
  font-weight: 800;
  border-radius: 10px;
}

.primary,
.outline {
  &.extra-bold {
    font-size: 18px;
    font-weight: 800;
  }

  &.semi-bold {
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
  }
}
</style>
