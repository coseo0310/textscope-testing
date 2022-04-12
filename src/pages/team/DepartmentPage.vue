<script setup lang="ts">
import { useUserStore } from "@/store";

const userStore = useUserStore();
</script>

<template>
  <div class="department-page">
    <div class="title">부서 관리 ({{ userStore.teams?.length }})</div>
  </div>
</template>

<style lang="scss" scoped>
.department-page {
  width: 100%;
  /* max-width: 1640px; */
  width: 100%;
  height: 100vh;
  color: $d5;
  padding: 60px 42px;

  .title {
    font-size: 24px;
    font-weight: 600;
    padding-bottom: 60px;
  }

  .card-wrap {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .card {
      margin: 0 20px 80px 20px;
    }
  }
}
</style>
