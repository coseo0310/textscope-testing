<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useInspectionStore } from "@/store";

const inspectionStore = useInspectionStore();

const editorWrap = ref<HTMLDivElement | null>(null);

onMounted(async () => {
  if (!editorWrap.value) {
    return;
  }
  await inspectionStore.getInspectionItems();
  inspectionStore.setInspectionItem(1);
  inspectionStore.editor.forEach((e, idx) => {
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
          inspectionStore.setInspectionItem(idx);
        }
      }
    });
  };
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  const nodes = editorWrap.value.childNodes;

  setTimeout(() => {
    nodes.forEach((node) => {
      const el = node as HTMLCanvasElement;
      observer.observe(el);
    });
  }, 1000);
});
</script>

<template>
  <div ref="editorWrap" class="editor"></div>
</template>

<style lang="scss" scoped>
.editor {
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
</style>
