<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/shared/Button.vue";

interface Props {
  id: string;
  title: string;
  category: string[];
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "close"): void;
}>();

const modalEl = ref<HTMLDivElement | null>(null);

const onClosest = (e: MouseEvent) => {
  if (!modalEl.value) {
    return;
  }
  const el = e.target as HTMLElement;
  if (!el) {
    return;
  }
  const box = el.closest(".content-box");
  if (box) {
    return;
  }
  emits("close");
};

const onConfirm = () => {
  if (!modalEl.value) {
    return;
  }
  emits("close");
};
</script>

<template>
  <div ref="modalEl" class="model-info-modal" @click="onClosest">
    <div class="content-box">
      <div class="title">
        {{ props.title }}
      </div>
      <div class="form">
        <div class="row">
          <div class="column header">번호</div>
          <div class="column header">카테고리</div>
        </div>
        <div v-for="(c, idx) in props.category" class="row">
          <div class="column">{{ idx + 1 }}</div>
          <div class="column">{{ c }}</div>
        </div>
      </div>
      <div class="btn-wrap">
        <Button class="primary semi-bold" @click="onConfirm">확인</Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.model-info-modal {
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);

  &.open {
    display: block;
  }

  .content-box {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 327px;
    border-radius: 20px;
    background-color: $d1;
    color: $d5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 20px;

    .title {
      font-weight: 600;
    }

    .form {
      padding: 20px 0;
      .row {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 0;
        font-size: 18px;

        &:first-child {
          border-top: 1px solid $d4;
          border-bottom: 1px solid $d4;
        }

        &:last-child {
          border-bottom: 1px solid $d4;
        }

        .column {
          &.header {
            font-weight: 600;
            padding: 5px 0;
          }

          &:first-child {
            width: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          &:last-child {
            width: 160px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
        }
      }
    }

    .btn-wrap {
      width: 247px;
      height: 30px;
    }
  }
}
</style>
