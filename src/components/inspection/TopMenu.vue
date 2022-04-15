<script setup lang="ts">
import { ref, onMounted } from "vue";
import Button from "@/components/shared/Button.vue";
import Icons from "@/components/shared/Icons.vue";
import Dropdown from "@/components/shared/Dropdown.vue";
import Logo from "@/assets/logo/textscope-logo.png";
import { useInspectionStore } from "@/store";

const inspectionStore = useInspectionStore();

const deg = ref<number>(0);
const zoom = ref<number>(Math.floor(inspectionStore.editor.getScale() * 100));

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

  inspectionStore.editor.setRotate(deg.value);
};

const onZoomInOut = (type: "in" | "out") => {
  zoom.value = Math.floor(inspectionStore.editor.getScale() * 100);
  inspectionStore.editor.setZoomInOut(type);
};

const onInit = () => {
  deg.value = 0;
  inspectionStore.setInspectionItem(
    inspectionStore.inspectionItems[inspectionStore.currentPage - 1],
    inspectionStore.currentPage
  );
  //TODO: Data reset
};

const onDraw = () => {
  inspectionStore.editor.setDraw();
};

const onComparison = () => {
  // TODO: comparison
  alert("준비중...");
};

onMounted(() => {
  // inspectionStore.editor.setDrawEndCallback((field) => {
  //   if (field.dWidth === 0 && field.dHeight === 0) {
  //     inspectionStore.editor.removeField(field.id);
  //   }
  //   inspectionStore.synonymList = inspectionStore.editor.getFields();
  // });
});
</script>

<template>
  <div class="top-menu">
    <div class="info">
      <div class="logo" :style="{ backgroundImage: `url(${Logo})` }"></div>
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
            {{ inspectionStore.inspectionItem?.task_id }}
          </div>
          <Button class="column category">
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
          </Button>
          <div class="column">
            {{ inspectionStore.inspectionItem?.filename }}
          </div>
          <div class="column">장화</div>
          <div class="column">-</div>
          <div class="column">-</div>
          <div class="column">93.1%</div>
          <Button class="column icon" @click="onComparison">
            <Icons icons="show" />보기
          </Button>
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
        <div class="box">드로우</div>
        <div class="box icon">
          <Button @click="onZoomInOut('in')">
            <Icons icons="plus" />
          </Button>
          <Button @click="onZoomInOut('out')">
            <Icons icons="minus" />
          </Button>
        </div>
        <div class="box icon">
          <Button @click="onRotate('left')">
            <Icons icons="rotate-left" />
          </Button>
          <Button @click="onRotate('right')">
            <Icons icons="rotate-right" />
          </Button>
          <Button @click="onRotate('90')">
            <Icons icons="reload" />
          </Button>
        </div>
        <div class="box icon">
          <Button @click="onInit">
            <Icons icons="reset" />
          </Button>
        </div>
        <div class="box icon">
          <Button @click="onDraw">
            <Icons icons="template" />
          </Button>
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

    .logo {
      min-width: 183px;
      height: 63px;
      margin-top: 3px;
      border-top: 1px solid $d4;
      border-bottom: 1px solid $d4;
      display: flex;
      justify-content: center;
      align-items: center;
      background-repeat: no-repeat;
      background-position: 15px center;
      background-size: 150px;
    }

    .grid {
      width: 100%;
      height: 60px;

      .header,
      .rows {
        width: 100%;
        display: grid;
        grid-template-columns:
          minmax(180px, 1.6fr) minmax(200px, 0.7fr) minmax(280px, 3fr)
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
          background-color: $d2;

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
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .control-box {
      height: 100%;
      display: grid;
      grid-template-columns: 0.9fr 1.2fr 0.9fr 1fr;
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

          button {
            background-color: $d2;
            color: $point-blue;
          }
          button:last-child {
            svg {
              width: 32px;
            }
          }
        }
      }
    }

    .btn-wrap {
      width: 100%;
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
