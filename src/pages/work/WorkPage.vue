<script setup lang="ts">
import MainLayout from "@/components/layout/MainLayout.vue";
import MenuBar from "@/components/work/MenuBar.vue";
import GridForm from "@/components/work/GridForm.vue";
</script>

<template>
  <MainLayout>
    <div class="work-page">
      <div class="work-page__menu">
        <MenuBar />
      </div>
      <div class="work-page__grid">
        <GridForm />
      </div>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>
.work-page {
  width: 100%;
  padding: 30px 40px;
  .work-page__grid {
    width: 100%;
    padding-top: 30px;
    overflow: scroll;
  }
}
</style>
