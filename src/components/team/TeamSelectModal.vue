<script setup lang="ts">
import { ref } from "vue";
import Input from "@/components/shared/Input.vue";
import Button from "@/components/shared/Button.vue";
import { useUserStore, useCommonStore } from "@/store";

const userStore = useUserStore();
const commonStore = useCommonStore();

const REGEX = /^[ㄱ-ㅎ\s|가-힣\s|a-z\s|A-Z\s|0-9\s|]+$/;
const HEIGHT = userStore.team ? "248px" : "200px";

const name = ref<string>(userStore.team?.name || "");

const onKeyup = (e: KeyboardEvent) => {
  const el = e.target as HTMLInputElement;
  if (!el) {
    return;
  }

  name.value = el.value;
};

const onSubmit = () => {
  if (!userStore.team) {
    return;
  }

  if (userStore.team.name === name.value) {
    commonStore.setToast("기존 부서명과 동일합니다.", "warn");
    return;
  }

  if (!REGEX.test(name.value)) {
    commonStore.setToast("한글, 영어, 숫자만 입력하실 수 있습니다.", "warn");
    return;
  }

  const id = userStore.team.id;

  const f = userStore.teams.find((f) => f.name === name.value && f.id !== id);

  if (f) {
    commonStore.setToast("동일한 부서명이 존재합니다.", "warn");
    return;
  }

  userStore.team.name = name.value;
  userStore.isTeamModal = false;
};

const onCancel = (e: MouseEvent) => {
  const el = e.target as HTMLElement;
  if (!el) {
    return;
  }

  if (el.className !== "team-modal" && !el.classList.contains("outline")) {
    return;
  }

  userStore.isTeamModal = false;
};
</script>

<template>
  <div class="team-modal" @click="onCancel">
    <div class="modal">
      <div v-if="userStore.team" class="title">
        변경하실 부서명을 입력해주세요.
      </div>
      <div class="input-wrap">
        <label>부서명</label>
        <Input
          type="text"
          class="placeholder-d4 border-color-d4 focus-border-color-d5"
          :value="userStore.team?.name"
          placeholder="부서명을 입력해주세요"
          @keyup="onKeyup"
        />
      </div>
      <div class="btn-group">
        <div class="btn-wrap">
          <Button class="outline" @click="onCancel">취소</Button>
        </div>
        <div class="btn-wrap">
          <Button class="primary extra-bold" :disabled="!name" @click="onSubmit"
            >변경</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.team-modal {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .modal {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: v-bind("HEIGHT");
    background-color: $d1;
    border-radius: 10px;
    box-shadow: $shadow-alpha-1;
    color: $d5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 30px 40px;

    .title {
      font-size: 18px;
      font-weight: 600;
      padding-bottom: 30px;
    }

    .input-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;

      label {
        width: 80px;
        font-size: 18px;
        font-weight: 600;
      }
    }

    .btn-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding-top: 30px;

      .btn-wrap {
        width: 150px;
        height: 46px;
      }
    }
  }
}
</style>
