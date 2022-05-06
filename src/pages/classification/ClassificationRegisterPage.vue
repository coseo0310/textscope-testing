<script setup lang="ts">
import RegisterMenu from "@/components/classification/RegisterMenu.vue";
import RegisterForm from "@/components/classification/RegisterForm.vue";
</script>

<template>
  <div class="classification-register-page">
    <div class="title">문서 분류 모델 등록</div>
    <RegisterMenu />
    <RegisterForm />
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
}
</style>
