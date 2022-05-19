<script setup lang="ts">
import { ref } from "vue";
import MainLayout from "@/components/layout/MainLayout.vue";
import Icons from "@/components/shared/Icons.vue";
import Button from "@/components/shared/Button.vue";
import PreviewMenu from "@/components/inspection/PreviewMenu.vue";
import TopMenu from "@/components/inspection/TopMenu.vue";
import EditorForm from "@/components/inspection/EditorForm.vue";
import SynonymForm from "@/components/inspection/SynonymForm.vue";

const isPreview = ref<boolean>(false);

const onPreview = () => (isPreview.value = !isPreview.value);
</script>

<template>
  <MainLayout>
    <div class="inspection-page">
      <div class="top-menu-wrap">
        <TopMenu />
      </div>
      <div class="content">
        <div class="editor-wrap"><EditorForm /></div>
        <div class="synonym-wrap"><SynonymForm /></div>
      </div>
      <div class="preview-wrap" :class="{ active: isPreview }">
        <PreviewMenu />
        <Button
          class="toggle"
          :class="{ active: isPreview }"
          @click="onPreview"
        >
          <Icons icons="chevron-down" />
        </Button>
      </div>
    </div>
  </MainLayout>
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
  }

  .content {
    display: flex;
    align-items: center;

    .editor-wrap {
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
