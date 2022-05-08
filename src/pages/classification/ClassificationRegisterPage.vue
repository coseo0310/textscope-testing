<script setup lang="ts">
import RegisterMenu from "@/components/classification/RegisterMenu.vue";
import RegisterForm from "@/components/classification/RegisterForm.vue";
import UploadProgress from "@/components/classification/UploadProgress.vue";
</script>

<template>
  <div class="classification-register-page">
    <div class="title">문서 분류 모델 등록</div>
    <div class="menu">
      <RegisterMenu />
    </div>
    <div class="form">
      <RegisterForm />
    </div>
    <div class="progress">
      <UploadProgress />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.classification-register-page {
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
