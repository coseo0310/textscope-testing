<script setup lang="ts">
import { watch, onMounted } from "vue";
import MainLayout from "@/components/layout/MainLayout.vue";
import { useStore } from "@/store";

const store = useStore();

watch(store, async () => {
  if (store.accessToken && !store.user) {
    await store.getUser(store.accessToken);
  }
});

onMounted(async () => {
  if (store.accessToken) {
    await store.getUser(store.accessToken);
  }
});
</script>

<template>
  <MainLayout />
</template>

<style lang="scss">
@import "../scss/_reset.scss";
@import "../scss/_global.scss";
</style>
