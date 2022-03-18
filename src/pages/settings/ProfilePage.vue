<script setup lang="ts">
import ProfileHeader from "@/components/settings/ProfileHeader.vue";
import ProfileForm from "@/components/settings/ProfileForm.vue";
import PasswordModal from "@/components/settings/PasswordModal.vue";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();
</script>

<template>
  <div class="profile-container">
    <div class="profile-container__title">프로필 변경</div>
    <div class="profile-container__main">
      <ProfileHeader />
      <ProfileForm />
    </div>
    <PasswordModal v-if="authStore.isPasswordModal" />
  </div>
</template>

<style lang="scss" scoped>
.profile-container {
  width: 100%;
  height: 100vh;
  color: $d5;
  padding: 100px 0 0 80px;

  .profile-container__title {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 50px;
  }

  .profile-container__main {
    display: flex;
    flex-direction: column;
  }
}
</style>
