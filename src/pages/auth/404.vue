<script setup lang="ts">
import WaveForm from "@/components/layout/WaveForm.vue";
import AlertForm from "@/components/auth/AlertForm.vue";
import Button from "@/components/shared/Button.vue";
import { useRouter } from "vue-router";
import * as Router from "@/router/index";

const router = useRouter();

const toLogin = () => {
  router.push(Router.constants.login.routeRecordRaw.path);
};
</script>

<template>
  <WaveForm>
    <AlertForm>
      <template v-slot:title>
        <p>404</p>
      </template>
      <template v-slot:subject>
        <p>페이지를 찾을 수 없습니다.</p>
      </template>
      <template v-slot:btn>
        <Button class="primary" @click="toLogin">초기화면으로 돌아가기</Button>
      </template>
    </AlertForm>
  </WaveForm>
</template>

<style lang="scss" scoped></style>
