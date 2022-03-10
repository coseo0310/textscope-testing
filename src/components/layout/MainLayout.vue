<script setup lang="ts">
import { ref } from "vue";
import MainMenu from "@/components/layout/MainMenu.vue";
import { constants } from "@/router";
import { MenuList } from "./type";

const menuList = ref<MenuList>([
  {
    path: constants.dashboard.path,
    icons: "dashboard",
    title: "대시보드",
  },
  {
    path: constants.work.path,
    icons: "work",
    title: "업무 리스트",
  },
  {
    path: constants.settings.path,
    icons: "setting",
    title: "설정",
  },
]);
const extend = ref<boolean>(false);
const onExtend = () => {
  extend.value = !extend.value;
};
</script>

<template>
  <div class="main-container" :class="{ extend: extend }">
    <aside class="aside" @mouseenter="onExtend" @mouseleave="onExtend">
      <MainMenu :extend="extend" :menuList="menuList" />
    </aside>
    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  display: flex;
  height: 100vh;

  .aside {
    display: flex;
    width: 80px;
    transition: width 0.5s;
  }

  &.extend {
    .aside {
      width: 220px;
    }
  }
}
</style>
