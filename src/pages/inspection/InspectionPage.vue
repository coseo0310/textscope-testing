<script setup lang="ts">
import { ref, onMounted } from "vue";
import Icons from "@/components/shared/Icons.vue";
import Button from "@/components/shared/Button.vue";
import PreviewMenu from "@/components/inspection/PreviewMenu.vue";
import TopMenu from "@/components/inspection/TopMenu.vue";
import SynonymForm from "@/components/inspection/SynonymForm.vue";
import { useInspectionStore } from "@/store";

const inspectionStore = useInspectionStore();

const isPreview = ref<boolean>(false);
const viewEl = ref<HTMLDivElement | null>(null);

const onPreview = () => (isPreview.value = !isPreview.value);

onMounted(async () => {
  await inspectionStore.getInspectionItems();
  if (!viewEl.value) {
    return;
  }
  viewEl.value.appendChild(inspectionStore.viewer.getViewer());
  inspectionStore.viewer.setImgURL(inspectionStore.inspectionItem?.img || "");

  const items =
    inspectionStore.inspectionItem?.prediction.key_values.length || 0 > 0
      ? inspectionStore.inspectionItem?.prediction.key_values
      : inspectionStore.inspectionItem?.prediction.texts;

  if (!items) {
    return;
  }
  items.forEach((d) => {
    inspectionStore.viewer.setField({
      id: d.id,
      text: d.text,
      dx: d.bbox.x,
      dy: d.bbox.y,
      dWidth: d.bbox.w,
      dHeight: d.bbox.h,
      type: "stroke",
      color: `rgba(220, 118, 118, 1)`,
      lineWidth: 5,
    });
  });
  inspectionStore.viewer.draw();
});
</script>

<template>
  <div class="inspection-page">
    <div class="top-menu-wrap">
      <TopMenu :item="inspectionStore.inspectionItem || null" />
    </div>
    <div class="content">
      <div class="view" ref="viewEl"></div>
      <div class="synonym-wrap"><SynonymForm /></div>
    </div>
    <div class="preview-wrap" :class="{ active: isPreview }">
      <PreviewMenu />
      <Button class="toggle" :class="{ active: isPreview }" @click="onPreview">
        <Icons icons="chevron-down" />
      </Button>
    </div>
  </div>
</template>

<style lang="scss">
.inspection-page {
  width: 100%;
  height: 100vh;
  background-color: $d2;
  position: relative;
  display: flex;
  flex-direction: column;

  .top-menu-wrap {
    width: 100%;
    height: 124px;
  }

  .content {
    display: flex;
    align-items: center;

    .view {
      width: calc(100vw - 540px);
      height: calc(100vh - 124px);
    }
    .synonym-wrap {
      width: 540px;
      height: calc(100vh - 124px);
    }
  }

  .preview-wrap {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    width: 0;
    border-right: 1px solid $d4;
    transition: all 0.3s ease-in-out;

    .toggle {
      position: absolute;
      right: 0;
      top: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 60px;
      background-color: $d2;
      border: 1px solid $d4;
      color: $point-blue;
      transform: translate(100%, -50%);
      cursor: pointer;

      svg {
        transform: rotate(-90deg) scale(2);
      }

      &.active {
        svg {
          transform: rotate(90deg) scale(2);
        }
      }
    }

    &.active {
      width: 184px;
      display: flex;
      border: 1px solid $d4;
    }
  }
}
</style>
