<script setup lang="ts">
import { ref, watch } from "vue";
import Button from "@/components/shared/Button.vue";
import CheckBox from "@/components/shared/CheckBox.vue";

export interface Model {
  id: string;
  text: string;
  checked?: boolean;
}

interface Props {
  models: Model[];
  selected: string[];
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "close", items: string[]): void;
}>();

const modalEl = ref<HTMLDivElement | null>(null);
const selection = ref<string[]>(props.selected);
const list = ref<Model[]>(props.models);

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
  emits("close", selection.value);
};

const onConfirm = () => {
  if (!modalEl.value) {
    return;
  }
  emits("close", selection.value);
};

const onChange = (v: boolean, id: string, idx: number) => {
  if (v) {
    selection.value.push(id);
  } else {
    selection.value = selection.value.filter((f) => f !== id);
  }
};

const allSelected = (v: boolean) => {
  if (v) {
    selection.value = props.models.map((m) => m.id);
    list.value = list.value.map((m) => {
      m.checked = true;
      return m;
    });
  } else {
    selection.value = [];
    list.value = list.value.map((m) => {
      m.checked = false;
      return m;
    });
  }
};

watch(props, () => {
  selection.value = props.selected;
  list.value = list.value.map((m) => {
    m.checked = props.selected.includes(m.id);
    return m;
  });
});
</script>

<template>
  <div ref="modalEl" class="model-mapping-modal" @click="onClosest">
    <div class="content-box">
      <div class="title">제목</div>
      <div class="form">
        <div class="row">
          <div class="column header">
            <CheckBox
              :default="selection.length === models.length"
              @change="allSelected"
            />
          </div>
          <div class="column header">문서모델</div>
        </div>
        <div v-for="(m, idx) in list" class="row">
          <div class="column">
            <CheckBox
              :default="!!m.checked"
              @change="(v) => onChange(v, m.id, idx)"
            />
          </div>
          <div class="column">
            {{ m.text }}
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <Button class="primary semi-bold" @click="onConfirm">확인</Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.model-mapping-modal {
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
    width: 601px;
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
            width: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          &:last-child {
            width: 450px;
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
