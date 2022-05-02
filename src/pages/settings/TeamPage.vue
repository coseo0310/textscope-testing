<script setup lang="ts">
import MainLayout from "@/components/layout/MainLayout.vue";
</script>

<template>
  <MainLayout>
    <router-view></router-view>
  </MainLayout>
</template>

<style lang="scss" scoped>
.team-page {
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
