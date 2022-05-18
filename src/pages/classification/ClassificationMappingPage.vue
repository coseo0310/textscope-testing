<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/shared/Button.vue";
import Grid from "@/components/shared/Grid.vue";
import Icons from "@/components/shared/Icons.vue";
import ModelMappingModal, {
  Model,
} from "@/components/classification/ModelMappingModal.vue";
import { useClassificationStore } from "@/store";
import { storeToRefs } from "pinia";

const classificationStore = useClassificationStore();
const { mappingColumns } = storeToRefs(classificationStore);

const selected = ref<string[]>([]);
const isModal = ref<boolean>(false);

const models: Model[] = [
  { id: "0", text: "Invoice" },
  { id: "1", text: "해외투자 사업계획서" },
  { id: "2", text: "해외투자 신고서" },
  { id: "3", text: "Bill of Landing" },
  { id: "4", text: "Purchase Order" },
];

const department = [
  { id: "1", text: "검수 1팀", models: ["0", "1"] },
  { id: "2", text: "검수 2팀", models: ["2", "3"] },
  { id: "3", text: "검수 3팀", models: ["3", "4"] },
  { id: "4", text: "검수 4팀", models: ["0", "1", "2", "3", "4"] },
];
const gridlist = [
  {
    id: "4",
    no: "4",
    department: "검수 4팀",
    model:
      "미국수출입은행 20종 영국 7종 중국 출입국 관련 싱가폴 발주건 2022년 일본 v1.4",
  },
  {
    id: "3",
    no: "3",
    department: "검수 3팀",
    model: "영국 7종 중국 출입국 관련 싱가폴 v1.4",
  },
  {
    id: "2",
    no: "2",
    department: "검수 2팀",
    model: "미국수출입은행 20종 영국 7종 싱가폴 발주건 2022년 일본 v1.4",
  },
  {
    id: "1",
    no: "1",
    department: "검수 1팀",
    model: " 영국 7종 중국 출입국 관련 싱가폴 발주건 v1.4",
  },
];

const onModal = (id: string) => {
  const f = department.find((f) => f.id === id);
  if (!f) {
    return;
  }
  selected.value = f.models;
  console.log("sle", selected.value);
  isModal.value = true;
};

const onClose = (selection: string[]) => {
  isModal.value = false;
  console.log(selection);
};
</script>

<template>
  <div class="classification-mapping">
    <div class="menu-bar">
      <div class="title">
        <div class="text">맵핑</div>
        <div class="icon-wrap">
          <Icons icons="info" />
          <div class="info">
            <div class="row">
              <span>∙</span>
              <span>
                맵핑은 각 부서에서 문서 분류 모델의 사용 권한을 부여하는
                기능입니다.
              </span>
            </div>
            <div class="row">
              <span>∙</span>문서 분류 모델과 부서가 맵핑되지 않은 부서는 업무를
              등록할 수 없습니다.
            </div>
            <div class="row">
              <span>∙</span>
              <span>
                리스트의 맵핑 버튼을 클릭하여 해당 부서와 맵핑 할 문서 분류
                모델을 편집할 수 있습니다.
              </span>
            </div>
            <div class="row red">
              <span>∙</span>
              <span>학습 완료된 문서 분류 모델만 맵핑이 가능합니다. </span>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-group">
        <div class="btn-wrap">
          <Button class="primary extra-bold">저장</Button>
        </div>
      </div>
    </div>
    <div class="grid-wrap">
      <Grid :columns="mappingColumns" :grid-list="gridlist">
        <template v-slot:model="{ item }">
          <div class="item">
            <div class="name">
              {{ item.model }}
            </div>
            <div class="btn-wrap">
              <Button class="primary semi-bold" @click="onModal(item.id)">
                맵핑
              </Button>
            </div>
          </div>
        </template>
      </Grid>
    </div>
    <ModelMappingModal
      :class="{ open: isModal }"
      :models="models"
      :selected="selected"
      @close="onClose"
    />
  </div>
</template>

<style lang="scss" scoped>
.classification-mapping {
  width: 100%;
  height: 100vh;
  padding: 80px 70px;

  .menu-bar {
    display: flex;
    justify-content: space-between;

    .title {
      font-size: 24px;
      font-weight: 600;
      color: $d5;
      display: flex;
      align-items: center;
      justify-items: center;

      .icon-wrap {
        position: relative;
        padding-left: 10px;
        color: $d4;
        cursor: pointer;

        .info {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          position: absolute;
          top: 40px;
          width: 633px;
          height: 278px;
          background-color: $d1;
          box-shadow: $shadow-alpha-1;
          border-radius: 10px;
          padding: 20px 45px;

          .row {
            color: $d5;
            font-size: 18px;
            display: flex;
            justify-content: flex-start;
            padding: 15px 0;

            :first-child {
              padding-right: 10px;
            }

            &.red {
              color: $point-red;
            }
          }
        }

        &:hover {
          .info {
            display: flex;
          }
        }
      }
    }

    .btn-group {
      display: flex;

      .btn-wrap {
        width: 180px;
        height: 46px;
        padding-left: 20px;
      }
    }
  }

  .grid-wrap {
    padding: 30px 0;

    .item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .btn-wrap {
        margin: 0 40px;
        width: 65px;
        height: 30px;
      }
    }
  }
}
</style>
