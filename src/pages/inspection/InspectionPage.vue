<script setup lang="ts"></script>

<template>
  <main :class="main.layout">inspection</main>
</template>

<style lang="scss" module="main">
.layout {
  width: calc(100vw - 200px);
  height: 100vh;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
