<script setup lang="ts">
import { ref } from "vue";
import { HTTP } from "@/types";
import ContextMenu, {
  Contexts,
  Translate,
} from "@/components/shared/ContextMenu.vue";
import { useUserStore, useCommonStore } from "@/store";
import Frame from "@/assets/img/frame.png";

interface Props {
  user: HTTP.User;
  focus: boolean;
}

const props = defineProps<Props>();
const userStore = useUserStore();
const commonStore = useCommonStore();

const isContext = ref<boolean>(false);
const translate = ref<Translate>({ x: 0, y: 0 });

const url = props.user.profile_img
  ? `url('${props.user.profile_img}')`
  : `url('${Frame}')`;

const onRightClick = (e: MouseEvent) => {
  isContext.value = true;
  translate.value = { x: e.clientX, y: e.clientY };
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
    // Left Click
  } else if (e.button === 2) {
    onRightClick(e);
  }
};

const onMoveTeam = () => {
  userStore.user = props.user;
  userStore.isTeamSelectModal = true;
};

const onDelete = () => {
  commonStore.setConfirm(
    ["선택한 팀원을 삭제하시겠습니까?", "삭제 후 복구는 불가능합니다."],
    "warn",
    () => {
      const list = userStore.users.filter((t) => t.id !== props.user.id);
      if (!list) {
        return;
      }
      userStore.users = list;
    },
    () => {},
    "삭제"
  );
};

const contexts: Contexts = [
  { text: "부서 이동", callback: onMoveTeam, color: "blue" },
  { text: "삭제", callback: onDelete, color: "red" },
];
</script>

<template>
  <div
    class="profile-card"
    :class="{ focus: props.focus }"
    @mousedown="onClick"
    @contextmenu="(e) => e.preventDefault()"
  >
    <div class="img"></div>
    <div class="info">
      {{ props.user.name }} {{ props.user.job_position }}
      {{ props.focus ? "(나)" : "" }}
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
.profile-card {
  width: 220px;
  height: 272px;
  background-color: $d2;
  border-radius: 20px;
  box-shadow: $shadow-alpha-1;
  padding: 10px;
  cursor: pointer;

  .img {
    width: 200px;
    height: 200px;
    background-image: v-bind("url");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: 10px;
  }

  .info {
    font-size: 18px;
    font-weight: 400;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    color: $d5;
  }
  &.focus {
    background-color: $point-peacook;
    .info {
      color: $d1;
    }
  }
}
</style>
