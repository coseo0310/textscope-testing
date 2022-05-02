<script setup lang="ts">
import SearchBar from "@/components/task/SearchBar.vue";
import GridFrom from "@/components/task/GridForm.vue";
</script>

<template>
  <div class="work-management">
    <div class="title-wrap">
      <div class="title">업무 관리 ({{ `302,234` }})</div>
      <div role="button" class="filter">검색 필터 선택</div>
    </div>
    <SearchBar />
    <GridFrom />
  </div>
</template>

<style lang="scss" scoped>
.work-management {
  width: 100%;
  height: 100vh;
  background-color: $d2;
}
</style>
