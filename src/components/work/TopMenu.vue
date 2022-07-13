<script setup lang="ts">
import { useWorkStore, useAuthStore } from "@/store";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const workStore = useWorkStore();
const { imperfectTotal, completeTotal, workTotal } = storeToRefs(workStore);

authStore.isLogin = true;
</script>

<template>
  <article :class="article.layout">
    <h1 :class="main.text">업무 목록</h1>
    <div :class="sub.layout">
      <div :class="sub.box">
        <p :class="sub.text">미완료 업무</p>
        <div :class="sub.badge">{{ imperfectTotal }}</div>
      </div>
      <div :class="sub.divider"></div>
      <div :class="sub.box">
        <p :class="sub.text">완료 업무</p>
        <div :class="sub.badge">{{ completeTotal }}</div>
      </div>
      <div :class="sub.divider"></div>
      <div :class="sub.box">
        <p :class="sub.text">전체 업무</p>
        <div :class="sub.badge">{{ workTotal }}</div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" module="article">
.layout {
  max-width: 500px;
  max-height: 32px;
  width: 100%;
  height: 32px;
  padding: 48px 0;
  display: flex;
  align-items: center;
}
</style>

<style lang="scss" module="main">
.text {
  width: 107px;
  font-weight: 700;
  font-size: 29px;
  line-height: 32px;
  color: $m-900;
}
</style>

<style lang="scss" module="sub">
.layout {
  margin-left: 20px;
  width: calc(100% - 127px);
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: $m-800;
}
.divider {
  width: 1px;
  height: 12px;
  background-color: $n-40;
}

.badge {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: $n-40;
  font-size: 12px;
  font-weight: 500;
  color: $n-800;
  margin-left: 9px;
  padding: 2px 5px;
  gap: 10px;
}
</style>
