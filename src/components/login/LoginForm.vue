<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { path } from "@/router";
import { useForm } from "@/hooks";
import { isFor } from "@babel/types";

const REGEX =
  /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;

const authStore = useAuthStore();
const { isLogin, errorMsg } = storeToRefs(authStore);
const router = useRouter();
const { register, getValues, handleSubmit, setValidate, errors } = useForm();

const el = ref<HTMLButtonElement | null>(null);

isLogin.value = false;

const onLogin = async () => {
  const { email, password } = getValues();
  const t = await authStore.onLogin(email, password);
  if (!t) {
    return;
  }
  isLogin.value = true;
  router.push({ name: path.work.name });
};

const onEnter = () => {
  onValid();
  handleSubmit(onLogin);
};

const onValid = () => {
  setValidate();
  if (errors.value.email?.type === "required") {
    errorMsg.value = `이메일을 입력해주세요`;
  } else if (errors.value.email?.type === "pattern") {
    errorMsg.value = `이메일 형식으로 입력해주세요`;
  } else if (errors.value.password?.type === "required") {
    errorMsg.value = `패스워드를 입력해주세요`;
  } else if (errors.value.password?.type === "minLength") {
    errorMsg.value = `패스워드는 4글자 이상입니다.`;
  } else {
    errorMsg.value = ``;
  }
};
</script>

<template>
  <article :class="form.layout">
    <form :class="form.login_form">
      <section :class="form.input_box" aria-label="이메일 입력 박스">
        <label>아이디</label>
        <input
          type="text"
          name="email"
          :ref="
            register({
              required: true,
              pattern: REGEX,
            })
          "
          placeholder="이메일 주소 입력"
          maxlength="30"
          defaultValue="admin@lomin.ai"
          @keyup.enter="onEnter"
        />
      </section>
      <section :class="form.input_box" aria-label="비밀번호 입력 박스">
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          :ref="
            register({
              required: true,
              minLength: 4,
            })
          "
          placeholder="비밀번호 입력"
          maxlength="20"
          defaultValue="123456"
          @keyup.enter="onEnter"
        />
      </section>
      <section :class="form.btn_box" aria-label="로그인 버튼">
        <button ref="el" type="button" @click="onEnter">로그인</button>
      </section>
      <section :class="form.msg" aria-label="에러 메시지">
        {{ errorMsg }}
      </section>
    </form>
  </article>
</template>

<style lang="scss" module="form">
.layout {
  width: 100%;
  height: 100%;
}
.login_form {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.msg {
  color: $r-300;
  font-size: 14px;
  font-weight: 600;
}

.btn_box {
  width: 100%;
  padding-top: 20px;
  padding-bottom: 60px;

  button {
    width: 100%;
    height: 56px;
    outline: none;
    border: none;
    border-radius: 4px;
    background-color: $m-900;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
  }
}

.input_box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding-bottom: 40px;

  label {
    font-weight: 500;
    font-size: 12px;
    color: $n-200;
    padding-bottom: 5px;
  }

  input {
    width: 100%;
    height: 40px;
    border: 1px solid $n-40;
    border-radius: 3px;
    padding: 0 10px;
    outline: none;

    &::placeholder {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }

    &:focus {
      border-color: $m-900;
    }
  }
}
</style>
