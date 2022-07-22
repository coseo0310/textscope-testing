<script setup lang="ts">
import { ref } from "vue";
import Grid from "@/components/shared/Grid.vue";

const canvas = ref<HTMLCanvasElement | null>(null);
</script>

<template>
  <article :class="container.layout">
    <section :class="top.layout" aria-label="Top section">
      <h1 :class="top.title">부서별 사용 순위</h1>
      <div :class="top.box"></div>
    </section>
    <section :class="list.layout" aria-label="Chart section">
      <div :class="list.wrap">
        <Grid :grid-list="[]" :columns="[]" />
      </div>
    </section>
  </article>
</template>

<style lang="scss" module="container">
.layout {
  flex: 0 0 auto;
  width: 100%;
  height: 423px;
  padding: 28px;
  background-color: #ffffff;
  box-shadow: 0px 1px 1px rgba(9, 30, 66, 0.25),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  border-radius: 3px;
}
</style>

<style lang="scss" module="top">
.layout {
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title {
  font-size: 24px;
  font-weight: 500;
  color: $m-800;
}

.box {
  display: flex;
}

.count {
  width: 174px;
  height: 64px;
  border: 1px solid $n-40;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 14px;

  &:first-child {
    margin-right: 10px;
  }
}

.icon {
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $b-200;
  border-radius: 50%;
}

.icon_orange {
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $o-300;
  border-radius: 50%;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  p:first-child {
    font-size: 12px;
    font-weight: 400;
    color: $m-700;
    padding-bottom: 5px;
  }
  p:last-child {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 20px;
    font-weight: 500;
    color: #000000;

    span {
      font-size: 12px;
      font-weight: 400;
      color: $m-700;
      padding-left: 2px;
    }
  }
}
</style>

<style lang="scss" module="list">
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.wrap {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
