<script setup lang="ts">
import ProfileHeader from "@/components/settings/ProfileHeader.vue";
import ProfileForm from "@/components/settings/ProfileForm.vue";
import PasswordModal from "@/components/settings/PasswordModal.vue";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();
</script>

<template>
  <div class="profile-page">
    <div class="profile-page__title">프로필 변경</div>
    <div class="profile-page__main">
      <ProfileHeader />
      <ProfileForm />
    </div>
    <PasswordModal v-if="authStore.isPasswordModal" />
  </div>
</template>

<style lang="scss" scoped>
.profile-page {
  width: 100%;
  height: 100vh;
  color: $d5;
  padding: 100px 0 0 80px;

  .profile-page__title {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 50px;
  }

  .profile-page__main {
    display: flex;
    flex-direction: column;
  }
}
</style>
