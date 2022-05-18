<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/shared/Button.vue";
import ContextMenu, {
  Contexts,
  Translate,
} from "@/components/shared/ContextMenu.vue";
import ModelInfoModal from "@/components/classification/ModelInfoModal.vue";
import { useClassificationStore, useCommonStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { path } from "@/router";

interface Props {
  id: string;
  title: string;
  date: string;
}

const props = defineProps<Props>();

const commonStore = useCommonStore();
const classificationStore = useClassificationStore();
const { modelList } = storeToRefs(classificationStore);
const router = useRouter();

const isModal = ref<boolean>(false);
const isContext = ref<boolean>(false);
const translate = ref<Translate>({ x: 0, y: 0 });

const onRightClick = (e: MouseEvent) => {
  isContext.value = true;
  translate.value = { x: e.clientX, y: e.clientY };
};

const onClick = (e: MouseEvent) => {
  const el = e.target as HTMLDivElement;
  if (!el) {
    return;
  }

  const closest = el.closest(".context-menu");

  if (closest) {
    return;
  }

  if (e.button === 0) {
    // onLeftClick(e);
  } else if (e.button === 2) {
    onRightClick(e);
  }
};

const onModify = () => {
  alert("준비중...");
};

const onDelete = () => {
  commonStore.setConfirm(
    [`${props.title}`, `모델을 삭제하시겠습니까?`],
    "warn",
    () => {
      modelList.value = modelList.value.filter((f) => f.id !== props.id);
      console.log(modelList.value, props.id);
    },
    () => {},
    "삭제"
  );
};

const onTesting = () => {
  router.push({ name: path.classification_test.name, query: { id: props.id } });
};

const getCategory = (): string[] => {
  const find = modelList.value.find((f) => f.id === props.id);
  if (!find) {
    return [];
  }
  const category: string[] = [];
  for (const c of find.items) {
    if (category.includes(c.category)) {
      continue;
    }
    category.push(c.category);
  }
  return category;
};

const onInfo = () => {
  isModal.value = true;
};

const contexts: Contexts = [
  { text: "변경", callback: onModify, color: "blue" },
  { text: "삭제", callback: onDelete, color: "red" },
];
</script>

<template>
  <div
    class="model-card"
    @mousedown="onClick"
    @contextmenu="(e) => e.preventDefault()"
  >
    <div class="title">{{ props.title }}</div>
    <div class="date">{{ props.date }}</div>
    <div class="btn-group">
      <div class="btn-wrap">
        <Button class="primary semi-bold" @click="onTesting">테스트</Button>
      </div>
      <div class="btn-wrap">
        <Button class="outline semi-bold" @click="onInfo">정보</Button>
      </div>
    </div>
    <ContextMenu
      :isShow="isContext"
      :translate="translate"
      :contexts="contexts"
      @close="isContext = false"
    />

    <ModelInfoModal
      :id="props.id"
      :title="props.title"
      :category="getCategory()"
      :class="{ open: isModal }"
      @close="
        () => {
          isModal = false;
        }
      "
    />
  </div>
</template>

<style lang="scss" scoped>
.model-card {
  width: 260px;
  height: 124px;
  background-color: $d1;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: $d5;
  padding: 10px;
  box-shadow: $shadow-alpha-1;

  .title {
    font-weight: 600;
    font-size: 18px;
  }

  .date {
    font-weight: 400;
    font-size: 16px;
    padding: 5px 0;
  }

  .btn-group {
    width: 210px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;

    .btn-wrap {
      width: 100px;
      height: 30px;
    }
  }
}
</style>
