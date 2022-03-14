<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import Input from "@/components/shared/Input.vue";
import Button from "@/components/shared/Button.vue";
import Icons from "@/components/shared/Icons.vue";
import { IconType } from "@/components/shared/type";
import { useStore } from "@/store";
import * as R from "@/router/index";

const icon = ref<IconType>("hide");
const email = ref<string>("");
const password = ref<string>("");
const loader = ref<boolean>(false);
const store = useStore();
const router = useRouter();
const emailValidate = ref<boolean>(false);
const passwordValidate = ref<boolean>(false);

const onShow = () => {
  icon.value = icon.value === "hide" ? "show" : "hide";
};

watch(email, () => {
  const regex =
    /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
  emailValidate.value = !regex.test(email.value) ? true : false;
});

watch(password, () => {
  passwordValidate.value = password.value === "" ? true : false;
});

const onValidate = () => {
  return (
    emailValidate.value ||
    passwordValidate.value ||
    email.value === "" ||
    password.value === ""
  );
};

const onLogin = async () => {
  if (onValidate()) {
    return;
  }
  loader.value = true;
  const login = await store.onLogin(email.value, password.value);
  if (!login) {
    passwordValidate.value = true;
    loader.value = false;
    return;
  }

  router.push(R.constants.dashboard.routeRecordRaw.path);
};

const onSingleSignOne = async () => {
  loader.value = true;
  const sso = await store.onSingleSignOne();
  if (!sso) {
    return;
  }

  router.push(R.constants.dashboard.routeRecordRaw.path);
};

const onEmailKeyup = (e: KeyboardEvent) => {
  const el = e.target as HTMLInputElement;
  email.value = el.value;
  if (e.code === "Enter") {
    onLogin();
  }
};

const onPasswordKeyup = (e: KeyboardEvent) => {
  const el = e.target as HTMLInputElement;
  password.value = el.value;
  passwordValidate.value = false;
  if (e.code === "Enter") {
    onLogin();
  }
};

const test = false;
</script>

<template>
  <div class="login-form">
    <div class="logo">
      <img src="@/assets/logo/textscope-logo.png" alt="logo" />
      <p>AI 기반 문서 인식 솔루션</p>
    </div>
    <div class="input email" :class="{ validate: test }"></div>
    <div class="input email" :class="{ validate: emailValidate }">
      <label>ID</label>
      <Input type="text" :value="email" @keyup="onEmailKeyup" />
      <p>
        <span v-if="emailValidate">아이디는 이메일 형식으로 입력해주세요</span>
        <span v-else></span>
      </p>
    </div>
    <div class="input pasword" :class="{ validate: passwordValidate }">
      <label>Passwrod</label>
      <Input
        :type="icon === 'hide' ? 'password' : 'text'"
        v-model="password"
        @keyup="onPasswordKeyup"
      />
      <Icons :icons="icon" :class="{ on: icon === 'show' }" @click="onShow" />
      <p>
        <span v-if="passwordValidate && password !== ''"
          >입력된 비밀번호가 올바르지 않습니다.</span
        >
        <span v-else-if="passwordValidate && password === ''">
          패스워드를 입력해주세요
        </span>
        <span v-else></span>
      </p>
    </div>
    <div class="btn">
      <Button class="primary" :loader="loader" @click="onLogin">로그인</Button>
    </div>
    <div class="sso" @click="onSingleSignOne">SSO (Single Sign One) 로그인</div>
  </div>
</template>

<style lang="scss" scoped>
.login-form {
  width: 310px;
  height: 338px;
  z-index: 3;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    p {
      color: #000;
      font-size: 18px;
      font-weight: 600;
      margin-top: 10px;
    }
  }

  .input {
    color: $d5;
    font-size: 14px;
    font-weight: 400;

    label {
      display: block;
      margin: 10px 0 5px 0;
    }

    p {
      color: $point-red;
      margin: 5px 0;
      height: 14px;
    }
    &.validate {
      input {
        border-color: $point-red;
      }
    }
  }

  .pasword {
    position: relative;

    svg {
      position: absolute;
      top: 27px;
      right: 10px;
      fill: $d4;
      cursor: pointer;

      &.on {
        fill: none;
        stroke: $d5;
      }
    }
  }
  .btn {
    width: 100%;
    height: 46px;
    margin-top: 20px;

    button {
      font-size: 18px;
      font-weight: 800;
    }
  }

  .sso {
    color: $point-blue;
    font-size: 18px;
    font-weight: 700;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
