<script setup lang="ts">
import { ref } from "vue";
import Input from "@/components/shared/Input.vue";
import Dropdown, { DropdownItem } from "@/components/shared/Dropdown.vue";
import Button from "@/components/shared/Button.vue";
import Avatar from "@/components/shared/Avatar.vue";
import Icons, { IconType } from "@/components/shared/Icons.vue";
import ErrorForm from "@/components/shared/ErrorForm.vue";
import { useUserStore } from "@/store";
import { useForm } from "@/hooks";
import { HTTP } from "@/types";
import Frame from "@/assets/img/frame.png";

const userStore = useUserStore();
const { register, handleSubmit, getValues, formState, errors } = useForm();

const newIcon = ref<IconType>("hide");
const confirmIcon = ref<IconType>("hide");
const profileImg = ref<string>(Frame);
const position = ref<DropdownItem | null>(null);
const isPosition = ref<boolean>(false);
const fileEl = ref<HTMLInputElement | null>(null);
const imgEl = ref<HTMLImageElement | null>(null);

const onShow = (type: "new" | "confirm") => {
  switch (type) {
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

const onPosition = (item: DropdownItem) => {
  isPosition.value = true;
  position.value = item.value ? item : null;
};

const onSubmit = () => {
  const { email, newPassword, name, phone, cellphone } = getValues();

  if (!position.value) {
    return;
  }

  const user: HTTP.User = {
    id: email,
    name,
    division: userStore.team?.name || "TEST TEAM",
    job_position: position.value.text || "부장",
    authority: "user",
    extension_number: cellphone,
    phone_number: phone,
    profile_img: profileImg.value,
  };

  userStore.users.push(user);

  // TODO:: Submit User
};

const onCancel = (e: MouseEvent) => {
  const el = e.target as HTMLElement;
  if (!el) {
    return;
  }

  if (el.className !== "member-modal" && !el.classList.contains("primary")) {
    return;
  }

  userStore.isMemberModal = false;
};

const imgUpload = () => {
  if (!fileEl.value) {
    return;
  }
  fileEl.value.click();
};

const onUploadImg = async () => {
  if (!fileEl.value) {
    return;
  }
  if (!fileEl.value.files) {
    return;
  }

  for (let i = 0; i < fileEl.value.files.length; i++) {
    if (!imgEl.value) {
      break;
    }

    const buffer = await fileEl.value.files[i].arrayBuffer();
    const blob = new Blob([buffer], { type: "image" });
    const url = window.URL.createObjectURL(blob);
    profileImg.value = url;
  }
};
const imgClear = () => {
  profileImg.value = Frame;
};
</script>

<template>
  <div class="member-modal" @click="onCancel">
    <div class="modal">
      <div class="avatar">
        <input
          ref="fileEl"
          style="display: none"
          accept="image/*,.png"
          type="file"
          @change="onUploadImg"
        />
        <img ref="imgEl" />
        <Avatar class="border-none size-medium" :uri="profileImg" />
        <div role="button" class="img-change btn" @click="imgUpload">
          프로필 사진 변경
        </div>
        <div role="button" class="img-clear btn" @click="imgClear">X</div>
      </div>
      <div class="input-wrap">
        <label>이메일(ID)*</label>
        <Input
          type="text"
          name="email"
          :class="{
            ['border-color-red']: errors.email?.type,
            ['focus-border-color-d5']: !errors.email?.type,
            ['border-color-d4']: !errors.email?.type,
            ['focus-border-color-red']: errors.email?.type,
          }"
          class="placeholder-d4"
          placeholder="사내 이메일을 입력해주세요"
          :ref="
            register({
              required: true,
              pattern:
                /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/,
            })
          "
        />
        <div class="error">
          <ErrorForm>
            {{
              errors.email?.type ? "아이디는 이메일 형식으로 입력해주세요" : ""
            }}
          </ErrorForm>
        </div>
      </div>
      <div class="input-wrap">
        <label>비밀번호*</label>
        <Input
          :type="newIcon === 'hide' ? 'password' : 'text'"
          name="newPassword"
          class="placeholder-d4 border-color-d4 focus-border-color-d5"
          :class="{
            ['border-color-red']: errors.newPassword?.type,
            ['focus-border-color-d5']: !errors.newPassword?.type,
            ['border-color-d4']: !errors.newPassword?.type,
            ['focus-border-color-red']: errors.newPassword?.type,
          }"
          placeholder="초기 비밀번호 입력해주세요"
          :ref="
            register({
              required: true,
              pattern: /^[a-zA-Z0-9]*$/,
              minLength: 8,
            })
          "
        />
        <Icons
          :icons="newIcon"
          :class="{ on: newIcon === 'show' }"
          @click="onShow('new')"
        />
        <div class="error">
          <ErrorForm>
            {{
              errors.newPassword?.type === "required"
                ? "비밀번호를 입력해주세요"
                : errors.newPassword?.type === "minLength" ||
                  errors.newPassword?.type === "pattern"
                ? "비밀번호는 숫자와 영어 8자리 이상으로 입력해주세요"
                : ""
            }}
          </ErrorForm>
        </div>
      </div>
      <div class="input-wrap">
        <label>비밀번호 확인*</label>
        <Input
          :type="confirmIcon === 'hide' ? 'password' : 'text'"
          name="confirmPassword"
          class="placeholder-d4 border-color-d4 focus-border-color-d5"
          :class="{
            ['border-color-red']: errors.confirmPassword?.type,
            ['focus-border-color-d5']: !errors.confirmPassword?.type,
            ['border-color-d4']: !errors.confirmPassword?.type,
            ['focus-border-color-red']: errors.confirmPassword?.type,
          }"
          placeholder="비밀번호를 다시 입력해주세요"
          :ref="
            register({
              required: true,
              match: 'newPassword',
            })
          "
        />
        <Icons
          :icons="confirmIcon"
          :class="{ on: newIcon === 'show' }"
          @click="onShow('confirm')"
        />
        <div class="error">
          <ErrorForm>
            {{
              errors.confirmPassword?.type === "required"
                ? "비밀번호를 입력해주세요"
                : errors.confirmPassword?.type === "match"
                ? "비밀번호와 일치하지 않습니다"
                : ""
            }}
          </ErrorForm>
        </div>
      </div>
      <div class="input-wrap">
        <label>이름*</label>
        <Input
          type="text"
          name="name"
          class="placeholder-d4 border-color-d4 focus-border-color-d5"
          :class="{
            ['border-color-red']: errors.name?.type,
            ['focus-border-color-d5']: !errors.name?.type,
            ['border-color-d4']: !errors.name?.type,
            ['focus-border-color-red']: errors.name?.type,
          }"
          placeholder="실명을 입력해주세요"
          :ref="
            register({
              required: true,
            })
          "
        />
        <div class="error">
          <ErrorForm>
            {{ errors.name?.type ? "이름을 입력해주세요" : "" }}
          </ErrorForm>
        </div>
      </div>
      <div class="input-wrap">
        <label>부서</label>
        <div class="text">{{ userStore.team?.name || "TEST TEAM" }}</div>
      </div>
      <div class="input-wrap">
        <label>직급 / 직책*</label>
        <Dropdown
          :list="[
            { id: '0', text: '직위를 선택하세요', value: '' },
            { id: '1', text: '부장', value: '1' },
            { id: '2', text: '과장', value: '2' },
            { id: '3', text: '대리', value: '3' },
            { id: '4', text: '사원', value: '4' },
          ]"
          class="border-color-d4 color-d4 .border-color-red"
          :class="{
            ['border-color-d4']: isPosition && position,
            ['border-color-red']: isPosition && !position,
          }"
          @select="onPosition"
        />
        <div class="error">
          <ErrorForm>{{
            isPosition && !position ? "직위를 선택하세요" : ""
          }}</ErrorForm>
        </div>
      </div>
      <div class="input-wrap">
        <label>내선번호</label>
        <Input
          type="number"
          name="phone"
          class="placeholder-d4 border-color-d4 focus-border-color-d5"
          placeholder="전화번호는 - 없이 숫자만 입력해주세요"
          :ref="
            register({
              required: false,
            })
          "
        />
      </div>
      <div class="input-wrap">
        <label>휴대폰번호</label>
        <Input
          type="number"
          name="cellphone"
          class="placeholder-d4 border-color-d4 focus-border-color-d5"
          placeholder="전화번호는 - 없이 숫자만 입력해주세요"
          :ref="
            register({
              required: false,
            })
          "
        />
      </div>
      <div class="btn-group">
        <div class="btn-wrap">
          <Button
            class="primary extra-bold"
            :disabled="!formState.isValid || !isPosition || !position"
            @click="handleSubmit(onSubmit)"
          >
            구성원 추가
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.member-modal {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .modal {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 590px;
    height: 900px;
    background-color: $d1;
    border-radius: 10px;
    box-shadow: $shadow-alpha-1;
    color: $d5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 40px 30px;

    .avatar {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 18px;
      font-weight: 400;
      .img-change {
        margin-left: 30px;
        color: $point-blue;
      }

      .img-clear {
        position: absolute;
        left: 50px;
        top: 5px;
        background-color: $point-red;
        color: $d1;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        font-size: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
      }

      .btn {
        cursor: pointer;
      }
    }

    .input-wrap {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 20px 10px;

      label {
        width: 220px;
        font-size: 18px;
        font-weight: 600;
      }

      .text {
        width: 100%;
        font-size: 18px;
        font-weight: 400;
      }

      .error {
        position: absolute;
        bottom: -5px;
        left: 170px;
      }

      svg {
        position: absolute;
        top: 28px;
        right: 20px;
        stroke: $d3;
        cursor: pointer;
        opacity: 0.8;

        &.on {
          stroke: $point-blue;
        }
      }
    }

    .btn-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 20px 10px;

      .btn-wrap {
        width: 100%;
        height: 46px;
      }
    }
  }
}
</style>
