<script setup lang="ts">
import { ref } from "vue";
import DatePicker from "@/components/shared/DatePicker.vue";

export interface Item {
  id: string;
  name: string;
  team: string;
  position: string;
  auth: "admin" | "user" | "nil";
  startDt: string;
  endDt: string;
}

interface Props {
  item: Item | null;
}

interface Emits {
  (e: "confirm", v: Item): void;
  (e: "cancel"): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const result = ref<Item | null>(props.item);

const onStartDate = (d: string) => {
  console.log("s", d);
};
const onEndDate = (d: string) => {
  console.log("d", d);
};

const onConfirm = () => {
  if (!result.value) {
    return;
  }
  emits("confirm", result.value);
};

const onClosest = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  const el = e.target as HTMLElement;
  if (!el) {
    return;
  }

  const closest = el.closest(".modal");
  if (closest) {
    return;
  }
  onCancel();
};

const onCancel = () => {
  emits("cancel");
};
</script>

<template>
  <article :class="container.layout" @click="onClosest">
    <div class="modal" :class="modal.layout">
      <h1 :class="modal.title">권한 수정</h1>
      <div :class="modal.box">
        <label :class="modal.label">대상 직원</label>
        <p :class="modal.text">
          {{
            `${props.item?.name} ${props.item?.team} ${props.item?.position}`
          }}
        </p>
      </div>
      <div :class="modal.divider"></div>
      <div :class="modal.box">
        <label :class="modal.label">권한 선택</label>
        <div :class="modal.auth">
          <p :class="{ [modal.auth_on]: props.item?.auth === 'admin' }">
            관리자
          </p>
          <p :class="{ [modal.auth_on]: props.item?.auth === 'user' }">
            일반사용자
          </p>
          <p :class="{ [modal.auth_on]: props.item?.auth === 'nil' }">
            권한 삭제
          </p>
        </div>
      </div>
      <div :class="modal.box">
        <label :class="modal.label">시작일</label>
        <div :class="modal.date">
          <DatePicker
            width="154px"
            :full-days="true"
            :default-start="props.item?.startDt"
            :end-limit="props.item?.startDt"
            @selected="onStartDate"
          />
          <p>부터</p>
        </div>
      </div>
      <div :class="modal.box">
        <label :class="modal.label">만료일</label>
        <div :class="modal.date">
          <DatePicker
            width="154px"
            :full-days="true"
            :default-start="props.item?.endDt"
            :start-limit="props.item?.endDt"
            @selected="onEndDate"
          />
          <p>까지</p>
        </div>
      </div>
      <div :class="modal.btn_wrap">
        <button :class="modal.btn_cancel" type="button" @click="onCancel">
          취소
        </button>
        <button :class="modal.btn_confirm" type="button" @click="onConfirm">
          적용하기
        </button>
      </div>
    </div>
  </article>
</template>

<style lang="scss" module="container">
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.32);
}
</style>

<style lang="scss" module="modal">
.layout {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 357px;
  border-radius: 3px;
  background-color: #ffffff;
  padding: 24px;
}

.title {
  font-size: 20px;
  font-weight: 700;
  color: $m-800;
  padding-bottom: 32px;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: $n-30;
  margin: 2px 0;
}

.box {
  display: flex;
  align-items: center;
  height: 32px;
  margin: 9px 0;
}

.label {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: $m-500;
  width: 100px;
  height: 20px;
}

.text {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: $m-800;
}

.auth {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid $n-40;
  border-radius: 4px;

  p {
    font-size: 14px;
    font-weight: 600;
    color: $m-700;
    padding: 6px 14px;
    cursor: pointer;
  }

  p:not(:first-child) {
    border-left: 1px solid $n-40;
  }
}

.auth_on {
  background-color: $n-50;
}

.date {
  display: flex;
  align-items: center;
  width: 200px;
  height: 32px;

  p {
    width: 40px;
    color: $n-600;
    font-size: 14px;
    font-weight: 400;
    padding: 0 5px;
  }
}

.btn_wrap {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 32px;
}

.btn_confirm {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 81px;
  height: 40px;
  background-color: $m-700;
  border-radius: 4px;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  margin: 0 4px;
  cursor: pointer;
}

.btn_cancel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 57px;
  height: 40px;
  background-color: $n-20;
  border-radius: 4px;
  border: none;
  outline: none;
  color: $n-500;
  font-size: 14px;
  font-weight: 600;
  margin: 0 4px;
  cursor: pointer;
}
</style>
