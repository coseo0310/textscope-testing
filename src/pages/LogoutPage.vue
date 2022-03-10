<script setup lang="ts">
import { useRouter } from "vue-router";
import WaveForm from "@/components/layout/WaveForm.vue";
import AlertForm from "@/components/auth/AlertForm.vue";
import Button from "@/components/shared/button";
import * as Router from "@/router/index";

const router = useRouter();
const toLogin = () => {
  router.push(Router.constants.login.path);
};
</script>

<template>
  <WaveForm>
    <AlertForm>
      <template v-slot:title>
        <p>정상적으로 로그아웃되었습니다.</p>
      </template>
      <template v-slot:subject>
        <p>
          작업하시던 내용은 텍스트스코프가 자동으로 저장했으니 걱정하지마세요.
        </p>
        <p>오늘도 수고하셨습니다.</p>
      </template>
      <template v-slot:btn>
        <Button class="primary" @click="toLogin">초기화면으로 돌아가기</Button>
      </template>
    </AlertForm>
  </WaveForm>
</template>

<style lang="scss" scoped></style>
