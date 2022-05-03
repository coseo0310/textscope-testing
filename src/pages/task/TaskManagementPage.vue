<script setup lang="ts">
import MainLayout from "@/components/layout/MainLayout.vue";
import GridFrom from "@/components/task/GridForm.vue";
import ManagementMenuBar from "@/components/task/ManagementMenuBar.vue";
</script>

<template>
  <MainLayout>
    <div class="task-management">
      <ManagementMenuBar />
      <div class="task-management__grid">
        <GridFrom :is-admin="true" />
      </div>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>
.task-management {
  width: 100%;
  height: 100vh;
  padding: 30px 40px;

  .task-management__grid {
    width: 100%;
    overflow: scroll;
  }
}
</style>
