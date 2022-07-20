<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { path } from "@/router";
import { useCommonStore, useWorkStore } from "@/store";
import { storeToRefs } from "pinia";
import Logo from "@/assets//logo/logo_white.png";

const router = useRouter();
const routes = useRoute();
const commonStore = useCommonStore();
const workStore = useWorkStore();
const { isMenuExtend } = storeToRefs(commonStore);
const { imperfectTotal } = storeToRefs(workStore);

const isPop = ref<boolean>(false);

const onPage = (name: string) => {
  router.push({ name });
};

const onPop = () => {
  isPop.value = true;
};

const onProfile = () => {
  isPop.value = false;
};
const onLogout = () => {
  isPop.value = false;
  router.push({ name: path.login.name });
};

const closest = (e: MouseEvent) => {
  const el = e.target as HTMLElement;
  if (!el) {
    return;
  }
  const pop = el.closest(".pop");

  if (pop) {
    return;
  }
  isPop.value = false;
};

onMounted(() => {
  window.addEventListener("click", closest);
});
onUnmounted(() => {
  window.removeEventListener("click", closest);
});
</script>

<template>
  <article
    :class="{
      [menu.extend]: isMenuExtend,
      [menu.reduction]: !isMenuExtend,
    }"
  >
    <div :class="logo.none" />
    <nav :class="nav.main">
      <div
        :class="{
          [nav.items]: true,
          [nav.select_background]: routes.path.includes('auth'),
        }"
        @click="onPage('auth')"
      >
        <p
          v-if="isMenuExtend"
          :class="{
            [nav.text]: true,
            [nav.select_color]: routes.path.includes('auth'),
          }"
        >
          권한 관리
        </p>
      </div>
      <div
        :class="{
          [nav.items]: true,
          [nav.select_background]: routes.path.includes('log'),
        }"
        @click="onPage('log')"
      >
        <p
          v-if="isMenuExtend"
          :class="{
            [nav.text]: true,
            [nav.select_color]: routes.path.includes('log'),
          }"
        >
          인사정보 배치이력
        </p>
      </div>
      <div
        :class="{
          [nav.items]: true,
          [nav.select_background]: routes.path.includes('rpa'),
        }"
        @click="onPage('rpa')"
      >
        <p
          v-if="isMenuExtend"
          :class="{
            [nav.text]: true,
            [nav.select_color]: routes.path.includes('rpa'),
          }"
        >
          RPA 관리
        </p>
      </div>
    </nav>
  </article>
</template>

<style lang="scss" module="menu">
.extend {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: 100vh;
  background-color: $m-900;
  padding: 40px 16px 20px 16px;
}

.reduction {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 60px;
  height: 100vh;
  background-color: $m-900;
  padding: 40px 8px;
}
</style>

<style lang="scss" module="logo">
.none {
  width: 60px;
  height: 46px;
  margin-bottom: 88px;
}
</style>

<style lang="scss" module="nav">
.main {
  width: 100%;
  height: 100%;
}
.items {
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  border-radius: 3px;
  color: $m-300;
  cursor: pointer;
  margin-bottom: 8px;
}
.select_color {
  color: #ffffff;
}

.select_background {
  background-color: rgba(255, 255, 255, 0.1);
  padding-top: 4px;
}

.icon {
  padding: 0 10px;
}

.text {
  font-size: 14px;
  font-weight: 500;
  line-height: 40px;
  padding: 0 10px;
}

.badge {
  width: 25px;
  height: 16px;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $m-900;
}
</style>
