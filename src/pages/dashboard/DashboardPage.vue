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
  grid-template-columns: minmax(456px, 0.8fr) minmax(501px, 0.9fr) minmax(
      539px,
      1.3fr
    );
  grid-template-rows: minmax(324px, 0.8fr) minmax(509px, 1.2fr);
  gap: 30px;

  .b-card {
    margin-top: 10px;
    grid-column: 1 / 4;
    grid-row: 2 / 3;
  }
}
</style>
