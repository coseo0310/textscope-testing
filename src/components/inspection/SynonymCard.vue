<script setup lang="ts">
import { ref } from "vue";
import Input from "@/components/shared/Input.vue";
import Button from "@/components/shared/Button.vue";
import Icons from "@/components/shared/Icons.vue";
import { useInspectionStore } from "@/store";
import { storeToRefs } from "pinia";
import { useEditScroll } from "@/hooks";

interface Props {
  idx: number;
  id: string;
  keyText: string;
  text: string;
  confirm?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  confirm: true,
});

const inspectionStore = useInspectionStore();
const { setEditScroll } = useEditScroll();
const { currentEditor, synonymList } = storeToRefs(inspectionStore);

const getInput = (id: string) => {
  const input = document.querySelector(`.input-${id}`) as HTMLInputElement;
  return input;
};

const getConfirm = (id: string) => {
  const confirm = document.querySelector(`.confirm-${id}`) as HTMLDivElement;
  return confirm;
};

const onConfirm = (id: string) => {
  const confirm = getConfirm(id);
  if (!confirm) {
    return;
  }
  confirm.classList.remove("on");

  const input = getInput(id);
  if (!input) {
    return;
  }
  synonymList.value[props.idx - 1].text = input.value;
  currentEditor.value?.modifyField(synonymList.value[props.idx - 1]);
  currentEditor.value?.draw();
};
const onCancel = (id: string) => {
  const confirm = getConfirm(id);
  if (!confirm) {
    return;
  }
  confirm.classList.remove("on");

  const input = getInput(id);
  if (!input) {
    return;
  }
  input.value = props.text;
};

const onFocus = (id: string) => {
  const confirm = getConfirm(id);
  if (!confirm) {
    return;
  }
  confirm.classList.add("on");
};

const onSelect = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();

  setEditScroll("field", props.id);
};
</script>

<template>
  <div class="card-wrap" @click="onSelect">
    <div class="type">
      <div class="index">{{ props.idx }}</div>
      <div class="key">{{ props.keyText }}</div>
      <div class="badge-wrap">
        <span class="badge hangle">가</span>
        <span class="badge number">123</span>
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
      <div class="input">
        <Input
          :id="`value-${props.idx}`"
          type="text"
          :defaultValue="props.text"
          :class="{
            ['background-color-red']: !props.text,
            [`input-${props.id}`]: true,
          }"
          @focus="onFocus(props.id)"
        />
        <label :for="`value-${props.idx}`">t</label>
        <div
          class="confirm"
          :class="{ [`confirm-${props.id}`]: true }"
          @click="onConfirm(props.id)"
        >
          <div class="ok">
            <Icons icons="confirm" @click="onConfirm(props.id)" />
          </div>
          <div class="cancel" @click="onCancel(props.id)">
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  color: $d5;
  font-weight: 600;
  cursor: pointer;

  .type {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 5px 0;

    .index,
    .key {
      font-weight: 600;
      font-size: 14px;
      padding-right: 10px;
    }

    .badge-wrap {
      display: flex;
      justify-content: center;
      align-items: center;

      .badge {
        width: 30px;
        height: 20px;
        border-radius: 20px;
        font-size: 10px;
        font-weight: 600;
        color: $d1;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;

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

        &.on {
          display: flex;
        }

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
    }
  }
}
</style>
