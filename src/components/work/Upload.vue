<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  closeCallback: Function;
}

const DEFAULT_TEXT = "선택한 문서 종류";

const props = defineProps<Props>();

const currentStep = ref<number>(1);
const documentType = ref<string>(DEFAULT_TEXT);

const step_1_color = computed(() => {
  return currentStep.value > 1 ? "#5EAE91" : "#ffffff";
});
const step_2_color = computed(() => {
  return currentStep.value > 2
    ? "#5EAE91"
    : currentStep.value === 2
    ? "#ffffff"
    : "rgba(255,255,255,0.5)";
});
const step_3_color = computed(() => {
  return currentStep.value > 3
    ? "#5EAE91"
    : currentStep.value === 3
    ? "#ffffff"
    : "rgba(255,255,255,0.5)";
});

const onClose = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  const el = e.target as HTMLElement;
  if (!el) {
    return;
  }
  const contains = el.classList.contains("modal");
  if (!contains) {
    return;
  }
  props.closeCallback();
};

const onNext = () => {
  currentStep.value = currentStep.value + 1;
};

const onPrev = () => {
  currentStep.value = currentStep.value - 1;
};
</script>

<template>
  <article class="modal" :class="modal.layout" @click="onClose">
    <div :class="modal.box">
      <div :class="modal.left">
        <div :class="step.grid">
          <div :class="step.number" :style="{ backgroundColor: step_1_color }">
            <div v-if="currentStep > 1">
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.1448 0.244078C13.4702 0.569515 13.4702 1.09715 13.1448 1.42259L5.5059 9.06148C5.34962 9.21776 5.13765 9.30556 4.91664 9.30556C4.69563 9.30556 4.48366 9.21776 4.32738 9.06148L0.855162 5.58926C0.529725 5.26382 0.529725 4.73618 0.855162 4.41075C1.1806 4.08531 1.70824 4.08531 2.03367 4.41075L4.91664 7.29371L11.9663 0.244078C12.2917 -0.0813592 12.8193 -0.0813592 13.1448 0.244078Z"
                  fill="white"
                />
              </svg>
            </div>
            <template v-else>1</template>
          </div>
          <h1 :class="step.title" :style="{ color: step_1_color }">
            문서 유형 선택
            <p :class="step.text">{{ documentType }}</p>
          </h1>
          <div
            :class="step.pipe"
            :style="{ backgroundColor: step_1_color }"
          ></div>
          <div :class="step.title"></div>
          <div :class="step.number" :style="{ backgroundColor: step_2_color }">
            <div v-if="currentStep > 2">
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.1448 0.244078C13.4702 0.569515 13.4702 1.09715 13.1448 1.42259L5.5059 9.06148C5.34962 9.21776 5.13765 9.30556 4.91664 9.30556C4.69563 9.30556 4.48366 9.21776 4.32738 9.06148L0.855162 5.58926C0.529725 5.26382 0.529725 4.73618 0.855162 4.41075C1.1806 4.08531 1.70824 4.08531 2.03367 4.41075L4.91664 7.29371L11.9663 0.244078C12.2917 -0.0813592 12.8193 -0.0813592 13.1448 0.244078Z"
                  fill="white"
                />
              </svg>
            </div>
            <template v-else>2</template>
          </div>
          <h1 :class="step.title" :style="{ color: step_2_color }">
            업로드할 파일 선택
          </h1>
          <div
            :class="step.pipe"
            :style="{ backgroundColor: step_2_color }"
          ></div>
          <div :class="step.title"></div>
          <div :class="step.number" :style="{ backgroundColor: step_3_color }">
            <div v-if="currentStep > 3">
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.1448 0.244078C13.4702 0.569515 13.4702 1.09715 13.1448 1.42259L5.5059 9.06148C5.34962 9.21776 5.13765 9.30556 4.91664 9.30556C4.69563 9.30556 4.48366 9.21776 4.32738 9.06148L0.855162 5.58926C0.529725 5.26382 0.529725 4.73618 0.855162 4.41075C1.1806 4.08531 1.70824 4.08531 2.03367 4.41075L4.91664 7.29371L11.9663 0.244078C12.2917 -0.0813592 12.8193 -0.0813592 13.1448 0.244078Z"
                  fill="white"
                />
              </svg>
            </div>
            <template v-else>3</template>
          </div>
          <h1 :class="step.title" :style="{ color: step_3_color }">
            파일 업로드
          </h1>
        </div>
      </div>
      <div :class="modal.right">
        <div :class="header.layout">
          <h1 :class="header.title">문서 업로드</h1>
          <i @click="props.closeCallback()">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.5607 0.43934C18.1464 1.02513 18.1464 1.97487 17.5607 2.56066L2.56066 17.5607C1.97487 18.1464 1.02513 18.1464 0.43934 17.5607C-0.146447 16.9749 -0.146447 16.0251 0.43934 15.4393L15.4393 0.43934C16.0251 -0.146447 16.9749 -0.146447 17.5607 0.43934Z"
                fill="#1B1B1B"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.43934 0.43934C1.02513 -0.146447 1.97487 -0.146447 2.56066 0.43934L17.5607 15.4393C18.1464 16.0251 18.1464 16.9749 17.5607 17.5607C16.9749 18.1464 16.0251 18.1464 15.4393 17.5607L0.43934 2.56066C-0.146447 1.97487 -0.146447 1.02513 0.43934 0.43934Z"
                fill="#1B1B1B"
              />
            </svg>
          </i>
        </div>
        <div v-if="currentStep === 1">
          <p :class="header.text">업로드할 문서 유형을 선택해주세요</p>
        </div>
        <div :class="content.layout">?</div>
        <div :class="footer.layout">
          <div v-if="currentStep === 1"></div>
          <button
            v-if="currentStep > 1"
            :class="footer.prev"
            type="button"
            @click="onPrev"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.6725 4.24408C11.9979 4.56951 11.9979 5.09715 11.6725 5.42259L8.0951 9L11.6725 12.5774C11.9979 12.9028 11.9979 13.4305 11.6725 13.7559C11.3471 14.0814 10.8194 14.0814 10.494 13.7559L6.32733 9.58926C6.00189 9.26382 6.00189 8.73618 6.32733 8.41074L10.494 4.24408C10.8194 3.91864 11.3471 3.91864 11.6725 4.24408Z"
                fill="#242424"
              />
            </svg>
            이전으로
          </button>
          <button :class="footer.next" type="button" @click="onNext">
            다음으로
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.32739 4.24408C6.65283 3.91864 7.18047 3.91864 7.5059 4.24408L11.6726 8.41074C11.998 8.73618 11.998 9.26382 11.6726 9.58926L7.5059 13.7559C7.18047 14.0814 6.65283 14.0814 6.32739 13.7559C6.00195 13.4305 6.00195 12.9028 6.32739 12.5774L9.9048 9L6.32739 5.42259C6.00195 5.09715 6.00195 4.56951 6.32739 4.24408Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" module="modal">
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.box {
  display: flex;
  align-items: center;
  width: 768px;
  height: 560px;
  border-radius: 8px;
  background-color: #ffffff;
}

.left {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  width: 223px;
  height: 100%;
  background-color: $m-900;
  padding: 32px 25px;
}

.right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 32px;
}
</style>

<style lang="scss" module="step">
.grid {
  display: grid;
  grid-template-columns: 35px 1fr;
}

.pipe {
  margin: 10px 13px;
  width: 2px;
  height: 30px;
}

.number {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: $m-900;
  font-size: 14px;
  font-weight: 600;
}

.title {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
}

.text {
  position: absolute;
  top: 25px;
  left: 0;
  color: #ffffff;
  font-size: 11px;
  font-weight: 500;
}
</style>

<style lang="scss" module="header">
.layout {
  display: flex;
  align-items: center;
  justify-content: space-between;

  i {
    padding: 0 7px;
    cursor: pointer;
  }
}
.title {
  color: $m-900;
  font-weight: 700;
  font-size: 24px;
}

.text {
  font-size: 14px;
  font-weight: 400;
  padding: 10px 0;
  color: $m-400;
}
</style>

<style lang="scss" module="footer">
.layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.next {
  display: flex;
  align-items: center;
  background-color: $m-700;
  padding: 10px 10px 10px 20px;
  border-radius: 4px;
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
}

.prev {
  display: flex;
  align-items: center;
  border: 1px solid $n-50;
  background-color: #ffffff;
  padding: 10px 14px 10px 12px;
  border-radius: 4px;
  color: $m-700;
  font-size: 14px;
  font-weight: 600;
}
</style>

<style lang="scss" module="content">
.layout {
  width: 100%;
  height: 100%;
  background-color: lightblue;
}
</style>

<style lang="scss" module="upload"></style>
