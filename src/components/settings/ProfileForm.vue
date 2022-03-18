<script setup lang="ts">
import { ref, computed } from "vue";
import Input from "@/components/shared/Input.vue";
import Radio from "@/components/shared/Radio.vue";
import Button from "@/components/shared/Button.vue";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();

const isAdmin = ref<boolean>(
  authStore.user?.authority === "super" ? true : false
);
const isMember = ref<boolean>(false);
const isNameErrorMsg = ref<boolean>(false);
const isDivisionErrorMsg = ref<boolean>(false);
const isPositionErrorMsg = ref<boolean>(false);
const isPhoneErrorMsg = ref<boolean>(false);
const isCellphoneErrorMsg = ref<boolean>(false);
const name = ref<string>(authStore.user?.name || "");
const division = ref<string>(authStore.user?.division || "");
const position = ref<string>(authStore.user?.job_position || "");
const phone = ref<string>(authStore.user?.phone_number || "");
const cellphone = ref<string>(authStore.user?.extension_number || "");

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

const isValide = computed(
  () =>
    isNameErrorMsg.value ||
    isDivisionErrorMsg.value ||
    isPositionErrorMsg.value ||
    // isPhoneErrorMsg.value ||
    isCellphoneErrorMsg.value
);

const onNameKeyup = (e: KeyboardEvent) => {
  const el = e.target as HTMLInputElement;
  name.value = el.value;
  isNameErrorMsg.value = name.value ? false : true;
};
const onDivisionKeyup = (e: KeyboardEvent) => {
  const el = e.target as HTMLInputElement;
  division.value = el.value;
  isDivisionErrorMsg.value = division.value ? false : true;
};
const onPositionKeyup = (e: KeyboardEvent) => {
  const el = e.target as HTMLInputElement;
  position.value = el.value;
  isPhoneErrorMsg.value = position.value ? false : true;
};
const onPhoneKeyup = (e: KeyboardEvent) => {
  const el = e.target as HTMLInputElement;
  phone.value = el.value;
  // isPhoneErrorMsg.value = phone.value ? false : true;
};
const onCellphoneKeyup = (e: KeyboardEvent) => {
  const el = e.target as HTMLInputElement;
  cellphone.value = el.value;
  isCellphoneErrorMsg.value = cellphone.value ? false : true;
};

const onSubmit = () => {
  alert("준비중...");

  // TODO: 프로필 변경
};
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
      <div class="input">
        <Input
          type="text"
          placeholder="이름을 입력해주세요"
          :value="name"
          @keyup="onNameKeyup"
        />
        <p>{{ isNameErrorMsg ? "이름을 입력해주세요" : "" }}</p>
      </div>
    </div>
    <div class="profile-form__division form">
      <div class="text">부서*</div>
      <div class="input">
        <Input
          type="text"
          placeholder="부서를 입력해주세요"
          :value="division"
          @keyup="onDivisionKeyup"
        />
        <p>{{ isDivisionErrorMsg ? "부서를 입력해주세요" : "" }}</p>
      </div>
    </div>
    <div class="profile-form__job-position form">
      <div class="text">직급 / 직책*</div>
      <div class="input">
        <Input
          type="text"
          placeholder="직급 / 직책을 입력해주세요"
          :value="position"
          @keyup="onPositionKeyup"
        />
        <p>{{ isPositionErrorMsg ? "직급 / 직책을 입력해주세요" : "" }}</p>
      </div>
    </div>
    <div class="profile-form__phone form">
      <div class="text">내선번호</div>
      <div class="input">
        <Input
          type="text"
          placeholder="전화번호는 '-' 없이 숫자만 입력해주세요"
          :value="phone"
          @keyup="onPhoneKeyup"
        />
        <p></p>
      </div>
    </div>
    <div class="profile-form__cellphone form">
      <div class="text">휴대폰번호*</div>
      <div class="input">
        <Input
          type="text"
          placeholder="전화번호는 '-' 없이 숫자만 입력해주세요"
          :value="cellphone"
          @keyup="onCellphoneKeyup"
        />
        <p>{{ isCellphoneErrorMsg ? "휴대폰번호를 입력해주세요" : "" }}</p>
      </div>
    </div>
    <div class="btn-wrap">
      <Button class="primary extra-bold" :disabled="isValide" @click="onSubmit"
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

      &.error {
        input {
          border: 1px solid $point-red;
        }
      }

      p {
        position: absolute;
        bottom: -20px;
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
