<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Input from "@/components/shared/Input.vue";
import Button from "@/components/shared/Button.vue";
import ErrorForm from "@/components/shared/ErrorForm.vue";
import Icons, { IconType } from "@/components/shared/Icons.vue";
import { useAuthStore } from "@/store";
import { useForm } from "@/hooks";
import { constants } from "@/router";

const icon = ref<IconType>("hide");
const loader = ref<boolean>(false);
const authStore = useAuthStore();
const router = useRouter();
const passwordValidate = ref<boolean>(false);

const { handleSubmit, register, getValues, errors, formState } = useForm();

const onShow = () => {
  icon.value = icon.value === "hide" ? "show" : "hide";
};

const onLogin = async () => {
  const { email, password } = getValues();
  loader.value = true;
  const login = await authStore.onLogin(email, password);
  if (!login) {
    passwordValidate.value = true;
    loader.value = false;
    return;
  }

  router.push(constants.dashboard.routeRecordRaw.path);
};

const onSingleSignOne = async () => {
  loader.value = true;
  const sso = await authStore.onSingleSignOne();
  if (!sso) {
    return;
  }

  router.push(constants.dashboard.routeRecordRaw.path);
};

const onEnter = () => {
  handleSubmit(onLogin);
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
    <div class="input email" :class="{ validate: errors.email?.type }">
      <label>ID</label>
      <Input
        type="text"
        name="email"
        :ref="
          register({
            required: true,
            pattern:
              /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/,
          })
        "
        maxlength="20"
        @keyup.enter="onEnter"
      />
      <ErrorForm>
        <span v-if="errors.email?.type"
          >아이디는 이메일 형식으로 입력해주세요</span
        >
        <span v-else></span>
      </ErrorForm>
    </div>
    <div class="input pasword" :class="{ validate: errors.password?.type }">
      <label>Passwrod</label>
      <Input
        :type="icon === 'hide' ? 'password' : 'text'"
        name="password"
        :ref="
          register({
            required: true,
          })
        "
        maxlength="20"
        @keyup.enter="onEnter"
      />
      <Icons :icons="icon" :class="{ on: icon === 'show' }" @click="onShow" />
      <ErrorForm>
        <!-- <span v-if="errors.password?.type"
          >입력된 비밀번호가 올바르지 않습니다.</span
        > -->
        <span v-if="errors.password?.type"> 패스워드를 입력해주세요 </span>
        <span v-else></span>
      </ErrorForm>
    </div>
    <div class="btn">
      <Button
        class="primary"
        :disabled="!formState.isValid"
        :loader="loader"
        @click="handleSubmit(onLogin)"
        >로그인</Button
      >
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

    &.validate {
      input {
        border-color: $point-red;
      }
    }
    input {
      color: $d4;

      &:focus {
        color: $d5;
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
