<script setup lang="ts">
import { ref, onMounted } from "vue";
import Button from "@/components/shared/Button.vue";
import Icons from "@/components/shared/Icons.vue";
import Dropdown from "@/components/shared/Dropdown.vue";
import { useInspectionStore } from "@/store";
import { storeToRefs } from "pinia";

const inspectionStore = useInspectionStore();
const { currentEditor, isInspection, currentEditorIdx } =
  storeToRefs(inspectionStore);

const deg = ref<number>(0);

const onInspection = () => {
  isInspection.value = !isInspection.value;
  inspectionStore.onStartInspection();
};

const onRotate = (type: "left" | "right") => {
  if (type == "left") {
    deg.value -= 90;
  } else if (type == "right") {
    deg.value += 90;
  }

  currentEditor.value?.setRotate(deg.value);
};

const onInit = () => {
  deg.value = 0;
  //TODO: Data reset
};
onMounted(() => {});
</script>

<template>
  <div class="top-menu">
    <div class="info">
      <div class="grid">
        <div class="header">
          <div class="column">Task ID</div>
          <div class="column">문서모델</div>
          <div class="column">문서유형</div>
          <div class="column">문서명</div>
          <div class="column">등록 담당자</div>
          <div class="column">검수 담당자</div>
          <div class="column">검수</div>
          <div class="column">정확도</div>
          <div class="column">완료일</div>
        </div>
        <div class="rows">
          <div class="column">
            {{ inspectionStore.inspectionInfo?.taskId }}
          </div>
          <Button class="column model">
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
          <div class="column">템플릿 OCR</div>
          <div class="column">
            {{ inspectionStore.inspectionInfo?.filename }}
          </div>
          <div class="column">장화</div>
          <div class="column">-</div>
          <div class="column">-</div>
          <div class="column">93.1%</div>
          <div class="column">-</div>
        </div>
      </div>
      <div class="btn-wrap">
        <Button class="primary extra-bold" @click="onInspection">
          <Icons v-if="inspectionStore.isInspection" icons="save" />
          <div :class="{ save: inspectionStore.isInspection }">
            {{ inspectionStore.isInspection ? "저장" : "검수 시작" }}
          </div>
        </Button>
      </div>
    </div>
    <div class="control-wrap">
      <div class="control-box">
        <div class="box title">Page No.</div>
        <div class="box content">1-{{ currentEditorIdx + 1 }}</div>
        <div class="box title">문서회전</div>
        <div class="box content">90º</div>
        <div class="box title">회전</div>
        <div class="box icon">
          <Button @click="onRotate('left')">
            <Icons icons="rotate-left" />
          </Button>
        </div>

        <div class="box icon">
          <Button @click="onRotate('right')">
            <Icons icons="rotate-right" />
          </Button>
        </div>
        <div class="box title">초기화</div>
        <div class="box icon">
          <Button @click="onInit">
            <Icons icons="reset" />
          </Button>
        </div>
      </div>
      <div class="btn-wrap">
        <div class="ocr-btn-wrap">
          <Button class="outline semi-bold">유의어</Button>
          <Button class="outline semi-bold">용어사전</Button>
        </div>
        <div class="save-btn-wrap">
          <Button class="primary semi-bold"> OCR 재인식 </Button>
          <Button class="primary semi-bold"> G-OCR </Button>
          <Button class="outline semi-bold"> 키벨류(K) </Button>
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
    border-bottom: 1px solid $d4;
    margin: 0;
    padding: 0;

    .grid {
      width: 100%;
      height: 60px;
      padding-right: 1px;
      background-color: $d4;

      .header,
      .rows {
        width: 100%;
        display: grid;
        grid-template-columns:
          minmax(200px, 1.6fr) minmax(180px, 0.7fr) minmax(180px, 0.7fr)
          minmax(280px, 3fr) minmax(120px, 0.5fr) minmax(120px, 0.5fr)
          minmax(120px, 0.7fr) minmax(120px, 0.5fr) minmax(180px, 1fr);
        gap: 1px;

        .column {
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: $d5;
          font-size: 14px;
          font-weight: 600;
          background-color: $d1;

          &.model {
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
        .column {
          background-color: $d3;
          border-bottom: 1px solid $d4;
        }
      }
    }

    .btn-wrap {
      width: 130px;
      height: 46px;
      margin: 8px 20px;

      button {
        display: flex;
        justify-content: center;
        align-items: center;

        .save {
          padding: 2px 5px 0 0;
        }
      }
    }
  }

  .control-wrap {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid $d4;

    .control-box {
      max-width: 550px;
      height: 100%;
      display: flex;
      justify-content: flex-start;
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
        border-right: 1px solid $d4;

        &.title,
        &.content {
          font-size: 16px;
          font-weight: 600;
          width: 500px;
          background-color: $d2;
        }

        &.content {
          width: 300px;
          background-color: $d1;
        }

        &.icon {
          width: 300px;

          button {
            background-color: $d3;
            color: $point-blue;
          }
        }
      }
    }

    .btn-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $d2;

      button {
        width: 100px;
        height: 30px;
        margin: 0 10px;
      }

      .save-btn-wrap {
        display: flex;
        align-items: center;
        width: 460px;
        height: 40px;
        border-left: 1px solid $d4;
      }
    }
  }
}
</style>
