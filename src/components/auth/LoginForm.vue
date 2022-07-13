<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { path } from "@/router";
// import { useForm } from "@/hooks";

const authStore = useAuthStore();
const { isLogin } = storeToRefs(authStore);
const router = useRouter();
// const { register, handleSubmit, getValues, errors, formState, setValidate } =
//   useForm();

const el = ref<HTMLButtonElement | null>(null);

isLogin.value = false;

const onLogin = () => {
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
  <article :class="login.layout">
    <form :class="login.login_form">
      <section :class="login.input_box" aria-label="이메일 입력 박스">
        <label>아이디</label>
        <input type="text" name="email" placeholder="이메일 주소 입력" />
      </section>
      <section :class="login.input_box" aria-label="비밀번호 입력 박스">
        <label>비밀번호</label>
        <input type="password" name="email" placeholder="비밀번호 입력" />
      </section>
      <section :class="login.btn_box" aria-label="로그인 버튼">
        <button ref="el" type="button">로그인</button>
      </section>
      <section :class="login.error_message" aria-label="에러 메시지">
        Error 403
      </section>
    </form>
  </article>
</template>

<style lang="scss" module="login">
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

.error_message {
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
