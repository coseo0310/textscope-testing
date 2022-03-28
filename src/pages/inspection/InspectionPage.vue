<script setup lang="ts">
import { ref } from "vue";
import Icons from "@/components/shared/Icons.vue";
import PreviewMenu from "@/components/inspection/PreviewMenu.vue";

const isPreview = ref<boolean>(true);

const onPreview = () => (isPreview.value = !isPreview.value);
</script>

<template>
  <div class="inspection-page">
    <div class="preview-wrap" :class="{ active: isPreview }">
      <PreviewMenu />
      <div
        role="button"
        class="toggle"
        :class="{ active: isPreview }"
        @click="onPreview"
      >
        <Icons icons="chevron-down" />
      </div>
    </div>
    <div>??</div>
  </div>
</template>

<style lang="scss">
.inspection-page {
  width: 100%;
  height: 100vh;
  background-color: $d2;
  position: relative;
  display: flex;

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
        transform: rotate(-90deg);
      }

      &.active {
        svg {
          transform: rotate(90deg);
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
