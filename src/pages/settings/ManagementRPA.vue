<script setup lang="ts">
import RPACard from "@/components/settings/RPACard.vue";
</script>

<template>
  <main :class="main.layout">
    <h1 :class="main.title">RPA 관리</h1>
    <RPACard />
  </main>
</template>

<style lang="scss" module="main">
.layout {
  width: calc(100vw - 400px);
  height: 100vh;
  padding: 0 32px 48px 32px;
}

.title {
  color: $m-900;
  font-size: 29px;
  font-weight: 700;
  padding-top: 42px;
  padding-bottom: 24px;
}
</style>
