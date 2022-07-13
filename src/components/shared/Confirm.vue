<script setup lang="ts">
interface Props {
  title: string;
  text: string[];
  types: "warn" | "info" | "confirm";
  confirmLabel: string;
  cancelLabel: string;
  confirm: Function;
  cancel: Function;
}

const props = defineProps<Props>();

const onConfirm = () => {
  props.confirm();
};

const onCancel = () => {
  props.cancel();
};
</script>

<template>
  <article :class="modal.layout">
    <div :class="modal.box">
      <h1 :class="modal.title">{{ props.title }}</h1>
      <div :class="modal.text">
        <p v-for="t in props.text">
          {{ t }}
        </p>
      </div>
      <div :class="modal.btn_wrap">
        <button :class="modal.cancel_btn" type="button" @click="onCancel">
          {{ cancelLabel }}
        </button>
        <button
          :class="{
            [modal.confirm_btn]: true,
            [modal.warn_color]: props.types === 'warn',
            [modal.info_color]: props.types === 'info',
          }"
          type="button"
          @click="onConfirm"
        >
          {{ confirmLabel }}
        </button>
      </div>
    </div>
  </article>
</template>

<style lang="scss" module="modal">
.layout {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 400px;
  height: 180px;
  background-color: #ffffff;
  border-radius: 3px;
  padding: 24px;
}

.title {
  color: $m-800;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  padding-bottom: 16px;
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  color: $n-800;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  padding-bottom: 5px;
}

.btn_wrap {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.confirm_btn {
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  outline: none;
  cursor: pointer;
  color: #ffffff;
  margin: 0 4px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
}

.warn_color {
  background-color: $r-400;
}

.info_color {
  background-color: $m-700;
}

.cancel_btn {
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  outline: none;
  cursor: pointer;
  background-color: $n-20;
  color: $n-500;
  margin: 0 4px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
}
</style>
