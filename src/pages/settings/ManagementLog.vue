<script setup lang="ts">
import LogCard from "@/components/settings/LogCard.vue";
import SearchCard from "@/components/settings/SearchCard.vue";
</script>

<template>
  <main :class="main.layout">
    <h1 :class="main.title">인사정보 배치이력 조회</h1>
    <div :class="main.card_layout">
      <LogCard />
      <SearchCard />
    </div>
  </main>
</template>

<style lang="scss" module="main">
.layout {
  width: calc(100vw - 400px);
  height: 100vh;
  padding: 0 32px 48px 32px;
}

.title {
  color: $m-900;
  font-size: 29px;
  font-weight: 700;
  padding-top: 42px;
  padding-bottom: 24px;
}

.card_layout {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
