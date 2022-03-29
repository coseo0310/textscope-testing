<script setup lang="ts">
import Input from "@/components/shared/Input.vue";
import Button from "@/components/shared/Button.vue";

type Props = {
  idx: number;
  key: string;
  text: string;
  confirm?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  confirm: true,
});
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
        <div class="key">{{ props.key }}</div>
        <div class="btn">
          <Button class="primary semi-bold">유의어</Button>
        </div>
      </div>
      <div class="input">
        <Input
          :defaultValue="props.text"
          :class="{ ['color-red']: !confirm }"
        />
        <div class="confirm">
          <div class="ok">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 11.75L10.75 15.5L17 8"
                stroke="#47ADB5"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="cancel">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.46484 8.46484L15.5359 15.5359"
                stroke="#FF7777"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M15.5352 8.46484L8.46409 15.5359"
                stroke="#FF7777"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
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

      .confirm {
        display: none;
        position: absolute;
        right: 3px;
        top: 3px;
        border-radius: 5px;
        padding: 5px 5px 0 5px;

        .ok,
        .cancel {
          cursor: pointer;
        }
      }

      input {
        font-size: 14px;
        border-radius: 0;
        padding: 10px 60px 10px 10px;
        border-color: $d4;
      }

      input:focus ~ .confirm {
        display: flex;
      }
    }
  }
}
</style>
