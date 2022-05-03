<script setup lang="ts">
import MainLayout from "@/components/layout/MainLayout.vue";
import TaskCard from "@/components/dashboard/TaskCard.vue";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();
const isAdmin = import.meta.env.MODE.includes("admin");
</script>

<template>
  <MainLayout>
    <div class="dashboard-page">
      <div class="title">
        {{ isAdmin ? "대시보드" : authStore.user?.division }}
      </div>
      <div class="card-wrap">
        <TaskCard />
      </div>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>
.dashboard-page {
  padding: 30px 60px;
  width: 100%;

  .title {
    color: $d5;
    font-size: 24px;
    font-weight: 600;
  }
}
</style>
