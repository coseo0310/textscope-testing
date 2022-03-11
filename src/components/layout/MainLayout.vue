<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import SubMenu from "@/components/layout/SubMenu.vue";
import { getSubMenu } from "@/router";
import { MenuList } from "./type";

const routes = useRoute();
const menuList = ref<MenuList>(getSubMenu(routes.path));

console.log(">>>>", menuList.value[0]);
</script>

<template>
  <div class="sub-container" :class="{ separation: menuList.length > 0 }">
    <SubMenu v-if="menuList.length > 0" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.sub-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: lightcoral;
}
</style>
