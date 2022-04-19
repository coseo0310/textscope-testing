<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useInspectionStore } from "@/store";
import Worker from "@/services/editor/worker?worker";

const inspectionStore = useInspectionStore();

const editorWrap = ref<HTMLCanvasElement | null>(null);

onMounted(async () => {
  if (!editorWrap.value) {
    return;
  }
  //   const canvas = document.createElement("canvas");

  //   await inspectionStore.editor.setCanvas(canvas);
  const c = inspectionStore.editor.getCanvas() as HTMLCanvasElement;
  await inspectionStore.getInspectionItems();
  editorWrap.value.appendChild(c);

  //   const offscreen = canvasEl.value.transferControlToOffscreen();

  //   const worker = new Worker();

  //   console.log("wi", window);

  //   const el = document.createElement("canvas");
  //   worker.postMessage({ type: "init", canvas: offscreen }, [offscreen]);
});
</script>

<template>
  <div ref="editorWrap" class="editor">
    <!-- <canvas ref="canvasEl" class="editor-canvas"></canvas> -->
  </div>
</template>

<style lang="scss" scoped>
.editor {
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
