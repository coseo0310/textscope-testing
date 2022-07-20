<script setup lang="ts">
import ProfileCard from "@/components/settings/ProfileCard.vue";
</script>

<template>
  <main :class="main.layout">
    <h1 :class="main.title">프로필</h1>
    <ProfileCard />
  </main>
</template>

<style lang="scss" module="main">
.layout {
  width: calc(100vw - 200px);
  height: 100vh;
  padding: 0 32px 48px 32px;

  overflow: scroll;
}

.title {
  color: $m-900;
  font-size: 29px;
  font-weight: 700;
  padding-top: 42px;
  padding-bottom: 24px;
}
</style>
