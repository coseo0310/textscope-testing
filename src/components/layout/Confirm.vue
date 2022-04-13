<script setup lang="ts">
import Button from "@/components/shared/Button.vue";

interface Props {
  confirm: {
    messages: string[];
    confirmType: "info" | "warn";
    confirmFunc: Function;
    cancelFunc: Function;
    label?: string;
  };
}

const props = defineProps<Props>();

const onCancel = () => {
  props.confirm.cancelFunc();
};

const onConfirm = () => {
  props.confirm.confirmFunc();
};
</script>

<template>
  <div class="modal">
    <div class="confirm">
      <div class="text" :class="{ [`${props.confirm.confirmType}`]: true }">
        <p v-for="m in props.confirm.messages">{{ m }}</p>
      </div>
      <div class="btn-wrap">
        <Button class="btn outline extra-bold" @click="onCancel">취소</Button>
        <Button
          class="btn primary extra-bold"
          :class="{
            [`color-red`]: props.confirm.confirmType === 'warn',
            [`color-blue`]: props.confirm.confirmType === 'info',
          }"
          @click="onConfirm"
          >{{ props.confirm.label ? props.confirm.label : "삭제" }}</Button
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modal {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);

  .confirm {
    transform: translate(-50%, -50%);
    position: relative;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 200px;
    background-color: $d1;
    border-radius: 10px;
    box-shadow: $shadow-alpha-1;
    padding: 40px;

    .text {
      font-size: 18px;
      font-weight: 600;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 25px;

      &.warn {
        color: $point-red;
      }

      &.info {
        color: $point-blue;
      }

      p {
        padding: 2.5px 0;
      }
    }

    .btn-wrap {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .btn {
        width: 150px;
        height: 46px;
      }
    }
  }
}
</style>
