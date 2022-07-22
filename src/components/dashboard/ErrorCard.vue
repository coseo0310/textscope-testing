<script setup lang="ts"></script>

<template>
  <article :class="container.layout">문서별 KV 오류율</article>
</template>

<style lang="scss" module="container">
.layout {
  flex: 0 0 auto;
  width: 100%;
  height: 423px;
  padding: 48px;
  background-color: #ffffff;
  box-shadow: 0px 1px 1px rgba(9, 30, 66, 0.25),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  border-radius: 3px;
}
</style>
