<script setup lang="ts">
import { useStore } from "@/store";
import { eraseCookie } from "@/utils";
import { TOKEN } from "@/constants";

const store = useStore();
</script>

<template>
  <div>
    Dashboard
    <div>{{ store.user?.id }}</div>
    <div>{{ store.user?.name }}</div>
    <div>{{ store.user?.authority }}</div>
    <button @click="store.onLogout">logout</button>
  </div>
</template>

<style lang="scss" scoped></style>
