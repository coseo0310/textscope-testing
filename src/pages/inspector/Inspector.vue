<script setup lang="ts">
import TopMenu from "@/components/inspector/TopMenu.vue";
import Preview from "@/components/inspector/Preview.vue";
import Editor from "@/components/inspector/Editor.vue";
import Fields from "@/components/inspector/Fields.vue";
import { useAuthStore } from "@/store";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { isLogin } = storeToRefs(authStore);

isLogin.value = true;
</script>

<template>
  <main :class="main.layout">
    <section :class="main.top" aria-label="상단 영역"><TopMenu /></section>
    <section :class="main.bottom" aria-label="하단 영역">
      <Preview />
      <Editor />
      <Fields />
    </section>
  </main>
</template>

<style lang="scss" module="main">
.layout {
  width: calc(100vw - 60px);
  height: 100vh;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
}

.top {
  width: 100%;
  height: 64px;
}

.bottom {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
