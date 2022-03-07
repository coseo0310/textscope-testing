<script setup lang="ts"></script>

<template>
  <button id="btn">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  outline: none;
  border: 0;
  background-color: $d1;
  cursor: pointer;
}

.primary {
  color: $d1;
  background-color: $basic-orange;
  border-radius: 10px;

  &.cancel {
    background-color: $layer3;
    color: $point2;
  }
}

.outline {
  color: $basic-orange;
  background-color: transparent;
  border: 1px solid $basic-orange;
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
