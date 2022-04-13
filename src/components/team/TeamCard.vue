<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { constants } from "@/router";
import { useUserStore, useCommonStore } from "@/store";
import { Routes } from "@/types";

interface Props {
  id: string;
  name: string;
}

const props = defineProps<Props>();

const userStore = useUserStore();
const commonStore = useCommonStore();
const router = useRouter();

const contextMenu = ref<HTMLDivElement | null>(null);

const onClose = () => {
  const menus = document.querySelectorAll(".context-menu");
  menus.forEach((m) => {
    const el = m as HTMLDivElement;
    if (!el) {
      return;
    }
    el.style.display = "none";
  });
};

const onRightClick = (e: MouseEvent) => {
  const el = e.target as HTMLDivElement;
  if (!el || !contextMenu.value) {
    return;
  }
  onClose();
  contextMenu.value.style.display = "flex";
  contextMenu.value.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
};

const onLeftClick = (e: MouseEvent) => {
  const c = constants as Routes.AdminConstants;
  const child = c.team.routeRecordRaw.children;
  if (!child) {
    return;
  }
  const f = userStore.teams.find((f) => f.id === props.id);
  if (!f) {
    return;
  }

  userStore.team = f;
  const name = child[1].name;
  router.push({ name });
};

const onClick = (e: MouseEvent) => {
  if (e.button === 0) {
    onLeftClick(e);
  } else if (e.button === 2) {
    onRightClick(e);
  }
};

const onModify = (id: string) => {
  if (!id) {
    return;
  }
  const f = userStore.teams.find((t) => t.id === id);
  if (!f) {
    return;
  }
  userStore.team = f;
  userStore.isTeamModal = true;
  onClose();
};

const onDelete = (id: string) => {
  if (!id) {
    return;
  }
  onClose();
  const f = userStore.users.find((u) => u.division === props.name);
  if (f) {
    commonStore.setToast(
      "<p>구성원이 존재합니다.</p> <p>모든 구성원을 삭제 후 부서 삭제를 진행해주세요</p>",
      "warn"
    );
    return;
  }

  commonStore.setConfirm(
    ["검수 1팀을 삭제하시겠습니까?"],
    "warn",
    () => {
      const list = userStore.teams.filter((t) => t.id !== id);
      if (!list) {
        return;
      }
      userStore.teams = list;
    },
    () => {},
    "삭제"
  );
};

const onClosest = (e: MouseEvent) => {
  const el = e.target as HTMLElement;
  if (!el) {
    return;
  }

  const closest = el.closest(".context-menu");

  if (closest) {
    return;
  }

  onClose();
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
    class="team-card"
    @mousedown="onClick"
    @contextmenu="(e) => e.preventDefault()"
  >
    <div class="name">
      {{ props.name }} ({{
        userStore.users.filter((f) => f.division === name).length
      }})
    </div>

    <div class="context-menu" ref="contextMenu">
      <div role="button" class="modify btn" @click="onModify(props.id)">
        변경
      </div>
      <div role="button" class="delete btn" @click="onDelete(props.id)">
        삭제
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.team-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 62px;
  background-color: $d1;
  border-radius: 20px;
  cursor: pointer;

  .name {
    font-size: 18px;
    font-weight: 400;
    color: $d5;
  }

  .context-menu {
    position: absolute;
    top: 0;
    left: 0;
    background-color: $d1;
    box-shadow: $shadow-alpha-1;

    display: none;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 80px;
    height: 112px;
    border-radius: 16px;
    padding: 20px 0;

    .btn {
      font-size: 18px;
      font-weight: 600;

      &.modify {
        color: $point-blue;
      }

      &.delete {
        color: $point-red;
      }
    }
  }
}
</style>
