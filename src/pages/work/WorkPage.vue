<script setup lang="ts">
import TopMenu from "@/components/work/TopMenu.vue";
import UploadBtn from "@/components/work/UploadBtn.vue";
import ListForm from "@/components/work/ListForm.vue";
</script>

<template>
  <main :class="main.layout">
    <TopMenu />
    <UploadBtn />
    <ListForm />
  </main>
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
