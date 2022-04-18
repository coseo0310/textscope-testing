<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useInspectionStore } from "@/store";

const inspectionStore = useInspectionStore();

const canvasEl = ref<HTMLCanvasElement | null>(null);

onMounted(async () => {
  if (!canvasEl.value) {
    return;
  }
  await inspectionStore.editor.setCanvas(canvasEl.value);
  await inspectionStore.getInspectionItems();
});
</script>

<template>
  <div class="editor">
    <canvas ref="canvasEl" class="editor-canvas"></canvas>
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
