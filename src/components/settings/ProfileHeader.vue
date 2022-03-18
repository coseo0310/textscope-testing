<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();

const avatar = ref<string>(`url('${authStore.user?.profile_img}')` || "");

const onAvatarChange = () => {
  alert("준비중...");
};

const onPasswordChangeForm = () => {
  authStore.isPasswordModal = true;
};
</script>

<template>
  <div class="profile-header">
    <div class="profile-header__avatar"></div>
    <div class="profile-header__info">
      <div class="email">
        {{ authStore.user?.id }}
      </div>
      <div class="btn-wrap">
        <span @click="onAvatarChange">프로필 사진 변경</span>
        <span @click="onPasswordChangeForm">비밀번호 변경</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 50px 20px;
  height: 65px;
  .profile-header__avatar {
    width: 65px;
    height: 65px;
    background: v-bind("avatar");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    border-radius: 50%;
    margin-right: 30px;
  }

  .profile-header__info {
    height: 65px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 5px 0;

    .email {
      font-weight: 600;
      font-size: 24px;
    }
    .btn-wrap {
      width: 429px;
      display: flex;
      justify-content: flex-start;
      align-items: space-between;
      color: $point-blue;
      font-size: 18px;
      font-weight: 400;

      span {
        display: flex;
        width: 100%;
        cursor: pointer;
      }
    }
  }
}
</style>
