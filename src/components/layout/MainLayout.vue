<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import SubMenu from "@/components/layout/SubMenu.vue";
import { getSubMenu } from "@/router";

const routes = useRoute();
const menuList = ref(getSubMenu(routes.path));
</script>

<template>
  <div class="sub-container" :class="{ separation: menuList.length > 0 }">
    <SubMenu v-if="menuList.length > 0" :menu-list="menuList" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.sub-container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: auto;
  background-color: $d2;
}
</style>
