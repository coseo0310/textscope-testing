<script setup lang="ts"></script>

<template>
  <article :class="container.layout"></article>
</template>

<style lang="scss" module="container">
.layout {
  width: 100%;
  height: calc(100% - 95px);
  padding: 48px;
  background-color: #ffffff;
  box-shadow: 0px 1px 1px rgba(9, 30, 66, 0.25),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  border-radius: 3px;
}
</style>

<style lang="scss" module="profile"></style>
