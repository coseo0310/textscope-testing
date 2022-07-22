<script setup lang="ts"></script>

<template>
  <article :class="container.layout">
    <div :class="container.text">개인 검수 현황</div>
    <div :class="container.text">부서 업무 현황</div>
    <div :class="container.text">부서별 사용 현황 및 순위</div>
    <div :class="container.text">문서 분류 현황</div>
    <div :class="container.text">문서 분류 모델 정확도</div>
    <div :class="container.text">문서별 인식 정확도</div>
    <div :class="container.text">문서별 KV 오류용</div>
  </article>
</template>

<style lang="scss" module="container">
.layout {
  width: 252px;
  height: 336px;
  background-color: #ffffff;
  box-shadow: 0px 1px 1px rgba(9, 30, 66, 0.25),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  border-radius: 3px;
  margin-left: 12px;
  margin-bottom: 8px;
  padding: 28px 38px;
}

.text {
  display: flex;
  flex-direction: column;
  height: 40px;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  color: $m-500;
}
</style>
