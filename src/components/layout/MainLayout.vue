<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import SubMenu from "@/components/layout/SubMenu.vue";
import { getSubMenu } from "@/router";
import { MenuList } from "./type";
import { useStore } from "@/store";

const store = useStore();
const routes = useRoute();
const extend = ref<boolean>(false);
const menuList = ref<MenuList>(getSubMenu(routes.path));

console.log(routes.path);

const onExtend = (e: MouseEvent) => {
  extend.value = !extend.value;
};

console.log(menuList.value);
</script>

<template>
  <div class="sub-container" :class="{ separation: menuList.length > 0 }">
    <SubMenu v-if="menuList.length > 0" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
/* .sub-container {
} */
</style>
