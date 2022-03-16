<script setup lang="ts">
import { watch, onMounted } from "vue";
import HomeLayout from "@/components/layout/HomeLayout.vue";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();

watch(authStore, async () => {
  if (authStore.accessToken && !authStore.user) {
    await authStore.getUser(authStore.accessToken);
  }
});

onMounted(async () => {
  if (authStore.accessToken) {
    await authStore.getUser(authStore.accessToken);
  }
});
</script>

<template>
  <HomeLayout />
</template>

<style lang="scss">
@import "../scss/_reset.scss";
@import "../scss/_global.scss";
</style>
