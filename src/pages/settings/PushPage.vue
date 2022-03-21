<script setup lang="ts">
import PushForm from "@/components/settings/PushForm.vue";
</script>

<template>
  <div class="push-page">
    <div class="push-page__title">푸시알림</div>
    <PushForm />
  </div>
</template>

<style lang="scss" scoped>
.push-page {
  width: 100%;
  height: 100vh;
  color: $d5;
  padding: 100px 0 0 80px;

  .push-page__title {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 50px;
  }
}
</style>
