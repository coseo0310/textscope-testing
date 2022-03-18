<script setup lang="ts">
import { ref } from "vue";
import Input from "@/components/shared/Input.vue";
import Button from "@/components/shared/Button.vue";
import Icons, { IconType } from "@/components/shared/Icons.vue";
import { useAuthStore, useCommonStore } from "@/store";

const regEx = /^[a-zA-Z0-9]*$/;

const authStore = useAuthStore();
const commonStore = useCommonStore();

const nowIcon = ref<IconType>("hide");
const newIcon = ref<IconType>("hide");
const confirmIcon = ref<IconType>("hide");

const nowPassword = ref<string>("");
const newPassword = ref<string>("");
const confirmPassword = ref<string>("");

const nowErrorMsg = ref<string>("");
const newErrorMsg = ref<string>("");
const confirmErrorMsg = ref<string>("");
const isValide = ref<boolean>(true);

const onShow = (type: "now" | "new" | "confirm") => {
  switch (type) {
    case "now":
      nowIcon.value = nowIcon.value === "hide" ? "show" : "hide";
      break;
    case "new":
      newIcon.value = newIcon.value === "hide" ? "show" : "hide";
      break;
    case "confirm":
      confirmIcon.value = confirmIcon.value === "hide" ? "show" : "hide";
      break;
    default:
      break;
  }
};

const onValidate = () => {
  if (nowPassword.value.length === 0) {
    nowErrorMsg.value = `현재 비밀번호를 입력해주세요`;
  } else {
    nowErrorMsg.value = ``;
  }

  if (newPassword.value.length === 0) {
    newErrorMsg.value = `새 비밀번호를 입력해주세요`;
  } else if (
    newPassword.value.length < 8 ||
    !regEx.test(newPassword.value as string)
  ) {
    newErrorMsg.value = `비밀번호는 숫자와 영어 8자리 이상으로 입력해주세요`;
  } else if (newPassword.value === nowPassword.value) {
    newErrorMsg.value = `현재 사용중이신 비밀번호는 사용할 수 없습니다.`;
  } else {
    newErrorMsg.value = ``;
  }

  if (confirmPassword.value.length === 0) {
    confirmErrorMsg.value = `새 비밀번호 확인를 입력해주세요`;
  } else if (newPassword.value !== confirmPassword.value) {
    confirmErrorMsg.value = `새 비밀번호와 일치하지 않습니다.`;
  } else {
    confirmErrorMsg.value = ``;
  }
  isValide.value =
    !!nowErrorMsg.value || !!newErrorMsg.value || !!confirmErrorMsg.value;
  return isValide.value;
};

const onNowPasswordKeyup = (e: KeyboardEvent) => {
  const el = e.target as HTMLInputElement;
  nowPassword.value = el.value;
  setTimeout(() => {
    onValidate();
  });
};

const onNewPasswordKeyup = (e: KeyboardEvent) => {
  const el = e.target as HTMLInputElement;
  newPassword.value = el.value;
  setTimeout(() => {
    onValidate();
  });
};
const onConfirmPasswordKeyup = (e: KeyboardEvent) => {
  const el = e.target as HTMLInputElement;
  confirmPassword.value = el.value;
  setTimeout(() => {
    onValidate();
  });
};
const onSubmit = async () => {
  if (onValidate()) {
    commonStore.setToast("변경사항을 저장할 수 없습니다.", "warn");
    return;
  }
  const ok = await authStore.onChangePassword(
    nowPassword.value,
    confirmPassword.value
  );

  if (ok) {
    commonStore.setToast("변경사항이 저장되었습니다", "info");
    authStore.isPasswordModal = false;
  } else {
    nowErrorMsg.value = `현재 비밀번호와 일치하지 않습니다.`;
    commonStore.setToast("변경사항을 저장할 수 없습니다.", "warn");
    authStore.isPasswordModal = false;
  }
};

const onCancel = (e: MouseEvent) => {
  const el = e.target as HTMLElement;
  const closest = el.closest(".password-modal__form");
  if (closest) {
    return;
  }
  authStore.isPasswordModal = false;
};
</script>

<template>
  <div class="password-modal" @click="onCancel">
    <div class="password-modal__form">
      <div class="title">비밀번호 변경</div>
      <div class="form">
        <div class="input-wrap">
          <div class="text">현재 비밀번호</div>
          <div class="input">
            <Input
              id="now"
              :type="nowIcon === 'hide' ? 'password' : 'text'"
              placeholder="현재 비밀번호를 입력해주세요"
              :value="nowPassword"
              :class="{ error: !!nowErrorMsg }"
              @keyup="onNowPasswordKeyup"
            />
            <Icons
              :icons="nowIcon"
              :class="{ on: nowIcon === 'show' }"
              @click="onShow('now')"
            />
          </div>
        </div>

        <div class="input-wrap">
          <div class="text"></div>
          <div class="input">
            <p>{{ nowErrorMsg }}</p>
          </div>
        </div>
        <div class="input-wrap">
          <div class="text">새 비밀번호</div>
          <div class="input">
            <Input
              id="new"
              :type="newIcon === 'hide' ? 'password' : 'text'"
              placeholder="새로운 비밀번호를 입력해주세요"
              :value="newPassword"
              :class="{ error: !!newErrorMsg }"
              @keyup="onNewPasswordKeyup"
            />
            <Icons
              :icons="newIcon"
              :class="{ on: newIcon === 'show' }"
              @click="onShow('new')"
            />
          </div>
        </div>
        <div class="input-wrap">
          <div class="text"></div>
          <div class="input">
            <p>{{ newErrorMsg }}</p>
          </div>
        </div>
        <div class="input-wrap">
          <div class="text">새 비밀번호 확인</div>
          <div class="input">
            <Input
              id="confirm"
              :type="confirmIcon === 'hide' ? 'password' : 'text'"
              placeholder="새로운 비밀번호를 다시 입력해주세요"
              :value="confirmPassword"
              :class="{ error: !!confirmErrorMsg }"
              @keyup="onConfirmPasswordKeyup"
            />
            <Icons
              :icons="confirmIcon"
              :class="{ on: confirmIcon === 'show' }"
              @click="onShow('confirm')"
            />
          </div>
        </div>
        <div class="input-wrap">
          <div class="text"></div>
          <div class="input">
            <p>{{ confirmErrorMsg }}</p>
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <Button class="outline semi-bold" @click="onCancel">취소</Button>
        <Button
          :disabled="isValide"
          class="primary semi-bold disabled"
          @click="onSubmit"
          >변경</Button
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.password-modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);

  .password-modal__form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 482px;
    background-color: $d2;
    box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);
    padding: 70px 73px;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 29px;
      font-size: 24px;
      font-weight: 600;
      color: $point-blue;
      margin-bottom: 30px;
    }

    .form {
      width: 100%;
      height: 219px;
      .input-wrap {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .text {
          font-weight: 600;
        }

        .input {
          position: relative;
          width: 316px;

          input {
            height: 48px;

            &.error {
              border: 1px solid $point-red;
            }

            &::placeholder {
              color: $d5;
              opacity: 0.5;
            }
          }

          svg {
            position: absolute;
            top: 9px;
            right: 10px;
            stroke: $d3;
            cursor: pointer;
            opacity: 0.8;

            &.on {
              stroke: $point-blue;
              color: transparent;
            }
          }
        }

        p {
          font-size: 14px;
          font-weight: 400;
          color: $point-red;
          height: 17px;
          margin: 5px 0;
        }
      }
    }

    .btn-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
      button {
        width: 180px;
        height: 46px;

        &:last-child {
          margin-left: 30px;
        }
      }
    }
  }
}
</style>
