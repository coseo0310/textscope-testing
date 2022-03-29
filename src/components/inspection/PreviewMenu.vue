<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import Button from "@/components/shared/Button.vue";
import Icons from "@/components/shared/Icons.vue";
import { useInspectionStore } from "@/store";

let MAX_STEP = 0;

const inspectionStore = useInspectionStore();
const previewEl = ref<HTMLDivElement | null>();
const thumbnailEl = ref<HTMLDivElement | null>();
const step = ref<number>(0);

const onPrevNext = (type: "prev" | "next") => {
  if (!thumbnailEl.value) {
    return;
  }
  if (type === "prev") {
    step.value = step.value === 0 ? 0 : step.value - 1;
  } else if (type === "next") {
    step.value = MAX_STEP === step.value ? MAX_STEP : step.value + 1;
  }
};

const positionTo = computed(() => {
  return `${step.value * -184}px`;
});
const onResize = () => {
  if (!previewEl.value) {
    return;
  }
  const eHeight = previewEl.value.clientHeight;
  const cHeight = 260;
  const cardCnt = Math.floor((eHeight - 50) / cHeight);
  MAX_STEP = Math.floor(inspectionStore.inspectionItems.length / cardCnt);
  if (MAX_STEP < step.value) {
    step.value = 0;
  }
};

onMounted(async () => {
  onResize();
  window.addEventListener("resize", onResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<template>
  <div class="preview" ref="previewEl">
    <div class="pagination">
      <Button class="prev btn" @click="onPrevNext('prev')">
        <div class="icon">
          <Icons icons="chevron-down" />
        </div>
        <div class="text">이전</div>
      </Button>
      <Button class="next btn" @click="onPrevNext('next')">
        <div class="text">다음</div>
        <div class="icon">
          <Icons icons="chevron-down" />
        </div>
      </Button>
    </div>
    <div class="thumbnail-wrap" ref="thumbnailEl">
      <div
        v-for="item in inspectionStore.inspectionItems"
        class="thumbnail-card"
        @click="inspectionStore.setInspectionItem(item)"
      >
        <div class="img" :style="{ backgroundImage: `url('${item.img}')` }" />
        <div class="info">
          <div class="text">{{ item.prediction.doc_type.name }}</div>
          <div class="type">문서 : 비정형</div>
          <div class="status">검수 : 대기 <span class="progress"></span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preview {
  overflow: hidden;
  position: relative;
  height: 100%;
  background-color: $d3;

  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 22px;
    height: 50px;
    width: 184px;

    .btn {
      display: flex;
      align-items: center;
      color: $point-blue;
      font-size: 14px;
      font-weight: 600;
      background-color: $d3;

      &.prev {
        .icon {
          transform: rotate(90deg);
        }
      }
      &.next {
        .icon {
          transform: rotate(-90deg);
        }
      }
    }
  }

  .thumbnail-wrap {
    position: relative;
    left: 0;
    transform: translate(v-bind("positionTo"), 0);
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    transition: all 0.3s ease-in-out;

    .thumbnail-card {
      width: 184px;
      height: 240px;
      padding: 0 22px;
      position: relative;
      left: 0;
      margin: 20px 0;
      cursor: pointer;

      .img {
        width: 100%;
        height: 170px;
        background-size: cover;
        background-position: left left;
        background-repeat: no-repeat;
      }
      .info {
        margin-top: 10px;
        height: 60px;
        color: $d5;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;

        .status {
          display: flex;
          align-items: center;

          .progress {
            display: flex;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: $point-blue;
            margin-left: 3px;
          }
        }
      }
    }
  }
}
</style>
