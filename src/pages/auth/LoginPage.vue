<script setup lang="ts">
import LoginForm from "@/components/auth/LoginForm.vue";
import TextscopeLogo from "@/assets/logo/textscope_logo.png";
import ClientLogo from "@/assets/logo/client_logo.png";
import LominLogo from "@/assets/logo/lomin_logo.png";
import PoweredBy from "@/assets/logo/powered_by.png";
</script>

<template>
  <main :class="login.layout">
    <section :class="login.logo_section" aria-label="로고 영역">
      <article :class="login.logo_wrap">
        <img :src="TextscopeLogo" alt="textscope logo" />
        <p>AI 문서 이해 플랫폼</p>
      </article>
    </section>
    <section :class="login.login_section" aria-label="로그인 영역">
      <article :class="login.client_logo">
        <img :src="ClientLogo" alt="client logo" />
        <p :class="login.login_title">로그인</p>
      </article>
      <LoginForm />
      <article :class="login.lomin_logo">
        <img :src="PoweredBy" alt="powered by" />
        <img :src="LominLogo" alt="lomin logo" />
      </article>
    </section>
  </main>
</template>

<style lang="scss" module="login">
.layout {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1.45fr 0.55fr;
}

.logo_section {
  height: 100vh;
  background-color: $m-900;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.logo_wrap {
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

.login_section {
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

.login_title {
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
