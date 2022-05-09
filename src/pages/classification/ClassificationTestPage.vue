<script setup lang="ts">
import TestingMenu from "@/components/classification/TestingMenu.vue";
import TestingForm from "@/components/classification/TestingForm.vue";
import UploadProgress from "@/components/classification/UploadProgress.vue";
</script>

<template>
  <div class="classification-testing-page">
    <div class="title">문서 분류 모델 테스트</div>
    <div class="menu">
      <TestingMenu />
    </div>
    <div class="form">
      <TestingForm />
    </div>
    <div class="progress">
      <UploadProgress />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.classification-testing-page {
  width: 100%;
  height: 100vh;
  padding: 80px 70px;

  .title {
    color: $d5;
    font-size: 24px;
    font-weight: 600;
  }

  .progress {
    padding-top: 40px;
  }
}
</style>
