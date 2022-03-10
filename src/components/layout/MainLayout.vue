<script setup lang="ts">
import { ref } from "vue";
import MainMenu from "@/components/layout/MainMenu.vue";
import { constants } from "@/router";
import { MenuList } from "./type";
import { useStore } from "@/store";

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
const store = useStore();
const extend = ref<boolean>(false);

const onExtend = (e: MouseEvent) => {
  extend.value = !extend.value;
};
</script>

<template>
  <div
    class="main-container"
    :class="{ separation: !!store.accessToken, extend }"
  >
    <aside v-if="!!store.accessToken" class="aside" :class="{ extend }">
      <MainMenu :extend="extend" :onExtend="onExtend" :menuList="menuList" />
    </aside>
    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  display: flex;
  height: 100%;

  .aside {
    display: flex;
    transition: width 0.5s;
  }

  .main {
    width: 100vw;
    height: 100vh;
    transition: width 0.5s;
  }
  &.separation {
    .aside {
      width: 80px;
    }

    .main {
      width: calc(100vw - 80px);
    }
  }

  &.separation.extend {
    .aside {
      display: fixed;
      width: 220px;
    }

    .main {
      width: calc(100vw - 220px);
    }
  }
}
</style>
