<script setup lang="ts">
import AuthCard from "@/components/settings/AuthCard.vue";
</script>

<template>
  <main :class="main.layout">
    <h1 :class="main.title">검수 1팀</h1>
    <AuthCard />
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
