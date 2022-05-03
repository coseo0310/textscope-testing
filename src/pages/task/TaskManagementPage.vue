<script setup lang="ts">
import GridFrom from "@/components/task/GridForm.vue";
import ManagementMenuBar from "@/components/task/ManagementMenuBar.vue";
</script>

<template>
  <div class="task-management">
    <ManagementMenuBar />
    <div class="task-management__grid">
      <GridFrom :is-admin="true" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task-management {
  width: 100%;
  height: 100vh;
  background-color: $d2;
  padding: 30px 40px;

  .task-management__grid {
    width: 100%;
    overflow: scroll;
  }
}
</style>
