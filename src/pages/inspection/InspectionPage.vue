<script setup lang="ts">
import { useAuthStore } from "@/store";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { isLogin } = storeToRefs(authStore);

isLogin.value = true;

console.log("??");
</script>

<template>
  <main :class="main.layout">inspection</main>
</template>

<style lang="scss" module="main">
.layout {
  width: calc(100vw - 200px);
  height: 100vh;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
