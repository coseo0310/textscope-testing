<script setup lang="ts">
import ComboBox from "@/components/shared/ComboBox.vue";
import { useInspectionStore } from "@/store";
import { storeToRefs } from "pinia";

const inspectionStore = useInspectionStore();
const { isInspector, isComplex, currentField } = storeToRefs(inspectionStore);

const onInputField = () => {
  if (!isInspector.value) {
    return;
  }
};
</script>

<template>
  <article
    :class="{
      [container.layout]: !isComplex,
      [container.layout_complex]: isComplex,
    }"
  >
    <section :class="document.layout" aria-label="문서 종류">
      <p :class="document.text">문서종류</p>
      <div :class="document.combo">
        <ComboBox
          :items="[
            { id: 1, text: '해외투자 사업계획서', value: 't' },
            { id: 2, text: 'Commercial Invoice', value: 't' },
          ]"
        />
      </div>
    </section>
    <section :class="fields.layout" aria-label="키 밸류">
      <div :class="fields.top">
        <div :class="fields.text_wrap">
          <p :class="fields.text">인식결과</p>
          <p :class="fields.badge">25</p>
        </div>
        <button
          :class="{
            [fields.btn_enabled]: isInspector,
            [fields.btn_disabled]: !isInspector,
          }"
          type="button"
          @click="onInputField"
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.00002 0.0146484C4.32219 0.0146484 4.58336 0.275816 4.58336 0.597982V7.40354C4.58336 7.7257 4.32219 7.98687 4.00002 7.98687C3.67786 7.98687 3.41669 7.7257 3.41669 7.40354V0.597982C3.41669 0.275816 3.67786 0.0146484 4.00002 0.0146484Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.013916 4.00075C0.013916 3.67858 0.275083 3.41741 0.597249 3.41741H7.4028C7.72497 3.41741 7.98614 3.67858 7.98614 4.00075C7.98614 4.32291 7.72497 4.58408 7.4028 4.58408H0.597249C0.275083 4.58408 0.013916 4.32291 0.013916 4.00075Z"
              fill="currentColor"
            />
          </svg>

          항목 추가
        </button>
      </div>
      <div :class="fields.card_wrap">
        <div v-for="(f, idx) in currentField" :class="fields.card">
          <p :class="fields.key">{{ `${idx + 1}. ${f.key}` }}</p>
          <input :class="fields.value" type="text" :value="f.text" />
        </div>
      </div>
    </section>
  </article>
</template>

<style lang="scss" module="container">
.layout {
  width: 332px;
  height: 100%;
}
.layout_complex {
  width: 664px;
  height: 100%;
}
</style>

<style lang="scss" module="document">
.layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 16px;
  border-bottom: 1px solid $n-50;
}

.text {
  font-size: 14px;
  font-weight: 400;
  color: $m-500;
}

.combo {
  width: 214px;
  height: 42px;
}
</style>

<style lang="scss" module="fields">
.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 22px 16px 10px 16px;
}

.text {
  color: $m-500;
  font-size: 14px;
  font-weight: 600;
}

.text_wrap {
  display: flex;
  align-items: center;
}

.badge {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  font-size: 12px;
  font-weight: 500;
  color: $m-500;
  width: 25px;
  height: 16px;
  border-radius: 8px;
  background-color: $n-40;
}

.btn_enabled {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid $n-50;
  background-color: #ffffff;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: $m-700;
  cursor: pointer;

  svg {
    margin: 0 5px 2px 5px;
  }
}

.btn_disabled {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $n-20;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: $n-60;

  svg {
    margin: 0 5px 2px 5px;
  }
}

.card_wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  height: calc(100% - 188px);
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: $n-10;

  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }
}

.card {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 80px;
  padding: 0 10px;
}

.key {
  font-size: 12px;
  font-weight: 500;
  color: $n-200;
  padding: 5px 0;
}

.value {
  width: 100%;
  height: 40px;
  border: 1px solid $n-40;
  border-radius: 3px;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 400;
  color: $m-800;
}
</style>
