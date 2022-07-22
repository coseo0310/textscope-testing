<script setup lang="ts">
import { ref } from "vue";
import ComboBox from "../shared/ComboBox.vue";
import Chart, { ChartConfiguration, ChartDataset } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const canvas = ref<HTMLCanvasElement | null>(null);
</script>

<template>
  <article :class="container.layout">
    <section :class="top.layout" aria-label="Top section">
      <h1 :class="top.title">부서 업무 현황</h1>
      <div :class="top.box">
        <div :class="top.count">
          <i :class="top.icon_orange">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 1.5C10.5523 1.5 11 1.94772 11 2.5V12.5C11 13.0523 10.5523 13.5 10 13.5C9.44772 13.5 9 13.0523 9 12.5V2.5C9 1.94772 9.44772 1.5 10 1.5Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.2929 1.79289C9.68343 1.40237 10.3166 1.40237 10.7071 1.79289L14.8738 5.95956C15.2643 6.35008 15.2643 6.98325 14.8738 7.37377C14.4833 7.7643 13.8501 7.7643 13.4596 7.37377L10 3.91421L6.54045 7.37377C6.14993 7.7643 5.51676 7.7643 5.12624 7.37377C4.73571 6.98325 4.73571 6.35008 5.12624 5.95956L9.2929 1.79289Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 1.5C10.5523 1.5 11 1.94772 11 2.5V12.5C11 13.0523 10.5523 13.5 10 13.5C9.44772 13.5 9 13.0523 9 12.5V2.5C9 1.94772 9.44772 1.5 10 1.5Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.5 11.5C3.05228 11.5 3.5 11.9477 3.5 12.5V15.8333C3.5 16.0101 3.57024 16.1797 3.69526 16.3047C3.82029 16.4298 3.98986 16.5 4.16667 16.5H15.8333C16.0101 16.5 16.1797 16.4298 16.3047 16.3047C16.4298 16.1797 16.5 16.0101 16.5 15.8333V12.5C16.5 11.9477 16.9477 11.5 17.5 11.5C18.0523 11.5 18.5 11.9477 18.5 12.5V15.8333C18.5 16.5406 18.219 17.2189 17.719 17.719C17.2189 18.219 16.5406 18.5 15.8333 18.5H4.16667C3.45942 18.5 2.78115 18.219 2.28105 17.719C1.78095 17.2189 1.5 16.5406 1.5 15.8333V12.5C1.5 11.9477 1.94772 11.5 2.5 11.5Z"
                fill="white"
              />
            </svg>
          </i>
          <div :class="top.info">
            <p>등록 합계</p>
            <p>9,354<span>건</span></p>
          </div>
        </div>
        <div :class="top.count">
          <i :class="top.icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.9848 3.29673C11.5403 2.65311 9.92645 2.49366 8.38396 2.84217C6.84146 3.19068 5.45294 4.02846 4.42549 5.23058C3.39803 6.4327 2.7867 7.93475 2.68265 9.5127C2.5786 11.0906 2.98741 12.66 3.84812 13.9866C4.70883 15.3132 5.97532 16.3261 7.45869 16.8741C8.94207 17.4221 10.5629 17.476 12.0793 17.0276C13.5958 16.5792 14.9267 15.6526 15.8736 14.3861C16.8205 13.1195 17.3325 11.5808 17.3334 9.9994V9.2333C17.3334 8.68102 17.7811 8.2333 18.3334 8.2333C18.8857 8.2333 19.3334 8.68102 19.3334 9.2333V9.99997C19.3323 12.0126 18.6805 13.9716 17.4755 15.5836C16.2704 17.1956 14.5765 18.3749 12.6464 18.9455C10.7164 19.5162 8.65352 19.4476 6.76559 18.7502C4.87765 18.0527 3.26576 16.7636 2.17031 15.0751C1.07486 13.3867 0.554553 11.3894 0.68698 9.3811C0.819406 7.3728 1.59747 5.46111 2.90514 3.93114C4.21281 2.40117 5.98001 1.3349 7.94319 0.891344C9.90637 0.44779 11.9603 0.650722 13.7988 1.46987C14.3032 1.69465 14.53 2.28583 14.3052 2.7903C14.0804 3.29478 13.4892 3.52151 12.9848 3.29673Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.0401 2.62585C19.4309 3.01618 19.4312 3.64935 19.0409 4.04007L10.7075 12.3817C10.52 12.5694 10.2656 12.6749 10.0003 12.675C9.73501 12.675 9.48055 12.5697 9.29295 12.3821L6.79295 9.88209C6.40243 9.49156 6.40243 8.8584 6.79295 8.46787C7.18348 8.07735 7.81664 8.07735 8.20717 8.46787L9.99971 10.2604L17.6259 2.62656C18.0163 2.23584 18.6494 2.23552 19.0401 2.62585Z"
                fill="white"
              />
            </svg>
          </i>
          <div :class="top.info">
            <p>검수 합계</p>
            <p>9,190<span>건</span></p>
          </div>
        </div>
      </div>
    </section>
    <section :class="chart.layout" aria-label="Chart section">
      <div :class="chart.combo">
        <ComboBox
          :items="[
            { id: 1, text: '무역금융부', value: '무역금융부' },
            { id: 2, text: '품질부', value: '품질부' },
          ]"
        />
      </div>
      <div :class="chart.wrap">
        <canvas ref="canvas"></canvas>
      </div>
    </section>
  </article>
</template>

<style lang="scss" module="container">
.layout {
  flex: 0 0 auto;
  width: 100%;
  height: 423px;
  padding: 28px;
  background-color: #ffffff;
  box-shadow: 0px 1px 1px rgba(9, 30, 66, 0.25),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  border-radius: 3px;
}
</style>

<style lang="scss" module="top">
.layout {
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title {
  font-size: 24px;
  font-weight: 500;
  color: $m-800;
}

.box {
  display: flex;
}

.count {
  width: 174px;
  height: 64px;
  border: 1px solid $n-40;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 14px;

  &:first-child {
    margin-right: 10px;
  }
}

.icon {
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $b-200;
  border-radius: 50%;
}

.icon_orange {
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $o-300;
  border-radius: 50%;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  p:first-child {
    font-size: 12px;
    font-weight: 400;
    color: $m-700;
    padding-bottom: 5px;
  }
  p:last-child {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 20px;
    font-weight: 500;
    color: #000000;

    span {
      font-size: 12px;
      font-weight: 400;
      color: $m-700;
      padding-left: 2px;
    }
  }
}
</style>

<style lang="scss" module="chart">
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.wrap {
  width: 100%;
  height: 261px;
  display: flex;
}

.combo {
  width: 160px;
  height: 32px;
  margin-bottom: 10px;
}
</style>
