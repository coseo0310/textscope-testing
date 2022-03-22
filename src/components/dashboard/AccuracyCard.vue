<script setup lang="ts">
import Switch from "@/components/shared/Switch.vue";
</script>

<template>
  <div class="accuracy-card">
    <div class="header">
      <div class="title">인식률 정확도</div>
      <div class="switch-wrap">
        <Switch :default="false" :labels="{ on: '전체', off: '오늘' }" />
      </div>
    </div>
    <div class="content-wrap">
      <div class="date">2018.1.30 ~ 2022.01.26</div>
      <div class="accuracy">97.3%</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.accuracy-card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: $d1;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);
  color: $d5;
  font-size: 18px;
  padding: 50px 40px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 40px;
      font-weight: 700;
      display: flex;
      align-items: flex-start;
    }

    .switch-wrap {
      width: 162px;
      height: 40px;
      background-color: $d3;
      border-radius: 20px;
    }
  }

  .content-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 50px;
    .date {
      color: $point-blue;
      font-weight: 400;
      font-size: 18px;
    }

    .accuracy {
      padding-top: 20px;
      font-weight: 600;
      font-size: 64px;
    }
  }
}
</style>
