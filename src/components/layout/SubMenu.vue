<script setup lang="ts">
import { useRoute } from "vue-router";
import Icons from "@/components/shared/Icons.vue";
import { IconType } from "@/types";

export type MenuItem = {
  path: string;
  icons: IconType;
  title: string;
};

export type MenuList = MenuItem[];

type Props = {
  menuList: MenuList;
};

const props = defineProps<Props>();

const routes = useRoute();
</script>

<template>
  <div class="sub-navigation">
    <div class="title">설정</div>
    <ul class="list">
      <li
        v-for="m in props.menuList"
        class="list"
        :class="{ active: m.path === routes.path }"
      >
        <router-link :to="m.path">
          <span class="icon">
            <Icons :icons="m.icons" />
          </span>
          <span class="title">{{ m.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.sub-navigation {
  position: sticky;
  width: 200px;
  height: 100%;
  background-color: $d2;
  padding: 0 30px;

  .title {
    color: $d5;
    font-size: 24px;
    font-weight: 600;
    padding: 40px 0 50px 0;
  }

  ul {
    .list {
      a {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        cursor: pointer;

        .icon {
          display: flex;
          align-items: center;
          color: $d4;
          width: 32px;
          height: 32px;
        }

        .title {
          display: flex;
          align-items: center;
          color: $d4;
          font-size: 18px;
          font-weight: 600;
          padding: 20px 10px;
        }
      }

      &.active,
      &:hover {
        .icon {
          color: $point-blue;
        }
        .title {
          color: $point-blue;
        }
      }
    }
  }
}
</style>
