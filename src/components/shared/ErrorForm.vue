<script setup lang="ts"></script>

<template>
  <p class="error-form">
    <slot />
  </p>
</template>

<style lang="scss" scoped>
.error-form {
  color: $point-red;
  margin: 5px 0;
  height: 14px;
}
</style>
