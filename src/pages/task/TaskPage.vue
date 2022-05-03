<script setup lang="ts">
import MainLayout from "@/components/layout/MainLayout.vue";
import MenuBar from "@/components/task/MenuBar.vue";
import GridForm from "@/components/task/GridForm.vue";
</script>

<template>
  <MainLayout>
    <div class="task-page">
      <div class="task-page__menu">
        <MenuBar />
      </div>
      <div class="task-page__grid">
        <GridForm />
      </div>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>
.task-page {
  width: 100%;
  height: 100vh;
  padding: 30px 40px;
  .task-page__grid {
    width: 100%;
    padding-top: 30px;
    overflow: scroll;
  }
}
</style>
