<script setup lang="ts"></script>

<template>
  <article :class="container.layout">editor</article>
</template>

<style lang="scss" module="container">
.layout {
  width: calc(100% - 468px);
  height: 100%;
  background-color: lightcoral;
}
</style>
