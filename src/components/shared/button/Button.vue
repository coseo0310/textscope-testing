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
