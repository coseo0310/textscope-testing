<script setup lang="ts"></script>

<template>
  <div class="performance-card">
    <div class="box title">API 퍼포먼스</div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box date">2022.01.26 기준</div>
    <div class="box"></div>
    <div class="box subtitle">오늘</div>
    <div class="box content">0.14<span class="unit">초</span></div>
    <div class="box subtitle">전체</div>
    <div class="box content">0.13<span class="unit">초</span></div>
    <div class="box"></div>
    <div class="box title">CPU 사용량</div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box date"></div>
    <div class="box"></div>
    <div class="box subtitle">사용률</div>
    <div class="box content">93.8<span class="unit">%</span></div>
    <div class="box subtitle">사용량</div>
    <div class="box content">2,152<span class="unit">개</span></div>
    <div class="box"></div>
  </div>
</template>

<style lang="scss" scoped>
.performance-card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: $d1;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);
  padding: 40px 30px 30px 0;
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr 1fr 50px;
  gap: 1px;
  color: $d5;
  font-size: 18px;

  .box {
    display: flex;
    align-items: flex-start;

    &.title {
      grid-column: 1/ 3;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-weight: 700;
    }

    &.date {
      grid-column: 5/ 7;
      font-weight: 400;
      color: $point-blue;
      display: flex;
      align-items: center;
    }

    &.subtitle {
      display: flex;
      justify-content: flex-end;
      font-weight: 400;
      padding-top: 1px;
    }

    &.content {
      padding-left: 15px;
      font-weight: 600;
      font-size: 20px;
    }

    .unit {
      font-weight: 400;
      font-size: 18px;
      display: flex;
      padding: 2px 0 0 3px;
    }
  }
}
</style>
