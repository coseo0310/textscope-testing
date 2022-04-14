<script setup lang="ts"></script>

<template>
  <input />
</template>

<style lang="scss" scoped>
input {
  border: 1px solid $d5;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  font-weight: 400;
  font-size: 18px;
  padding: 13px 8px;
  color: $d5;
  outline: none;
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &.placeholder-d4 {
    &::placeholder {
      color: $d4;
    }
  }

  &.background-color-red {
    background-color: rgba(255, 82, 82, 0.3);
  }

  &.border-color-red {
    border-color: $point-red;
  }

  &.border-color-blue {
    border-color: $point-blue;
  }

  &.border-color-d5 {
    border-color: $d5;
  }

  &.border-color-d4 {
    border-color: $d4;
  }
  &.border-color-d3 {
    border-color: $d3;
  }

  &.color-red {
    color: $point-red;
  }

  &.color-blue {
    color: $point-blue;
  }

  &.color-d5 {
    color: $d5;
  }

  &.color-d4 {
    color: $d4;
  }

  &:focus {
    &.focus-color-d5 {
      color: $d5;
    }
    &.focus-color-d4 {
      color: $d4;
    }
    &.focus-color-blue {
      color: $point-blue;
    }
    &.focus-color-red {
      color: $point-red;
    }

    &.focus-border-color-d5 {
      border-color: $d5;
    }
    &.focus-border-color-d4 {
      border-color: $d4;
    }
    &.focus-border-color-blue {
      border-color: $point-blue;
    }
    &.focus-border-color-red {
      border-color: $point-red;
    }
  }
}
</style>
