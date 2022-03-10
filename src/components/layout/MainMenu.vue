<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import Icons from "@/components/shared/icons";
import Badge from "@/components/shared/badge";
import Avatar from "@/components/shared/avatar";
import { useStore } from "@/store";
import { MenuList } from "./type";

type Props = {
  menuList: MenuList;
  extend?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  extend: false,
});
const routes = useRoute();
const store = useStore();
</script>

<template>
  <div class="navigation" :class="{ active: extend }">
    <div class="logo">
      <img src="../../assets/logo/textscope-logo.png" />
    </div>
    <ul>
      <li
        v-for="m in props.menuList"
        class="list"
        :class="{ active: m.path === routes.path }"
      >
        <router-link :to="m.path">
          <b></b>
          <b></b>
          <span class="icon">
            <Icons :icons="m.icons" />
          </span>
          <span class="title">{{ m.title }}</span>
        </router-link>
      </li>
    </ul>

    <div class="profile">
      <div class="avatar">
        <Badge alarm="0" :border="true" :disable="!extend">
          <Avatar
            uri="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80"
          />
        </Badge>
      </div>
      <div class="info">
        <span class="name">
          {{ store.user?.name || "Anonymous" }}
        </span>
        <span class="job">
          {{ store.user?.division }}, {{ store.user?.job_position }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigation {
  position: fixed;
  width: 80px;
  height: 100%;
  background-color: $d3;
  overflow: hidden;
  transition: width 0.5s;
  padding-left: 10px;
  display: grid;
  grid-template-rows: 170px 1fr 100px;

  &.active {
    width: 220px;
    .logo {
      &::before {
        display: none;
      }
    }

    ul {
      .list {
        a {
          b {
            width: 210px;
            transition: width 0.5s;
          }
        }
      }
    }
  }
  .logo {
    position: relative;
    display: flex;
    padding: 50px 0 0 14px;
    cursor: pointer;

    img {
      height: 40px;
    }

    &::before {
      content: "";
      position: absolute;
      left: 60px;
      display: flex;
      width: 160px;
      height: 40px;
      background-color: $d3;
    }
  }

  ul {
    position: relative;
    widows: 100%;

    .list {
      position: relative;
      width: 100%;
      margin-bottom: 10px;

      b:nth-child(1) {
        position: absolute;
        top: -40px;
        width: 100%;
        height: 40px;
        background-color: $d1;
        display: none;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-bottom-right-radius: 30px;
          background-color: $d3;
        }
      }

      b:nth-child(2) {
        position: absolute;
        bottom: -40px;
        width: 100%;
        height: 40px;
        background-color: $d1;
        display: none;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-top-right-radius: 30px;
          background-color: $d3;
        }
      }

      a {
        position: relative;
        display: flex;
        width: 100%;

        .icon {
          position: relative;
          min-width: 70px;
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .title {
          position: absolute;
          top: 27px;
          left: 70px;
          width: 140px;
          height: inherit;
          overflow: hidden;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          white-space: normal;
        }

        &:hover {
          color: $point-blue;
        }
      }

      &.active {
        background-color: $d1;
        border-top-left-radius: 40px;
        border-bottom-left-radius: 40px;

        a {
          color: $point-blue;
        }

        b {
          display: flex;
          width: 70px;
          z-index: -1;
          transition: width 0.5s;
        }
      }
    }
  }

  .profile {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .avatar {
      width: 55px;
      margin-left: 10px;
    }
    .info {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      margin-left: 15px;
      font-size: 18px;
      font-weight: 600;
      line-height: 24px;
      color: $d5;
    }
  }
}
</style>
