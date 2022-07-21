<script setup lang="ts">
import MainMenu from "@/components/layouts/MainMenu.vue";
import SubMenu from "@/components/layouts/SubMenu.vue";
import Loader from "@/components/shared/Loader.vue";
import { useAuthStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const routes = useRoute();
const authStore = useAuthStore();
const { isLogin } = storeToRefs(authStore);
</script>

<template>
  <div :class="app.main">
    <Loader />
    <section v-if="isLogin" aria-label="메인 메뉴">
      <MainMenu />
    </section>
    <section v-if="routes.path.includes('settings')" aria-label="서브 메뉴">
      <SubMenu />
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
