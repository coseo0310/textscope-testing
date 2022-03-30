<script setup lang="ts">
import { ref, onMounted } from "vue";
import Input from "@/components/shared/Input.vue";
import Radio from "@/components/shared/Radio.vue";
import Button from "@/components/shared/Button.vue";
import Dropdown from "@/components/shared/Dropdown.vue";
import ErrorForm from "@/components/shared/ErrorForm.vue";
import { useAuthStore } from "@/store";
import { useForm } from "@/hooks";

const authStore = useAuthStore();
const { handleSubmit, register, getValues, errors, formState, setValidate } =
  useForm();

const isAdmin = ref<boolean>(
  authStore.user?.authority === "super" ? true : false
);
const isMember = ref<boolean>(false);

const onAuth = (v: boolean, type: "super" | "member") => {
  if (type === "super") {
    isAdmin.value = true;
    isMember.value = false;
  } else {
    if (authStore.user?.authority !== "super") {
      return;
    }
    isAdmin.value = false;
    isMember.value = v;
  }
};

const onSubmit = () => {
  const { name, division, position, phone, cellphone } = getValues();

  console.log(name, division, position, phone, cellphone);
  alert("준비중...");
  // TODO: 프로필 변경
};

onMounted(() => {
  setValidate();
});
</script>

<template>
  <div class="profile-form">
    <div class="profile-form__auth form">
      <div class="text">권한</div>
      <div class="radio-wrap">
        <Radio
          :disabled="authStore.user?.authority !== 'super'"
          label="관리자"
          :default="isAdmin"
          @change="(v) => onAuth(v, 'super')"
        />
        <Radio
          :disabled="authStore.user?.authority !== 'super'"
          label="실무자"
          :default="isMember"
          @change="(v) => onAuth(v, 'member')"
        />
      </div>
    </div>
    <div class="profile-form__error">
      <p></p>
      <p>
        {{
          authStore.user?.authority == "super"
            ? "* 권한 변경은 관리자가 할 수 있습니다. 권한 변경은 관리자에게 요청하셔야합니다."
            : ""
        }}
      </p>
    </div>
    <div class="profile-form__name form">
      <div class="text">이름*</div>
      <div class="input" :class="{ validate: errors.name?.type }">
        <Input
          type="text"
          placeholder="이름을 입력해주세요"
          name="name"
          class="color-d4 focus-color-d5 focus-border-color-blue"
          :class="{
            ['border-color-d4']: !errors.name?.type,
            ['border-color-red']: errors.name?.type,
          }"
          :ref="register({ required: true })"
          :defaultValue="authStore.user?.name"
        />
        <ErrorForm>{{
          errors.name?.type ? "이름을 입력해주세요" : ""
        }}</ErrorForm>
      </div>
    </div>
    <div class="profile-form__division form">
      <div class="text">부서</div>
      <div class="input" :class="{ validate: errors.division?.type }">
        <!-- <Input
          type="text"
          placeholder="부서를 입력해주세요"
          name="division"
          :ref="register({ required: false })"
          :defaultValue="authStore.user?.division"
        /> -->
        <div class="text">{{ authStore.user?.division }}</div>
        <ErrorForm></ErrorForm>
      </div>
    </div>
    <div class="profile-form__job-position form">
      <div class="text">직급 / 직책*</div>
      <div class="input">
        <!-- <Input
          type="text"
          placeholder="직급 / 직책을 입력해주세요"
          name="position"
          :ref="register({ required: true })"
          :defaultValue="authStore.user?.job_position"
        /> -->
        <Dropdown
          default="2"
          :list="[
            { id: '1', text: '부장', value: '1' },
            { id: '2', text: '과장', value: '2' },
            { id: '3', text: '대리', value: '3' },
            { id: '4', text: '사원', value: '4' },
          ]"
        />
        <ErrorForm>{{
          errors.position?.type ? "직급 / 직책을 입력해주세요" : ""
        }}</ErrorForm>
      </div>
    </div>
    <div class="profile-form__phone form">
      <div class="text">내선번호</div>
      <div class="input">
        <Input
          type="text"
          placeholder="전화번호는 '-' 없이 숫자만 입력해주세요"
          name="phone"
          class="color-d4 focus-color-d5 focus-border-color-blue"
          :class="{
            ['border-color-d4']: !errors.phone?.type,
            ['border-color-red']: errors.phone?.type,
          }"
          :ref="register({})"
          :defaultValue="authStore.user?.phone_number"
        />
        <ErrorForm></ErrorForm>
      </div>
    </div>
    <div class="profile-form__cellphone form">
      <div class="text">휴대폰번호</div>
      <div class="input">
        <Input
          type="text"
          placeholder="전화번호는 '-' 없이 숫자만 입력해주세요"
          name="cellphone"
          class="color-d4 focus-color-d5 focus-border-color-blue"
          :class="{
            ['border-color-d4']: !errors.cellphone?.type,
            ['border-color-red']: errors.cellphone?.type,
          }"
          :ref="register({ required: false })"
          :defaultValue="authStore.user?.extension_number"
        />
        <ErrorForm></ErrorForm>
      </div>
    </div>
    <div class="btn-wrap">
      <Button
        class="primary extra-bold"
        :disabled="!formState.isValid"
        @click="handleSubmit(onSubmit)"
        >변경사항 저장</Button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-form {
  width: 670px;
  height: 544px;
  margin-top: 50px;

  .form {
    display: flex;
    align-items: center;
    height: 69px;

    .text {
      width: 170px;
      font-size: 18px;
      font-weight: 600;
    }

    .input {
      width: 500px;
      position: relative;

      .text {
        font-weight: 400;
      }

      p {
        position: absolute;
        bottom: -25px;
        width: 500px;
        height: 17px;
        color: $point-red;
        font-size: 14px;
      }

      input::placeholder {
        opacity: 0.5;
      }
    }
  }

  .profile-form__auth {
    .radio-wrap {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 500px;

      :last-child {
        margin-right: 100px;
      }
    }
  }
  .profile-form__error {
    display: flex;
    padding-bottom: 20px;

    :first-child {
      width: 170px;
      height: 0;
    }
    p {
      font-size: 14px;
      color: $point-red;
      font-weight: 400;
    }
  }

  .btn-wrap {
    margin-top: 20px;
    padding: 0 0 0 170px;
    width: 670px;
    height: 46px;
  }
}
</style>
