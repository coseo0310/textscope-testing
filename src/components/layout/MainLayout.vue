<script setup lang="ts">
import { ref } from "vue";
import Menu from "@/components/layout/MainMenu.vue";
import SubMenu from "@/components/layout/SubMenu.vue";

const isSub = ref<boolean>(true);
const auth = ref<boolean>(true);
</script>

<template>
  <div :class="{ 'main-container': true, sub: isSub }">
    <header v-if="auth" class="header">
      <Menu />
    </header>
    <aside v-if="isSub" class="aside">
      <SubMenu />
    </aside>
    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  display: grid;
  grid-template-columns: 200px repeat(5, 1fr);

  .header {
    grid-column: 1/7;
  }

  .main {
    grid-column: 1/7;
  }

  &.sub {
    .aside {
      grid-column: 1/2;
    }

    .main {
      grid-column: 2/7;
    }
  }
}
</style>
