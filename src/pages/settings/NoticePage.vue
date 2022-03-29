<script setup lang="ts">
import NoticeForm from "@/components/settings/NoticeForm.vue";
</script>

<template>
  <div class="notice-page">
    <div class="notice-page__title">공지사항</div>
    <NoticeForm />
  </div>
</template>

<style lang="scss" scoped>
.notice-page {
  width: 100%;
  height: 100vh;
  color: $d5;
  padding: 100px 80px 0 80px;
  background-color: $d2;

  .notice-page__title {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 50px;
  }
}
</style>
