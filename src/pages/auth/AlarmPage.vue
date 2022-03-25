<script setup lang="ts">
import AlarmForm from "@/components/auth/AlarmForm.vue";
</script>

<template>
  <div class="alarm-page">
    <div class="alarm-page__title">알림</div>
    <AlarmForm />
  </div>
</template>

<style lang="scss" scoped>
.alarm-page {
  width: 100%;
  height: 100vh;
  color: $d5;
  padding: 100px 180px 0 180px;
  background-color: $d2;

  .alarm-page__title {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 50px;
  }
}
</style>
