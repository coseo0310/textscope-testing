<script setup lang="ts">
import LearningMenu from "@/components/classification/LearningMenu.vue";
import LearningForm from "@/components/classification/LearningForm.vue";
</script>

<template>
  <div class="classification-learning">
    <div class="title">문서 분류 모델 학습</div>
    <div class="menu">
      <LearningMenu />
    </div>
    <div class="form">
      <LearningForm />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.classification-learning {
  width: 100%;
  height: 100vh;
  padding: 80px 70px;

  .title {
    color: $d5;
    font-size: 24px;
    font-weight: 600;
  }

  .menu {
    padding: 30px 0;
  }

  .form {
    width: 100%;
    height: 65vh;
  }
}
</style>
