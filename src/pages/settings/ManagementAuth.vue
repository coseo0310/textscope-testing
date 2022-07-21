<script setup lang="ts">
import AuthCard from "@/components/settings/AuthCard.vue";
import TeamCard from "@/components/settings/TeamCard.vue";
</script>

<template>
  <main :class="main.layout">
    <h1 :class="main.title">권한 관리</h1>
    <div :class="main.card_layout">
      <AuthCard />
      <TeamCard />
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
  padding-bottom: 14px;
}

.card_layout {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
