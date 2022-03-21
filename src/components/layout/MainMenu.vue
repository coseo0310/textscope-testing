<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Icons from "@/components/shared/Icons.vue";
import Badge from "@/components/shared/Badge.vue";
import Avatar from "@/components/shared/Avatar.vue";
import { useAuthStore } from "@/store";
import { constants } from "@/router";
import { MenuList } from "@/types";

type Props = {
  menuList: MenuList;
  extend?: boolean;
  onExtend?: (e: MouseEvent) => void;
};

const props = withDefaults(defineProps<Props>(), {
  extend: false,
  onExtend: (e: MouseEvent) => {},
});

const isTab = ref<boolean>(false);
const authStore = useAuthStore();
const routes = useRoute();
const router = useRouter();

const onTab = () => {
  isTab.value = !isTab.value;
};

const onClosest = (e: MouseEvent) => {
  const el = e.target as HTMLElement;
  if (!el) {
    return;
  }
  const closest = !!el.closest(".profile") || !!el.closest(".sub");

  if (!closest && isTab.value) {
    isTab.value = false;
  }
};

const onLogout = async () => {
  await authStore.onLogout();
  router.push(constants.logout.routeRecordRaw.path);
};

onMounted(() => {
  window.addEventListener("click", onClosest);
});

onUnmounted(() => {
  window.removeEventListener("click", onClosest);
});
</script>

<template>
  <div
    class="navigation"
    :class="{ active: extend }"
    @mouseenter="props.onExtend"
    @mouseleave="props.onExtend"
  >
    <div class="logo">
      <img src="../../assets/logo/textscope-logo.png" />
    </div>
    <ul>
      <li
        v-for="m in props.menuList"
        class="list"
        :class="{ active: routes.path.includes(m.path) }"
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
    <div class="profile" @click="onTab">
      <div class="avatar">
        <Badge alarm="0" :border="true" :disable="!extend">
          <Avatar :uri="authStore.user?.profile_img || ''" />
        </Badge>
      </div>
      <div class="info">
        <span class="name">
          {{ authStore.user?.name || "Anonymous" }}
        </span>
        <span class="job">
          {{ authStore.user?.division }}, {{ authStore.user?.job_position }}
        </span>
      </div>
    </div>
  </div>
  <div v-if="isTab" class="sub" :class="{ extend }" @click="onLogout">
    <span class="icon">
      <img src="@/assets/svg/logout.svg" alt="logout" />
    </span>
    <span class="title">로그아웃</span>
  </div>
</template>

<style lang="scss" scoped>
.navigation {
  position: sticky;
  width: 80px;
  height: 100%;
  background-color: $d3;
  overflow: hidden;
  transition: width 0.5s;
  padding-left: 10px;
  display: grid;
  grid-template-rows: 150px 1fr 100px;

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
        background-color: $d2;
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
        background-color: $d2;
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
          font-weight: 600;
          font-size: 18px;
        }

        &:hover {
          color: $point-blue;
        }
      }

      &.active {
        background-color: $d2;
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
    cursor: pointer;

    .avatar {
      width: 55px;
      margin-left: 5px;
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

.sub {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20px;
  left: 90px;
  width: 146px;
  height: 68px;
  background-color: $d2;
  color: $d5;
  border-radius: 16px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.3);
  transition: left 0.5s;
  z-index: 1;
  cursor: pointer;

  &.extend {
    left: 230px;
  }

  .icon {
    display: flex;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    display: flex;
    margin-left: 10px;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
