<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import CheckBox from "@/components/shared/CheckBox.vue";

interface Props {
  closeCallback: Function;
}

const props = defineProps<Props>();

const selected = ref<string[]>([]);

const onConfirm = () => {
  if (selected.value.length === 0) {
    return;
  }
  onClose();
};

const onClose = () => {
  props.closeCallback();
};
</script>

<template>
  <article class="chart" :class="modal.layout">
    <h1 :class="modal.title">차트 내보내기</h1>
    <p :class="modal.text">다운로드 할 차트 유형을 선택하세요.</p>
    <p :class="modal.text">선택한 차트를 개별 엑셀 파일(.xlsx)로 저장합니다.</p>
    <div :class="modal.box">
      <div :class="modal.check_wrap">
        <CheckBox :default="true" />
        <div :class="modal.label">모두 선택</div>
      </div>
      <div :class="modal.check_wrap">
        <CheckBox :default="true" />
        <div :class="modal.label">개인 검수 현황</div>
        <p :class="modal.info">- 우영우 검수 1팀</p>
      </div>
      <div :class="modal.check_wrap">
        <CheckBox :default="true" />
        <div :class="modal.label">부서 업무 현황</div>
        <p :class="modal.info">- 품질부</p>
      </div>
      <div :class="modal.check_wrap">
        <CheckBox :default="true" />
        <div :class="modal.label">부서별 사용 현황 및 순위</div>
      </div>
      <div :class="modal.check_wrap">
        <CheckBox :default="true" />
        <div :class="modal.label">문서 분류 현황</div>
      </div>
      <div :class="modal.check_wrap">
        <CheckBox :default="true" />
        <div :class="modal.label">문서 KV 오류율</div>
        <p :class="modal.info">- 해외투자사업계획서</p>
      </div>
      <div :class="modal.check_wrap">
        <CheckBox :default="true" />
        <div :class="modal.label">문서 KV 오류율</div>
        <p :class="modal.info">- Commercial Invoice</p>
      </div>
    </div>
    <div :class="modal.btn_wrap">
      <button :class="modal.cancel" type="button" @click="onClose">취소</button>
      <button
        :class="{
          [modal.download]: true,
          [modal.disabled]: selected.length === 0,
        }"
        type="button"
        @click="onConfirm"
      >
        {{ selected.length }}개 파일 다운로드
      </button>
    </div>
  </article>
</template>

<style lang="scss" module="modal">
.layout {
  position: absolute;
  top: -183px;
  left: -405px;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 460px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 1px 1px rgba(9, 30, 66, 0.25),
    0px 0px 1px rgba(9, 30, 66, 0.31);
}

.title {
  font-size: 20px;
  font-weight: 700;
  color: $m-800;
  padding-bottom: 16px;
}

.text {
  font-size: 14px;
  font-weight: 400;
  color: $n-800;
  padding: 2px 0;
}

.check_wrap {
  display: flex;
  align-items: center;

  &:first-child {
    padding-bottom: 10px;
  }
}

.label {
  font-size: 14px;
  font-weight: 400;
  color: $n-800;
  padding: 0 5px;
}

.info {
  font-size: 14px;
  font-weight: 400;
  color: $m-900;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 243px;
  background-color: $n-20;
  border-radius: 8px;
  margin-top: 15px;
  margin-bottom: 40px;
  padding: 20px;
}

.btn_wrap {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.download {
  width: 132px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: none;
  background-color: $m-700;
  outline: none;
  margin: 0 5px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
}

.disabled {
  opacity: 0.5;
  cursor: default;
}

.cancel {
  width: 57px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: none;
  background-color: $n-20;
  outline: none;
  margin: 0 5px;
  font-size: 14px;
  font-weight: 600;
  color: $n-500;
  cursor: pointer;
}
</style>
