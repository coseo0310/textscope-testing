<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { path } from "@/router";
import LoginForm from "@/components/login/LoginForm.vue";
import TextscopeLogo from "@/assets/logo/textscope_logo.png";
import ClientLogo from "@/assets/logo/client_logo.png";
import LominLogo from "@/assets/logo/lomin_logo.png";
import PoweredBy from "@/assets/logo/powered_by.png";
// import { useForm } from "@/hooks";

const authStore = useAuthStore();
const { isLogin, errorMsg } = storeToRefs(authStore);
const router = useRouter();
// const { register, handleSubmit, getValues, errors, formState, setValidate } =
//   useForm();

const el = ref<HTMLButtonElement | null>(null);

isLogin.value = false;

const onLogin = async () => {
  const email = document.querySelector("[name=email]") as HTMLInputElement;
  const password = document.querySelector(
    "[name=password]"
  ) as HTMLInputElement;
  const t = await authStore.onLogin(email.value, password.value);
  if (!t) {
    const e = document.querySelector(".msg")!;
    e.innerHTML = `${errorMsg.value}`;
    return;
  }
  isLogin.value = true;
  router.push({ name: path.work.name });
};

onMounted(() => {
  if (!el.value) {
    return;
  }
  el.value.addEventListener("click", onLogin);
});
</script>

<template>
  <main :class="layout.main">
    <section :class="left.section" aria-label="로고 영역">
      <article :class="left.wrap">
        <img :src="TextscopeLogo" alt="textscope logo" />
        <p>AI 문서 이해 플랫폼</p>
      </article>
    </section>
    <section :class="right.section" aria-label="로그인 영역">
      <article :class="right.client_logo">
        <img :src="ClientLogo" alt="client logo" />
        <p :class="right.title">로그인</p>
      </article>
      <LoginForm />
      <article :class="right.lomin_logo">
        <img :src="PoweredBy" alt="powered by" />
        <img :src="LominLogo" alt="lomin logo" />
      </article>
    </section>
  </main>
</template>

<style lang="scss" module="layout">
.main {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1.45fr 0.55fr;
}
</style>

<style lang="scss" module="left">
.section {
  height: 100vh;
  background-color: $m-900;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.wrap {
  position: relative;
  top: -20px;
  width: 306px;
  height: 96px;
  margin-bottom: 20px;

  p {
    padding-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 4px;
    font-weight: 500;
    font-size: 24px;
    color: $m-300;
  }
}
</style>

<style lang="scss" module="right">
.section {
  height: 100vh;
  background-color: #ffffff;
  padding: 2vh 4vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.client_logo {
  width: 100%;
}

.title {
  width: 100%;
  padding-top: 30px;
  font-weight: 600;
  font-size: 48px;
  color: $m-900;
}

.lomin_logo {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;

  img {
    padding: 0 5px;
  }
}
</style>
