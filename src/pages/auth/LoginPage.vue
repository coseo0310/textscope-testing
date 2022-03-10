<script setup lang="ts">
import LoginForm from "@/components/auth/LoginForm.vue";
import WaveForm from "@/components/layout/WaveForm.vue";
</script>

<template>
  <WaveForm>
    <LoginForm />
  </WaveForm>
  <div class="logo">
    <img src="@/assets/logo/lomin-logo-white.png" alt="logo-white" />
  </div>
  <div class="copy-right">&copy; 2022. Lomin, Inc. All rights reserved.</div>
</template>

<style lang="scss" scoped>
.logo {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 100px;
}

.copy-right {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 50px;
  color: $d1;
  font-size: 18px;
  font-weight: 400;
}
</style>
