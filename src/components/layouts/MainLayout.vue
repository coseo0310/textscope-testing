<script setup lang="ts">
import MainMenu from "@/components/layouts/MainMenu.vue";
import { useAuthStore } from "@/store";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { isLogin, isSubMenu } = storeToRefs(authStore);
</script>

<template>
  <div :class="app.main">
    <section v-if="isLogin" aria-label="메인 메뉴">
      <MainMenu />
    </section>
    <section v-if="isSubMenu" aria-label="서브 메뉴">
      <!-- <MainMenu  /> -->
    </section>
    <section aria-label="라우팅 뷰">
      <router-view></router-view>
    </section>
  </div>
</template>

<style lang="scss" module="app">
.main {
  display: flex;
  align-items: center;

  transition: width 1s linear;
}
</style>
