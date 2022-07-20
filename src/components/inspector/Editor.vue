<script setup lang="ts"></script>

<template>
  <article :class="container.layout"></article>
</template>

<style lang="scss" module="container">
.layout {
  width: calc(100% - 468px);
  height: 100%;
  background-color: rgba(0, 0, 0, 0.24);
}
</style>
