<script setup lang="ts">
import { ref } from "vue";
import MainMenu from "@/components/layout/MainMenu.vue";
import Toast from "@/components/layout/Toast.vue";
import Confirm from "@/components/layout/Confirm.vue";
import { getMainMenu } from "@/router";
import { useAuthStore, useCommonStore } from "@/store";

const menuList = ref(getMainMenu());

const authStore = useAuthStore();
const commonStore = useCommonStore();
const extend = ref<boolean>(false);

const onExtend = (e: MouseEvent) => {
  extend.value = !extend.value;
};
</script>

<template>
  <div
    class="main-container"
    :class="{ separation: !!authStore.accessToken, extend }"
  >
    <aside v-if="!!authStore.accessToken" class="aside" :class="{ extend }">
      <MainMenu :extend="extend" :onExtend="onExtend" :menuList="menuList" />
    </aside>
    <main class="main">
      <router-view></router-view>
    </main>
    <Toast :messages="commonStore.toast" />
    <Confirm v-if="commonStore.isConfirm" :confirm="commonStore.confirm" />
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
