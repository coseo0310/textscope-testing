<script setup lang="ts">
import { computed } from "vue";
import { useClassificationStore } from "@/store";
import { storeToRefs } from "pinia";

const classificationStore = useClassificationStore();
const { uploadPercent, isProgress } = storeToRefs(classificationStore);

const percent = computed(() => `${uploadPercent.value}%`);
</script>

<template>
  <div v-if="isProgress" class="upload-progress">
    <div class="progress-wrap">
      <div class="background progress"></div>
      <div class="progress-bar progress"></div>
      <div class="percent">{{ uploadPercent }}%</div>
    </div>
    <div class="text">열심히 업로드중이에요</div>
  </div>
</template>

<style lang="scss" scoped>
.upload-progress {
  width: 100%;
  height: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .progress-wrap {
    position: relative;
    width: 778px;
    height: 22px;
    display: flex;
    align-items: center;

    .progress {
      border-radius: 100px;
    }

    .background {
      background-color: $d3;
      width: 100%;
      height: 100%;
    }

    .progress-bar {
      position: absolute;
      width: v-bind("percent");
      height: 100%;
      background-color: $point-blue;
    }

    .percent {
      padding-left: 20px;
      color: $d4;
      font-size: 18px;
      font-weight: 600;
    }
  }

  .text {
    font-size: 18px;
    font-weight: 400;
    color: $d5;
    padding-top: 25px;
  }
}
</style>
