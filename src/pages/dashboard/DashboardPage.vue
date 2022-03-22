<script setup lang="ts">
import MainLayout from "@/components/layout/MainLayout.vue";
import AccuracyCard from "@/components/dashboard/AccuracyCard.vue";
import PerformanceCard from "@/components/dashboard/PerformanceCard.vue";
import WorkCard from "@/components/dashboard/WorkCard.vue";
import NetworkCard from "@/components/dashboard/NetworkCard.vue";
</script>

<template>
  <MainLayout>
    <div class="dashboard-page">
      <div class="s-card card">
        <AccuracyCard />
      </div>
      <div class="s-card card">
        <PerformanceCard />
      </div>
      <div class="s-card card">
        <WorkCard />
      </div>
      <div class="b-card card">
        <NetworkCard />
      </div>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>
.dashboard-page {
  padding: 50px 80px;
  width: 100%;
  display: grid;
  grid-template-columns: 456px 501px 539px;
  grid-template-rows: 324px 509px;
  gap: 30px;

  .s-card {
    height: 324px;
  }

  .b-card {
    margin-top: 10px;
    width: 1556px;
    height: 509px;
    grid-column: 1 / 4;
  }
}
</style>
