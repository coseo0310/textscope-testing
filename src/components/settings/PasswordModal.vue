<script setup lang="ts">
import { ref } from "vue";
import Input from "@/components/shared/Input.vue";
import Button from "@/components/shared/Button.vue";
import ErrorForm from "@/components/shared/ErrorForm.vue";
import Icons, { IconType } from "@/components/shared/Icons.vue";
import { useAuthStore, useCommonStore } from "@/store";
import { useForm } from "@/hooks";

const authStore = useAuthStore();
const commonStore = useCommonStore();
const { handleSubmit, register, getValues, errors, formState } = useForm();

const nowIcon = ref<IconType>("hide");
const newIcon = ref<IconType>("hide");
const confirmIcon = ref<IconType>("hide");

const nowErrorMsg = ref<string>("");

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

const onSubmit = async () => {
  const { nowPassword, confirmPassword } = getValues();
  const ok = await authStore.onChangePassword(nowPassword, confirmPassword);

  if (ok) {
    commonStore.setToast("변경사항이 저장되었습니다", "info");
    authStore.isPasswordModal = false;
  } else {
    nowErrorMsg.value = `현재 비밀번호와 일치하지 않습니다.`;
    commonStore.setToast("변경사항을 저장할 수 없습니다.", "warn");
  }
};

const onCancel = (e: MouseEvent) => {
  const el = e.target as HTMLElement;
  const closest1 = el.closest(".password-modal__form");
  const closest2 = el.closest(".cancel");

  if (closest1 && !closest2) {
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
              name="nowPassword"
              :ref="
                register({
                  required: true,
                  notMatch: 'newPassword',
                })
              "
              :class="{
                ['border-color-red']: errors.nowPassword?.type || !!nowErrorMsg,
              }"
              maxlength="20"
              @keyup="
                () => {
                  nowErrorMsg = '';
                }
              "
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
            <ErrorForm>{{
              errors.nowPassword?.type === "required"
                ? `현재 비밀번호를 입력해주세요`
                : errors.nowPassword?.type === "notMatch"
                ? "현재 사용중이신 비밀번호는 사용할 수 없습니다"
                : !!nowErrorMsg
                ? nowErrorMsg
                : ""
            }}</ErrorForm>
          </div>
        </div>
        <div class="input-wrap">
          <div class="text">새 비밀번호</div>
          <div class="input">
            <Input
              id="new"
              :type="newIcon === 'hide' ? 'password' : 'text'"
              placeholder="새로운 비밀번호를 입력해주세요"
              name="newPassword"
              :ref="
                register({
                  required: true,
                  pattern: /^[a-zA-Z0-9]*$/,
                  minLength: 8,
                })
              "
              :class="{ ['border-color-red']: errors.newPassword?.type }"
              maxlength="20"
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
            <ErrorForm>{{
              errors.newPassword?.type === "required"
                ? "새 비밀번호를 입력해주세요"
                : errors.newPassword?.type === "minLength" ||
                  errors.newPassword?.type === "pattern"
                ? "비밀번호는 숫자와 영어 8자리 이상으로 입력해주세요"
                : ""
            }}</ErrorForm>
          </div>
        </div>
        <div class="input-wrap">
          <div class="text">새 비밀번호 확인</div>
          <div class="input">
            <Input
              id="confirm"
              :type="confirmIcon === 'hide' ? 'password' : 'text'"
              placeholder="새로운 비밀번호를 다시 입력해주세요"
              name="confirmPassword"
              :ref="
                register({
                  required: true,
                  match: 'newPassword',
                })
              "
              maxlength="20"
              :class="{ ['border-color-red']: errors.confirmPassword?.type }"
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
            <ErrorForm>{{
              errors.confirmPassword?.type === "required"
                ? "새 비밀번호 확인를 입력해주세요"
                : errors.confirmPassword?.type === "match"
                ? "새 비밀번호와 일치하지 않습니다"
                : ""
            }}</ErrorForm>
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <Button class="cancel outline semi-bold" @click="onCancel">취소</Button>
        <Button
          :disabled="!formState.isValid || !!nowErrorMsg"
          class="confirm primary semi-bold disabled"
          @click="handleSubmit(onSubmit)"
        >
          변경
        </Button>
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
    box-shadow: $shadow-alpha-1;
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
