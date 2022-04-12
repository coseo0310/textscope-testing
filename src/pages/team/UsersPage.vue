<script setup lang="ts">
import MainLayout from "@/components/layout/MainLayout.vue";
import ProfileCard from "@/components/shared/ProfileCard.vue";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();
</script>

<template>
  <div class="users-page">
    <div class="title">
      {{ authStore.user?.division }} ({{ authStore.user?.team?.length }})
    </div>
    <div class="card-wrap">
      <div v-for="t in authStore.user?.team" class="card">
        <ProfileCard :user="t" :focus="t.id === authStore.user?.id" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.users-page {
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
