<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useInspectionStore } from "@/store";

const inspectionStore = useInspectionStore();
const {
  inspectionItems,
  editors,
  observer,
  editorForm,
  currentEditor,
  currentPage,
  synonymList,
  total,
} = storeToRefs(inspectionStore);

const routes = useRoute();
const editorWrap = ref<HTMLDivElement | null>(null);

const setEditor = () => {
  if (!editorWrap.value) {
    return;
  }
  editorWrap.value.scrollTo(0, 0);
  editorWrap.value.innerHTML = "";

  editors.value.forEach((e, idx) => {
    const el = e.getCanvas();
    if (!el) {
      return;
    }
    el.classList.add(`idx-${idx}`);
    editorWrap.value?.appendChild(el);
  });

  const observerOptions = {
    root: editorWrap.value,
    rootMargin: "0px",
    // threshold: 0.1,
  };
  const observerCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    if (entries.length > 1) {
      return;
    }
    entries.forEach((entry) => {
      const { target, isIntersecting, boundingClientRect, intersectionRatio } =
        entry;
      const idx = Number(target.classList.value.split("-")[1]);
      if (!isIntersecting && intersectionRatio <= 0) {
        if (boundingClientRect.y < 0) {
          inspectionStore.setInspectionItem(idx + 2);
        } else {
          inspectionStore.setInspectionItem(idx || 1);
        }
      }
    });
  };
  observer.value = new IntersectionObserver(observerCallback, observerOptions);

  const nodes = editorWrap.value.childNodes;

  setTimeout(() => {
    nodes.forEach((node) => {
      const el = node as HTMLCanvasElement;
      observer.value?.observe(el);
    });
  }, 1000);
};

watch(inspectionItems, () => {
  setEditor();
});

const onShoutcuts = (e: KeyboardEvent) => {
  if (!currentEditor.value) {
    return;
  }
  switch (e.key) {
    case "Backspace":
      const f = currentEditor.value.getEditField();
      if (f) {
        currentEditor.value.removeField(f.id);
        currentEditor.value.removeSection(f.id);
        currentEditor.value.clearEditField();
        currentEditor.value.setSectionField(currentPage.value);
        currentEditor.value.draw();
        synonymList.value = currentEditor.value?.getFields();
        total.value = currentEditor.value.getSectionLength();
      }
      break;
    default:
      break;
  }
};

onMounted(async () => {
  if (!editorWrap.value) {
    return;
  }
  editorForm.value = editorWrap.value;
  await inspectionStore.getInspectionItems(0, routes.params?.type === "admin");
  inspectionStore.setInspectionItem(1);

  window.addEventListener("keydown", onShoutcuts);

  // TODO: temp
  setEditor();
});

onUnmounted(async () => {
  window.removeEventListener("keydown", onShoutcuts);
});
</script>

<template>
  <div ref="editorWrap" class="editor"></div>
</template>

<style lang="scss" scoped>
.editor {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
</style>
