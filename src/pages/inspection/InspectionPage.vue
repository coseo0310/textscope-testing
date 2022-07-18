<script setup lang="ts">
import Preview from "@/components/inspection/Preview.vue";
import Editor from "@/components/inspection/Editor.vue";
import Fields from "@/components/inspection/Fields.vue";
import { useAuthStore } from "@/store";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { isLogin } = storeToRefs(authStore);

isLogin.value = true;
</script>

<template>
  <main :class="main.layout">
    <Preview />
    <Editor />
    <Fields />
  </main>
</template>

<style lang="scss" module="main">
.layout {
  width: calc(100vw - 60px);
  height: 100vh;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
}
</style>
