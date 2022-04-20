<script setup lang="ts">
import { ref } from "vue";
import Input from "@/components/shared/Input.vue";
import Button from "@/components/shared/Button.vue";
import Icons from "@/components/shared/Icons.vue";
import { useInspectionStore } from "@/store";

interface Props {
  idx: number;
  keyText: string;
  text: string;
  confirm?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  confirm: true,
});

const inspectionStore = useInspectionStore();

const text = ref<string>(props.text);

const onKeyup = (e: KeyboardEvent) => {
  const el = e.target as HTMLInputElement;
  if (!el) {
    return;
  }

  text.value = el.value;
  onConfirm();
};
const onConfirm = () => {
  inspectionStore.synonymList[props.idx - 1].text = text.value;
  inspectionStore.editor[inspectionStore.currentPage - 1].setFields(
    inspectionStore.synonymList
  );

  inspectionStore.editor[inspectionStore.currentPage - 1].draw();
};
const onCancel = () => {};
</script>

<template>
  <div class="card-wrap">
    <div class="type">
      <div class="index">{{ props.idx }}</div>
      <div class="badge-wrap">
        <span class="badge hangle">가</span>
        <span class="badge number">123</span>
      </div>
      <div class="badge-wrap">
        <span class="badge english">A</span>
        <span class="badge check">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 12.25L10.75 16L17 8.5"
              stroke="#FAFCFF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
    <div class="form">
      <div class="menu">
        <div class="key">{{ props.keyText }}</div>
        <div class="btn">
          <Button class="primary semi-bold">유의어</Button>
        </div>
      </div>
      <div class="input">
        <Input
          :id="`value-${props.idx}`"
          type="text"
          :value="props.text"
          :class="{ ['background-color-red']: !confirm }"
          @keyup="onKeyup"
        />
        <label :for="`value-${props.idx}`">t</label>
        <div class="confirm" @click="onConfirm">
          <div class="ok">
            <Icons icons="confirm" @click="onConfirm" />
          </div>
          <div class="cancel" @click="onCancel">
            <Icons icons="cancel" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-wrap {
  width: 100%;
  min-height: 92px;
  border-bottom: 1px solid $d4;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  color: $d5;
  font-weight: 600;

  .type {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    width: 62px;

    .index {
      font-weight: 400;
      font-size: 14px;
    }

    .badge-wrap {
      display: grid;
      justify-content: center;
      align-items: center;
      grid-template-columns: 1fr 1fr;
      gap: 4px;
      margin-top: 10px;

      .badge {
        width: 20px;
        height: 16px;
        border-radius: 5px;
        font-size: 10px;
        font-weight: 400;
        color: $d1;
        display: flex;
        justify-content: center;
        align-items: center;

        &.hangle {
          background-color: $point-peacook;
        }
        &.number {
          background-color: $point-yellow;
        }
        &.english {
          background-color: $point-red;
        }
        &.check {
          background-color: $point-purple;
        }
      }
    }
  }

  .form {
    width: 100%;
    height: 100%;

    .menu {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      height: 50%;

      .key {
        padding-top: 5px;
        font-size: 14px;
      }

      .btn {
        width: 97px;
        height: 30px;
        margin-bottom: 10px;
      }
    }

    .input {
      position: relative;
      height: 50%;
      color: $d5;

      label {
        position: absolute;
        width: 1px;
        height: 1px;
        font-size: 1px;
        opacity: 0;
        font-weight: 100;
      }

      .confirm {
        display: none;
        position: absolute;
        right: 0px;
        top: -2px;
        border-radius: 5px;
        padding: 5px 5px 0 5px;

        .ok,
        .cancel {
          cursor: pointer;
        }

        .ok {
          color: $point-blue;
          svg {
            width: 24px;
          }
        }

        .cancel {
          color: $point-red;
          svg {
            width: 30px;
          }
        }
      }

      input {
        font-size: 14px;
        border-radius: 0;
        padding: 10px 60px 10px 10px;
        border-color: $d4;
      }

      /* input:focus ~ .confirm {
        display: flex;
      } */
    }
  }
}
</style>
