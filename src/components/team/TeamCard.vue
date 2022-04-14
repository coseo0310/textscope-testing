<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { constants } from "@/router";
import { useUserStore, useCommonStore } from "@/store";
import { Routes } from "@/types";
import ContextMenu, {
  Contexts,
  Translate,
} from "@/components/shared/ContextMenu.vue";

interface Props {
  id: string;
  name: string;
}

const props = defineProps<Props>();

const userStore = useUserStore();
const commonStore = useCommonStore();
const router = useRouter();

const isContext = ref<boolean>(false);
const translate = ref<Translate>({ x: 0, y: 0 });

const onRightClick = (e: MouseEvent) => {
  isContext.value = true;
  translate.value = { x: e.clientX, y: e.clientY };
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
  const el = e.target as HTMLDivElement;
  if (!el) {
    return;
  }

  const closest = el.closest(".context-menu");

  if (closest) {
    return;
  }

  if (e.button === 0) {
    onLeftClick(e);
  } else if (e.button === 2) {
    onRightClick(e);
  }
};

const onModify = () => {
  const f = userStore.teams.find((t) => t.id === props.id);
  if (!f) {
    return;
  }
  userStore.team = f;
  userStore.isTeamModal = true;
};

const onDelete = () => {
  const f = userStore.users.find((u) => u.division === props.name);
  if (f) {
    commonStore.setToast(
      "<p>구성원이 존재합니다.</p> <p>모든 구성원을 삭제 후 부서 삭제를 진행해주세요</p>",
      "warn"
    );
    return;
  }

  commonStore.setConfirm(
    [`${props.name}을 삭제하시겠습니까?`],
    "warn",
    () => {
      const list = userStore.teams.filter((t) => t.id !== props.id);
      if (!list) {
        return;
      }
      userStore.teams = list;
    },
    () => {},
    "삭제"
  );
};

const contexts: Contexts = [
  { text: "변경", callback: onModify, color: "blue" },
  { text: "삭제", callback: onDelete, color: "red" },
];
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
    <ContextMenu
      ref="contextMenu"
      :isShow="isContext"
      :translate="translate"
      :contexts="contexts"
      @close="isContext = false"
    />
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
}
</style>
