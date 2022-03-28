<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/shared/Button.vue";
import Icons from "@/components/shared/Icons.vue";
import Dropdown from "@/components/shared/Dropdown.vue";
import { useInspectionStore } from "@/store";

const inspectionStore = useInspectionStore();

const deg = ref<number>(0);
const zoom = ref<number>(Math.floor(inspectionStore.viewer.getScale() * 100));

const onInspection = () => {
  inspectionStore.isInspection = !inspectionStore.isInspection;
  inspectionStore.onStartInspection();
};

const onRotate = (type: "left" | "right" | "90") => {
  if (type == "left") {
    deg.value -= 1;
  } else if (type == "right") {
    deg.value += 1;
  } else {
    deg.value -= 90;
  }

  inspectionStore.viewer.setRotate(deg.value);
};

const onZoomInOut = (type: "in" | "out") => {
  zoom.value = Math.floor(inspectionStore.viewer.getScale() * 100);
  inspectionStore.viewer.setZoomInOut(type);
};

const onInit = () => {
  deg.value = 0;
  inspectionStore.viewer.setRotate(deg.value);
  inspectionStore.viewer.setZoomInOut("init");
  //TODO: Data reset
};

const onComparison = () => {
  // TODO: comparison
  alert("준비중...");
};
</script>

<template>
  <div class="top-menu">
    <div class="info">
      <div class="grid">
        <div class="header">
          <div class="column">Task ID</div>
          <div class="column">카테고리</div>
          <div class="column">문서명</div>
          <div class="column">등록 담당자</div>
          <div class="column">검수 담당자</div>
          <div class="column">검수</div>
          <div class="column">정확도</div>
          <div class="column">문서비교</div>
          <div class="column">완료일</div>
        </div>
        <div class="rows">
          <div class="column">
            {{ inspectionStore.inspectionItem?.request.task_id }}
          </div>
          <div class="column category" role="button">
            <!-- 해외투자 사업계획서
            <Icons icons="chevron-down" /> -->
            <Dropdown
              default="2"
              class="minimal"
              :list="[
                { id: '1', text: '해외사업계획서', value: '1' },
                { id: '2', text: 'Purchase Order', value: '2' },
                { id: '3', text: 'Bill of Landing', value: '3' },
                { id: '4', text: 'Packing List', value: '4' },
              ]"
            />
          </div>
          <div class="column">
            {{ inspectionStore.inspectionItem?.image_metadata.filename }}
          </div>
          <div class="column">장화</div>
          <div class="column">-</div>
          <div class="column">-</div>
          <div class="column">93.1%</div>
          <div class="column icon" role="button" @click="onComparison">
            <Icons icons="show" />보기
          </div>
          <div class="column">-</div>
        </div>
      </div>
      <div class="btn-wrap">
        <Button
          class="primary extra-bold"
          :class="{ ['color-red']: inspectionStore.isInspection }"
          @click="onInspection"
        >
          {{ inspectionStore.isInspection ? "검수 취소" : "검수 시작" }}
        </Button>
      </div>
    </div>
    <div class="control-wrap">
      <div class="control-box">
        <div class="box">크기</div>
        <div class="box">회전</div>
        <div class="box">초기화</div>
        <div class="box icon" role="button">
          <Icons icons="plus" @click="onZoomInOut('in')" />
          <Icons icons="minus" @click="onZoomInOut('out')" />
        </div>
        <div class="box icon" role="button">
          <Icons icons="rotate-left" @click="onRotate('left')" />
          <Icons icons="rotate-right" @click="onRotate('right')" />
          <Icons icons="reload" @click="onRotate('90')" />
        </div>
        <div class="box icon" role="button">
          <Icons icons="init" @click="onInit" />
        </div>
      </div>
      <div class="btn-wrap">
        <div class="ocr-btn-wrap">
          <Button
            class="outline"
            :disabled="!inspectionStore.isInspection"
            @click="inspectionStore.onOCR"
          >
            OCR 시작
          </Button>
          <Button
            class="outline"
            :disabled="!inspectionStore.isInspection"
            @click="inspectionStore.onGOCR"
          >
            G-OCR
          </Button>
        </div>
        <div class="save-btn-wrap">
          <Button
            class="outline"
            :disabled="!inspectionStore.isInspection"
            @click="inspectionStore.onSave"
          >
            저장
          </Button>
          <Button
            class="primary extra-bold"
            :disabled="!inspectionStore.isInspection"
            @click="inspectionStore.onCompleted"
          >
            검수 완료
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-menu {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  .info {
    display: flex;
    align-items: center;
    width: 100%;

    .grid {
      width: 100%;
      height: 60px;

      .header,
      .rows {
        width: 100%;
        display: grid;
        grid-template-columns:
          minmax(180px, 1.6fr) minmax(200px, 0.7fr) minmax(300px, 3fr)
          minmax(80px, 0.5fr) minmax(80px, 0.5fr) minmax(120px, 0.7fr)
          minmax(80px, 0.5fr) minmax(80px, 0.5fr) minmax(180px, 1fr);

        .column {
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: $d5;
          font-size: 14px;
          font-weight: 600;
          border-right: 1px solid $d4;

          &.category {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 20px;

            svg {
              color: $point-blue;
            }
          }

          &.icon {
            color: $point-blue;
            text-decoration: underline;
            cursor: pointer;

            svg {
              width: 22px;
            }
          }
        }
      }

      .header {
        border-left: 1px solid $d4;
        border-top: 1px solid $d4;
        border-bottom: 1px solid $d4;
        .column {
          background-color: $d3;
        }
      }

      .rows {
        border-left: 1px solid $d4;
        border-bottom: 1px solid $d4;
      }
    }

    .btn-wrap {
      width: 130px;
      height: 46px;
      margin: 8px 20px;
    }
  }

  .control-wrap {
    width: 100%;
    height: 60px;
    margin-top: 2px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .control-box {
      width: 257px;
      height: 100%;
      display: grid;
      grid-template-columns: 0.8fr 1.4fr 0.8fr;
      padding: 0 1px 1px 0;
      margin: 0 0 0 1px;
      gap: 1px;
      background-color: $d4;

      .box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 600;
        color: $d5;
        background-color: $d3;

        &.icon {
          background-color: $d2;
          color: $point-blue;
          cursor: pointer;

          svg:last-child {
            width: 32px;
          }
        }
      }
    }

    .btn-wrap {
      width: calc(100% - 257px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      background-color: $d2;

      button {
        width: 130px;
        height: 46px;
        margin: 0 10px;
      }
    }
  }
}
</style>
